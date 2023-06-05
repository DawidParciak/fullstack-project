const express = require('express');
const router = express.Router();
const ad = require('../controllers/ads.controller');
const authMiddleware = require('../utils/authMiddleware');
const imageUpload = require('../utils/imageUpload');

router.get('/ads', ad.getAllAds);
router.get('/ads/:id', ad.getAdById);
router.post('/ads', imageUpload.single('photo'), ad.postNewAd);
router.put('/ads/:id', authMiddleware, imageUpload.single('photo'), ad.putById);
router.delete('/ads/:id', authMiddleware, ad.deleteById);
router.get('/ads/search/:searchPhrase', ad.searchAd);

module.exports = router;
