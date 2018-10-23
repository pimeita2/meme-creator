'use strict';

console.log('model on');
const KEY_IMGS = 'images';
var gImgs;

function createImg(url, keyWords) {
    return {
        id: makeId(),
        url: `${url}`,
        keyWords: `${keyWords}`,
    }
}

function createImgs() {
    return gImgs = [
        createImg('./meme-imgs/2.jpg', ['happy', 'dancing']),
        createImg('./meme-imgs/003.jpg', ['angry', 'man']),
        createImg('./meme-imgs/004.jpg', ['cute', 'animals']),
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
        // return gImgsFilter === 'all' ||
            // (gTodosFilter === 'done' && todo.isDone) ||
            // (gTodosFilter === 'active' && !todo.isDone)
    })
}

