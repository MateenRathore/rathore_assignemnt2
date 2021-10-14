const express = require('express')
const connection = require("./database")
const helmet = require("helmet")
var cors = require('cors')
const cookieSession = require('cookie-session')
var passport = require('passport');
const routes = require('./routes/router')


const app = express();
app.set('view engine','ejs')
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(helmet());
app.use(cors());
// app.use(cors({origin:[ 'http://localhost:3000/','http://127.0.0.1:5500/']}));
app.use(express.static("public"));
connection.connect(function(err){
    if(err){
        console.log("error connection database: "+ err);
    }
    console.log("Database connected!")
})


app.use(cookieSession({
    name: 'newsession',
    keys: ['key1', 'key2']
}))
app.use(passport.initialize());
app.use(passport.session());

app.use("/", routes)

const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`Listening on port ${port}!`))