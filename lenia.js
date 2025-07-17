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

export function growth(U) {
  let G = Array.from({ length: U.length }, () => Array(U[0].length).fill(0));
  const m = 0.135;   //ponto max crescimento
  const s = 0.015;   //largura da curva

  for (let i = 0; i < U.length; i++) {
    for (let j = 0; j < U[0].length; j++) {
      //  if (m <= U[i][j] && U[i][j] <= s) {  //intervalo do tutorial
      //   G[i][j] = 1;   // cresce
      // } else {
      //   G[i][j] = -1;   // morre
      // }
      G[i][j] = bell(U[i][j], m, s) * 2 - 1;
      
    }
  }
  return G;
}

export function atualizaMatriz(D, O, options) {
  const TL = O.length;
  const TC = O[0].length;

  const U = convolucao(O, options.kernel); 

  const G = growth(U);

  for (let i = 0; i < TL; i++) {
    for (let j = 0; j < TC; j++) {
      // A = np.clip(A + 1/T * growth(U), 0, 1)
      D[i][j] = Math.min(Math.max(O[i][j] + (1 / options.T) * G[i][j], 0), 1);
    }
  }
}

// export const patterns = {
//     pacman: {
//         name: "Pacman",
//         R: 13,
//         T: 2,
//         cells: [
//              { dx: -2, dy: 0, value: 0.5 },
//             { dx: -1, dy: 0, value: 0.7 },
//             { dx:  0, dy: 0, value: 0.9 },
//             { dx:  1, dy: 0, value: 0.7 },
//             { dx:  2, dy: 0, value: 0.5 },
//             { dx:  0, dy: -1, value: 0.7 },
//             { dx:  0, dy: 1,  value: 0.7 },
//             { dx: -1, dy: -1, value: 0.6 },
//             { dx: 1, dy: -1,  value: 0.6 },
//             { dx: -1, dy: 1,  value: 0.6 },
//             { dx: 1, dy: 1,   value: 0.6 },
//         ]
//     }
// };

// function loadPattern(pattern) {
//     const p = pattern.cells;
//     const pw = p[0].length;
//     const ph = p.length;

//     const offsetX = Math.floor((width - pw) / 2);
//     const offsetY = Math.floor((height - ph) / 2);

//     for (let y = 0; y < ph; y++) {
//         for (let x = 0; x < pw; x++) {
//             // Normaliza valores baixos para visíveis
//             let value = p[y][x];
//             // valores do pattern vão de ~0.01 até ~1.0, podemos amplificar levemente os muito baixos
//             if (value < 0.02) value = 0;
//             grid[y + offsetY][x + offsetX] = value;
//         }
//     }
// }

export function getIndice(indice, maxTam) {
  return (indice + maxTam) % maxTam;
}

