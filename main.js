let SIDEBAR_WIDTH = 200;
let SIDEBAR_COLOR = 100;
let BACKGROUND_COLOR = 0;
let DEFAULT_POINT_COLOR = 255;
let [POINT_WIDTH, POINT_HEIGHT] = [3, 3];
let controlPoints = [];
let drawPoints = [];
let seed;

function midpoint(start, target, multiplier = 0.5) {
    return { x: (start.x + (target.x - start.x) * multiplier), y: (start.y + (target.y - start.y) * multiplier) };
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    translate(SIDEBAR_WIDTH, 0);
    background(BACKGROUND_COLOR);
    noStroke();
}

function draw() {
    if (controlPoints.length > 0) {
        let randomPoint = controlPoints[Math.floor(Math.random() * controlPoints.length)];
        let newPoint = midpoint(seed, randomPoint);
        drawPoints.push(newPoint);
        seed = newPoint;
    }

    background(BACKGROUND_COLOR);
    fill(SIDEBAR_COLOR);
    rect(-SIDEBAR_WIDTH, 0, SIDEBAR_WIDTH, windowHeight);
    controlPoints.forEach((point) => {
        fill(point.color || DEFAULT_POINT_COLOR);
        ellipse(point.x, point.y, POINT_WIDTH, POINT_HEIGHT)
    });

    drawPoints.forEach((point) => {
        fill(point.color || DEFAULT_POINT_COLOR);
        ellipse(point.x, point.y, POINT_WIDTH, POINT_HEIGHT)
    });
}

function mouseClicked() {
    let point = { x: mouseX - SIDEBAR_WIDTH, y: mouseY };
    ellipse(point.x, point.y, POINT_WIDTH, POINT_HEIGHT);
    controlPoints.push(point);
    if (seed === undefined) {
        seed = point;
    }
}