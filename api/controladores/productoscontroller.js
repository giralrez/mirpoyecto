var productosModel = require("../modelos/productosmodel.js").productosModel
var productoscontroller = {}




productoscontroller.Guardar     = function(request, response){

    var post = {

        nombre:request.body.nombre,
        codigo:request.body.codigo,
        descripcion:request.body.descripcion,
        precio:request.body.precio,
        cantidad:request.body.cantidad,
        estado:request.body.estado,
        imagen:request.body.imagen,
        
        

    }

    if(post.nombre == undefined || post.nombre == null || post.nombre == ""){
        response.json({state:false, mensaje: "el campo nombre es obligatorio"})
        return false
    }



    if(post.codigo == undefined || post.codigo == null || post.codigo == ""){
        response.json({state:false, mensaje: "el campo codigo es obligatorio"})
        return false
    }

    if(post.descripcion == undefined || post.descripcion == null || post.descripcion == ""){
        response.json({state:false, mensaje: "el campo descripcion es obligatorio"})
        return false
    }

    if(post.precio == undefined || post.precio == null || post.precio == ""){
        response.json({state:false, mensaje: "el campo precio es obligatorio"})
        return false
    }


    if(post.cantidad == undefined || post.cantidad == null || post.cantidad == ""){
        response.json({state:false, mensaje: "el campo cantidad es obligatorio"})
        return false
    }

    if(post.estado == undefined || post.estado == null || post.estado == ""){
        response.json({state:false, mensaje: "el campo estado es obligatorio"})
        return false
    }

    if(post.imagen == undefined || post.imagen == null || post.imagen == ""){
        response.json({state:false, mensaje: "el campo imagen es obligatorio"})
        return false
    }








    productosModel.validarCodigo(post,function(respuesta){
        if(respuesta.existe == "si"){
            response.json({state:false, mensaje:"codigo ya existe intente con otro"})
        }
        else{
            
            productosModel.Guardar(post, function(respuesta){
                if(respuesta.state == true){
                    response.json({state:true, mensaje:"elemento guardado correctamente"})     
                    
                }
                else{
                    response.json({state:false, mensaje:"error al almacenar"})

                }

            })

        }

    })


}

productoscontroller.listar      = function(request, response){
    
    productosModel.Listar(null,function(respuesta){
    response.json({state:true, datos:respuesta.datos})
})
    

}

productoscontroller.listarId     = function(request, response){
    
    var post= {
        _id:request.body._id

    }

    if(post._id == undefined || post._id == null || post._id == ""){
        response.json({state:false, mensaje: "el campo _id es obligatorio"})
        return false
    }

    productosModel.ListarId(post,function(respuesta){
    response.json({state:true, datos:respuesta.datos})
})
    

}

productoscontroller.Actualizar  = function(request, response){

    var post = {

        _id:request.body._id,
        nombre:request.body.nombre,
        descripcion:request.body.descripcion,
        precio:request.body.precio,
        cantidad:request.body.cantidad,
        estado:request.body.estado,
        imagen:request.body.imagen,

    }

    if(post._id == undefined || post._id == null || post._id == ""){
        response.json({state:false, mensaje: "el campo _id es obligatorio"})
        return false
    }


    if(post.nombre == undefined || post.nombre == null || post.nombre == ""){
        response.json({state:false, mensaje: "el campo nombre es obligatorio"})
        return false
    }


    if(post.descripcion == undefined || post.descripcion == null || post.descripcion == ""){
        response.json({state:false, mensaje: "el campo descripcion es obligatorio"})
        return false
    }

    if(post.precio == undefined || post.precio == null || post.precio == ""){
        response.json({state:false, mensaje: "el campo precio es obligatorio"})
        return false
    }


    if(post.cantidad == undefined || post.cantidad == null || post.cantidad == ""){
        response.json({state:false, mensaje: "el campo cantidad es obligatorio"})
        return false
    }

    if(post.estado == undefined || post.estado == null || post.estado == ""){
        response.json({state:false, mensaje: "el campo estado es obligatorio"})
        return false
    }

    if(post.imagen == undefined || post.imagen == null || post.imagen == ""){
        response.json({state:false, mensaje: "el campo imagen es obligatorio"})
        return false
    }

            
    productosModel.Actualizar(post,function(respuesta){
        response.json({state:true, mensaje: "elemento actualizado exitosamente"})
        return false
    

    })
    


}


productoscontroller.Eliminar    = function(request,response){
    var post = {
        _id:request.body._id,

    }

    if(post._id == undefined || post._id == null || post._id == ""){
        response.json({state:false, mensaje: "el campo _id es obligatorio"})
        return false
    }


    
    productosModel.Eliminar(post, function(respuesta){
        response.json({state:true, mensaje: "elemento eliminado correctamente"})
        return false

    })

    
    

}




module.exports.productoscontroller = productoscontroller