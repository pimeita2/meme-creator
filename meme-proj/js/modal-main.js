'use strict';

var gCanvas;
var gCtx;

function initCanvas() {
    console.log('canvas loaded');
    gCanvas = document.querySelector('canvas');
    gCtx = gCanvas.getContext('2d');
    gCanvas.width = document.querySelector('.modalBody').clientWidth * 0.8;
    gCanvas.height = document.querySelector('.modalBody').clientHeight * 0.7;
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
    // fit and render the image on the modal canvas
    var hRatio = gCanvas.width / elImg.naturalWidth;
    var vRatio = gCanvas.height / elImg.naturalHeight;
    var ratio = Math.min(hRatio, vRatio);
    var centerShift_x = (gCanvas.width - elImg.naturalWidth * ratio) / 2;
    var centerShift_y = (gCanvas.height - elImg.naturalHeight * ratio) / 2;
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
    gCtx.drawImage(elImg, 0, 0, elImg.naturalWidth, elImg.naturalHeight,
        centerShift_x, centerShift_y, elImg.naturalWidth * ratio, elImg.naturalHeight * ratio);
}

var gMeme = {
    selectedImgId: 5,
    textPrefs:
    {
        text: 'I never eat Falafel',
        font: 'Arial',
        size: 20,
        align: 'left',
        color: 'red',
        shadow: false,
    }
}

function onWriteText(val) {
    gCtx.font = '20pt Arial';
    gCtx.fillText(val, 20, 20);
}

function handlePenColor(val) {
    gCtx.strokeStyle = val;
}