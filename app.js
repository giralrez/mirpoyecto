var express = require("express")
global.app = express()
var bodyparser = require("body-parser")
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))
const mongoose = require("mongoose")
global.SHA256 = require("sha256")
const cors = require("cors")
const session = require("express-session")

const config = require("./config.js").config


app.all('*',function(req, res, next){

    var whitelist = req.headers.origin;
    res.header('Access-Control-Allow-Origin', whitelist);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS,HEAD');
    res.header('Access-Control-Allow-Headers', "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    res.header("Access-Control-Allow-Credentials", "true");

    next();

});

app.use(session({
    secret:config.secret,
    resave:true,
    saveUninitialized:true,
    cookie:{
        maxAge:config.expiracion, httpOnly:true
    },
    name:"Cookieapp",
    rolling:true


}))






require("./rutas.js")

mongoose.connect("mongodb://" + config.bdUser + ":" + config.bdPass + '@' + config.bdIp + ":" + config.bdPort +  "/" + config.bd).then((respuesta)=>{
    console.log("Conexion correcta a mongo")
}).catch((error) => {
    console.log(error)
})


/* 
mongoose.connect("mongodb://127.0.0.1:27017/" + config.bd).then((respuesta) => {
    console.log("conexion a mongo exitosa")
}).catch((error) => {
    console.log(error)
}) */

app.use(cors({
    origin:function(origin, callback){
        console.log(origin)
        if(!origin) return callback(null, true)
        if(config.blacklist.indexOf(origin) === -1){
            return callback("error de cors sin permisos", false)

        }
        else{
            return callback (null, true)

        }

    }

}))



app.use('/', express.static(__dirname + '/dist/miproyecto/browser'));

app.get('/*', function(req, res, next) {
    res.sendFile(path.resolve(__dirname + "/dist/miproyecto/browser/index.html"));
});




app.listen(config.puerto,function(){
    console.log("servidor funcionando por el puerto:" + config.puerto)

})