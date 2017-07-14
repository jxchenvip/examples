var Tool = {
    d2a: function(n) {
        return n * Math.PI / 180;
    },
    a2d: function(n) {
        return n * 180 / Math.PI;
    }
};

function Trangle(width, height, fillStyle) {
    this.x = 0;
    this.y = 0;
    this.width = width;
    this.height = height;
    this.fillStyle = fillStyle;
    this.visible = true;
}

Trangle.prototype = {
    draw: function(context) {
        if (!this.visible) return false;
        context.beginPath();
        context.fillStyle = this.fillStyle;
        context.moveTo(this.x, this.y);
        context.lineTo(this.x - this.width / 2, this.y);
        context.lineTo(this.x, this.y - this.height);
        context.lineTo(this.x + this.width / 2, this.y);
        context.fill();
    }
}

function Sector(radius, sAngle, eAngle, lineWidth, strokeStyle, fillStyle) {
    this.x = 0;
    this.y = 0;
    this.radius = radius;
    this.sAngle = sAngle;
    this.eAngle = eAngle;
    this.lineWidth = lineWidth;
    this.strokeStyle = strokeStyle;
    this.fillStyle = fillStyle || 'rgba(0, 0, 0, 0)';
    this.visible = true;
}

Sector.prototype = {
    draw: function(context) {
        if (!this.visible) return false;
        context.beginPath();
        context.strokeStyle = this.strokeStyle;
        context.fillStyle = this.fillStyle;
        context.lineWidth = this.lineWidth;
        context.arc(this.x, this.y, this.radius, this.sAngle, this.eAngle);
        context.stroke();
        context.fill();
    }
}

function Text(font, text, fillStyle) {
    this.x = 0;
    this.y = 0;
    this.font = font;
    this.text = text;
    this.fillStyle = fillStyle;
    this.visible = true;
}

Text.prototype = {
    draw: function(context) {
        if (!this.visible) return false;
        context.beginPath();
        context.fillStyle = this.fillStyle;
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.font = this.font;
        context.fillText(this.text, this.x, this.y);
    }
}

function Rect(width, height, fillStyle) {
    this.x = 0;
    this.y = 0;
    this.width = width;
    this.height = height;
    this.fillStyle = fillStyle;
    this.visible = true;
}

Rect.prototype = {
    draw: function(context) {
        if (!this.visible) return false;
        context.beginPath();
        context.fillStyle = this.fillStyle;
        context.rect(this.x, this.y, this.width, -this.height);
        context.fill();
    }
}


function Polygon(x, y, side, radius, lineWidth, fillStyle, strokeStyle, rotate) {
    this.x = x;
    this.y = y;
    this.side = side;
    this.radius = radius;
    this.lineWidth = lineWidth;
    this.fillStyle = fillStyle;
    this.strokeStyle = strokeStyle;
    this.points = [];
    this.rotate = rotate === undefined ? 30 : rotate;
    this.init();
    this.visible = true;
}
Polygon.prototype = {
    init: function() {
        for (var i = this.side + 1; i--;) {
            var copies = 360 / this.side;
            var sAngle = Tool.d2a(i * copies + this.rotate);
            var x = Math.cos(sAngle) * this.radius + this.x;
            var y = Math.sin(sAngle) * this.radius + this.y;
            this.points.push({ x: x, y: y });
        }
    },
    draw: function(context, x, y) {
        if (!this.visible) return false;
        context.save();
        context.beginPath();
        context.strokeStyle = this.strokeStyle;
        context.fillStyle = this.fillStyle;
        context.lineWidth = this.lineWidth;
        context.moveTo(this.points[0].x, this.points[0].y);
        this.points.forEach(function(item) {
            context.lineTo(item.x, item.y);
        }.bind(this))
        context.fill();
        context.stroke();
        context.closePath();
        context.restore();
    }
}

