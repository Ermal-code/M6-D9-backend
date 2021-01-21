const router = require("express").Router();

const Model = require("../../utils/model");

const Categories = new Model("categories");

router.get("/", async (req, res, next) => {
  try {
    if (req.query) {
      const { rows } = await Categories.find(req.query);
      res.status(200).send(rows);
    } else {
      const { rows } = await Categories.find();
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
      const { rows } = await Categories.findById(
        req.params.id,
        req.body.fields
      );

      if (rows.length === 0) {
        const err = new Error();
        err.message = `Category Id: ${req.params.id} not found`;
        err.httpStatusCode = 404;
        next(err);
      } else {
        res.status(200).send(rows);
      }
    } else {
      const { rows } = await Categories.findById(req.params.id);
      if (rows.length === 0) {
        const err = new Error();
        err.message = `Category Id: ${req.params.id} not found`;
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
    const response = await Categories.save(req.body);
    res.status(201).send(response);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const response = await Categories.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    if (response.rowCount === 0) {
      const err = new Error();
      err.message = `Category Id: ${req.params.id} not found`;
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
    const { rows } = await Categories.findByIdAndDelete(req.params.id);
    res.status(203).send(rows);
  } catch (error) {
    console.log(error);
    next(error);
  }
});
module.exports = router;