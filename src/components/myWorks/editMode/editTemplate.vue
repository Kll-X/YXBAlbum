<!--suppress ALL -->
<template>
    <!--<div v-if="currentPanel.length === 0" style="position: relative;">-->
    <div style="position: relative;">
        <div style="height: 0%;border: none;">
        </div>
        <div class="page-content" ref="pageContent">
            <pages
                    class="pages"
                    :templateData="templateData"
                    :imagesInformation="imagesInformation"
            ></pages>
            <!--<bg-music-ctrl :template-data='templateData'></bg-music-ctrl>-->
        </div>

        <div class="common-edit" :class="[{'common-edit-text':currentBar === 'textBar'}]" v-if="currentBar === 'commonBar' || currentBar === 'imgBar' ||currentBar === 'textBar'">
            <transition name="rise">
                <common-bar v-if="currentBar === 'commonBar'"  :imgSum="imgSum"></common-bar>
            </transition>
            <transition name="rise">
                <img-bar v-if="currentBar === 'imgBar'" :eleDefId="imgEleDef.id"></img-bar>
            </transition>
            <transition name="rise_text">
                <text-bar v-if="currentBar === 'textBar' " :eleDef="textEleDef"></text-bar>
            </transition>
        </div>
    </div>
    <!--<div v-else-if="currentPanel[0].popupName === 'singlePageTemplates'">-->
    <!--<single-page-templates :oriTemplateData="oriTemplateData"-->
    <!--:tagsInfo="tagsInfo"></single-page-templates>-->
    <!--</div>-->
    <!--<div v-else-if="currentPanel[0].popupName === 'bgReplace'">-->
    <!--<bg-replace :bgTagsInfo="bgTagsInfo"></bg-replace>-->
    <!--</div>-->
    <!--<div v-else-if="currentPanel[0].popupName === 'musicSetting'">-->
    <!--<bg-music-setting :templateData="templateData"></bg-music-setting>-->
    <!--</div>-->
    <!--<div v-else-if="currentPanel[0].popupName === 'imgEditPage'"-->
    <!--style="background:#000;position: fixed;width: 100vw;height:100vh;z-index:145;left: 0;top: 0;">-->
    <!--<img-edit-page :eleDef="imgEleDef"></img-edit-page>-->
    <!--</div>-->
