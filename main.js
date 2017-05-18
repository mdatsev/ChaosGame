let SIDEBAR_WIDTH = 200;
let SIDEBAR_COLOR = 100;
let BACKGROUND_COLOR = 0;
let DEFAULT_POINT_COLOR = 255;
let [POINT_WIDTH, POINT_HEIGHT] = [1, 1];
let controlPoints = [];
let seed;
let ITERATIONS_PER_FRAME = 100;
let running = false;
let default_multiplier = 0.5;
let SIDEBAR_SPACING = 22;

let startBtn;
let multiplierInp;
let clearBtn;

function midpoint(start, target, multiplier = default_multiplier) {
    return { x: (start.x + (target.x - start.x) * multiplier), y: (start.y + (target.y - start.y) * multiplier) };
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(BACKGROUND_COLOR);
    createGUI();
    translate(SIDEBAR_WIDTH, 0);
    noStroke();
}

function createGUI() {
    var i = 0;
    fill(SIDEBAR_COLOR);
    rect(0, i * SIDEBAR_SPACING, SIDEBAR_WIDTH, windowHeight);

    startBtn = createButton('start');
    startBtn.position(0, 0);
    startBtn.mousePressed(() => {
        running = !running;
        $(startBtn.elt).text(running ? 'stop' : 'start');
    });
    i++;

    multiplierInp = createInput();
    $(multiplierInp.elt).attr('placeholder', 'multiplier');
    multiplierInp.position(0, i * SIDEBAR_SPACING);
    multiplierInp.changed(() => {
        default_multiplier = multiplierInp.value();
        $(multiplierInp.elt).css('border', '');
    });
    multiplierInp.input(() => {
        $(multiplierInp.elt).css('border', 'solid red');
    });
    i++;

    clearBtn = createButton('clear draw');
    clearBtn.position(0, i * SIDEBAR_SPACING);
    clearBtn.mousePressed(() => {
        fill(BACKGROUND_COLOR);
        rect(0, 0, windowWidth, windowHeight);
    });
    i++;
}

function draw() {
    if (running && controlPoints.length > 0) {
        for (let i = 0; i < ITERATIONS_PER_FRAME; i++) {
            let randomPoint = controlPoints[Math.floor(Math.random() * controlPoints.length)];
            let newPoint = midpoint(seed, randomPoint);
            newPoint.color = randomPoint.color;
            seed = newPoint;
            fill(newPoint.color || DEFAULT_POINT_COLOR);
            ellipse(newPoint.x, newPoint.y, POINT_WIDTH, POINT_HEIGHT);
        }
    }
}

function mouseClicked() {
    if (mouseX < SIDEBAR_WIDTH)
        return;
    let point = { x: mouseX - SIDEBAR_WIDTH, y: mouseY, color: randomHexColor() };
    fill(point.color || DEFAULT_POINT_COLOR);
    ellipse(point.x, point.y, POINT_WIDTH, POINT_HEIGHT);
    controlPoints.push(point);
    if (seed === undefined) {
        seed = point;
    }
}

function randomHexColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}