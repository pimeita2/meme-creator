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
function canvasClicked(ev){
    gMeme.selectedLine=Math.floor(ev.layerY/60);
    //@toto - 
    //1. replace the selected line above with function to loop over all line element and find closet
    //    let's start with moving only y and finding the closesed y than we will loop over the results and find the closesed x
    //2. save the x and y on the line selected - this needs to be done in the method which will 
    //    allow to drag the line (on move mouse as example)
        //gMeme.lines[gMeme.selectedLine].x=ev.layerX
        //gMeme.lines[gMeme.selectedLine].y=ev.layerY
    document.querySelector('.text-line').value=gMeme.lines[gMeme.selectedLine].str;
}

function onImgClick(elImg) {
    // console.log(elImg);
    updateCurrImg(elImg);
    createCanvas();
    drawImg(elImg);
    renderMeme();
    renderCanvas(); // make the render canvas another function that cleans the canvas
    resetModalTxtInput();
    openModal();
}

function onSetFilter(statusFilter) {
    // console.log(statusFilter);
    setFilter(statusFilter);
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
function onFontBtnClick() {
    document.querySelector('.font-list').classList.toggle('open');
}

function createCanvas() {
    var elCanvasContainer = document.querySelector('.modalImg');
    elCanvasContainer.innerHTML = `<canvas onclick="canvasClicked(event)"> </canvas>`;
    gCanvas = document.querySelector('canvas');
    gCtx = gCanvas.getContext('2d');
    // console.dir(elCanvasContainer);

    /// todo clean canvas
}

function openModal() {
    document.querySelector('.imgModal-wrapper').classList.add('open');
}
// should be in main
function closeModal() {
    var elModal = document.querySelector('.imgModal-wrapper')
    elModal.classList.remove('open');
}

function resetModalTxtInput() {
    document.querySelector('input[type="text"]').value = '';
}

function modalContentClicked(ev) {
    ev.stopPropagation();
}

function drawImg(elImg) {
    // createCanvas(); // create canvas should be called once to reset the canvas settings onload
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

function onFontSelect(font) {
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
    for(var i=0;i<gMeme.lines.length;i++){
        var txt = gMeme.lines[i];
        gCtx.fillStyle = txt.color;
        gCtx.font = `${txt.size}px ${txt.font}`;
        (txt.shadow)? createTextShadow() : deleteTextShadow();
        gCtx.textAlign = txt.align;
        var elCanvasContainerWidth = document.querySelector('.modalImg').clientWidth;
        gCtx.fillText(txt.str, elCanvasContainerWidth / 2, (i+1)*60);
    }
}


function deleteText() {
    renderCanvas();
    drawImgOnCanvasByRatio(gCanvas, gMeme.imgElement);
    resetModalTxtInput();
}

function clearValue(elInput) {
    elInput.value = '';
}

