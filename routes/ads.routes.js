const express = require('express');
const router = express.Router();
const ad = require('../controllers/ads.controller');

router.get('/ads', ad.getAllAds);

module.exports = router;
