const mongoose = require("mongoose");

//used to create schema
const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price:{
    type: Number,
    required: true
  },
  description:{
    type:String,
    required: true
  },
  imageUrl:{
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Product', productSchema )
// const mongodb = require("mongodb");
// const getDb = require("../util/database").getDb;

// class Product {
//   constructor(title, price, description, imageUrl, id, userId) {
//     (this.title = title),
//       (this.price = price),
//       (this.description = description),
//       (this.imageUrl = imageUrl);
//       this._id = id ? new mongodb.ObjectId(id) : null;
//       this.userId= userId

//   }

//   save() {
//     const db = getDb(); // Get the database connection
//     let dbOp; // Initialize a variable to hold the database operation
//     if (this._id) {
//       // Check if the current object has an _id property
//       // If the product has an _id, it means it already exists in the database, so we update it
//       dbOp = db.collection("products").updateOne(
//         { _id: this._id }, // Find the product by its _id
//         { $set: this } // Update the product with the current object's properties
//       );
//     } else {
//       // If the product does not have an _id, it means it's a new product, so we insert it
//       dbOp = db.collection("products").insertOne(this);
//     }
//     return dbOp
//       .then((result) => {
//         console.log(result); // Log the result of the database operation
//       })
//       .catch((err) => {
//         console.log(err); // Log any error that occurs during the database operation
//       });
//   }

//   static fetchAll() {
//     const db = getDb();
//     return db
//       .collection("products")
//       .find()
//       .toArray()
//       .then((products) => {
//         console.log(products);
//         return products;
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }

//   static findById(prodId) {
//     const db = getDb();
//     const PRODID = new mongodb.ObjectId(prodId);
//     return db
//       .collection("products")
//       .find({ _id: PRODID })
//       .next()
//       .then((product) => {
//         console.log(product);
//         return product;
//       })
//       .catch((err) => console.log(err));
//   }

//   static deleteById(prodid) {
//     const db = getDb();

//     return db
//       .collection("products")
//       .deleteOne({ _id: new mongodb.ObjectId(prodid) })
//       .then((res) => console.log("deleted"))
//       .catch((err) => {
//         console.log(err);
//       });
//   }
// }

// module.exports = Product;
