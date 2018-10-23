'use strict';

var gCanvas;
var gCtx;

function initCanvas() {
    console.log('canvas loaded');
    gCanvas = document.querySelector('canvas');
    gCtx = gCanvas.getContext('2d');
    gCanvas.width = document.querySelector('.modalBody').clientWidth * 0.95;
    gCanvas.height = document.querySelector('.modalBody').clientHeight / 1.3;
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