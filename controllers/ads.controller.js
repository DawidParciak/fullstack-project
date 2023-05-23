const Ad = require('../models/ad.model');
const getImageFileType = require('../utils/getImageFileType');
const fs = require('fs');

exports.getAllAds = async (req, res) => {
  try {
    res.json(await Ad.find());
  } 
  catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAdById = async (req, res) => {
  try {
    const adId = await Ad.findOne({ _id: req.params.id });
    if (!adId) res.status(404).json({ message: 'Not found...' });
    else res.json(adId);
  } 
  catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.postNewAd = async (req, res) => {
  try {
    const photo = req.file;
    const fileType = photo ? await getImageFileType(photo) : 'unknown';
    const { title, content, date, price, localization, seller, phone } = req.body;
    if(
      title.length > 10 && title.length < 50 &&
      content.length > 20 && content.length < 1000 &&
      photo && ['image/png', 'image/jpeg', 'image/gif'].includes(fileType)
    ){
      const newAd = new Ad({
        title,
        content,
        date,
        price,
        localization,
        photo: photo.filename,
        seller,
        phone
      })
      await newAd.save();
      res.json( newAd )
    }
    else {
      fs.unlinkSync(`./public/uploads/${photo.filename}`);
      res.status(500).json({ message: 'Title or content have wrong amount of characters' });
    }
  } 
  catch(err) {
    fs.unlinkSync(`./public/uploads/${req.file.filename}`);
    res.status(500).send({ message: err.message });
  }
};

exports.putById = async (req, res) => {
  try {
    const photo = req.file;
    const fileType = photo ? await getImageFileType(photo) : 'unknown';
    const { title, content, date, price, localization } = req.body;
    const adToEdit = await Ad.findById(req.params.id);
    if(adToEdit) {
      adToEdit.title = title;
      adToEdit.content = content;
      adToEdit.date = date,
      adToEdit.price = price;
      adToEdit.localization = localization;
      if (photo && ['image/png', 'image/jpeg', 'image/gif'].includes(fileType)) {
        adToEdit.photo = photo.filename;
      }
      await adToEdit.save();
      res.json({ message: 'Ad edited' });
    }
    else {
      fs.unlinkSync(`./public/uploads/${photo.filename}`);
      res.status(404).json({ message: 'Not found...' });
    }
  }
  catch(err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteById = async (req, res) => {
  try {
    const adToRemove = await Ad.findById(req.params.id)
    if(adToRemove) {
      fs.unlinkSync(`./public/uploads/${adToRemove.photo}`);
      await Ad.deleteOne({ _id: req.params.id });
      res.json(adToRemove);
    } else {
      res.status(404).json({ message: 'Not found...'});
    }
  } 
  catch(err) {
    res.status(500).json({ message: err.message });
  }
};

exports.searchAd = async (req, res) => {
  try {
    const searchPhrase = req.params.searchPhrase; 
    const regex = new RegExp(searchPhrase, "i"); 

    const ads = await Ad.find({
      $or: [
        { title: regex },
        { content: regex }
      ]
    });

    res.json(ads);
  } 
  catch (err) {
    res.status(500).json({ message: err.message });
  }
};
