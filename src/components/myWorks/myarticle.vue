<template>
    <div class="ariContent">
        <transition-group name="list-complete" tag="div" style="position: relative">
            <div v-for="item in items" class="ariviewItem list-complete-item" :key="item.photoId">
                <ariview-com :ariview-data="item" :sceneId="item.id"></ariview-com>
            </div>
        </transition-group>
        <div class="ariviewItem tipLoadMore" v-if="loadstatus === 'goOnPull'"
             style="display: flex;justify-content: center;align-items: flex-start;height: 40px;margin-top: 0">
            <div style="font-weight: bold">上拉加载更多</div>
        </div>
        <div class="ariviewItem tipLoadMore" v-if="loadstatus === 'loadMore'"
             style="display: flex;justify-content: center;align-items: center;height: 40px;margin-top: 0">
            <img src="../../images/loading.gif" alt=""
                 style="width: 20px;height: 20px;">

        </div>
        <div class="ariviewItem tipLoadMore" v-if="loadstatus === 'noMore'"
             style="display: flex;justify-content: center;align-items: center;height: 40px;margin-top: 0">
            <div style="font-weight: bold;">没有更多了</div>
        </div>
        <div class="ariviewItem tipLoadMore" v-if="loadstatus === 'error'"
             style="display: flex;justify-content: center;align-items: center;height: 40px;margin-top: 0">
            <div style="font-weight: bold;">加载出错...</div>
        </div>
    </div>
</template>
<script>
import ariviewCom from './myariview.vue';
import {getArticleData,deletePhoto} from '../../lib/ajax.js';
import {getOpenId} from "@src/lib/platformAPI";
import * as utils from '../../lib/utils.js'
import messageBus from '../messageBus'
import {mapState, mapMutations} from 'vuex'

export default {
    data: function () {
        return {
            items: [],
            totalPage: 1,
            loadstatus:"loadMore",
            noMoreLock: false,//没有内容，不再触发请求
            loadLock: false,//禁止多次触发请求
        }
    },
    components: {
        ariviewCom,
    },
    watch: {},
    computed: {
        ...mapState([
            'userInfo'
        ]),
        currentPageNo: function () {
            return parseInt(this.items.length / 12) + 1;
        },
        leftItems: function () {
            return this.items.length % 12
        }
    },
    mounted: function () {
        messageBus.$emit("routeChange",{route:"myArticle"});
        let self = this;
        self.requestData();
        $('.ariContent').scroll(function () {
            if ($(this).scrollTop() === 0) {
                return
            }
            let scrollTop = $(this).scrollTop();
            let contentHeight = $(this)[0].scrollHeight;
            let wrapperHeight = $(this).height();
            self.check_loadMore(scrollTop, contentHeight, wrapperHeight, self);
        });
        messageBus.$on("delMyArticle",function(info){
            messageBus.$emit('tipCoverShow', {
                status: 1,
                desc: ['删除后不可恢复，是否继续删除'],
                icon: 'check',
                style:{
                    tipDescPadding:'0 0.32rem 0.4rem'
                },
                btns: [
                    {
                        text: '取消',
                        btnCallBack: function () {
                            messageBus.$emit('tipCoverShow', {status: 0})
                        }
                    }, {
                        text: '确定',
                        btnCallBack: function () {
                            messageBus.$emit('tipCoverShow', {status: 0});
                            self.delArticle(info.id);
                        }
                    }
                ]
            })

            // self.$refs.dialog.confirm().then(function(){
            //     self.delArticle(info.id);
            //     self.confirmSet.show = false;
            // }).catch(function(){
            //     self.confirmSet.show = false;
            // })

        })
    },
    methods: {
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
                getArticleData({
//                    account: getOpenId(),
                    account: self.userInfo.account,

                    page: self.currentPageNo,
                    row: 12,
                    type: 1
                }).then(function (data) {
                    data = utils.processReturnObj(data);
                    if (data.resultCode === 0) {
                        if (data.data.list.length > 0) {
                            setTimeout(function () {
                                data.data.list = data.data.list.splice(self.leftItems);
                                self.items = self.items.concat(data.data.list);
                                self.loadLock = false;
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
                                self.loadLock = false;
                                self.noMoreLock = true;
                            }, 300);
                        } else if (data.data.count === 0) {
                            setTimeout(function () {
                                self.loadstatus = 'noMore';
                                self.loadLock = false;
                                self.noMoreLock = true;
                            }, 300);
                        }
                    } else {
                        reject(data)
                    }
                })
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
//                    setTimeout(function () {
                self.loadstatus = 'error';
                self.loadLock = false;
//                    }, 300);
            })
        },

