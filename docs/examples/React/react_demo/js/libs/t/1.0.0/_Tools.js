module.exports = {
    /**
     * 延时
     */
    timeout: function (cb, time) {
        if (!cb) return false;
        time = time || 50;
        var timer = setTimeout(function () {
            if (typeof cb === 'function') {
                cb.call(this);
            }
            clearTimeout(timer);
            timer = null;
        }, time)
    }
};