module.exports = app => {
  const users = require("../controllers/user.controller.js");

  var router = require("express").Router();

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  // Create a new User
  router.post("/", users.create);

  // Retrieve a single User with
  router.post("/login", users.findOne);

  app.use('/api/users', router);
};
