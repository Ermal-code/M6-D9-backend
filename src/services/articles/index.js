const router = require("express").Router();
const Article = require("../../utils/db").Article;
const Author = require("../../utils/db").Author;
const Category = require("../../utils/db").Category;
const Review = require("../../utils/db").Review;
const { Op } = require("sequelize");

router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const data = await Article.findAll({
        include: [
          {
            model: Category,
            attributes: ["name", "img"],
            where: req.query.categories
              ? {
                  name: { [Op.iLike]: "%" + req.query.categories + "%" },
                }
              : {},
          },
          {
            model: Author,
            attributes: ["name", "img", "email"],
            where: req.query.author
              ? {
                  name: { [Op.iLike]: "%" + req.query.author + "%" },
                }
              : {},
          },
          {
            model: Review,
            include: [{ model: Author, attributes: ["name", "img", "email"] }],
            attributes: ["text", "isClapped"],
          },
        ],
        attributes: ["id", "headLine", "subHead", "content"],

        where:
          req.query.headLine || req.query.content
            ? {
                [Op.or]: [
                  req.query.headLine
                    ? {
                        headLine: {
                          [Op.iLike]: "%" + req.query.headLine + "%",
                        },
                      }
                    : {},
                  req.query.content
                    ? { content: { [Op.iLike]: "%" + req.query.content + "%" } }
                    : {},
                ],
              }
            : {},
        offset: parseInt(req.query.offset) | 0,
        limit: parseInt(req.query.limit) | 10,
      });
      res.status(200).send(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .post(async (req, res, next) => {
    try {
      const newEntry = await Article.create(req.body);
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
      const data = await Article.findByPk(req.params.id);
      if (data) {
        res.status(200).send(data);
      } else {
        const err = new Error();
        err.message = `Article id: ${req.params.id} not found!`;
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
      const updateArticle = await Article.update(req.body, {
        returning: true,
        // plain: true,
        where: {
          id: req.params.id,
        },
      });
      if (updateArticle[1].length > 0) {
        res.status(200).send(updateArticle);
      } else {
        const err = new Error();
        err.message = `Article id: ${req.params.id} not found!`;
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
      const deletedProduct = await Article.destroy({
        where: { id: req.params.id },
      });
      if (deletedProduct === 1) {
        res.status(203).send("Product is deleted");
      } else {
        const err = new Error();
        err.message = `Article id: ${req.params.id} not found!`;
        err.httpStatusCode = 404;
        next(err);
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  });
module.exports = router;
