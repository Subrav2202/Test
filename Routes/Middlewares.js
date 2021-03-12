
const User=require('../Db');

const emailvalidation = async (req, res, next) => {

   console.log("this of middleware",req.body);
  
  const email = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const pass = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  if (email.test(req.body.email) && pass.test(req.body.password)) 
  {
    await User.findOne({ email:req.body.email}).exec().then(data=>{
      console.log(data)
      if(data==null)
        next();
      else{
        res.status(200).send({token:"user allready exist please login"})
      }
    }).catch(error=>{
      console.log(error)
    })
  }  
  else
    res.send({token:"invalid email address please follow the rule"})
};
module.exports=emailvalidation
