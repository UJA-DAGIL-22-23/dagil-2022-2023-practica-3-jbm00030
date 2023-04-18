/**
 * @file Plantilla.js
 * @description Funciones para el procesamiento de la info enviada por el MS Plantilla
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

"use strict";

//const { response } = require("express");

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
 * 
 * TDD HECHO
 */


Plantilla.cuerpo1 = function(c){
    const ciclista= c.data;

    return `<tr><td><em>${ciclista.nombre} ${ciclista.apellidos}</em></td></tr>`;
}


/**
 * 
 * MUESTRA TODOS LOS DATOS DE LOS CICLISTAS
 * 
 * @param {*} c Ciclistas para obtener sus datos
 * @returns código HTML para rellenar una fila
 * 
 * TDD HECHO
 */

Plantilla.cuerpo2 = function(c){
    const ciclista= c.data;
    //console.log("OTRO")
    //console.log(ciclista)
    //const aux= new Date (c.f_nac.dia, c.f_nac.mes, c.f_nac.anio);

    return `<tr><td>${ciclista.id}</td><td>${ciclista.nombre} ${ciclista.apellidos}</td><td>${ciclista.equipos}</td><td>${ciclista.f_nac.dia}/${ciclista.f_nac.mes}/${ciclista.f_nac.anio}</td><td>${ciclista.email}</td></tr>`;
}


//FUNCIONES REALIZADAS PARA PROCESAR LAS HISTORIAS DE USUARIO

/**
 * 
 * ESTA FUNCIÓN MUESTRA LOS NOMBRE DE LOS CICLISTAS CON FORMATO HTML PARA DIRECTAMENTE MOSTRARLO
 * 
 * @param {*} vector Vector con los ciclistas a mostrar
 * 
 * TDD HECHO
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
 * FUNCIÓN QUE RELLENA LA TABLA CON TODOS LOS DATOS DE LOS CICLISTAS
 * 
 * @param {*} vector Vector con todos los ciclistas para mostrar sus datos
 * 
 * TDD HECHO
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
 * @param {*} vector Vector de ciclistas que se ordena y muestra
 * 
 * TDD HECHO
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
 * 
 * NO TDD ES ASYNC
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
 * 
 * @param {*} cond 
 * @param {*} callBackFn 
 * 
 * 
 * NO TDD ES ASYNC
 */
Plantilla.sacaCiclistasMS = async function(cond, callBackFn){
    try{
        const ruta= Frontend.API_GATEWAY+"/plantilla/sacaCiclistas"
        const respuesta= await fetch(ruta);
        if(respuesta){
            const ciclistas = await respuesta.json()
            callBackFn(cond,ciclistas)
        }
    }catch(error){
        alert("Error: No se ha podido acceder al API")
        console.error(error)
    }
}

/**
 * 
 * BUSCA COINCIDENCIAS EN EL NOMBRE DE LOS CICLISTAS
 * 
 * @param {*} nombre 
 * @param {*} ciclistas 
 * @returns x
 * 
 * 
 * TDD HECHO
 */

Plantilla.buscar = async function (nombre, ciclistas){
    
    const coincidencias= ciclistas.data.filter(element => element.data.nombre === nombre);
    let x = "";

    x += `<table class="op1"><thead><th>ID</th><th>Ciclistas</th><th>Equipos</th><th>Fecha de Nacimiento</th><th>Email</th></thead><tbody>`;
    coincidencias.forEach(element => x += Plantilla.cuerpo2(element))
    x += `</tbody></table>`;

    Frontend.Article.actualizar("Ciclistas encontrados",x);

    return x;
}

/**
 * 
 * MUESTRA UN SOLO CICLISTA
 * 
 * @param {*} ciclista CICLISTA DEL QUE SE OPTIENEN LOS DATOS 
 * 
 * TDD HECHO
 */

Plantilla.muestraCiclistaID = function (ciclista){
    let x = "";

    x += `<table class="op1"><thead><th>ID</th><th>Ciclistas</th><th>Equipos</th><th>Fecha de Nacimiento</th><th>Email</th></thead><tbody>`;
    x += Plantilla.cuerpo2(ciclista)
    x += `</tbody></table>`;

    Frontend.Article.actualizar("Datos del ciclista",x)
}

