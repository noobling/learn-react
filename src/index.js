import React from 'react';
import ReactDOM from 'react-dom'
import './index.css'


function Square(props) {
    return (
    <button 
        className="square" 
        onClick={() => props.onClick()}
    >
        {props.value}
    </button>
    );
}
  
class Board extends React.Component {
    renderSquare(i) {
      return (
        <Square 
            value={this.props.squares[i]}
            onClick={() => this.props.onClick(i)}
        />
      );
    }

    renderRow(num) {
        return (
            <div className="board-row" key={num}>
                {this.renderSquare(num)}
                {this.renderSquare(num+1)}
                {this.renderSquare(num+2)}
            </div>
        )
    }
  
    render() {
        const rowNums = [0, 3, 6]
        let rows = rowNums.map(num => this.renderRow(num))
      return (
        <div>
          {rows}
        </div>
      );
    }
}
  
class Game extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            history: [{
                squares: Array(9).fill(null)
            }],
            xIsNext: true,
            stepNumber: 0,
        }
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        })
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice(); // Create a new copy so we dont alter the original

        if (calculateWinner(squares) || squares[i]) // Don't set square if it already has something or winner has been found
            return;

        squares[i] = this.state.xIsNext ? 'X': 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
                move: i
            }]),
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X': 'O');
        }

        const moves = history.map((step, move) => {
            const desc = move ?
                'Go to move #' + move + ' at ' + mapNumToCoord(step.move):
                'Go to game start';
            return (
                <li key={move}>
                    <button onClick={
                        () => {
                            this.jumpTo(move)
                        }
                    }>
                        {desc}
                    </button>
                </li>
            )
        })

      return (
        <div className="game">
          <div className="game-board">
            <Board 
                squares={current.squares}
                onClick={(i) => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
}
  
  // ========================================
  
ReactDOM.render(
    <Game />,
    document.getElementById('root')
);

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }

    return null;
}

function mapNumToCoord(num) {
    const coords = ['(0,0)', '(0,1)', '(0,2)', '(1,0)', '(1,1)', '(1,2)', '(2,0)', '(2,1)', '(2,2)']
    return coords[num]
}