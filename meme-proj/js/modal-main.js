'use strict';

var gCanvas;
var gCtx;
var gMeme;


// dont need the init. the createMeme belongs to the modal-service

function initCanvas() {
    // console.log('canvas loaded');
    gMeme = createMeme();
    // renderMeme();
}

// createCanvas should be rendercanvas, make the canvas permanent in the html and clean it using a function.
// should be in main

function createCanvas() {
    var elModalImg = document.querySelector('.modalImg');
    elModalImg.innerHTML = `<canvas> </canvas>`;
    gCanvas = document.querySelector('canvas');
    gCtx = gCanvas.getContext('2d');

    gCanvas.height = gCanvas.offsetHeight;
    gCanvas.width = gCanvas.offsetWidth;
}

// should be in main
function openModal() {
    document.querySelector('.imgModal-wrapper').classList.add('open');
}
// should be in main
function closeModal(elModal) {
    elModal.classList.remove('open');
}
// should be in main
function resetModalTxtInput() {
    document.querySelector('input[type="text"]').value = '';
}
// should be in main. is it necessary? make z-index higher than the modal-wrapper's
function modalContentClicked(ev) {
    ev.stopPropagation();
}
// should be in main

function drawImg(elImg) {
    fitImgByRatio(gCanvas, elImg);
}
// should be in modal - service
function fitImgByRatio(canvas, imageObj) {
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


// should be in modal-service
function createMeme() {
    return {
        selectedImgId: 5,
        texts: [
            {
                text: '',
                font: 'Arial',
                size: 10,
                align: 'left',
                color: '#ff0000',
                shadow: false,
            }
        ]
    }
}
// should be in main
//////////////////////////////////////
// need to seporate to service modal//

function onWriteText(val) {
    gMeme.texts[0].text = val;
    renderMeme();
    val = '';
}
// should be in main
function onColorChange(val) {
    gMeme.texts[0].color = val;
    renderMeme();
}
// should be in main
function onFontChange(val) {
    gMeme.texts[0].font = val;
    renderMeme();
}

function increaseFontSize() {
    gMeme.texts[0].size += 1;
    renderMeme();
}
//  unite both funcs ^ v and put them on modal-service. make a main func that gives the function their value
function decreaseFontSize() {
    gMeme.texts[0].size -= 1;
    renderMeme();
}
// should be in modal-service
function alignText(val) {
    // console.log(val);
    if (val === 'left') {
        gMeme.texts[0].align = 'left'
        gCtx.textAlign = 'left';
    }
    if (val === 'center') {
        gMeme.texts[0].align = 'center';
        gCtx.textAlign = 'center';
    }
    if (val === 'right') {
        gMeme.texts[0].aling = 'right';
        gCtx.textAlign = 'right';
    }
}
// should be in main

function createMeme() {
    return {
        selectedImgId: 5,
        texts: [
            {
                text: '',
                font: 'Arial',
                size: 20,
                align: 'left',
                color: '#ff0000',
                shadow: false,
            }
        ]
    }
}

function alignText(val) {
    console.log(val);
    var txt = gMeme.texts[0].align;
    txt = val;
    console.log(txt);
}

function renderMeme() {
    createCanvas();
    fitImgByRatio(gCanvas, gCurrImg.imgElement);
    var txt = gMeme.texts[0];
    gCtx.textAlign = txt.align;
    gCtx.fillStyle = txt.color;
    gCtx.font = `${txt.size}px ${txt.font}`
    gCtx.fillText(txt.text, gCurrImg.canvasPosX + 20, gCurrImg.canvasPosY + 30);
}
// should be in service
function createShadow() {
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

// should be in main
function toggleShadow(ev) {
    // console.log(ev);
    // document.querySelector('on-off')
    gMeme.texts[0].shadow = !gMeme.texts[0].shadow
    console.log(gMeme.texts[0].shadow);

    // var txt = gMeme.texts[0];
    // (txt.shadow) ? createTextShadow() : deleteTextShadow()
}

function deleteText() {
    createCanvas();
    fitImgByRatio(gCanvas, gCurrImg.imgElement);
    resetModalTxtInput();
}

