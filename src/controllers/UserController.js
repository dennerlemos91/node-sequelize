const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = {
  async index(req, res) {
    const users = await User.findAll();

    return res.json(users);
  },
  async store(req, res) {
    const { name, email, password } = req.body;

    const password_hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password_hash });
    return res.json(user);
  }
};
