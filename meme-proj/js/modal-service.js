'use strict';

var gCanvas;
var gCtx;
var gMeme = createMeme();

function getMemeState() {
    return gMeme;
}

function renderCanvas() {
}


function drawImgOnCanvasByRatio(canvas, imageObj) {

    var elCanvasContainer = document.querySelector('.modalImg');
    var imgHeight = imageObj.naturalHeight;
    var imgWidth = imageObj.naturalWidth;

    var ratio;
    ratio = canvas.width / imgWidth;

    canvas.width = elCanvasContainer.clientWidth - 10;
    canvas.height = imgHeight * ratio;


    gCtx.drawImage(imageObj, 0, 0, canvas.width, imgHeight * ratio);
};


function getCurrLineByClick(clickX, clickY) {
    return gMeme.lines.find((line, idx) => {
        var isCurrLine = clickX >= line.xStart &&
            clickX <= line.xEnd &&
            clickY <= line.yStart &&
            clickY >= line.yEnd;
        if (isCurrLine) gMeme.selectedLine = idx;
        return isCurrLine;
    })
}

function addNewLineToMeme() {
    createLine();
}

function createLine(yStart = 30, yEnd = 0) {
    gMeme.selectedLine++
    gMeme.lines.push({
        str: '',
        font: 'Impact',
        size: 30,
        align: 'center',
        color: '#ffffff',
        isMarked: false,
        yStart: yStart,
        yEnd: yEnd,
        xStart: 0,
        xEnd: document.querySelector('.modalImg').clientWidth - 10,
        shadow: false,
    })
    console.log(gMeme.lines[gMeme.lines.length-1])
}

function createMeme() {
    return {
        selectedLine: 0,
        lines: [{
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
        }]
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

function updateMarkedLine(lineIdx = 0) {
    for (var i = 0; i < gMeme.lines.length; i++) {
        gMeme.lines[i].isMarked = !gMeme.lines[i].isMarked;
    }
    gMeme.lines[lineIdx].isMarked = true;
    //    console.log(lineIdx);
}

function getSelectedLine() {
    return gMeme.selectedLine;
}