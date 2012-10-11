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