const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // Tags - Issue 1: be sure to include its associated Product data
  try {
    const tagsData = await Tag.findAll({

      // include: Product
      include: [{ model: Product, through: ProductTag, as: 'tag_has_prod' }]


    });

    res.status(200).json(tagsData);



  } catch (err) {
    res.status(500).json(err);

  }


});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data

  try {
    const tagData = await Tag.findOne({

      where: { id: req.params.id },
      include: [{ model: Product, through: ProductTag, as: 'tag_has_prod' }]

    });

    if (!tagData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }




});

router.post('/', async (req, res) => {
  // create a new tag

  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    // update product data
    const tag = await Tag.update(req.body, { where: { id: req.params.id } })
    // find all associated tags from ProductTag
    res.json(tag)
  } catch (err) {
    res.status(400).json(err);
  };

});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value



  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }




});

module.exports = router;
