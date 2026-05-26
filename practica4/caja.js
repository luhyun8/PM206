// app.js
const readline = require('readline');
const terminal = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


const db = {
    pedidos: [],
    productos: [],
    promociones: [],
    idProducto: 1,
    idPromocion: 1
};


module.exports = { terminal, db, menuPrincipal, agregarPedido };

const cocina = require('./cocina.js');
const cliente = require('./cliente.js');


function agregarPedido(nuevoPedido) {
    db.pedidos.push(nuevoPedido);
}

function menuCaja() {
    console.log("\n--- CAJA ---");
    console.log("1. Ver lista de pedidos");
    console.log("2. Ver total acumulado (Subtotal, IVA, Total)");
    console.log("3. Agregar un nuevo pedido manualmente");
    console.log("0. Volver al inicio");

    terminal.question("¿Qué deseas hacer?: ", function(consulta) {
        if (consulta == "1") {
            console.log("\nLista de pedidos:");
            console.log(db.pedidos);
            menuCaja();
        } 
        else if (consulta == "2") {
            const subtotalGeneral = db.pedidos.reduce((acumuladorGeneral, pedido) => {
                const subtotalDelPedido = pedido.reduce((acumuladorPedido, { precio = 0 }) => {
                    return acumuladorPedido + precio;
                }, 0);
                return acumuladorGeneral + subtotalDelPedido;
            }, 0);

            const iva = subtotalGeneral * 0.16; 
            const totalFInal = subtotalGeneral + iva;

            console.log(`\n--- RESUMEN DE VENTAS ---`);
            console.log(`Total de pedidos realizados: ${db.pedidos.length}`);
            console.log(`Subtotal: $${subtotalGeneral.toFixed(2)}`);
            console.log(`IVA (16%): $${iva.toFixed(2)}`);
            console.log(`TOTAL: $${totalFInal.toFixed(2)}`);
            
            menuCaja();
        } 
        else if (consulta == "3") {
            terminal.question("Escribe el nombre del pedido: ", function(nombre) {
                terminal.question("Escribe el costo: $", function(precio) {
                    agregarPedido([{ nombre: nombre, precio: parseFloat(precio) }]);
                    console.log("Pedido manual agregado.");
                    menuCaja();
                });
            });
        }
        else if (consulta == "0") {
            menuPrincipal();
        }
        else {
            menuCaja();
        }
    });
}

function menuPrincipal() {
    console.log("\n¿Qué rol deseas tomar?");
    console.log("1. Caja");
    console.log("2. Cocina");
    console.log("3. Cliente");
    console.log("0. Salir");

    terminal.question("Selecciona tu rol: ", function(indicador) {
        if (indicador == "1") { menuCaja(); } 
        else if (indicador == "2") { cocina.menuCocina(); } 
        else if (indicador == "3") { cliente.menuCliente(); } 
        else if (indicador == "0") {
            console.log("Saliendo...");
            terminal.close();
        } else {
            menuPrincipal();
        }
    });
}

menuPrincipal();