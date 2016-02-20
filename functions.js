function lightOnGreen(){
    var light = document.getElementById("green-light");
    light.style.backgroundColor = "#00ff00";
}

function lightOffGreen(){
    var light = document.getElementById("green-light");
    light.style.backgroundColor = "#003000";
}

function lightOnYellow(){
    var light = document.getElementById("yellow-light");
    light.style.backgroundColor = "#ffff00";
}

function lightOffYellow(){
    var light = document.getElementById("yellow-light");
    light.style.backgroundColor = "#303000";
}

function lightOnRed(){
    var light = document.getElementById("red-light");
    light.style.backgroundColor = "#ff0000";
}

function lightOffRed(){
    var light = document.getElementById("red-light");
    light.style.backgroundColor = "#300000";
}

function lightOn (color){
    //var colorId = color + "-light";
    var light = document.getElementById(color + "-light");
    light.style.backgroundColor = "#00ff00";
}