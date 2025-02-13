var usuariosModel = require("../modelos/usuariosmodel.js").usuariosModel
var usuarioscontroller = {}
const config = require("../../config.js").config
const { text } = require("body-parser")
const nodemailer = require("nodemailer")

function tiempoTranscurrido(fechaISO){
    const fechaPasada = new Date(fechaISO);
    const fechaActual = new Date();

    const diferenciaMs = fechaActual - fechaPasada;

    return Math.ceil((diferenciaMs/1000)/60)


}




usuarioscontroller.Login = function(request,response){
    var post = {
        email:request.body.email,
        password:request.body.password
    }

    if(post.email == undefined || post.email == null || post.email == ""){
        response.json({state:false, mensaje: "el campo email es obligatorio"})
        return false
    }

    if(post.password == undefined || post.password == null || post.password == ""){
        response.json({state:false, mensaje: "el campo password es obligatorio"})
        return false
    }

    post.password = SHA256(post.password + config.secret)


    usuariosModel.ValidarActivo(post, function(respuesta2) {
        if(respuesta2.state == false){
            response.json(respuesta2)
        }
        else{
            if(respuesta2.estado ==0){
                response.json({state:true, mensaje:"Por favor activar cuenta"})
            }
            else{
                usuariosModel.Login(post, function(respuesta){
                    request.session._id = respuesta._id
                    request.session.nombre = respuesta.nombre
                    request.session.rol = respuesta.rol
                    response.json(respuesta)
            
                })   

            }

        }

    })



} 


usuarioscontroller.Registrar     = function(request, response){

    var post = {

        nombre:request.body.nombre,
        email:request.body.email,
        telefono:request.body.telefono,
        password:request.body.password,
        

    }

    if(post.nombre == undefined || post.nombre == null || post.nombre == ""){
        response.json({state:false, mensaje: "el campo nombre es obligatorio"})
        return false
    }



    if(post.email == undefined || post.email == null || post.email == ""){
        response.json({state:false, mensaje: "el campo email es obligatorio"})
        return false
    }



    if(post.telefono == undefined || post.telefono == null || post.telefono == "" ){
        response.json({state:false, mensaje: "el campo telefono es obligatorio "})
        return false
    }

    if(post.password == undefined || post.password == null || post.password == ""){
        response.json({state:false, mensaje: "el campo password es obligatorio"})
        return false
    }


    post.password = SHA256(post.password + config.secret)


    usuariosModel.validarEmail(post,function(respuesta){
        if(respuesta.existe == "si"){
            response.json({state:false, mensaje:"EL email ya existe intente con otro"})
        }
        else{
            var azar = "R-" + Math.ceil(Math.random() * (9999 -1000) + 1000)
            post.codigo = azar

            usuariosModel.Registrar(post, function(respuesta){
                if(respuesta.state == true){
                    response.json({state:true, mensaje:"usuario guardado correctamente, verifique su bandeja de entrada"})     
                    //enviar correo

                    
                    
                    const transporter = nodemailer.createTransport({
                        host:config.email.host,
                        port:config.email.port,
                        secure:false,
                        requireTLS:true,
                        auth:{
                            user:config.email.user,
                            pass:config.email.pass

                        }

                    })

                    var mailOptions = {
                        from:config.email.user,
                        to:post.email,
                        subject: "verifica tu cuenta con el codigo " + azar,
                        html: `<div style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; height: 100vh;">
                                <div style="background-color: #fff; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); padding: 20px; text-align: center; max-width: 400px; width: 100%;">
                                    <h1 style="color: #007BFF; margin-bottom: 20px;">¡Bienvenido a RoloTours!</h1>
                                    <p style="font-size: 16px; color: #333;">Tu cuenta ha sido registrada exitosamente. Para completar el proceso de activación, utiliza el siguiente código:</p>
                                    <div style="font-size: 24px; font-weight: bold; color: #28a745; margin-top: 20px; padding: 10px; background-color: #e9f7e9; border-radius: 4px;">
                                        ${azar}
                                    </div>
                                    <!-- Usamos un enlace en lugar de un botón -->
                                    <a href="${config.urlReal}/activar/${post.email}/${azar}" style="margin-top: 30px; padding: 10px 20px; display: inline-block; background-color: #007BFF; color: #fff; text-decoration: none; border-radius: 5px; font-size: 16px; text-align: center;">
                                        Activar Cuenta
                                    </a>
                                </div>
                            </div>`

                    }

                    transporter.sendMail(mailOptions, (error, info) => {
                        if(error){
                            console.log(error)

                        }
                        else {
                            console.log(info)

                        }

                    })


                }
                else{
                    response.json({state:false, mensaje:"error al almacenar"})

                }

            })

        }

    })


}


