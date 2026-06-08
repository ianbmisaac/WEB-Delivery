const { Order, User, Local, OrderItem, Product } = require('../models');

exports.getAll = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        { model: User, attributes: ['id', 'name', 'email'] },
        { model: Local, attributes: ['id', 'name', 'address'] },
        { model: OrderItem, include: [Product] }
      ],
      order: [['createdAt', 'DESC']]
    });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: true, message: err.message });
  }
};

exports.getActive = async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { status: ['pendiente', 'preparando', 'en_camino'] },
      include: [
        { model: User, attributes: ['id', 'name', 'email'] },
        { model: Local, attributes: ['id', 'name', 'address'] },
        { model: OrderItem, include: [Product] }
      ],
      order: [['createdAt', 'DESC']]
    });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: true, message: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ['id', 'name', 'email'] },
        { model: Local, attributes: ['id', 'name', 'address'] },
        { model: OrderItem, include: [Product] }
      ]
    });
    if (!order) {
      return res.status(404).json({ error: true, message: 'Pedido no encontrado' });
    }
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: true, message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const order = await Order.create(req.body);
    const created = await Order.findByPk(order.id, {
      include: [
        { model: User, attributes: ['id', 'name', 'email'] },
        { model: Local, attributes: ['id', 'name'] }
      ]
    });
    res.status(201).json(created);
  } catch (err) {
    res.status(400).json({ error: true, message: err.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) {
      return res.status(404).json({ error: true, message: 'Pedido no encontrado' });
    }
    await order.update({ status: req.body.status });
    res.json(order);
  } catch (err) {
    res.status(400).json({ error: true, message: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) {
      return res.status(404).json({ error: true, message: 'Pedido no encontrado' });
    }
    await order.destroy();
    res.json({ message: 'Pedido eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: true, message: err.message });
  }
};
