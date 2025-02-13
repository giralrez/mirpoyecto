var usuarioscontroller = require("./api/controladores/usuarioscontroller.js").usuarioscontroller

app.post("/usuarios/Registrar", function(request, response){
    usuarioscontroller.Registrar(request,response)


})


app.post("/usuarios/Guardar", function(request, response){
    usuarioscontroller.Guardar(request,response)


})


app.get("/usuarios/listar", function(request, response){
    usuarioscontroller.listar(request,response)
    
})



app.post("/usuarios/listarId", function(request, response){
    usuarioscontroller.listarId(request,response)
    
})


app.put("/usuarios/Actualizar", function(request, response){
    usuarioscontroller.Actualizar(request, response)
    
})


app.post("/usuarios/Eliminar", function(request, response){
    usuarioscontroller.Eliminar(request,response)
    

})


app.post("/usuarios/iniciar-sesion", function(request, response){
    usuarioscontroller.Login(request,response)
    
})

app.post("/usuarios/activar", function(request, response){
    usuarioscontroller.activar(request,response)
    
})


app.post("/usuarios/solicitarcodigo", function(request, response){
    usuarioscontroller.solicitarcodigo(request,response)
    
})

app.post("/usuarios/recuperarpass", function(request, response){
    usuarioscontroller.recuperarpass(request,response)
    
})


app.post("/usuarios/estado", function(request, response){
    response.json(request.session)
    
})



app.post("/usuarios/logout", function(request, response){
    request.session.destroy()
    response.json({state:true})
    
})







var productoscontroller = require("./api/controladores/productoscontroller.js").productoscontroller




app.post("/productos/Guardar", function(request, response){
    productoscontroller.Guardar(request,response)


})


app.get("/productos/listar", function(request, response){
    productoscontroller.listar(request,response)
    
})



app.post("/productos/listarId", function(request, response){
    productoscontroller.listarId(request,response)
    
})


app.put("/productos/Actualizar", function(request, response){
    productoscontroller.Actualizar(request, response)
    
})


app.post("/productos/Eliminar", function(request, response){
    productoscontroller.Eliminar(request,response)
    

})