usuarioscontroller.Guardar     = function(request, response){

    var post = {

        nombre:request.body.nombre,
        email:request.body.email,
        telefono:request.body.telefono,
        password:request.body.password,
        

    }

    if(post.nombre == undefined || post.nombre == null || post.nombre == ""){
        response.json({state:false, mensaje: "el campo nombre es obligatorio"})
        return false
    }



    if(post.email == undefined || post.email == null || post.email == ""){
        response.json({state:false, mensaje: "el campo email es obligatorio"})
        return false
    }



    if(post.telefono == undefined || post.telefono == null || post.telefono == "" ){
        response.json({state:false, mensaje: "el campo telefono es obligatorio "})
        return false
    }

    if(post.password == undefined || post.password == null || post.password == ""){
        response.json({state:false, mensaje: "el campo password es obligatorio"})
        return false
    }


    post.password = SHA256(post.password + config.secret)


    usuariosModel.validarEmail(post,function(respuesta){
        if(respuesta.existe == "si"){
            response.json({state:false, mensaje:"EL email ya existe intente con otro"})
        }
        else{
            var azar = "R-" + Math.ceil(Math.random() * (9999 -1000) + 1000)
            post.codigo = azar

            usuariosModel.Guardar(post, function(respuesta){
                if(respuesta.state == true){
                    response.json({state:true, mensaje:"usuario guardado correctamente"})     
                    
                }
                else{
                    response.json({state:false, mensaje:"error al almacenar"})

                }

            })

        }

    })


}

usuarioscontroller.listar      = function(request, response){
    
    usuariosModel.Listar(null,function(respuesta){
    response.json({state:true, datos:respuesta.datos})
})
    

}

usuarioscontroller.listarId     = function(request, response){
    
    var post= {
        _id:request.body._id

    }

    if(post._id == undefined || post._id == null || post._id == ""){
        response.json({state:false, mensaje: "el campo _id es obligatorio"})
        return false
    }

    usuariosModel.ListarId(post,function(respuesta){
    response.json({state:true, datos:respuesta.datos})
})
    

}

usuarioscontroller.Actualizar  = function(request, response){

    var post = {

        _id:request.body._id,
        nombre:request.body.nombre,
        telefono:request.body.telefono,
        rol:request.body.rol,
        estado:request.body.estado
    

    }

    if(post._id == undefined || post._id == null || post._id == ""){
        response.json({state:false, mensaje: "el campo _id es obligatorio"})
        return false
    }


    if(post.nombre == undefined || post.nombre == null || post.nombre == ""){
        response.json({state:false, mensaje: "el campo nombre es obligatorio"})
        return false
    }

    if(post.telefono == undefined || post.telefono == null || post.telefono == ""){
        response.json({state:false, mensaje: "el campo telefono es obligatorio"})
        return false
    }

    if(post.rol == undefined || post.rol == null || post.rol == ""){
        response.json({state:false, mensaje: "el campo rol es obligatorio"})
        return false
    }

    if(post.estado == undefined || post.estado == null || post.estado == ""){
        response.json({state:false, mensaje: "el campo estado es obligatorio"})
        return false
    }


            
    usuariosModel.Actualizar(post,function(respuesta){
        response.json({state:true, mensaje: "registro actualizado exitosamente"})
        return false
    

    })
    


}


usuarioscontroller.Eliminar    = function(request,response){
    var post = {
        _id:request.body._id,

    }

    if(post._id == undefined || post._id == null || post._id == ""){
        response.json({state:false, mensaje: "el campo _id es obligatorio"})
        return false
    }


    
    usuariosModel.Eliminar(post, function(respuesta){
        response.json({state:true, mensaje: "usuario eliminado correctamente"})
        return false

    })

    
    

}


