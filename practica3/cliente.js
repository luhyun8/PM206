export function mostrarMenuDinamico(menu) {
    console.log("💜MAGIC SHOP CAFÉ: MENU💜");
    const menuFormateado = menu.map(producto => `  ID: ${producto.id} ✨ ${producto.nombre} - $${producto.precio}`);
    menuFormateado.forEach(linea => console.log(linea));
}

export function mostrarPromociones(menu) {
    console.log("\n📢 PROMOS ARMY DEL DÍA");
    menu.forEach(producto => {
        if (producto.promocion) {
            console.log(`🌟 ¡${producto.nombre}! -> ${producto.descripcion} por sólo $${producto.precio}`);
        }
    });
}

export function mostrarProductosDisponibles(menu) {
    console.log("\nSTOCK DISPONIBLE EN TIENDA");
    const disponibles = menu.map(producto => {
        return producto.disponible ? `✅ ${producto.nombre}` : `❌ ${producto.nombre} (Agotado)`;
    });
    disponibles.forEach(prod => console.log(prod));
}