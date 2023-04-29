const Operation = require("../models/operation.model.js");

// Create and Save a new Operation
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Operation
  const operation = new Operation({
    title: req.body.title,
    description: req.body.description,
    fk_user_id: req.body.fk_user_id
  });

  // Save Operation in the database
  Operation.create(operation, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Operation."
      });
    else res.send(data);
  });
};

// Retrieve all Operations from the database (with condition).
exports.findAll = (req, res) => {
  const fk_user_id = req.query.fk_user_id;
  const title = req.query.title;

  Operation.getAll(fk_user_id, title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving operations."
      });
    else res.send(data);
  });
};

// Find a single Operation by Id
exports.findOne = (req, res) => {
  Operation.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Operation with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Operation with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// find all published Operations
exports.findAllPublished = (req, res) => {
  Operation.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving operations."
      });
    else res.send(data);
  });
};

// Update a Operation identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Operation.updateById(
    req.params.id,
    new Operation(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Operation with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Operation with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Operation with the specified id in the request
exports.delete = (req, res) => {
  Operation.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Operation with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Operation with id " + req.params.id
        });
      }
    } else res.send({ message: `Operation was deleted successfully!` });
  });
};

// Delete all Operations from the database.
exports.deleteAll = (req, res) => {
  Operation.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all operations."
      });
    else res.send({ message: `All Operations were deleted successfully!` });
  });
};
