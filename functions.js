var redTimeOut = 10000;
var greenTimeOut = 10000;

function lightOn(color){
    var light = document.getElementById(color + "-light");
    switch (color) {
        case 'green': light.style.backgroundColor = "#00ff00";
            break;
        case 'yellow': light.style.backgroundColor = "#ffff00";
            break;
        case 'red': light.style.backgroundColor = "#ff0000";
    }
}

function lightOff(color){
    var light = document.getElementById(color + "-light");
    switch (color) {
        case 'green': light.style.backgroundColor = "#003000";
            break;
        case 'yellow': light.style.backgroundColor = "#303000";
            break;
        case 'red': light.style.backgroundColor = "#300000";
    }
}

//TODO no info about colors in js
//TODO add classes ON and OFF

function startLights(){
    lightOn('red');
    setTimeout(function(){lightOff('red'); lightOn('yellow');},redTimeOut);
    setTimeout(function(){lightOff('yellow'); lightOn('green');},redTimeOut+3000);
    setTimeout(function(){lightOff('green')},redTimeOut+greenTimeOut+3000);
    setTimeout(startLights, redTimeOut+greenTimeOut+3000);
}
