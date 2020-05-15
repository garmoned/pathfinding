import React from 'react';

class Controls extends React.Component {

    constructor(props) {
        super(props);

        this.reset = props.reset.bind(this)
        this.solve = props.solve.bind(this)
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
            
            </div>
        );
    }
}

export default Controls;