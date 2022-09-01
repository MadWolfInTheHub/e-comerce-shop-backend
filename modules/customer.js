const Joi = require('joi');
const mongoose = require('mongoose');
const passwordComplexity = require("joi-password-complexity");

const complexityOptions = {
  min: 5,
  max: 250,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 1,
  requirementCount: 2,
};

const Customer = mongoose.model('Customer', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 50,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 255,
  },
  address: {
    type: String,
    required: true,
  },
  isAdmin: Boolean,
}));

const validateCustomer = (customer) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(3).max(50).email().required(),
    address: Joi.string().min(3).max(255),
    password: passwordComplexity(complexityOptions),
  })
  return schema.validate(customer);
};

exports.Customer = Customer;
exports.validate = validateCustomer;
 