</template>
<script>
    import setting from '../../../components/setting/setting.vue'
    import singlePageTemplates from './singlePageTemplates/singlePageTemplates.vue'
    import bgReplace from './bgReplace/bgReplace.vue'
    import bgMusicSetting from '../../bgMusic/bgMusicSetting.vue';
    import pages from './pages.vue';
    import commonBar from './editToolBar/commonBar.vue';
    import imgBar from './editToolBar/imgBar.vue';
    import textBar from './editToolBar/textBar.vue';
    import imgEditPage from './imgEditPage.vue';
    import messageBus from "../../messageBus";
    import * as utils from "../../../lib/utils.js";
    import * as ajax from "../../../lib/ajax.js";
    import {getOpenId} from "@src/lib/platformAPI";
    import {replaceImages} from '../../../lib/smartPages';
    import bgMusicCtrl from "./../../bgMusic/bgMusicCtrl.vue";
    import myWorksView from "@components/myWorks/myWorksView.vue";
    import {mapState, mapMutations} from 'vuex'

    export default {
        data: function () {
            return {
                templateData: {},
                oriTemplateData: {},
                imagesInformation: {localIds: [], serverIds: [], sceneId: ''},
                currentBar: 'commonBar',
                showMusicSetting: false,
                imgEleDef: null,
                textEleDef: null,
                setting: '',
                coverPreUrl: PREFIX_FILE + 'Uploads/',
                // 保存滚动位置,替换完图片后恢复到这个位置
                scrollTop: 0,
                // 是否提示按再次按保存按钮
                trySave: false,
//              将在后面插入页面的pageId
                targetPageId: '',
                //将在后面插入页面的pageIndex
                targetPageIndex: 0,
                //弹出页面模板库的模式记录
                usePageTemplateMode: 'insert',   //insert | instead
                // imgSum:0,
                tagsInfo: [{
                    typeCode: 0,
                    title: '原图',
                    list: [],
                    pageNo: 1,
                    totalPage: 1,
                }, {
                    typeCode: 2001,
                    title: '一图',
                    list: [],
                    pageNo: 1,
                    totalPage: 1
                }, {
                    typeCode: 2002,
                    title: '二图',
                    list: [],
                    pageNo: 1,
                    totalPage: 1
                }, {
                    typeCode: 2003,
                    title: '三图',
                    list: [],
                    pageNo: 1,
                    totalPage: 1
                }, {
                    typeCode: 2004,
                    title: '四图',
                    list: [],
                    pageNo: 1,
                    totalPage: 1
                }],

                bgTagsInfo: [{
                    typeCode: 0,
                    title: '全部',
                    list: [],
                    pageNo: 1,
                    totalPage: 1,
                }, {
                    typeCode: 201,
                    title: '扁平',
                    list: [],
                    pageNo: 1,
                    totalPage: 1
                }, {
                    typeCode: 202,
                    title: '复古',
                    list: [],
                    pageNo: 1,
                    totalPage: 1
                }, {
                    typeCode: 203,
                    title: '简约',
                    list: [],
                    pageNo: 1,
                    totalPage: 1
                }, {
                    typeCode: 204,
                    title: '清新',
                    list: [],
                    pageNo: 1,
                    totalPage: 1
                }, {
                    typeCode: 205,
                    title: '商务',
                    list: [],
                    pageNo: 1,
                    totalPage: 1
                }, {
                    typeCode: 206,
                    title: '手绘',
                    list: [],
                    pageNo: 1,
                    totalPage: 1
                }]
            }
        },
        watch: {
            currentPanel: function (newVal, oldVal) {
                console.log(newVal, oldVal);
                if (newVal.length > 0) {
                    this.stopIosBgmusic();
                }
                if (newVal.length === 0) {
                    document.title = '编辑';
                } else if (newVal[0].popupName === 'singlePageTemplates' && this.usePageTemplateMode === 'insert') {
                    document.title = '添加页面';
                } else if (newVal[0].popupName === 'singlePageTemplates' && this.usePageTemplateMode === 'replace') {
                    document.title = '替换页面';
                } else if (newVal[0].popupName === 'bgReplace') {
                    document.title = '替换背景';
                }

                if (newVal.length === 0) {
                    messageBus.$emit('uneffect_modifyTemplateData', false);
                    messageBus.$emit("scrollToPosition");
                    if (this.trySave) {
                        if (this.settingInfo.title) {
                            messageBus.$emit("saveScene");
                        } else {
                            messageBus.$emit("tipCoverShow", {
                                status: 2,
                                desc: ["点击保存按钮"],
                                interval: 1500
                            });
                        }
                        this.trySave = false;
                    }
                }
            }
        },
        computed: {
            ...mapState([
                'currentPanel',
                'settingInfo',
                'eleTemplate',
                'currentType',
                'userInfo'
            ]),
            imgSum(){
                //可传图片张数限制初始化
                let self = this;
                // console.log(self.templateData,self.templateData.list);
                    if(self.templateData && self.templateData.list){
                        let imgSum = 0;
                        self.templateData.list.forEach(function (page, p_idx) {
                            page.elements.forEach(function (ele, e_idx) {
                                if (4 == ele.type && ele.properties.replacement === true) {
                                    imgSum++
                                }
                            })
                        });
                        return imgSum
                    }else{
                        return 0
                    }
            }
        },
        created(){
            console.log(this.$route.params.id)
        },
        mounted: function () {
            let self = this;


            self.setting = $.extend({}, self.eleTemplate);
            self.SETTING_INFO(self.setting);

            self.getSettingInfo(self.$route.params.id);

            if (self.$route.params.imagesInformation) {
                self.imagesInformation = self.$route.params.imagesInformation;
            }

            self.imagesInformation.sceneId = self.$route.params.id;
            self.fetchData(self.$route.params.id)
                .then(function (data) {
                    // 处理图片
                    self.templateData = data;
                    self.templateData.list.forEach(function (page, index) {
                        let num = page.num = index + 1;
                        page.elements.forEach(function (item) {
                            item.num = num;
                            item.id = utils.getRandomId();
                        });

                        page.elements = utils.rearrangeZindex(page.elements);
                        page.elements = utils.rearrangePos(page.elements);
                        self.oriTemplateData = JSON.parse(JSON.stringify(data));
                    })
                    //场景标题初始化
                    self.setting.title = self.setting.title ? self.setting.title : self.templateData.obj.name.substring(3);
                    self.SETTING_INFO(self.setting);
                    //coverImg初始化
                    if (self.setting.priority < 1) {
                        self.setting.pic = self.setting.properties.src = self.coverPreUrl + self.templateData.obj.cover;
                        self.setting.priority = 1
                    }
                    self.SETTING_INFO(self.setting);


                    //bgMusic初始化
                    if (self.templateData.list[0].properties === null && self.templateData.obj.bgAudio !== "null") {
                        self.templateData.list[0].properties = {};
                        self.templateData.list[0].properties.bgAudio = JSON.parse(self.templateData.obj.bgAudio).url;
                    } else if (typeof self.templateData.list[0].properties === "string") {
                        let bgAudio = self.templateData.list[0].properties;
                        self.templateData.list[0].properties = {};
                        self.templateData.list[0].properties.bgAudio = bgAudio;
                    } else if (typeof self.templateData.list[0].properties === "object" && self.templateData.list[0].properties && self.templateData.list[0].properties.bgAudio) {
                        self.templateData.list[0].properties.bgAudio = self.templateData.list[0].properties.bgAudio
                    } else {
                        self.templateData.list[0].properties = {};
                        self.templateData.list[0].properties.bgAudio = ''
                    }

                    if (self.$route.params.imagesInformation) {
                        replaceImages(self.imagesInformation, self.templateData)
                    }
                    self.forceLoadEnd();

                    //可传图片张数限制初始化
                    // if(self.templateData && self.templateData.list){
                    //     self.imgSum = 0;
                    //     self.templateData.list.forEach(function (page, p_idx) {
                    //         page.elements.forEach(function (ele, e_idx) {
                    //             if (4 == ele.type && ele.properties.replacement === true) {
                    //                 self.imgSum++
                    //             }
                    //         })
                    //     });
                    // }
                })
                .catch(function (error) {
                    self.forceLoadEnd();
                });

            messageBus.$on("showTextBar", function (eleDef) {
                self.currentBar = "textBar";
                self.textEleDef = $.extend(true, {}, eleDef);
                self.$nextTick(function () {
                    if (self.currentPanel[0]) {
                        if (self.currentPanel[0].popupName !== "setting") {
                            self.scrollTop = self.$refs.pageContent.scrollTop;
                        }
                    }
                })
            });

            messageBus.$on("showImgBar", function (eleDef) {
                self.currentBar = "imgBar";

//                self.imgEleDef = $.extend(true, {}, eleDef);
                //todo 尝试把深拷贝换成引用，如果有问题，隔着挡板移动下面的元素的机制就有问题
                self.imgEleDef = eleDef;
                self.$nextTick(function () {
                    if (self.currentPanel.length > 0) {
                        if (self.currentPanel[0].popupName !== "setting") {
                            self.scrollTop = self.$refs.pageContent.scrollTop;
                        }
                    }
                })
            });

            // messageBus.$on("editImgEleDef_toImgEditPage", function (eleDef) {
            //     self.imgEleDef = $.extend(true, {}, eleDef);
            //     self.CURRENT_PANEL([{popupName: 'imgEditPage', eleDef: self.imgEleDef}])
            // });

            messageBus.$on("showImgEditPage", function () {
                self.CURRENT_PANEL([{popupName: 'imgEditPage', eleDef: self.imgEleDef}])
            });

            messageBus.$on("showCommonBar", function () {
                self.currentBar = "commonBar";
                self.textEleDef = null;
                self.imgEleDef = null;
            });

            messageBus.$on("scrollToPosition", function () {
                self.$nextTick(function () {
                    self.$refs.pageContent.scrollTop = self.scrollTop;
                })
            })

            messageBus.$on("saveScene", function () {
//              如果检测到没设置过场景名称，就弹出设置页面
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
                                        self.CURRENT_PANEL([{popupName: 'setting'}])

                                    }
                                }
                            ]
                        })

                        self.trySave = true;

                        return
                    }

                    function gotoMyWorks_ornot() {
                        messageBus.$emit('tipCoverShow', {
                            status: 1,
                            desc: ['保存成功，是否离开'],
                            icon: 'check',
                            style:{
                                tipDescPadding:'0 0.32rem 0.4rem'
                            },
                            btns: [
                                {
                                    text: '否',
                                    btnCallBack: function () {
                                        messageBus.$emit('tipCoverShow', {status: 0})
                                    }
                                }, {
                                    text: '是',
                                    btnCallBack: function () {
                                        messageBus.$emit('tipCoverShow', {status: 0});
                                        self.$router.push({path: '/index/mine/' + self.currentType})
                                    }
                                }
                            ]
                        })
                    }

                    function gotoMyWorksEditView_ornot() {
                        messageBus.$emit('tipCoverShow', {status: 0});
                        self.$router.push({
                            name: 'myWorksEditView',
                            params: {id: self.$route.params.id}
                        });
                    }

                    let mark = {};
                    self.loadStart(mark);

                    //场景设置信息保存到java
                    let saveSceneSetting = (resolve, reject) => {
                        if (self.currentType === 'animation' || self.currentType === 'myAnimation') {
                            ajax.saveSceneSetting({
                                photoId: self.templateData.obj.id,
                                account: self.userInfo.account,
                                name: self.settingInfo.title,
                                describe: self.settingInfo.desc ? self.settingInfo.desc : '',
                                coverImage: self.settingInfo.pic,
                                url: window.location.href.split('?')[0]
                            }).then(function (data) {
                                data = utils.processReturnObj(data);
                                if (data.resultCode === 0) {
                                    resolve();
                                } else {
                                    reject();
                                }
                            });
                        } else if (self.currentType === 'vedio' || self.currentType === 'myVedio') {
                            ajax.saveVedioSetting({
                                photoId: self.templateData.obj.id,
//                                account: getOpenId(),
                                account: self.userInfo.account,
                                name: self.settingInfo.title,
                                describe: self.settingInfo.desc ? self.settingInfo.desc : '',
                                coverImage: self.settingInfo.pic,
                                url: window.location.href.split('?')[0],
                                type: 2, //前端写死
                                coverImagePer: ""
                            }).then(function (data) {
                                data = utils.processReturnObj(data);
                                if (data.resultCode === 0) {
                                    resolve();
                                } else {
                                    reject();
                                }
                            });
                        }

                    }

                    //场景具体内容信息保存到php
                    let saveSceneDetail = (resolve, reject) => {
                        ajax.savaScene_detail({
                            method: "c=scene&a=savepagePhone",
                            data: JSON.stringify({
                                "data": self.templateData.list,
                                "openid": getOpenId(),
                                "num": self.templateData.list.length
                            })
                        }).then(function (data) {
                            data = utils.processReturnObj(data);

                            data.data = utils.processReturnObj(data.data);
                            if (data.data.success === true) {
                                resolve();
                            } else {
                                reject();
                            }
                        })
                    }


                    new Promise(saveSceneDetail).then(res => {
                        return new Promise(saveSceneSetting)
                    }).then(res => {
                        self.loadEnd(mark, gotoMyWorksEditView_ornot);
                    }).catch(function (err) {
                        messageBus.$emit('globalLoadCoverSimple');
                        messageBus.$emit("tipCoverShow", {
                            status: 2,
                            desc: ['保存出错', '请稍后重试'],
                            icon: 'times',
                            style:{
                                tipDescPadding:'0 0.32rem 0.4rem'
                            }
                        })
                    })

