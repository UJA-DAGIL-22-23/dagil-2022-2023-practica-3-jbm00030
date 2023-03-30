/**
 * @file server-spec.js 
 * @description Fichero con la especificación de pruebas para la aplicación API-gateway
 * Este fichero DEBE llamarse server-spec.js
 * Este fichero DEBE ubicarse en el subdirectorio spec/
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

const supertest = require('supertest');
const assert = require('assert')
const app = require('../server');

describe('API Gateway: rutas estáticas', () => {
  describe('Rutas estáticas de MS Plantilla', () => {
    it('Devuelve MS Plantilla Home Page', (done) => {
      supertest(app)
        .get('/plantilla/')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          //console.log( res.body ); // Para comprobar qué contiene exactamente res.body
          assert(res.body.hasOwnProperty('mensaje'));
          assert(res.body.mensaje === "Microservicio MS Plantilla: home");

        })
        .end((error) => { error ? done.fail(error) : done() })
    });
    it('Devuelve MS Plantilla Acerca De', (done) => {
      supertest(app)
        .get('/plantilla/acercade')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          //console.log( "BODY ACERCA DE ", res.body ); // Para comprobar qué contiene exactamente res.body
          assert(res.body.hasOwnProperty('mensaje'));
          assert(res.body.mensaje === "Microservicio MS Plantilla: acerca de");

        })
        .end((error) => { error ? done.fail(error) : done() })
    });

    //COMPRUEBA LA HISTORIA DE USUARIO DE LISTAR TODOS LOS CICLISTAS MOSTRANDO SU NOMBRE COMPLETO

    
    it('Devuelve que debe haber al menos 6 atributos en cada ciclista', (done) => {
      supertest(app)
        .get('/plantilla/sacaCiclistas')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {

          //console.log( "BODY ACERCA DE ", res.body ); // Para comprobar qué contiene exactamente res.body

          assert(res.body.hasOwnProperty('data'));
          assert(res.body.data.length >= 7);

        })
        .end((error) => { error ? done.fail(error) : done() })
    });



    //COMPRUEBA LA HISTORIA DE USUARIO DE LISTAR SOLO UN CILCISTA DADO POR SU ID

    it('Devuelve el nombre del ciclista con un id dado', (done) => {
      supertest(app)
        .get('/plantilla/sacaCiclista/359097846737141965')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {

          //console.log( "BODY ACERCA DE ", res.body ); // Para comprobar qué contiene exactamente res.body

          assert(res.body.data.hasOwnProperty('nombre'));
          assert(res.body.data.nombre === 'Jose');

        })
        .end((error) => { error ? done.fail(error) : done() })
    });
  })
});



