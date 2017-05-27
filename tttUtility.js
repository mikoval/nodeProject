
module.exports = {
  
  complete: function (grid) {
     if(checkState(grid) != 0){return true;}
     if(checkState(grid) == 0 && getMoves(grid).length == 0){return true;}
     return false; 
  },
  checkState: function (grid){
    for(var x = 0; x < grid.length; x++){
        match = true;
        for(y = 0; y < grid[0].length; y++){
            if(grid[x][y] != "O"){ match = false;}
        }
        if(match == true){return 10}
    }
    for(var x = 0; x < grid.length; x++){
        match = true;
        for(y = 0; y < grid[0].length; y++){
            if(grid[y][x] != "O"){ match = false;}
        }
        if(match == true){return 10}
    }
    
    
    match = true;
    for(var x = 0; x < grid.length; x++){

        if(grid[x][x] != "O"){ match = false;}
    }
    if(match == true){return 10}
    
    
    match = true;
    for(var x = 0; x < grid.length; x++){
        if(grid[x][grid.length -1 - x] != "O"){ match = false;}
    }
    if(match == true){return 10}
    
    // check losses
    for(var x = 0; x < grid.length; x++){
        match = true;
        for(y = 0; y < grid[0].length; y++){
            if(grid[x][y] != "X"){ match = false;}
        }
        if(match == true){return -10}
    }
    for(var x = 0; x < grid.length; x++){
        match = true;
        for(y = 0; y < grid[0].length; y++){
            if(grid[y][x] != "X"){ match = false;}
        }
        if(match == true){return -10}
    }
    
    
    match = true;
    for(var x = 0; x < grid.length; x++){
        if(grid[x][x] != "X"){ match = false;}
    }
    if(match == true){return -10}
    
    
    match = true;
    for(var x = 0; x < grid.length; x++){
        if(grid[x][grid.length -1 - x] != "X"){ match = false;}
    }
    if(match == true){return -10}
    
    return 0;
  },
  getMoves: function(grid) {
    var moves = []
    for(var x  = 0; x < grid.length; x++){
        for(var y = 0; y < grid[0].length; y++){
            if(grid[x][y] == "_"){ moves.push({x: x, y: y})}
        }
    }
    return moves;
  }
};
function getMoves(grid){
  var moves = []
    for(var x  = 0; x < grid.length; x++){
        for(var y = 0; y < grid[0].length; y++){
            if(grid[x][y] == "_"){ moves.push({x: x, y: y})}
        }
    }
    return moves;
}
function checkState (grid){
    for(var x = 0; x < grid.length; x++){
        match = true;
        for(y = 0; y < grid[0].length; y++){
            if(grid[x][y] != "O"){ match = false;}
        }
        if(match == true){return 10}
    }
    for(var x = 0; x < grid.length; x++){
        match = true;
        for(y = 0; y < grid[0].length; y++){
            if(grid[y][x] != "O"){ match = false;}
        }
        if(match == true){return 10}
    }
    
    
    match = true;
    for(var x = 0; x < grid.length; x++){

        if(grid[x][x] != "O"){ match = false;}
    }
    if(match == true){return 10}
    
    
    match = true;
    for(var x = 0; x < grid.length; x++){
        if(grid[x][grid.length -1 - x] != "O"){ match = false;}
    }
    if(match == true){return 10}
    
    // check losses
    for(var x = 0; x < grid.length; x++){
        match = true;
        for(y = 0; y < grid[0].length; y++){
            if(grid[x][y] != "X"){ match = false;}
        }
        if(match == true){return -10}
    }
    for(var x = 0; x < grid.length; x++){
        match = true;
        for(y = 0; y < grid[0].length; y++){
            if(grid[y][x] != "X"){ match = false;}
        }
        if(match == true){return -10}
    }
    
    
    match = true;
    for(var x = 0; x < grid.length; x++){
        if(grid[x][x] != "X"){ match = false;}
    }
    if(match == true){return -10}
    
    
    match = true;
    for(var x = 0; x < grid.length; x++){
        if(grid[x][grid.length -1 - x] != "X"){ match = false;}
    }
    if(match == true){return -10}
    
    return 0;
  }

