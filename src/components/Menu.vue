<template>
    <div :style="styles">
        <div ref="menu" class="menu">
            <a href="http://blog.ccaixx.com">Blog</a>
            <router-link v-for="item in menus" :key="item" :to="item.link">{{item.text}}</router-link>
        </div>
    </div>
</template>
<script>
import {
    bus
} from '@/store/bus.js'
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
            menuHeight: 0,
            menus: menus
        };
    },
    mounted() {
        this.scrollHandler();
        window.addEventListener('resize', this.scrollHandler.bind(this), false)
    },
    computed: {
        styles() {
            return {
                height: this.menuHeight
            }
        }
    },
    methods: {
        scrollHandler() {
            var mheight = this.$refs.menu.offsetHeight;
            this.menuHeight = `${mheight}px`;
            bus.$emit('menuHeight', {
                menuHeight: mheight,
                iframeHeight: window.innerHeight - mheight
            });
        }
    }
}
</script>
<style>
.menu {
    font-size: 14px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9999;
    padding: 15px 10px;
    background-color: #324157;
}

.menu a {
    display: inline-block;
    color: #bfcbd9;
    margin: 5px 10px;
    text-decoration: none;
}

.menu .router-link-active {
    color: #ff6600;
}
</style>
