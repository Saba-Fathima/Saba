const express = require('express')
const app = express();
app.listen(3000, function(){
    console.log('The port is running')
})
const body = require('body-parser')
app.use(body.urlencoded({extended:true}))
app.use(body.json())
const cors = require('cors')
app.use(cors())

const passport = require('passport');
const local = require('passport-local');


const router = require("./router/main.js")(express.Router(), app)
app.use('/',router)

