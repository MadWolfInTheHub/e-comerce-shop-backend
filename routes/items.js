const {Item, validate } = require('../modules/item')

const mongoose = require('mongoose');
const express = require('express');
const router = express.Router(); 

router.get('/', async (req, res) => {
  const items = await Item.find().sort('name');

  res.send(items);
});

router.get('/:id', async (req, res) => {
  const item = await Item.findById(req.params.id);

  if(!item) return res.status(404).send('Item not found.');

  res.send(item);
});

router.post('/', async(req, res) => {
  const { error } = validate(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  const newItem = req.body;

  const item = await new Item({
    category: {
      name: newItem.category.name,
      id: newItem.category.id,
    },
    description: newItem.description,
    image: newItem.image,
    price: newItem.price,
    numberInStock: newItem.numberInStock,
    title: newItem.title,
  });

  await item.save();

  res.send(item);
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  const newItem = req.body;

  const item = await Item.findByIdAndUpdate(req.params.id, {
    category: {
      name: newItem.category.name,
      id: newItem.category.id,
    },
    description: newItem.description,
    image: newItem.image,
    price: newItem.price,
    numberInStock: newItem.numberInStock,
    title: newItem.title,
  }, { new: true });

  if(!item) return res.status(404).send('Item not found');

  res.send(item);
});

router.delete('/:id', async (req, res) => {
  const item = await Item.findByIdAndDelete(req.params.id);

  if(!item) return res.status(400).send('Item not found');

  res.send(item);
})


module.exports = router;