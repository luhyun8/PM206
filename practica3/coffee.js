import readline from 'readline';
import { mostrarMenuDinamico, mostrarPromociones, mostrarProductosDisponibles } from './cliente.js';
import { buscarProductosBaratos, buscarProductoCaro, obtenerBebidas, obtenerPostres, obtenerComida } from './cocina.js';
import { calcularCuentaPedido } from './caja.js';

const menu = [
    { id: 1, nombre: "Dynamite Latte", precio: 55, categoria: "bebidas", disponible: true, promocion: false },
    { id: 2, nombre: "Blood Sweat & Tears Cold Brew", precio: 65, categoria: "bebidas", disponible: true, promocion: false },
    { id: 3, nombre: "Butter Smooth Americano", precio: 45, categoria: "bebidas", disponible: true, promocion: false },
    { id: 4, nombre: "Spring Day Mint Mocha", precio: 60, categoria: "bebidas", disponible: false, promocion: false },
    { id: 5, nombre: "Sweet Night Cheesecake", precio: 70, categoria: "postres", disponible: true, promocion: false },
    { id: 6, nombre: "Black Swan Chocolate Cake", precio: 75, categoria: "postres", disponible: true, promocion: false },
    { id: 7, nombre: "Anpanman Garlic Bread", precio: 50, categoria: "comida", disponible: true, promocion: false },
    
    // Promociones
    { id: 8, nombre: "Combo Persona (Dynamite Latte + Pan dulce)", precio: 85, categoria: "combos", disponible: true, promocion: true, descripcion: "Para iniciar el día con buena energía" },
    { id: 9, nombre: "Promo Life Goes On (2x1 en Butter Americano)", precio: 45, categoria: "combos", disponible: true, promocion: true, descripcion: "La vida sigue, ¡y con café doble mejor!" },
    { id: 10, nombre: "Descuento Magic Shop (Bebida + Postre)", precio: 110, categoria: "combos", disponible: true, promocion: true, descripcion: "Te mostramos tu galaxia por un precio menor" },
    { id: 11, nombre: "Combo Run BTS! (Anpanman Bread + Cold Brew gratis)", precio: 95, categoria: "combos", disponible: true, promocion: true, descripcion: "La recarga de energía que necesitas" },
    { id: 12, nombre: "Army Bomb Fest (Black Swan Cake + Spring Day Mocha)", precio: 120, categoria: "combos", disponible: true, promocion: true, descripcion: "El combo perfecto para un maratón de MV's" }
];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function mostrarOpciones() {
    console.log("\n💜 MAGIC SHOP CAFÉ 💜");
    console.log("1. Ver Menú Completo");
    console.log("2. Ver Promociones Especiales");
    console.log("3. Ver Estado del Stock / Disponibilidad");
    console.log("4. Filtrar Bebidas o Postres");
    console.log("5. Buscar Productos Baratos o de Lujo");
    console.log("6. Simular Caja: Calcular un Pedido");
    console.log("7. Salir de la aplicación");
    console.log(" ");
    rl.question("Elige una opción (1-7): ", manejarSeleccion);
}

