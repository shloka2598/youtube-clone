const express = require("express");
const router = express.Router();

// controllers
const { getSingleUser, searchUser } = require("../controllers/user");

// routes
router.post("/user/single", getSingleUser);
router.post("/user/search", searchUser);

module.exports = router;
