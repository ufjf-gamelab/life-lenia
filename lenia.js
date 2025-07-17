function bell(x, m, s) {
  return Math.exp(-Math.pow((x - m) / s, 2) / 2);
}

//convolução
export function convolucao(M, kernel) {
  const TL = M.length;
  const TC = M[0].length;
  const kSize = kernel.length; // Tamanho do kernel (assumindo kernel quadrado)
  const kOffset = Math.floor(kSize / 2); // Offset para centralizar o kernel
  let U = Array.from({ length: TL }, () => Array(TC).fill(0));

  for (let l = 0; l < TL; l++) {
    for (let c = 0; c < TC; c++) {
      for (let kl = 0; kl < kSize; kl++) {
        for (let kc = 0; kc < kSize; kc++) {
          const dl = kl - kOffset; // Deslocamento em relação ao centro do kernel
          const dc = kc - kOffset;
          const nl = getIndice(l + dl, TL);
          const nc = getIndice(c + dc, TC);
          U[l][c] += M[nl][nc] * kernel[kl][kc]; // Aplica o peso do kernel
        }
      }
    }
  }

  return U;
}

export function growth(U, m, s) {
  let G = Array.from({ length: U.length }, () => Array(U[0].length).fill(0));

  for (let i = 0; i < U.length; i++) {
    for (let j = 0; j < U[0].length; j++) {
      G[i][j] = bell(U[i][j], m, s) * 2 - 1;
      
    }
  }
  return G;
}

export function atualizaMatriz(D, O, options) {
  const TL = O.length;
  const TC = O[0].length;

  const U = convolucao(O, options.kernel); 

  const G = growth(U, options.m, options.s);

  for (let i = 0; i < TL; i++) {
    for (let j = 0; j < TC; j++) {
      D[i][j] = Math.min(Math.max(O[i][j] + (1 / options.T) * G[i][j], 0), 1);
    }
  }
}


export const patterns = {
    orbium: {
        name: "Orbium",
        R: 13,
        T: 10,
        m: 0.15,
        s: 0.015,
        cells: [
            [0, 0.5, 0],
            [0.5, 1, 0.5],
            [0, 0.5, 0],
        ]
    }
};

export function loadPattern(A, pattern, cx, cy, scale = 1) {
    const original = pattern.cells;
    const sizeY = original.length;
    const sizeX = original[0].length;

    for (let y = 0; y < sizeY; y++) {
        for (let x = 0; x < sizeX; x++) {
            const val = original[y][x];
            for (let dy = 0; dy < scale; dy++) {
                for (let dx = 0; dx < scale; dx++) {
                    const yy = cx + y * scale + dy;
                    const xx = cy + x * scale + dx;
                    if (yy >= 0 && yy < A.length && xx >= 0 && xx < A[0].length) {
                        A[yy][xx] = val;
                    }
                }
            }
        }
    }
}

export function getIndice(indice, maxTam) {
  return (indice + maxTam) % maxTam;
}

