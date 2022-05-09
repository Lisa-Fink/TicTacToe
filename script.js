let turn = 'X';

const players = () => {
    one: '';
    two: '';
};

const gameBoard = (() => {
    const reset = () => {
        for (let i = 0; i < arr.length; i++) {
            arr[i] = 'empty';
        };
        displayController.clear();
    };
    let arr = 
        ['empty', 'empty', 'empty',
        'empty', 'empty', 'empty',
        'empty', 'empty', 'empty',];
    return {arr, reset};
})();

const gamePlay = (() => {
    let _playerTwo = 'human';
    let _end = false;
    
    const startGame = (e) => {
        e.preventDefault();
        if (e.target.form[1].value == '' | 
            e.target.form[2].value == '') {
            displayController.menu.showReq();
        } else {
            displayController.menu.toggle();
            players.one = (e.target.form[1].value);
            players.two = (e.target.form[2].value);
        };
    };

    const newGame = () => {
        _end = false
        displayController.clear();
        gameBoard.reset();
        displayController.menu.toggle();
    };

    const _checkWin = () => {
        let winners = [[0,1,2], [3,4,5], [6,7,8], 
                [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
        for (wins of winners) {
            if ((gameBoard.arr[wins[0]] === gameBoard.arr[wins[1]] && 
                gameBoard.arr[wins[1]] === gameBoard.arr[wins[2]]) &&
                gameBoard.arr[wins[1]] != 'empty') {
                displayController.menu.showWinner(gameBoard.arr[wins[1]]);
                _end = true;
                }
            }
        _end == false ? _checkTie(): null
        };
    
    const _checkTie = () => {
        if (gameBoard.arr.filter(tile => tile == 'empty') == 0) {
            displayController.menu.showWinner('tie');
            _end = true;
        };
    };

    const _changeTurn = () => {
        turn = turn == 'X' ? 'O' : 'X';
    };

    const playTile = (e) => {
        let tile = document.getElementById(e.target.id);
        if (tile.innerText == '') {
            displayController.changeTile(Number(e.target.id) - 1, tile);
            _endTurn();
        };
    };

    const _endTurn = () => {
        _checkWin();
        _changeTurn();

        if (turn == 'O' && _playerTwo == 'AI' && _end == false) {
            _ai_playTile();
            _endTurn();
        };
    };

    const _ai_playTile = () => {
        let aiTileIndex = _ai_choice()
        let aiTile = document.getElementById(aiTileIndex + 1)
        displayController.changeTile(aiTileIndex, aiTile)
    }

    const _ai_choice = () => {
        const availableTiles = []
        for (let i = 0; i < gameBoard.arr.length; i++) {
            if (gameBoard.arr[i] == 'empty') {
                availableTiles.push(i)
            }
        }
        let index = availableTiles[Math.floor(Math.random() * (availableTiles.length - 1))]
        return index
        
    }

    const togglePlayer = (e) => {
        e.preventDefault();
        _playerTwo == 'human' ? _playerTwo = 'AI' : _playerTwo = 'human';
        displayController.menu.togglePlayer(_playerTwo);
    }
    return {playTile, startGame, newGame, togglePlayer};
})();


const displayController = (() => {
    const _init = (() => {
        for (let i = 0; i < gameBoard.arr.length; i++) {
            let tile = document.getElementById(i+1);
            tile.addEventListener('mousedown', gamePlay.playTile);
        };
        document.getElementById('start-button').addEventListener('click', gamePlay.startGame);
        document.getElementById('new-button').addEventListener('click', gamePlay.newGame);
        document.getElementById('vs-button').addEventListener('click', gamePlay.togglePlayer);
    })();

    const changeTile = (index, tile) => {
        gameBoard.arr[index] = turn == 'X' ? 'X' : 'O';
        tile.innerText = turn == 'X' ? 'X' : 'O';
    };

    const clear = () => {
        for (let i = 0; i < gameBoard.arr.length; i++) {
            let tile = document.getElementById(i+1);
            tile.innerText = '';
        };
        document.getElementById('winner-name').innerText = '';
        document.getElementById('winner-type').innerText = 'Congratulations!'
        turn = 'X';
    };

    const menu = (() => {
        const showReq = () => document.getElementById('req').style.display = 'block';
        const toggle = () => {
            let startMenu = document.getElementById('start-menu');
            startMenu.style.display == 'block' | startMenu.style.display == '' ? 
                startMenu.style.display = 'none' :
                (startMenu.style.display = 'block', 
                    document.getElementById('winner-menu').style.display = 'none') 
        };
        const showWinner = (winner) => {
            document.getElementById('winner-menu').style.display = 'block';
            let winnerName = document.getElementById('winner-name');
            let winnerType = document.getElementById('winner-type');
            winner == 'tie' ? winnerType.innerText = 'It\'s a Tie' :
                winnerName.innerText = winner == 'X' ? players.one : players.two;
        }

        const togglePlayer = (type) => {
                let inputTwo = document.getElementById('input-two');
                let button = document.getElementById('vs-button');
                if (type == 'AI') {
                inputTwo.value = "Super Computer";
                inputTwo.disabled = true;
                button.innerText = 'Play Against Human'
                } else {
                    inputTwo.value = '';
                    inputTwo.disabled = false;
                    button.innerText = 'Play Against AI'
                }
        }
        return {showReq, toggle, showWinner, togglePlayer};
    })();

    return {changeTile, clear, menu};
})();



