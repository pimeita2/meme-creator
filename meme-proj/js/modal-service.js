'use strict';

var gCanvas;
var gCtx;
var gMeme = createMeme();

function drawImgOnCanvas(img) {
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
}


function adjustImgToCanvasRatio(canvas, elImg) {

    var elCanvasContainer = document.querySelector('.modalImg');

    var imgHeight = elImg.naturalHeight;
    var imgWidth = elImg.naturalWidth;

    var ratioForFitByCanvasWidth = imgHeight / imgWidth;
    var ratioForLargerCanvasHeight = imgWidth / imgHeight;

    canvas.height = elCanvasContainer.clientHeight;
    canvas.width = canvas.height * ratioForLargerCanvasHeight;
};

function getCurrLineByClick(clickX, clickY) {
    return gMeme.lines.find((line, idx) => {
        var isCurrLine =
            clickX >= line.xStart &&
            clickX <= line.xEnd &&
            clickY <= line.yStart &&
            clickY >= line.yEnd;
        if (isCurrLine) gMeme.selectedLine = idx;
        return isCurrLine;
    })
}

function addNewLineToMeme(line) {
    gMeme.lines.push(line);
}

function createLine() {
    return {
        str: '',
        font: 'Impact',
        size: 30,
        align: 'center',
        color: '#ffffff',
        isMarked: false,
        yStart: 30,
        yEnd: 0,
        xStart: 0,
        xEnd: document.querySelector('.modalImg').clientWidth - 10,
        shadow: false,
    }
}

function createMeme() {
    return {
        selectedLine: 0,
        lines: [
            createLine(),
        ]
    }
}

function writeText(str) {
    gMeme.lines[gMeme.selectedLine].str = str;
}

function changeColor(color) {
    gMeme.lines[gMeme.selectedLine].color = color;
}

function changeFont(font) {
    gMeme.lines[gMeme.selectedLine].font = font;
}

function changeFontSize(sym) {
    (sym === '+') ? gMeme.lines[gMeme.selectedLine].size++ : gMeme.lines[gMeme.selectedLine].size--;
}

function alignText(val) {
    gMeme.lines[gMeme.selectedLine].align = val;
    renderMeme();
}

function createTextShadow() {
    gCtx.shadowOffsetX = 3;
    gCtx.shadowOffsetY = 3;
    gCtx.shadowColor = "rgba(0,0,0,0.9)";
    gCtx.shadowBlur = 4;
}

function deleteTextShadow() {
    gCtx.shadowOffsetX = 0;
    gCtx.shadowOffsetY = 0;
    gCtx.shadowColor = "rgba(0,0,0,0)";
    gCtx.shadowBlur = 0;
}

function toggleShadow() {
    gMeme.lines[gMeme.selectedLine].shadow = !gMeme.lines[gMeme.selectedLine].shadow;
    renderMeme()
}

function updateMarkedLine(currLine) {
    for (var i = 0; i < gMeme.lines.length; i++){
        gMeme.lines[i].isMarked = false; 
    }
    currLine.isMarked = true; 
}

function getSelectedLine() {
    return gMeme.selectedLine;
}

function downloadCanvas(elLink) {
    console.log(gCanvas.toDataURL())
    elLink.href = gCanvas.toDataURL()
    elLink.download = 'my-canvas.jpg'
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
}