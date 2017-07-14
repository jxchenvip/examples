<template>
    <div class="indexList">
        <div class="loading" v-show="loadingShow">努力加载中...</div>
        <iframe ref="examples" name="examples" :src="iframeSrc" scrolling="no" width="100%" :height="iframeHeight" frameborder="0" @load="iframeLoad"></iframe>
    </div>
</template>
<script>
import json from '@/datas/files.json'
const datas = json.list;

export default {
    name: 'Detail',
    data() {
        return {
            iframeSrc: `${this.$route.query.link}`,
            iframeHeight: window.innerHeight,
            loadingShow: true
        }
    },
    mounted() {
        console.log(this.$route.params)
    },
    watch: {
        iframeHeight() {
            this.iframeHeight = this.setIframeHeight();
        }
    },
    methods: {
        iframeLoad() {
            this.iframeHeight = this.setIframeHeight();
            this.loadingShow = false;
        },
        setIframeHeight() {
            return this.$refs.examples.contentDocument.body.scrollHeight;
        }
    }
}
</script>
<style>
.loading {
    padding: 50px 20px;
    text-align: center;
}
</style>
