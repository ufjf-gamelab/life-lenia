const canvas = document.createElement("canvas");
canvas.width = 200;
canvas.height = 200;
// canvas.style.border = "1px solid black;"

document.body.append(canvas);

const ctx = canvas.getContext("2d");
ctx.fillStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);

let linha = 3;
let coluna = 2;
let TAM = 10;

ctx.fillStyle = "red";
ctx.fillRect(coluna*TAM, linha*TAM, TAM, TAM);

