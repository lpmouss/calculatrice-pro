const User = require("../models/user.model.js");

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a User
  const user = new User({
    login: req.body.login,
    mdp: req.body.mdp
  });

  // Save User in the database
  User.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    else res.send(data);
  });
};

// Find a single User
exports.findOne = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  User.findById(req.body.login, req.body.mdp, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with login : ${req.body.login} and password : ${req.body.mdp}.`
        });
      } else {
        res.status(500).send({
          message: `Error retrieving User with login : ${req.body.login} and password : ${req.body.mdp}` 
        });
      }
    } else res.send(data);
  });
};
