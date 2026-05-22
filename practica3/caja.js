// Calcular cuentas automáticas usando reduce y destructuring
export function calcularCuentaPedido(pedido, menu) {
    // Destructuring para obtener los items del objeto pedido
    const { items, cliente } = pedido; 

    // Usamos reduce para acumular el subtotal buscando el precio en el menú
    const subtotal = items.reduce((acumulado, item) => {
        const productoMenu = menu.find(p => p.id === item.id);
        // Destructuring del precio del producto encontrado
        const { precio } = productoMenu; 
        
        return acumulado + (precio * item.cant);
    }, 0);

    const IVA = subtotal * 0.16; 
    const total = subtotal + IVA;

    return {
        cliente,
        subtotal: subtotal.toFixed(2),
        IVA: IVA.toFixed(2),
        total: total.toFixed(2)
    };
}