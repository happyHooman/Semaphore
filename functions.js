var redTimeOut = 30;
var greenTimeOut = 30;
var needStop = false;
var secMs = 200;

function lightOn(semafor, color) {
    var light = document.getElementById(semafor).getElementsByClassName(color)[0];
    light.className +=" on";
}

function lightOff(semafor, color) {
    var light = document.getElementById(semafor).getElementsByClassName(color)[0];
    light.className = "color " + color;
}

function intermitent(semafor, c) {
    if (needStop) {
        c = 0;
    }
    switch (c) {
        case 1:
            lightOff(semafor, 'green');
            setTimeout(function () {
                intermitent(2)
            }, 0.5 * secMs);
            break;
        case 2:
            lightOn(semafor, 'green');
            setTimeout(function () {
                intermitent(1)
            }, 0.5 * secMs);
            break;
        case 0:
            lightOff(semafor, 'green');
            break;
    }
}

function countdown(semafor, color, timer) {
    var p = document.getElementById(semafor).getElementsByClassName(color)[0];

    if (timer > 9) {
        p.innerHTML = timer;
    } else {
        p.innerHTML = '0' + timer
    }
    if (timer != 0) {
        timer--;
        setTimeout(function () {
            countdown(semafor, color, timer);
        }, secMs)
    } else {
        p.innerHTML = '';
    }
}

//TODO no info about colors in js

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
            needStop = false;
            intermitent(semafor, 1);
            setTimeout(function () {
                startLights(semafor, step + 1)
            }, 3 * secMs);
            break;
        case 5:
            needStop = true;
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

/*
startLights(1, 1);
startLights(2, 1);
startLights(3, 1);*/
