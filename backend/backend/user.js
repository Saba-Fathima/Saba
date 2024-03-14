const db = require('../mysql')
const md5 = require('md5')
module.exports = function(props){
    return{
        getUser,
        addUser,
        doesEmailExist,
        userLogin,
        updateUser
    }
}
function getUser(payload, callback){
    let email = payload.email
    let sqlStmt = `SELECT * FROM users WHERE email = "${email}"`
    db.query(sqlStmt, function(err, response){
        if(err){
            let options = {
                status: 404,
                response: null,
                error: err
            }
            callback(options)
        }else{
            let options = {
                status: 200,
                error: null,
                response: response,
            }
            callback(options)
        }
    })
}
function updateUser(payload, callback){
    let id = payload.id
    let name = payload.name
    let phone = payload.phone
    let email = payload.email
    let sqlStmt = `UPDATE users SET name = "${name}", phone = "${phone}", email = "${email}" WHERE id = "${id}"`
    db.query(sqlStmt, function(err, response){
        if(err){
            let options = {
                status: 404,
                response: null,
                error: err
            }
            callback(options)
        }else{
            let options = {
                status: 200,
                error: null,
                response: response,
            }
            callback(options)
        }
    })
}
function addUser(payload, callback){
    let name = payload.name
    let phone = payload.phone
    let email = payload.email
    let pass = payload.password
    let sqlStmt = `INSERT INTO users (name, phone, email, password) 
    VALUES ("${name}","${phone}","${email}","${md5(pass)}")`
    db.query(sqlStmt, function(err, response){
        if(err){
            let options = {
                status: 404,
                response: null,
                error: err
            }
            callback(options)
        }else{
            let options = {
                status: 200,
                error: null,
                response: response,
            }
            callback(options)
        }
    })
}

function doesEmailExist(payload, callback){
    let email = payload.email;
    let sqlStmt = `SELECT email FROM users WHERE email = "${email}"`;
    db.query(sqlStmt, function(err, response){
        if(err){
            let options={
                status : 404,
                response : null,
                error : err
            }
            callback(options)
        }else{
            let options={
                status : 200,
                error : null,
                response : response
                
            }
            callback(options)
        }
    })
}

function userLogin(payload, callback){
    let email = payload.email;
    let pass = payload.password;
    let sqlStmt = `SELECT id, name, email,phone FROM users 
    WHERE email = "${email}" and password = "${md5(pass)}"`;
    db.query(sqlStmt, function(err, response){
        if(err){
            let options={
                status : 500,
                response : null,
                error : err
            }
            callback(options)
        }else{
            let options={
                status : 200,
                error : null,
                response : response
                
            }
            callback(options)
        }
    })
}