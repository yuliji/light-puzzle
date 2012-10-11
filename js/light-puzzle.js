function upId(line, row){
    var id = null;
    if (line != 1){
	line = line -1;
	id = line.toString()+row.toString();
    }
    return id;
}

function downId(line, row){
    var id = null;
    if (line != 4){
	line = line + 1;
	id = line.toString()+row.toString();
    }
    return id;
}

function rightId(line, row){
    var id = null;
    if (row != 4){
	row = row + 1;
	id = line.toString()+row.toString();
    }
    return id;
}

function leftId(line, row){
    var id = null;
    if (row != 1){
	row = row -1;
	id = line.toString()+row.toString();
    }
    return id;
}

function refresh(){
    $("td").addClass("black");
    var l, r;
    for(l = 1; l <= 4; l++){
	for(r = 1; r <= 4; r++){
	    var id = "#"+l.toString()+r.toString();
	    var random = Math.random();
	    if(random > 0.5){
		$(id).toggleClass("black");
		$("#x"+l.toString()+r.toString()).html("0");
	    }else{
		$("#x"+l.toString()+r.toString()).html("1");
	    }

	}
    }
    solveMatrix();
}

function findLineWithOneAtCol(matrix, col){
    for(var i = col; i < matrix.length; i++){
	if(matrix[i][col] == 1){
	    return i;
	}
    }
    return -1;
}

function switchLine(matrix, la, lb){
    var line = matrix[la];
    matrix[la] = matrix[lb];
    matrix[lb] = line;
}

function addLine(matrix, la, lb){
    for(var i = 0; i < 17; i ++){
	matrix[la][i] = (matrix[la][i] + matrix[lb][i])%2;
    }
}

function printMatrix(matrix){
    var html = '';
    for(var line = 0; line < 16; line ++){
	for(var col = 0; col < 17; col ++){
	    html = html + matrix[line][col].toString()+" ";
	}
	html = html + "<br/>\n";
    }
    html = "\n"+html;
    $("#solved-matrix").html(html);
}

function solveMatrix(){
    var  matrix =[[1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		  [0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		  [0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
		  [1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
		  [0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0],
		  [0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0],
		  [0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0],
		  [0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0],
		  [0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0],
		  [0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0], 
		  [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1], 
		  [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0], 
		  [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0], 
		  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1], 
		  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1]]; 

    var line, column;
    var i = 0;
    for(line = 1; line <= 4; line++){
	for(column = 1; column <= 4; column++){
	    var xy = line.toString()+column.toString();
	    var lastCol = $("#x"+xy).html();
	    matrix[i++][16] = parseInt(lastCol);
	}
    }

    for(line = 0; line < 16; line++){
	var n_line = findLineWithOneAtCol(matrix, line);
	if(n_line > line){
	    switchLine(matrix, line, n_line);
	}
	for(var l = line + 1; l < 16; l++){
	    if(matrix[l][line] == 1){
		addLine(matrix, l, line);
	    }
	}
//	printMatrix(matrix);
    }
    printMatrix(matrix);


}

$(document).ready(function(){
    refresh();
    $("#restart").click(refresh);    
    $("td").click(function(event){
	var id = event.target.id;
	var line = parseInt(id[0]);
	var row = parseInt(id[1]);
	$(this).toggleClass("black");
	var up = upId(line, row);
	$("#"+up).toggleClass("black");
	var down = downId(line, row);
	$("#"+down).toggleClass("black");
	var left = leftId(line, row);
	$("#"+left).toggleClass("black");
	var right = rightId(line, row);
	$("#"+right).toggleClass("black");
    });

});