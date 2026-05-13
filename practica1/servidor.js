console.log("Hola Mundo! Bienvenido a la práctica de JavaScript desde el servidor.");

/*operaciones*/
let edad = 25;
const edad2 = 30;

console.log("Edad Promedio:");
console.log((edad + edad2) / 2);

/*medir tiempo de un proceso*/
console.time("miProceso");
    for (let i = 0; i < 1000000; i++){}
console.timeEnd("miProceso");

/*objetos tipo tabla*/
//IMPRIMIR EN TABLAS
let usuarios =[
    {nombre: "Jungkook", Edad: 28},
    {nombre: "Hyunjin", Edad: 26}
]
console.table(usuarios);