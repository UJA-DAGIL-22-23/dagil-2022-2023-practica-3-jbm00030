/**
 * @file Plantilla.js
 * @description Funciones para el procesamiento de la info enviada por el MS Plantilla
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

"use strict";

/// Creo el espacio de nombres
let Plantilla = {};

// Plantilla de datosDescargados vacíos
Plantilla.datosDescargadosNulos = {
    mensaje: "Datos Descargados No válidos",
    autor: "",
    email: "",
    fecha: ""
}


/**
 * Función que descarga la info MS Plantilla al llamar a una de sus rutas
 * @param {string} ruta Ruta a descargar
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
Plantilla.descargarRuta = async function (ruta, callBackFn) {
    let response = null

    // Intento conectar con el microservicio Plantilla
    try {
        const url = Frontend.API_GATEWAY + ruta
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro la info que se han descargado
    let datosDescargados = null
    if (response) {
        datosDescargados = await response.json()
        callBackFn(datosDescargados)
    }
}


/**
 * Función principal para mostrar los datos enviados por la ruta "home" de MS Plantilla
 */
Plantilla.mostrarHome = function (datosDescargados) {
    // Si no se ha proporcionado valor para datosDescargados
    datosDescargados = datosDescargados || this.datosDescargadosNulos

    // Si datos descargados NO es un objeto 
    if (typeof datosDescargados !== "object") datosDescargados = this.datosDescargadosNulos

    // Si datos descargados NO contiene el campo mensaje
    if (typeof datosDescargados.mensaje === "undefined") datosDescargados = this.datosDescargadosNulos

    Frontend.Article.actualizar("Plantilla Home", datosDescargados.mensaje)
}

/**
 * Función principal para mostrar los datos enviados por la ruta "acerca de" de MS Plantilla
 */
Plantilla.mostrarAcercaDe = function (datosDescargados) {
    // Si no se ha proporcionado valor para datosDescargados
    datosDescargados = datosDescargados || this.datosDescargadosNulos

    // Si datos descargados NO es un objeto 
    if (typeof datosDescargados !== "object") datosDescargados = this.datosDescargadosNulos

    // Si datos descargados NO contiene los campos mensaje, autor, o email
    if (typeof datosDescargados.mensaje === "undefined" ||
        typeof datosDescargados.autor === "undefined" ||
        typeof datosDescargados.email === "undefined" ||
        typeof datosDescargados.fecha === "undefined"
    ) datosDescargados = this.datosDescargadosNulos

    const mensajeAMostrar = `<div>
    <p>${datosDescargados.mensaje}</p>
    <ul>
        <li><b>Autor/a</b>: ${datosDescargados.autor}</li>
        <li><b>E-mail</b>: ${datosDescargados.email}</li>
        <li><b>Fecha</b>: ${datosDescargados.fecha}</li>
    </ul>
    </div>
    `;
    Frontend.Article.actualizar("Plantilla Acerca de", mensajeAMostrar)
}

/**
 * CUERPO DE LA FUNCIÓN DE MOSTRAR TODOS LOS CICLISTAS POR SU NOMBRE COMPLETO
 * @param {*} c Objeto Ciclista del que se obtiene la información
 * @returns Devuelve exactamente la fila de la tabla de un ciclista concreto
 */


Plantilla.cuerpo1 = function(c){
    const ciclista= c.data;

    return `<tr><td><em>${ciclista.nombre} ${ciclista.apellidos}</em></td></tr>`;
}


/**
 * 
 * @param {*} c 
 * @returns 
 */
Plantilla.cuerpo2 = function(c){
    const ciclista= c.data;
    
    //const aux= new Date (c.f_nac.dia, c.f_nac.mes, c.f_nac.anio);

    return `<tr><td>${ciclista.id}</td><td>${ciclista.nombre} ${ciclista.apellidos}</td><td>${ciclista.equipos}</td><td>${ciclista.f_nac.dia}/${ciclista.f_nac.mes}/${ciclista.f_nac.anio}</td><td>${ciclista.email}</td></tr>`;
}
//FUNCIONES REALIZADAS PARA PROCESAR LAS HISTORIAS DE USUARIO

