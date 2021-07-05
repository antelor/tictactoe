const gameBoard = (() => {
    let boardArr = [
        ' ',' ',' ',
        ' ',' ',' ',
        ' ',' ',' ',
    ];

    let turn = 0;

    const getTurn = () => turn;

    const moveTurn = () => turn++;

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
            moveTurn();
        }

        if(!winCheck()){
            Computer.move();
            winCheck();
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
            win(winner);
            return true;
        }
        return false;
    }

    const reset = () =>{
        boardArr = [
            ' ',' ',' ',
            ' ',' ',' ',
            ' ',' ',' ',
        ];
        document.querySelector('[class=winnerDiv]').parentElement.removeChild(document.querySelector('[class=winnerDiv]'));
        document.querySelector('[class=resetBtn]').parentElement.removeChild(document.querySelector('[class=resetBtn]'));

        turn = 0;
        displayController.render();
    }

    const win = (winner) =>{
        console.log(winner);
        displayController.stopListeners();
        const winnerDiv = document.createElement('div');
        winnerDiv.classList.add('winnerDiv');
        if(winner=='X') winnerDiv.textContent = "Ganaste";
        if(winner=='0') winnerDiv.textContent = "Gana la computadora";
        if(winner=='tie') winnerDiv.textContent = "Empate";
        document.querySelector('body').appendChild(winnerDiv);

        const resetBtn = document.createElement('button');
        resetBtn.classList.add('resetBtn');
        resetBtn.textContent = "Reiniciar";
        document.querySelector('body').appendChild(resetBtn);
        resetBtn.addEventListener('click', reset);
    }

    return {getTurn, getBoard, changeCell, clickHandler, winCheck, moveTurn}
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

const Computer = (() =>{
    const move = () =>{
        let choice = -1;
        while(choice == -1){
            let possibleMove = Math.floor(Math.random() * 8);
            if(gameBoard.getBoard()[possibleMove] == ' ' && gameBoard.getBoard()[possibleMove] != 'X'){
                choice = possibleMove;
            }
        }
 
        gameBoard.changeCell(choice, '0');
        gameBoard.moveTurn();
    }

    return {move}
})();

displayController.init();