usuarioscontroller.activar = function(request,response){
    var post = {
        email:request.body.email,
        codigo:request.body.codigo
    }

    if(post.email == undefined || post.email == null || post.email == ""){
        response.json({state:false, mensaje: "el campo email es obligatorio"})
        return false
    }
    if(post.codigo == undefined || post.codigo == null || post.codigo == ""){
        response.json({state:false, mensaje: "el campo codigo es obligatorio"})
        return false
    }

    usuariosModel.activar(post, function(respuesta){
        response.json(respuesta)

    })


}


usuarioscontroller.solicitarcodigo = function(request, response){
    var post = {
        email:request.body.email,
    }

    if(post.email == undefined || post.email == null || post.email == ""){
        response.json({state:false, mensaje: "el campo email es obligatorio"})
        return false
    }

    post.codrec = "R-" + Math.ceil(Math.random() * (9999 -1000) + 1000)
    usuariosModel.CrearCodigo(post, function(respuesta){

        if(respuesta.state == false){
            response.json(respuesta)

        }
        else{
            response.json({state:true, mensaje: "Hemos enviado un codigo de verificacion a tu correo electronico"})


            const transporter = nodemailer.createTransport({
                host:config.email.host,
                port:config.email.port,
                secure:false,
                requireTLS:true,
                auth:{
                    user:config.email.user,
                    pass:config.email.pass
    
                }
    
            })
    
            var mailOptions = {
                from:config.email.user,
                to:post.email,
                subject: "Recuperar password " + post.codrec,
                html: `<div style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
                        <div style="width: 100%; display: flex; justify-content: center; align-items: center; padding: 20px 0;">
                            <div style="background-color: white; padding: 20px 40px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); max-width: 600px; width: 100%; text-align: center;">
                                <h2 style="color: #333;">Recuperación de Contraseña</h2>
                                <p style="color: #555; font-size: 16px;">Has solicitado un código de verificación para recuperar tu contraseña. Utiliza el siguiente código para completar el proceso de recuperación:</p>
                                
                                <div style="background-color: #f0f0f0; padding: 15px; font-size: 24px; font-weight: bold; color: #333; margin: 20px 0; border-radius: 8px;">
                                    <span style="color:rgb(68, 184, 77);">Tu código de verificación es:</span><br>
                                    <strong style="color:rgb(34, 122, 255);">${post.codrec}</strong>
                                </div>
                                
                                <p style="color: #777; font-size: 14px;">Este código es válido por 10 minutos. Si no solicitaste este código, por favor ignora este mensaje.</p>
                                
                                <p style="color: #777; font-size: 14px;">Si tienes alguna duda, por favor contacta con nuestro soporte.</p>
                                
                                <p style="color: #888; font-size: 12px;">Gracias por usar nuestros servicios.<br><i>Equipo de soporte</i></p>
                            </div>
                        </div>
                    </div>`
    
            }
    
            transporter.sendMail(mailOptions, (error, info) => {
                if(error){
                    console.log(error)
    
                }
                else {
                    console.log(info)
    
                }
    
            })

        }





    })



}


usuarioscontroller.recuperarpass = function(request, response){
    var post = {
        email:request.body.email,
        codrec:request.body.codrec,
        password:request.body.password,
        confirmacion:request.body.confirmacion
    }

    if(post.email == undefined || post.email == null || post.email == ""){
        response.json({state:false, mensaje: "el campo email es obligatorio"})
        return false
    }


    if(post.codrec == undefined || post.codrec == null || post.codrec == ""){
        response.json({state:false, mensaje: "el campo codrec es obligatorio"})
        return false
    }
    if(post.password == undefined || post.password == null || post.password == ""){
        response.json({state:false, mensaje: "el campo password es obligatorio"})
        return false
    }

    if(post.confirmacion == undefined || post.confirmacion == null || post.confirmacion == ""){
        response.json({state:false, mensaje: "el campo confirmacion es obligatorio"})
        return false
    }


    if(post.confirmacion != post.password){
        response.json({state:false, mensaje: "la confirmacion y el password no coinciden"})
        return false
    }


    post.password = SHA256(post.password + config.secret)


    usuariosModel.expiracion(post, function(exp){
        var minutos = tiempoTranscurrido(exp.datos.fecharec)
        
        if(minutos >= 1){
            response.json({state:false, mensaje: "Tu codigo ha caducado"})

        }
        else{
            usuariosModel.Recuperarpass(post, function(respuesta){
            respuesta.tiempo = minutos
            response.json(respuesta)
            }) 
        }
        

    })



}


module.exports.usuarioscontroller = usuarioscontroller