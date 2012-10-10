$(document).ready(function(){
    $("td").addClass("black");
    var l, r;
    for(l = 1; l < 4; l++){
	for(r = 1; r < 4; r++){
	    var id = "#"+l.toString()+r.toString();
	    var random = Math.random();
	    if(random > 0.5){
		$(id).addClass("black");
	    }else{
		$(id).addClass("white");
	    }
	}
    }
 
});