function manejarSeleccion(opcion) {
    switch (opcion.trim()) {
        case '1':
            mostrarMenuDinamico(menu);
            esperarTecla();
            break;
        case '2':
            mostrarPromociones(menu);
            esperarTecla();
            break;
        case '3':
            mostrarProductosDisponibles(menu);
            esperarTecla();
            break;
        case '4':
            rl.question("¿Qué categoría buscas? (bebidas / postres / comida): ", (cat) => {
                const categoria = cat.trim().toLowerCase();
                let filtrados = [];
                
                if (categoria === 'bebidas') filtrados = obtenerBebidas(menu);
                else if (categoria === 'postres') filtrados = obtenerPostres(menu);
                else if (categoria === 'comida') filtrados = obtenerComida(menu);
                
                if (filtrados.length > 0) {
                    console.log(`\n${categoria.toUpperCase()} DISPONIBLES:`);
                    filtrados.forEach(p => console.log(`✨ ${p.nombre} - $${p.precio}`));
                } else {
                    console.log("Categoría no válida o sin productos.");
                }
                esperarTecla();
            });
            break;

        case '5':
            rl.question("¿Qué deseas buscar? (1: Baratos / 2: El más caro): ", (subOp) => {
                if (subOp.trim() === '1') {
                    rl.question("Ingresa tu presupuesto máximo: $", (precio) => {
                        const baratos = buscarProductosBaratos(menu, Number(precio));
                        console.log(`\n💸 PRODUCTOS POR MENOS DE $${precio}`);
                        if(baratos.length > 0) {
                            baratos.forEach(p => console.log(`• ${p.nombre} - $${p.precio}`));
                        } else {
                            console.log("No hay productos tan baratos.");
                        }
                        esperarTecla();
                    });
                } else if (subOp.trim() === '2') {
                    const caro = buscarProductoCaro(menu);
                    console.log(`\n💎 PRODUCTO ESTRELLA DE LUJO`);
                    console.log(`✨ ${caro.nombre} - $${caro.precio}`);
                    esperarTecla();
                } else {
                    console.log("Opción inválida.");
                    esperarTecla();
                }
            });
            break;

        case '6':
            console.log("\n--- SIMULADOR DE PEDIDO MÚLTIPLE ---");
            mostrarMenuDinamico(menu);
            
            rl.question("\nIntroduce los IDs de los productos separados por comas (ej: 1,5,6): ", (idsInput) => {
                rl.question("Introduce las cantidades correspondientes separadas por comas (ej: 2,1,1): ", (cantsInput) => {
                
                    const listaIds = idsInput.split(',').map(id => Number(id.trim()));
                    const listaCants = cantsInput.split(',').map(c => Number(c.trim()));
                    
                    if (listaIds.length !== listaCants.length) {
                        console.log("La cantidad de IDs y de unidades no coincide.");
                        esperarTecla();
                        return;
                    }
                
                    const itemsPedido = [];
                    let idsValidos = true;
                    
                    for (let i = 0; i < listaIds.length; i++) {
                        const existe = menu.find(p => p.id === listaIds[i]);
                        if (!existe) {
                            console.log(`El ID ${listaIds[i]} no existe en el menú.`);
                            idsValidos = false;
                            break;
                        }
                        itemsPedido.push({ id: listaIds[i], cant: listaCants[i] });
                    }
                    
                    if (idsValidos && itemsPedido.length > 0) {
                        const pedidoSimulado = {
                            cliente: "ARMY Cliente",
                            items: itemsPedido
                        };
                        
                        const cuenta = calcularCuentaPedido(pedidoSimulado, menu);
                        
                        console.log("\n================ TICKET DE COMPRA ================");
                        console.log(`Cliente: ${cuenta.cliente}`);
                        console.log("--------------------------------------------------");
                        itemsPedido.forEach(item => {
                            const prod = menu.find(p => p.id === item.id);
                            console.log(`* ${item.cant}x ${prod.nombre} ($${prod.precio} c/u)`);
                        });
                        console.log("--------------------------------------------------");
                        console.log(`Subtotal:  $${cuenta.subtotal}`);
                        console.log(`IVA (16%): $${cuenta.IVA}`);
                        console.log(`Total:     $${cuenta.total}`);
                        console.log("==================================================");
                    }
                    esperarTecla();
                });
            });
            break;
        case '7':
            console.log("\n¡Gracias por visitar Magic Shop Café! We purple you 💜 Bye!");
            rl.close();
            break;
        default:
            console.log("Opción no válida. Intenta de nuevo.");
            esperarTecla();
            break;
    }
}
function esperarTecla() {
    rl.question("\nPresiona ENTER para volver al menú...", () => {
        mostrarOpciones();
    });
}
mostrarOpciones();