const mongoose = require("mongoose");

const videoSchema = mongoose.Schema(
  {
    writer: {
      type: String,
    },
    title: {
      type: String,
      maxlength: 50,
    },
    description: {
      type: String,
    },
    filePath: {
      type: String,
    },
    views: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
    },
    dislikes: {
      type: Number,
      default: 0,
    },
    videoId: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Video", videoSchema);
