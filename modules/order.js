const Joi = require('joi');
// const { Item } = require('./item');
// const { Customer } = require('./customer');

const mongoose = require('mongoose');

const Order =  mongoose.model('Order', new mongoose.Schema({
  orderItems: [
    {
      amount: {
        type: Number,
        required: true,
      },
      item: {
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
      },
    }
  ],
  price: Number,
  status: {
    inProgress: {
      type: Boolean,
      default: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    customerRefusal: {
      type: Boolean,
      default: false,
    },
    sellerRefusal: {
      type: Boolean,
      default: false,
    },
  },
  payed: {
    type: Boolean,
    default: false,
  },
  customer: new mongoose.Schema({
    _id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    }
  })
}));

const validateOrder = (order) => {
  const schema = Joi.object({
    orderItems: Joi.array().items(Joi.object().keys({
      amount: Joi.number().required(),
      itemId: Joi.string().required(),
      size: Joi.string().required(),
     })).required(),
    customerId: Joi.string().required(),
  });

  return schema.validate(order);
}

exports.Order = Order;
exports.validate = validateOrder;