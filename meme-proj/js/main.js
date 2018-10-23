'use strict';


function init() {
    console.log('controler on');
    renderImgs();
}

function renderImgs() {
    var imgs = getImgs();

    console.log(imgs);
    var strHTML = '';
    
    strHTML = imgs.map((img, idx) => {
        return `
        <div class="item item${idx+1} flex justify-center align-center" >
            <img src="${img.url}" onclick="onImgClick(this)"/>
        </div>        
        `
    })
    document.querySelector('.content-container').innerHTML = strHTML.join('');
}

function onImgClick(elImg) {
    console.log(elImg);
}

