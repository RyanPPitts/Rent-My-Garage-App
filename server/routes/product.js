const express = require('express');
const router = express.Router();
const { Product } = require('../models/Product');
const { auth } = require('../middleware/auth');
const multer = require('multer');

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== '.jpg' || ext !== '.png') {
      return cb(res.status(400).end('only jpeg, png are allowed'), false);
    }
    cb(null, true);
  }
});

var upload = multer({ storage: storage }).single('file');

//=================================
//             Product information
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

router.post('/uploadProduct', auth, (req, res) => {
  //save all the data we got from the user to the Mongo DB
  // req.body has all the data from the front end.
  const product = new Product(req.body);
  product.save(err => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

router.post('/getProducts', (req, res) => {
  let order = req.body.order ? req.body.order : 'desc';
  let sortBy = req.body.sortBy ? req.body.sortBy : '_id';
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);

  let findArgs = {};
  let term = req.body.searchTerm;

  console.log(req.body.filters);

  for (let key in req.body.filters) {
    console.log(key);
    if (req.body.filters[key].length > 0) {
      if (key === 'price') {
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1]
        };
      } else {
        findArgs[key] = req.body.filters[key];
        console.log(req.body.filters[key]);
      }
    }
  }

  if (term) {
    Product.find(findArgs)
      .find({ $text: { $search: term } })
      .populate('writer')
      .sort([[sortBy, order]])
      .skip(skip)
      .limit(limit)
      .exec((err, products) => {
        if (err) return res.status(400).json({ success: false, err });
        res
          .status(200)
          .json({ success: true, products, postSize: products.length });
      });
  } else {
    Product.find(findArgs)
      .populate('writer')
      .sort([[sortBy, order]])
      .skip(skip)
      .limit(limit)
      .exec((err, products) => {
        if (err) return res.status(400).json({ success: false, err });
        res
          .status(200)
          .json({ success: true, products, postSize: products.length });
      });
  }
});

router.get('/products_by_id', auth, (req, res) => {
  let type = req.query.type;
  let productId = req.query.id;

  if (type === 'array') {
  }

  Product.find({ _id: { $in: productIds } })
    .populate('writer')
    .exec((err, product) => {
      if (err) return req.status(400).send(err);
      return res.status(200).send(product);
    });
});

module.exports = router;
