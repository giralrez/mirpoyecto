const mongoose = require("mongoose")
var usuarioscontroller = require("./usuarioscontroller.js").usuarioscontroller
global.SHA256 = require("sha256")
const config = require("../../config.js").config
var usuariosModel = require("../modelos/usuariosmodel.js").usuariosModel

describe("POST usuarios/registrar", () => {

    let request;
    let response;

    beforeAll((done) => {

        mongoose.connect("mongodb://127.0.0.1:27017/" + config.bdtest ).then((respuesta) => {
            console.log("conexion a mongo exitosa")
            done()
        }).catch((error) => {
            console.log(error)
        })

    })

    beforeEach(() => {
        request = { body:{}}
        response = { json: jest.fn()}

    });


    test(" Debe fallar cuando el campo nombre no esta presente", (done) => {
        request.body = {}

        usuarioscontroller.Registrar(request, response)

        expect(response.json).toHaveBeenCalledWith({state:false, mensaje: "el campo nombre es obligatorio"})
        done()
    })

    test("Debe fallar cuando el campo email no esta presente", (done) => {
        request.body = { 
            nombre: "andres" 
        }

        usuarioscontroller.Registrar(request, response)

        expect(response.json).toHaveBeenCalledWith({state:false, mensaje: "el campo email es obligatorio"})
        done()
    })

    test("Debe fallar cuando el campo telefono no esta presente", (done) => {
        request.body = { 
            nombre: "andres", 
            email: "andres@gmail.com" 
        }

        usuarioscontroller.Registrar(request, response)

        expect(response.json).toHaveBeenCalledWith({state:false, mensaje: "el campo telefono es obligatorio "})
        done()
    })

    test("Debe fallar cuando el campo password no esta presente", (done) => {
        request.body = { 
            nombre: "andres", 
            email: "andres@gmail.com", 
            telefono: "123456789" 
        }

        usuarioscontroller.Registrar(request, response)

        expect(response.json).toHaveBeenCalledWith({state:false, mensaje: "el campo password es obligatorio"})
        done()
    })

    test("Debe registrar el usuario", (done) => {
        request.body = { 
            nombre: "andres", 
            email: "andres@gmail.com", 
            telefono: "123456789", 
            password: "123456" 
        }

        usuarioscontroller.Registrar(request, response)

        setTimeout(() => {
            expect(response.json).toHaveBeenCalledWith({state:true, mensaje:"usuario guardado correctamente, verifique su bandeja de entrada"})
            done()
        }, 100) 
    })

    test("Debe fallar cuando el mail ya existe", (done) => {
        request.body = { 
            nombre: "andres", 
            email: "andres@gmail.com", 
            telefono: "123456789", 
            password: "123456" 
        }

        usuarioscontroller.Registrar(request, response)

        setTimeout(() => {
            expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"EL email ya existe intente con otro"})
            done()
        }, 100) 
    })

    test("limpiar BD", (done) => {
        usuariosModel.Mymodel.findOneAndDelete({email:"andres@gmail.com"}).then((respuesta) => {
            expect(respuesta.email).toBe("andres@gmail.com")
            done()
    })

})



    afterAll((done) => {
        usuariosModel.Mymodel.findOneAndDelete({email:"andres@gmail.com"}).then((respuesta) => {           
            done()
        })
    }) 


})

describe("POST usuarios/Guardar", () => {

    let request;
    let response;

    beforeAll((done) => {

        mongoose.connect("mongodb://127.0.0.1:27017/" + config.bdtest ).then((respuesta) => {
            console.log("conexion a mongo exitosa")
            done()
        }).catch((error) => {
            console.log(error)
        })

    })

    beforeEach(() => {
        request = { body:{}}
        response = { json: jest.fn()}

    });


    test(" Debe fallar cuando el campo nombre no esta presente", (done) => {
        request.body = {}

        usuarioscontroller.Guardar(request, response)

        expect(response.json).toHaveBeenCalledWith({state:false, mensaje: "el campo nombre es obligatorio"})
        done()
    })

    test("Debe fallar cuando el campo email no esta presente", (done) => {
        request.body = { 
            nombre: "andres" 
        }

        usuarioscontroller.Guardar(request, response)

        expect(response.json).toHaveBeenCalledWith({state:false, mensaje: "el campo email es obligatorio"})
        done()
    })

    test("Debe fallar cuando el campo telefono no esta presente", (done) => {
        request.body = { 
            nombre: "andres", 
            email: "andres@gmail.com" 
        }

        usuarioscontroller.Guardar(request, response)

        expect(response.json).toHaveBeenCalledWith({state:false, mensaje: "el campo telefono es obligatorio "})
        done()
    })

    test("Debe fallar cuando el campo password no esta presente", (done) => {
        request.body = { 
            nombre: "andres", 
            email: "andres@gmail.com", 
            telefono: "123456789" 
        }

        usuarioscontroller.Guardar(request, response)

        expect(response.json).toHaveBeenCalledWith({state:false, mensaje: "el campo password es obligatorio"})
        done()
    })

    test("Debe registrar el usuario", (done) => {
        request.body = { 
            nombre: "andres", 
            email: "andres@gmail.com", 
            telefono: "123456789", 
            password: "123456" 
        }

        usuarioscontroller.Guardar(request, response)

        setTimeout(() => {
            expect(response.json).toHaveBeenCalledWith({state:true, mensaje:"usuario guardado correctamente"})
            done()
        }, 20) 
    })

    test("Debe fallar cuando el mail ya existe", (done) => {
        request.body = { 
            nombre: "andres", 
            email: "andres@gmail.com", 
            telefono: "123456789", 
            password: "123456" 
        }

        usuarioscontroller.Guardar(request, response)

        setTimeout(() => {
            expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"EL email ya existe intente con otro"})
            done()
        }, 100) 
    })

     test("limpiar BD", (done) => {
        usuariosModel.Mymodel.findOneAndDelete({email:"andres@gmail.com"}).then((respuesta) => {
            expect(respuesta.email).toBe("andres@gmail.com")
            done()
    })

}) 

})


