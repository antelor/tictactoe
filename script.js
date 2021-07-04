const gameBoard = (() => {
    let boardArr = [
        ' ',' ',' ',
        ' ',' ',' ',
        ' ',' ',' ',
    ];

    let turn = 0;

    const getTurn = () => turn;

    const getBoard = () => boardArr;

    const changeCell = (index, value) => {
        boardArr[index] = value;
        displayController.render();
    };

    const clickHandler = (e) =>{
        if( boardArr[e.target.getAttribute("cellIndex")] == ' '){
            if(turn%2 == 0){
                changeCell(e.target.getAttribute("cellIndex"), 'X');
            }
            else{
                changeCell(e.target.getAttribute("cellIndex"), '0');
            }
            turn++;
        }
    }

    const winCheck = () =>{
        let winner = 'tie';

        //tie situation
        for(let i=0; i<9; i++){
            if(boardArr[i]==' ') winner='none';
        }

        // 0 1 2
        // 3 4 5
        // 6 7 8
 
        //horizontal checks
        if( boardArr[0] == boardArr[1] &&
            boardArr[0] == boardArr[2] ){
            if(boardArr[0]!=' ' && boardArr[1]!=' ' && boardArr[2]!=' ') winner = boardArr[0];
        } 
        if( boardArr[3] == boardArr[4] &&
            boardArr[3] == boardArr[5] ){
            if(boardArr[3]!=' ' && boardArr[4]!=' ' && boardArr[5]!=' ') winner = boardArr[3];
        } 
        if( boardArr[6] == boardArr[7] &&
            boardArr[6] == boardArr[8] ){
            if(boardArr[6]!=' ' && boardArr[7]!=' ' && boardArr[8]!=' ') winner = boardArr[6];
        } 
        //vertical checks
        if( boardArr[0] == boardArr[3] &&
            boardArr[0] == boardArr[6] ){
            if(boardArr[0]!=' ' && boardArr[3]!=' ' && boardArr[6]!=' ') winner = boardArr[0];
        } 
        if( boardArr[1] == boardArr[4] &&
            boardArr[1] == boardArr[7] ){
            if(boardArr[1]!=' ' && boardArr[4]!=' ' && boardArr[7]!=' ') winner = boardArr[1];
        } 
        if( boardArr[2] == boardArr[5] &&
            boardArr[2] == boardArr[8] ){
            if(boardArr[2]!=' ' && boardArr[5]!=' ' && boardArr[8]!=' ') winner = boardArr[2];
        } 
        //diagonal checks
        if( boardArr[0] == boardArr[4] &&
            boardArr[0] == boardArr[8] ){
            if(boardArr[0]!=' ' && boardArr[4]!=' ' && boardArr[8]!=' ') winner = boardArr[0];
        } 
        if( boardArr[2] == boardArr[4] &&
            boardArr[2] == boardArr[6] ){
            if(boardArr[2]!=' ' && boardArr[4]!=' ' && boardArr[6]!=' ') winner = boardArr[2];
        } 
        
        if(winner!='none') {
            console.log(winner);
            displayController.stopListeners();
        }
    }

    return {getTurn, getBoard, changeCell, clickHandler, winCheck}
})();

const displayController =  (() => {
    const displayDiv = document.createElement('div');

    const init = () =>{
        displayDiv.classList.add('displayDiv');
        document.querySelector('[class=mainDiv]').appendChild(displayDiv);
        render();
    };

    const render = () =>{
        displayDiv.textContent = '';
        for(let i=0; i<9; i++){
            const displayDivCell = document.createElement('div');
            displayDivCell.classList.add('displayDivCell');
            displayDivCell.textContent = gameBoard.getBoard()[i];
            displayDivCell.setAttribute("cellIndex", i);
            displayDiv.appendChild(displayDivCell);

            displayDivCell.addEventListener('click', gameBoard.clickHandler);
            gameBoard.winCheck();
        }
    };

    const stopListeners = () =>{
        let children = displayDiv.children;
        for (var i = 0; i < children.length; i++) {
            children[i].removeEventListener('click', gameBoard.clickHandler);
        // Do stuff
        }

    }

    return {init, render, stopListeners}
})();

const Players = () =>{

    return {}
}

displayController.init();