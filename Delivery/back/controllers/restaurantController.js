const { Restaurant } = require('../models');

exports.getAll = async (req, res) => {
  try {
    const restaurants = await Restaurant.findAll({ order: [['name', 'ASC']] });
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ error: true, message: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findByPk(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ error: true, message: 'Restaurante no encontrado' });
    }
    res.json(restaurant);
  } catch (err) {
    res.status(500).json({ error: true, message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const restaurant = await Restaurant.create(req.body);
    res.status(201).json(restaurant);
  } catch (err) {
    res.status(400).json({ error: true, message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const restaurant = await Restaurant.findByPk(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ error: true, message: 'Restaurante no encontrado' });
    }
    await restaurant.update(req.body);
    res.json(restaurant);
  } catch (err) {
    res.status(400).json({ error: true, message: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const restaurant = await Restaurant.findByPk(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ error: true, message: 'Restaurante no encontrado' });
    }
    await restaurant.destroy();
    res.json({ message: 'Restaurante eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: true, message: err.message });
  }
};
