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
    setTimeout(function(){lightOff('red'); lightOn('yellow');},1000);
    setTimeout(function(){lightOff('yellow'); lightOn('green');},2000);
    setTimeout(function(){lightOff('green')},3000);
    setTimeout(startLights, 3000);
}
