function BigBoard(options) {
    this.copies = options.copies || 24;
    this.x = options.x || 0;
    this.y = options.y || 0;
    this.outerColor = options.outerColor || '#d2d5de';
    this.lineWidth = options.lineWidth || 10;
    this.innerColor = options.innerColor || '#00a0e9';
    this.radius = options.radius || 100;
    this.sAngle = options.sAngle || 125;
    this.num = options.num || 0;
    this.text = options.text || '';
    this.code = options.code || '';
    this.init();
}
BigBoard.prototype = {
    d2a: function (n) {
        return n * Math.PI / 180;
    },
    number2angle: function (n) {
        return this.num * this._angle / 10;
    },
    angle2number: function () {
        return (this._temp / 290 * 10).toFixed(2).replace(/\d$/, '');
    },
    circelOuter: function (ctx) {
        var start = 0;
        var n = this.copies;
        for (var i = 0; i < n; i++) {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.beginPath();
            ctx.lineWidth = this.lineWidth;
            ctx.strokeStyle = this.outerColor;
            ctx.arc(0, 0, this.radius, this.d2a(start), this.d2a(start + 360 / n - 1));
            ctx.stroke();
            ctx.closePath();
            ctx.restore();
            start = start + 360 / n;
        }
    },
    circelInner: function (ctx) {
        var S = 0;
        var E = this.eAngle;
        var times = this._rotate;
        this._temp = Tween.Linear(times, S, E - S, E);
        if (times >= E) {
            this._temp = E;
        } else {
            this._rotate += 2;
        }
        var _sAngle = this.sAngle;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.beginPath();
        ctx.lineWidth = this.lineWidth;
        ctx.strokeStyle = this.innerColor;
        ctx.arc(0, 0, this.radius - this.lineWidth, this.d2a(_sAngle), this.d2a(_sAngle + this._temp));
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    },
    circelInnerLine: function (ctx) {
        var start = this.sAngle;
        var n = this.copies;
        for (var i = 0; i < n; i++) {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.beginPath();
            ctx.lineWidth = this.lineWidth + 2;
            ctx.strokeStyle = '#fff';
            ctx.arc(0, 0, this.radius - this.lineWidth - 1, this.d2a(start - 1), this.d2a(start));
            ctx.stroke();
            ctx.closePath();
            ctx.restore();
            start = start + 360 / n;
        }
    },
    circelInnerDegree: function (ctx) {
        var start = this.sAngle;
        var n = 50;
        for (var i = 0; i <= n; i++) {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.d2a(this.sAngle + i * this._angle / n));
            ctx.beginPath();
            ctx.fillStyle = this.outerColor;
            var w = i % 5 == 0 ? 4 : 2;
            ctx.rect(this.radius * 0.7 + 4 - w, -0.5, w, 1);
            ctx.fill();
            ctx.closePath();
            ctx.restore();

            if (i % 5 == 0) {
                var R = this.radius * 0.8;
                var d = this.d2a(this.sAngle + i * this._angle / n);
                var t = i / 5;
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.font = '12px Arial';
                ctx.beginPath();
                if (t > 3) {
                    ctx.fillStyle = '#e60e1e';
                } else {
                    ctx.fillStyle = this.outerColor;
                }
                ctx.fillText(t, R * Math.cos(d), R * Math.sin(d));
                ctx.fill();
                ctx.closePath();
                ctx.restore();
            }
        }
    },
    circelNummber: function (ctx) {
        var n = this.angle2number();
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.beginPath();
        ctx.shadowBlur = 2;
        ctx.shadowOffsetY = 5;
        ctx.shadowColor = '#e7e9ef';
        ctx.fillStyle = this.innerColor;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        if (this._temp == this._angle && this.num == 10) {
            ctx.font = '48px Arial';
            ctx.fillText(n, -ctx.measureText(n).width / 5, 0);
            ctx.font = '15px Arial';
            ctx.fillStyle = '#3b4258';
            ctx.fillText('分', 45, 10);
        } else {
            ctx.font = '66px Arial';
            ctx.fillText(n, -ctx.measureText(n).width / 10, 0);
            ctx.font = '15px Arial';
            ctx.fillStyle = '#3b4258';
            ctx.fillText('分', 45, 15);
        }
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    },
    circelTitle: function (ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.beginPath();
        ctx.fillStyle = '#3b4258';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = '12px Arial';
        ctx.fillText('关注度最高个股', 0, -this.radius * 0.45);
        ctx.fillStyle = '#868d99';
        ctx.font = '14px SimSun';
        ctx.fillText(this.text, 0, this.radius * 0.45);
        ctx.fillStyle = '#c8cad5';
        ctx.fillText(this.code, 0, this.radius * 0.65);
        ctx.closePath();
        ctx.restore();
    },
    render: function (ctx) {
        this.circelOuter(ctx);
        this.circelInner(ctx);
        this.circelInnerDegree(ctx);
        this.circelInnerLine(ctx);
        this.circelTitle(ctx);
        this.circelNummber(ctx);
    },
    init: function () {
        this._rotate = 0;
        this._temp = 0;
        this._angle = 290;
        this.eAngle = this.number2angle();
    }
}