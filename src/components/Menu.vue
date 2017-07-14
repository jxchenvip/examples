<template>
    <div class="menu">
        <a href="http://blog.ccaixx.com">Blog</a>
        <router-link v-for="item in menus" :key="item" :to="item.link">{{item.text}}</router-link>
    </div>
</template>
<script>
import data from '@/datas/files.json'

const menus = [{
    link: '/Index',
    text: 'Home'
}];

Object.keys(data.category).forEach((item) => {
    menus.push({
        link: `/${item}`,
        text: item
    });
})

export default {
    name: 'Menu',
    data() {
        return {
            activeIndex: this.$route.fullPath,
            menus: menus
        };
    },
    computed: {},
    methods: {
        handleSelect(key, keyPath) {
            // console.log(key, keyPath);
        }
    }
}
</script>
<style>
.menu {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9999;
    padding: 20px 10px;
    background-color: #324157;
}

.menu a {
    color: #bfcbd9;
    margin: 0 10px;
    text-decoration: none;
}

.menu .router-link-active {
    color: #ff6600;
}
</style>
