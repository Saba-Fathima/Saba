const back = require("../backend/employee")({})

module.exports = function(props){
    return{
        getEmployee,
        saveEmployee
    }
}

function getEmployee(req, res){
    back.getEmployee({}, function(response){
        res.send(response)
    })
}
function saveEmployee(req, res){
    let payload = req.body
    console.log(payload)
    back.saveEmployee(payload, function(response){
        res.send(response)
    })
}