const Joi = require('joi');
const mongoose = require('mongoose');

const Item = mongoose.model('Item', new mongoose.Schema({
  category: {
    name: {
      type: String,
      required: true,
      minlength: 3,
    },
    id: {
      type: String,
      required: true,
    },
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  numberInStock: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
}));

const validateItem = (item) => {
  const schema = Joi.object({
    category: {
      name: Joi.string(),
      id: Joi.string(),
    },
    description: Joi.string(),
    image: Joi.string(),
    price: Joi.number(),
    numberInStock: Joi.number(),
    title: Joi.string(),
  })
  return schema.validate(item);
}

exports.Item = Item;
exports.validate = validateItem;