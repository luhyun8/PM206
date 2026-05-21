// Buscar productos "baratos" (por ejemplo, menores a $50)
export function buscarProductosBaratos(menu, presupuesto = 50) {
    return menu.filter(producto => producto.precio <= presupuesto);
}

// Buscar un producto "caro" específico (ej. el primero que supere los $80)
export function buscarProductoCaro(menu, limite = 80) {
    return menu.find(producto => producto.precio >= limite);
}
// Filtrar por categoría: bebidas
export function obtenerBebidas(menu) {
    return menu.filter(producto => producto.categoria === "bebidas");
}
// Filtrar por categoría: postres
export function obtenerPostres(menu) {
    return menu.filter(producto => producto.categoria === "postres");
}
// Filtrar por comida
export function obtenerComida(menu) {
    return menu.filter(producto => producto.categoria === "comida");
}