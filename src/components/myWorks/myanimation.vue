<template>
    <div class="aniContent" ref="mineContent">
        <transition-group name="list-complete" tag="div" style="position: relative">
            <div v-for="(item,index) in items" :class="{noMarginTop:index === 0}" class="aniviewItem list-complete-item" v-bind:key="JSON.stringify(item)" >
                <aniview-com :aniview-data="item" :index="index"></aniview-com>
            </div>
        </transition-group>
        <div class="aniviewItem tipLoadMore" v-if="hasScrollBar && loadstatus === 'goOnPull'"
             style="display: flex;flex-direction:column;justify-content: space-around;align-items: center;height: 40px;margin-top: 0">
            <div style="font-size:12px">上拉加载更多</div>
            <div></div>
        </div>
        <div class="aniviewItem tipLoadMore" v-if="hasScrollBar && loadstatus === 'loadMore'"
             style="display: flex;justify-content: center;align-items: center;height: 40px;margin-top: 0">
            <img src="../../images/loading.gif" alt=""
                 style="width: 20px;height: 20px;">
            <span style="marginLeft:8px;font-size:12px">加载中 . . .</span>
        </div>
        <div class="aniviewItem tipLoadMore" v-if="hasScrollBar && loadstatus === 'noMore'"
             style="display: flex;justify-content: center;align-items: center;height: 40px;margin-top: 0">
            <div style="font-size:12px">-- 没有更多了 --</div>
        </div>
        <div class="aniviewItem tipLoadMore" v-if="hasScrollBar && loadstatus === 'error'"
             style="display: flex;justify-content: center;align-items: center;height: 40px;margin-top: 0">
            <div style="font-size:12px">加载出错...</div>
        </div>
    </div>
