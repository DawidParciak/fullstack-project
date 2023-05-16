const express = require('express');
const router = express.Router();
const ad = require('../controllers/ads.controller');

router.get('/ads', ad.getAllAds);
router.get('/ads/:id', ad.getAdById);
router.post('/ads', ad.postNewAd);
router.put('/ads/:id', ad.putById);
router.delete('/ads/:id', ad.deleteById);
router.get('/ads/search/:searchPhrase', ad.searchAd);

module.exports = router;
