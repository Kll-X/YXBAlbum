<template>
    <div>
        <!--<div id="article"></div>-->
        <article-parser-com  v-if="articleFlag" :add-count="true" :articleData="this.articleData" :user-data="this.userData" :is-tpl="false"></article-parser-com>
        <!-- <div v-if="showButton" class="useTxt">
            <div class="useImg" v-on:click="alertImage()"><img src="../../images/use.png" alt=""></div>
            <div class="txt" v-on:click="to_editTemplate()">作品编辑</div>
        </div> -->
        <div v-if="!showButton">
            <a class="ads"
               href="https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzIyNTkzNTM2NA==&scene=124#wechat_redirect">>我也要制作<</a>
        </div>
        <!--剩余预览次数组件-->
            <left-preview v-if="myWorkStatus - 0 === 0 ||myWorkStatus - 0 === 1" :sum="limit.sum"
                          :used="limit.used" :myWorkStatus="myWorkStatus"></left-preview>
    </div>
</template>
<script>
    import {articleParser} from '../../lib/articleTempParser.js'
    import articleParserCom from "./articleEdit/articleParser.vue"
    import * as ajax from './../../lib/ajax';
    import * as utils from './../../lib/utils.js';
    import * as platformAPI from '@lib/platformAPI.js'
    import messageBus from './../messageBus.js';
    import leftPreview from "@components/leftPreview/leftPreview.vue"


    export default {
        components:{
            articleParserCom,
            leftPreview
        },
        data: function () {
            return {
                articleData: {},
                userData: {},
                articleFlag: false,
                myWorkStatus: undefined,
                limit: {
                    sum: '',
                    used: '',
                    agree: 0,
                    shareData:{}
                }
            }
        },
        computed: {
            showButton: function () {
                return location.search.indexOf('id') > -1
                // return true;
            }
        },
        methods: {
            fetchData(id) {
//                $.getJSON("mock/templates.json", function (data) {
//                    parse(data);
//                });
                let self = this;
                let mark = {};
                //  loadStart
                messageBus.$emit('globalLoadCover', {
                    status: true,
                    mark: mark
                });
                ajax.templateAjax(id)
                    .then(function (data) {
                        if (data.success === true) {
                            self.articleData = data;
                            console.log(data);

                            ajax.querySceneSetting({
                                'photoId':id
                            },true)
                                .then(function (tempData) {
                                    console.log("个人");
                                    console.log(tempData);
                                        if(tempData.resultCode === 0){ //个人
                                            self.userData.count = tempData.data.count;
                                            self.userData.createTime = tempData.data.createTime;
                                            self.userData.name = tempData.data.name;
                                            let openId = tempData.data.account;
                                            ajax.getUserInfo({
                                                'account': openId
                                            }).then(function (info) {
                                                if(info.msg == "success"){
                                                    self.userData.userName = info.data.nickname;
                                                }else{
                                                    self.userData.userName = "和美秀";
                                                }
                                                let ele = document.getElementById("article");
                                                //  loadEnd
                                                messageBus.$emit('globalLoadCover', {
                                                    status: false,
                                                    mark: mark
                                                });
                                                // articleParser(ele,data,self.userData);
                                                self.articleFlag = true;
                                            }).catch(function(){
                                                messageBus.$emit("tipCoverShow", {
                                                    status: 2,
                                                    desc: ['后台服务器繁忙','请刷新重试'],
                                                    icon: 'times',
                                                    style:{
                                                        tipDescPadding:'0 0.32rem 0.4rem'
                                                    }
                                                });
                                            })
                                        }else{
                                            messageBus.$emit("tipCoverShow", {
                                                status: 2,
                                                desc: ['后台服务器繁忙','请刷新重试'],
                                                icon: 'times',
                                                style:{
                                                    tipDescPadding:'0 0.32rem 0.4rem'
                                                }
                                            });
                                        }

                                    }
                                )
                                .catch(function(){
                                    messageBus.$emit("tipCoverShow", {
                                        status: 2,
                                        desc: ['后台服务器繁忙','请刷新重试'],
                                        icon: 'times',
                                        style:{
                                            tipDescPadding:'0 0.32rem 0.4rem'
                                        }
                                    });
                                })
                        } else {
                            messageBus.$emit('globalLoadCoverSimple');
                            messageBus.$emit("tipCoverShow", {
                                status: 2,
                                desc: ['后台服务器繁忙','请刷新重试'],
                                icon: 'times',
                                style:{
                                    tipDescPadding:'0 0.32rem 0.4rem'
                                }
                            });
                        }
                    })
                    .catch(function (error) {
//                        alert("temp error" + JSON.stringify(error));
                        messageBus.$emit('globalLoadCoverSimple');
                        messageBus.$emit("tipCoverShow", {
                            status: 2,
                            desc: ['后台服务器繁忙','请刷新重试'],
                            icon: 'times',
                            style:{
                                tipDescPadding:'0 0.32rem 0.4rem'
                            }
                        });
                    })
            },
            to_editTemplate() {
                this.$router.push({path: '/articleEdit/' + this.$route.params.id});
            }
        },
        created: function () {
            this.fetchData(this.$route.params.id);
//            alert(location.hash)
        },
        mounted () {
            let self = this;

            ajax.querySceneSetting({
                'photoId': self.$route.params.id
            }).then(function (data) {
                data = utils.processReturnObj(data);
                if (data.resultCode === 0) {
                    // document.title = data.data.name;
                    if (!self.showLeftPreview) {
                        self.myWorkStatus = data.data.status;
                        if (self.myWorkStatus - 0 === 0 || self.myWorkStatus - 0 === 1) {
                            //            剩余可访问用户数数据请求
                            ajax.queryLimitPreview({id: self.$route.params.id}).then(function (limitData) {
                                limitData = utils.processReturnObj(limitData);
                                if (limitData.resultCode === 0) {
                                    self.limit = Object.assign({}, limitData.data);
                                }
                            });
                        }
                    }
                    self.shareData={
                        name: data.data.name,
                        desc: data.data.describe,
                        coverImage:data.data.coverImage,
                    }
                    platformAPI.share(self.shareData);
                } else {
                   console.log(JSON.stringify(data));
                }
            }).catch(function (error) {
                console.log("场景设置信息查询失败");
            });
        }
    }
