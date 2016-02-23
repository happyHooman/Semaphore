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

function intermitent(c){
    if (needStop) {
        c = 0;
    }
    switch(c){
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

function countdown(timer, color){
    var p = document.getElementById(color+"-countdown");

    p.innerHTML = timer;
    if(timer!=0){
        timer--;
        setTimeout(function(){countdown(timer, color)},1000)
    } else {
        p.innerHTML = '';
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
            countdown(redTimeOut/1000+3, 'red');
            setTimeout(function() {
                startLights(step)}, redTimeOut);
            step++;
            break;
        case 2:
            lightOn('yellow');
            setTimeout(function(){
                startLights(step)},3000);
            step++;
            break;
        case 3:
            lightOff('red');
            lightOff('yellow');
            lightOn('green');
            countdown(greenTimeOut/1000, 'green');
            setTimeout(function(){
                startLights(step)},greenTimeOut-3000);
            step++;
            break;
        case 4:
            needStop=false;
            intermitent(1);
            setTimeout(function(){
                startLights(step)},3000);
            step++;
            break;
        case 5:
            needStop=true;
            lightOn('yellow');
            setTimeout(function(){
                startLights(step)},1000);
            step++;
            break;
        case 6:
            lightOff('yellow');
            step=1;
            startLights(step);
            break;
    }
}
