'use strict';

var gCanvas;
var gCtx;
var gMeme = createMeme();


function renderCanvas() {
}

// should be in modal - service
function drawImgOnCanvasByRatio(canvas, imageObj) {
    var imageAspectRatio = imageObj.naturalWidth / imageObj.naturalHeight;
    var canvasAspectRatio = canvas.width / canvas.height;
    var renderableHeight, renderableWidth, xStart, yStart;

    var imgWidth = imageObj.naturalWidth;
    var imgHeight = imageObj.naturalHeight;

    // If image's aspect ratio is less than canvas's we fit on height
    // and place the image centrally along width
    if (imageAspectRatio < canvasAspectRatio) {
        renderableHeight = canvas.height;
        renderableWidth = imgWidth * (renderableHeight / imgHeight);
        xStart = (canvas.width - renderableWidth) / 2;
        yStart = 0;
    }

    // If image's aspect ratio is greater than canvas's we fit on width
    // and place the image centrally along height
    else if (imageAspectRatio > canvasAspectRatio) {
        renderableWidth = canvas.width
        renderableHeight = imgHeight * (renderableWidth / imgWidth);
        xStart = 0;
        yStart = (canvas.height - renderableHeight) / 2;
    }

    // Happy path - keep aspect ratio
    else {
        renderableHeight = canvas.height;
        renderableWidth = canvas.width;
        xStart = 0;
        yStart = 0;
    }
    // console.log('x start, y start', xStart, yStart);
    gCurrImg.canvasPosX = xStart;
    gCurrImg.canvasPosY = yStart;
    gCurrImg.canvasEndX = renderableWidth;
    gCurrImg.canvasEndY = renderableHeight;
    gCtx.drawImage(imageObj, xStart, yStart, renderableWidth, renderableHeight);
};

function createMeme() {
    return {
        selectedImgId: 5,
        lines: [
            {
                str: '',
                font: 'Arial',
                size: 20,
                align: 'left',
                color: '#ff0000',
                shadow: false,
            }
        ]
    }
}

function writeText(str) {
    gMeme.lines[0].str = str;
}

function changeColor(color) {
    gMeme.lines[0].color = color;
}

function changeFont(font) {
    gMeme.lines[0].font = font;
}

function changeFontSize(sym) {
    (sym === '+') ? gMeme.lines[0].size++ : gMeme.lines[0].size--;
}

function alignText(val) {
    gMeme.lines[0].align = val;
    renderMeme();
}

function createTextShadow() {
    gCtx.shadowOffsetX = 3;
    gCtx.shadowOffsetY = 3;
    gCtx.shadowColor = "rgba(0,0,0,0.3)";
    gCtx.shadowBlur = 4;
}

function deleteTextShadow() {
    gCtx.shadowOffsetX = 0;
    gCtx.shadowOffsetY = 0;
    gCtx.shadowColor = "rgba(0,0,0,0)";
    gCtx.shadowBlur = 0;
}

function toggleShadow(ev) {
    gMeme.lines[0].shadow = !gMeme.lines[0].shadow;
}
