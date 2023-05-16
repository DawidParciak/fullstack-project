const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const getImageFileType = require('../utils/getImageFileType');
const fs = require('fs');

exports.register = async (req, res) => {
  try {

    const { login, password, phone} = req.body;
    const avatar = req.file;
    const fileType = avatar ? await getImageFileType(avatar) : 'unknown';
    if (
      login && typeof login === 'string' && 
      password && typeof password === 'string' &&
      phone && typeof phone === 'string' &&
      avatar && ['image/png', 'image/jpeg', 'image/gif'].includes(fileType) 
    ){
      const userWithLogin = await User.findOne({ login });
      if (userWithLogin) {
        fs.unlinkSync(`./public/uploads/${avatar.filename}`);
        return res.status(409).send({ message: 'User with this login already exists' });
      }

      const user = await User.create({ login, password: await bcrypt.hash(password, 10), phone, avatar: avatar.filename });
      res.status(201).send({ message: 'User created ' + user.login });
    } 
    else {
      fs.unlinkSync(`./public/uploads/${avatar.filename}`);
      res.status(400).send({ message: 'Bad request' });
    }
  } 
  catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {

    const { login, password } = req.body;
    if (login && typeof login === 'string' && password && typeof password === 'string'){
      const user = await User.findOne({ login });

      if (!user) {
        res.status(400).send({ message: 'User or password are incorrect' });
      }
      else {
        if (bcrypt.compareSync(password, user.password)) {
          req.session.user = { login: user.login, id: user.id };
          res.status(200).send({ message: 'Login successful' });
        }
        else {
          res.status(400).send({ message: 'User or password are incorrect' });
        }
      }
    }
    else {
      res.status(400).send({ message: 'Bad request' });
    }
  } 
  catch {
    res.status(500).send({ message: err.message });
  }
};

exports.getUser = async (req, res) => {
  res.send({message: 'Yeah! I\'m logged'})
}

exports.logout = async (req, res) => {
  try {
    req.session.destroy(),
    res.status(200).send({ message: 'I\'m logout' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
