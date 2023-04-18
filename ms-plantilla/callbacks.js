/**
 * @file callbacks.js
 * @description Callbacks para el MS Plantilla.
 * Los callbacks son las funciones que se llaman cada vez que se recibe una petición a través de la API.
 * Las peticiones se reciben en las rutas definidas en routes.js, pero se procesan aquí.
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */



// Necesario para conectar a la BBDD faunadb
const faunadb = require('faunadb'),
    q = faunadb.query;

const client = new faunadb.Client({
    secret: 'fnAE_5O3EiAAzH7FwmMkL0o6LNsuSiz6Px6EQW7L',
});

const COLLECTION = "Ciclistas"

// CALLBACKS DEL MODELO

/**
 * Función que permite servir llamadas sin importar el origen:
 * CORS significa Cross-Origin Resource Sharing
 * Dado un objeto de tipo respuesta, le añade las cabeceras necesarias para realizar CROS
 * @param {*} res Objeto de tipo response 
 * @returns Devuelve el mismo objeto para concatenar varias llamadas al mismo
 */
function CORS(res) {
    res.header('Access-Control-Allow-Origin', '*')
        .header(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept'
        )
    return res;
}


/**
 * Objeto que contiene las funciones callback para interactuar con el modelo (e.d., la BBDD)
 */
const CB_MODEL_SELECTS = {
    /**
     * Prueba de conexión a la BBDD: devuelve todas las personas que haya en la BBDD.
     * @param {*} req Objeto con los parámetros que se han pasado en la llamada a esta URL 
     * @param {*} res Objeto Response con las respuesta que se va a dar a la petición recibida
     */
    test_db: async (req, res) => {
        try {
            let personas = await client.query(
                q.Map(
                    q.Paginate(q.Documents(q.Collection(COLLECTION))),
                    q.Lambda("X", q.Get(q.Var("X")))
                )
            )
            res.status(200).json(personas)
        } catch (error) {
            res.status(500).json({ error: error.description })
        }
    },

    /**
     * FUNCIÓN QUE OBTIENE TODOS LOS CICLISTAS 
     * @param {*} req Objeto con los parámetros que se han pasado en la llamada a esta URL 
     * @param {*} res Objeto Response con las respuesta que se va a dar a la petición recibida
     * 
     * 
     * 
     */
    sacaCiclistas: async (req, res) => {
        try {
            let ciclistas = await client.query(
                q.Map(
                    q.Paginate(q.Documents(q.Collection(COLLECTION))),
                    q.Lambda("X", q.Get(q.Var("X")))
                )
            )
            CORS(res).status(200).json(ciclistas)
        } catch (error) {
            res.status(500).json({ error: error.description })
        }
    },

    /**
     * FUNCIÓN PARA OBTENER UN CICLISTA EN CONCRETO CON SU ID
     * @param {*} req 
     * @param {*} res 
     */
    sacaCiclista: async (req, res) => {
        try {
            let ciclista = await client.query(
                q.Get(q.Ref(q.Collection(COLLECTION), req.params.idCiclista))
                )
            
            CORS(res).status(200).json(ciclista)
        } catch (error) {
            res.status(500).json({ error: error.description })
        }
    },

    setCiclista: async (req, res) =>{
        try{
            let valorDevuelto = {}
            let data = (Object.values(req.body)[0] === '') ? JSON.parse(Object.keys(req.body)[0]) : req.body
            let ciclista = await client.query(
                q.Update(
                    q.Ref(q.Collection(COLLECTION), data.id_ciclista),
                    {
                        data: 
                        {
                            nombre: data.nombre_ciclista,
                            apellidos: data.apellidos_ciclista,
                            email: data.email_ciclista,
                            equipos: data.equipos_ciclista,
                        },
                    },
                )
            )
                .then((ret) => {
                    valorDevuelto = ret
                    CORS(res)
                        .status(200).header( 'Content-Type', 'application/json' ).json(valorDevuelto)
                })

        } catch (error) {
            CORS(res).status(500).json({ error: error.description })
        }
        
    },

    newCiclista: async (req, res) => {
        try{
            let valorDevuelto={}
            let data = (Object.values(req.body)[0] === '') ? JSON.parse(Object.keys(req.body)[0]): req.body
            let ciclista = await client.query(
                q.Create(
                    q.Collection(COLLECTION), {
                        data: {
                            id: data.id_ciclista,
                            nombre: data.nombre_ciclista,
                            apellidos: data.apellidos_ciclista,
                            equipos: data.equipos_ciclista,
                            f_nac: data.f_nac_ciclista,
                            email: data.email_ciclista
                        },
                    },
                )
            ).then((ret) => {
                valorDevuelto = ret 
                CORS(res).status(200).header('Content-Type', 'application/json' ).json(valorDevuelto)
            })
        } catch (error){
            console.log(error);
            CORS(res).status(500).json({ error: error.description});
        }
    },

}

    


// CALLBACKS ADICIONALES

/**
 * Callbacks adicionales. Fundamentalmente para comprobar que el ms funciona.
 */
const CB_OTHERS = {
    /**
     * Devuelve un mensaje indicando que se ha accedido a la home del microservicio
     * @param {*} req Objeto con los parámetros que se han pasado en la llamada a esta URL 
     * @param {*} res Objeto Response con las respuesta que se va a dar a la petición recibida
     */
    home: async (req, res) => {
        try {
            CORS(res).status(200).json({ mensaje: "Microservicio MS Plantilla: home" });
        } catch (error) {
            CORS(res).status(500).json({ error: error.description })
        }
    },

    /**
     * Devuelve un mensaje indicando que se ha accedido a la información Acerca De del microservicio
     * @param {*} req Objeto con los parámetros que se han pasado en la llamada a esta URL 
     * @param {*} res Objeto Response con las respuesta que se va a dar a la petición recibida
     */
    acercaDe: async (req, res) => {
        try {
            CORS(res).status(200).json({
                mensaje: "Información del programador",
                autor: "José Ballester Marín",
                email: "jbm00030@red.ujaen.es",
                fecha: "25-03-2023"
            });
        } catch (error) {
            CORS(res).status(500).json({ error: error.description })
        }
    },

}

// Une todos los callbacks en un solo objeto para poder exportarlos.
// MUY IMPORTANTE: No debe haber callbacks con el mismo nombre en los distintos objetos, porque si no
//                 el último que haya SOBREESCRIBE a todos los anteriores.
exports.callbacks = { ...CB_MODEL_SELECTS, ...CB_OTHERS }
