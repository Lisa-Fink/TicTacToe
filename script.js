// module
let turn = 'X'

const gameBoard = (() => {
    const arr = 
        ['X', 'empty', 'empty',
        'empty', 'empty', 'empty',
        'empty', 'empty', 'empty',]

    const renderDisplay = () => {
        for (let i = 0; i < gameBoard.arr.length; i++) {
            let tile = document.getElementById(i+1)
            gameBoard.arr[i] == 'empty'? tile.innerText = '':
            gameBoard.arr[i] == 'X'? tile.innerText = 'X': tile.innerText = 'O'
            tile.addEventListener('mousedown', displayController.playTile)
        }

    }
    return {arr, renderDisplay}
})();

const displayController = (() => {
    const playTile = (e) => {
        console.log(e.target.id)
        let tile = document.getElementById(e.target.id)
        if (tile.innerText != 'X' | tile.innerText != 'O') {
            gameBoard.arr[Number(e.target.id) -1] = turn == 'X' ? 'X' : 'O'
            tile.innerText = turn == 'X' ? 'X' : 'O'
            turn = turn == 'X' ? 'O' : 'X'
        }
        
    }
    return {playTile}
})();


const player = (name, letter) => {
    return {name, letter}
};

gameBoard.renderDisplay()