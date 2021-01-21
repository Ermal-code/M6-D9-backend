const router = require("express").Router();
const Review = require("../../utils/db").Review;

router.route("/").get(async (req, res, next) => {
  try {
    const data = await Review.findAll();
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
});
router.route("/:articleId/:authorId").post(async (req, res, next) => {
  try {
    const newEntry = await Review.create({
      ...req.body,
      articleId: req.params.articleId,
      authorId: req.params.authorId,
    });

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
      const data = await Review.findByPk(req.params.id);
      if (data) {
        res.status(200).send(data);
      } else {
        const err = new Error();
        err.message = `Review id: ${req.params.id} not found!`;
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
      const updateReview = await Review.update(req.body, {
        returning: true,
        // plain: true,
        where: {
          id: req.params.id,
        },
      });
      if (updateReview[1].length > 0) {
        res.status(200).send(updateReview);
      } else {
        const err = new Error();
        err.message = `Review id: ${req.params.id} not found!`;
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
      const deletedProduct = await Review.destroy({
        where: { id: req.params.id },
      });
      if (deletedProduct === 1) {
        res.status(203).send("Product is deleted");
      } else {
        const err = new Error();
        err.message = `Review id: ${req.params.id} not found!`;
        err.httpStatusCode = 404;
        next(err);
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  });
module.exports = router;
