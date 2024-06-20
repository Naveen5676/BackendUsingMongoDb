const { getDb } = require("../util/database");
const mongodb = require("mongodb");
const getdb = require("../util/database").getDb;

class User {
  constructor(username, email) {
    this.name = username;
    this.email = email;
  }

  save() {
    const db = getDb();
    return db
      .collection("users")
      .insertOne(this)
      .then((res) => {
        console.log("inserted a user");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static findById(userId) {
    const db = getDb();
    return db
      .collection("users")
      .findOne({ _id: new mongodb.ObjectId(userId) })
      .then((res) => {
        console.log('find by id user',res);
        return res
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
module.exports = User;