/**
 * Función que devuelve los ciclistas por el campo que se haya elegido
 * 
 * En primer lugar creo la cabecera y después ordeno el vector por el campo elegido, después recorro el vector
 * metiendo los datos de los ciclistas ordenados ya en html. Añado el pie de tabla y actualizo la vista.
 * 
 * @param {*} cond Condición por la que ordenar
 * @param {*} ciclistas Todos los ciclistas para ordenar
 * 
 * TDD HECHO
 */

Plantilla.muestraCampo = function (cond, ciclistas){
    let x = "";

    //AÑADO LA CABECERA
    x += `<table class="op1"><thead><th>ID</th><th>Ciclistas</th><th>Equipos</th><th>Fecha de Nacimiento</th><th>Email</th></thead><tbody>`;

    //ORDENO
    let auxiliar = ciclistas.data.sort((a, b) => {
        if(cond === "f_nac"){ //ORDENO POR F_NAC
            const f_izq = new Date(a.data.f_nac.anio, a.data.f_nac.mes, a.data.f_nac.dia);
            const f_der = new Date(b.data.f_nac.anio, b.data.f_nac.mes, b.data.f_nac.dia);
                return f_izq < f_der ? -1 : 1;
        }else{
            //PARA ORDENAR POR OTRO CAMPO QUE NO SEA LA FECHA
                return a.data[cond] < b.data[cond] ? -1 : 1;
        }
        
    });

    //POR CADA CICLISTA MUESTRO TODOS SUS DATOS
    auxiliar.forEach(element => x += Plantilla.cuerpo2(element));

    // PIE DE TABLA
    x += `</tbody></table>`;

    //ACTUALIZO LA VISTA
    Frontend.Article.actualizar("Datos de los ciclistas ordenados",x)

}

/**
 * 
 * PLANTILLA QUE HACE EL CUERPO DE LA TABLA PERO CON UN BOTÓN PARA EDITAR
 * 
 * @param {*} c CICLISTA
 * @returns 
 * 
 * TDD HECHO
 */

Plantilla.cuerpoEditable = function(c){
    const ciclista= c.data;

    return `<tr><td>${ciclista.id}</td><td>${ciclista.nombre}</td><td>${ciclista.apellidos}</td><td>${ciclista.equipos}</td><td>${ciclista.f_nac.dia}/${ciclista.f_nac.mes}/${ciclista.f_nac.anio}</td><td>${ciclista.email}</td><td><div class="btn-conf"><a href="javascript:Plantilla.changeNombre('${c.ref['@ref'].id}')">MODIFICAR NOMBRE</a></div></td></tr>`;                              
}

/**
 * 
 * FUNCIÓN QUE RELLENA LA TABLA CON UN BOTÓN PARA EDITAR
 * 
 * @param {*} vector CICLISTAS
 * 
 * TDD HECHO
 */

Plantilla.todosDatosEditables = function(vector){
    
    let x = "";

    x += `<table class="op1"><thead><th>ID</th><th>Ciclistas</th><th>Apellidos</th><th>Equipos</th><th>Fecha de Nacimiento</th><th>Email</th></thead><tbody>`;
    vector.data.forEach(element => x += Plantilla.cuerpoEditable(element))
    x += `</tbody></table>`;

    Frontend.Article.actualizar("Datos de todos los ciclistas",x);
}

/**
 * 
 * MUESTRA LA TABLA DEL CICLISTA QUE SE VA A EDITAR
 * 
 * @param {*} ciclista CICLISTA A MOSTRAR
 * 
 * TDD HECHO
 */

