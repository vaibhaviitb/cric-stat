export const tabulizeCompare=(headers, players)=>{
    const [player1, player2]=players;
    return headers.map((header, index)=>{
        header=header.label;
        return [player1[index], header, player2[index]];
    });
}