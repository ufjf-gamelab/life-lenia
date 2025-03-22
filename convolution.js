
//convolução
export function convolucao(M) {
    const TL = M.length;
    const TC = M[0].length;
    let U = Array.from({ length: TL }, () => Array(TC).fill(0));

    const deslocamentos = [-1, 0, 1]; 

    for (let dl of deslocamentos) {  //variação das posições em volta da celula
        for (let dc of deslocamentos) {
            if (dl === 0 && dc === 0) continue; // Ignora a item do centro (0,0)

            for (let l = 0; l < TL; l++) {
                for (let c = 0; c < TC; c++) {
                    let nl = getIndice(l + dl, TL);
                    let nc = getIndice(c + dc, TC);
                    U[l][c] += M[nl][nc]; //U (matriz de vizinhos) possui a soma dos vizinhos para todas as celulas, ou seja, soma os valores deslocados
                }
            }
        }
    }

    return U;
}

// Calcula o índice, considerando bordas opostas
export function getIndice(indice, maxTam) {
    if (indice > 0) {
      return (indice % maxTam);
    } else {
      return (-Math.abs(indice % maxTam) + maxTam) % maxTam;
    }
  }