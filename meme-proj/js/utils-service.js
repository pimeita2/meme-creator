'use strict';

console.log('utils on');
function makeId() {
    var length = 5;
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return txt;
}

function getFromStorage(key) {
    var val = localStorage.getItem(key);
    return JSON.parse(val)
}

function saveToStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val))
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random()*16777215).toString(16)}`;
}

function randomGradientBgGenerator(hex1, hex2) {
    document.querySelector('body').style.background = `linear-gradient(to bottom, ${hex1}, ${hex2})`;
}