const fs = require('fs');

let listadPorHacer = [];

const guardarDB = () => {
    let data = JSON.stringify(listadPorHacer);
    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('No se pudo grabar', err);
    })
}

const cargarDB = () => {
    try {
        listadPorHacer = require('../db/data.json');
    } catch (error) {
        listadPorHacer = [];
    }
}

const crear = (descripcion) => {
    let porHacer = {
        descripcion,
        completado: false
    };
    cargarDB();
    listadPorHacer.push(porHacer);
    guardarDB();
    return porHacer;
}

const getListado = () => {
    cargarDB();
    return listadPorHacer;
}

const actualizar = (descripcion, completado = true) => {
    cargarDB();
    let index = listadPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

    if (index >= 0) {
        listadPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}

const borrar = (descripcion) => {
    cargarDB();
    let nuevoListado = listadPorHacer.filter(tarea => tarea.descripcion !== descripcion);
    if (listadPorHacer.length === nuevoListado.length) {
        return false;
    } else {
        listadPorHacer = nuevoListado;
        guardarDB();
        return true;
    }
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}