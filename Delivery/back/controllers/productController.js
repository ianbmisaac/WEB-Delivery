const { Product, Local, Sequelize } = require('../models');

function formatError(err) {
  if (err instanceof Sequelize.ValidationError) {
    return err.errors.map(e => `${e.path}: ${e.message}`).join(', ');
  }
  if (err instanceof Sequelize.DatabaseError) {
    return err.message;
  }
  return err.message;
}

exports.getByLocal = async (req, res) => {
  try {
    const products = await Product.findAll({
      where: { LocalId: req.params.id },
      order: [['name', 'ASC']]
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: true, message: formatError(err) });
  }
};

exports.getById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ error: true, message: 'Producto no encontrado' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: true, message: formatError(err) });
  }
};

exports.create = async (req, res) => {
  try {
    const local = await Local.findByPk(req.params.id);
    if (!local) {
      return res.status(404).json({ error: true, message: 'Local no encontrado' });
    }

    const { name, description, price, category, imageUrl, stock } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ error: true, message: 'El nombre del producto es obligatorio' });
    }
    if (price === undefined || price === '' || isNaN(Number(price))) {
      return res.status(400).json({ error: true, message: 'El precio debe ser un número válido' });
    }

    const product = await Product.create({
      name: name.trim(),
      description: description || null,
      price: Number(price),
      category: category || null,
      imageUrl: imageUrl || null,
      stock: stock != null ? Number(stock) : 0,
      LocalId: req.params.id
    });
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: true, message: formatError(err) });
  }
};

exports.update = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ error: true, message: 'Producto no encontrado' });
    }

    const { name, description, price, category, imageUrl, stock } = req.body;

    const updates = {};
    if (name !== undefined) updates.name = name.trim();
    if (description !== undefined) updates.description = description || null;
    if (price !== undefined) {
      if (price === '' || isNaN(Number(price))) {
        return res.status(400).json({ error: true, message: 'El precio debe ser un número válido' });
      }
      updates.price = Number(price);
    }
    if (category !== undefined) updates.category = category || null;
    if (imageUrl !== undefined) updates.imageUrl = imageUrl || null;
    if (stock !== undefined) updates.stock = Number(stock);

    await product.update(updates);
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: true, message: formatError(err) });
  }
};

exports.remove = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ error: true, message: 'Producto no encontrado' });
    }

    const { OrderItem } = require('../models');
    await OrderItem.destroy({ where: { ProductId: req.params.id } });

    await product.destroy();
    res.json({ message: 'Producto eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: true, message: formatError(err) });
  }
};
