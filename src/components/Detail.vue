<template>
    <div class="indexList">
        <div class="loading" v-show="loadingShow">努力加载中...</div>
        <iframe ref="examples" name="examples" :src="iframeSrc" scrolling="no" width="100%" :height="iframeHeight" frameborder="0" @load="iframeLoad"></iframe>
    </div>
</template>
<script>
import {
    bus
} from '@/store/bus.js'
var iframeHeight = 0;

bus.$on('menuHeight', function(hs) {
    iframeHeight = hs.iframeHeight;
})

export default {
    name: 'Detail',
    data() {
        return {
            iframeSrc: `${this.$route.query.link}`,
            iframeHeight: window.innerHeight,
            loadingShow: true
        }
    },
    computed: {
        newIframeHeight() {
            return iframeHeight;
        }
    },
    mounted() {
        this.iframeHeight = iframeHeight - 4;
        console.log(this.iframeHeight)
    },
    methods: {
        iframeLoad() {
            this.loadingShow = false;
            this.iframeHeight = this.setIframeHeight();
        },
        setIframeHeight() {
            var ih = this.iframeHeight,
                wh = this.$refs.examples.contentDocument.body.scrollHeight;
            return Math.max(ih, wh);
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
