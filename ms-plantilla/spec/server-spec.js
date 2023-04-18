/**
 * @file server-spec.js
 * @description Fichero con la especificación de las pruebas TDD para server.js del MS MS Plantilla
 *              Este fichero DEBE llamarse server-spec.js
 *              Este fichero DEBE ubicarse en el subdirectorio spec/
 * @author Víctor M. Rivas Santos <vrivas@ujaen.es>
 * @date 03-Feb-2023
 */


const supertest = require('supertest');
const assert = require('assert')
const app = require('../server');

/**
 * Test para las rutas "estáticas": / y /acerdade
 */
describe('Servidor PLANTILLA:', () => {
  describe('Rutas / y /acercade', () => {
    it('Devuelve MS Plantilla Home Page', (done) => {
      supertest(app)
        .get('/')
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
        .get('/acercade')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          //console.log( "BODY ACERCA DE ", res.body ); // Para comprobar qué contiene exactamente res.body
          assert(res.body.hasOwnProperty('mensaje'));
          assert(res.body.mensaje === "Información del programador");

        })
        .end((error) => { error ? done.fail(error) : done() })
    });
  })

  /**
   * Tests para acceso a la BBDD
   */
  describe('Acceso a BBDD:', () => {
    it('Devuelve Jose al consultar mediante test_db', (done) => {
      supertest(app)
        .get('/test_db')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          //console.log( res.body ); // Para comprobar qué contiene exactamente res.body
          assert(res.body.data[0].data.hasOwnProperty('nombre'));
          assert(res.body.data[0].data.nombre === "Jose");

        })
        .end((error) => { error ? done.fail(error) : done(); }
        );
    });

  });
  it('Devuelve que el tamaño del vector de la bbdd debe ser 10 para sacaCiclistas', (done) => {
    supertest(app)
      .get('/sacaCiclistas')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(function (res) {
        //console.log( res.body ); // Para comprobar qué contiene exactamente res.body
        assert(res.body.data.length === 10);
        //assert(res.body.data[0].data.nombre === "Jose");

      })
      .end((error) => { error ? done.fail(error) : done(); }
      );
  });


  it('Devuelve que el nombre de la persona con un id dado es el correcto', (done) => {
    supertest(app).get('/sacaCiclista/359097846737141965')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(function (res) {
        //console.log( res.body ); // Para comprobar qué contiene exactamente res.body
        
        assert(res.body.data.hasOwnProperty('nombre'));
        assert(res.body.data.nombre === "Jose");

      })
      .end((error) => { error ? done.fail(error) : done(); }
      );
  });

  it('Devuelve correctamente los datos para cambiar el nombre en el formulario', (done) => {
    
    let ciclista={
      id: 0001,
      nombre: Jose,
      apellidos: Ballester,
      equipos: [movistar],
      f_nac: {dia: 16, mes:5, anio:2000},
      email: uja.es
    };
    
    supertest(app).post('/plantilla/setCiclista').send(ciclista).expect(200).expect('Content-Type', /json/)
    .expect(function (res) {
      
        //console.log( res.body ); // Para comprobar qué contiene exactamente res.body
        
        assert(res.body.data.hasOwnProperty('nombre'));
        assert(res.body.data.nombre === "Jose");

      })
      .end((error) => { error ? done.fail(error) : done(); }
      );
  });

  it('Devuelve correctamente los datos para dar de alta un nuevo ciclista en el formulario', (done) => {
    
    let ciclista={
      id: 0001,
      nombre: Jose,
      apellidos: Ballester,
      equipos: [movistar],
      f_nac: {dia: 16, mes:5, anio:2000},
      email: uja.es
    };
    
    supertest(app).post('/plantilla/newCiclista').send(ciclista).expect(200).expect('Content-Type', /json/)
    .expect(function (res) {
      
        //console.log( res.body ); // Para comprobar qué contiene exactamente res.body
        
        assert(res.body.data.hasOwnProperty('nombre'));
        assert(res.body.data.nombre === "Jose");

      })
      .end((error) => { error ? done.fail(error) : done(); }
      );
  });
});