describe("POST usuarios/login", () => {

    let request;
    let response;

    beforeAll((done) => {

        mongoose.connect("mongodb://127.0.0.1:27017/" + config.bdtest ).then((respuesta) => {
            console.log("conexion a mongo exitosa")
            done()
        }).catch((error) => {
            console.log(error)
        })

    })

    beforeEach(() => {
        request = { body:{}}
        response = { json: jest.fn()}

    });


    test(" Debe fallar cuando el campo email no esta presente", (done) => {
        request.body = {}

        usuarioscontroller.Login(request, response)

        expect(response.json).toHaveBeenCalledWith({state:false, mensaje: "el campo email es obligatorio"})
        done()
    })


    test(" Debe fallar cuando el campo password no esta presente", (done) => {
        request.body = {
            email: "andres@gmail.com"
        }

        usuarioscontroller.Login(request, response)

        expect(response.json).toHaveBeenCalledWith({state:false, mensaje: "el campo password es obligatorio"})
        done()
    })

    test("Debe registrar el usuario", (done) => {
        request.body = { 
            nombre: "andres", 
            email: "andres@gmail.com", 
            telefono: "123456789", 
            password: "123456" 
        }

        usuarioscontroller.Registrar(request, response)

        setTimeout(() => {
            expect(response.json).toHaveBeenCalledWith({state:true, mensaje:"usuario guardado correctamente, verifique su bandeja de entrada"})
            done()
        }, 100) 
    })

   

     test("Debe solicitar que active cuenta", (done) => {
        request.body = {             
            email: "andres@gmail.com",  
            password: "123456" 
        }

        usuarioscontroller.Login(request, response)

        
        setTimeout(() => {
            expect(response.json).toHaveBeenCalledWith({state:true, mensaje:"por favor activar cuenta"})
            done()
        }, 20) 
    })

    test("limpiar BD", (done) => {
        usuariosModel.Mymodel.findOneAndDelete({email:"andres@gmail.com"}).then((respuesta) => {
            expect(respuesta.email).toBe("andres@gmail.com")
            done()
    })

})

   /*  test("Debe fallar cuando el mail ya existe", (done) => {
        request.body = { 
            nombre: "andres", 
            email: "andres@gmail.com", 
            telefono: "123456789", 
            password: "123456" 
        }

        usuarioscontroller.Guardar(request, response)

        setTimeout(() => {
            expect(response.json).toHaveBeenCalledWith({state:false, mensaje:"EL email ya existe intente con otro"})
            done()
        }, 100) 
    })

     test("limpiar BD", (done) => {
        usuariosModel.Mymodel.findOneAndDelete({email:"andres@gmail.com"}).then((respuesta) => {
            expect(respuesta.email).toBe("andres@gmail.com")
            done()
    })

})   */

})

describe("GET usuarios/listar", () => {

    let request;
    let response;

    beforeAll((done) => {
        mongoose.connect("mongodb://127.0.0.1:27017/" + config.bdtest ).then((respuesta) => {
            console.log("conexion a mongo exitosa")
            done()
        }).catch((error) => {
            console.log(error)
        })
    })

    beforeEach(() => {
        request = { query: {} }
        response = { json: jest.fn() }
    });

    test("Debe registrar el usuario", (done) => {
        request.body = { 
            nombre: "andres", 
            email: "andres@gmail.com", 
            telefono: "123456789", 
            password: "123456" 
        }

        usuarioscontroller.Registrar(request, response)

        setTimeout(() => {
            expect(response.json).toHaveBeenCalledWith({state:true, mensaje:"usuario guardado correctamente, verifique su bandeja de entrada"})
            done()
        }, 100) 
    })




    test("Debe listar todos los usuarios", (done) => {
        usuarioscontroller.Listar(request, response)

        setTimeout(() => {
            expect(response.json).toHaveBeenCalledWith(expect.objectContaining({
                state: true,
                usuarios: expect.any(Array)
            }))
            done()
        }, 100)
    })

    test("Debe listar usuarios con filtro", (done) => {
        request.query = { nombre: "andres" }

        usuarioscontroller.listar(request, response)

        setTimeout(() => {
            expect(response.json).toHaveBeenCalledWith(expect.objectContaining({
                state: true,
                usuarios: expect.any(Array)
            }))
            done()
        }, 100)
    })

    afterAll((done) => {
        mongoose.connection.close().then(() => {
            done()
        }).catch((error) => {
            console.log(error)
            done()
        })
    })

})



