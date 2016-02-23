var redTimeOut = 10;
var greenTimeOut = 10;
var needStop = false;
var secMs = 300;

function lightOn(color) {
    var light = document.getElementById(color + "-light");
    switch (color) {
        case 'green':
            light.style.backgroundColor = "#00ff00";
            break;
        case 'yellow':
            light.style.backgroundColor = "#ffff00";
            break;
        case 'red':
            light.style.backgroundColor = "#ff0000";
    }
}

function lightOff(color) {
    var light = document.getElementById(color + "-light");
    switch (color) {
        case 'green':
            light.style.backgroundColor = "#003000";
            break;
        case 'yellow':
            light.style.backgroundColor = "#303000";
            break;
        case 'red':
            light.style.backgroundColor = "#300000";
    }
}

function intermitent(c) {
    if (needStop) {
        c = 0;
    }
    switch (c) {
        case 1:
            lightOff('green');
            setTimeout(function () {
                intermitent(2)
            }, 0.5 * secMs);
            break;
        case 2:
            lightOn('green');
            setTimeout(function () {
                intermitent(1)
            }, 0.5 * secMs);
            break;
        case 0:
            lightOff('green');
            break;
    }
}

function countdown(timer, color) {
    var p = document.getElementById(color + "-countdown");

    if (timer > 9) {
        p.innerHTML = timer;
    } else {
        p.innerHTML = '0' + timer
    }
    if (timer != 0) {
        timer--;
        setTimeout(function () {
            countdown(timer, color)
        }, secMs)
    } else {
        p.innerHTML = '';
    }
}

//TODO no info about colors in js
//TODO add classes ON and OFF

function startLights(step) {
    console.debug('step', step);
    switch (step) {
        case 1:
            lightOn('red');
            countdown(redTimeOut + 3, 'red');
            setTimeout(function () {
                startLights(step + 1)
            }, redTimeOut * secMs);
            break;
        case 2:
            lightOn('yellow');
            setTimeout(function () {
                startLights(step + 1)
            }, 3 * secMs);
            break;
        case 3:
            lightOff('red');
            lightOff('yellow');
            lightOn('green');
            countdown(greenTimeOut, 'green');
            setTimeout(function () {
                startLights(step + 1)
            }, greenTimeOut * secMs - 3 * secMs);
            break;
        case 4:
            needStop = false;
            intermitent(1);
            setTimeout(function () {
                startLights(step + 1)
            }, 3 * secMs);
            break;
        case 5:
            needStop = true;
            lightOn('yellow');
            setTimeout(function () {
                startLights(step + 1)
            }, secMs);
            break;
        case 6:
            lightOff('yellow');
            step = 1;
            startLights(step);
            break;
    }
}
