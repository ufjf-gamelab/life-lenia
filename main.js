const canvas = document.createElement("canvas");
canvas.width = 200;
canvas.height = 200;
// canvas.style.border = "1px solid black;"

document.body.append(canvas);

const ctx = canvas.getContext("2d");

let TAM = 10;

const A = [];
const B = [];

for (let l = 0; l < 20; l++) {
  A[l] = [];
  B[l] = [];
  for (let c = 0; c < 20; c++) {
    if (Math.random() < 0.3) {
      A[l][c] = 1;
    } else {
      A[l][c] = 0;
    }
    B[l][c] = 0;
  }
}

let vez = true;
let dt = 0;
let t0 = 0;
let cooldown = 0;
function passo(t) {
  dt = (t - t0)/1000;

  cooldown += dt;
  if (cooldown > 0.1) {
    limpaTela();
    if (vez) {
      atualizaMatriz(B, A);
      desenhaMatriz(B);
    } else {
      atualizaMatriz(A, B);
      desenhaMatriz(B);
    }
    vez = !vez;
    cooldown = 0;
  }
  requestAnimationFrame(passo);
  t0 = t;
}

requestAnimationFrame(passo);

/**
A live cell dies if it has fewer than two live neighbors.
A live cell with two or three live neighbors lives on to the next generation.
A live cell with more than three live neighbors dies.
A dead cell will be brought back to live if it has exactly three live neighbors. 

 */

function atualizaMatriz(D, O) {
  for (let l = 0 + 1; l < 20 - 1; l++) {
    for (let c = 0 + 1; c < 20 - 1; c++) {
      const v = contaVizinhos(O, l, c);
      if (O[l][c] === 1) {
        if (v < 2 || v > 3) {
          D[l][c] = 0;
        } else {
          D[l][c] = 1;
        }
      } else {
        if (v === 3) {
          D[l][c] = 1;
        } else {
          D[l][c] = 0;
        }
      }
    }
  }
}

function limpaTela() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function contaVizinhos(M, l, c) {
  let total = 0;

  total += M[l - 1][c];
  total += M[l - 1][c - 1];
  total += M[l - 1][c + 1];
  total += M[l + 1][c];
  total += M[l + 1][c - 1];
  total += M[l + 1][c + 1];
  total += M[l][c - 1];
  total += M[l][c + 1];

  return total;
}

function desenhaMatriz(M) {
  for (let l = 0; l < 20; l++) {
    for (let c = 0; c < 20; c++) {
      if (M[l][c] === 1) {
        desenhaQuadrado(l, c);
      }
    }
  }
}

function desenhaQuadrado(linha, coluna) {
  ctx.fillStyle = "red";
  ctx.fillRect(coluna * TAM, linha * TAM, TAM, TAM);
}
