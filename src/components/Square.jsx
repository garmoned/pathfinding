import React from 'react';

class Square extends React.Component {

    

    constructor(props) {
        super(props);

        this.sendData = props.getSelection.bind(this)

        this.state = {
            value: props.val,
            x: props.x,
            y: props.y
        };
    }

    enumMap = (num) =>{
        switch(num){
            case 0: return "none"
            case 1: return "wall"
            case 2: return "start"
            case 3: return "end"
            case 4: return "path" 
            case 5: return "visited"
            case 6: return "unvisited"
            default : return "none"
        }
    }

    select = () => {
        this.setState({});
        this.sendData(this.state.x,this.state.y)
    }



    render() {
        return (
            <button className={`square square-`+this.enumMap(this.state.value)}
                onClick={this.select}
            >
                {this.state.x}
                {this.state.y}
            </button>
        );
    }
}

export default Square;