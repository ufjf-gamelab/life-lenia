import * as design from './design.js';

export function atualizaMatriz(D, O, ctx, TAM) {
  const TL = D.length;
  const TC = D[0].length;
  const vizinhos = contaVizinhos(O); 

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

  export function contaVizinhos(M) {
    const TL = M.length;   
    const TC = M[0].length;   
    let U = Array.from({ length: TL }, () => Array(TC).fill(0)); //matriz U que armazena a soma de vizinhos para CADA CÉLULA, de mesmo tamanho de M

    const deslocamentos = [-1, 0, 1]; 

    for (let dl of deslocamentos) {
        for (let dc of deslocamentos) {
            if (dl === 0 && dc === 0) continue; // Ignora a item do centro (0,0)

            let deslocada = deslocaMatriz(M, dl, dc); // deslocamento da matriz para todas as direções 

            for (let l = 0; l < TL; l++) {   
                for (let c = 0; c < TC; c++) {
                    U[l][c] += deslocada[l][c];   //U (matriz de vizinhos) possui a soma dos vizinhos para todas as celulas, ou seja, soma os valores deslocados
                }
            }
        }
    }
    return U;
}

//Desloca M para cada direção
export function deslocaMatriz(M, dl, dc) {
  const TL = M.length;
  const TC = M[0].length;
  let novaMatriz = Array.from({ length: TL }, () => Array(TC).fill(0));  //cria nova matriz zerada

  for (let l = 0; l < TL; l++) {
      for (let c = 0; c < TC; c++) {
          let nl = getIndice(l - dl, TL);  //novo indice de linha
          let nc = getIndice(c - dc, TC);  //novo indice de coluna
          novaMatriz[l][c] = M[nl][nc];  //prenche nova matriz com valores deslocados
      }
  }
  return novaMatriz;
}

  // Calcula o índice, considerando bordas opostas
  export function getIndice(indice, maxTam) {
    if (indice > 0) {
      return (indice % maxTam);
    } else {
      return (-Math.abs(indice % maxTam) + maxTam) % maxTam;
    }
  }

  export function v(M, l, c)
{
  const TL = M.length;
  const TC = M[0].length; 
  return M[getIndice(l, TL)][getIndice(c, TC)];
}
