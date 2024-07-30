// const gameboard = {gameboard:[]}

const gameboardFactory = (() => {
    const board = [null, null, null, null, null, null, null, null, null]; // 9 array positions
    const getBoard = () => board;
    const updateBoard = (index, mark) => {
        board[index] = mark;
    }
    return { getBoard, updateBoard }
})();

const playerFactory = (name, mark) => {
    const getName = () => name;
    const getMark = () => mark;
    return { getName, getMark }
}

const gameFactory = (name, playerMark, name2, playerMark2) => {
    const player1 = playerFactory(name, playerMark);
    const player2 = playerFactory(name2, playerMark2);
    const { updateBoard, getBoard } = gameboardFactory

    const action = (position, mark) => {
        if ((position >= 0 || position <= 8) && board[position] === null) {
            updateBoard(position, mark);
        } else {
            return false
        }
    }

    const movePlayer1 = (position) => action(position, player1.getMark());

    const movePlayer2 = (position) => action(position, player2.getMark());

    const winConditions = [
        // Horizontal rows
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],

        // Vertical columns
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],

        // Diagonals
        [0, 4, 8],
        [6, 4, 2]
    ];

    const win = (mark) => {
        if (winConditions.find(
            (condition) => condition.every(
                (index) => getBoard()[index] === mark
            )
        )) {
            return true
        } else return false
    }


    const roundPlay = () => {
        function tie(){
            return getBoard().every((e)=> e != null);
        }

        // Player 1
        while (true) {
            let position1 = prompt(`${player1.getName()} Select a position from 0 to 8`);
            while (movePlayer1(position1) === false) {
                alert("Not a valid position, try again.");
                position1 = prompt(`${player1.getName()} Select a position from 0 to 8`);
            }
            alert(getBoard());
            if (win(player1.getMark())) {
                alert(`${player1.getName()} Wins!`)
                break
            }
            if(tie()){
                alert("It's a tie!");
                break
            }

            // Player 2
            let position2 = prompt(`${player2.getName()} Select a position from 0 to 8`);
            while (movePlayer2(position2) === false) {
                alert("Not a valid position, try again.");
                position2 = prompt(`${player2.getName()} Select a position from 0 to 8`);
            }
            alert(getBoard());
            if (win(player2.getMark())) {
                alert(`${player2.getName()} Wins!`)
                break
            }
            if(tie()){
                alert("It's a tie!");
                break
            }
            console.log(getBoard())
        }
    }


    return { roundPlay }
}

const players = () => {
    const player1test = prompt("Select your name - Player 1");
    let player1mark = prompt("Select your mark - X or O");
    while (player1mark != "X" && player1mark != "O" && player1mark != "o" && player1mark != "x") {
        alert("Please just select either X or O");
        player1mark = prompt("Select your mark - X or O");
    }
    const player2test = prompt("Select your name - Player 2");


    if (player1mark === "X" || player1mark === "x") return gameFactory(player1test, "X", player2test, "O");
    if (player1mark === "O" || player1mark === "o") return gameFactory(player1test, "O", player2test, "X");
}


players().roundPlay()

