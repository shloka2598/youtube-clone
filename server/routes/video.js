const express = require("express");
const router = express.Router();

// controllers
const {
  uploadVideo,
  uploadVideoDetails,
  getSingleVideo,
  list,
  increaseView,
  increaseSubscribe,
  getSubscribers,
  searchVideo,
} = require("../controllers/video");
const { requireSignin, authMiddleware } = require("../controllers/auth");

// routes
router.post("/video/upload", requireSignin, authMiddleware, uploadVideo);
router.post(
  "/video/uploadDetails",
  requireSignin,
  authMiddleware,
  uploadVideoDetails
);
router.post("/video/single", getSingleVideo);
router.get("/videos", list);
router.post("/video/increaseView", increaseView);
router.post("/subscribe", requireSignin, authMiddleware, increaseSubscribe);
router.post("/subscribers", getSubscribers);
router.post("/video/search", searchVideo);

module.exports = router;
