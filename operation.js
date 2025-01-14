import * as design from './design.js';

export function atualizaMatriz(D, O, ctx, TAM) {
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

  export  function contaVizinhos(M, l, c) {
  
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

export function pintaAzuis(M, lc, cc, r, ctx, TAM) {

    const TL = M.length;
    const TC = M[0].length; 
    
    for(let l = lc - r; l <= lc + r; l++)
    {
      for(let c = cc - r; c <= cc + r; c++)
      {
          if(l === lc && c === cc) continue;
          design.desenhaQuadradoAzul(getIndice(l, TL), getIndice(c, TC), ctx, TAM);
      }
    }
  }

  export function celulasNucleo(M, lc, cc, r) {

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