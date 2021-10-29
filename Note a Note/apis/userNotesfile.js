const exp = require('express')
const userNotesapp = exp.Router()
const ExpressAsyncHandler = require('express-async-handler')

userNotesapp.use(exp.json())

userNotesapp.get("/getNotes/:un",ExpressAsyncHandler(async(req,res)=>
{
    let userNotescollectionobj = req.app.get("userNotescollectionobj")
    let un=req.params.un
    let notes=await userNotescollectionobj.findOne({username:un})
    if(notes===null)
    {
        res.send({message:"no notes"})
    }
    else
    {
       res.send({message:notes})
    }
}))

userNotesapp.get("/getNotes/:un/:title",ExpressAsyncHandler(async(req,res)=>
{
    let userNotescollectionobj=req.app.get("userNotescollectionobj")
    let unid=+(req.params.uid)
    let un=req.params.un
    let userNotesObj=await userNotesapp.findOne({username:un})

    let userNotesArray = userNotesobj.userNotes
    let resultNotes = userNotesArray.filter((obj)=>
    {
        if(obj.uid===unid)
        {
            return obj
        }
    })
    if(resultNotes!=null)
    {
        res.send({message:resultNotes})
    }
}))

userNotesapp.post("/createNote",ExpressAsyncHandler(async(req,res)=>
{
    let userNotescollectionobj=req.app.get("userNotescollectionobj")
    let newNotes=req.body
    let notes=newNotes.userNotes[0]
    let existingUserNote=await userNotescollectionobj.findOne({username:newNotes.username})
    if(existingUserNote===null)
    {
        userNotescollectionobj.insertOne(newNotes)
        res.send({message:"your first notes is created :))"})
    }
    else
    {
        let x=existingUserNote.userNotes.filter((obj)=>obj.Title===notes.Title)
        if(x.length>=1)
        { 
            res.send({message:"Notes with this Title exists please change the title" ,created:0})
        }
        else
        {
            existingUserNote.userNotes.push(newNotes.userNotes[0])
            await userNotescollectionobj.updateOne({username:newNotes.username},{$set:{...existingUserNote}})
            res.send({message:"your notes is created :))" , created:1})
        }
    }
}))

userNotesapp.put("/updateNote/:title",ExpressAsyncHandler(async(req,res)=>
{
   let userNotescollectionobj=req.app.get("userNotescollectionobj")
   let ut=req.params.title
   let updateNote=req.body
   let un=updateNote.username
   let userNotesObj=await userNotescollectionobj.findOne({username:un})

   let userNotesArray = userNotesobj.userNotes
   let index = userNotesArray.findIndex(obj=>obj.Title===ut)
   userNotesArray.splice(index,1,updateNotesArray)
   userNotesobj.userNotes=[...userNotesArray]
   await userNotescollectionobj.updateOne({username:un},{$set:{...userNotesObj}})
   res.send({message:"updated successfully"})
}))

userNotesapp.delete("/deleteNote/:un/:title",ExpressAsyncHandler(async(req,res)=>
{
   let userNotescollectionobj=req.app.get("userNotescollectionobj")
   let ut=req.params.title
   let un=req.params.un
   let userNotesObj=await userNotescollectionobj.findOne({username:un})

   let userNotesArray = userNotesObj.userNotes
   let index = userNotesArray.findIndex(obj=>obj.Title===ut)
   userNotesArray.splice(index,1)
   userNotesObj.userNotes=[...userNotesArray]
   await userNotescollectionobj.updateOne({username:un},{$set:{...userNotesObj}})
   res.send({message:"deleted successfully"})
}))


module.exports=userNotesapp
