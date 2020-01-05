class Game {
    constructor() {
        let self = this;
        this.state = {
            board: Array(20).fill(null).map((_, i) => Array(20).fill(null).map((_, j) => (
                new Tile({
                    getTurn: () => {
                        this.updateBoardState(i, j, self.getTurn())
                        
                        return self.getTurn();
                    }
                })
            ))),
            turn: 'o',
        }
        
        this.score_board = new ScoreBoard();
        this.game_board = new GameBoard({
            board: this.state.board,
        });
    }

    getTurn = () => this.state.turn;

    changeTurn = () => {
        if(this.state.turn === 'x') {
            this.state.turn = 'o';
        } else {
            this.state.turn = 'x';
        }

        return this.state.turn;
    }

    check = (row, column) => {
        
    }

    end = () => {
        
    }

    updateBoardState = (row, column, turn) => {
        this.state.board[row][column] = turn;

        if(this.check(row, column, turn)) {
            this.end();
            this.updateScore(turn);
        }

        this.changeTurn();
    }

    updateScore = turn => this.score_board.updateScore(turn);
}

class ScoreBoard {
    constructor() {
        this.x_score = 0;
        this.o_score = 0;
        this.component = document.getElementById('scoreboard');
        this.x_score_component = document.getElementById('x-score');
        this.o_score_component = document.getElementById('o-score');

        this.render();
    }

    updateScore(turn) {
        if(turn === 'x') {
            this.x_score++;
        }

        if(turn === 'o') {
            this.o_score++;
        }

        this.render();
    }

    render() {
        this.x_score_component.textContent = this.x_score;
        this.o_score_component.textContent = this.o_score;
    }
}

class GameBoard {
    constructor({board}) {
        this.board = board;
        this.component = document.getElementById('gameboard');

        this.render();
    }

    render() {
        this.board.forEach((row, i) => {
            row.forEach((tile, j) => {
                this.component.children[0].appendChild(
                    this.board[i][j].render()
                );
            });
        })
    }
}

class Tile {
    constructor({getTurn}) {
        this.getTurn = getTurn;
        this.component = document.createElement('div');
        this.component.classList.add('tile');
        this.component.addEventListener('click', this.choose);
    }

    choose = (turn) => {
        this.component.classList.add(this.getTurn());
    }

    render() {
        return this.component;
    }
}