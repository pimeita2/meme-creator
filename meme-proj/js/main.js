'use strict';


function init() {
    // console.log('controler on');
    renderGallery();
    console.log(gImgs)
}

function renderGallery() {
    var imgs = getImgs();
    // console.log(imgs);
    var strHTML = '';

    strHTML = imgs.map((img, idx) => {
        return `
        <div class="item item${idx + 1} flex justify-center align-center" >
            <img src="${img.url}" onclick="onImgClick(this)"/>
        </div>        
        `
    }).join('');
    document.querySelector('.content-container').innerHTML = strHTML
}

function onImgClick(elImg) {
    // console.log(elImg);
    updateCurrImg(elImg);
    renderCanvas(); // make the render canvas another function that cleans the canvas
    drawImg(elImg);
    resetModalTxtInput();
    openModal();
}

function onSetFilter(statusFilter) {
    // console.log(statusFilter);
    setFilter(statusFilter.toLowerCase());
    // changeCurrentFilterDisplay(elFilter);
    renderGallery();
}

function changeCurrentFilterDisplay(elFilter) {
    var filterEls = document.querySelectorAll('header li');
    for (let i = 0; i < filterEls.length; i++) {
        filterEls[i].classList.remove('current-filter');
    }
    elFilter.classList.add('current-filter');
}
// move to modal main
function onFontBtnClick() {

}

function createCanvas() {
    var elModalImg = document.querySelector('.modalImg');
    elModalImg.innerHTML = `<canvas> </canvas>`;
    gCanvas = document.querySelector('canvas');
    gCtx = gCanvas.getContext('2d');

    gCanvas.height = gCanvas.offsetHeight;
    gCanvas.width = gCanvas.offsetWidth;
    /// todo clean canvas
}

function openModal() {
    document.querySelector('.imgModal-wrapper').classList.add('open');
}
// should be in main
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
    createCanvas(); // create canvas should be called once to reset the canvas settings onload
    drawImgOnCanvasByRatio(gCanvas, elImg);
}

function onWriteText(str) {
    writeText(str)
    renderMeme();
}

function onColorChange(color) {
    changeColor(color);
    renderMeme();
}

function onFontChange(font) {
    changeFont(font);
    renderMeme();
}

function onChangeFontSize(sym) {
    changeFontSize(sym);
    renderMeme();
}

function renderMeme() {
    renderCanvas();
    drawImgOnCanvasByRatio(gCanvas, gMeme.imgElement);
    var txt = gMeme.lines[0];
    gCtx.textAlign = txt.align;
    gCtx.fillStyle = txt.color;
    gCtx.font = `${txt.size}px ${txt.font}`;
    gCtx.fillText(txt.str, gMeme.imgStartX + 20, gMeme.imgStartY + 30);
}

function deleteText() {
    renderCanvas();
    drawImgOnCanvasByRatio(gCanvas, gMeme.imgElement);
    resetModalTxtInput();
}

function clearValue(elInput){
    elInput.value = '';
}

