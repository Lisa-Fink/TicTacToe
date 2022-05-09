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
        ['empty', 'empty', 'empty',
        'empty', 'empty', 'empty',
        'empty', 'empty', 'empty',]

    return {arr, reset}
})();

const gamePlay = (() => {
    const _checkWin = () => {
        let winners = [[0,1,2], [3,4,5], [6,7,8], 
                [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]]
        for (wins of winners) {
            if ((gameBoard.arr[wins[0]] === gameBoard.arr[wins[1]] && 
                gameBoard.arr[wins[1]] === gameBoard.arr[wins[2]]) &&
                gameBoard.arr[wins[1]] != 'empty') {
                console.log('end')
                gameBoard.reset()
                }
            }
        }
    
    const _checkEnd = () => {
        if (gameBoard.arr.filter(tile => tile == 'empty') == 0) {
            console.log('end no winner')
            gameBoard.reset()
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
    return {playTile}
})();


const displayController = (() => {
    const _init = (() => {
        for (let i = 0; i < gameBoard.arr.length; i++) {
            let tile = document.getElementById(i+1)
            tile.addEventListener('mousedown', gamePlay.playTile)
        }
    })();

    const changeTile = (index, tile) => {
        gameBoard.arr[index] = turn == 'X' ? 'X' : 'O'
        tile.innerText = turn == 'X' ? 'X' : 'O'   
    }

    const clear = () => {
        for (let i = 0; i < gameBoard.arr.length; i++) {
            let tile = document.getElementById(i+1)
            tile.innerText = ''
        }
    }

    return {changeTile, clear}
})();


const player = (name, letter) => {
    return {name, letter}
};
