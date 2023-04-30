module.exports = app => {
  const operations = require("../controllers/operation.controller.js");

  var router = require("express").Router();

  // Create a new Operation
  router.post("/", operations.create);

  // Retrieve all Operations
  router.get("/", operations.findAll);

  // Retrieve all published Operations
  router.get("/published", operations.findAllPublished);

  // Retrieve a single Operation with id
  router.get("/:id", operations.findOne);

  // Update a Operation with id
  router.put("/:id", operations.update);

  // Delete a Operation with id
  router.delete("/:id", operations.delete);

  // Delete all Operations
  //router.delete("/", operations.deleteAll);

  app.use('/api/operations', router);
};
