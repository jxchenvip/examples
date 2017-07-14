import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Javascript from '@/components/Javascript'
import Canvas from '@/components/Canvas'
import Css3 from '@/components/Css3'
import Html5 from '@/components/Html5'
import Detail from '@/components/Detail'
import Pano2vr from '@/components/Pano2vr'
import React from '@/components/React'
import Vvue from '@/components/Vue'
import ListModel from '@/components/ListModel.vue'
import routes from '@/datas/files.json'

Vue.use(Router)

let routerConfig = {
    // mode: 'history',
    routes: [{
            path: '/Index',
            name: 'ALL',
            component: ListModel,
        }, {
            path: '*',
            redirect: '/Index'
        }
        /*,{
               path: '/Javascript',
               name: 'Javascript',
               component: Javascript
           }, {
               path: '/Canvas',
               name: 'Canvas',
               component: Canvas
           }, {
               path: '/Css3',
               name: 'Css3',
               component: Css3
           }, {
               path: '/Html5',
               name: 'Html5',
               component: Html5
           }, {
               path: '/Detail',
               name: 'Detail',
               component: Detail
           }, {
               path: '/Pano2vr',
               name: 'Pano2vr',
               component: Pano2vr
           }, {
               path: '/React',
               name: 'React',
               component: React
           }, {
               path: '/Vue',
               name: 'Vue',
               component: Vvue
           }*/
    ]
};

Object.keys(routes.category).forEach(function(item) {
    routerConfig.routes.push({
        path: `/${item}`,
        name: item,
        component: ListModel
    }, {
        path: `/${item}/Detail`,
        component: Detail
    });
})
console.log(routerConfig)
export default new Router(routerConfig)
