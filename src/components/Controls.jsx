import React from 'react';

class Controls extends React.Component {

    constructor(props) {
        super(props);

        this.reset = props.reset.bind(this)
        this.solve = props.solve.bind(this)
  
        this.generateMaze = props.generateMaze.bind(this)
        this.getHval = props.getHval.bind(this)
    }
    
    handleClick = async () =>{
        await this.reset()
        
    }
    
    startSolving = async () =>{
        await this.solve();
    }

    

    render() {
        return (
            <div className="resetbutton">
                <button 
                    onClick={this.handleClick}
                >
                    RESET
            </button>
            <button 
                    onClick={this.startSolving}
                >
                    START
            </button>

            <button 
                    onClick={this.generateMaze}
                >
                    GenerateMaze
            </button>
            
            <label for = "hvalue">
                Heuristic
            </label>
            <input id = "hvalue" style={{width:100}} onChange = {this.getHval} type = "number">
            </input>
            
            </div>
        );
    }
}

export default Controls;