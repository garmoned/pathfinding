class mazegen {

    constructor(){
        //do nothing
    }

    generateMaze = (boardstate) => {

        var newBoard = this.fillWithWalls(boardstate)
    
        return newBoard
    
    }
    
    
    
    fillWithWalls = (boardState) => {
    
        for(let i = 0; i < boardState[0].length; i++){
            for(let x = 0; x < boardState[0].length; i++){
                boardState[i][x] = 2
            }
        }
    
        return boardState
    }

}





export default mazegen