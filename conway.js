import * as design from "./design.js";
import { convolucao } from "./convolution.js";

export function atualizaMatriz(D, O, ctx, TAM) {
  const TL = D.length;
  const TC = D[0].length;

  // Define o kernel para calcular os vizinhos
  const kernel = [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
  ];

  // Passa o kernel para a função convolução
  const vizinhos = convolucao(O, kernel);

  for (let l = 0; l < TL; l++) {
    for (let c = 0; c < TC; c++) {
      const v = vizinhos[l][c];
      if (O[l][c] === 1) {
        if (v < 2 || v > 3) {
          D[l][c] = 0;
        } else {
          D[l][c] = 1;
          // pintaAzuis(D, l, c, 2, ctx, TAM); // Pinta a célula viva
        }
      } else {
        if (v === 3) {
          D[l][c] = 1;
          // pintaAzuis(D, l, c, 2, ctx, TAM);
        } else {
          D[l][c] = 0; // Permanece morta
        }
      }
    }
  }
}

//Desloca M para cada direção
export function deslocaMatriz(M, dl, dc) {
  const TL = M.length;
  const TC = M[0].length;
  let novaMatriz = Array.from({ length: TL }, () => Array(TC).fill(0)); //cria nova matriz zerada

  for (let l = 0; l < TL; l++) {
    for (let c = 0; c < TC; c++) {
      let nl = getIndice(l - dl, TL); //novo indice de linha
      let nc = getIndice(c - dc, TC); //novo indice de coluna
      novaMatriz[l][c] = M[nl][nc]; //prenche nova matriz com valores deslocados
    }
  }
  return novaMatriz;
}

export function v(M, l, c) {
  const TL = M.length;
  const TC = M[0].length;
  return M[getIndice(l, TL)][getIndice(c, TC)];
}
