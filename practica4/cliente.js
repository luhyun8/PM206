const { terminal, db, menuPrincipal, agregarPedido } = require('./caja.js');

function listarPromocionesCliente() {
    console.log("\n-Promociones del Día-");
    if(db.promociones.length === 0){
        console.log("No hay promociones por el momento.");
        return;
    }

    db.promociones.forEach(promocion => {
        console.log(`* ${promocion.id} - ${promocion.descripcion}`);
    });
}

function listarProductosCliente() {
    console.log("\n-Productos Disponibles-");
    if(db.productos.length === 0){
        console.log("El menú está vacío.");
        return;
    }

    const menuFormateado = db.productos.map(producto => {
        return `${producto.id} | ${producto.nombre} - $${producto.precio} (${producto.categoria})`;
    });

    menuFormateado.forEach(item => {
        console.log(item);
    });
}

function filtrarProductosCliente() {
    console.log("\n-FILTRAR PRODUCTOS-");
    terminal.question("Escribe una categoría (ej. bebida, postre) o la palabra 'baratos': ", function(filtro) {
        
        const productosFiltrados = db.productos.filter(producto => {
            if (filtro === "baratos") {
                return producto.precio <= 100;
            } else {
                return producto.categoria === filtro;
            }
        });

        if (productosFiltrados.length === 0) {
            console.log(`No encontramos productos para: ${filtro}`);
        } else {
            console.log(`\nResultados para '${filtro}':`);
            
            productosFiltrados
                .map(p => `${p.id} | ${p.nombre} - $${p.precio}`)
                .forEach(textoFormateado => console.log(textoFormateado));
        }
        menuCliente();
    });
}

function filtrarPedidosCliente() {
    console.log("\n-FILTRAR PEDIDOS-");
    terminal.question("¿Mostrar pedidos que tengan más de cuántos productos?    : ", function(cantidadStr) {
        const cantidadLim = parseInt(cantidadStr);

        const pedidosFiltrados = db.pedidos.filter(pedido => pedido.length > cantidadLim);

        if (pedidosFiltrados.length === 0) {
            console.log(`No tienes pedidos guardados con más de ${cantidadLim} productos.`);
        } else {
            console.log(`\nEncontramos ${pedidosFiltrados.length} pedido(s):`);
            
            pedidosFiltrados.forEach((pedido, index) => {
                console.log(`\nPedido Grande #${index + 1}:`);
                pedido.forEach(prod => console.log(` - ${prod.nombre} ($${prod.precio})`));
            });
        }
        menuCliente();
    });
}

function crearPedidoCliente(carrito) {
    listarProductosCliente();
    
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
            
            for (let i = 0; i < db.productos.length; i++) {
                if (db.productos[i].id == idSeleccionado) {
                    carrito.push(db.productos[i]);
                    console.log(`[Agregado] ${db.productos[i].nombre} a tu pedido.`);
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

function menuCliente() {
    console.log(`
    -CLIENTE-
    1. Ver Promociones del Día
    2. Consultar TODOS los Productos
    3. Filtrar Productos
    4. Crear pedido de productos
    5. Listar todos mis pedidos
    6. Filtrar mis pedidos
    0. Volver al inicio
    `);

    terminal.question("Elige una opción: ", function(opcion) {
        if (opcion == "1") {
            listarPromocionesCliente();
            menuCliente();
        } 
        else if (opcion == "2") {
            listarProductosCliente();
            menuCliente();
        }
        else if (opcion == "3") {
            filtrarProductosCliente();
        }
        else if (opcion == "4") {
            crearPedidoCliente([]); 
        } 
        else if (opcion == "5") {
            console.log(`\nPedidos realizados hasta ahora: ${db.pedidos.length}`);
            console.log(db.pedidos);
            menuCliente();
        } 
        else if (opcion == "6") {
            filtrarPedidosCliente();
        }
        else if (opcion == "0") {
            menuPrincipal();
        } 
        else {
            menuCliente();
        }
    });
}

module.exports = { menuCliente, simularEstadosPedido };

    setTimeout(() => {
        console.log("\n[ESTADO]: Preparando su pedido.........");
    }, 2000);
    setTimeout(() => {
        console.log("\n[ESTADO]: Empacando su pedido.........");
    }, 4000);
    setTimeout(() => {
        console.log("\n================ TICKET DE COMPRA ================");
        console.log(`Cliente: ${cuenta.cliente}`);
        console.log("--------------------------------------------------");
        console.log(`Subtotal:  $${cuenta.subtotal}`);
        console.log(`IVA (16%): $${cuenta.IVA}`);
        console.log(`Total:     $${cuenta.total}`);
        console.log("--------------------------------------------------");
        console.log("[ESTADO]: ¡Pedido Entregado! ¡Disfruta tu break! ");
        console.log("==================================================");
        callbackMenu();
    }, 6000);
}