function Mask(radius, sAngle) {
    this.x = 0;
    this.y = 0;
    this.sAngle = sAngle === undefined ? 90 : sAngle;
    this.radius = radius;
    this.copies = 60;
    this.visible = true;
}

Mask.prototype = {
    draw: function(context, rotate) {
        if (!this.visible) return false;
        rotate = rotate || 0;
        var lastAngle = rotate,
            eAngle = 0,
            N = Math.max(Math.ceil((Math.min(rotate, 360)) / 360 * this.copies), 10);
        context.lineJoin = 'round';
        for (var i = N; i > 0; i--) {
            eAngle = i / N * rotate;
            context.beginPath();
            context.fillStyle = 'rgba(255, 255, 255, ' + (i / N / 2) + ')';
            context.moveTo(this.x, this.y);
            context.arc(this.x, this.y, this.radius, Tool.d2a(this.sAngle + lastAngle), Tool.d2a(this.sAngle + eAngle), true);
            context.fill();
            lastAngle = eAngle;
        }
    }
}


function DataChart(id) {
    this.canvas = document.getElementById(id);
    this.canvas.width = this.canvas.height = Math.min(window.innerWidth, window.innerHeight);
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.cx = this.width / 2; // canvas中心x坐标
    this.cy = this.height / 2; // canvas中心y坐标
    this.context = this.canvas.getContext('2d');

    this.data = [{
        color: '#c7a975',
        value: 0.2,
        text: '保障性'
    }, {
        color: '#c7b775',
        value: 1.2,
        text: '流动性'
    }, {
        color: '#60588a',
        value: 1.2,
        text: '保值性'
    }, {
        color: '#526584',
        value: 1.2,
        text: '收益性'
    }];

    this.CENTER_TEXT = {
        value: '4.8',
        text: '综合评分: 良好'
    };

}



