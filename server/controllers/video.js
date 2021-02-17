const Video = require("../models/video");
const User = require("../models/user");
const shortid = require("shortid");
const formidable = require("formidable");
const { errorHandler } = require("../helpers/dbErrorHandler");

const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.uploadVideo = async (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Video could not be uploaded",
      });
    }

    const { video } = files;

    if (!video) {
      return res.status(400).json({
        error: "Video is required",
      });
    } else {
      cloudinary.v2.uploader
        .upload(
          video.path,
          {
            resource_type: "video",
            public_id: `yt/videos/${Math.random()}`,
            chunk_size: 6000000,
            eager: [
              {
                width: 160,
                height: 100,
                crop: "crop",
                gravity: "south",
                audio_codec: "none",
              },
            ],
            eager_async: true,
          },
          function (error, result) {
            console.log(result, error);
          }
        )
        .then((d) => {
          console.log(d);
          // asset_id
          // public_id
          return res.json({
            public_id: d.public_id,
            url: d.url,
          });
        });
    }
  });
};

exports.uploadVideoDetails = async (req, res) => {
  const { title, description, writer, filePath } = req.body;

  const videoId = shortid.generate();

  if (!title) {
    res.status(400).json({ error: "Title is required" });
  } else {
    const newVideo = await new Video({
      title,
      description,
      writer,
      videoId,
      filePath,
    });
    newVideo.save((err, v) => {
      if (err) {
        return res.status(400).json({
          success: false,
          error: errorHandler(err),
        });
      }
      return res.json({
        success: true,
        video: v,
      });
    });
  }
};

exports.getSingleVideo = (req, res) => {
  const { videoId } = req.body;

  Video.find({ videoId }).exec((err, video) => {
    if (err) {
      res.status(400).json({ error: errorHandler(err) });
    }
    res.json({ video });
  });
};

exports.list = (req, res) => {
  Video.find({}).then((data) => {
    if (data.error) {
      res.status(400).json({ error: errorHandler(data.error) });
    }
    res.json({ data });
  });
};

exports.increaseView = (req, res) => {
  const { _id, videoId } = req.body;
  const updateViews = () => {
    Video.findOne({ videoId }).then((data) => {
      Video.findByIdAndUpdate(_id, { views: data.views + 1 }).then((v) => {
        return res.json({ views: v });
      });
    });
  };
  updateViews();
};

exports.increaseSubscribe = (req, res) => {
  const { username } = req.body;

  const updateSubscribers = () => {
    User.findOne({ name: username }).then((data) => {
      User.findOneAndUpdate(
        { name: username },
        { subscribers: data.subscribers + 1 }
      ).then((s) => {
        return res.json({ success: true });
      });
    });
  };
  updateSubscribers();
};

exports.getSubscribers = (req, res) => {
  const { name } = req.body;

  User.findOne({ name }).then((data) =>
    res.json({ subscribers: data.subscribers })
  );
};

exports.searchVideo = (req, res) => {
  const { searchTerm } = req.body;

  Video.find({ title: searchTerm }).then((data, err) => {
    if (err) {
      return res.status(400).json({ error: true, err: err });
    }
    res.json({ data });
  });
};
