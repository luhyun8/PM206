// Buscar productos baratos
export function buscarProductosBaratos(menu, presupuesto = 50) {
    return menu.filter(producto => producto.precio <= presupuesto);
}

// Buscar un producto caro
export function buscarProductoCaro(menu, limite = 100) {
    return menu.find(producto => producto.precio >= limite);
}
// Filtrar por bebidas
export function obtenerBebidas(menu) {
    return menu.filter(producto => producto.categoria === "bebidas");
}
// Filtrar por postres
export function obtenerPostres(menu) {
    return menu.filter(producto => producto.categoria === "postres");
}
// Filtrar por comida
export function obtenerComida(menu) {
    return menu.filter(producto => producto.categoria === "comida");
}