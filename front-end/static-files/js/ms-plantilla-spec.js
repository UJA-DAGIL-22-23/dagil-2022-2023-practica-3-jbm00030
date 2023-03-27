/**
 * @file ms-plantilla-spec.js
 * @description Fichero TDD para probar todo lo relacionado con MS Plantilla en el front-end
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

// SPECS para Jasmine

// Constantes para usar en las pruebas
const elementoTitulo = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_TITULO)
const elementoContenido = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO)
const TITULO_HOME = "Plantilla Home"
const TITULO_ACERCA_DE = "Plantilla Acerca de"

const datosDescargadosPrueba = {
    mensaje: "Mensaje de prueba descargado",
    autor: "Prueba de autor",
    email: "Prueba de email",
    fecha: "00/00/0000"
}


// Función para esperar y dar tiempo a que responda el microservicio
function esperar(ms) {
    var inicio = new Date().getTime();
    var fin = 0;
    while ((fin - inicio) < ms) {
        fin = new Date().getTime();
    }
}



// SPECS a probar

describe("Plantilla.mostrarHome: ", function () {

    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            Plantilla.mostrarHome()
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Plantilla.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            Plantilla.mostrarHome(23)
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Plantilla.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje",
        function () {
            // Objeto vacío
            Plantilla.mostrarHome({})
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Plantilla.datosDescargadosNulos.mensaje)

            // Objeto sin campo mensaje
            Plantilla.mostrarHome({ foo: "bar" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Plantilla.datosDescargadosNulos.mensaje)
        })

    it("muestra correctamente el título y el mensaje",
        function () {
            Plantilla.mostrarHome(datosDescargadosPrueba)
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(datosDescargadosPrueba.mensaje)
        })
})


describe("Plantilla.mostrarAcercaDe: ", function () {
    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            Plantilla.mostrarAcercaDe()
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            Plantilla.mostrarAcercaDe(23)
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje o autor o email o fecha ",
        function () {
            // Objeto vacío
            Plantilla.mostrarAcercaDe({})
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()

            // Objeto sin campo mensaje
            Plantilla.mostrarAcercaDe({ autor: "un autor", email: "un email", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo autor
            Plantilla.mostrarAcercaDe({ mensaje: "un mensaje", email: "un email", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo email
            Plantilla.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo fecha
            Plantilla.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", email: "un email" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })
    it("muestra correctamente el título y el mensaje conteniendo el autor, el email y la fecha",
        function () {
            Plantilla.mostrarAcercaDe(datosDescargadosPrueba)
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)

            // Comprobamos que al buscar el autor, el email y la fecha de prueba los encuentra dentro del contenido del article
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.autor) >= 0).toBeTrue()
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.email) >= 0).toBeTrue()
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.fecha) >= 0).toBeTrue()
        })
})

/**
 * PRUEBA DE LA FUNCIÓN QUE ME REALIZA EL CUERPO DE A FUNCIÓN DE LA HU 2
 */
describe("Comprueba cuperpo primera tabla", function(){


    it("Compreba que la función rellena la tabla correctamente", function() {
        //Creo unos datos con los que probar
        const c = {
            data: {
              nombre: 'Jose',
              apellidos: 'Ballester Marin'
            }
        };

        const resultado=Plantilla.cuerpo1(c);
        expect(resultado).toBe('<tr><td><em>Jose Ballester Marin</em></td></tr>');

    });


})

/**
 * FUNCIÓN QUE PRUEBA LA FUNCIÓN QUE IMPRIME QUE TODOS LOS NOMBRES DE LOS CICLISTAS
 */

describe("Prueba de la función sacaCiclistas que muestra los nombres de los ciclistas", function(){
    
    it("Comprueba que la función devuelve correctamente el código html para hacer la tabla con sus datos",  function(){
        const c = {
            data:[{
                data: {
                    nombre: 'Jose',
                    apellidos: 'Ballester Marin'
                },
                data: {
                    nombre: 'Juan',
                    apellidos: 'Ballester Marin'
                }
            }]
        };

        spyOn(Frontend.Article, "actualizar");
        Plantilla.muestraCiclistas(c);
        expect(Frontend.Article.actualizar).toHaveBeenCalledWith("Nombre de todos los ciclistas", '<table class="op1"><thead><th>Ciclistas</th></thead><tbody><tr><td><em>Juan Ballester Marin</em></td></tr></tbody></table>');
        
        //<tr><td><em>Jose Ballester Marin</em></td></tr>
        
        //expect(Frontend.Article.actualizar).toHaveBeenCalledWith("Nombre de todos los ciclistas", c);

        //const resultado = Plantilla.muestraCiclistas(c);

        //const prueba = resultado.getElementsByTagName('tbody')[0];

        //expect(prueba.children[0].textContent).toBe('Jose Ballester Marin');
        //expect(resultado).toBe('<table class="op1"><thead><th>Ciclistas</th></thead><tbody><tr><td><em>Jose Ballester Marin</em></td></tr><tr><td><em>Juan Ballester Marin</em></td></tr></tbody></table>');
    })
})

