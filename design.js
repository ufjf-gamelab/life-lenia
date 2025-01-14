
export function desenhaMatriz(M, ctx, TAM) {
    const TL = M.length;
    const TC = M[0].length;
    for (let l = 0; l < TL; l++) {
      for (let c = 0; c < TC; c++) {
        if (M[l][c] === 1) {
          desenhaQuadrado(l, c, ctx, TAM);
        }
        if (M[l][c] === 2) {
          desenhaQuadradoAzul(l, c, ctx, TAM); // Azul
        }
      }
    }
  }

  export function desenhaQuadrado(linha, coluna, ctx, TAM) {
    ctx.fillStyle = "red";
    ctx.fillRect(linha * TAM, coluna * TAM, TAM, TAM);
  }
  
  export function desenhaQuadradoAzul(linha, coluna, ctx, TAM) {
    ctx.fillStyle = "blue";
    ctx.fillRect(linha * TAM, coluna * TAM, TAM, TAM);
  }

  export function limpaTela(ctx, canvas) {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }