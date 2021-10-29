const exp = require('express')
const userapp = exp.Router()
const ExpressAsyncHandler = require('express-async-handler')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')



userapp.use(exp.json())



userapp.get("/getusers",ExpressAsyncHandler(async(req,res)=>
{
    let usercollectionobj = req.app.get("usercollectionobj")
   let users = await usercollectionobj.find().toArray()
   if(users===null)
   {
       res.send("no users :(")
   }
   else
   {
       res.send({message:users})
   }
}))

userapp.get("/getusers/:un",ExpressAsyncHandler(async(req,res)=>
{
    let usercollectionobj = req.app.get("usercollectionobj")
    let un = req.params.un
    let searchuser = await usercollectionobj.findOne({username:un})
    if(searchuser===null)
    {
        res.send("No user exists :(")
    }
    else
    {
        res.send({message:searchuser})
    }
}))

//posting operation
userapp.post("/createusers",ExpressAsyncHandler(async(req,res)=>
{
    let usercollectionobj = req.app.get("usercollectionobj")
    let user=req.body
    let searchuser = await usercollectionobj.findOne({username:user.username})
    if(searchuser!==null)
    {
        res.send({message:"user already exists :("})
    }
    else
    {
        let hashpassword = await bcryptjs.hash(user.password,7)
        user.password = hashpassword
        await usercollectionobj.insertOne(user)
        res.send({message:"user created"})
    }
}))


userapp.post("/login",ExpressAsyncHandler(async(req,res)=>
{
    let usercollectionobj = req.app.get("usercollectionobj")
     let credentials = req.body
     let searchuser = await usercollectionobj.findOne({username:credentials.username})
     if(searchuser===null)
     {
         res.send({message:"Invalid access"})
     }
     else
     {
         let result = await bcryptjs.compare(credentials.password,searchuser.password)
         if(result===false)
         {
             res.send({message:"Invalid Password"})
         }
         else
         {
             let signedToken = jwt.sign({username:credentials.username},'abcdef',{expiresIn:150})
             res.send({message:"login success",token:signedToken,
             username:credentials.username,userobj:searchuser})
         }
     }
}))

module.exports=userapp