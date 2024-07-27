const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

//http://localhost:3001/api/tags/
router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({include: [Product]});
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//http://localhost:3001/api/tags/:id
router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {include: [Product]});
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//http://localhost:3001/api/tags/
router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

//http://localhost:3001/api/tags/:id
router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updateTag = await Tag.update(req.body, {
      where: {id: req.params.id}
    });
    res.status(200).json(updateTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

//http://localhost:3001/api/tags/:id
router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleteTag = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!deleteTag) {
      res.status(404).json({ message: 'No location found with this id!' });
      return;
    }

    res.status(200).json(deleteTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
