'use strict';

var gCanvas;
var gCtx;

function initCanvas() {
    console.log('canvas loaded');
    gCanvas = document.querySelector('canvas');
    gCtx = gCanvas.getContext('2d');
    gCanvas.width = document.body.offsetWidth / 2;
    gCanvas.height = document.body.offsetHeight / 2;
}

function openModal() {
    document.querySelector('.imgModal-wrapper').classList.add('open');
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