'use strict';

const LINE_HEIGHT = 60;


function init() {
    // console.log('controler on');
    renderGallery();
    console.log(gImgs)
}

function renderGallery() {
    var imgs = getImgs();
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
function canvasClicked(ev) {
    var clickY = ev.layerY;
    var clickX = ev.layerX;
    console.log(clickY, clickX);

    var memeLines = gMeme.lines;
    var clickedLineIdx = memeLines.findIndex((memeLine) => {
        // debugger;
        return (
            clickX >= memeLine.xStart && 
            clickX <= memeLine.xEnd &&
            clickY <= memeLine.yStart &&
            clickY >= memeLine.yEnd
        )
    })
    console.log(clickedLineIdx);

    var elTextInput = document.querySelector('.text-line');
    elTextInput.value = gMeme.lines[clickedLineIdx].str;
    // addNewLineToMeme(createLine()); // put this in a different function that is called by an add button
    // // gMeme.selectedLine++
    // gMeme.lines[gMeme.selectedLine].yStart = ev.layerY;
    // gMeme.lines[gMeme.selectedLine].yEnd = ev.layerY - gMeme.lines[gMeme.selectedLine].size;

    // updateMarkedLine(gMeme.selectedLine);
    // for (var i = 0; i < gMeme.lines.length; i++) {
    //     // gMeme.lines[gMeme.selectedLine].yStart = ev.layerY;

    // }

    // document.querySelector('.text-line').value = gMeme.lines[currLineIdx].str;
    // console.log(gMeme.lines[gMeme.selectedLine])
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
    for (var i = 0; i < gMeme.lines.length; i++) {
        updateMarkedLine();
        // addFrameToMarkedLine();
        var txt = gMeme.lines[i];
        gCtx.fillStyle = txt.color;
        gCtx.font = `${txt.size}px ${txt.font}`;
        (txt.shadow) ? createTextShadow() : deleteTextShadow();
        gCtx.textAlign = txt.align;
        gCtx.fillText(txt.str, gCanvas.width / 2, txt.yStart);
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

function addFrameToMarkedLine() {
    console.log('marked');
    var yStart = gMeme.selectedLine * LINE_HEIGHT + 5;
    var yEnd = gMeme.selectedLine + 1 * LINE_HEIGHT + 5;

    gCtx.rect(10, yStart, gCanvas.width - 20, yEnd);
    gCtx.strokeStyle = '#ffffff';
    gCtx.stroke();
}

function onAddLineClick() {
    var newLine = createLine();
    addNewLineToMeme(newLine);
}