/**
 * 
 * ESTA FUNCIÓN MUESTRA LOS NOMBRE DE LOS CICLISTAS CON FORMATO HTML PARA DIRECTAMENTE MOSTRARLO
 * 
 */



Plantilla.muestraCiclistas = function(vector){

    let x= "";

    x += `<table class="op1"><thead><th>Ciclistas</th></thead><tbody>`;
    vector.data.forEach(element => x += Plantilla.cuerpo1(element))
    x += `</tbody></table>`;

    Frontend.Article.actualizar("Nombre de todos los ciclistas",x);
}



/**
 * 
 * @param {*} vector 
 * 
 */
Plantilla.todosDatos = function(vector){
    
    let x = "";

    x += `<table class="op1"><thead><th>ID</th><th>Ciclistas</th><th>Equipos</th><th>Fecha de Nacimiento</th><th>Email</th></thead><tbody>`;
    vector.data.forEach(element => x += Plantilla.cuerpo2(element))
    x += `</tbody></table>`;

    Frontend.Article.actualizar("Datos de todos los ciclistas",x);
}

/**
 * 
 * ESTA FUNCIÓN MUESTRA LOS NOMBRES DE LOS CICLISTAS ORDENADOS CON FORMATO HTML PARA DIRECTAMENTE MOSTRARLO
 * 
 */



Plantilla.muestraCiclistasOrd = function(vector){

    let x= "";
    let aux=vector.data.sort((a, b) => a.data.nombre>b.data.nombre?1:-1);
    

    x += `<table class="op1"><thead><th>Ciclistas</th></thead><tbody>`;
    
    aux.forEach(element => x += Plantilla.cuerpo1(element));
    x += `</tbody></table>`;

    Frontend.Article.actualizar("Nombre de todos los ciclistas ordenados alfabéticamente",x);
}

/**
 * FUNCIÓN QUE SACA UN CICLISTA POR SU ID
 * 
 * @param {*} idCiclista id del ciclista en concreto
 * @param {*} callBackFn función que se llama con los datos
 */
Plantilla.muestraID = async function(idCiclista, callBackFn){
    try{
        const ruta= Frontend.API_GATEWAY+"/plantilla/sacaCiclista/"+idCiclista
        const respuesta= await fetch(ruta);
        if(respuesta){
            const ciclista = await respuesta.json()
            callBackFn(ciclista)
        }
    }catch(error){
        alert("Error: No se ha podido acceder al API")
        console.error(error)
    }
}
/**
 * ciclista CICLISTA DEL QUE SE OPTIENEN LOS DATOS 
 */
Plantilla.muestraCiclistaID = function (ciclista){
    let x = "";

    x += `<table class="op1"><thead><th>ID</th><th>Ciclistas</th><th>Equipos</th><th>Fecha de Nacimiento</th><th>Email</th></thead><tbody>`;
    x += Plantilla.cuerpo2(ciclista)
    x += `</tbody></table>`;

    Frontend.Article.actualizar("Datos del ciclista",x)
}
//FUNCIONES PARA PROCESAROS LOS EVENTOS DE LOS BOTONES

/**
 * 
 * 
 */

Plantilla.lista_nombres = function (){
    this.descargarRuta("/plantilla/sacaCiclistas", this.muestraCiclistas);
}
/**
 * Función principal para responder al evento de elegir la opción "Home"
 */
Plantilla.procesarHome = function () {
    this.descargarRuta("/plantilla/", this.mostrarHome);
}

/**
 * Función principal para responder al evento de elegir la opción "Acerca de"
 */
Plantilla.procesarAcercaDe = function () {
    this.descargarRuta("/plantilla/acercade", this.mostrarAcercaDe);
}


Plantilla.lista_datos = function (){
    this.descargarRuta("/plantilla/sacaCiclistas", this.todosDatos);
}

Plantilla.lista_nombresOrd= function(){
    this.descargarRuta("/plantilla/sacaCiclistas", this.muestraCiclistasOrd);
}

Plantilla.lista_ciclista = function(ciclista){
    this.muestraID(ciclista,this.muestraCiclistaID);
}