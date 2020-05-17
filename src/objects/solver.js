
const djEnums = Object.freeze({ "wall": -2, "unvisited": -1, "end": 0 })


class Node {
    constructor(distance, visited, x, y) {
        this.distance = distance
        this.visited = visited
        this.x = x
        this.y = y
    }
}

class Solver {

    constructor(boardState,type) {
        this.boardState = boardState
        this.moves = 0;

        this.states = {
            working: "working",
            done: "done",
            drawLine: "drawline"
        }

        this.type = type
        this.djBoard = this.convertToDjBoard(this.boardState)
        this.end = this.getEndingPoint(this.djBoard)
        this.starting = this.getStartingPoint(this.djBoard)
        this.currentNode = this.starting

        this.state = this.states.working

        if(this.starting === undefined){
            this.state = this.states.done
            alert("must have a starting node")
        }

        if(this.end === undefined){
            this.state = this.states.done
            alert("must have an ending node")
        }

    }



    getNextBoardState() {

        
        var newBoard = this.djSolve();



        return newBoard

    }


    /*enumMap = (num) =>{
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
    }*/



    djSolve = () => {

        if(this.state === this.states.working){

            if (this.currentNode.x === this.end.x && this.currentNode.y === this.end.y) {
                

                this.state = this.states.drawLine

                this.currentNode = this.end

            }
    
            let adjNodes = this.getAdjacentNodes(this.currentNode,this.djBoard)
    
            adjNodes.forEach((node) => {
                let calcDist = this.currentNode.distance + 1
                if(this.type === "star"){
                    calcDist += this.distanceFromGoal(node)
                }
                if (calcDist < node.distance) {
                    node.distance = calcDist
                }

                if(node.visited !== djEnums.end){
                    this.boardState[node.x][node.y] = 6
                }
    
            })
    
            this.currentNode.visited = djEnums.visited
    
            this.boardState[this.currentNode.x][this.currentNode.y] = 5
        
            this.currentNode = this.selectNextNode(this.djBoard)
    
            return this.boardState

        }
    }

    distanceFromGoal = (node) =>{
        let xDist = this.end.x - node.x
        let yDist = this.end.y - node.y 

        return Math.pow(Math.pow(xDist,2) + Math.pow(yDist,2),.5)
    }

    drawLine = () =>{
        var currentNode = this.end;
        while(currentNode.x !== this.starting.x || currentNode.y !== this.starting.y ){
            var adjNodes = this.getAdjacentNodes(currentNode,this.djBoard,true)
            let smallest = adjNodes[0]
            adjNodes.forEach((node)=>{
                if(smallest.distance > node.distance){
                    smallest = node
                }
            })

            currentNode = smallest
            this.boardState[currentNode.x][currentNode.y] = 4

        }

        this.state = this.states.done

        this.boardState[this.end.x][this.end.y] = 3
        this.boardState[this.starting.x][this.starting.y] = 2
        
        return this.boardState
    }

    selectNextNode(djBoard) {

        let smallest = djBoard[0][0]

        for (let x = 0; x < djBoard[0].length; x++) {
            for (let y = 0; y < djBoard[0].length; y++) {

                if (djBoard[x][y].visited === djEnums.unvisited||djBoard[x][y].visited === djEnums.end) {
                    if (djBoard[x][y].distance < smallest.distance) {
                        smallest = djBoard[x][y]
                    }
                }

            }
        }

        return smallest
    }


    getEndingPoint = (djBoard) =>{
        for (let x = 0; x < djBoard[0].length; x++) {
            for (let y = 0; y < djBoard[0].length; y++) {
                if (djBoard[x][y].visited === djEnums.end) {
                    return djBoard[x][y]
                }
            }
        }
    }

    getStartingPoint = (djBoard) => {
        for (let x = 0; x < djBoard[0].length; x++) {
            for (let y = 0; y < djBoard[0].length; y++) {
                if (djBoard[x][y].distance === 0) {
                    return djBoard[x][y]
                }
            }
        }
    }

    convertToDjBoard(boardState) {

        let newBoard = []

        for (let x = 0; x < boardState[0].length; x++) {
            let row = []
            for (let y = 0; y < boardState[0].length; y++) {
                switch (boardState[x][y]) {
                    case 0: row.push(new Node(Infinity, djEnums.unvisited, x, y))
                        break;
                    case 1: row.push(new Node(Infinity, djEnums.wall, x, y))
                        break;
                    case 2: row.push(new Node(0, djEnums.unvisited, x, y))
                        break;
                    case 3: row.push(new Node(Infinity, djEnums.end, x, y))
                        break;

                    default : // do nothing
                    break;
                
                }
            }
            newBoard.push(row)
        }

        return newBoard
    }


    inRange(x, y) {
        return x < this.boardState[0].length && x >= 0 && y < this.boardState[0].length && y >= 0;
    }

    getAdjacentNodes = (node, djBoard,dontcare) => {

        let initiDir = -1

        let adjNodes = []

        for (let x = 0; x < 3; x++) {
            for (let y = 0; y < 3; y++) {

                let xDir = initiDir + x
                let yDir = initiDir + y
                
                if (xDir !== 0 || yDir !== 0) {
                    if (this.inRange(node.x + xDir, node.y + yDir)) {
                        if ((djBoard[node.x + xDir][node.y + yDir].visited === djEnums.unvisited || djBoard[node.x + xDir][node.y + yDir].visited === djEnums.end)||dontcare) {
                            adjNodes.push(djBoard[node.x + xDir][node.y + yDir])
                        }
                    }
                }

            }
        }
        return adjNodes
    }



}

export default Solver