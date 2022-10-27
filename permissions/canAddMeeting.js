const meeting = require('../models/meeting')
const Meeting = require('../models/meeting')
const role = {
    Admin: 'admin',
    User: 'user'
}
function canAddMeeting(user) {
    return (user[0].role === role.Admin)
}
function canViewMeeting(user,userId) {
    return (
        user[0].userId === userId
        )
}
function seeMeeting(req,res,next) {
    if(!canViewMeeting(req.user,req.params.userId)){
        res.status(401)
        res.send('Not Allowed!')
    }
    next()
}

function setMeeting(req,res,next){
    if(!canAddMeeting(req.user)){
    res.status(401)
    return res.send('Not Allowed')
    }
    next()
}
module.exports = { canAddMeeting, canViewMeeting, seeMeeting, setMeeting }