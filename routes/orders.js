const { Order, validate } = require('../modules/order')
const { Customer } = require('../modules/customer')

const mongoose = require('mongoose');
const express = require('express');
const { Item } = require('../modules/item');
const router = express.Router(); 

router.get('/', async (req, res) => {
  const orders = await Order.find().sort('name');

  res.send(orders);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  // const i = await Customer.findById(req.body.customer.Id)
  // if(!customer) return res.status(404).send("Customer not found!");
  if(error) return res.status(400).send(error.details[0].message)

  const listOfItems = req.body.orderItems.map(el => el.itemId);

  const items = await Item.find({ _id: { $in : listOfItems }})

  console.log(items);
  
  const customer = await Customer.findById(req.body.customerId)
  if(!customer) return res.status(404).send("Customer not found!");

  const order = new Order({
    orderItems: items,
    customer: {
      _id: req.body.customerId,
      name: customer.name,
      address: customer.address,
    },
    status: req.body.status,
    payed: req.body.payed
  });

  await order.save();

  res.send(order);
});

module.exports = router