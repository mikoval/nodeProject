
module.exports = {
    complete: function(grid){
        var width = grid.length;
        var height = grid[0].length;
        //check player 1
        //vertical check for win
      
        for (var i=0;i<grid.length;i++)
        {   
            var count = 0
            for (var j=0;j<grid[0].length;j++)
            {   
                if (grid[i][j]=="R")
                    count++;
                else
                    count=0;
                if (count>=4)
                    return true;
            }
        }
        //horizontal check for win
        for (var i=0;i<grid[0].length;i++)
        {   
            var count = 0
            for (var j=0;j<grid.length;j++)
            {   
                if (grid[j][i]=="R")
                    count++;
                else
                    count=0;
                if (count>=4)
                    return true;
            }
        }
        
        // top-left to bottom-right : bottom left corner
        for( var rowStart = 0; rowStart < grid[0].length - 3; rowStart++){
            var count = 0;
            var row; 
            var col;
            for( row = rowStart, col = 0; row < grid[0].length && col < grid.length; row++, col++ ){
                if(grid[col][row] == "R"){
                    count++;
                    if(count >= 4) return true;
                }
                else {
                    count = 0;
                }
            }
        }
       
        // top-left to bottom-right : top right corner
        for(var colStart = 1; colStart < grid.length - 3; colStart++){
      
            count = 0;
            var row;
            var col;
            for( row = 0, col = colStart; row < grid[0].length && col < grid.length; row++, col++ ){
          
                if(grid[col][row] == "R"){
                    count++;
                    if(count >= 4) return true;
                }
                else {
                    count = 0;
                }
            }
        }
        //bottom-left to top-right : bottom-right corner
        for( var colStart = 0; colStart < grid.length - 3; colStart++){
            var count = 0;
            var row; 
            var col;
            for( x = colStart, y = grid[0].length-1; x < grid.length && y >=0; x++, y-- ){
            
                if(grid[x][y] == "R"){
                    count++;
                    if(count >= 4) return true;
                }
                else {
                    count = 0;
                }
            }
        }
        //bottom-left to top-right  :  top-left corner
        for( var rowStart = grid[0].length - 2; rowStart >= 0; rowStart--){
            var count = 0;
            var row; 
            var col;
            for( x = 0, y = rowStart; x < grid.length && y >= 0; x++, y-- ){
               
                if(grid[x][y] == "R"){
                    count++;
                    if(count >= 4) return true;
                }
                else {
                    count = 0;
                }
            }
        }
        ////////////////////////////////////////////////////
         //check player 2
        //vertical check for win
      
        for (var i=0;i<grid.length;i++)
        {   
            var count = 0
            for (var j=0;j<grid[0].length;j++)
            {   
                if (grid[i][j]=="B")
                    count++;
                else
                    count=0;
                if (count>=4)
                    return true;
            }
        }
        
        //horizontal check for win
        for (var i=0;i<grid[0].length;i++)
        {   
            var count = 0
            for (var j=0;j<grid.length;j++)
            {   
                if (grid[j][i]=="B")
                    count++;
                else
                    count=0;
                if (count>=4)
                    return true;
            }
        }
        
        // top-left to bottom-right : bottom left corner
        for( var rowStart = 0; rowStart < grid[0].length - 3; rowStart++){
            var count = 0;
            var row; 
            var col;
            for( row = rowStart, col = 0; row < grid[0].length && col < grid.length; row++, col++ ){
                if(grid[col][row] == "B"){
                    count++;
                    if(count >= 4) return true;
                }
                else {
                    count = 0;
                }
            }
        }
       
        // top-left to bottom-right : top right corner
        for(var colStart = 1; colStart < grid.length - 3; colStart++){
        
            count = 0;
            var row;
            var col;
            for( row = 0, col = colStart; row < grid[0].length && col < grid.length; row++, col++ ){
          
                if(grid[col][row] == "B"){
                    count++;
                    if(count >= 4) return true;
                }
                else {
                    count = 0;
                }
            }
        }
        //bottom-left to top-right : bottom-right corner
        for( var colStart = 0; colStart < grid.length - 3; colStart++){
            var count = 0;
            var row; 
            var col;
            for( x = colStart, y = grid[0].length-1; x < grid.length && y >=0; x++, y-- ){
                
                if(grid[x][y] == "B"){
                    count++;
                    if(count >= 4) return true;
                }
                else {
                    count = 0;
                }
            }
        }
        //bottom-left to top-right  :  top-left corner
        for( var rowStart = grid[0].length - 2; rowStart >= 0; rowStart--){
            var count = 0;
            var row; 
            var col;
            for( x = 0, y = rowStart; x < grid.length && y >=0; x++, y-- ){
                
                if(grid[x][y] == "B"){
                    count++;
                    if(count >= 4) return true;
                }
                else {
                    count = 0;
                }
            }
        }
        //check if no moves left
        for(var i = 0; i < width; i++){
            if(grid[i][0] == "_"){return false;}
        }
        return true;

    },
    makeMove: function(game, move, currentTurn){
        var color = getColor(currentTurn)
        for(var i = game[move].length-1; i >= 0; i-- ){
            if(game[move][i] == "_")
            {
                
                game[move][i] = color;
                return true;
            }
            
        } 
        return false;
    },

    gameValue: function(grid){
        //check player 1
        //vertical check for win
        score = 0;
        for (var i=0;i<grid.length;i++)
        {   
            var count = 0
            for (var j=0;j<grid[0].length;j++)
            {   
                if (grid[i][j]=="R")
                    count++;
                else
                    count=0;
                if(count==3 && (grid[i ][j + 1]  || grid[i][j-3])== "_"){
                    score+=50;
                }
                if (count>=4)
                    return 10000;
            }
        }
        //horizontal check for win
        for (var i=0;i<grid[0].length;i++)
        {   
            var count = 0
            for (var j=0;j<grid.length;j++)
            {   
                if (grid[j][i]=="R")
                    count++;
                else
                    count=0;
                if(count==3 && (grid[j ][i + 1]  || grid[j][i-3])){ score+=50;}
                if (count>=4)
                    return 10000;
            }
        }
        
        // top-left to bottom-right : bottom left corner
        for( var rowStart = 0; rowStart < grid[0].length - 3; rowStart++){
            var count = 0;
            var row; 
            var col;
            for( row = rowStart, col = 0; row < grid[0].length && col < grid.length; row++, col++ ){
                if(grid[col][row] == "R"){
                    count++;
                    if(count==3){ score+=10;}
                    if(count >= 4) return 10000;
                }
                else {
                    count = 0;
                }
            }
        }
       
        // top-left to bottom-right : top right corner
        for(var colStart = 1; colStart < grid.length - 3; colStart++){
            count = 0;
            var row;
            var col;
            for( row = 0, col = colStart; row < grid[0].length && col < grid.length; row++, col++ ){
          
                if(grid[col][row] == "R"){
                    count++;
                    if(count==3){ score+=10;}
                    if(count >= 4) return 10000;
                }
                else {
                    count = 0;
                }
            }
        }
        //bottom-left to top-right : bottom-right corner
        for( var colStart = 0; colStart < grid.length - 3; colStart++){
            var count = 0;
            var row; 
            var col;
            for( x = colStart, y = grid[0].length-1; x < grid.length && y >=0; x++, y-- ){
                if(grid[x][y] == "R"){
                    count++;
                    if(count==3){ score+=10;}
                    if(count >= 4) return 10000;
                }
                else {
                    count = 0;
                }
            }
        }
        //bottom-left to top-right  :  top-left corner
        for( var rowStart = grid[0].length - 2; rowStart >= 0; rowStart--){
            var count = 0;
            var row; 
            var col;
            for( x = 0, y = rowStart; x < grid.length && y >=0; x++, y-- ){
          
                if(grid[x][y] == "R"){
                    count++;
                    if(count==3){ score+=10;}
                    if(count >= 4) return 10000;
                }
                else {
                    count = 0;
                }
            }
        }
        ////////////////////////////////////////////////////
         //check player 2
        //vertical check for win
      
        for (var i=0;i<grid.length;i++)
        {   
            var count = 0
            for (var j=0;j<grid[0].length;j++)
            {   
                if (grid[i][j]=="B")
                    count++;
                else
                    count=0;
                if(count==3 && (grid[i ][j + 1]  || grid[i][j-3])){ score-=50;}
                if (count>=4)
                    return -10000;
            }
        }
        
        //horizontal check for win
        for (var i=0;i<grid[0].length;i++)
        {   
            var count = 0
            for (var j=0;j<grid.length;j++)
            {   
                if (grid[j][i]=="B")
                    count++;
                else
                    count=0;
                if(count==3 && (grid[j ][i + 1]  || grid[j][i-3])){ score-=50;}
                if (count>=4)
                    return -10000;
            }
        }
        
        // top-left to bottom-right : bottom left corner
        for( var rowStart = 0; rowStart < grid[0].length - 3; rowStart++){
            var count = 0;
            var row; 
            var col;
            for( row = rowStart, col = 0; row < grid[0].length && col < grid.length; row++, col++ ){
                if(grid[col][row] == "B"){
                    count++;
                    if(count==3 ){ score-=10;}
                    if(count >= 4) return -10000;
                }
                else {
                    count = 0;
                }
            }
        }
       
        // top-left to bottom-right : top right corner
        for(var colStart = 1; colStart < grid.length - 3; colStart++){
         
            count = 0;
            var row;
            var col;
            for( row = 0, col = colStart; row < grid[0].length && col < grid.length; row++, col++ ){
          
                if(grid[col][row] == "B"){
                    count++;
                    if(count==3){ score-=10;}
                    if(count >= 4) return -10000;
                }
                else {
                    count = 0;
                }
            }
        }
        //bottom-left to top-right : bottom-right corner
        for( var colStart = 0; colStart < grid.length - 3; colStart++){
            var count = 0;
            var row; 
            var col;
            for( x = colStart, y = grid[0].length-1; x < grid.length && y >=0; x++, y-- ){
                if(grid[x][y] == "B"){
                    count++;
                    if(count==3){ score-=10;}
                    if(count >= 4) return -10000;
                }
                else {
                    count = 0;
                }
            }
        }
        //bottom-left to top-right  :  top-left corner
        for( var rowStart = grid[0].length - 2; rowStart >= 0; rowStart--){
            var count = 0;
            var row; 
            var col;
            for( x = 0, y = rowStart; x < grid.length && y >=0; x++, y-- ){
                if(grid[x][y] == "B"){
                    count++;
                    if(count==3){ score-=10;}
                    if(count >= 4) return -10000;
                }
                else {
                    count = 0;
                }
            }
        }
        for (var i = 0; i < grid.length; i++){
            for (var j = 0; j < grid[0].length; j++){
                value = 4 -  Math.abs((grid.length-1)/2.0  - i);
                value = value * 3
                value = value +  (4 - Math.abs((grid[0].length-1)/2.0 - j));
                value = value / 5;
                
                if(grid[i][j] == "R"){score += value;}
                if(grid[i][j] == "B"){score -= value;}
                
            }
        }
        //check if no moves left
        for(var i = 0; i < width; i++){
            if(grid[i][0] == "_"){return score;}
        }
        return 0;
    }
    
  
};

function getColor(turn){
    if(turn == "p1"){return "R";}
    else if (turn == "p2"){return "B"}
    else{return "_"}
}
