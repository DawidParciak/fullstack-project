const Ad = require('../models/ad.model');

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
    const { title, content, date, price, localization, photo, seller } = req.body;
    const newAd = new Ad({
      title,
      content,
      date,
      price,
      localization,
      photo,
      seller
    })
    await newAd.save();
    res.json( newAd )
  } 
  catch(err) {
    res.status(500).send({ message: err.message });
  }
};

exports.putById = async (req, res) => {
  try {
    const { title, content, date, price, localization, photo, seller } = req.body;
    const adToEdit = await Ad.findById(req.params.id);
    if(adToEdit) {
      adToEdit.title = title;
      adToEdit.content = content;
      adToEdit.date = date,
      adToEdit.price = price;
      adToEdit.localization = localization;
      adToEdit.photo = photo;
      adToEdit.seller = seller;
      await adToEdit.save();
      res.json({ message: 'Ad edited' });
    } else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteById = async (req, res) => {
  try {
    const adToRemove = await Ad.findById(req.params.id)
    if(adToRemove) {
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
