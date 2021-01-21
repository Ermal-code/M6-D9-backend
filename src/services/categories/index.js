const router = require("express").Router();
const Category = require("../../utils/db").Category;

router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const data = await Category.findAll();
      res.status(200).send(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .post(async (req, res, next) => {
    try {
      const newEntry = await Category.create(req.body);
      res.status(201).send(newEntry);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });
router
  .route("/:id")
  .get(async (req, res, next) => {
    try {
      const data = await Category.findByPk(req.params.id);
      if (data) {
        res.status(200).send(data);
      } else {
        const err = new Error();
        err.message = `Category id: ${req.params.id} not found!`;
        err.httpStatusCode = 404;
        next(err);
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .put(async (req, res, next) => {
    try {
      const updateCategory = await Category.update(req.body, {
        returning: true,
        // plain: true,
        where: {
          id: req.params.id,
        },
      });
      if (updateCategory[1].length > 0) {
        res.status(200).send(updateCategory);
      } else {
        const err = new Error();
        err.message = `Category id: ${req.params.id} not found!`;
        err.httpStatusCode = 404;
        next(err);
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const deletedProduct = await Category.destroy({
        where: { id: req.params.id },
      });
      if (deletedProduct === 1) {
        res.status(203).send("Product is deleted");
      } else {
        const err = new Error();
        err.message = `Category id: ${req.params.id} not found!`;
        err.httpStatusCode = 404;
        next(err);
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  });
module.exports = router;