Plantilla.modNombre = function(ciclista){
    //const aux= ciclista.data;
    let c= `<form method='post' action=''> <table class="op1"><thead><th>ID</th><th>Ciclista</th><th>Apellidos</th><th>Equipos</th><th>Fecha de Nacimiento</th><th>Email</th></thead><tbody>
                <tr> <td> <input type="text" disabled id="id_c" value="${ciclista.data.id}" name="id_ciclista"/> </td>
                     <td> <input type="text" id="nombre_c" value="${ciclista.data.nombre}" name="nombre_ciclista"/> </td> 
                     <td> <input type="text" disabled id="apellidos_c" required value="${ciclista.data.apellidos}" name="apellidos_ciclista"/> </td>
                     <td> <input type="text" disabled id="equipos_c"  required value="${ciclista.data.equipos}" name="equipos_ciclista"/> </td>
                     <td> <input type="text" disabled id="f_nac_c" value="${ciclista.data.f_nac.dia}/${ciclista.data.f_nac.mes}/${ciclista.data.f_nac.anio}" name="apellidos_ciclista"/> </td>
                     <td> <input type="text" disabled id="em_c" required value="${ciclista.data.email}" name="email_ciclista"/> </td>

                    <td><div class="btn-conf"><a href="javascript:Plantilla.save('359097846737141965')">Confirmar</a></div></td>
                </tr>
                </tbody>
                </table>
            </form>`;

    Frontend.Article.actualizar("Modificando el nombre del ciclista", c)            
}


/**
 * GUARDA UN NUEVO CICLISTA
 * 
 * NO DD ES ASYNC
 */
Plantilla.nuevoCiclista = async function () {
    try{
        let ruta = Frontend.API_GATEWAY + "/plantilla/newCiclista";
        const respuesta = await fetch(ruta, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'no-cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'omit', // include, *same-origin, omit
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
            body: JSON.stringify({
                "id_ciclista": document.getElementById("id-ciclista").value,
                "nombre_ciclista": document.getElementById("nombre-ciclista").value,
                "apellidos_ciclista": document.getElementById("apellidos-ciclista").value,
                "equipos_ciclista": document.getElementById("equipos-ciclista").value.split(","),
                "f_nac_ciclista": document.getElementById("f_nac-ciclista").value,
                "email_ciclista": document.getElementById("email-ciclista").value,
            })
        });
        Plantilla.mostarTodos();
    } catch (error) {
        alert("Error: No se ha podido acceder al API Gateway " + error);
    }
};

/**
 * 
 * FUNCIÓN QUE GENERA UN FORMULARIO VACÍO PARA INTRODUCIR UN NUEVO CICLISTA A LA BBDD
 * 
 * TDD HECHO
 */

Plantilla.form_nuevoCiclista = function () {
    let ciclista = ` <form method='post' action=''> <table class="op1"><thead><th>ID</th><th>Ciclista</th><th>Apellidos</th><th>Equipos</th><th>Fecha de Nacimiento</th><th>Email</th></thead><tbody>
    <tr> <td> <input type="number"  id="id-ciclista"  placeholder="ID" name="id_ciclista"/> </td>
         <td> <input type="text"  id="nombre-ciclista" placeholder="Nombre" name="nombre_ciclista"/> </td> 
         <td> <input type="text"  id="apellidos-ciclista" placeholder="Apellidos" name="apellidos_ciclista"/> </td>
         <td> <input type="text"  id="equipos-ciclista" placeholder="Equipos separados por , " name="equipos_ciclista"/> </td>
         <td> <input type="date"  id="f_nac-ciclista" placeholder="dd/mm/aaaa" name="f_nac__ciclista"/> </td>
         <td> <input type="text"  id="email-ciclista" placeholder="Email" name="email_ciclista"/> </td>

        <td><div class="btn-conf"><a href="javascript:Plantilla.nuevoCiclista()">Confirmar</a></div></td>
    </tr>
    </tbody>
    </table>
                    </form>`;
    Frontend.Article.actualizar("Datos nuevo deportista", ciclista);
}

//FUNCIONES PARA PROCESAR LOS EVENTOS DE LOS BOTONES

/**
 * 
 * Función principal para responder al evento de elegir la opción "Lista nombres"
 */

Plantilla.lista_nombres = function (){
    this.descargarRuta("/plantilla/sacaCiclistas", this.muestraCiclistas);
}

/**
 * Función para mostrar todos los datos de todos los ciclistas
 */
