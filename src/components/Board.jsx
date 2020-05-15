import Square from './Square'
import React from 'react'
import Controls from './Controls'
import Solver from '../objects/solver'

class Board extends React.Component {



    constructor(props) {
        super(props)

        this.state = {
            bState: this.initBoardState()
        }

        this.solver = null;
    }

    initBoardState = () => {
        var board = []
        for (let i = 0; i < 30; i++) {
            let row = []
            for (let x = 0; x < 30; x++) {
                row.push(0)
            }
            board.push(row)
        }
        return board
    }

    

    renderSquare(val, x, y, key) {
        return <Square 
            key={key}
            val={val}
            x={x}
            y={y}
            getSelection={this.incrementSquare}
            solve = {this.startSolving}
        />;
    }

    incrementSquare = async (x, y) => {
        var newBoardState = this.state.bState
        newBoardState[x][y] = (newBoardState[x][y] + 1) % 4  

        await this.setState({ bState: newBoardState })
    }

    resetBoard = async () => {
        clearInterval(this.solving)
        this.solver = null
        await this.setState({ bState: this.initBoardState() })
    }

    displayBoard() {
        return (this.state.bState.map((row, x) => {
            return (
                <div key={x} className="board-row">
                    {row.map((val, y) => {
                        return this.renderSquare(val, x, y, x.toString() + y.toString() + val.toString())
                    })}
                </div>)
        }))
    }

    startSolving = async ()=> {

        this.solver = new Solver(this.state.bState)
        

            this.solving = setInterval(async() => {
                if(this.solver.state === this.solver.states.working){
                    await this.setState({bState:this.solver.getNextBoardState()})    
                }

                if(this.solver.state === this.solver.states.drawLine){
                    await this.setState({bState:this.solver.drawLine()})
                }

                if(this.solver.state === this.solver.states.done){
                    clearInterval(this.solving)
                }
            }, 10);
   


    }


    render() {
        return (
            <div>
                <div>
                    <Controls
                        reset={this.resetBoard}
                        solve={this.startSolving}
                    /></div>
                <div className="board">

                    {this.displayBoard()}
                </div>
            </div>
        );
    }


}

export default Board;
