const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
jwtKey="private"
const router = express.Router();
const emailvalidation = require("./Middlewares");

const User = require("../Db");

console.log("this of routing", User);

const Auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
      const token = authHeader.split(' ')[1];
      jwt.verify(token,jwtKey, (err, user) => {
          if (err) {
              res.status(400)
          }
          req.user = user;
          next();
      });
  } else {
      res.status(401);
  }
};

router.post("/register", emailvalidation, async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const password=await bcrypt.hash(req.body.password, salt);
  console.log(password);

  const new_user = new User({
    email: req.body.email,
    password: password,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  });

  const user = await new_user.save();
  jwt.sign({ message: "Registered", data: user },jwtKey,{ expiresIn: 60 * 60 *60 },(error,token)=>{
    res.status(200).json({token});
  });
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email })
  if (user) {
    // check user password with hashed password stored in the database
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (validPassword) {
      jwt.sign({ message: "Valid password",data:"" },jwtKey,{ expiresIn: 60 * 60 *60},(error,token)=>{
        res.status(200).json({token});
      });
    } else {
      res.status(400).json({ token: "Invalid Password" });
    }
  } else {
    res.status(401).json({ token: "User does not exist" });
  }
});

router.get("/user",Auth,async (req, res) => {
  const data=await User.find({})
  res.send(data)
})


module.exports = router;
