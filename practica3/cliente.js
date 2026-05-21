export function mostrarMenuDinamico(menu) {
    console.log("MENÚ DEL DÍA");
    const menuFormateado = menu.map(producto => `${producto.nombre} - $${producto.precio}`);
    menuFormateado.forEach(linea => console.log(linea));
}

// Filtrar y mostrar solo promociones
export function mostrarPromociones(menu) {
    console.log("\nPROMOCIONES DE HOY");
    menu.forEach(producto => {
        if (producto.promocion) {
            console.log(`¡PROMO! ${producto.nombre} tiene un precio especial de $${producto.precio}`);
        }
    });
}
// Filtrar y mostrar productos disponibles
export function mostrarProductosDisponibles(menu) {
    console.log("\nPRODUCTOS DISPONIBLES");
    const disponibles = menu.map(producto => {
        return producto.disponible ? `${producto.nombre} (Disponible)` : null;
    });
    
    disponibles.forEach(prod => {
        if (prod) console.log(prod);
    });
}