// import { startGlider } from './conway.js';
import { desenhaMatriz, limpaTela } from './design.js';
import { atualizaMatriz, stampDiagonalLarge, stampOscilatingLarge, stampRightMove } from './primordia.js';

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
debugger;


let vez = true;
let dt = 0;
let t0 = 0;

let options = {
  states:12,
  K:20,
  L:4,
  M:1,
  N:2,
  kernel: [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
  ],
}

//   options.K_sum = options.states * options.kernel.flat().reduce((a,c)=>a+c, 0);  //estava calculando a soma do kernel mas depois multiplicava por states gerando um valor muito maior
//   options.kernelNorm = options.kernel.map((l)=>l.map((i)=>i/options.K_sum));
//   options.KNorm = options.K/options.K_sum;  //20/96
//   options.LNorm = options.L/options.K_sum;
//   options.MNorm = options.M/options.K_sum;
//   options.NNorm = options.N/options.K_sum;

  const somaKernel = options.kernel.flat().reduce((a, c)=>a+c, 0);  //não multipliquei por states
  options.kernelNorm = options.kernel.map((l) =>l.map((i)=>i/(somaKernel * options.states)));  //ajustei a normalização do kernel para ver se estava afetando a convolução
  options.KNorm = options.K/(somaKernel * options.states);  // 20/(8*12) = 20/96
  options.LNorm = options.L/(somaKernel * options.states);
  options.MNorm = options.M/(somaKernel * options.states);
  options.NNorm = options.N/(somaKernel * options.states);

  options.E = options.KNorm - options.MNorm;  //extrema esquerda
  options.D = options.KNorm + options.LNorm + options.NNorm;
  options.M1 = options.KNorm ;  //meio 1
  options.M2 = options.KNorm + options.LNorm; 
  document.body.append(JSON.stringify(options));

// stampOscilatingLarge(A, 10, 10);
stampDiagonalLarge(A, 30, 30);
// stampRightMove(A, 50, 50);


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

