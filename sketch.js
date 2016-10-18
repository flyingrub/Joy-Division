var t;
var distribution = gaussian(50, 100);

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    stroke(255, 255, 255);
    smooth();
    colorMode(HSB);
    noLoop();
    t = 0;
}

function draw() {
    background(38, 53, 4);
    push();
    translate(window.innerWidth/2 - 250, window.innerHeight/2 - 250);
    for (var y = 0; y <= 50; y++) {
        drawOneLine(y);
    }
    pop();
    //t+= 0.01;
}

function doVertex(y) {
    y_offset = y * 10
    curveVertex(0,y_offset);
    curveVertex(0,y_offset);
    for (var i = 1; i < 100; i++) {
        total_noise = distribution.pdf(i) * 30 * 50 * noise(i/6, y,t);
        total_noise = -total_noise;

        if (noise(i/20, y,t) > 0.7) total_noise *= 2.5 * noise(i/20, y,t);

        total_noise += map(noise(i/5, y/2,t), 0,1, -1, 1) * 3;

        curveVertex(i * 5, y_offset + total_noise);
    }
    curveVertex(500,y_offset);
    curveVertex(500,y_offset);
}

function touchStarted() {
    noiseSeed(Date.now());
    draw();
}

function drawOneLine(y) {
    // Hide line above
    fill(38, 53, 4);
    strokeWeight();

    beginShape();
    doVertex(y);
    endShape(CLOSE);

    // Draw line
    noFill();
    strokeWeight(3);

    beginShape();
    doVertex(y);
    endShape();
}


