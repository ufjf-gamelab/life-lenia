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
    if (Math.random() < -0.3) {
      A[l][c] = 1;
    } else {
      A[l][c] = 0;
    }
    B[l][c] = 0;
  }
}

// A[0][10] = 1;
// A[1][10] = 1;
// A[2][10] = 1;
// A[2][11] = 1;
// A[1][12] = 1;

A[0][0] = 1;
A[0][1] = 1;
A[0][2] = 1;
// A[9][2] = 1;
// A[8][1] = 1;


let vez = true;
let dt = 0;
let t0 = 0;
let cooldown = 0;
function passo(t) {
  dt = (t - t0) / 1000;

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
  for (let l = 0; l < 20; l++) {
    //linha
    for (let c = 0; c < 20; c++) {
      //coluna
      const v = contaVizinhos(O, l, c); //conta os vizinhos posição
      if (O[l][c] === 1) {
        if (v < 2 || v > 3) {
          //mais que 3 ou menos que 2 morre
          D[l][c] = 0;
        } else {
          D[l][c] = 1;
        }
      } else {
        if (v === 3) {
          // 3 vizionhos revive
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

//
function contaVizinhos(M, l, c) {
  
  let total = 0;
  const numLinhas = M.length;
  const numColunas = M[0].length;

  // Obter os vizinhos, considerando bordas opostas
  total += v(M, l - 1, c) // Cima
  total += M[getIndice(l - 1, numLinhas)][getIndice(c - 1, numColunas)]; // Diagonal superior esquerda
  total += M[getIndice(l - 1, numLinhas)][getIndice(c + 1, numColunas)]; // Diagonal superior direita
  total += M[getIndice(l + 1, numLinhas)][c]; // Baixo
  total += M[getIndice(l + 1, numLinhas)][getIndice(c - 1, numColunas)]; // Diagonal inferior esquerda
  total += M[getIndice(l + 1, numLinhas)][getIndice(c + 1, numColunas)]; // Diagonal inferior direita
  total += M[l][getIndice(c - 1, numColunas)]; // Esquerda
  total += M[l][getIndice(c + 1, numColunas)]; // Direita

  return total;
}

// Calcula o índice, considerando bordas opostas
function getIndice(indice, maxTam) {
  if (indice > 0) {
    return (indice % maxTam);
  } else {
    return (-Math.abs(indice % maxTam) + maxTam) % maxTam;
  }
}

function v(M, l, c)
{
  const TL = M.length;
  const TC = M[0].length; 
  return M[getIndice(l, TL)][getIndice(c, TC)];
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
  ctx.fillRect(linha * TAM, coluna * TAM, TAM, TAM);
}
