var redTimeOut = 10000;
var greenTimeOut = 10000;
var needStop = false;

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

function intermitent(step){
    if (needStop) {
        step = 0;
    }
    switch(step){
        case 1:
            lightOff('green');
            setTimeout(function(){
                intermitent(2)},500);
            break;
        case 2:
            lightOn('green');
            setTimeout(function(){
                intermitent(1)},500);
            break;
        case 0:
            lightOff('green');
            break;
    }
}

//TODO no info about colors in js
//TODO add classes ON and OFF

function startLights(step){
    /*
     lightOn('red');
     setTimeout(function(){lightOff('red'); lightOn('yellow');},redTimeOut);
     setTimeout(function(){lightOff('yellow'); lightOn('green');},redTimeOut+3000);
     setTimeout(function(){lightOff('green')},redTimeOut+greenTimeOut+3000);
     setTimeout(startLights, redTimeOut+greenTimeOut+3000);
     */
    switch(step){
        case 1:
            lightOn('red');
            setTimeout(function(){
                startLights(2)},redTimeOut);
            break;
        case 2:
            lightOn('yellow');
            setTimeout(function(){
                startLights(3)},3000);
            break;
        case 3:
            lightOff('red');
            lightOff('yellow');
            setTimeout(function(){
                startLights(4)},300);
            break;
        case 4:
            lightOn('green');
            setTimeout(function(){
                startLights(5)},greenTimeOut-3000);
            break;
        case 5:
            needStop=false;
            intermitent(1);
            setTimeout(function(){
                startLights(6)},3000);
            break;
        case 6:
            needStop=true;
            lightOn('yellow');
            setTimeout(function(){
                startLights(7)},1000);
            break;
        case 7:
            lightOff('yellow');
            startLights(1);
            break;
    }
}
