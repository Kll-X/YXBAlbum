<template>
    <div>
        <div class="previewCom">
            <div class="previewWrapper">
                <article-parser-com :article-data="articleInfo" :user-data="userInfoOri"></article-parser-com>
            </div>

        </div>
        <div class="fixedCom">
            <div class="imgEditBarCom" v-show="fixedComFlag == 0">
                <div class="item">
                    <div class="editBtn" @click="edit"></div>
                </div>
                <div class="item">
                    <div class="musicBtn" @click="changeMusic"></div>
                </div>
                <div class="item">
                    <div class="templateBtn" @click="showTempCom"></div>
                </div>
                <div class="item">
                    <div class="borderBtn" @click="showBorderCom"></div>
                </div>
            </div>
            <div class="nextStepBar">
                <div class="draftBtn" @click="draftBtnHandler">存草稿</div>
                <div class="nextStepBtn" @click="showSettingPanel">发布</div>
            </div>

            <div class="tempCom" v-show="fixedComFlag == 1">
                <div class="completeBtn" @click="tempDoneBtnHandler">
                    <div class="completeBtnTxt">
                        <img src="../../../images/ok.png">
                        &nbsp;完成
                    </div>
                </div>
                <div class="mask"></div>
                <div class="temListContainer">
                    <img class="tempListImg" :class="{active:temListIndex == index}" :key="index"
                         v-for="(n,index) in tempList" :src="n.src" @click="templateChange(index)"/>
                </div>
            </div>

            <div class="tempCom" v-show="fixedComFlag == 2">
                <div class="completeBtn" @click="borderDoneBtnHandler">
                    <div class="completeBtnTxt">
                        <img src="../../../images/ok.png">
                        &nbsp;完成
                    </div>
                </div>
                <div class="mask"></div>
                <div class="borderListContainer">
                    <img class="borderListImg" :class="{active:borderListIndex == index}" :key="index"
                         v-for="(n,index) in borderList" :src="fixedSrc(n)" @click="borderChange(index)"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    // import "../../css/articleTemp.css"
    // import {articleParser} from '../../../lib/articleTempParser.js'
    import * as utils from "@lib/utils.js";
    import * as ajax from "@lib/ajax.js"
    import * as articleTools from "@lib/articleTools.js"
    import {getOpenId} from "@src/lib/platformAPI";
    import articleParserCom from "./articleParser.vue"
    import messageBus from '@components/messageBus.js';
    import bgMusicSetting from '@components/bgMusic/bgMusicSetting.vue'
    import setting from "../../setting/setting.vue"
    import imgEditPage from  "@editMode/imgEditPage.vue"
    import {mapState, mapMutations,mapActions} from 'vuex'
    import Vue from 'vue'
    export default {
        props: ['articleData', 'userData', 'coverImage', 'listLen', 'orgTempId'],
        data: function () {
            return {
                articleInfo: {},
                userInfoOri: {},
                ele: {},
                fixedComFlag: 0,
                tempComFlag: false, //控制选择模板的显示
                borderComFlag: false,
                temListIndex: 1000,
                borderListIndex: 1000,
                tempId: function (index) {
                    if (_DEV_) {
                        return this.testId[index];
                    } else {
                        return this.lineId[index];
                    }
                },
                setting: '',
                imgEleDef: {}
            }
        },
        components: {
            imgEditPage,
            articleParserCom,
            bgMusicSetting,
            setting,
        },
        methods: {
            ...mapMutations([
                'CURRENT_PANEL',
                'SETTING_INFO'
            ]),
            ...mapActions([
                'getArticleTempList'
            ]),
            init(){
                this.articleInfo = $.extend(true, {}, this.articleData);
                this.userInfoOri = $.extend(true, {}, this.userData);
                // this.CURRENT_PANEL([])
            },
            editTemplate(){
                this.$router.push({
                    name: 'middlePage',
                    params: {id: this.$route.params.id, nextRouterName: "articleEdit"}
                });
            },
            edit(){
                this.CURRENT_PANEL("")
            },
            showTempCom(){
                if (!this.articleInfo.list[0].properties) {
                    this.articleInfo.list[0].properties = {};
                }
                if (this.articleInfo.list[0].properties.mode != undefined) {
                    this.temListIndex = this.articleInfo.list[0].properties.mode;
                }else if(this.orgTempId){
                    for (let i in this.tempList) {
                        if (this.orgTempId == this.tempList[i].id) {
                            this.temListIndex = i;
                            break;
                        }
                    }
                }
                this.fixedComFlag = 1;
                Vue.nextTick(function () {
                    $(".tempListImg.active")[0] && $(".tempListImg.active")[0].scrollIntoView();
                })
            },
            tempDoneBtnHandler(){
                let self = this;
                if (!this.articleInfo.list[0].properties) {
                    this.articleInfo.list[0].properties = {};
                }
                this.articleInfo.list[0].properties.mode = this.temListIndex;
                // this.imgEditBarFlag = true;
                this.fixedComFlag = 0;
                messageBus.$emit("articleModeChanged", {
                    data: self.articleInfo
                })
            },
            showBorderCom(){
                this.fixedComFlag = 2;
            },
            borderDoneBtnHandler(){
                let self = this;
                this.fixedComFlag = 0;
                messageBus.$emit("articleBorderChanged", {
                    data: self.articleInfo
                })
            },
            sync(target) {
                if (target.paused) {
                    $('.musicStatusCtrlBtn').removeClass("musicActive");
                } else {
                    $('.musicStatusCtrlBtn').addClass("musicActive");
                }
            },
            stopMusic(){
                let self = this;
                let audio = $('#audio')[0];
                let audio1 = $('#audio1')[0];
                if (utils.isIos()) {
                    if (audio1) {
                        audio1.pause();
                        self.sync(audio1);
                    }
                } else {
                    if (audio) {
                        audio.pause();
                        self.sync(audio);
                    }
                }
            },
            changeMusic(){
                let self = this;

                //因图文网页结构不一样,单独处理背景设置页与全局背景音乐同时播放问题
                if(self.$route.fullPath.indexOf('articleEdit') >-1){
                    //点击背景音乐按钮,先停止全局背景音乐
                    self.stopMusic();
                }


                this.CURRENT_PANEL({popupName:"musicSetting",templateData:self.articleData})
            },
            templateChange(index){
                if (index == this.temListIndex) {
                    return;
                }
                this.temListIndex = index;
                if(index == 0){
                    //默认第一个是空白模板
                    this.articleInfo.list[0].elements.forEach(function (item) {
                        if(item.type == 4){
                            item.properties.src = "";
                        }
                    }) ;
                    return;
                }
                let self = this;
                let id;
                id = this.tempList[index].id;
                let mark = {};
                messageBus.$emit('globalLoadCover', {
                    status: true,
                    mark: mark
                });
                ajax.templateAjax(id).then(function (data) {
                    messageBus.$emit('globalLoadCover', {
                        status: false,
                        mark: mark
                    });
                    messageBus.$emit('tipCoverShow', {
                        status: 2,
                        desc: ['模板替换成功'],
                        icon: "check",
                        interval: 1000,
                        style:{
                            tipDescPadding:'0 0.32rem 0.4rem'
                        }
                    });
                    let styleEle = data.list[0].elements;
                    if (styleEle.length == 0) {
                        self.articleInfo.list[0].elements = [];
                    } else {
                        let sceneId = self.articleInfo.list[1].elements[0].sceneId;
                        let pageId = self.articleInfo.list[1].elements[0].pageId;
                        self.articleInfo.list[0].elements = styleEle.slice(0);
                        // self.articleInfo.list[0].elements = [];
                        for (let item of self.articleInfo.list[0].elements) {
                            item.sceneId = sceneId;
                            item.pageId = pageId;
                        }
                    }
                }).catch(function () {
                    messageBus.$emit("tipCoverShow", {
                        status: 2,
                        desc: ['后台服务器繁忙', '请刷新重试'],
                        icon: 'times',
                        style:{
                            tipDescPadding:'0 0.32rem 0.4rem'
                        }
                    });
                })
            },
            borderChange(index){
                if (index == this.borderListIndex) {
                    return;
                }
                this.borderListIndex = index;
                let styleObj;
                styleObj = articleTools.getArticleStyle(this.articleInfo.list[0]);
                this.articleInfo.list[0].elements.find(function(item){
                    return item.id == styleObj.borderImgEle.id
                }).properties.src = this.borderList[this.borderListIndex];
            },
            draftBtnHandler(){
                this.save();
            },
            showSettingPanel(){
                this.CURRENT_PANEL({popupName:"setting"})
            },
            save(publishFlag){
                let self = this;

                function loadStart(mark) {
                    messageBus.$emit('globalLoadCover', {
                        mark: mark,
                        status: true
                    });
                }

                function loadEnd(mark, cb) {
                    messageBus.$emit('globalLoadCover', {
                        mark: mark,
                        status: false,
                        afterLastAsyncCb: cb || ''
                    });
                }

                function gotoMyWorks() {
                    self.CURRENT_PANEL([]);
                    self.$router.push({path: '/index/mine/myArticle'})
//                     self.$router.push({name:"mine",query:{content:"article"}})
                }

                //场景设置信息保存到java
                function saveArticleSetting(resolve, reject) {
                    let openId = getOpenId();
                    // let coverImagePer={};
                    // if(self.articleInfo.list[0].properties&& self.articleInfo.list[0].properties.bannerCutFlag == false){
                    //     coverImagePer={
                    //         imagePer: "100"
                    //     }
                    // }
                    ajax.saveArticleSetting({
                        photoId: self.articleInfo.obj.id,
//                        account: openId,
                        account: self.userInfo.account,
                        name: self.settingInfo.title,
                        describe: self.settingInfo.desc ? self.settingInfo.desc : '',
                        coverImage: self.settingInfo.pic,
                        // coverImagePer:JSON.stringify(coverImagePer),
                        url: window.location.href.split('?')[0],
                        type: 1
                    }).then(function (data) {
                        data = utils.processReturnObj(data);
                        if (data.resultCode === 0) {
                            resolve();
                        } else {
                            reject();
                        }
                    })
                }

                //场景具体内容信息保存到php
                function completedAndsaveSceneDetail(resolve, reject) {
                    saveSceneDetail(resolve, reject);

                    function saveSceneDetail(resolve, reject) {
                        ajax.saveSceneDetail({
                            method: "c=scene&a=savepagepic",
                            data: JSON.stringify({
                                "data": self.articleInfo.list,
                                "openid": getOpenId(),
                                "num": self.listLen //原本的场景list长度，不可以随意更改
                            })
                        }).then(function (data) {
                            data = utils.processReturnObj(data);
                            data.data = utils.processReturnObj(data.data);
                            if (data.data.success === true) {
//                                console.log("场景具体内容信息成功保存到java");
//                                loadEnd(mark);
                                resolve();
                            } else {
//                                alert("场景具体内容信息保存失败!");
                                reject();
                            }
                        });
                    }
                }

                let mark = {};
                loadStart(mark);
                const save = new Promise(function (resolve, reject) {
                    completedAndsaveSceneDetail(resolve, reject);
                })
                    .then(function () {
                        return new Promise(function (resolve, reject) {
                            saveArticleSetting(resolve, reject);
                        })
                    })
                    .then(function () {
                        if(publishFlag){
                            ajax.publish({
                                photoId:self.articleInfo.obj.id
                            }).then(function(){
                                loadEnd(mark, gotoMyWorks);
                            });
                        }else{
                            loadEnd(mark, gotoMyWorks);
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                        messageBus.$emit('globalLoadCoverSimple');
                        // tip ‘保存出错，请重试’
                        messageBus.$emit("tipCoverShow", {
                            status: 2,
                            desc: ['保存出错', '请稍后重试'],
                            icon: 'times',
                            style:{
                                tipDescPadding:'0 0.32rem 0.4rem'
                            }
                        })
                    })
            },
            getSettingInfo() {
                let self = this;
                self.setting.title = self.userInfoOri.name;
                self.setting.pic = self.setting.properties.src = self.userInfoOri.coverImage;
                self.setting.desc = self.userInfoOri.desc;
                self.SETTING_INFO(self.setting);
            },
            fixedSrc(src){
                return PREFIX_FILE_HOST + src;
            }

        },
        created: function () {
            this.init();
            this.ori_title = document.title;
            document.title = '预览';
        },
        mounted: function () {
            this.getArticleTempList();
            let self = this;
            self.setting = $.extend({},self.eleTemplate);
            this.getSettingInfo();
            messageBus.$on('routeToEdit', function (info) {
                self.$router.push({path: '/articleEdit/' + info.id, query: {imagesInformation: info.imagesInformation}})
            });
            messageBus.$on("settingConfirm", function () {
                if (!self.settingInfo.title) {
                    messageBus.$emit("tipCoverShow", {
                        status: 1,
                        desc: ['请填写标题'],
                        icon: 'times',
                        style:{
                            tipDescPadding:'0 0.32rem 0.4rem'
                        },
                        btns: [
                            {
                                text: '确定',
                                btnCallBack: function () {
                                    messageBus.$emit("tipCoverShow", {
                                        status: 0
                                    });
                                }
                            }
                        ]
                    });
                    return
                } else {
                    self.save(true);
                }
            });

        },
        beforeDestroy: function () {
            messageBus.$off(['routeToEdit', 'settingConfirm', 'settingConfirm', 'settingImgUpOK', 'editImgEleDef_toImgEditPage']);
        },
        computed: {
            tempList(){
                if(!this.articleTempList) return [];
                let arr=[],list = this.articleTempList.slice(0).reverse()
                for(let item of list){
                    arr.push({src:item.picture,id:item.id});
                }
                return arr;
            },
            borderList(){
                if(_DEV_){
                    return [
                        "pic/59/201802/5a7fe0b615f5d.png",
                        "pic/59/201802/5a7fe7aa0671b.png",
                        "pic/59/201802/5a7fe0b615f5d.png",
                        "pic/59/201802/5a7fe7aa0671b.png",
                    ];
                }else{
                    return [
                        "pic/3/201902/5c665bb06eeb8.png",
                        "pic/3/201806/5b31d657c94ab.png",
                        "pic/3/201806/5b30b3cf1fd19.png",
                        "pic/3/201806/5b30ac1c0cf55.png",
                        "pic/3/201806/5b30aa8db46af.png",
                    ];
                }
            },
            ...mapState([
                'currentPanel',
                'settingInfo',
                'eleTemplate',
                'articleTempList',
                'userInfo'
            ])
        },
        watch: {
            articleData: {
                handler: function () {
                    this.init();
                },
                deep: true
            }
        },

    }
</script>

<style scoped lang="less">
    .previewCom {
        /*overflow-y: scroll;*/
        overflow-x: hidden;
        width: 100%;
    }

    .fixedCom{
        position: fixed;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
    }
    .imgEditBarCom {
        position: absolute;
        bottom: 50px;
        left: 0;
        height: 10vh;
        width: 100%;
        .item {
            float: left;
            width: 25%;
            height: 100%;
            position: relative;
        }
    }
    .nextStepBar {
        position: absolute;
        bottom: 10px;
        left: 0;
        width: 100%;
        height: 40px;
        z-index: 100;
        display: flex;
        align-items: center;
        justify-content: space-around;
        .draftBtn, .nextStepBtn {
            width: 25%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
            background-color: #0080cc;
            border-radius: 5px;
        }
    }

    .previewWrapper {
        width: 100%;
        /*height: 100%;*/
    }

    .useTxt {
        position: fixed;
        bottom: 0;
        left: 30%;
        width: 40%;
        height: 40px;
        z-index: 100;
        background-image: url("../../../images/btnBg.png");
        background-size: 100% 100%;
        .useImg {
            width: 40%;
            height: 100%;
            float: left;
        }
        img {
            margin: 4px auto;
            height: 70%;
            display: table;
        }
        .txt {
            line-height: 40px;
            color: white;
            font-size: 16px;
            font-family: Microsoft YaHei;
            float: left;
            width: 60%;
        }
    }

    .editBtn {
        background: url("../../../images/preview_edit.png") center center no-repeat;
    }

    .musicBtn {
        background: url("../../../images/preview_music.png") center center no-repeat;
    }

    .templateBtn {
        background: url("../../../images/preview_template.png") center center no-repeat;
    }

    .borderBtn {
        background: url("../../../images/preview_border.png") center center no-repeat;
    }

    .editBtn, .musicBtn, .templateBtn,.borderBtn {
        position: absolute;
        background-size: contain;
        height: 70%;
        top: 15%;
        width: 40%;
        left: 30%;
    }

    .tempCom {
        position: absolute;
        width: 100%;
        height: 2rem;
        bottom: 0;
        z-index: 100;
    }

    .completeBtn {
        position: absolute;
        right: 10px;
        top: -40px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        border-radius: 6px;
        font-size: 14px;
        width: 80px;
        color: white;
    }

    .completeBtnTxt {
        position: absolute;
        width: 100%;
        border-radius: inherit;
        background: #333333;
        opacity: 0.6;
        -moz-opacity: 0.6;
        height: 100%;
    }

    .completeBtnTxt img {
        height: 40%;

    }

    /*.completeBtnTxt::before{*/
    /*content: "\2714";*/
    /*}*/
    .temListContainer,.borderListContainer {
        height: 100%;
        width: 100%;
        overflow-x: scroll;
        white-space: nowrap;
        position: absolute;
    }

    .tempListImg,.borderListImg {
        height: 1.6rem;
        margin: .2rem 0.08rem;
        display: inline-block;
        vertical-align: middle;
    }

    .tempListImg.active,.borderListImg.active {
        height: 1.8rem;
        margin: 0.1rem 0.08rem;
        border: 0.1rem solid #7ecef4;
        box-shadow: 0 0 20px black;
    }

    .mask {
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: inherit;
        background-color: #676767;
        /*filter: alpha(opacity = 60);*/
        /*opacity: 0.6;*/
        /*-moz-opacity: 0.6;*/
    }
</style>
