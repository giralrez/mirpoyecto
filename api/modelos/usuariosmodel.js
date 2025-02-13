
var usuariosModel ={}
const mongoose = require("mongoose")
var Schema = mongoose.Schema

var usuariosSchema = new Schema({
    
    nombre:String,
    email:String,
    telefono:String,
    password:String,
    rol:String, // Cliente / Administrador / Vendedor,
    estado:Number, //1 activo 0 inactivo 
    codigo:String,
    codrec:String,
    fecharec:Date

})


const Mymodel = mongoose.model("usuarios",usuariosSchema)


usuariosModel.expiracion = function(post, callback){
    Mymodel.findOne({email:post.email},{fecharec:1}).then((respuesta) =>{
        if(respuesta == null){
            return callback ({state: false, mensaje: "El correo no es valido"})
        }
        else{
            return callback({state:true, datos:respuesta})

        }


    })


}



usuariosModel.Recuperarpass = function(post, callback){
    Mymodel.findOneAndUpdate({email:post.email,codrec:post.codrec},{password:post.password}).then((respuesta) =>{
        if(respuesta == null){
            return callback({state:false, mensaje:"El codigo de recuperacion no es valido"})
        }
        else{
            return callback({state:true, mensaje: "Se recupero el password correctamente"})
        }
    })
}


usuariosModel.CrearCodigo =function(post,callback){
    Mymodel.findOneAndUpdate({email:post.email},
        {
            codrec:post.codrec,
            fecharec: new Date()

        }).then((respuesta) => {
        if(respuesta == null){
            return callback({state:false, mensaje:"No se pudo crear el codigo de recuperacion"})

        }
        else{
            return callback({state:true})


        }


    })

}


usuariosModel.validarEmail = function(post, callback){

    // var posicion = datos.findIndex((item) => item.identificacion == post.identificacion)
    Mymodel.findOne({email:post.email}).then ((respuesta) => {
    
        if(respuesta == null){
            return callback ({existe:"no"})

        }
        else {
            return callback({existe:"si"})

        }
    })
    

}


usuariosModel.ValidarActivo = function(post, callback){
    Mymodel.findOne({email:post.email},{estado:1}).then((respuesta) => {
        if(respuesta == null){
            return callback({state:false, mensaje:"El correo no es valido"})

        }
        else{
            return callback({state:true, estado:respuesta.estado})

        }

    })


}


usuariosModel.Login = function(post, callback){
    Mymodel.findOne({email:post.email, password:post.password},{_id:1,nombre:1,rol:1}).then((respuesta) =>{
        if(respuesta == null){
            return callback ({state:false, mensaje:"credenciales invalidas"})
        }
        else{
            return callback ({state:true, mensaje:"Bienvenido: " + respuesta.nombre, nombre:respuesta.nombre, rol:respuesta.rol, _id:respuesta._id })

        }
    })

}

usuariosModel.activar = function(post, callback){
    Mymodel.findOneAndUpdate({email:post.email, codigo:post.codigo},{
        estado:1
    }).then((respuesta) => {
        if(respuesta == null){
            return callback({state:false, mensaje:"No se pudo ativar la cuenta"})
        }
        else{
            return callback({state:true, mensaje:"cuenta activada correctamente"})

        }

    })

}

usuariosModel.Registrar               = function(post,callback){

    const instancia = new Mymodel
    instancia.nombre = post.nombre
    instancia.email = post.email
    instancia.telefono = post.telefono
    instancia.password = post.password
    instancia.rol = "Cliente"
    instancia.estado = 0
    instancia.codigo = post.codigo

    instancia.save().then((respuesta) =>{
        console.log(respuesta)
        return callback({state:true})

    }).catch((error) => {
        console.log(error)
        return callback({state:false})
    })




    // datos.push(post)
    /* return callback({state:true}) */

}

usuariosModel.Guardar               = function(post,callback){

    const instancia = new Mymodel
    instancia.nombre = post.nombre
    instancia.email = post.email
    instancia.telefono = post.telefono
    instancia.password = post.password
    instancia.rol = "Cliente"
    instancia.estado = 1
    

    instancia.save().then((respuesta) =>{
        console.log(respuesta)
        return callback({state:true})

    }).catch((error) => {
        console.log(error)
        return callback({state:false})
    })




    // datos.push(post)
    /* return callback({state:true}) */

}

usuariosModel.Listar                = function(post,callback){
    
    Mymodel.find({},{email:1,nombre:1,telefono:1, rol:1, estado:1}).then((respuesta) => {
        return callback({datos:respuesta})

    })
    


}

usuariosModel.ListarId                = function(post,callback){
    
    Mymodel.find({_id:post._id},{email:1,nombre:1,telefono:1, rol:1, estado:1}).then((respuesta) => {
        return callback({datos:respuesta})

    })
    


}

usuariosModel.Actualizar            = function(post, callback){
        
    
        Mymodel.findOneAndUpdate({_id:post._id},
            {
                nombre:post.nombre,
                telefono:post.telefono,
                rol:post.rol,
                estado:post.estado
            
            }

        ).then((respuesta) => {
            return callback({estate:true})
        }).catch((error) => {
            console.log(error)
        })

}

usuariosModel.Eliminar              = function(post, callback){
    
    Mymodel.deleteOne({_id:post._id}).then((respuesta) => {
        return callback({state:true})
    }).catch((error) => {
        console.log(error)
    })
    
    // datos.splice(post.posicion,1)
    // return callback({estate:true})

}



usuariosModel.Mymodel = Mymodel
module.exports.usuariosModel = usuariosModel