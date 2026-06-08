'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface) {
    const hash = await bcrypt.hash('admin123', 10);

    await queryInterface.bulkInsert('Users', [
      { name: 'Admin', email: 'admin@mail.com', password: hash, role: 'admin', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Cliente', email: 'cliente@mail.com', password: hash, role: 'cliente', createdAt: new Date(), updatedAt: new Date() },
    ]);

    await queryInterface.bulkInsert('Locals', [
      { name: 'Pizzería Don Luigi', description: 'La auténtica pizza italiana hecha en horno de barro', address: 'Av. Corrientes 1234', phone: '+54 11 5555-0101', imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400', category: 'Pizza', openingHours: 'Lun-Dom 11:00-23:00', isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Hamburguesas del Barrio', description: 'Hamburguesas artesanales con ingredientes frescos', address: 'Callao 567', phone: '+54 11 5555-0202', imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400', category: 'Hamburguesas', openingHours: 'Mar-Dom 18:00-00:00', isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Sushi Master', description: 'Sushi y cocina japonesa de primera calidad', address: 'Av. Santa Fe 2345', phone: '+54 11 5555-0303', imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400', category: 'Sushi', openingHours: 'Lun-Sáb 12:00-22:30', isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { name: 'La Taquería', description: 'Tacos, burritos y comida mexicana bien picante', address: 'Thames 1234', phone: '+54 11 5555-0404', imageUrl: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400', category: 'Mexicana', openingHours: 'Lun-Dom 19:00-01:00', isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Helados Artika', description: 'Helados artesanales y postres helados', address: 'Av. Cabildo 3456', phone: '+54 11 5555-0505', imageUrl: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=400', category: 'Postres', openingHours: 'Lun-Dom 10:00-22:00', isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Empanadas La Doña', description: 'Empanadas criollas horneadas y fritas', address: 'Boedo 890', phone: '+54 11 5555-0606', imageUrl: 'https://images.unsplash.com/photo-1609521459269-2c67c291dde8?w=400', category: 'Criolla', openingHours: 'Lun-Dom 10:00-21:00', isActive: true, createdAt: new Date(), updatedAt: new Date() },
    ]);

    await queryInterface.bulkInsert('Products', [
      // Pizzería Don Luigi (LocalId asume que se insertó 1ro entre los 6 locales)
      { name: 'Muzzarella', description: 'Mozzarella, salsa de tomate y orégano', price: 4500, stock: 50, category: 'Pizza', imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200', LocalId: 1, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Napolitana', description: 'Mozzarella, rodajas de tomate, ajo y perejil', price: 5200, stock: 40, category: 'Pizza', imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200', LocalId: 1, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Fugazzeta', description: 'Mozzarella, cebolla y aceitunas', price: 5600, stock: 35, category: 'Pizza', LocalId: 1, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Especial de la casa', description: 'Mozzarella, jamón, morrón, huevo y aceitunas', price: 6200, stock: 30, category: 'Pizza', imageUrl: 'https://images.unsplash.com/photo-1594007654729-407eedc4be65?w=200', LocalId: 1, createdAt: new Date(), updatedAt: new Date() },
      // Hamburguesas del Barrio
      { name: 'Simple', description: 'Pan, carne, lechuga, tomate y mayonesa', price: 3200, stock: 60, category: 'Hamburguesas', imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200', LocalId: 2, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Completa', description: 'Pan, carne, cheddar, panceta, huevo y papas', price: 4200, stock: 50, category: 'Hamburguesas', imageUrl: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=200', LocalId: 2, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Veggie', description: 'Pan integral, medallón de lentejas, palta y rúcula', price: 3800, stock: 25, category: 'Hamburguesas', LocalId: 2, createdAt: new Date(), updatedAt: new Date() },
      // Sushi Master
      { name: 'Philadelphia Roll', description: '8 piezas de salmón, queso crema y pepino', price: 6800, stock: 20, category: 'Sushi', imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=200', LocalId: 3, createdAt: new Date(), updatedAt: new Date() },
      { name: 'California Roll', description: '8 piezas de cangrejo, palta y masago', price: 6200, stock: 25, category: 'Sushi', LocalId: 3, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Nigiri Salmón', description: '5 piezas de salmón fresco sobre arroz', price: 5800, stock: 15, category: 'Sushi', LocalId: 3, createdAt: new Date(), updatedAt: new Date() },
      // La Taquería
      { name: 'Taco al Pastor', description: 'Tortilla de maíz, cerdo adobado, piña y cebolla', price: 2800, stock: 40, category: 'Mexicana', imageUrl: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=200', LocalId: 4, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Burrito Supreme', description: 'Grande con carne, frijoles, queso y guacamole', price: 4500, stock: 30, category: 'Mexicana', LocalId: 4, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Quesadilla de Pollo', description: 'Tortilla de harina con pollo, queso y pico de gallo', price: 3500, stock: 35, category: 'Mexicana', LocalId: 4, createdAt: new Date(), updatedAt: new Date() },
      // Helados Artika
      { name: 'Cucurucho 2 gustos', description: 'Dos sabores a elección en cucurucho crocante', price: 1800, stock: 100, category: 'Postres', imageUrl: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=200', LocalId: 5, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Taza 3 gustos', description: 'Tres bochas con toppings a elección', price: 2500, stock: 80, category: 'Postres', LocalId: 5, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Batido Frutal', description: 'Batido cremoso de frutas naturales', price: 2200, stock: 50, category: 'Postres', LocalId: 5, createdAt: new Date(), updatedAt: new Date() },
      // Empanadas La Doña
      { name: 'Empanada de Carne', description: 'Carne picada, huevo, aceitunas y pasas. Horneada', price: 800, stock: 200, category: 'Criolla', imageUrl: 'https://images.unsplash.com/photo-1609521459269-2c67c291dde8?w=200', LocalId: 6, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Empanada de Pollo', description: 'Pollo, verduras y salsa blanca. Horneada', price: 800, stock: 150, category: 'Criolla', LocalId: 6, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Empanada de Jamón y Queso', description: 'Jamón cocido y mozzarella. Frita', price: 900, stock: 180, category: 'Criolla', LocalId: 6, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Docena Mixta', description: '12 empanadas a elección (mínimo 2 variedades)', price: 8500, stock: 50, category: 'Criolla', LocalId: 6, createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Products', null, {});
    await queryInterface.bulkDelete('Locals', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  },
};
