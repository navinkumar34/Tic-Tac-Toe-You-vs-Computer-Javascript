const tictactoe = new TicTacToeGame();
tictactoe.start();

function TicTacToeGame(){
    const board = new Board();
    const humanPlayer = new HumanPlayer(board);
    const computerPlayer = new ComputerPlayer(board);
    const winningMessageTextElement = document.querySelector("[data-winning-message-text]");
    const winningMessage = document.querySelector("[winning-message-div]");
    let turn =0;
    
    this.start = function(){
        const config = { childList: true};
        const observer = new MutationObserver(() => takeTurn());
        board.positions.forEach(el => observer.observe(el,config));
        takeTurn(); 
    };
    
    let player = "";
    function takeTurn(){
        if (board.checkForWinner()){
            winningMessageTextElement.innerText = `${player} Wins!`;
            winningMessage.classList.add("show");
            turn = 0;
            player="";
            board.reset();
        }
        else if(board.isdraw()){
            winningMessageTextElement.innerText = `Draw!!`;
            winningMessage.classList.add("show");
            turn = 0;
            player="";
            board.reset();
        }
        else{
            if(turn % 2 === 0){
                player = "You";
                humanPlayer.takeTurn();
            }
            else{
                player = "Computer";
                computerPlayer.takeTurn();    
            }
            turn++;
        }
    };  
}

function restart(){
    const winningMessage = document.querySelector("[winning-message-div]");
    winningMessage.classList.remove("show");
    this.positions = Array.from(document.querySelectorAll(".col"));
    const positions = this.positions;
    positions.forEach(el => el.innerText = "");
}


function Board(){
    this.positions = Array.from(document.querySelectorAll(".col"));
    this.checkForWinner = function(){
        let winner = false;
        const winningCombinations =[
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,4,8],
            [2,4,6],
            [0,3,6],
            [1,4,7],
            [2,5,8]  
        ];
        const positions = this.positions;
        winningCombinations.forEach( winningCombo => {
            const pos0InnerText = positions[winningCombo[0]].innerText;
            const pos1InnerText = positions[winningCombo[1]].innerText;
            const pos2InnerText = positions[winningCombo[2]].innerText;
            const isWinningCombo = pos0InnerText !== '' && 
                  pos0InnerText === pos1InnerText &&
                  pos1InnerText === pos2InnerText;
            if(isWinningCombo){
                winner = true;
                winningCombo.forEach( index =>{
                    positions[index].className += " winner";
                    
                });
            }
        });
        return winner;
    }
    
    this.isdraw = function(){
        const positions = this.positions;
        return positions.every(element => element.innerText==="X" || element.innerText==="O");
    }
    
    this.reset=function(){
        winner = false;
    }
    
}

function HumanPlayer(board){
    this.takeTurn = function(){
        board.positions.forEach(el => el.addEventListener('click', handleTurnTaken));
        
    };
    function handleTurnTaken(event){
        event.target.innerText = 'X';
        board.positions.forEach(el => el.removeEventListener("click", handleTurnTaken));
    }
    
}

function ComputerPlayer(board){
    this.takeTurn = function(){
        let availablePositions = board.positions.filter((p) => p.innerText === '');
        const move = Math.floor(Math.random() * availablePositions.length);
        availablePositions[move].innerText = 'O';
    };
    
}