'use strict';

var gCanvas;
var gCtx;
var gMeme;

function initCanvas() {
    console.log('canvas loaded');
    gCanvas = document.querySelector('canvas');
    gCtx = gCanvas.getContext('2d');
    gMeme = createMeme();
    // renderMeme();
    // gCanvas.width = document.querySelector('.modalBody').clientWidth * 0.8;
    // gCanvas.height = document.querySelector('.modalBody').clientHeight * 0.7;
}

function openModal() {
    document.querySelector('.imgModal-wrapper').classList.add('open');
}

function closeModal(elModal) {
    elModal.classList.remove('open');
}

function modalContentClicked(ev) {
    ev.stopPropagation();
}

function drawImg(elImg) {
    var imgWidth = elImg.naturalWidth;
    var screenWidth = window.innerWidth - 20;
    var scaleX = 1;
    if (imgWidth > screenWidth)
        scaleX = screenWidth / imgWidth;
    var imgHeight = elImg.naturalHeight;
    var screenHeight = window.innerHeight - gCanvas.offsetTop - 10;
    var scaleY = 1;
    if (imgHeight > screenHeight)
        scaleY = screenHeight / imgHeight;
    var scale = scaleY;
    if (scaleX < scaleY)
        scale = scaleX;
    if (scale < 1) {
        imgHeight = imgHeight * scale;
        imgWidth = imgWidth * scale;
    }
    gCanvas.height = imgHeight;
    gCanvas.width = imgWidth;
    gCtx.drawImage(elImg, 0, 0, elImg.naturalWidth, elImg.naturalHeight, 0, 0, imgWidth, imgHeight);
}



function drawImg(elImg) {
    var elModalBody = document.querySelector('.modalBody');
    gCanvas.style.width = '100%';
    gCanvas.style.height = '100%';

    gCanvas.width = gCanvas.offsetWidth;
    gCanvas.height = gCanvas.offsetHeight;

    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
    fitImgByRatio(gCanvas, elImg);
}

function fitImgByRatio(canvas, imageObj) {
    var imageAspectRatio = imageObj.width / imageObj.height;
    var canvasAspectRatio = canvas.width / canvas.height;
    var renderableHeight, renderableWidth, xStart, yStart;

    // If image's aspect ratio is less than canvas's we fit on height
    // and place the image centrally along width
    if (imageAspectRatio < canvasAspectRatio) {
        renderableHeight = canvas.height;
        renderableWidth = imageObj.width * (renderableHeight / imageObj.height);
        xStart = (canvas.width - renderableWidth) / 2;
        yStart = 0;
    }

    // If image's aspect ratio is greater than canvas's we fit on width
    // and place the image centrally along height
    else if (imageAspectRatio > canvasAspectRatio) {
        renderableWidth = canvas.width
        renderableHeight = imageObj.height * (renderableWidth / imageObj.width);
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
    gCtx.drawImage(imageObj, xStart, yStart, renderableWidth, renderableHeight);
};


//////////////////////////////////////////////////////

function createMeme() {
    var meme = {
        selectedImgId: 5,
        texts: [
            {
                text: '',
                font: 'Arial',
                size: 20,
                align: 'left',
                color: 'red',
                shadow: false,
            }
        ]
    }
    return meme;
}

function onWriteText(val) {
    gMeme.texts[0].text = val;
    renderMeme();
}

function onColorChang(val) {
    gMeme.texts[0].color = val;
    renderMeme();
}

function onFontChange(val) {
    gMeme.texts[0].font = val;
    renderMeme();
}

function increaseFontSize() {
    gMeme.texts[0].size += 1;
    renderMeme();
}

function decreaseFontSize() {
    gMeme.texts[0].size -= 1;
    renderMeme();
}

function alignText(val) {
    console.log(val);
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

function renderMeme() {
    var txt = gMeme.texts[0];
    console.log(txt)
    gCtx.fillText(txt.text, 20, 20);
    gCtx.fillStyle = txt.color;
    gCtx.font = `${txt.size}px ${txt.font}`


}
function createShadow() {
    gCtx.shadowOffsetX = 3;
    gCtx.shadowOffsetY = 3;
    gCtx.shadowColor = "rgba(0,0,0,0.3)";
    gCtx.shadowBlur = 4;
}

        // function toggleShadow(){
        //     if (gMeme.texts[0].shadow === true){
        //         createShadow();
        //         renderMeme()
        //     } 
        //     // else
        //     // (gMeme.texts[0].shadow === false)
        // }

