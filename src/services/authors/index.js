const router = require("express").Router();
const Author = require("../../utils/db").Author;

router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const data = await Author.findAll();
      res.status(200).send(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .post(async (req, res, next) => {
    try {
      const newEntry = await Author.create(req.body);
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
      const data = await Author.findByPk(req.params.id);
      if (data) {
        res.status(200).send(data);
      } else {
        const err = new Error();
        err.message = `Author id: ${req.params.id} not found!`;
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
      const updateAuthor = await Author.update(req.body, {
        returning: true,
        // plain: true,
        where: {
          id: req.params.id,
        },
      });
      if (updateAuthor[1].length > 0) {
        res.status(200).send(updateAuthor);
      } else {
        const err = new Error();
        err.message = `Author id: ${req.params.id} not found!`;
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
      const deletedProduct = await Author.destroy({
        where: { id: req.params.id },
      });
      if (deletedProduct === 1) {
        res.status(203).send("Product is deleted");
      } else {
        const err = new Error();
        err.message = `Author id: ${req.params.id} not found!`;
        err.httpStatusCode = 404;
        next(err);
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  });
module.exports = router;
