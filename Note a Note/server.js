//om namah shivaya
const exp = require('express')
const app = exp()
const path = require('path')
const mc = require('mongodb').MongoClient


//--------------------------connecting front end and backend-----------------------
app.use(exp.static(path.join(__dirname, './dist/FirstApp/')))


/*----------------------------------importing our api-------------------------*/
const userapp = require('./apis/user-api')
const userNotesapp=require('./apis/userNotesfile')

//-----------------------------mongodb connection setting--------------------------
//data base url
//const databaseurl = "mongodb+srv://firstdb:firstdb@shankari.y5ud8.mongodb.net/my_first_database?retryWrites=true&w=majority"
const databaseurl = "mongodb+srv://notesApp:notes@shankari.y5ud8.mongodb.net/notesWritingApp?retryWrites=true&w=majority"
//const databaseurl = "mongodb://userNotes:userNotes@shankari-shard-00-00.y5ud8.mongodb.net:27017,shankari-shard-00-01.y5ud8.mongodb.net:27017,shankari-shard-00-02.y5ud8.mongodb.net:27017/userNotes?ssl=true&replicaSet=atlas-6eowk0-shard-0&authSource=admin&retryWrites=true&w=majority"

//----------------------------connecting to our database-------------------------------
mc.connect(databaseurl,{useNewUrlParser:true,useUnifiedTopology:true},(err,client)=>
{
    if(err)
    {
        console.log("err in connecting to database!!!!!!!!!!!!!!!!!!!!!!!!")
    }
    else
    {
        let databaseobj = client.db("notesWritingApp")
        let usercollectionobj = databaseobj.collection("usercollection1")
        let usernotescollectionobj = databaseobj.collection("notes1")

        console.log("connected to database :))))) :)))) :))))))")

         /*---------------------------------setting collection names----------------------*/
         app.set("usercollectionobj",usercollectionobj)
         app.set("userNotescollectionobj",usernotescollectionobj)
         
    }
})


//-----------------------------------------using middleware to go to user-api-----------------------
app.use("/users",userapp)
app.use("/userNotes",userNotesapp)

/*---------------------------- checking if path is correct or not------------------------*/
app.use((req, res, next) => {

    res.send({ message: `path ${req.url} is invalid` })
})




//assigning port number
const port=3000
app.listen(port,()=>console.log(`server listening in ${port}.....`))
