var oUl = document.querySelector('.box');
var WIDTH = 200;
var MARGIN = 20;
var posArr = [];
var INNERHTML = 0;
function rnd(iMin, iMax) {
    return Math.floor(Math.random() * iMax) + iMin;
}
function createItem() {
    var li = document.createElement('li');
    li.style.width = WIDTH + 'px';
    li.style.backgroundColor = '#ccc';
    li.style.position = 'absolute';
    li.style.height = rnd(40, 400) + 'px';
    // li.innerHTML = '<img _src="img/' + rnd(1, 20) + '.jpg" />' + INNERHTML++;
    li.innerHTML = INNERHTML++;
    return li;

}

function createGroup() {
    var col = Math.floor(oUl.offsetWidth / (WIDTH + MARGIN));
    var OFFSET = (oUl.offsetWidth - col * (WIDTH + MARGIN) - MARGIN) / 2;
    for (var i = 0; i < col; i++) {
        posArr[i] = { x: OFFSET + i * (WIDTH + MARGIN), y: 0 };
    }
}

function findiMinItem(arr) {
    var index = 0;
    var maxValue = Number.MAX_VALUE;
    for (var i = 0; i < arr.length; i++) {
        var item = arr[i];
        if (item) {
            if (item.y < maxValue) {
                maxValue = item.y;
                index = i;
            }
        }
    }
    return index;
}

function createItems(n, succ) {
    var i = 0;
    var timer = null;
    var next = function () {
        if (i == n) {
            clearTimeout(timer);
            succ && succ();
        } else {
            var li = createItem();
            // var img = li.getElementsByTagName('img')[0];
            // img.onload = function () {
            //     insertLi.call(this);
            // }
            // img.onerror = function () {
            //     insertLi.call(this);
            // }
            insertLi();
            function insertLi() {
                oUl.appendChild(li);
                // this.removeAttribute('_src');
                nextImg();
            }

            function nextImg() {
                var index = findiMinItem(posArr);
                li.style.left = posArr[index].x + 'px';
                li.style.top = posArr[index].y + 'px';
                posArr[index].y = li.offsetTop + li.offsetHeight + MARGIN;
                oUl.style.height = posArr[index].y + 'px';
                setTimeout(next, 100);
                i++;
            }
            // img.setAttribute('src', img.getAttribute('_src'));
        }
    };
    next();
}

function isEnterScreen(obj) {
    if (!obj) return false;
    return obj.offsetTop < document.body.scrollTop + document.documentElement.clientHeight;
}

function init() {
    createGroup();
    createItems(40, function () {
        ready = true;
    });
}

init();

var ready = true;
var oSpinner = document.getElementById('spinner');
window.onscroll = function () {
    var lastLi = oUl.children[oUl.children.length - 1];
    if (!ready) return false;
    if (isEnterScreen(lastLi) && ready) {
        ready = false;
        oSpinner.style.display = 'block';
        setTimeout(function () {
            createItems(10, function () {
                ready = true;
            });
            oSpinner.style.display = 'none';
        }, 1000)
    }
}
