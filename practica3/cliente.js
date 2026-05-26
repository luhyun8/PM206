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
        return producto.disponible ? `Disponible: ${producto.nombre}` : `NO Disponible: ${producto.nombre} (Agotado)`;
    });
    disponibles.forEach(prod => console.log(prod));
}
export function simularEstadosPedido(cuenta, callbackMenu) {
    console.log("\n [ESTADO]: Pedido recibido de " + cuenta.cliente + ". ¡Iniciando preparación!");

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