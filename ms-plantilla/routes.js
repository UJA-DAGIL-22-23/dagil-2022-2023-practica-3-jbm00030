/**
 * @file routes.js
 * @description Define las rutas ante las que va a responder al MS Plantilla
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

const express = require("express");
const router = express.Router();
const { callbacks } = require("./callbacks");



/**
 * Ruta raíz: /
 */
router.get("/", async (req, res) => {
    try {
        await callbacks.home(req, res)
    } catch (error) {
        console.log(error);
    }
});

/**
 * Ruta Acerca De (es decir, About...)
 */
router.get("/acercade", async (req, res) => {
    try {
        await callbacks.acercaDe(req, res)
    } catch (error) {
        console.log(error);
    }
});
/**
 * UTILIZADO PARA DEVOLVER UN CICLISTA DE FAUNA
 */

router.get("/sacaCiclista/:idCiclista", async (req, res) => {
    try{
        await callbacks.sacaCiclista(req, res)
    }catch (error){
        console.log(error)
    }
});

/**
 * Test de conexión a la BBDD
 */
router.get("/test_db", async (req, res) => {
    try {
        await callbacks.test_db(req, res)
    } catch (error) {
        console.log(error);
    }
});

router.param("idCiclista", (req, res, next, id) =>{
    next();
});



/**
 * Utilizado para devolver todos los ciclistas de FAUNA
 * 
 * 
 */
router.get("/sacaCiclistas", async (req, res) => {
    try {
        await callbacks.sacaCiclistas(req, res)
    } catch (error) {
        console.log(error);
    }
});


router.post("/setCiclista", async (req, res) =>{
    try{
        await callbacks.setCiclista(req, res)
    } catch (error) {
        console.log(error);
    }
})


router.post('/newCiclista', async (req, res) => {
    try{
        await callbacks.newCiclista(req, res);
    }catch (error) {
        console.log(error);
    }
})

// Exporto el módulo para poder usarlo en server
module.exports = router;
