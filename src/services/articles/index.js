const router = require("express").Router();

const Model = require("../../utils/model");
const db = require("../../utils/db");

const Articles = new Model("articles");

router.get("/articles-authors-category", async (req, res, next) => {
  try {
    const query = `SELECT a.headline AS article_headline, a.subhead AS article_subhead ,a.content AS article_content, au.name AS author_name ,
                    c.name AS article_category FROM articles AS a INNER JOIN authors AS au ON a.authorid = au.id INNER JOIN categories AS c ON
                    a.categoryid = c.id `;
    const { rows } = await db.query(query);
    res.status(200).send(rows);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    if (req.query) {
      const { rows } = await Articles.find(req.query);
      res.status(200).send(rows);
    } else {
      const { rows } = await Articles.find();
      res.status(200).send(rows);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/OR", async (req, res, next) => {
  try {
    if (req.query) {
      const { rows } = await Articles.find(req.query, "OR");
      res.status(200).send(rows);
    } else {
      const { rows } = await Articles.find();
      res.status(200).send(rows);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    if (req.body.fields && req.body.fields.length > 0) {
      const { rows } = await Articles.findById(req.params.id, req.body.fields);

      if (rows.length === 0) {
        const err = new Error();
        err.message = `Article Id: ${req.params.id} not found`;
        err.httpStatusCode = 404;
        next(err);
      } else {
        res.status(200).send(rows);
      }
    } else {
      const { rows } = await Articles.findById(req.params.id);
      if (rows.length === 0) {
        const err = new Error();
        err.message = `Article Id: ${req.params.id} not found`;
        err.httpStatusCode = 404;
        next(err);
      } else {
        res.status(200).send(rows);
      }
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const response = await Articles.save(req.body);
    res.status(201).send(response);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const response = await Articles.findByIdAndUpdate(req.params.id, req.body);
    if (response.rowCount === 0) {
      const err = new Error();
      err.message = `Article Id: ${req.params.id} not found`;
      err.httpStatusCode = 404;
      next(err);
    } else {
      res.status(200).send(response);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { rows } = await Articles.findByIdAndDelete(req.params.id);
    res.status(203).send(rows);
  } catch (error) {
    console.log(error);
    next(error);
  }
});
module.exports = router;
