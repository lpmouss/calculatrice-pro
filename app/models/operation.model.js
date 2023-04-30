
const sql = require("./db.js");

// constructor
const Operation = function(operation) {
  this.title = operation.title;
  this.description = operation.description;
  this.fk_user_id = operation.fk_user_id;
};

Operation.create = (newOperation, result) => {
  sql.query("INSERT INTO operations SET ?", newOperation, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created operation: ", { id: res.insertId, ...newOperation });
    result(null, { id: res.insertId, ...newOperation });
  });
};

Operation.findById = (id, result) => {
  sql.query(`SELECT * FROM operations WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found operation: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Operation with the id
    result({ kind: "not_found" }, null);
  });
};

Operation.getAll = (fk_user_id, title, result) => {
  let query = "SELECT * FROM operations WHERE fk_user_id = ?";

  /*if (title != null && title != "") {
    query += ` AND title LIKE '%${title}%'`;
  }*/

  sql.query(query, [fk_user_id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("operations: ", res);
    result(null, res);
  });
};

Operation.getAllPublished = (fk_user_id, result) => {
  sql.query("SELECT * FROM operations WHERE fk_user_id = ?",
    [fk_user_id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("operations: ", res);
    result(null, res);
  });
};

Operation.updateById = (id, operation, result) => {
  sql.query(
    "UPDATE operations SET title = ?, description = ?, fk_user_id = ? WHERE id = ?",
    [operation.title, operation.description, operation.fk_user_id, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Operation with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated operation: ", { id: id, ...operation });
      result(null, { id: id, ...operation });
    }
  );
};

Operation.remove = (id, result) => {
  sql.query("DELETE FROM operations WHERE id = ? LIMIT 1", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Operation with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted operation with id: ", id);
    result(null, res);
  });
};

Operation.removeAll = result => {
  sql.query("DELETE FROM operations", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} operations`);
    result(null, res);
  });
};

module.exports = Operation;
