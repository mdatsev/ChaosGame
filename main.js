let SIDEBAR_WIDTH = 200;
let COLORS = {
    BACKGROUND: 0,
    POINT: 255,
    SIDEBAR: 100
};
let [draw_width, draw_height] = [1, 1];
let [control_point_width, control_point_height] = [5, 5];
let controlPoints = [];
let seed;
let ITERATIONS_PER_FRAME = 100;
let running = false;
let multiplier = 0.5;
let angle = 0;
let SIDEBAR_SPACING = 22;

let startBtn;
let multiplierInp;
let clearBtn;
let resetBtn;
let clickModeRadio;
let angleInp;

function rotatepoint(start, target) {
    let p = start;
    let cx = target.x;
    let cy = target.y
    let s = sin(target.angle);
    let c = cos(target.angle);

    // translate point back to origin:
    p.x -= cx;
    p.y -= cy;

    // rotate point
    let xnew = p.x * c - p.y * s;
    let ynew = p.x * s + p.y * c;

    // translate point back:
    p.x = xnew + cx;
    p.y = ynew + cy;
    return p;
}

function midpoint(start, target) {
    return { x: (start.x + (target.x - start.x) * target.multiplier), y: (start.y + (target.y - start.y) * target.multiplier) };
}

function setup() {
    angleMode(DEGREES);
    Object.keys(COLORS).map((col) => { COLORS[col] = color(COLORS[col]) });
    createCanvas(windowWidth, windowHeight);
    background(COLORS.BACKGROUND);
    createGUI();
    translate(SIDEBAR_WIDTH, 0);
    noStroke();
}

function clearDraw() {
    fill(COLORS.BACKGROUND);
    rect(0, 0, windowWidth, windowHeight);
}

function draw() {
    if (running && controlPoints.length > 0) {
        for (let i = 0; i < ITERATIONS_PER_FRAME; i++) {
            let randomPoint = controlPoints[Math.floor(Math.random() * controlPoints.length)];
            let newPoint = midpoint(seed, randomPoint);
            newPoint = rotatepoint(newPoint, randomPoint);
            newPoint.color = randomPoint.color;
            seed = newPoint;
            fill(newPoint.color || COLORS.POINT);
            ellipse(newPoint.x, newPoint.y, draw_width, draw_height);
        }
    }
}

function mouseClicked() {
    switch (clickModeRadio.value()) {
        case "add":
            if (mouseX < SIDEBAR_WIDTH)
                return;
            let point = { x: mouseX - SIDEBAR_WIDTH, y: mouseY, color: randomColor() };
            fill(point.color || COLORS.POINT);
            ellipse(point.x, point.y, control_point_width, control_point_height);
            point.multiplier = multiplier;
            point.angle = angle;
            controlPoints.push(point);
            if (seed === undefined) {
                seed = point;
            }
            break;
        case "select":
            break;
    }
}

function randomColor() {
    //return '#' + Math.floor(Math.random() * 16777215).toString(16);
    return color(`hsl(${randomInt(0, 360)}, ${randomInt(35, 100)}%, ${randomInt(35, 100)}%)`);
}

function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function createGUI() {
    fill(COLORS.SIDEBAR);
    rect(0, 0, SIDEBAR_WIDTH, windowHeight);

    var i = 0;

    clickModeRadio = createRadio();
    clickModeRadio.option("add");
    clickModeRadio.value("add")
    clickModeRadio.option("select");
    clickModeRadio.option("remove");
    clickModeRadio.position(0, i * SIDEBAR_SPACING);
    clickModeRadio.style('width', `${SIDEBAR_WIDTH}`);
    i++;

    startBtn = createButton('start');
    startBtn.position(0, i * SIDEBAR_SPACING);
    startBtn.mousePressed(() => {
        running = !running;
        $(startBtn.elt).text(running ? 'stop' : 'start');
    });
    i++;

    multiplierInp = createInput(multiplier);
    $(multiplierInp.elt).attr('placeholder', 'multiplier');
    multiplierInp.position(0, i * SIDEBAR_SPACING);
    multiplierInp.changed(() => {
        multiplier = multiplierInp.value();
        $(multiplierInp.elt).css('border', '');
    });
    multiplierInp.input(() => {
        $(multiplierInp.elt).css('border', 'solid red');
    });
    i++;

    angleInp = createInput(angle);
    $(angleInp.elt).attr('placeholder', 'angle');
    angleInp.position(0, i * SIDEBAR_SPACING);
    angleInp.changed(() => {
        angle = angleInp.value();
        $(angleInp.elt).css('border', '');
    });
    angleInp.input(() => {
        $(angleInp.elt).css('border', 'solid red');
    });
    i++;

    clearBtn = createButton('clear draw');
    clearBtn.position(0, i * SIDEBAR_SPACING);
    clearBtn.mousePressed(clearDraw);
    i++;

    resetBtn = createButton('show ctrl points');
    resetBtn.position(0, i * SIDEBAR_SPACING);
    resetBtn.mousePressed(() => {
        controlPoints.forEach((point) => {
            fill(point.color || COLORS.POINT);
            ellipse(point.x, point.y, control_point_width, control_point_height);
        });
    });
    i++;

    resetBtn = createButton('reset points');
    resetBtn.position(0, i * SIDEBAR_SPACING);
    resetBtn.mousePressed(() => {
        controlPoints = [];
        seed = undefined;
        clearDraw();
    });
    i++;
}