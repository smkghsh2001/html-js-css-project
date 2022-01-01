
var img = null, img1 = null, img2 = null, img3 = null, img4, img5;
var imgcan = document.getElementById("can");
var r = 40; var i = 6;

function init(){}

function loadFile() {
    var fileinput = document.getElementById("finput");
    img = new SimpleImage(fileinput);
    img1 = new SimpleImage(fileinput);
    img2 = new SimpleImage(fileinput);
    img3 = new SimpleImage(fileinput);
    img4 = new SimpleImage(fileinput);
    img5 = new SimpleImage(fileinput);
    console.log(imgcan);
    console.log(r);
    console.log(i);
    img.drawTo(imgcan);
}
function clearCanvas() {
    var ctx = imgcan.getContext("2d");
    ctx.clearRect(0, 0, imgcan.width, imgcan.height);
}
function doGray() {
    for (var pixel of img1.values()) {
        var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
        pixel.setRed(avg);
        pixel.setGreen(avg);
        pixel.setBlue(avg);
    }
    clearCanvas();
    img1.drawTo(imgcan);
}
function doReset() {
    clearCanvas();
    img.drawTo(imgcan);
}
function doRed() {
    for (var pixel of img2.values()) {
        var avg = (pixel.getRed() + pixel.getBlue() + pixel.getGreen()) / 3.0;
        if (avg < 128) {
            pixel.setRed(2 * avg);
            pixel.setGreen(0);
            pixel.setBlue(0);
        }
        else {
            pixel.setRed(255);
            pixel.setGreen((2 * avg) - 255);
            pixel.setBlue((2 * avg) - 255);
        }
    }
    clearCanvas();
    img2.drawTo(imgcan);
}
function doRainbow() {
    var width = img3.getWidth();
    for (var pixel of img3.values()) {
        var x = pixel.getX();
        var avg = (pixel.getRed() + pixel.getBlue() + pixel.getGreen()) / 3.0;
        if (x < ((1 / 7) * width)) {

            if (avg < 128) {
                pixel.setRed(2 * avg);
                pixel.setGreen(0);
                pixel.setBlue(0);
            }
            else {
                pixel.setRed(255);
                pixel.setGreen((2 * avg) - 255);
                pixel.setBlue((2 * avg) - 255);
            }
        }
        else if (x > ((1 / 7) * width) && x < ((2 / 7) * width)) {
            if (avg < 128) {
                pixel.setRed(2 * avg);
                pixel.setGreen(0.8 * avg);
                pixel.setBlue(0);
            }
            else {
                pixel.setRed(255);
                pixel.setGreen((1.2 * avg) - 51);
                pixel.setBlue((2 * avg) - 255);
            }
        }
        else if (x > ((2 / 7) * width) && x < ((3 / 7) * width)) {
            if (avg < 128) {
                pixel.setRed(2 * avg);
                pixel.setGreen(2 * avg);
                pixel.setBlue(0);
            }
            else {
                pixel.setRed(255);
                pixel.setGreen(255);
                pixel.setBlue((2 * avg) - 255);
            }
        }
        else if (x > ((3 / 7) * width) && x < ((4 / 7) * width)) {
            if (avg < 128) {
                pixel.setRed(0);
                pixel.setGreen(2 * avg);
                pixel.setBlue(0);
            }
            else {
                pixel.setGreen(255);
                pixel.setRed((2 * avg) - 255);
                pixel.setBlue((2 * avg) - 255);
            }
        }
        else if (x > ((4 / 7) * width) && x < ((5 / 7) * width)) {
            if (avg < 128) {
                pixel.setBlue(2 * avg);
                pixel.setGreen(0);
                pixel.setRed(0);
            }
            else {
                pixel.setBlue(255);
                pixel.setGreen((2 * avg) - 255);
                pixel.setRed((2 * avg) - 255);
            }
        }
        else if (x > ((5 / 7) * width) && x < ((6 / 7) * width)) {
            if (avg < 128) {
                pixel.setBlue(2 * avg);
                pixel.setRed(0.8 * avg);
                pixel.setGreen(0);
            }
            else {
                pixel.setBlue(255);
                pixel.setRed((1.2 * avg) - 51);
                pixel.setGreen((2 * avg) - 255);
            }
        }
        else {
            if (avg < 128) {
                pixel.setRed(1.6 * avg);
                pixel.setGreen(0);
                pixel.setBlue(1.6 * avg);
            }
            else {
                pixel.setRed((0.4 * avg) + 153);
                pixel.setGreen((2 * avg) - 255);
                pixel.setBlue((0.4 * avg) + 153);
            }
        }
    }
    clearCanvas();
    img3.drawTo(imgcan);
}
function mirror() {
    if (!img) {
        alert("Image not Loaded");
        return;
    }
    var width = img4.getWidth();
    for (var pixel of img4.values()) {
        var x = pixel.getX();
        var y = pixel.getY();
        img4.setPixel(x, y, img.getPixel((width - 1 - x), y));
    }
    clearCanvas();
    img4.drawTo(imgcan);
}
function intensity(newSize) {
    i = newSize;
    document.getElementById("sizeOutput").value = newSize;
}
function radius(newSize) {
    i = newSize;
    document.getElementById("sizeOutput1").value = newSize;
}
var insID = document.getElementById("in1");
var radID = document.getElementById("in2");
function blurFilter() {
    var W = img5.getWidth();
    var H = img5.getHeight();
    var ins = insID.value / 100;
    var rad = radID.value;
    for (var pix of img.values()) {
        var x = pix.getX();
        var y = pix.getY();
        if (Math.random() > ins) {
            img5.setPixel(x, y, pix);
        } else {  //scramble      
            var srcX = x + rad * Math.round((Math.random() - 0.5) / 0.5);
            var srcY = y + rad * Math.round((Math.random() - 0.5) / 0.5);
            if ((srcX >= 0) && (srcX < W) && (srcY >= 0) && (srcY < H)) {
                img5.setPixel(x, y, img.getPixel(srcX, srcY));
            } else {  //out of range, copy original
                img5.setPixel(x, y, pix);
            }
        }
    }
    clearCanvas();
    img5.drawTo(imgcan);
}