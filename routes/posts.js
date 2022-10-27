const express = require('express');
const router = express.Router();
const Meeting = require('../models/meeting')
const {authUser,authRole} = require('../Authentication')
const {canAddMeeting,canViewMeeting,seeMeeting,setMeeting} = require('../permissions/canAddMeeting');
const { application } = require('express');

//setting routes
router.get('/', (req,res)=>{
    res.json("we are on post")
})
router.get('/:userId',authUser, async (req,res)=>{
    if(req.user[0].role==='admin'||req.params.userId==req.body.userId){
        try {
        const post = await Meeting.findOne({userId: req.params.userId})
        res.json(post)
    } catch (err) {
        res.json({message:err})
    }
    }
    else{
        res.send("NOT ALLOWED TO VIEW")
    }
})


//saving meeting time to databse
router.post('/',async (req,res)=>{
    const meeting = new Meeting({
        userId: req.body.userId,
        name: req.body.name,
        start_time: req.body.start_time,
        end_time: req.body.end_time,
        time_slot: req.body.time_slot,
        role: req.body.role
    });
    const sameTime = await Meeting.find({start_time:{$lte:req.body.start_time},end_time:{$gte:req.body.end_time}})
    console.log(sameTime)
    if(sameTime.length>0){
        res.json(
            {
            message: "the slot is bussy",
            sameTime
            }
        )
    }
    else{
        try {
        const savedMeeting = await meeting.save()
        res.json(savedMeeting)
    } catch (err) {
        res.json({message: err})
    }
    }
})
// router.use(checkTime)
// async function checkTime(req,res,next){
    
//     next()
// }
// const sameTime = await Meeting.find({start_time:{gte:req.user[0].start_time},end_time:{lte:req.user[0].end_time}})
//     console.log(sameTime)
module.exports = router
