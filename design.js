import { getIndice } from './primordia.js';

export function desenhaMatriz(M, ctx, TAM) {
    const TL = M.length;
    const TC = M[0].length;
    
    const states = 12; //12 estados do primordia
    for (let l = 0; l < TL; l++) {
      for (let c = 0; c < TC; c++) {
         if (M[l][c] > 0) {  //verifica se está entre 1 e 12 (0 não desenha)
          const intensidade = Math.min(1, M[l][c]);  //ex: 6/12 tem 50% da intensidade
          ctx.fillStyle = `rgb(${Math.floor(intensidade * 255)}, 0, 0)`; //variação cor: quanto maior o valor, mais forte fica o vermelho
          desenhaQuadrado(l, c, ctx, TAM);
          // escreveTexto(l, c, ctx, TAM, M[l][c]);
          
        }
      }
    }
    
  }

export function desenhaQuadrado(linha, coluna, ctx, TAM) {
    // ctx.fillStyle = "red";
    ctx.fillRect(coluna * TAM, linha * TAM, TAM, TAM);  //fiz alterações de coluna e linha
  }

  export function escreveTexto(linha, coluna, ctx, TAM, texto) {
    ctx.fillStyle = "white";
    ctx.font = "12px arial";
    ctx.fillText(texto, coluna * TAM, linha * TAM + (TAM/2), TAM);
  }
  
export function desenhaQuadradoAzul(linha, coluna, ctx, TAM) {
    ctx.fillStyle = "blue";
    ctx.fillRect(coluna * TAM, linha * TAM, TAM, TAM);
  }

export function limpaTela(ctx, canvas) {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

export function pintaAzuis(M, lc, cc, r, ctx, TAM) {
    const TL = M.length;
    const TC = M[0].length; 
    
    for(let l = lc - r; l <= lc + r; l++)
    {
      for(let c = cc - r; c <= cc + r; c++)
      {
          if(l === lc && c === cc) continue;
          desenhaQuadradoAzul(getIndice(l, TL), getIndice(c, TC), ctx, TAM);
      }
    }
  }