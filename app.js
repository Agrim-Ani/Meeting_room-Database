const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const postRoute = require('./routes/posts')
const dashboardRoute = require('./routes/dashboard')
const Meeting = require('./models/meeting');
const {authUser} = require('./Authentication')

require('dotenv/config');
//instialising
const app = express();
app.use(bodyParser.json())
app.use(express.json())
app.use(setUser)
//route to home page
app.get('/', (req,res)=>{
    res.send("we are on home page");
})
//route to dashboard page i.e import route
app.use('/dashboard',authUser, dashboardRoute)


//route to post i.e import route
app.use('/posts',postRoute);



//testing setuser
// app.get('/data',async (req,res)=>{
//     // const data = await Meeting.find({userId: req.body.userId});
//     // console.log(data);
//     app.use(setUser)
// })


//function to setuser
async function setUser(req, res, next) {
    const userId = req.body.userId
    if (userId) {
    req.user =  await Meeting.find({userId: req.body.userId})
    // console.log(req.user.length)//this will help incondition for user auth
    // console.log(req.user[0].name)
    }
    next()
}

//connecting to database 
mongoose.connect(
    process.env.DB_CONNECTION,
    ()=>console.log("database connected")
);
//server listening
app.listen(3000, () => console.log('server is running at port 3000....'));