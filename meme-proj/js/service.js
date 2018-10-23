'use strict';

const KEY_IMGS = 'images';

var gImgs;
var gImgsFilter = 'all';

function createImg(url, keyWords) {
    return {
        id: makeId(),
        url: `${url}`,
        keyWords: `${keyWords}`,
    }
}

function createImgs() {
    return gImgs = [
        createImg('./meme-imgs/2.jpg', ['happy']),
        createImg('./meme-imgs/003.jpg', ['carzy', 'sarcastic' ]),
        createImg('./meme-imgs/004.jpg', ['happy', 'animals']),
    ]
}

function addImg(img) {
    gImgs.push(img);
}

function getImgById() {
    return gImgs.find(function (img) {
        return img.id === imgId
    })
}

function getImgs() {
    createImgs();
    return gImgs;
    // var imgs = getFromStorage(KEY_IMGS);
    // if (!imgs) imgs = gImgs;
}

function filterImgs() {
    return gImgs.filter(function (img) {
        return gImgsFilter === 'all' ||
            (gImgsFilter === 'happy') ||
            (gImgsFilter === 'crazy') ||
            (gImgsFilter === 'sarcastic') ||
            (gImgsFilter === 'sad') ||
            (gImgsFilter === 'animals')
    })
}

function setFilter(statusFilter) {
    gImgsFilter = statusFilter;
}