</template>
<script>
    import aniviewCom from './myaniview.vue';
    import {getAnimationData, getArticleData, getVedioData} from '../../lib/ajax.js';
    import * as utils from '../../lib/utils.js'
    import {getOpenId} from "@src/lib/platformAPI";
    import messageBus from '../messageBus'
    import setting from '../../components/setting/setting.vue'
    import imgEditPage from '../../components/myWorks/editMode/imgEditPage.vue';
    import {mapState, mapMutations} from 'vuex'

    export default {
        data: function () {
            return {
                items: [],
                type: function () {
                    if (this.$route.params.type === "myArticle") {
                        return "article";
                    } else {
                        return "animation";
                    }
                },
                loadstatus: 'loadMore',
                busy: false,
                noMoreLock: false
            }
        },
        components: {
            aniviewCom,
            setting,
            imgEditPage
        },
        computed: {
            ...mapState([
                'userInfo'
            ]),
            currentPageNo() {
                return parseInt(this.items.length / 12) + 1;
            },
            leftItems() {
                return this.items.length % 12;
            },
            hasScrollBar(){
                return this.items.length >= 3;
            }
        },
        watch:{
            userInfo(n,o){
                if(n.account && n.account != o.account){
                    this.init()
                }
            },
            '$route'(to, from) {

            }
        },
        mounted: function () {
            messageBus.$emit("routeChange", {route: "myAnimation"});
            let self = this;
            if(self.userInfo.account){
                self.init();
            }else{
                
            }

            messageBus.$on("saveDone", function (settingInfo_temp) {
                self.items.forEach(function (item, idx, arr) {
                    if (item.photoId === settingInfo_temp.id) {
                        item.account = settingInfo_temp.account;
                        item.coverImage = settingInfo_temp.pic;
                        item.describe = settingInfo_temp.desc;
                        item.name = settingInfo_temp.title;
                        item.photoId = settingInfo_temp.id;
                        item.url = settingInfo_temp.url;
                        let tempItem = self.items.splice(idx, 1);
                        arr.unshift(tempItem[0]);
                    }
                });
                self.SETTING_INFO(settingInfo_temp)
            });
            messageBus.$on("saveCancel", function () {
                self.CURRENT_PANEL([])
            });
            messageBus.$on("modify_listPersonalPhoto", function (id, index) {
                if (self.items[index].photoId === id) {
                    //为将被删除的项的top属性赋值,写法待优化(jq计算元素到)
                    $('.aniviewItem')[index].style.top = $($('.aniviewItem')[index]).offset().top - parseFloat($($('.aniviewItem')[index]).css('marginTop')) + 'px';
                    self.items.splice(index, 1);
                }
                function checkLoadMore() {
                    setTimeout(function () {
                        if ($('.mineContent')[0].scrollHeight <= $('.mineContent').height() || $('.tipLoadMore').offset().top - $('.mineContent').offset().top <= $('.mineContent').height()) {
                            self.loadstatus = 'loadMore';
                            if (self.noMoreLock) {
                                self.loadstatus = 'noMore';
                                return
                            }
                            if (self.busy) {
                                return
                            }
                            self.busy = true;
                            self.requestData();
                        }
                    }, 0)
                }

                checkLoadMore()
            });
        },
        methods: {
            forceLoadEnd() {
                messageBus.$emit('globalLoadCoverSimple');
            },
            requestData () {
                let self = this;
                let extra = false;
                if (self.leftItems >= 6) {
                    extra = true
                }
                if (self.noMoreLock) {
                    self.loadstatus = 'noMore';
                    return
                }

                function getOnePage(resolve, reject) {
                    getData().then(function (data) {
                        data = utils.processReturnObj(data);
                        if (data.resultCode === 0) {
                            if (data.data.list.length > 0) {
                                setTimeout(function () {
                                    data.data.list = data.data.list.splice(self.leftItems);
                                    self.items = self.items.concat(data.data.list);
                                    self.busy = false;
                                    if (self.leftItems !== 0 || self.items.length === 0) {
                                        self.loadstatus = 'noMore';
                                        self.noMoreLock = true;
                                    } else {
                                        self.loadstatus = 'loadMore';
                                        if (extra) {
                                            resolve(1);
                                        }
                                    }
                                }, 300);
                            } else if (data.data.list.length === 0) {
                                setTimeout(function () {
                                    self.loadstatus = 'noMore';
                                    self.busy = false;
                                    self.noMoreLock = true;
                                }, 300);
                            } else if (data.data.count === 0) {
                                setTimeout(function () {
                                    self.loadstatus = 'noMore';
                                    self.busy = false;
                                    self.noMoreLock = true;
                                }, 300);
                            }
                        } else {
                            reject(data)
                        }
                    }).always(function () {
                        self.forceLoadEnd()
                    });

                    function getData() {
                        if (self.$route.params.type == "myAnimation") {
                            return getAnimationData({
//                                account: getOpenId(),
                                account: self.userInfo.account,
                                page: self.currentPageNo,
                            });
                        } else if (self.$route.params.type == "myArticle") {
                            return getArticleData({
//                                account: getOpenId(),
                                account: self.userInfo.account,
                                page: self.currentPageNo,
                                row: 12,
                                type: 1,

                            });
                        }else if(self.$route.params.type == "myVedio"){
                            return getVedioData({
//                                account: getOpenId(),
                                account: self.userInfo.account,
                                page: self.currentPageNo,
                                row: 12,
                                type: 2,

                            });
                        } else {
                            return getAnimationData({
//                                account: getOpenId(),
                                account: self.userInfo.account,
                                page: self.currentPageNo,
                            });
                        }
                    }
                }

                new Promise(function (resolve, reject) {
                    getOnePage(resolve, reject);
                }).then(function (data) {
                    if (data) {
                        return new Promise(function (resolve, reject) {
                            getOnePage(resolve, reject);
                        });
                    }
                }).catch(function () {
                    self.loadstatus = 'error';
                    self.busy = false;
                })
            },
            check_loadMore: function (scrollTop, contentHeight, wrapperHeight, self) {
                if (contentHeight - scrollTop < parseInt(wrapperHeight) + 40 && contentHeight - scrollTop >= parseInt(wrapperHeight) + 3) {
                    self.loadstatus = 'goOnPull';
                } else if (contentHeight - scrollTop === parseInt(wrapperHeight) || contentHeight - scrollTop === parseInt(wrapperHeight) + 1) {
                    self.loadstatus = 'loadMore';
                    if (self.noMoreLock) {
                        self.loadstatus = 'noMore';
                        return
                    }
                    if (self.busy) {
                        return
                    }
                    self.busy = true;
                    self.requestData();
                }
            },
            init(){
                let self = this;
                this.noMoreLock = false;
                this.items = [];
                this.requestData();
                $('.mineContent').scroll(function () {
                    if ($(this).scrollTop() === 0) {
                        return
                    }
                    let scrollTop = $(this).scrollTop();
                    let contentHeight = $(this)[0].scrollHeight;
                    let wrapperHeight = $(this).height();
                    self.check_loadMore(scrollTop, contentHeight, wrapperHeight, self);
                    // console.log('scrollTop',scrollTop);
                    if(scrollTop > 300 && scrollTop< 500){
                        self.$emit('scrollTop',0)
                    }
                    if(scrollTop < 150){
                        self.$emit('scrollTop',100)
                    }
                });
            },
            ...mapMutations([
                'SETTING_INFO',
                'CURRENT_PANEL'
            ])
        },
        beforeDestroy: function () {
            messageBus.$off(['modify_listPersonalPhoto', 'sendBase64AndGetUrl', 'saveDone','saveCancel']);
        }
    }
</script>
<style scoped>


    .aniviewItem {
        width: 7.02rem;
        float: left;
        margin-left: 0.26rem;
        margin-top: 0.24rem;
    }

    .list-complete-item {
        transition: all 0.6s;
        /*display: inline-block;*/
        /*margin-right: 10px;*/
    }
    .noMarginTop{
         margin-top: 0;
     }
    .marginBottom {
        margin-bottom: 0.02rem;
    }

    .list-complete-enter, .list-complete-leave-to
        /* .list-complete-leave-active for below version 2.1.8 */
    {
        opacity: 0;
    }

    .list-complete-leave-active {
        position: fixed;
        z-index: 1;
        /*transform: translateX(100px);*/
        height: 0px;
    }

    .imgEditPage {
        position: relative;
    }
</style>
