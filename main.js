import { desenhaMatriz, limpaTela } from './design.js';
import { atualizaMatriz } from './conway.js';

const canvas = document.createElement("canvas");
const TAM = 5;
const DIM = 100;
canvas.width = TAM*DIM;
canvas.height = TAM*DIM;


document.body.append(canvas);

const ctx = canvas.getContext("2d");


const A = [];
const B = [];

for (let l = 0; l < DIM; l++) {
  A[l] = [];
  B[l] = [];
  for (let c = 0; c < DIM; c++) {
    if (Math.random() < -0.3) {
      A[l][c] = 0;
    } else {
      A[l][c] = 0;
    }
    B[l][c] = 0;
  }
}

function startGlider(matriz) {
  const gliderPattern = [
    [0, 10],
    [1, 10],
    [2, 10],
    [2, 11],
    [1, 12]
  ];

  for (let i = 0; i < gliderPattern.length; i++) {
    let [l, c] = gliderPattern[i];
    matriz[l][c] = 1;
  }
}

startGlider(A);


let vez = true;
let dt = 0;
let t0 = 0;
let cooldown = 0;
function passo(t) {
  dt = (t - t0) / 1000;

  cooldown += dt;
  if (cooldown > 0.1) {
    limpaTela(ctx, canvas);
    // pintaAzuis( A, 1, 1, 3);
    if (vez) {
      atualizaMatriz(B, A, ctx, TAM);
      desenhaMatriz(B, ctx, TAM);
    } else {
      atualizaMatriz(A, B, ctx, TAM);
      desenhaMatriz(A, ctx, TAM);
    }
    vez = !vez;
    cooldown = 0;
  }
  requestAnimationFrame(passo);
  t0 = t;
}

requestAnimationFrame(passo);

