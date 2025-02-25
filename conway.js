import * as design from './design.js';

export function atualizaMatriz(D, O, ctx, TAM) {
    const TL = D.length;
    const TC = D[0].length;
    console.log(D);
    for (let l = 0; l < TL; l++) {
      for (let c = 0; c < TC; c++) {
        const v = contaVizinhos(D);
        if (O[l][c] === 1) {
          if (v < 2 || v > 3) {
            D[l][c] = 0;
          } else {
            D[l][c] = 1;
            // pintaAzuis(D, l, c, 2, ctx, TAM);
          }
        } else {
          if (v === 3) {
            D[l][c] = 1;
            // pintaAzuis(D, l, c, 2, ctx, TAM);
          } else {
            D[l][c] = 0;
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


  // export  function contaVizinhos(M, l, c) {
  
  //   let total = 0;
   
  //   const nucleo = celulasNucleo(M, l, c, 1);
  
  //   for(let i = 0; i < nucleo.length; i++)
  //   {
  //     const celula = nucleo[i];
  //     total += M[celula.l][celula.c];
  //   }
  //   return total;
  // }

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


//retorna todas as células vizinhas
//   export function celulasNucleo(M, lc, cc, r) {

//   const TL = M.length;
//   const TC = M[0].length; 
//   const nucleo = [];
  
//   for(let l = lc - r; l <= lc + r; l++)
//   {
//     for(let c = cc - r; c <= cc + r; c++)
//     {
//         if(l === lc && c === cc) continue;
//         nucleo.push({l:getIndice(l, TL), c:getIndice(c, TC)});
//     }
//   }
//   return nucleo;
// }