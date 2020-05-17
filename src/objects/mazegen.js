class Point {
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}

class mazegen {

    constructor(boardState){
        this.boardState = boardState
    }

    generateMaze = (boardState) => {

        var newBoard = this.fillWithWalls(boardState)
        newBoard = this.drawMainPath(newBoard,.5,10)

        return newBoard
    
    }
    

    drawMainPath = (boardState,branchChance = .5,branchLength = 10) => {
      
        var start = new Point(Math.floor(Math.random()*boardState[0].length),0)

        var currentPoint = start

        boardState[currentPoint.x][currentPoint.y] = 2
        
        console.log(start,"start point")

        var branchPoints = []

        while(currentPoint.y !== this.boardState.length-1){

            if(Math.random()<branchChance){
                branchPoints.push(currentPoint)
            }

            var adjNodes = this.getAdjacentNodes(currentPoint,boardState,true)

            if(adjNodes.length === 0){

                break
            }

            currentPoint = adjNodes[Math.floor((Math.random()*adjNodes.length))]
            boardState[currentPoint.x][currentPoint.y] = 0
        }

        boardState[currentPoint.x][currentPoint.y] = 3

        branchPoints.forEach((point)=>{
            this.createBranch(point,boardState)
        })

        return boardState

    }
    
    createBranch(currentPoint,boardState,length = 40){

        var i = 0

        while(i < length){

            var adjNodes = this.getAdjacentNodes(currentPoint,boardState,true)
            if(adjNodes.length === 0){
                break
            }

            currentPoint = adjNodes[Math.floor((Math.random()*adjNodes.length))]
            boardState[currentPoint.x][currentPoint.y] = 0

            i++
        }


    }

    fillWithWalls = (boardState) => {
    
        for(let i = 0; i < boardState[0].length; i++){
            for(let x = 0; x < boardState[0].length; x++){
                boardState[i][x] = 1
            }
        }
    
        return boardState
    }

    inRange(x, y) {
        return x < this.boardState[0].length && x >= 0 && y < this.boardState[0].length && y >= 0;
    }


    getAdjacentNodes = (point, boardState,mainpath) => {

        let initiDir = -1

        let adjNodes = []

        for (let x = 0; x < 3; x++) {
            for (let y = 0; y < 3; y++) {

                let xDir = initiDir + x
                let yDir = initiDir + y
                
                if ((xDir !== 0 || yDir !== 0)&& (yDir !== -1|| !mainpath)) {
                    if (this.inRange(point.x + xDir, point.y + yDir)) {
                        if(point.x+xDir !== boardState.length -1 && point.y+yDir >  0){
                            if(boardState[point.x+xDir][point.y+yDir] === 1){
                                adjNodes.push(new Point(point.x + xDir,point.y + yDir))
                            }
                        }
                    }
                }

            }
        }
        return adjNodes
    }

}





export default mazegen