</script>
<style lang="less" scoped>
    #article .wrapper{
        font-size:medium;
        padding:1rem;
        background-color: white;
        min-height: 100vh;
        padding-bottom: 40px;
    }
    #article .title{
        font-size:21px;
        color: black;
        margin-bottom: 10px;
    }
    #article .infoContent{
        overflow: hidden;
        margin-bottom: 10px;
        height: 1.5rem;
    }
    #article .time,#article .count,#article .userName{
        float: left;
        margin-right: 10px;
    }
    #article .count img{
        margin-right: 3px;
    }
    #article .userName{
        color: #0080cc;
    }
    #article .itemWrapper{
        margin: 1rem 0;
        color: #333;
        /*word-break: break-all;*/
        word-wrap: break-word;
    }
    #article .imgItem{
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: 50% 50%;
    }
    .useTxt {
        position: fixed;
        bottom: 0;
        left: 30%;
        width: 40%;
        height: 40px;
        z-index: 100;
        background-image: url("../../images/btnBg.png");
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

    .editCom {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 12%;
        z-index: 100;
        background-color: #fff;
        background-size: 100% 100%;
        .item {
            width: 33%;
            height: 100%;
            float: left;
            position: relative;
        }
    }

    .saveBtn {
        background: url("../../images/save.png") center center no-repeat;
    }

    .musicBtn {
        background: url("../../images/music.png") center center no-repeat;
    }

    .settingBtn {
        background: url("../../images/setting.png") center center no-repeat;
    }

    .saveBtn, .musicBtn, .settingBtn {
        background-size: contain;
        position: absolute;
        top: 20%;
        left: 30%;
        width: 40%;
        height: 60%;
    }

    .ads {
        position: fixed;
        z-index: 200;
        bottom: 1vh;
        color: rgba(0, 0, 0, 0.3);
        left: 50%;
        transform: translate(-50%, 0)
    }

</style>

