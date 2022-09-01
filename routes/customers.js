const { Customer, validate } = require('../modules/customer');

const mongoose = require('mongoose');

const express = require('express');
const router = express.Router();

router.get('/', async function (req, res) {

  const customers = await Customer.find().sort('name');
  res.send(customers);
  
});

router.get('/:id', async function (req, res) {

  const customer = await Customer.findById(req.params.id);

  if(!customer) return res.status(404).send('Customer not found.');

  res.send(customer);
});

router.post('/', async (req, res) => {

  const { error } = validate(req.body)
  if(error) return res.status(404).send(error.details[0].message);

  const customer = new Customer({ 
    name: req.body.name, 
    email: req.body.email, 
    password: req.body.password,
    address: req.body.address,
    isAdmin: false
  });

  await customer.save();

  res.send(customer)
});

router.put('/:id', async function (req, res) {

  const { error } = validate(req.body);
  if(error) return res.status(400).send('error.details[0].message');

  const customer = await Customer.findByIdAndUpdate(req.params.id, 
    {
    name: req.body.name, 
    email: req.body.email, 
    password: req.body.password,
    isAdmin: false
    }, { new: true }
  );

  if(!customer) return res.status(404).send('Customer not found.')

  res.send(customer);
});

router.delete('/:id', async function (req, res) {
  const customer = await Customer.findByIdAndDelete(req.params.id);

  if(!customer) return res.status(404).send('Customer not found.')

  res.send(customer);
});



module.exports = router;