DataChart.prototype = {
    // 百分比转角度
    p2d: function(n) {
        return n * this.ONE_COPIE_DEG / this.RADIX;
    },
    d2p: function(n) {
        return n / this.ONE_COPIE_DEG * this.RADIX;
    },
    addElement: function() {
        // 外圈
        this.OUTER = new Sector(this.OUTER_LINE_RADIUS, Tool.d2a(0), Tool.d2a(360), this.OUTER_LINE_LINE_WIDTH, this.OUTER_LINE_STROKE_STYLE);
        this.OUTER.x = this.cx;
        this.OUTER.y = this.cy;

        this.data.forEach(function(item, index) {
            var sAngle = Tool.d2a((index) * this.ONE_COPIE_DEG),
                eAngle = Tool.d2a((index + 1) * this.ONE_COPIE_DEG),
                degrees = [],
                texts = [];

            // 扇形
            this.sectors.push(new Sector(this.SECTOR_RADIUS, sAngle, eAngle, this.SECTOR_WIDTH, item.color));

            // 三角形
            this.tragles.push(new Trangle(this.TRANGLE_WIDTH, this.TRANGLE_HEIGHT, item.color));

            // 分界线
            this.divide_lines.push(new Rect(this.DIVE_LINES_WIDTH, this.DIVE_LINES_HEIGHT, this.DIVIDE_LINE_FILL_STYLE));

            // 刻度
            for (var i = 0; i < 3; i++) {
                if (i == 0) {
                    degrees.push(new Rect(this.DEGREE_START_WIDTH, this.DEGREE_START_HEIGHT, item.color));
                } else {
                    degrees.push(new Rect(this.DEGREE_WIDTH, this.DEGREE_HEIGHT, item.color));
                }
            }
            this.degrees.push(degrees);

            // 四周圆圈
            this.subCircles.push(new Sector(this.SUBCIRCLE_RADIUS, Tool.d2a(0), Tool.d2a(360), this.SUBCIRCLE_LINE_WIDTH, this.SUBCIRCLE_STROKE_STYLE, this.SUBCIRCLE_FILL_STYLE));

            // 文字
            texts.push({
                num: new Text(this.TEXT_NUM_FONT, item.value, this.TEXT_FILL_STYLE),
                str: new Text(this.TEXT_FONT, item.text, this.TEXT_FILL_STYLE)
            });
            this.texts.push(texts);

        }.bind(this));

        // 中间文字
        this.centerText.push({
            num: new Text(this.CENTER_TEXT_NUM_FONT, this.CENTER_TEXT.value, this.CENTER_TEXT_NUM_FILL_STYLE),
            str: new Text(this.CENTER_TEXT_FONT, this.CENTER_TEXT.text, this.CENTER_TEXT_FILL_STYLE)
        });

        // 图形背景
        for (var i = 0; i < 3; i++) {
            this.polygons.push(new Polygon(this.cx, this.cy, 6, this.POLYGON_RADIUS, this.POLYGON_LINE_WIDTH, this.POLYGON_FILL_STYLE, this.POLYGON_STROKE_STYLE, i * 30));
            this.polygons.push(new Polygon(this.cx, this.cy, 3, this.POLYGON_RADIUS, this.POLYGON_LINE_WIDTH, this.POLYGON_FILL_STYLE, this.POLYGON_STROKE_STYLE, i * 30));
        }

        this.hand = new Rect(this.HAND_WIDTH, this.HAND_HEIGHT, this.HAND_FILL_STYLE);
        this.mask = new Mask(this.MASK_RADIUS, this.SANGLE - 90);
        this.mask.x = this.cx;
        this.mask.y = this.cy;

    },
    createMask: function(context) {
        if (!this.showMask) return false;
        // 指针
        this.context.save();
        this.context.translate(this.cx, this.cy);
        this.context.rotate(Tool.d2a(this.SANGLE + this.rotate));
        this.hand.draw(this.context);
        this.context.restore();

        this.mask.draw(this.context, this.rotate);
    },
    drawElement: function() {
        var ctx = this.context;
        // 背景
        this.polygons.forEach(function(item) {
            item.draw(this.context);
        }.bind(this))

        // 外圈
        this.OUTER.draw(this.context);

        // 四个弧度
        this.sectors.forEach(function(item) {
            this.context.save();
            this.context.translate(this.cx, this.cy);
            this.context.rotate(Tool.d2a(-90 + this.SANGLE));
            item.draw(this.context);
            this.context.restore();
        }.bind(this))

        // 四个三角
        this.tragles.forEach(function(item, index) {
            var rv = this.rv(index);
            this.context.save();
            this.context.translate(this.cx, this.cy);
            this.context.rotate(Tool.d2a(this.SANGLE + index * this.ONE_COPIE_DEG) + rv);
            item.y = this.TRANGLE_RADIUS;
            item.draw(this.context);
            this.context.restore();
        }.bind(this))

        // 小圆圈 
        this.subCircles.forEach(function(item, index) {
            var rv = this.rv(index);
            this.context.save();
            this.context.translate(this.cx, this.cy);
            this.context.rotate(Tool.d2a(this.SANGLE + index * this.ONE_COPIE_DEG) + rv);
            item.y = -this.OUTER_LINE_RADIUS;
            item.draw(this.context);
            this.context.restore();
        }.bind(this))


        // 白色分界线
        this.divide_lines.forEach(function(item, index) {
            this.context.save();
            this.context.translate(this.cx, this.cy);
            this.context.rotate(Tool.d2a(this.SANGLE + index * this.ONE_COPIE_DEG));
            item.x = -1;
            item.y = this.DIVE_LINES_RADIUS;
            item.draw(this.context);
            this.context.restore();
        }.bind(this))

        // 刻度
        this.degrees.forEach(function(degrees, index) {
            var angle = index * this.ONE_COPIE_DEG;
            degrees.forEach(function(item, i, arr) {
                this.context.save();
                this.context.translate(this.cx, this.cy);
                this.context.rotate(Tool.d2a(this.SANGLE + angle + this.ONE_COPIE_DEG / arr.length * i));
                item.y = this.DEGREE_RADIUS;
                item.draw(this.context);
                this.context.restore();
            }.bind(this))
        }.bind(this))

        // 文字
        this.center_value = 0;
        this.texts.forEach(function(texts, index) {
            var rv = this.rv(index);
            texts.forEach(function(item, i, arr) {
                var deg = Tool.d2a(this.SANGLE - 90 + index * this.ONE_COPIE_DEG + this.ONE_COPIE_DEG / arr.length * i);

                this.context.save();
                this.context.translate(this.cx, this.cy);

                item.num.text = Math.min((this.d2p(Tool.a2d(rv))).toFixed(1), this.RADIX);

                item.num.visible = item.str.visible = (item.num.text !== 0)

                item.num.x = this.TEXT_RADIUS * Math.cos(deg + rv);
                item.num.y = this.TEXT_RADIUS * Math.sin(deg + rv) - this.TEXT_MARGIN;
                item.num.draw(this.context);

                item.str.x = this.TEXT_RADIUS * Math.cos(deg + rv);
                item.str.y = this.TEXT_RADIUS * Math.sin(deg + rv) + this.TEXT_MARGIN;
                item.str.draw(this.context);
                this.context.restore();


                this.center_value += item.num.text;
            }.bind(this))
        }.bind(this));


        // 扫描
        this.createMask(this.context);

        // 中间文字
        this.centerText.forEach(function(item) {
            this.context.save();
            this.context.translate(this.cx, this.cy);

            item.num.text = this.center_value.toFixed(1);

            item.num.y = -this.CENTER_TEXT_MARGIN;
            item.num.draw(this.context);

            item.str.y = this.CENTER_TEXT_MARGIN;
            // item.str.text = this.rotateEnd ? this.CENTER_TEXT.text : '综合评分:　　';
            this.rotateEnd && item.str.draw(this.context);

            this.context.restore();
        }.bind(this))

    },
    rv: function(i) { // rotateValue
        return Tool.d2a(this.rotateEle['rotate' + i]);
    },
    setRv: function(i) {
        var max = this.p2d(this.data[i].value);
        this.rotateEle['rotate' + i] = Math.min(max, this.rotateEle['rotate' + i] += this.speed);
    },
    draw: function() {
        this.context.fillStyle = '#fff';
        this.context.fillRect(0, 0, this.width, this.height);
        this.drawElement();
    },
    update: function() {
        this.rotate += this.speed;
        if (this.rotate < 360) {
            this.setRv(Math.floor(this.rotate / this.ONE_COPIE_DEG));
        }

        if (this.rotate > 360) { // 是否旋转结束
            this.rotateEnd = true;
            this.showMask = false;
        }
    },
    animate: function() {
        this.update();
        this.draw();
        !this.rotateEnd && requestNextAnimationFrame(this.animate.bind(this))
    },
    scrollHandler: function() {
        var rect = this.canvas.getBoundingClientRect();
        if ((rect.top + rect.height / 2) < window.screen.height && this.ready) {
            this.ready = false;
            this.animate();
        }
    },
    destory: function() {
        window.removeEventListener('scroll', this.scrollHandler.bind(this), false);
        DataChart = null;
    },
    init: function() {
        if (this.data.length == 0) return false;

        this.margin = 70; // 距离边缘距离
        this.rotate = 0; // 旋转角度初始化
        this.showMask = true; // 是否显示扫描图
        this.speed = 1; // 转动速度
        this.RADIX = 5 / this.data.length; // 每份占比
        this.ONE_COPIE_DEG = 360 / this.data.length; // 一份的角度
        this.SANGLE = 180; // 起始角度

        // 外圈
        this.OUTER_LINE_STROKE_STYLE = '#e8e8e8';
        this.OUTER_LINE_LINE_WIDTH = 0.5;
        this.OUTER_LINE_RADIUS = this.cx - this.margin / 1.3 - this.OUTER_LINE_LINE_WIDTH;
        this.OUTER = null;

        // 四个圆弧
        this.SECTOR_WIDTH = 8;
        this.SECTOR_RADIUS = this.cx - this.margin - this.SECTOR_WIDTH;
        this.sectors_color = ['#60588a', '#526584', '#c7a975', '#c7b775'];
        this.sectors = [];

        // 四个三角
        this.tragles = [];
        this.TRANGLE_WIDTH = 14;
        this.TRANGLE_HEIGHT = 7;
        this.TRANGLE_RADIUS = -this.SECTOR_RADIUS - this.SECTOR_WIDTH / 2 - 1;

        // 小圆圈
        this.subCircles = [];
        this.SUBCIRCLE_FILL_STYLE = this.OUTER_LINE_STROKE_STYLE;
        this.SUBCIRCLE_STROKE_STYLE = '#FFF';
        this.SUBCIRCLE_RADIUS = 3;
        this.SUBCIRCLE_LINE_WIDTH = 5;

        // 白色分界线
        this.divide_lines = [];
        this.DIVE_LINES_WIDTH = 1;
        this.DIVE_LINES_HEIGHT = this.SECTOR_WIDTH;
        this.DIVE_LINES_RADIUS = -this.SECTOR_RADIUS + this.SECTOR_WIDTH / 2;
        this.DIVIDE_LINE_FILL_STYLE = '#fff';

        // 多边形背景
        this.polygons = [];
        this.POLYGON_RADIUS = this.SECTOR_RADIUS - this.SECTOR_WIDTH / 2;
        this.POLYGON_STROKE_STYLE = '#f1f1f1';
        this.POLYGON_FILL_STYLE = 'rgba(0, 0, 0, 0)';
        this.POLYGON_LINE_WIDTH = 0.65;

        // 刻度
        this.degrees = [];
        this.DEGREE_WIDTH = 0.7;
        this.DEGREE_HEIGHT = -5;
        this.DEGREE_START_WIDTH = 2;
        this.DEGREE_START_HEIGHT = -10;
        this.DEGREE_RADIUS = -this.SECTOR_RADIUS + this.SECTOR_WIDTH / 2;


        this.data.forEach(function(item, index) {
            this.rotateEle = this.rotateEle || {};
            this.rotateEle['rotate' + index] = 0;
        }.bind(this))

        // 四周文字
        this.TEXT_NUM_FONT = '18px Arial';
        this.TEXT_FONT = '14px Arial';
        this.TEXT_FILL_STYLE = '#35332f';
        this.TEXT_RADIUS = this.OUTER_LINE_RADIUS + this.margin / 3;
        this.TEXT_MARGIN = 9;
        this.texts = [];

        // 中间文字
        this.centerText = [];
        this.center_value = 0;
        this.CENTER_TEXT_NUM_FILL_STYLE = '#2e3539';
        this.CENTER_TEXT_NUM_FONT = 'bold 43px Arial';
        this.CENTER_TEXT_FILL_STYLE = '#35332f';
        this.CENTER_TEXT_FONT = '12px 宋体';
        this.CENTER_TEXT_MARGIN = 15;

        // 指针
        this.hand = null;
        this.HAND_FILL_STYLE = '#dfdfdf';
        this.HAND_WIDTH = 1;
        this.HAND_HEIGHT = this.SECTOR_RADIUS + this.SECTOR_WIDTH / 2 - 1;

        // 雷达扫描半径
        this.mask = null;
        this.MASK_RADIUS = this.SECTOR_RADIUS + this.SECTOR_WIDTH / 2 - 1;

        this.ready = true;
        this.addElement();
        this.draw();
        this.rotateEnd = false;
        setTimeout(function() {
            this.scrollHandler();
        }.bind(this), 0)
        window.addEventListener('scroll', this.scrollHandler.bind(this), false);
    }
}

var c = new DataChart('cvs');
c.init();
console.log(c)
