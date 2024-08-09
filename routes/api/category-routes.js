const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const data = await Category.findAll({include: [Product]});
    res.json(data);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.get('/:id', async ({params}, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const data = await Category.findByPk(params.id, {
      include: [Product]
    });
    res.json(data);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const data = await Category.create(req.body);
    res.json(data);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.put('/:id', async ({params}, res) => {
  // update a category by its `id` value
  try {
    const data = await Category.update(req.body, {where: {id: params.id}});
    res.json(data);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.delete('/:id', async ({params}, res) => {
  // delete a category by its `id` value
  try {
    const data = await Category.destroy({where: {id: params.id}});
    res.json(data);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