/**
 * PRUEBA DE LA FUNCIÓN QUE ME REALIZA EL CUERPO DE A FUNCIÓN DE LA HU 2
 */
describe("Comprueba cuperpo SEGUNDA tabla", function(){


    it("Compreba que la función rellena la tabla correctamente", function() {
        //Creo unos datos con los que probar
        const c = {
            data: {
              nombre: 'Jose',
              apellidos: 'Ballester Marin',
              id: '0001',
              email: 'jbm@uja.es',
              f_nac:{
                dia: 16,
                mes: 5,
                anio: 2000
              },
              equipos: ["movistar","vodafone","orange"]
            }
        };

        const resultado=Plantilla.cuerpo2(c);
        expect(resultado).toBe('<tr><td>0001</td><td>Jose Ballester Marin</td><td>movistar,vodafone,orange</td><td>16/5/2000</td><td>jbm@uja.es</td></tr>');

    });


})

/**
 * 
 * FUNCIÓN QUE PRUEBA LA FUNCIÓN QUE IMPRIME QUE TODOS LOS DATOS DE LOS CICLISTAS
 * 
 */

describe("Prueba de la función todosDatos que muestra los datos de los ciclistas", function(){
    
    it("Comprueba que la función devuelve correctamente el código html para hacer la tabla con sus datos",  function(){
        const c = {
            data:[{
                data: {
                    nombre: 'Jose',
                    apellidos: 'Ballester Marin',
                    id: '0001',
                    email: 'jbm@uja.es',
                    f_nac:{
                        dia: 16,
                        mes: 5,
                        anio: 2000
                    },
                     equipos: ["movistar","vodafone","orange"]
                },
                data: {
                    nombre: 'Jose',
                    apellidos: 'Ballester Marin',
                    id: '0002',
                    email: 'jbm@uja.es',
                    f_nac:{
                        dia: 16,
                        mes: 5,
                        anio: 2000
                    },
                     equipos: ["movistar","vodafone","orange"]
                }
            }]
        };

        spyOn(Frontend.Article, "actualizar");
        Plantilla.todosDatos(c);
        expect(Frontend.Article.actualizar).toHaveBeenCalledWith("Datos de todos los ciclistas", '<table class="op1"><thead><th>ID</th><th>Ciclistas</th><th>Equipos</th><th>Fecha de Nacimiento</th><th>Email</th></thead><tbody><tr><td>0002</td><td>Jose Ballester Marin</td><td>movistar,vodafone,orange</td><td>16/5/2000</td><td>jbm@uja.es</td></tr></tbody></table>');
        
    })
})

describe("Prueba de la función muestraCiclistasOrd que muestra los nombres de los ciclistas ordenados", function(){
    
    it("Comprueba que la función devuelve correctamente el código html ordenado para hacer la tabla con los nombres",  function(){
        const c = {
            data:[{
                data: {
                    nombre: 'Jose',
                    apellidos: 'Ballester Marin'
                },
                data: {
                    nombre: 'Alex',
                    apellidos: 'Ballester Marin'
                }
            }]
        };

        spyOn(Frontend.Article, "actualizar");
        Plantilla.muestraCiclistasOrd(c);
        expect(Frontend.Article.actualizar).toHaveBeenCalledWith("Nombre de todos los ciclistas ordenados alfabéticamente", '<table class="op1"><thead><th>Ciclistas</th></thead><tbody><tr><td><em>Alex Ballester Marin</em></td></tr></tbody></table>');
        
        //<tr><td><em>Jose Ballester Marin</em></td></tr>
        
        //expect(Frontend.Article.actualizar).toHaveBeenCalledWith("Nombre de todos los ciclistas", c);

        //const resultado = Plantilla.muestraCiclistas(c);

        //const prueba = resultado.getElementsByTagName('tbody')[0];

        //expect(prueba.children[0].textContent).toBe('Jose Ballester Marin');
        //expect(resultado).toBe('<table class="op1"><thead><th>Ciclistas</th></thead><tbody><tr><td><em>Jose Ballester Marin</em></td></tr><tr><td><em>Juan Ballester Marin</em></td></tr></tbody></table>');
    })
})

/*
IMPORTANTE
==========

Las pruebas TDD que se encargan de probar las conexiones con el microservicio desde el cliente son difíciles de probar 
dado que requieren solucionar temas de sincronización. 
Esto afecta a los métodos:
 - Plantilla.descargarRuta
 - Plantilla.procesarAcercaDe
 - Plantilla.procesarHome

 Las soluciones propuestas en distintos sitios web no han producido el resultado esperado, 
 por tanto: para esta práctica, se pueden dejar SIN HACER.

 */
