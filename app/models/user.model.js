
const sql = require("./db.js");

// constructor
const User = function(user) {
  this.login = user.login;
  this.mdp = user.mdp;
};

User.create = (newUser, result) => {
  sql.query("INSERT INTO user SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created user: ", { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};

User.findById = (login, mdp, result) => {
  sql.query(`SELECT * FROM user WHERE login = '${login}' and mdp = '${mdp}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found User
    result({ kind: "not_found" }, null);
  });
};

module.exports = User;
