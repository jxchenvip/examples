import Vue from 'vue'

Vue.filter('time', function(value) {
    var time = (new Date(value)).toLocaleDateString(),
        arr = time.split('-');
    arr = arr.map(function(item) {
        return item < 10 ? '0' + item : item;
    })
    return arr.join('/');
})

Vue.filter('toLowerCase', function(value) {
    value = value || '';
    return value.toLowerCase();
})

Vue.filter('toUpperCase', function(value) {
    value = value || '';
    return value.toUpperCase();
})
