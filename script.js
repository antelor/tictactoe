const gameBoard = (() => {
    let boardArr = [
        'x',' ','o',
        'x','o',' ',
        'x','x','o',
    ];
    return {boardArr}
})();

const displayController =  (() => {
    
    return {}
})();

const Players = () =>{

    return {}
}

render = () =>{
    const displayDiv = document.createElement('div');
    displayDiv.classList.add('displayDiv');
    for(let i=0; i<9; i++){
        const displayDivCell = document.createElement('div');
        displayDivCell.classList.add('displayDivCell');
        displayDivCell.textContent = gameBoard.boardArr[i];
        displayDiv.appendChild(displayDivCell);
    
    }
    document.querySelector('[class=mainDiv]').appendChild(displayDiv);
}


render()