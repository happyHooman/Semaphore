var redTimeOut = 5;
var greenTimeOut = 10;
var secMs = 600;

function setSecDuration() {
    var slider = document.getElementById("slider");
    var output = document.getElementById("output");
    output.innerHTML = "Second Duration = " + slider.value + " ms";
    secMs = slider.value;
}

function lightOn(semafor, color) {
    var light = document.getElementById(semafor).getElementsByClassName(color)[0];
    light.className +=" on";
}

function lightOff(semafor, color) {
    var light = document.getElementById(semafor).getElementsByClassName(color)[0];
    light.className = "color " + color;
}

function intermitent(semafor, c) {
    lightOff(semafor, 'green');
    setTimeout(function(){
            lightOn(semafor, 'green');
        }
        ,.5 * secMs);
    var i = setInterval(function(){
        lightOff(semafor, 'green');
        var j = setTimeout(function(){
            lightOn(semafor, 'green');
        }
        ,.5 * secMs);
        c--;
        if(c==0){
            lightOff(semafor, 'green');
            clearInterval(i);
            clearTimeout(j);
        }
    }
    , secMs);
}

function countdown(semafor, color, time) {
    var p = document.getElementById(semafor).getElementsByClassName(color)[0];
    if (time > 9) {
        p.innerHTML = time;
    } else {
        p.innerHTML = '0' + time
    }
    time--;
    var i = setInterval(function(){
        if(time == 0){
            p.innerHTML = '';
            clearInterval(i);
        }else if (time > 9) {
            p.innerHTML = time;
        } else {
            p.innerHTML = '0' + time
        }
        time--;
    }
    , secMs);
}

function startLights(semafor, step) {
    console.debug('step', step, semafor);
    switch (step) {
        case 1:
            lightOn(semafor, 'red');
            countdown(semafor, 'red', redTimeOut + 3);
            setTimeout(function () {
                startLights(semafor, step + 1)
            }, redTimeOut * secMs);
            break;
        case 2:
            lightOn(semafor, 'yellow');
            setTimeout(function () {
                startLights(semafor, step + 1)
            }, 3 * secMs);
            break;
        case 3:
            lightOff(semafor, 'red');
            lightOff(semafor, 'yellow');
            lightOn(semafor, 'green');
            countdown(semafor, 'green', greenTimeOut);
            setTimeout(function () {
                startLights(semafor, step + 1)
            }, greenTimeOut * secMs - 3 * secMs);
            break;
        case 4:
            intermitent(semafor, 3);
            setTimeout(function () {
                startLights(semafor, step + 1)
            }, 3 * secMs);
            break;
        case 5:
            lightOn(semafor, 'yellow');
            setTimeout(function () {
                startLights(semafor, step + 1)
            }, secMs);
            break;
        case 6:
            lightOff(semafor, 'yellow');
            step = 1;
            startLights(semafor, step);
            break;
    }
}
