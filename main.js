var SIDEBAR_WIDTH = 200;
var SIDEBAR_COLOR = 100;
var BACKGROUND_COLOR = 0;
var DEFAULT_POINT_COLOR = 255;
var [POINT_WIDTH, POINT_HEIGHT] = [3, 3];
var controlPoints = [{ x: 200, y: 200 }, { x: 300, y: 300 }, { x: 100, y: 300 },];
var drawPoints = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    translate(SIDEBAR_WIDTH, 0);
    background(BACKGROUND_COLOR);
    noStroke();
}

function draw() {
    background(BACKGROUND_COLOR);
    fill(SIDEBAR_COLOR);
    rect(-SIDEBAR_WIDTH, 0, SIDEBAR_WIDTH, windowHeight);
    controlPoints.forEach((point) => {
        fill(point.color || DEFAULT_POINT_COLOR);
        ellipse(point.x, point.y, POINT_WIDTH, POINT_HEIGHT)
    });
}

function mouseClicked() {
    var point = { x: mouseX - SIDEBAR_WIDTH, y: mouseY };
    ellipse(point.x, point.y, POINT_WIDTH, POINT_HEIGHT);
    controlPoints.push(point);
}