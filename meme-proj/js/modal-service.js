'use strict';

var gCanvas;
var gCtx;
var gMeme = createMeme();


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

function addNewLineToMeme(line){
    gMeme.lines.push(line);
}
function createLine(){
    return {
        str: '',
        font: 'Impact',
        size: 30,
        align: 'center',
        color: '#ffffff',
        isMarked: false,
        // x:0,
        // y:60,
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

gMeme.lines[gMeme.selectedLine].isMarked = true;

