const http=require('http');
const express=require('express');
const app=express();
const session=require('express-session');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const validator=require('express-validator');
const flash=require('connect-flash');
const MongoStore=require('connect-mongo')(session);
const path=require('path');
const cookieParser=require('cookie-parser');


module.exports= class Application{
    constructor(){
        this.serverSetup();
        this.setMongoConnection();
        this.setupExpress();
        this.setupRouters();

    }
    serverSetup(){
        const server=http.createServer(app);
        server.listen(8000,console.log('app is running on port 8000'));


    }
    setMongoConnection(){
        mongoose.Promise=global.Promise;
        mongoose.connect('mongodb://localhost/toplearn');
    }
    setupExpress(){
        app.use(express.static('public'));
        app.set('view engine','ejs');
        app.set('views',path.resolve('./resource/views'))
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended:true}));
        app.use(validator());
        app.use(session({
            resave:true,
            secret:'toplearn',
            saveUninitialized:true,
            store:new MongoStore({mongooseConnection:mongoose.connection})
        }))
        app.use(cookieParser('toplearn'));
        app.use(flash());

    }
    setupRouters(){
        app.use(require('./routes/web'))
    }
}