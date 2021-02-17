const User = require("../models/user");

exports.getSingleUser = (req, res) => {
  const { username } = req.body;

  User.findOne({ name: username }).then((data) => {
    if (!data) {
      return res.status(400).json({ error: true, msg: "User not found" });
    }
    res.json({ data });
  });
};

exports.searchUser = (req, res) => {
  const { searchTerm } = req.body;

  User.find({ name: searchTerm }).then((data, err) => {
    if (err) {
      return res.status(400).json({ error: true, err: err });
    }
    res.json({ data });
  });
};
