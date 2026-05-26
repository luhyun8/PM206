const readline = require('readline');
const terminal = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


const pedidos = [];
const productos = [];
let idProducto = 1;


function agregarPedido(nuevoPedido) {
    pedidos.push(nuevoPedido);
}

function menuCaja() {
    console.log("\n--- CAJA ---");
    console.log("1. Ver lista de pedidos");
    console.log("2. Ver total acumulado");
    console.log("3. Agregar un nuevo pedido manualmente");
    console.log("0. Volver al inicio");

    terminal.question("¿Qué deseas hacer?: ", function(consulta) {
        if (consulta == "1") {
            console.log("\nLista de pedidos:");
            console.log(pedidos);
            menuCaja();
        } 
        else if (consulta == "2") {
            const total = pedidos.length;
            console.log(`El total de pedidos es: ${total}`);
            menuCaja();
        } 
        else if (consulta == "3") {
            terminal.question("Escribe el pedido: ", function(pedido) {
                agregarPedido([pedido]);
                console.log("Pedido agregado.");
                menuCaja();
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


function listarProductos() {
    console.log("\nProductos disponibles:");
    for (let i = 0; i < productos.length; i++) {
        console.log(`${productos[i].id} - ${productos[i].nombre}`);
    }
}

function menuCocina() {
    console.log("\n--- COCINA ---");
    console.log("1. Agregar");
    console.log("2. Editar");
    console.log("3. Eliminar");
    console.log("4. Listar");
    console.log("0. Volver al inicio");

    terminal.question("Opción: ", function(opcion) {
        if (opcion == "1") {
            terminal.question("Nombre del producto: ", function(nombre) {
                const nuevoProducto = {
                    id: idProducto,
                    nombre: nombre
                };
                productos.push(nuevoProducto);
                idProducto++;
                console.log("Producto agregado.");
                menuCocina();
            });
        } 
        else if (opcion == "2") {
            listarProductos();
            terminal.question("ID a editar: ", function(idBuscar) {
                terminal.question("Nuevo nombre: ", function(nuevoNombre) {
                    for (let i = 0; i < productos.length; i++) {
                        if (productos[i].id == idBuscar) {
                            productos[i].nombre = nuevoNombre;
                        }
                    }
                    console.log("Producto actualizado.");
                    menuCocina();
                });
            });
        } 
        else if (opcion == "3") {
            listarProductos();
            terminal.question("ID a eliminar: ", function(idBuscar) {
                for (let i = 0; i < productos.length; i++) {
                    if (productos[i].id == idBuscar) {
                        productos.splice(i, 1);
                        break; 
                    }
                }
                console.log("Producto eliminado.");
                menuCocina();
            });
        } 
        else if (opcion == "4") {
            listarProductos();
            menuCocina();
        } 
        else if (opcion == "0") {
            menuPrincipal();
        } 
        else {
            menuCocina();
        }
    });
}


function menuCliente() {
    
    console.log(`

    1. Consultar Productos
    2. Crear pedido de productos
    3. Listar pedidos
    0. Volver al inicio
    `);

    terminal.question("Elige una opción: ", function(opcion) {
        if (opcion == "1") {
            listarProductos();
            menuCliente();
        } 
        else if (opcion == "2") {
            crearPedidoCliente([]); 
        } 
        else if (opcion == "3") {
            console.log(`\nPedidos realizados hasta ahora: ${pedidos.length}`);
            console.log(pedidos);
            menuCliente();
        } 
        else if (opcion == "0") {
            menuPrincipal();
        } 
        else {
            menuCliente();
        }
    });
}

function crearPedidoCliente(carrito) {
    listarProductos();
    
    // Template strings
    terminal.question(`\nEscribe el ID del producto que deseas (o '0' para finalizar el pedido): `, function(idSeleccionado) {
        
        if (idSeleccionado == "0") {
            if (carrito.length > 0) {
                agregarPedido(carrito);
                console.log(`¡Tu pedido con ${carrito.length} productos ha sido enviado!`);
            } else {
                console.log("Pedido cancelado.");
            }
            menuCliente();
        } 
        else {
            let productoEncontrado = false;
            
            for (let i = 0; i < productos.length; i++) {
                if (productos[i].id == idSeleccionado) {
                    carrito.push(productos[i]);
                    console.log(`${productos[i].nombre} agregado a tu pedido.`);
                    productoEncontrado = true;
                }
            }
            
            if (productoEncontrado == false) {
                console.log("ID no válido.");
            }
            

            crearPedidoCliente(carrito);
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
        if (indicador == "1") {
            menuCaja();
        } else if (indicador == "2") {
            menuCocina();
        } else if (indicador == "3") {
            menuCliente();
        } else if (indicador == "0") {
            console.log("Saliendo...");
            terminal.close();
        } else {
            menuPrincipal();
        }
    });
}

menuPrincipal();