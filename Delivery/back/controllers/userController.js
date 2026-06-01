const { User } = require('../models');

exports.getAll = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['name', 'ASC']]
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: true, message: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password'] }
    });
    if (!user) {
      return res.status(404).json({ error: true, message: 'Usuario no encontrado' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: true, message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const user = await User.create(req.body);
    const { password, ...data } = user.toJSON();
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ error: true, message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: true, message: 'Usuario no encontrado' });
    }
    await user.update(req.body);
    const { password, ...data } = user.toJSON();
    res.json(data);
  } catch (err) {
    res.status(400).json({ error: true, message: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: true, message: 'Usuario no encontrado' });
    }
    await user.destroy();
    res.json({ message: 'Usuario eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: true, message: err.message });
  }
};
