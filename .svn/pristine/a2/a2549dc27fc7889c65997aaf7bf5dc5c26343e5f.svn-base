import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations.js'
import actions from './actions.js'
import getters from './getters.js'

Vue.use(Vuex)

const state = {
    articleInfo: null, //图文模板信息
    articleTempList: null, //图文模板列表
    currentType: "myAnimation", //目前的类型：myAnimation、myArticle、myVedio
    articleUserInfo: null, //图文用户信息
    eleTemplate: {
        id: '',
        title: '',
        desc: '',
        pic: 'http://yxbsve.mmarket.com/Uploads/default_thum.jpg',
        account: '',
        url: '',
        priority: 0,
        content: "",
        css: {
            top: 0,
            left: 0,
            zIndex: 6,
            width: 150,
            height: 150
        },
        properties: {
            width: 150,
            height: 150,
            src: '',
            replacement: true,
            id: 798,
            imgStyle: {
                width: 150,
                height: 150,
                backgroundPositionX: "0",
                backgroundPositionY: "0",
                backgroundSizeX: "100%",
                backgroundSizeY: "100%"
            }
        },
        sceneId: '',
        type: 4
    },
    settingInfo: null,//设置信息
    currentPanel: [],//当前全屏弹窗面板
    userInfo: {
        "headPortrait": require('@src/images/transparent.png'),
        "nickname": "",
        "account": "",
        "token": "",
        "sex": "0",
        "subscribe": 1,
        "openid": "",
        "language": "zh_CN",
        "city": "",
        "province": "",
        "country": "",
        "subscribe_time": '',
        "unionid": "",
        "remark": "",
        "groupid": 0,
        "tagid_list": [],
        "subscribe_scene": "",
        "qr_scene": 0,
        "qr_scene_str": "",
        "access_token": "12_sTbxvdFwY4lq0lAXTNXzjyoauwtBN7OXgUI-g8s_nQ8uuAoxPY-2HQSaeR91z5_2UFOgvmpkNt1NwB5h5ZvDoJkjcpDAB67CXlSE6sImjGDy2iBH40ksVv_ojmrRU2esybaiqbwn4_oXvzoHIQFeAJAXFU"
    },//用户信息(包括头像、昵称、电话号码)
}

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})