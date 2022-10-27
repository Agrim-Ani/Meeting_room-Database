

 function authUser(req,res,next) {
    if(req.user.length=="0"){
        //forbidden status code 403
        res.status(403)
        return res.send("you need to sign in")
    }
    next()
}
function authRole(role) {
    return (req,res,next)=>{
        if(req.user[0].role!==role){
            res.status(401)
            res.send("NOT ALLOWED!")
        }
        next()
    }
}
module.exports = {
    authUser,
    authRole
}