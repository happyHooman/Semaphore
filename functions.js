var redTimeout = 10;
var greenTimeout = 10;
var secMs = 600;

function setSecDuration() {
    var slider = document.getElementById("slider");
    var output = document.getElementById("output");
    output.innerHTML = "Second Duration = " + slider.value + " ms";
    secMs = slider.value;
}

function setRedDuration(){
    var input = document.getElementById("redDuration");
    redTimeout = input.value;
}

function setGreenDuration(){
    var input = document.getElementById("greenDuration");
    greenTimeout = input.value;
}

function lightOn(semafor, color) {
    var light = document.getElementById(semafor).getElementsByClassName(color)[0];
    light.className += " on";
}

function lightOff(semafor, color) {
    var light = document.getElementById(semafor).getElementsByClassName(color)[0];
    light.className = "color " + color;
}

function intermitent(semafor, c) {
    lightOff(semafor, 'green');
    setTimeout(function () {
            lightOn(semafor, 'green');
        }
        , .5 * secMs);
    var i = setInterval(function () {
            lightOff(semafor, 'green');
            var j = setTimeout(function () {
                    lightOn(semafor, 'green');
                }
                , .5 * secMs);
            c--;
            if (c == 0) {
                lightOff(semafor, 'green');
                clearInterval(i);
                clearTimeout(j);
            }
        }
        , secMs);
}

function countdown(semafor, color, time, goNextStep) {
    var p = document.getElementById(semafor).getElementsByClassName(color)[0];
    if (time > 9) {
        p.innerHTML = time;
    } else {
        p.innerHTML = '0' + time
    }
    time--;
    var i = setInterval(function () {

        if (time == 0) {
            p.innerHTML = '';
            clearInterval(i);
            goNextStep();
        } else if (time > 9) {
            p.innerHTML = time;
        } else {
            p.innerHTML = '0' + time;
            if(time == 3){
                if(color == 'green'){
                    intermitent(semafor, 3);
                    console.log("Semaphore", semafor, "ATTENTION!");
                }
                if(color == 'red'){
                    lightOn(semafor, 'yellow');
                    console.log("Semaphore", semafor, "GET READY!");
                }
            }
        }
        time--;
    }
    , secMs);
}

function startLights(semafor, step) {
    switch (step) {
        case 1:
            console.log("Semaphore", semafor, "STOP!");
            lightOn(semafor, 'red');
            countdown(semafor, 'red', redTimeout, function(){
                startLights(semafor, step + 1);
            });
            break;
        case 2:
            console.log("Semaphore", semafor, "GO!");
            lightOff(semafor, 'red');
            lightOff(semafor, 'yellow');
            lightOn(semafor, 'green');
            countdown(semafor, 'green', greenTimeout, function () {
                startLights(semafor, step + 1);
            });
            break;
        case 3:
            lightOff(semafor, 'green');
            lightOn(semafor, 'yellow');
            setTimeout(function () {
               startLights(semafor, step + 1)
            }, .5*secMs);
            break;
        case 4:
            lightOff(semafor, 'yellow');
            step = 1;
            startLights(semafor, step);
            break;
    }
}
