// import { startGlider } from './conway.js';
import { desenhaMatriz, limpaTela } from './design.js';
import { atualizaMatriz} from './lenia.js';
// import { patterns, loadPattern } from './lenia.js';

const canvas = document.createElement("canvas");
const TAM = 15;
const DIM = 64;
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
    A[l][c] = Math.random();
    // A[l][c] = 0;
    B[l][c] = 0;
  }
}
desenhaMatriz(A, ctx, TAM);

let vez = true;
let dt = 0;
let t0 = 0;

function geraKernel(R) {  //matriz do kernel
    const size = 2 * R + 1;  //tamanho do kernel = 11
    const kernel = [];
    let soma = 0;              //acumular soma para normalizar

    for (let i = 0; i < size; i++) {       
        kernel[i] = [];
        for (let j = 0; j < size; j++) {
            const di = i - R;     //calcula distancia de i ao dentro
            const dj = j - R;
            const d = Math.sqrt(di * di + dj * dj) / R;     //calcula distancia normalizada ao centro

            let valor = 0;
            if (d < 1) {           //se a diatância do centro <1
                valor = bell(d, 0.5, 0.15);     
            }
            kernel[i][j] = valor;
            soma += valor;
        }
    }

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            kernel[i][j] /= soma;     //normaliza para a soma do kernel ser=1
        }
    }

    return kernel;
}

function bell(x, m, s) {        //função gaussiana do tutorial  (distância norm, valor max da curva, largura do pico)
    return Math.exp(-Math.pow((x - m) / s, 2) / 2);  //exponencial negativa que gera curva
}

let options = {
  T: 10,
  R: 5, // raio do kernel
  states:12,
  K:20,
  L:4,
  M:1,
  N:2,
}

options.kernel = geraKernel(options.R);

// stampOscilatingLarge(A, 10, 10);
// stampDiagonalLarge(A, 30, 30);
// stampRightMove(A, 50, 50);

// loadPattern(pattern["pacman"]);


// startGlider(A);




function passo(t) {
  dt = (t - t0) / 1000;

  
    limpaTela(ctx, canvas);
    // pintaAzuis( A, 1, 1, 3);
    if (vez) {
      atualizaMatriz(B, A, options);
      desenhaMatriz(B, ctx, TAM);
    } else {
      atualizaMatriz(A, B, options);
      desenhaMatriz(A, ctx, TAM);
    }
    vez = !vez;
    
  requestAnimationFrame(passo);
  t0 = t;
  
}

requestAnimationFrame(passo);

