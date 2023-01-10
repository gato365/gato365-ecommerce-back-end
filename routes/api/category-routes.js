const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products (How?)
  try {
    const categoriesData = await Category.findAll({

      include: [Product]

    });



    res.status(200).json(categoriesData);

  } catch (err) {

    res.status(500).json(err);

  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findOne({

      where: { id: req.params.id },
      include: [Product]

    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }


});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }

});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value

  try {
    const categoryData = await Category.findById(req.params.id, 
      (err,category) => {
      // Update the category with the request body

      category.category_name = req.body.category_name; 


      // Save the post
      category.save((err, updatedcategory) => {
        if (err) {
          res.status(500).send(err);
        }
        res.status(200).send(updatedcategory);
      });
    });


  } catch (err) {
    res.status(400).json(err);
  }

});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
