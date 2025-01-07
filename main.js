const canvas = document.createElement("canvas");
const TAM = 5;
const DIM = 100;
canvas.width = TAM*DIM;
canvas.height = TAM*DIM;
// canvas.style.border = "1px solid black;"

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

A[0][10] = 1;
A[1][10] = 1;
A[2][10] = 1;
A[2][11] = 1;
A[1][12] = 1;

// A[0][0] = 1;
// A[0][1] = 1;
// A[0][2] = 1;
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
    // pintaAzuis( A, 1, 1, 3);
    if (vez) {
      atualizaMatriz(B, A);
      desenhaMatriz(B);
    } else {
      atualizaMatriz(A, B);
      desenhaMatriz(A);
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
  const TL = D.length;
  const TC = D[0].length;
  for (let l = 0; l < TL; l++) {
    for (let c = 0; c < TC; c++) {
      const v = contaVizinhos(O, l, c);
      if (O[l][c] === 1) {
        if (v < 2 || v > 3) {
          D[l][c] = 0;
        } else {
          D[l][c] = 1;
          // pintaAzuis(D, l, c, 2);
        }
      } else {
        if (v === 3) {
          D[l][c] = 1;
          // pintaAzuis(D, l, c, 2);
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
 
  const nucleo = celulasNucleo(M, l, c, 1);

  for(let i = 0; i < nucleo.length; i++)
  {
    const celula = nucleo[i];
    total += M[celula.l][celula.c];
  }
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
  const TL = M.length;
  const TC = M[0].length;
  for (let l = 0; l < TL; l++) {
    for (let c = 0; c < TC; c++) {
      if (M[l][c] === 1) {
        desenhaQuadrado(l, c);
      }
      if (M[l][c] === 2) {
        desenhaQuadradoAzul(l, c); // Azul
      }
    }
  }
}

function desenhaQuadrado(linha, coluna) {
  ctx.fillStyle = "red";
  ctx.fillRect(linha * TAM, coluna * TAM, TAM, TAM);
}

function desenhaQuadradoAzul(linha, coluna) {
  ctx.fillStyle = "blue";
  ctx.fillRect(linha * TAM, coluna * TAM, TAM, TAM);
}

const direcoes = [
  [-2, 0], [2, 0], [0, -2], [0, 2],  // Cima, baixo, esquerda, direita
  [-2, -2], [-2, 2], [2, -2], [2, 2] // Diagonais
];

function pintaAzuis(M, lc, cc, r) {

  const TL = M.length;
  const TC = M[0].length; 
  
  for(let l = lc - r; l <= lc + r; l++)
  {
    for(let c = cc - r; c <= cc + r; c++)
    {
        if(l === lc && c === cc) continue;
        desenhaQuadradoAzul(getIndice(l, TL), getIndice(c, TC));
    }
  }
}

function celulasNucleo(M, lc, cc, r) {

  const TL = M.length;
  const TC = M[0].length; 
  const nucleo = [];
  
  for(let l = lc - r; l <= lc + r; l++)
  {
    for(let c = cc - r; c <= cc + r; c++)
    {
        if(l === lc && c === cc) continue;
        nucleo.push({l:getIndice(l, TL), c:getIndice(c, TC)});
    }
  }
  return nucleo;
}