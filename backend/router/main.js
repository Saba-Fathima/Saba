const user = require('../controller/user')({})
const employee = require('../controller/employee')({})
module.exports = function(router, app){

    router.get('/user/getall',user.getUser)
    router.post('/user/add',user.addUser)
    router.post('/user/login',user.userLogin)
    router.post('/user/email/exist',user.doesEmailExist)
    router.post('/user/update',user.updateUser)

    router.get('/employee/getall', employee.getEmployee)
    router.post('/employee/add', employee.saveEmployee)
    return router
}