const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const multer = require('multer');

var storage = multer.diskStorage({
  // where we want to save the image or video file
  // save to uploads
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  //   how the file will be named and dated
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  //   if the file is not a jpg or png then the message will show up
  fileFilter: (req, file, cb) => {
    const ext = path.extreme(file.originalname);
    if (ext !== '.jpg' || ext !== '.png' || ext !== '.mp4') {
      return cb(
        res.status(400).end('only jpeg, mp4 and png are allowed'),
        false
      );
    }
    cb(null, true);
  }
});

var upload = multer({ storage: storage }).single('file');

//=================================
//             Product
//=================================

router.post('/uploadImage', auth, (req, res) => {
  //after getting image from user
  // we need to save it within server
  upload(req, res, err => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.json({
      success: true,
      image: res.req.file.path,
      fileName: res.req.file.filename
    });
  });
});

module.exports = router;
