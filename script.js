
const gameboardFactory = (() => {
    let board = [null, null, null, null, null, null, null, null, null]; // 8 array positions
    const resetBoard = () => board = [null, null, null, null, null, null, null, null, null];
    const getBoard = () => board;
    const updateBoard = (index, mark) => {
        board[index] = mark;
    }
    return { getBoard, updateBoard, resetBoard }
})();

const playerFactory = (name, mark) => {
    const getName = () => name;
    const getMark = () => mark;
    return { getName, getMark }
}

const gameFactory = (name, playerMark, name2, playerMark2) => {
    const player1 = playerFactory(name, playerMark);
    const player2 = playerFactory(name2, playerMark2);
    const { updateBoard, getBoard, resetBoard } = gameboardFactory

    const action = (position, mark) => {
        if ((position >= 0 || position <= 8) && getBoard()[position] === null) {
            updateBoard(position, mark);
        } else {
            return false
        }
    }

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

    const tie = () => {
        return getBoard().every((e) => e != null);
    }

    let player1Turn = true;

    const move = (e) => {
        let position = +e.target.id

        if (e.target.textContent !== "") return

        if (player1Turn) {
            action(position, player1.getMark());
            e.target.textContent = `${player1.getMark()}`
            e.target.style.color = '#eeba5a';
            e.target.style.fontSize = '5rem';
        } else {
            action(position, player2.getMark());
            e.target.textContent = `${player2.getMark()}`
            e.target.style.color = '#59884f';
            e.target.style.fontSize = '5rem';
        }

        let wonTiles;

        const printWonTiles = (playerMark, styles) => {
            wonTiles = winConditions.find(
                (condition) => condition.every(
                    (index) => getBoard()[index] === playerMark
                )
            )
            document.querySelectorAll('.board_tile').forEach(e => {
                if (e.id.includes(wonTiles[0]) || e.id.includes(wonTiles[1]) || e.id.includes(wonTiles[2])) {
                    e.classList.add(styles);
                }
            })
        }

        if (win(player1.getMark())) {
            printWonTiles(player1.getMark(), 'win1');
            document.querySelectorAll('.board').forEach(e => e.removeEventListener("click", move));
            setTimeout(() => {
                document.querySelector('#win').classList.remove('hide');
            }, 300);
            const name = player1.getName().toUpperCase();
            document.querySelector('#winner').textContent = `${name} WINS!`
        } else if (win(player2.getMark())) {
            printWonTiles(player2.getMark(), 'win2');
            document.querySelectorAll('.board').forEach(e => e.removeEventListener("click", move));
            setTimeout(() => {
                document.querySelector('#win').classList.remove('hide');
            }, 300); const name = player2.getName().toUpperCase();
            document.querySelector('#winner').textContent = `${name} WINS!`
        } else if (tie()) {
            setTimeout(() => {
                document.querySelector('#win').classList.remove('hide');
            }, 300); document.querySelector('#winner').textContent = `IT'S A TIE!`
        } else {
            player1Turn = !player1Turn;
        }
    }

    const restartGame = () => {
        player1Turn = true;
        document.querySelectorAll('.board_tile').forEach(el => {
            el.textContent = ''
            el.classList.remove('win1');
            el.classList.remove('win2');
        });
        resetBoard();
        document.querySelector('#win').classList.add('hide');
        document.querySelectorAll('.board').forEach(e => e.addEventListener("click", move));
    };

    document.querySelectorAll('.board').forEach(e => e.addEventListener("click", move));

    return { restartGame }
}

const display = (() => {
    const gameplay = () => {
        const xButton = document.querySelector('#x');
        const oButton = document.querySelector('#o');
        const selectedX = document.querySelector('#selected_x');
        const selectedO = document.querySelector('#selected_o');
        
        xButton.addEventListener('click', () => {
            if (!xButton.classList.contains('selected')) {
                xButton.classList.add('selected');
                oButton.classList.remove('selected');
                selectedX.classList.remove('hide');
                selectedO.classList.add('hide');
            }
        });
        
        oButton.addEventListener('click', () => {
            if (!oButton.classList.contains('selected')) {
                oButton.classList.add('selected');
                xButton.classList.remove('selected');
                selectedO.classList.remove('hide');
                selectedX.classList.add('hide');
            }
        });
        const next = document.querySelector('#next');
        const playerName = document.querySelector('#name');
        const player = document.querySelector('#player');
        const container = document.querySelector('.container');


        let gameInstance;
        let player1Mark;
        let player1Name;
        let player2Mark;
        let player2Name;

        const one = () => {
            selectedX.classList.add('hide')
            selectedO.classList.add('hide')
            if (!x.classList.contains('selected') && !o.classList.contains('selected') || playerName.value === '') {
                document.querySelector('#complete').classList.add('complete');
                setTimeout(() => {
                    document.querySelector('#complete').classList.remove('complete');
                }, 2500);
                return
            }
            if (x.classList.contains('selected')) {
                player1Mark = 'X';
                player2Mark = 'O';
                x.classList.add('hide');
                o.classList.add('selected2');
                o.setAttribute('style', 'pointer-events: none;');
            } else {
                player1Mark = 'O';
                player2Mark = 'X';
                o.classList.add('hide');
                x.classList.add('selected2');
                x.setAttribute('style', 'pointer-events: none;');
            }
            player1Name = playerName.value
            container.style.backgroundColor = 'yellow';
            container.setAttribute('style', 'color: #31344e; background-color: #e75050; box-shadow: 0px 10px 0px 0px #b63333;');
            next.setAttribute('style', 'color: #d8d8d8; background-color: #455381; box-shadow: 0px 10px 0px 0px #373d74;');
            playerName.style.backgroundColor = 'darkred';
            playerName.value = ''

            next.textContent = "START GAME"
            player.textContent = "PLAYER 2"
            next.classList.add('start');
            next.addEventListener('click', one);
            next.removeEventListener('click', one);
            next.addEventListener('click', two);
        }
        const two = () => {
            if (playerName.value === ''){
                document.querySelector('#complete').classList.add('complete');
                setTimeout(() => {
                    document.querySelector('#complete').classList.remove('complete');
                }, 2500);
                return
            }
            document.querySelector('#complete').classList.add('hide');
            player2Name = playerName.value
            gameInstance = gameFactory(player1Name, player1Mark, player2Name, player2Mark);
            document.querySelector('.names').style.display = 'none';
        }
        next.addEventListener('click', one);
        document.querySelector('#replay').addEventListener('click', e => {

            const winElement = document.querySelector('#win');
            winElement.classList.add('animation');

            setTimeout(() => {
                gameInstance.restartGame();
                winElement.classList.remove('animation');
                winElement.style.opacity = '';
                winElement.style.height = '';
            }, 1400);
        });
    }
    return { gameplay }
})();

display.gameplay();
