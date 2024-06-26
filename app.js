const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const errorController = require("./controllers/error");
const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("667552c9d3f22269365ba397")
    .then((user) => {
      req.user = user;
      //console.log('finding user _id',user)
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    "mongodb+srv://naveenwali403:0e8lMxGid1SzraXs@cluster0.tbe89z3.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then((result) => {
    User.findOne().then((user)=>{
      if (!user){
        const user = new User({
          name: 'Max',
          email: 'max@test.com',
          cart:{
            items:[]
          }
        })
        user.save();
      }
    })
    console.log('connected to mongodb using mongoose')
    app.listen(3000);
  }).catch(err=>{console.log(err)});
