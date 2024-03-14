const back = require('../backend/user')({})
const jwt = require('jsonwebtoken')

module.exports = function(props){
    return{
        getUser,
        addUser,
        userLogin,
        doesEmailExist,
        updateUser
    }
}
function getUser(req,res){
    let payload = req.body
    back.getUser(payload,function(response){
        res.send(response)
    })
}
function addUser(req, res){
    let payload = req.body
    console.log(payload)
    back.addUser(payload, function(response){
        res.send(response)
    })
}
function updateUser(req, res){
    let payload = req.body
    back.updateUser(payload, function(response){
        res.send(response)
    })
}
function userLogin(req, res){
    let payload = req.body;
    back.userLogin(payload, function(options){
        if(options.status != 200){
           return res.send(options)
        }
        let userInfoLength = options.response.length
        if(userInfoLength==0){
            return res.send({status:404, error: 'Invalid email and password',response:null})
        }

        let userInfo = options.response[0]
        let accessToken = generateToken(userInfo)
        console.log(accessToken);
        res.send({status:200, error: null,response:accessToken})
    
    })
    
}

function generateToken(userPayload){
    const jwtPayload = {
        id: userPayload.id ,
        name:userPayload.name,
        email:userPayload.email,
        phone:userPayload.phone
    }
    let accessToken = jwt.sign(jwtPayload, 'mySecret', {expiresIn:'1d'})
    console.log(accessToken)
    return accessToken
}

function doesEmailExist(req, res){
    let payload = req.body;
    back.doesEmailExist(payload, function(options){
        if(options.status!=200){
            return res.send(options)
        }
        if(options.response.length >0){
            return res.send({status:404, error: 'Invalid email and password',response:null})
        }
        res.send(options)
    })
}