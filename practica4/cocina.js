const { terminal, db, menuPrincipal } = require('./caja.js');

function listarProductos() {
    console.log("\nProductos disponibles:");
    for (let i = 0; i < db.productos.length; i++) {
        console.log(`${db.productos[i].id} - ${db.productos[i].nombre} - $${db.productos[i].precio} - ${db.productos[i].categoria}`);
    }
}

function buscarProductos(tipo) {
    let resultado = [];
    if (tipo === "baratos") {
        resultado = db.productos.filter(function(p) { return p.precio <= 100; });
    } else if (tipo === "caros") {
        resultado = db.productos.filter(function(p) { return p.precio > 100; });
    } else {
        resultado = db.productos.filter(function(p) { return p.categoria == tipo; })
    }

    if (resultado.length === 0) {
        console.log("No se encontraron productos");
    } else {
        resultado.forEach(function(p) {
            console.log(`${p.id} - ${p.nombre} - $${p.precio} - ${p.categoria}`);
        });
    }
}

function menuBuscar() {
    console.log("\n-BUSCAR-");
    console.log("1. Productos baratos (menos de $100)");
    console.log("2. Productos caros (más de $100)");
    console.log("3. Bebidas");
    console.log("4. Postres");
    console.log("0. Volver");

    terminal.question("Opción: ", function(opcion) {
        if      (opcion == "1") { buscarProductos("baratos");  menuBuscar(); }
        else if (opcion == "2") { buscarProductos("caros");    menuBuscar(); }
        else if (opcion == "3") { buscarProductos("bebida");   menuBuscar(); }
        else if (opcion == "4") { buscarProductos("postre");   menuBuscar(); }
        else if (opcion == "0") { menuCocina(); }
        else                    { menuBuscar(); }
    });
}

function agregarPromocion() {
    listarProductos();
    terminal.question("ID del producto: ", function(idBuscar) {
        const producto = db.productos.find(function(p) { return p.id == idBuscar; });

        if (!producto) {
            console.log("Producto no encontrado.");
            menuPromociones();
            return;
        }

        console.log("\nTipo de promoción:");
        console.log("1. 2x1");
        console.log("2. Descuento (%)");

        terminal.question("Opción: ", function(tipo) {
            if (tipo == "1") {
                const promo = {
                    id:          db.idPromocion,
                    producto:    producto.nombre,
                    tipo:        "2x1",
                    descripcion: `${producto.nombre} al 2x1`
                };
                db.promociones.push(promo);
                db.idPromocion++;
                console.log(`Promoción agregada: ${promo.descripcion}`);
                menuPromociones();
            }
            else if (tipo == "2") {
                terminal.question("¿Qué % de descuento?: ", function(descuento) {
                    const promo = {
                        id:          db.idPromocion,
                        producto:    producto.nombre,
                        tipo:        "descuento",
                        descuento:   descuento,
                        descripcion: `${producto.nombre} con ${descuento}% de descuento`
                    };
                    db.promociones.push(promo);
                    db.idPromocion++;
                    console.log(`Promoción agregada: ${promo.descripcion}`);
                    menuPromociones();
                });
            }
            else {
                console.log("Opción inválida.");
                menuPromociones();
            }
        });
    });
}

function menuPromociones() {
    console.log("\n-PROMOCIONES-");
    console.log("1. Agregar promoción");
    console.log("0. Volver");

    terminal.question("Opción: ", function(opcion) {
        if (opcion == "1") { agregarPromocion(); }
        else if (opcion == "0") { menuCocina(); }
        else { menuPromociones(); }
    });
}

function menuCocina() {
    console.log("\n-COCINA-");
    console.log("1. Agregar");
    console.log("2. Editar");
    console.log("3. Eliminar");
    console.log("4. Listar");
    console.log("5. Buscar (Baratos/Caros)");
    console.log("6. Promociones");
    console.log("0. Volver al inicio");

    terminal.question("Opción: ", function(opcion) {
        if (opcion == "1") {
            terminal.question("Nombre del producto: ", function(nombre) {
                terminal.question("Precio: $", function(precio) {
                    terminal.question("Categoría (bebida/postre/otro): ", function(categoria) {
                        const nuevoProducto = {
                            id: db.idProducto,
                            nombre: nombre,
                            precio: parseFloat(precio),
                            categoria: categoria
                        };
                        db.productos.push(nuevoProducto);
                        db.idProducto++;
                        console.log("Producto agregado.");
                        menuCocina();
                    });
                });
            });
        }
        else if (opcion == "2") {
            listarProductos();
            terminal.question("ID a editar: ", function(idBuscar) {
                const producto = db.productos.find(function(p) { return p.id == idBuscar; });

                    if (!producto) {
                    console.log("No encontrado.");
                    menuCocina();
                    return;
                    }

                terminal.question("Nuevo nombre: ", function(nuevoNombre) {
                    terminal.question("Nuevo precio: $", function(nuevoPrecio) {
                        terminal.question("Nueva categoría: ", function(nuevaCategoria) {
                            producto.nombre    = nuevoNombre;
                            producto.precio    = parseFloat(nuevoPrecio);
                            producto.categoria = nuevaCategoria;
                            console.log("Producto actualizado.");
                            menuCocina();
                        });
                    });
                });
            });
        }
        else if (opcion == "3") {
            listarProductos();
            terminal.question("ID a eliminar: ", function(idBuscar) {
                const pos = db.productos.findIndex(function(p) { return p.id == idBuscar; });

                if (pos === -1) {
                    console.log("No encontrado.");
                    menuCocina();
                    return;
                }

                db.productos.splice(pos, 1);
                console.log("Producto eliminado.");
                menuCocina();
            });
        }
        else if (opcion == "4") { listarProductos(); menuCocina(); }
        else if (opcion == "5") { menuBuscar(); }
        else if (opcion == "6") { menuPromociones(); }
        else if (opcion == "0") { menuPrincipal(); }
        else { menuCocina(); }
    });
}

module.exports = { menuCocina };