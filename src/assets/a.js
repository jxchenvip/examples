export default {
    javascript: [{
        text: 'javascripts',
        link: 'javascript',
        time: '2017/07/03'
    }, {
        text: 'javascripts',
        link: 'javascript',
        time: '2017/07/02'
    }, {
        text: 'javascripts',
        link: 'javascript',
        time: '2017/07/01'
    }],
    css3: [{
        text: 'css3s',
        link: 'css3',
        time: '2017/07/03'
    }, {
        text: 'css3s',
        link: 'css3',
        time: '2017/07/02'
    }, {
        text: 'css3s',
        link: 'css3',
        time: '2017/07/01'
    }],
    canvas: [{
        text: 'canvas',
        link: 'canvas',
        time: '2017/07/03'
    }, {
        text: 'canvas',
        link: 'canvas',
        time: '2017/07/02'
    }, {
        text: 'canvas',
        link: 'canvas',
        time: '2017/07/01'
    }],
    html5: [{
        text: 'html5',
        link: 'html5',
        time: '2017/07/06'
    }, {
        text: 'html5',
        link: 'html5',
        time: '2017/07/04'
    }, {
        text: 'html5',
        link: 'html5',
        time: '2017/07/03'
    }],
    lists: function() {
        var arr = this.javascript.concat(this.canvas).concat(this.html5).concat(this.css3);
        return arr.sort(function(a, b) {
            var m = +new Date(a.time),
                n = +new Date(b.time);
            return n - m;
        })
    }
}