//         requestData() {
//             let self = this;
// //            $.getJSON("mock/myariList.json",function (list) {
// //                self.items = list.data.templateList;
// //            })
//
//             if (self.currentPage === 1) {
//                 messageBus.$emit('globalLoadCover', {
//                     status: true,
//                     mark: {}
//                 })
//             }
//             getArticleData({
// //                    account:"b0JONUh3R0xLQnAtWmZXRFBXcmtUSGNhRWFxUQ",
//                 account: getOpenId(),
// //                    account: 'b0JONUh3SFJSbFctY3NERUI4Z0xwV1dJc2Z6OA',
// //                    account: 'b0JONUh3SFY5UmhLMkFvTEVxTkhjZjBqVGJsbw',
// //                    account: 'b0JONUh3TjFJTG1CZm9JMHVneXA1M1ptUEdnQQ',
//
//                 page: self.currentPage,
//                 row: 10,
//                 type: 1
//             }).then(function (data) {
//                 if (self.currentPage === 1) {
//                     messageBus.$emit('globalLoadCoverSimple');
//                 }
//                 data = utils.processReturnObj(data);
//                 if (data.resultCode === 0) {
//                     self.items = self.items.concat(data.data.list);
//                     self.totalPage = Math.ceil(data.data.count / 12);
//                 } else {
//                     throw 1
//                 }
//             }).catch(function (error) {
//                 if (self.currentPage === 1) {
//                     messageBus.$emit('globalLoadCoverSimple');
//                 }
//                 messageBus.$emit("tipCoverShow", {
//                     status: 2,
//                     desc: ['后台服务器繁忙，请刷新重试'],
//                     icon: 'times',,
                        // style:{
                        //     tipDescPadding:'0 0.32rem 0.4rem'
                        // }
//                 });
//                 if (self.currentPage !== 1) {
//                     self.currentPage--;
//                 }
//             })
//         },
        delArticle(id){
            let self = this;
            deletePhoto({photoId:id});
            for(let index in this.items){
                if(this.items[index].photoId == id){
                    $('.ariviewItem')[index].style.top = $($('.ariviewItem')[index]).offset().top - parseFloat($($('.ariviewItem')[index]).css('marginTop')) + 'px';
                    this.items.splice(index,1);
                    break;
                }
            }
            function checkLoadMore() {
                setTimeout(function () {
                    if ($('.ariContent')[0].scrollHeight <= $('.ariContent').height() || $('.tipLoadMore').offset().top - $('.ariContent').offset().top <= $('.ariContent').height()) {
                        self.loadstatus = 'loadMore';
                        if (self.noMoreLock) {
                            self.loadstatus = 'noMore';
                            return
                        }
                        if (self.loadLock) {
                            return
                        }
                        self.loadLock = true;
                        self.requestData();
                    }
                }, 0)
            }

            checkLoadMore()
        },
        check_loadMore(scrollTop, contentHeight, wrapperHeight, self) {
            if (contentHeight - scrollTop < parseInt(wrapperHeight) + 40 && contentHeight - scrollTop >= parseInt(wrapperHeight) + 3) {
                self.loadstatus = 'goOnPull';
            } else if (contentHeight - scrollTop < parseInt(wrapperHeight) + 24) {
                self.loadstatus = 'loadMore';
                if (self.noMoreLock) {
                    self.loadstatus = 'noMore';
                    return
                }
                if (self.loadLock) {
                    return
                }
                self.loadLock = true;
                self.requestData();
            }
        }
    },
    beforeDestroy:function(){
        messageBus.$off(['delMyArticle']);
    },
    beforeRouteLeave:function(to,from,next){
            if(to.path.search("articleEdit")>-1){
                next(false);
            }else{
                next();
            }
    }
}
</script>
<style scoped>
.ariviewItem{
    width: 100%;
    /*height: 15rem;*/
    float: left;
    margin-top: 2%;
    margin-bottom: 2%;
}
.list-complete-item {
    transition: all 0.6s;
    /*display: inline-block;*/
    /*margin-right: 10px;*/
}

.list-complete-enter, .list-complete-leave-to
    /* .list-complete-leave-active for below version 2.1.8 */
{
    opacity: 0;
}

.list-complete-leave-active {
    position: fixed;
    transform: translateX(100px);
}
</style>
