const mongoose = require('mongoose');

const LiquidSchema = new mongoose.Schema({
  brand: {
    type: String
  },
  name: {
    type: String
  },
  flavor: {
    type: String
  },
  nicotine: {
    type: Number
  },
  type: {
    type: String
  },
  price: {
    type: Number
  },
});

const Liquid = mongoose.model('Liquid', LiquidSchema);

exports.Liquid = Liquid;