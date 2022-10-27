const express = require('express');
const router = express.Router();
const {authUser} = require('../Authentication')
const {setMeeting} = require('../permissions/canAddMeeting')


router.get('/', authUser, (req,res)=>{
    res.send("we are on dashboard");
});
router.get('/admin',authUser, setMeeting,(req,res)=>{
    res.redirect(307,'/posts')
})

module.exports = router