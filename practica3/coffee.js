const menu = [
    { id: 1, nombre: "Espresso", precio: 35, categoria: "bebidas", disponible: true, promocion: false },
    { id: 2, nombre: "Capuchino", precio: 45, categoria: "bebidas", disponible: true, promocion: true },
    { id: 3, nombre: "Matcha", precio: 30, categoria: "bebidas", disponible: false, promocion: false },
    { id: 4, nombre: "Pastel de Chocolate", precio: 65, categoria: "postres", disponible: true, promocion: true },
    { id: 5, nombre: "Cheesecake", precio: 60, categoria: "postres", disponible: true, promocion: false },
    { id: 6, nombre: "Panini de Pollo", precio: 85, categoria: "comida", disponible: true, promocion: false },

    // 1. Combo Madrugador
    { id: 7, nombre: "Combo Madrugador (Americano + Donita)", precio: 50, categoria: "combos", disponible: true, promocion: true, descripcion: "Para empezar el día con todo" },
    
    // 2. Tarde de Amigos
    { id: 8, nombre: "Capuccino 2x1", precio: 45, categoria: "bebidas", disponible: true, promocion: true, descripcion: "Aplica de 4pm a 7pm" },
    
    // 4. Combo Oficina
    { id: 9, nombre: "Combo Oficina (Panini + Café)", precio: 95, categoria: "combos", disponible: true, promocion: true, descripcion: "El almuerzo de los campeones" },
    
    // 5. Antojo Dulce
    { id: 10, nombre: "Antojo Dulce (Pastel + Latte)", precio: 99, categoria: "combos", disponible: true, promocion: true, descripcion: "Tu break de la tarde" }
];

const pedidos = [
    { idPedido: 101, cliente: "Lu", items: [ { id: 1, cant: 2 }, { id: 4, cant: 1 } ] },
    { idPedido: 102, cliente: "Emanuel", items: [ { id: 2, cant: 1 } ] }
];

import { mostrarMenuDinamico, mostrarPromociones, mostrarProductosDisponibles } from './cliente.js';
import { buscarProductosBaratos, buscarProductoCaro, obtenerBebidas, obtenerPostres } from './cocina.js';
import { calcularCuentaPedido } from './caja.js';

// 1. Pruebas de Cliente
mostrarMenuDinamico(menu);
mostrarPromociones(menu);
mostrarProductosDisponibles(menu);

console.log("\n==================================\n");

// 2. Pruebas de Cocina
console.log("Productos Baratos (<= $50):", buscarProductosBaratos(menu));
console.log("Producto de lujo encontrado:", buscarProductoCaro(menu));
console.log("Sección de Bebidas:", obtenerBebidas(menu));
console.log("Sección de Postres:", obtenerPostres(menu));

console.log("\n==================================\n");

// 3. Pruebas de Caja (Cálculo Total Automático de Pedidos)
console.log("--- PROCESANDO CUENTAS EN CAJA ---");
pedidos.forEach(pedido => {
    const cuenta = calcularCuentaPedido(pedido, menu);
    console.log(`Cliente: ${cuenta.cliente} | Subtotal: $${cuenta.subtotal} | IVA: $${cuenta.IVA} | Total a Pagar: $${cuenta.total}`);
});