'use strict';

const KEY_IMGS = 'images';

var gImgs;
var gImgsFilter = 'all';

function createImg(url, keyWords, ) {
    return {
        id: makeId(),
        url: `${url}`,
        keyWords: keyWords,
    }
}

function createImgs() {
    return gImgs = [
        createImg('./meme-imgs/2.jpg', ['happy']),
        createImg('./meme-imgs/003.jpg', ['crazy', 'sarcastic']),
        createImg('./meme-imgs/004.jpg', ['happy', 'animals']),
        createImg('./meme-imgs/005.jpg', ['happy', 'animals', 'cute']),
        createImg('./meme-imgs/5.jpg', ['cute', 'crazy']),
        createImg('./meme-imgs/006.jpg', ['animals', 'cute']),
        createImg('./meme-imgs/8.jpg', ['crazy', 'happy']),
        createImg('./meme-imgs/9.jpg', ['crazy', 'cute']),
        createImg('./meme-imgs/12.jpg', ['crazy', 'sarcastic']),
        createImg('./meme-imgs/19.jpg', ['crazy', 'sarcastic']),
        createImg('./meme-imgs/img4.jpg', ['crazy', 'sarcastic']),
        createImg('./meme-imgs/img5.jpg', ['crazy', 'sarcastic']),
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
    return gImgs.filter(function (img) {
        console.log(gImgsFilter, 'img:', img, 'img key:', img.keyWords)
        return gImgsFilter === 'all' ||
            (gImgsFilter === 'happy' && img.keyWords.includes('happy')) ||
            (gImgsFilter === 'crazy' && img.keyWords.includes('crazy')) ||
            (gImgsFilter === 'sarcastic' && img.keyWords.includes('sarcastic')) ||
            (gImgsFilter === 'sad' && img.keyWords.includes('sad')) ||
            (gImgsFilter === 'animals' && img.keyWords.includes('animals'))
    })
    // var imgs = getFromStorage(KEY_IMGS);
    // if (!imgs) imgs = gImgs;
}


function setFilter(statusFilter) {
    gImgsFilter = statusFilter;
}

function downloadCanvas(elLink) {
    console.log(canvas.toDataURL())
    elLink.href = canvas.toDataURL()
    elLink.download = 'my-canvas.jpg'
}
