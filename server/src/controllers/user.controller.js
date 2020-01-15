const userController = {};
const User = require('../models/user.model');
userController.register = async (req, res, next) => {
  try {
    const { name, email, password, joined } = req.body;
    const newUser = new User({ name, email, password, joined });
    await newUser.save();
    return res.send({ newUser });
  } catch (err) {
    next(err);
  }
};
module.exports = userController;