//                    function saveSceneSetting() {
//                        return ajax.saveSceneSetting({
//                            photoId: self.templateData.obj.id,
//                            account: getOpenId(),
//                            name: self.settingInfo.title,
//                            describe: self.settingInfo.desc ? self.settingInfo.desc : '',
//                            coverImage: self.settingInfo.pic,
//                            url: window.location.href.split('?')[0]
//                        })
//                    }
//
//                    function saveSceneDetail() {
//                        return ajax.savaScene_detail({
//                            method: "c=scene&a=savepagePhone",
//                            data: JSON.stringify({
//                                "data": self.templateData.list,
//                                "openid": getOpenId(),
//                                "num": self.templateData.list.length
//                            })
//                        })
//                    }
//
//                    async function save() {
//                        try {
//                            let sceneDetail = utils.processReturnObj(await saveSceneDetail());
//                            sceneDetail.data = utils.processReturnObj(sceneDetail.data);
//                            if (sceneDetail.data.success === true) {
//                                let sceneSetting = utils.processReturnObj(await saveSceneSetting());
//                                if (sceneSetting.resultCode === 0) {
//                                    loadEnd(mark, gotoMyWorks_ornot);
//                                } else {
//                                    throw 'sceneSetting.resultCode =' + sceneSetting.resultCode
//                                }
//                            } else {
//                                throw 'sceneDetail.resultCode =' + sceneDetail.resultCode
//                            }
//                        } catch (err) {
//                            messageBus.$emit('globalLoadCoverSimple');
//                            messageBus.$emit("tipCoverShow", {
//                                status: 2,
//                                desc: ['保存出错', '请稍后重试'],
//                                icon: 'times',
                                    // style:{
                                    //     tipDescPadding:'0 0.32rem 0.4rem'
                                    // }
