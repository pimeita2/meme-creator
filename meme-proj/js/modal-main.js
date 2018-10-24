'use strict';

var gCanvas;
var gCtx;
var gMeme;

function initCanvas() {
    // console.log('canvas loaded');
    gMeme = createMeme();
    // renderMeme();
}

function createCanvas() {
    var elModalImg = document.querySelector('.modalImg');
    elModalImg.innerHTML = `<canvas> </canvas>`;
    gCanvas = document.querySelector('canvas');
    gCtx = gCanvas.getContext('2d');
}

function openModal() {
    document.querySelector('.imgModal-wrapper').classList.add('open');
}

function closeModal(elModal) {
    elModal.classList.remove('open');
}

function resetModalTxtInput() {
    document.querySelector('input[type="text"]').value = '';
}

function modalContentClicked(ev) {
    ev.stopPropagation();
}

function drawImg(elImg) {

    // var imgWidth = elImg.naturalWidth;
    // var imgHeight = elImg.naturalHeight;
    
    fitImgByRatio(gCanvas, elImg);
}

function fitImgByRatio(canvas, imageObj) {
    var imageAspectRatio = imageObj.naturalWidth / imageObj.naturalHeight;
	var canvasAspectRatio = canvas.width / canvas.height;
    var renderableHeight, renderableWidth, xStart, yStart;
    
    var imgWidth = imageObj.naturalWidth;
    var imgHeight = imageObj.naturalHeight;

	// If image's aspect ratio is less than canvas's we fit on height
	// and place the image centrally along width
	if(imageAspectRatio < canvasAspectRatio) {
		renderableHeight = canvas.height;
		renderableWidth = imgWidth * (renderableHeight / imgHeight);
		xStart = (canvas.width - renderableWidth) / 2;
		yStart = 0;
	}

	// If image's aspect ratio is greater than canvas's we fit on width
	// and place the image centrally along height
	else if(imageAspectRatio > canvasAspectRatio) {
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


//////////////////////////////////////////////////////

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

function onWriteText(val) {
    gMeme.texts[0].text = val;
    renderMeme();
    val = '';
}

function onColorChange(val) {
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

function renderMeme() {
    createCanvas();
    fitImgByRatio(gCanvas, gCurrImg.imgElement);
    var txt = gMeme.texts[0];
    gCtx.fillStyle = txt.color;
    gCtx.font = `${txt.size}px ${txt.font}`
    gCtx.fillText(txt.text, gCurrImg.canvasPosX + 20, gCurrImg.canvasPosY + 20);
    // console.log(txt)
}

function createShadow() {
    gCtx.shadowOffsetX = 3;
    gCtx.shadowOffsetY = 3;
    gCtx.shadowColor = "rgba(0,0,0,0.3)";
    gCtx.shadowBlur = 4;
}



function deleteText() {
    createCanvas();
    fitImgByRatio(gCanvas, gCurrImg.imgElement);
    resetModalTxtInput();
}

        // function toggleShadow(){
        //     if (gMeme.texts[0].shadow === true){
        //         createShadow();
        //         renderMeme()
        //     } 
        //     // else
        //     // (gMeme.texts[0].shadow === false)
        // }