Plantilla.mostarTodos = function(){
    this.descargarRuta("/plantilla/sacaCiclistas", this.todosDatos);
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

/**
 * Función principal para responder al evento de "Datos Completos"
 */

Plantilla.lista_datos = function (){
    this.descargarRuta("/plantilla/sacaCiclistas", this.todosDatos);
}


/**
 * Función principal para responder al evento de "Lista Nombres Ordenados"
 */

Plantilla.lista_nombresOrd= function(){
    this.descargarRuta("/plantilla/sacaCiclistas", this.muestraCiclistasOrd);
}

/**
 * Función principal para responder al evento de "Lista Ciclista"
 */

Plantilla.lista_ciclista = function(ciclista){
    this.muestraID(ciclista,this.muestraCiclistaID);
}


/**
 * Función principal para responder al evento de "Lista Ciclistas Ordenados Por"
 */

Plantilla.lista_todoOrd= function (){

    //OBTENGO LA CONDICIÓN POR LA QUE ORDENAR
    const condition = document.querySelector('#cond').value;

    //OBTENGO EL VALOR DEL FORMULARIO
    const formulario = document.querySelector('#eleccion');
    formulario.style.display = 'block';

    //OBTENGO LA ACCIÓN DEL BOTÓN
    const boton= document.querySelector('#btn');
    
    //ESCUCHO EL CLICK Y ACTUALIZO EL VALOR DE LA CONDICIÓN
    formulario.addEventListener('submit', (click) =>{
        click.preventDefault();
        //AQUÍ GUARDO LA CONDICIÓN
        const aux= document.querySelector('#cond').value;

        //LLAMO A LA FUCNION QUE ACTUALIZA LA VISTA CON LA CONDICIÓN ELEGIDA
        this.sacaCiclistasMS(aux, this.muestraCampo);

        //AQUÍ SE MUESTRA EL RESULTADO AL HACER CLICK EN GO
        const enlace= document.querySelectorAll('.mostrar');
        click.forEach((enlace)=> {
            enlace.addEventListener('click', () => {
                formulario.style.display = 'none';
            })
        })
    });

}

/**
 * Función que muestra la tabla de todos los datos con el botón de editar
 */
Plantilla.lista_datosEdi = function (){
    this.descargarRuta("/plantilla/sacaCiclistas", this.todosDatosEditables);
}

/**
 * 
 * Función que muestra un ciclista en concreto para modificar su nombre
 * 
 * @param {*} id ID del ciclistas
 */

Plantilla.changeNombre = function (id){
    this.muestraID(id, this.modNombre)
}

/**
 * 
 * Función que guarda los daos del ciclista
 * 
 * @param {*} id_ciclista id del ciclista
 */

Plantilla.save = async function (id_ciclista) {
    try{
        let enlace = Frontend.API_GATEWAY + "/plantilla/setCiclista/"
        let id = id_ciclista
        const response = await fetch(enlace, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'no-cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'omit', // include, *same-origin, omit
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
            body: JSON.stringify({
                "id_ciclista": id,
                "nombre_ciclista": document.getElementById("nombre_c").value,
                "apellidos_ciclista": document.getElementById("apellidos_c").value,
                "email_ciclista": document.getElementById("em_c").value,
                "equipos_ciclista": document.getElementById("equipos_c").value,
            }),
        });
        Plantilla.lista_ciclista(id_ciclista);
    } catch (error) {
        alert("Error guardando: No se ha podido acceder al API Gateway " + error)
    }
}

/**
 * Función que busca el nombre de un ciclista en la BBDD 
 */

Plantilla.buscaNombre = function (){
    //const name = document.querySelector('#busqueda').value;

    //OBTENGO EL VALOR DEL FORMULARIO
    const formulario = document.querySelector('#busqueda');
    formulario.style.display = 'block';

    //OBTENGO LA ACCIÓN DEL BOTÓN
    const boton= document.querySelector('#btnBuscar');
    
    //ESCUCHO EL CLICK Y ACTUALIZO EL VALOR DE LA CONDICIÓN
    formulario.addEventListener('submit', (click) =>{
        click.preventDefault();
        //AQUÍ GUARDO LA CONDICIÓN
        const aux= document.querySelector('#nameC').value;

        //LLAMO A LA FUCNION QUE ACTUALIZA LA VISTA CON LA CONDICIÓN ELEGIDA
        this.sacaCiclistasMS(aux, this.buscar);

        //AQUÍ SE MUESTRA EL RESULTADO AL HACER CLICK EN GO
        const enlace= document.querySelectorAll('.mostrar');
        click.forEach((enlace)=> {
            enlace.addEventListener('click', () => {
                formulario.style.display = 'none';
            })
        })
    });
}
    
