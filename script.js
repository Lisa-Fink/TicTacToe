let turn = 'X'

const gameBoard = (() => {
    const reset = () => {
        for (let i = 0; i < arr.length; i++) {
            arr[i] = 'empty'
        }
        console.log(arr)
        displayController.clear()
    }
    let arr = 
        ['X', 'O', 'empty',
        'empty', 'empty', 'empty',
        'empty', 'empty', 'empty',]


    return {arr, reset}
})();

const gamePlay = (() => {
    const startGame = (e) => {
        e.preventDefault()
        if (e.target.form[0].value == '' | 
            e.target.form[1].value == '') {
            displayController.menu.showReq()
        } else {
            displayController.menu.toggle()
            players.one = (e.target.form[0].value)
            players.two = (e.target.form[1].value)
        }
        
    }

    const newGame = () => {
        displayController.clear()
        gameBoard.reset()
        displayController.menu.toggle()
    }

    const _checkWin = () => {
        let winners = [[0,1,2], [3,4,5], [6,7,8], 
                [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]]
        for (wins of winners) {
            if ((gameBoard.arr[wins[0]] === gameBoard.arr[wins[1]] && 
                gameBoard.arr[wins[1]] === gameBoard.arr[wins[2]]) &&
                gameBoard.arr[wins[1]] != 'empty') {
                displayController.menu.showWinner(gameBoard.arr[wins[1]])
                }
            }
        }
    
    const _checkEnd = () => {
        if (gameBoard.arr.filter(tile => tile == 'empty') == 0) {
            console.log('end no winner')
            displayController.menu.showWinner('tie')
        }
    }

    const _changeTurn = () => {
        turn = turn == 'X' ? 'O' : 'X'
    } 

    const playTile = (e) => {
        let tile = document.getElementById(e.target.id)
        if (tile.innerText != 'X' && tile.innerText != 'O') {
            displayController.changeTile(Number(e.target.id) - 1, tile)
            _checkWin()
            _checkEnd()
            _changeTurn()
        }
    }
    return {playTile, startGame, newGame}
})();


const displayController = (() => {
    const _init = (() => {
        for (let i = 0; i < gameBoard.arr.length; i++) {
            let tile = document.getElementById(i+1)
            tile.addEventListener('mousedown', gamePlay.playTile)
           
        }
        document.getElementById('start-button').addEventListener('click', gamePlay.startGame)
        document.getElementById('new-button').addEventListener('click', gamePlay.newGame)
    })();

    const changeTile = (index, tile) => {
        gameBoard.arr[index] = turn == 'X' ? 'X' : 'O'
        tile.innerText = turn == 'X' ? 'X' : 'O'   
    }

    const clear = () => {
        for (let i = 0; i < gameBoard.arr.length; i++) {
            let tile = document.getElementById(i+1)
            tile.innerText = ''
        };
        document.getElementById('winner-name').innerText = ''
        turn = 'X'
    };

    const menu = (() => {
        const showReq = () => document.getElementById('req').style.display = 'block'
        const toggle = () => {
            let startMenu = document.getElementById('start-menu')
            !startMenu.style.display | startMenu.style.display == 'none'? 
                (startMenu.style.display = 'block', 
                    document.getElementById('winner-menu').style.display = 'none') : 
                startMenu.style.display ='none'
        };
        const showWinner = (winner) => {
            document.getElementById('winner-menu').style.display = 'block'
            let winnerName = document.getElementById('winner-name')
            let winnerType = document.getElementById('winner-type')
            winner == 'tie' ? winnerType.innerText = 'It\'s a Tie' :
                winnerName.innerText = winner == 'X' ? players.one : players.two
        }
        return {showReq, toggle, showWinner};
    })();

    return {changeTile, clear, menu};
})();

const players = () => {
    one: ''
    two: ''
};

