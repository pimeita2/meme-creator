'use strict';

var gCanvas;
var gCtx;
var gMeme = createMeme();


function renderCanvas() {
}

// should be in modal - service
function drawImgOnCanvasByRatio(canvas, imageObj) {
    // var imageAspectRatio = imageObj.naturalWidth / imageObj.naturalHeight;
    // var canvasAspectRatio = canvas.width / canvas.height;
    // var renderableHeight, renderableWidth, xStart, yStart;

    // var imgWidth = imageObj.naturalWidth;
    // var imgHeight = imageObj.naturalHeight;

    // // If image's aspect ratio is less than canvas's we fit on height
    // // and place the image centrally along width
    // if (imageAspectRatio < canvasAspectRatio) {
    //     renderableHeight = canvas.height;
    //     renderableWidth = imgWidth * (renderableHeight / imgHeight);
    //     xStart = (canvas.width - renderableWidth) / 2;
    //     yStart = 0;
    // }

    // // If image's aspect ratio is greater than canvas's we fit on width
    // // and place the image centrally along height
    // else if (imageAspectRatio > canvasAspectRatio) {
    //     renderableWidth = canvas.width
    //     renderableHeight = imgHeight * (renderableWidth / imgWidth);
    //     xStart = 0;
    //     yStart = (canvas.height - renderableHeight) / 2;
    // }

    // // Happy path - keep aspect ratio
    // else {
    //     renderableHeight = canvas.height;
    //     renderableWidth = canvas.width;
    //     xStart = 0;
    //     yStart = 0;
    // }
    // // console.log('x start, y start', xStart, yStart);
    // gMeme.imgStartX = xStart;
    // gMeme.imgStartY = yStart;
    // gMeme.imgEndX = renderableWidth;
    // gMeme.imgEndY = renderableHeight;
    // (imgHeight > imgWidth) ? ratio = imgHeight / imgWidth : ratio = imgWidth / imgHeight;
    // if (canvas.height > elCanvasContainer.clientHeight) canvas.height = elCanvasContainer.clientHeight;

    // console.log(ratio);

    var elCanvasContainer = document.querySelector('.modalImg');
    var imgHeight = imageObj.naturalHeight;
    var imgWidth = imageObj.naturalWidth;

    var ratio;
    ratio = canvas.width / imgWidth;
    
    canvas.width = elCanvasContainer.clientWidth - 10;
    canvas.height = imgHeight * ratio;


    gCtx.drawImage(imageObj, 0, 0, canvas.width, imgHeight * ratio);
};

function createMeme() {
    return {
        // selectedImgId: 5,
        selectedLine: 0,
        lines: [
            {
                str: '',
                font: 'Impact',
                size: 30,
                align: 'center',
                color: '#ff0000',
                // x:0,
                // y:60,
                shadow: false,
            },
            {
                str: '',
                font: 'Impact',
                size: 30,
                align: 'center',
                color: '#ff0000',
                // x:0,
                // y:120,
                shadow: false,
            },
            {
                str: '',
                font: 'Impact',
                size: 30,
                align: 'center',
                color: '#ff0000',
                shadow: false,
            },
            {
                str: '',
                font: 'Impact',
                size: 30,
                align: 'center',
                color: '#ff0000',
                shadow: false,
            },
            {
                str: '',
                font: 'Impact',
                size: 30,
                align: 'center',
                color: '#ff0000',
                shadow: false,
            },
            {
                str: '',
                font: 'Impact',
                size: 30,
                align: 'center',
                color: '#ff0000',
                shadow: false,
            },
            {
                str: '',
                font: 'Impact',
                size: 30,
                align: 'center',
                color: '#ff0000',
                shadow: false,
            },
            {
                str: '',
                font: 'Impact',
                size: 30,
                align: 'center',
                color: '#ff0000',
                shadow: false,
            },
            {
                str: '',
                font: 'Impact',
                size: 30,
                align: 'center',
                color: '#ff0000',
                shadow: false,
            },
            {
                str: '',
                font: 'Impact',
                size: 30,
                align: 'center',
                color: '#ff0000',
                shadow: false,
            },
            {
                str: '',
                font: 'Impact',
                size: 30,
                align: 'center',
                color: '#ff0000',
                shadow: false,
            },
            {
                str: '',
                font: 'Impact',
                size: 30,
                align: 'center',
                color: '#ff0000',
                shadow: false,
            },
            {
                str: '',
                font: 'Impact',
                size: 30,
                align: 'center',
                color: '#ff0000',
                shadow: false,
            },
            {
                str: '',
                font: 'Impact',
                size: 30,
                align: 'center',
                color: '#ff0000',
                shadow: false,
            },
            {
                str: '',
                font: 'Impact',
                size: 30,
                align: 'center',
                color: '#ff0000',
                shadow: false,
            },
            {
                str: '',
                font: 'Impact',
                size: 30,
                align: 'center',
                color: '#ff0000',
                shadow: false,
            }
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
