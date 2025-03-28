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

// Calcula o índice, considerando bordas opostas
export function getIndice(indice, maxTam) {
  if (indice > 0) {
    return indice % maxTam;
  } else {
    return (-Math.abs(indice % maxTam) + maxTam) % maxTam;
  }
}
