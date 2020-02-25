const Tech = require('../models/Tech');
const User = require('../models/User');

module.exports = {
  async index(req, res) {
    const { user_id } = req.params;
    const user = await User.findByPk(user_id, {
      include: {
        association: 'techs',
        attributes: ['name'],
        through: {
          attributes: []
        }
      }
    });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.json(user.techs);
  },

  async store(req, res) {
    const { user_id } = req.params;
    const { name } = req.body;

    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const [tech] = await Tech.findOrCreate({
      where: { name }
    });

    await user.addTech(tech);

    return res.json(tech);
  },

  async delete(req, res) {
    const { user_id } = req.params;
    const { name } = req.body;

    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const tech = await Tech.findOne({
      where: { name }
    });
    if (!tech) {
      return res.status(404).json({ error: 'Tech not found' });
    }
    await user.removeTech(tech);

    res.status(204).json();
  }
};
