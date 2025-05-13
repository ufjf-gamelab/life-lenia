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

function growth(U) {  //chamei U para analizar os vizinhos e aplicar as regras 
  const TL = U.length;
  const TC = U[0].length;
  let G = Array.from({ length: TL }, () => Array(TC).fill(0));

  for (let i = 0; i < TL; i++) {
    for (let j = 0; j < TC; j++) {
      if (U[i][j] === 3) {  //Se tem 3 vizinhos, nasce
        G[i][j] = 1;
      } else if (U[i][j] < 2 || U[i][j] > 3) {   //Se tem pouco ou muito, morre
        G[i][j] = -1;
      } else {   //se tem 2 vizinhos mantém o estado atual
        G[i][j] = 0;
      }
    }
  }
  return G;  //retorno matriz que aplica as regras do game
}

export function atualizaMatriz(D, O) {  //atualizar células mortas e vivas
  const TL = O.length;
  const TC = O[0].length;
  
  // Define o kernel para calcular os vizinhos
  const kernel = [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
  ];

  // Passa o kernel para a função convolução
  const U = convolucao(O, kernel);
  const G = growth(U);

  for (let i = 0; i < TL; i++) {
    for (let j = 0; j < TC; j++) {
      D[i][j] = Math.min(1, Math.max(0, O[i][j] + G[i][j]));  //soma e garante que se for >1 vira um e se for <0 vira zero 
    }
  }
}