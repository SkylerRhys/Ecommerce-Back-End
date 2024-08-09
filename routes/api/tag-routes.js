const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const data = await Tag.findAll({
      include: [{
        model: Product,
        through: ProductTag
      }]
    });
    res.json(data);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.get('/:id', async ({params}, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const data = await Tag.findByPk(params.id, {
      include: [{
        model: Product,
        through: ProductTag
      }]
    });
    res.json(data);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.post('/', async ({body}, res) => {
  // create a new tag
  try {
    const data = await Tag.create(body);
    res.json(data);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.put('/:id', async ({params, body}, res) => {
  // update a tag's name by its `id` value
  try {
    const data = await Tag.update(body, {where: {id: params.id}});
    res.json(data);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.delete('/:id', async ({params}, res) => {
  // delete on tag by its `id` value
  try {
    const data = await Tag.destroy({where: {id: params.id}});
    res.json(data);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
