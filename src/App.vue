<template>
    <div id="app">
        <c-menu></c-menu>
        <transition name="el-fade-in-linear" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>
<script>
import cMenu from './components/Menu.vue'
export default {
    components: {
        cMenu
    },
    name: 'app'
}
</script>
<style>
* {
    margin: 0;
    padding: 0;
}

#app {
    padding-top: 58px;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}
</style>
