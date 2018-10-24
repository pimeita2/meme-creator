'use strict';


function init() {
    // console.log('controler on');
    initCanvas();
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
    renderCanvas();
    drawImg(elImg);
    resetModalTxtInput();
    openModal();
}

function onSetFilter(statusFilter, elFilter) {
    console.log(statusFilter);
    setFilter(statusFilter.toLowerCase());
    changeCurrentFilterDisplay(elFilter);
    renderImgs();
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