//                            })
//                        }
//                    }
//
//                    save();
                }
            );
            messageBus.$on("imgPositionChanged", function (info) {
                let item = utils.iterateToFindItem(self.templateData, info);
                self.$set(item.properties.imgStyle,"backgroundPositionX",info.x);
                self.$set(item.properties.imgStyle,"backgroundPositionY",info.y);
                self.$set(item.properties.imgStyle,"backgroundSizeX",info.scaleX);
                self.$set(item.properties.imgStyle,"backgroundSizeY",info.scaleY);
                // item.properties.imgStyle.backgroundPositionX = info.x;
                // item.properties.imgStyle.backgroundPositionY = info.y;
                // item.properties.imgStyle.backgroundSizeX = info.scaleX;
                // item.properties.imgStyle.backgroundSizeY = info.scaleY;
            });

            messageBus.$on("itemTopLeftChanged", function (info) {
                let item = utils.iterateToFindItem(self.templateData, info);
                item.css.top = info.top;
                item.css.left = info.left;
            });

            messageBus.$on("itemDelete", function (info) {
                for (let page of self.templateData.list) {
                    for (let item of page.elements) {
                        if (info.id === item.id) {
                            let position = page.elements.indexOf(item);
                            page.elements.splice(position, 1);
                            return;
                        }
                    }
                }
            })

            messageBus.$on("imgSrcChanged", function (info) {
                let item = utils.iterateToFindItem(self.templateData, info);
                item.properties.src = info.src;
                item.properties.imgStyle.backgroundSizeX = null;
                item.properties.imgStyle.backgroundSizeY = null;
            });

            messageBus.$on("textChanged", function (info) {
                let item = utils.iterateToFindItem(self.templateData, info);
                item.content = info.content;
            });

            messageBus.$on("bgMusicChanged", function (info) {
                self.templateData.list[0].properties = info;
            });

            messageBus.$on("deleteOnePage", function (targetPageIndex, targetPageId) {
                let operateInfoObj = {
                    operateType: 'delete',
                    targetPageIndex: targetPageIndex,
                    targetPageId: targetPageId
                }
                self.operate_templateDataList(operateInfoObj);
                messageBus.$emit('tipCoverShow', {
                    status: 2,
                    desc: ['删除页面成功'],
                    interval: 500
                });
            });

            messageBus.$on("repalceOnePage", function (targetPageIndex, targetPageId) {
                self.targetPageId = targetPageId;
                self.targetPageIndex = targetPageIndex;
                self.usePageTemplateMode = 'replace';
                self.scrollTop = self.$refs.pageContent.scrollTop;
                self.CURRENT_PANEL([{
                    popupName: 'singlePageTemplates',
                    oriTemplateData: self.oriTemplateData,
                    tagsInfo: self.tagsInfo
                }])
            });

            messageBus.$on("insertOnePage", function (targetPageIndex, targetPageId, pageHeight) {
                self.targetPageId = targetPageId;
                self.targetPageIndex = targetPageIndex;
                self.usePageTemplateMode = 'insert';
                self.scrollTop = pageHeight*(targetPageIndex+1);
                self.CURRENT_PANEL([{
                    popupName: 'singlePageTemplates',
                    oriTemplateData: self.oriTemplateData,
                    tagsInfo: self.tagsInfo
                }])
            });

            messageBus.$on('usePageTemplate', function (templatePageData) {
                let operateInfoObj = {
                    operateType: self.usePageTemplateMode === 'insert' ? 'insert' : 'replace',
                    targetPageIndex: self.targetPageIndex,
                    targetPageId: self.targetPageId,
                    templatePageData: templatePageData
                }
                self.operate_templateDataList(operateInfoObj);
                messageBus.$emit('tipCoverShow', {
                    status: 2,
                    desc: self.usePageTemplateMode === 'insert' ? ['插入页面成功'] : ['替换页面成功'],
                    interval: 800
                });
            });

            messageBus.$on("bgReplace", function (targetPageIndex, targetPageId) {
                self.targetPageId = targetPageId;
                self.targetPageIndex = targetPageIndex;
                self.scrollTop = self.$refs.pageContent.scrollTop;
                self.CURRENT_PANEL([{popupName: 'bgReplace', bgTagsInfo: self.bgTagsInfo}])
            });

            messageBus.$on("useBgTemplate", function (bgSrc) {
                self.operate_templateDataList({
                    targetPageIndex: self.targetPageIndex,
                    targetPageId: self.targetPageId,
                    templatePageData: bgSrc,
                    operateType: 'bgReplace'
                });
                messageBus.$emit('tipCoverShow', {
                    status: 2,
                    desc: ['替换背景成功'],
                    interval: 1000
                });
            });

            messageBus.$on("update_tagsInfo", function (tempTagsInfo) {
                self.tagsInfo = tempTagsInfo
            });

            messageBus.$on("update_bgTagsInfo", function (tempBgTagsInfo) {
                self.bgTagsInfo = tempBgTagsInfo;
            });

            messageBus.$on("chooseMusic", function () {
                self.CURRENT_PANEL([{popupName: "musicSetting", templateData: self.templateData}])
            });

            messageBus.$on('batchChangeDone', function (imgs) {
//todo 解决批量更换图片
//                console.log('imgs',imgs);
                self.imagesInformation = imgs.imagesInformation;
                if (self.imagesInformation.ownUrls.length != 0) {
                    self.templateData.list.forEach(function (page, p_idx) {
                        page.elements.forEach(function (ele, e_idx) {
                            if (4 == ele.type && ele.properties.replacement === true) {
//                                console.log(e_idx,self.imagesInformation.ownUrls);
                                if (self.imagesInformation.ownUrls && self.imagesInformation.ownUrls.length) {
                                    ele.properties.src = self.imagesInformation.ownUrls.shift()
                                } else {
                                    return
                                }
                                console.log(ele);
                            }
                        })
                    });
                }

            });

            messageBus.$on('changeCurrentBar', function (status) {
                self.currentBar = status
            })
        },
        beforeDestroy: function () {
            messageBus.$off([
                "changeCurrentBar",
                "showTextBar",
                "showImgBar",
                "editImgEleDef_toImgEditPage",
                "showCommonBar",
                "scrollToPosition",
                "saveScene",
                "imgPositionChanged",
                "itemTopLeftChanged",
                "itemDelete",
                "imgSrcChanged",
                "textChanged",
                "bgMusicChanged",
                "deleteOnePage",
                "repalceOnePage",
                "insertOnePage",
                "usePageTemplate",
                "bgReplace",
                "useBgTemplate",
                "update_tagsInfo",
                "update_bgTagsInfo",
                "batchChangeDone"
            ]);
        },
        methods: {
            ...mapMutations([
                'CURRENT_PANEL',
                'CURRENT_TYPE',
                'SETTING_INFO',
            ]),
            loadStart(mark) {
                messageBus.$emit('globalLoadCover', {
                    mark: mark,
                    status: true
                });
            },

            loadEnd(mark, cb) {
                messageBus.$emit('globalLoadCover', {
                    mark: mark,
                    status: false,
                    afterLastAsyncCb: cb || ''
                });
            },
            forceLoadEnd() {
                messageBus.$emit('globalLoadCoverSimple');
            },
            fetchData(id) {
                let self = this;

                let mark = {};
                //  loadStart
                messageBus.$emit('globalLoadCover', {
                    status: true,
                    mark: mark
                });
                return ajax.templateAjax(id)
                    .then(function (data) {
                        if (data.success === true) {
                            //  loadEnd
                            if (data.obj && data.obj.property && utils.processReturnObj(data.obj.property).triggerPlayScene) {
                                self.CURRENT_TYPE("myVedio");
                            }
                            messageBus.$emit('globalLoadCover', {
                                status: false,
                                mark: mark
                            });
                            return data;
                        } else {
                            throw 1;
                        }
                    })
            },
            getSettingInfo(id) {
                let self = this;
                ajax.querySceneSetting({
                    'photoId': id
                }, true).then(function (data) {
                    data = utils.processReturnObj(data);
                    if (data.resultCode === 0) {
//                        console.log("场景设置信息查询成功");
                        self.setting.title = data.data.name;
                        self.setting.desc = data.data.describe;
                        //todo 这个地方priority的使用要写注释
                        if (self.setting.priority < 2) {
                            self.setting.pic = self.setting.properties.src = data.data.coverImage ? data.data.coverImage : "http://yxbsve.mmarket.com/Uploads/default_thum.jpg";
                            self.setting.priority = 2
                        }
                        self.SETTING_INFO(self.setting);
                    } else {
//                        alert('场景设置信息查询失败!')
                    }
                }).catch(function (error) {
//                    alert('场景设置信息查询失败')
                });
            },
            stopIosBgmusic: function () {
                let audio1 = document.querySelector("#audio1");
                audio1.src = '';
                audio1.pause();
                if ($('.musicStatusCtrlBtn').length > 0) {
                    $('.musicStatusCtrlBtn').removeClass("musicActive");
                }
            },
            operate_templateDataList: function (operateInfoObj) {
                let self = this;

                let targetPageIndex = operateInfoObj.targetPageIndex;
                let targetPageId = operateInfoObj.targetPageId;

                if ("undefined" == typeof operateInfoObj.operateType || "undefined" == typeof targetPageIndex || "undefined" == typeof targetPageId) {
                    return
                }

                let operateFunc = {};
                operateFunc.replace = function (operateInfoObj) {
//                    console.log(self.templateData, operateInfoObj);
                    let newPageData = operateInfoObj.templatePageData;
                    newPageData.id = '';
                    newPageData.sceneId = self.templateData.obj.id;
                    newPageData.properties = self.templateData.list[targetPageIndex].properties;
                    newPageData.name = null;
                    let srcArr = [];
                    //修改新增页面内可替换图片的地址数组
                    self.templateData.list[targetPageIndex].elements.forEach(function (item, idx) {
                        if (item.properties.replacement) {
                            srcArr.push(item.properties.src)
                        }
                    });

                    //修改新增页面内所有元素的id     及用缓存的propertiesArr覆盖现模板的可替换元素的properties
                    newPageData.elements.forEach(function (item, idx) {
                        item.id = utils.getRandomId();
//                      替换页面保留原图
//                        if (item.properties.replacement) {
//                            item.properties.src = srcArr[0] ? srcArr.shift() : item.properties.src;
//                        }
                    })

                    //替换页面
                    self.templateData.list.splice(targetPageIndex, 1, newPageData)
                    //修改页序，并把所有元素的num同步为页面num
                    fixNumforPagesAndElements(self.templateData);
                }
                operateFunc.delete = function (operateInfoObj) {
                    messageBus.$emit('uneffect_modifyself.TemplateData', true);
                    let oriProperties = self.templateData.list[targetPageIndex].properties;

                    //删除页面
                    self.templateData.list.splice(targetPageIndex, 1);

                    //把缓存的第一页的properties放在新的第一页上，以免删除的是第一页，丢失了第一页上有的音乐等信息
                    self.templateData.list[0].properties = $.extend(false, self.templateData.list[0].properties, oriProperties);

                    //修改页序，并把所有元素的num同步为页面num
                    fixNumforPagesAndElements(self.templateData);
                }
                operateFunc.insert = function (operateInfoObj) {
                    let newPageData = operateInfoObj.templatePageData;
                    newPageData.id = '';
                    newPageData.sceneId = self.templateData.obj.id;
                    newPageData.name = null;
                    //修改新增页面内所有元素的id
                    newPageData.elements.forEach(function (item) {
                        item.id = utils.getRandomId();
                    })

                    //插入页面
                    self.templateData.list.splice(targetPageIndex + 1, 0, newPageData);

                    //滑动到视图中
                    // messageBus.$emit('pageScrollToView',targetPageIndex+1);

                    //修改页序，并把所有元素的num同步为页面num
                    fixNumforPagesAndElements(self.templateData);
                }
                operateFunc.bgReplace = function (operateInfoObj) {
                    let newBgsrc = operateInfoObj.templatePageData;
                    let targetEles = self.templateData.list[targetPageIndex].elements;
                    let ownBgEle = false;

                    targetEles.forEach(function (item, index) {
                        if (item.type === 3) {
                            item.properties.imgSrc = newBgsrc
                            ownBgEle = true;
                        }
                    })

                    if (!ownBgEle) {
                        let newBgEle = {
                            css: {zIndex: "-1"},
                            zIndex: "-1",
                            id: utils.getRandomId(),
                            num: 0,
                            pageId: targetPageId,
                            properties: {imgSrc: newBgsrc},
                            imgSrc: newBgsrc,
                            sceneId: '',
                            type: 3
                        }
                        targetEles.unshift(newBgEle);
                        targetEles[0].sceneId = targetEles[1].sceneId;
                    }
                }
                if (this.templateData.list[targetPageIndex].id === targetPageId) {
                    // operateFunc[operateInfoObj.operateType](this.templateData, operateInfoObj);
                    operateFunc[operateInfoObj.operateType](operateInfoObj);
                }

                function fixNumforPagesAndElements(a) {
                    self.templateData.list.forEach(function (pageData, index) {
                        let num = pageData.num = index + 1;
                        pageData.elements.forEach(function (item) {
                            item.num = num;
                        })
                    })
                }
            }
        },
        components: {
            pages,
            commonBar,
            imgBar,
            textBar,
            setting,
            singlePageTemplates,
            bgReplace,
            imgEditPage,
            bgMusicSetting,
            bgMusicCtrl
        },
        beforeRouteLeave(to, from, next) {
            // if (this.settingInfo === 'setting' || this.settingInfo === 'music') {
            //     next(false);
            //     this.settingInfo = 'mainPage';
            // } else {
            //     next();
            // }
            if(this.currentPanel.length){
                this.CURRENT_PANEL("");
                next(false);
                // this.settingInfo = 'mainPage';
            }else{
               next(); 
            }
            
            this.stopIosBgmusic();
        }
    }
