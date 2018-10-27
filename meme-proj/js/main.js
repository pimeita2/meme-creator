'use strict';

function init() {
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

    var elTextInput = document.querySelector('.text-line');
    var elColor = document.querySelector('#input-color');
    var currLine = getCurrLineByClick(clickX, clickY)
    if (currLine) {
        console.log(currLine);
        updateMarkedLine(currLine);
        addFrameToMarkedLine(currLine);
        elTextInput.value = currLine.str;
        elColor.value = currLine.color;
    } else {
        focusMethod()
        addNewLineToMeme(createLine());
        gMeme.selectedLine++
        gMeme.lines[gMeme.selectedLine].yStart = clickY;
        gMeme.lines[gMeme.selectedLine].yEnd = clickY - 30;
        elTextInput.value = '';
    }
}

function addFrameToMarkedLine(currLine) {
    console.log(currLine)
    if (currLine.isMarked) {
        gCtx.beginPath();
        gCtx.moveTo(currLine.xStart + 30, currLine.yEnd);
        gCtx.lineTo(currLine.xEnd - 100, currLine.yEnd);
        gCtx.lineTo(currLine.xEnd - 100, currLine.yStart + 10);
        gCtx.lineTo(currLine.xStart + 30, currLine.yStart + 10);
        gCtx.lineTo(currLine.xStart + 30, currLine.yEnd);
        gCtx.strokeStyle = '#ff00ff';
        gCtx.stroke();
    }
}


function onImgClick(elImg) {
    // console.log(elImg);
    openModal();
    updateCurrImg(elImg);
    createCanvas();
    drawImg(elImg);
    renderMeme();
    resetModalTxtInput();
}

function onSetFilter(statusFilter) {
    setFilter(statusFilter);
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
    elCanvasContainer.innerHTML = `<canvas onclick="canvasClicked(event);"> </canvas>`;
    gCanvas = document.querySelector('canvas');
    gCtx = gCanvas.getContext('2d');
}

function openModal() {
    document.querySelector('.imgModal-wrapper').classList.add('open');
}

function closeModal() {
    var elModal = document.querySelector('.imgModal-wrapper')
    elModal.classList.remove('open');
    gMeme = createMeme();
}

function resetModalTxtInput() {
    document.querySelector('input[type="text"]').value = '';
}

function modalContentClicked(ev) {
    ev.stopPropagation();
}

function drawImg(elImg) {
    adjustImgToCanvasRatio(gCanvas, elImg);
    drawImgOnCanvas(gCanvas, elImg);
}

function onWriteText(str) {
    writeText(str)
    renderMeme();
}

function onColorChange(color) {
    changeColor(color);
    renderMeme();
}

function onFontSelect(font, ev) {
    event.stopPropagation();
    changeFont(font);
    renderMeme();
}

function onChangeFontSize(sym) {
    changeFontSize(sym);
    renderMeme();
}

function renderMeme() {
    drawImgOnCanvas(gMeme.imgElement);
    for (var i = 0; i < gMeme.lines.length; i++) {
        // updateMarkedLine();
        var txt = gMeme.lines[i];
        gCtx.fillStyle = txt.color;
        gCtx.font = `${txt.size}px ${txt.font}`;
        (txt.shadow) ? createTextShadow() : deleteTextShadow();
        gCtx.textAlign = txt.align;
        gCtx.fillText(txt.str, gCanvas.width / 2, txt.yStart);
    }
}

function deleteText(currLine) {
    var currLine = gMeme.selectedLine;
    gMeme.lines[currLine].str = '';
    resetModalTxtInput();
    renderMeme();
}

function onAddLineClick() {
    createLine();
}

function openAboutUs() {
    document.querySelector('.about-us').classList.add('about-us-open');
}

function closeAboutUs() {
    document.querySelector('.about-us').classList.remove('about-us-open');
}

function focusMethod() {
    document.querySelector('.text-line').focus();
    // console.log(document.querySelector('.text-line'))
}

/////////////////////////////////////////////////////////////

// needs to be on canvas clicked
/*if (line) {
    gCanvas.addEventListener('mousemove', drag, false);
    gIsMoving = true;
}*/
//
/*function drag(ev) {
    var mouseX = ev.clientX - gCanvas.offsetLeft;
    var mouseY = ev.clientY - gCanvas.offsetTop;

    gMeme.selectedLine.x += mouseX - gPrevPos.x;
    gMeme.selectedLine.y += mouseY - gPrevPos.y;
    
    gPrevPos.x = mouseX;
    gPrevPos.y = mouseY;

    renderMeme();
}

function onMouseUp(ev) {
    if (gIsMoving) {
        gCanvas.removeEventListener('mousemove', drag, false);
        gIsMoving = false;
    }
}
*/

function onSubmitContact() {
    var elContactName = document.querySelector('#contact-name');
    var elContactContent = document.querySelector('#contact-content');

    if (!elContactName.value & !elContactContent.value) {
        alert('We appreciate the will, but please insert valid content');
    } else {
        window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=ibarpeled@gmail.com&su=Message from ${elContactName.value}&body=${elContactContent.value}`);
    }

}
