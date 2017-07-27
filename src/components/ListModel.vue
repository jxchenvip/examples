<template>
    <div class="indexList">
        <h2><strong>{{categoryUpper}} <span>DEMOS({{size}})</span></strong></h2>
        <ul :key="1">
            <transitionGroup name="fade">
                <li v-for="item in lists" :key="item">
                    <a href="javascript:;" class="arrow" @click="toLink(item)">
                        {{item.basename}} <sup>{{item.category | toUpperCase}}</sup>
                        <span class="time">{{item.changeTime | time }}</span>
                    </a>
                </li>
            </transitionGroup>
        </ul>
        <!-- <transition name="fade">
            <p v-show="showTips">敬请期待</p>
        </transition> -->
        <slot>
        </slot>
    </div>
</template>
<script>
import json from '@/datas/files.json'
const datas = json.list;
const PATH = json.path === 'dev' ? 'docs' : 'examples';

export default {
    name: 'listModel',
    data() {
        return {
            lists: [],
            speed: 50,
            showTips: false
        }
    },
    computed: {
        categoryUpper() {
            var name = this.$route.path.split('/')[1];
            if (name.toUpperCase() == 'INDEX') {
                name = 'ALL'
            }
            return name.toUpperCase();
        },
        size() {
            return this.lists.length;
        }
    },
    mounted() {
        this.showLists();
    },
    watch: {
        $route() {
            this.showTips = false;
            this.lists = [];
            this.showLists();
        }
    },
    methods: {
        toLink(item) {
            this.$router.push({
                path: `/${item.category}/Detail`,
                query: {
                    link: `/${PATH}/examples/${item.link}`
                },
                name: `/${item.category}/Detail`,
                params: item
            });
        },
        showLists() {
            var newDatas = [];

            newDatas = datas.filter((item) => {
                var cat = item.category.toUpperCase();
                if (this.categoryUpper == 'ALL') {
                    return true;
                }
                return cat === this.categoryUpper;
            });

            newDatas.sort(function(a, b) {
                return b.birthtime - a.birthtime;
            })

            newDatas.forEach((item, index) => {
                var timer = setTimeout(() => {
                    this.lists.push(item);
                    timer = null;
                }, index * this.speed)
            });

            var timer = setTimeout(() => {
                this.showTips = true;
                timer = null;
            }, newDatas.length * this.speed);
        }
    }
}
</script>
<style scoped>
a {
    text-decoration: none;
}

.fade-enter-active,
.fade-leave-active {
    transition: all .5s;
    transform: translate(0, 0) translateZ(0);
}

sup {
    display: inline-block;
    margin: 0 5px;
    transform: scale(0.6, 0.6);
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
    transform: translate(-100%, 0) translateZ(0);
}


/*indexList S*/

.arrow {
    display: block;
    position: relative;
    padding-right: 20px;
}

.arrow::after {
    content: '';
    position: absolute;
    top: 50%;
    margin-top: -0.5em;
    width: 1em;
    height: 1em;
    right: 10px;
    border-right: 1px solid #e1e1e1;
    border-bottom: 1px solid #e1e1e1;
}

.indexList ul {
    padding: 10px;
    list-style: none;
}

.indexList h2 {
    color: #f80;
    padding: 20px;
    text-align: center;
}

.indexList h2 strong {
    position: relative;
}

.indexList h2 strong::before {
    content: '';
    position: absolute;
    bottom: -10px;
    left: -20px;
    right: -20px;
    height: 1px;
    background-color: #f0f8fc;
}

.indexList h2 span {
    color: #999;
}

.indexList li {
    position: relative;
}

.indexList li::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    height: 2px;
    width: 2px;
    margin-top: -1px;
    border-radius: 200%;
    background-color: #d7d7d7;
}

.indexList li a {
    display: block;
    padding: 15px 30px 15px 1em;
    font-size: 16px;
    border-bottom: 1px solid #f7f7f6;
    color: #777;
}

.indexList li a:hover {
    color: #f80;
}

.indexList li .time {
    float: right;
    color: #d7d7d7;
}

.indexList li:nth-child(odd) {
    background-color: #fefefe;
}

.indexList p {
    padding: 50px 0;
    text-align: center;
    color: #999;
}

.arrow::after {
    transform: rotate(-45deg);
}
</style>