</script>
<style scoped lang="less">

    @barHeight: 1.05rem;
    @textbarHeight: 2.1rem;

    html, body {
        position: relative;
        height: 100%;
    }

    .page-content {
        width: 100vw;
        height: 100%;
        height: 100%;
        overflow: auto;
        -webkit-overflow-scrolling: touch;
        /*border: 1px solid #e5e5e5;*/
        padding-top: 4vh;
        padding-bottom: 2vh;
    }

    .common-edit {
        width: 100vw;
        background-color: #fff;
        display: -webkit-box;
        -webkit-box-pack: center;
        -webkit-box-orient: vertical;
        display: flex;
        display: -webkit-flex;
        flex-direction: column;
        -webkit-flex-direction: column;
        justify-content: center;
        -webkit-justify-content: center;
    }

    .common-edit {
        height: @barHeight;
        position: absolute;
        bottom: 0;
        z-index: 140;
        box-shadow: 0 1px 20px rgba(0, 0, 0, .6);
        border-top: 1px solid rgba(0, 0, 0, .2);
    }
    .common-edit-text {
        height:@textbarHeight
    }

    .rise-enter-active {
        animation: rise 0.3s;
    }

    .rise-leave-active {
        animation: rise 0.3s reverse;
    }

    @keyframes rise {
        0% {
            transform: translateY(@barHeight);
        }

        100% {
            transform: translateY(0);
        }
    }
    .rise_text-enter-active {
        animation: rise 0.3s;
    }

    .rise_text-leave-active {
        animation: rise 0.3s reverse;
    }
    @keyframes rise_text {
            0% {
                transform: translateY(@textbarHeight);
            }

            100% {
                transform: translateY(0);
            }
        }
    /* for 1080+ px width screen */
    @media only screen and (min-width: 1080px) {
        html, body {
            font-size: 51.67px;
        }
    }

    /* for 1080 px width screen */
    @media only screen and (max-width: 1080px) {
        html, body {
            font-size: 45px;
        }
    }

    /* for 800 px width screen */
    @media only screen and (max-width: 800px) {
        html, body {
            font-size: 33px;
        }
    }

    /* for 720 px width screen */
    @media only screen and (max-width: 720px) {
        html, body {
            font-size: 30px;
        }
    }

    /* for 640 px width screen */
    @media only screen and (max-width: 640px) {
        html, body {
            font-size: 27px;
        }
    }

    /* for 540 px width screen */
    @media only screen and (max-width: 540px) {
        html, body {
            font-size: 22.5px;
        }
    }

    /* for 480 px width screen */
    @media only screen and (max-width: 480px) {
        html, body {
            font-size: 20px;
        }
    }

    /* for 450 px width screen */
    @media only screen and (max-width: 450px) {
        html, body {
            font-size: 18.9px;
        }
    }

    /* for 414 px width screen */
    @media only screen and (max-width: 414px) {
        html, body {
            font-size: 17.25px;
        }
    }

    /* for 375 px width screen */
    @media only screen and (max-width: 375px) {
        html, body {
            font-size: 15.625px;
        }
    }

    /* for 320 px width screen */
    @media only screen and (max-width: 320px) {
        html, body {
            font-size: 13.5px;
        }
    }

    .musicActive {
        animation: rotatePic 8s linear infinite;
    }

    @keyframes rotatePic {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>