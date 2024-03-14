const db = require("../mysql")
const md5 = require('md5')

module.exports = function(props){
    return{
        getEmployee,
        saveEmployee
    }
}

function getEmployee(payload, callback){
    let sqlStmt = `SELECT * FROM employee`
    db.query(sqlStmt, function(err, response){
        if(err){
            let options = {
                status: 404,
                Error : err,
                response : null
            }
            callback(options)
        }else{
            let options = {
                status: 200,
                Error : null,
                response : response
            }
            callback(options)
        }
    })
}

function saveEmployee(payload, callback){
    let f_name = payload.f_name;
    let f_email = payload.f_email;
    let f_mobile = payload.f_mobile;
    let f_designation = payload.f_designation;
    let f_gender = payload.f_gender;
    let f_course = payload.f_course;
 
    let sqlStmt = `INSERT INTO employee (f_name, f_email, f_mobile, f_designation, f_gender, f_course) 
    VALUES ("${f_name}","${f_email}","${f_mobile}","${f_designation}","${f_gender}","${f_course}")`
    db.query(sqlStmt, function(err, response){
        if(err){
            let options = {
                status: 404,
                Error : err,
                response : null
            }
            callback(options)
        }else{
            let options = {
                status: 200,
                Error : null,
                response : response
            }
            callback(options)
        }
    })
}