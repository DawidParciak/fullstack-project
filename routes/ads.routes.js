const express = require('express');
const router = express.Router();
const ad = require('../controllers/ads.controller');
const authMiddleware = require('../utils/authMiddleware');
const imageUpload = require('../utils/imageUpload');

router.get('/data', ad.getAllAds);
router.get('/data/:id', ad.getAdById);
router.post('/data', authMiddleware, imageUpload.single('photo'), ad.postNewAd);
router.put('/data/:id', authMiddleware, imageUpload.single('photo'), ad.putById);
router.delete('/data/:id', authMiddleware, ad.deleteById);
router.get('/data/search/:searchPhrase', ad.searchAd);

module.exports = router;
