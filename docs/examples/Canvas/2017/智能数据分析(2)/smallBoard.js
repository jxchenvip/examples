function SmallBoard(options) {
    this.copies = options.copies || 24;
    this.x = options.x || 0;
    this.y = options.y || 0;
    this.outerColor = options.outerColor || '#d2d5de';
    this.outerStroke = options.outerStroke || '#f0f5fa';
    this.lineWidth = options.lineWidth || 6;
    this.innerColor = options.innerColor || '#00a0e9';
    this.radius = options.radius || 100;
    this.text = options.text || '';
    // this.eAngle = options.eAngle || 0;
    this.sAngle = options.sAngle || 0;
    this.num = options.num || 0;
    this.numberColor = options.numberColor || '#e60e1e';
    this.textColor = options.textColor || '#394659';
    this.init();
}
SmallBoard.prototype = {
    d2a: function (n) {
        return n * Math.PI / 180;
    },
    circelOuterStroke: function (ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.beginPath();
        ctx.lineWidth = this.lineWidth * 2;
        ctx.strokeStyle = this.outerStroke;
        ctx.fillStyle = '#fff';
        ctx.arc(0, 0, this.radius + this.lineWidth / 2, this.d2a(this.sAngle), this.d2a(this.sAngle + this._angle));
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    },
    circelOuter: function (ctx) {
        var start = this.sAngle;
        var n = this.copies;
        for (var i = 0; i < n; i++) {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.beginPath();
            ctx.lineWidth = this.lineWidth;
            ctx.strokeStyle = this.outerColor;
            ctx.arc(0, 0, this.radius, this.d2a(start), this.d2a(start + this._angle / n - 1));
            ctx.stroke();
            ctx.closePath();
            ctx.restore();
            start = start + this._angle / n;
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
        var n = Math.round(this.copies / 1.4);
        for (var i = 0; i < n; i++) {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.beginPath();
            ctx.lineWidth = this.lineWidth;
            ctx.strokeStyle = '#fff';
            ctx.arc(0, 0, this.radius - this.lineWidth, this.d2a(start - 1), this.d2a(start));
            ctx.stroke();
            ctx.closePath();
            ctx.restore();
            start = start + 360 / n;
        }
    },
    circelHandCircel: function (ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.beginPath();
        ctx.strokeStyle = this.innerColor;
        ctx.fillStyle = '#fff';
        ctx.lineWidth = 6;
        ctx.arc(0, 0, this.radius / 8, this.d2a(0), this.d2a(360));
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    },
    circelHand: function (ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.d2a(35 + this._temp));
        ctx.fillStyle = this.innerColor;
        ctx.beginPath();
        ctx.moveTo(-3, 0);
        ctx.lineTo(3, 0);
        ctx.lineTo(0, this.radius - this.lineWidth * 2);
        ctx.lineTo(-3, 0);
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    },
    number2angle: function (n) {
        return this.num * this._angle / 10;
    },
    angle2number: function () {
        return (this._temp / 290 * 10).toFixed(2).replace(/\d$/, '');
    },
    circelNummber: function (ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.fillStyle = this.numberColor;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = '18px Arial';
        ctx.beginPath();
        ctx.fillText(this.angle2number(), 0, this.radius / 1.5);
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    },
    circelText: function (ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.fillStyle = this.textColor;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = '12px SimSun';
        ctx.beginPath();
        ctx.fillText(this.text, 0, this.radius + this.lineWidth);
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    },
    render: function (ctx) {
        this.circelOuterStroke(ctx);
        this.circelOuter(ctx);
        this.circelInner(ctx);
        this.circelInnerLine(ctx);
        this.circelHand(ctx);
        this.circelHandCircel(ctx);
        this.circelNummber(ctx);
        this.circelText(ctx);
    },
    init: function () {
        this._rotate = 0;
        this._angle = 290;
        this._temp = 0;
        this.eAngle = this.number2angle();
    }
}