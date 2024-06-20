const { getDb } = require("../util/database");
const mongodb = require("mongodb");
const getdb = require("../util/database").getDb;

class User {
  constructor(username, email, cart, id) {
    this.name = username;
    this.email = email;
    this.cart = cart; //{items:[]}
    this._id = id;
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

  addToCart(product) {
    // Ensure this.cart.items exists
    if (!this.cart || !Array.isArray(this.cart.items)) {
      this.cart = { items: [] };
    }
    const cartProductIndex = this.cart.items.findIndex(cp=>{
      return cp.productId.toString() === product._id.toString();
    });
    let newQuantity = 1
    const updatedCartItems = [...this.cart.items]
    if(cartProductIndex>=0){
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity= newQuantity
    }else{
      updatedCartItems.push({productId: new mongodb.ObjectId(product._id), quantity: newQuantity})
    }

    
    const updatedCart = { items: updatedCartItems };
    const db = getDb();
    return db
      .collection("users")
      .updateOne(
        { _id: new mongodb.ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      );
  }

  static findById(userId) {
    const db = getDb();
    return db
      .collection("users")
      .findOne({ _id: new mongodb.ObjectId(userId) })
      .then((res) => {
        //console.log('find by id user',res);
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
module.exports = User;
