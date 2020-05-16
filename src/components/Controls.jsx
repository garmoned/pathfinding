import React from 'react';

class Controls extends React.Component {

    constructor(props) {
        super(props);

        this.reset = props.reset.bind(this)
        this.solve = props.solve.bind(this)
        this.getOption = props.getOption.bind(this)
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

            <select onChange = {this.getOption}>
                <option value = "djistikra">djistikra</option>
                <option value = "star">A*</option>
            </select>
            
            </div>
        );
    }
}

export default Controls;