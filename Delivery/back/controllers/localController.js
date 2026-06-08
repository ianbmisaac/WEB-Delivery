const { Local, Product, OrderItem } = require('../models');

exports.getAll = async (req, res) => {
  try {
    const where = {};

    if (req.query.vista === 'inactivos') {
      where.isActive = false;
    } else if (req.query.vista === 'todos') {
    } else {
      where.isActive = true;
    }

    const locals = await Local.findAll({
      where,
      order: [['name', 'ASC']]
    });
    res.json(locals);
  } catch (err) {
    res.status(500).json({ error: true, message: err.message });
  }
};

exports.getInactive = async (req, res) => {
  try {
    const locals = await Local.findAll({
      where: { isActive: false },
      order: [['name', 'ASC']]
    });
    res.json(locals);
  } catch (err) {
    res.status(500).json({ error: true, message: err.message });
  }
};

exports.getAllInactive = async (req, res) => {
  try {
    const locals = await Local.findAll({
      order: [['name', 'ASC']]
    });
    res.json(locals);
  } catch (err) {
    res.status(500).json({ error: true, message: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const local = await Local.findByPk(req.params.id, { include: Product });
    if (!local) {
      return res.status(404).json({ error: true, message: 'Local no encontrado' });
    }
    res.json(local);
  } catch (err) {
    res.status(500).json({ error: true, message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const local = await Local.create(req.body);
    res.status(201).json(local);
  } catch (err) {
    res.status(400).json({ error: true, message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const local = await Local.findByPk(req.params.id);
    if (!local) {
      return res.status(404).json({ error: true, message: 'Local no encontrado' });
    }
    await local.update(req.body);
    res.json(local);
  } catch (err) {
    res.status(400).json({ error: true, message: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const local = await Local.findByPk(req.params.id);
    if (!local) {
      return res.status(404).json({ error: true, message: 'Local no encontrado' });
    }

    if (req.query.force === 'true') {
      const products = await Product.findAll({ where: { LocalId: req.params.id } });
      for (const product of products) {
        await OrderItem.destroy({ where: { ProductId: product.id } });
        await product.destroy();
      }
      await local.destroy();
      return res.json({ message: 'Local eliminado permanentemente' });
    }

    await local.update({ isActive: false });
    res.json({ message: 'Local desactivado correctamente' });
  } catch (err) {
    res.status(500).json({ error: true, message: err.message });
  }
};

exports.restore = async (req, res) => {
  try {
    const local = await Local.findByPk(req.params.id);
    if (!local) {
      return res.status(404).json({ error: true, message: 'Local no encontrado' });
    }
    await local.update({ isActive: true });
    res.json({ message: 'Local restaurado correctamente' });
  } catch (err) {
    res.status(500).json({ error: true, message: err.message });
  }
};
