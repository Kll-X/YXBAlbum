<template>
    <!--<div class="viewContainer" >-->
    <div class="viewContainer" ref="viewContainer">
        <div class="viewArea bottomBorder" v-on:click="to_myWorksView(aniviewData.photoId)">
            <div :style="imgStyleObj" class="viewImg">
                <div class="status" v-if="status!=='审核通过'">
                    <div class="mask" :style="statusBg"></div>
                    <div class="text">{{status}}</div>
                </div>
            </div>
            <div class="rightCom">
                <div class="viewTitle">
                    <p>{{aniviewData.name}}</p>
                </div>
                <div class="viewDesc">
                    <div>{{aniviewData.describe}}</div>
                </div>
                <div class="viewTimes">
                    <span class="viewDate">{{formatDate(aniviewData.createTime)}}</span>
                    <div class="viewEyeRight">
                        <img src="../../images/eye.png" class="viewEye" alt="">
                        <span class="viewNum">{{aniviewData.count}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="functionBar">
            <div v-if="status === '草稿' || status === '审核失败'" class="edit rightBorder"
                 @click.stop="to_editTemplate(aniviewData.photoId)">编辑
            </div>
            <!--<div v-if="status === ''" class="set rightBorder" @click.stop="to_setting(aniviewData)">设置</div>-->
            <div v-if="status === '草稿' || status === '审核中' || status === '审核通过'" class="edit rightBorder"
                 @click.stop="shareHandler(aniviewData.photoId)">分享
            </div>
            <!--<div v-if="status === ''" class="del" @click.stop="delTemplate(aniviewData.photoId,index)">删除</div>-->
            <div v-if="status === '草稿' || status === '审核失败' || status === '审核中' || status === '审核通过'" class="del"
                 @click.stop="to_doMore(aniviewData.photoId,index)">更多
            </div>
        </div>
    </div>
</template>
<script>
    import messageBus from '../messageBus'
    import * as ajax from "../../lib/ajax.js";
    import * as utils from "../../lib/utils.js";
    import * as platformAPI from "@src/lib/platformAPI";
    import {mapState, mapMutations} from 'vuex'

    export default {
        props: ['aniviewData', 'index'],
        data: function () {
            return {
                top: ''
            }
        },
        computed: {
            imgStyleObj: function () {
                return {
                    backgroundImage: "url(" + this.aniviewData.coverImage + ")",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "50% 50%",
                    border: "0.01rem solid #d9d9d9",
                    boxSize: "border-box"
                }
            },
            routeType(){
                return this.$route.params.type
            },
            status(){
                let status;
                switch (this.aniviewData.status) {
                    case 0:
                        status = "草稿";
                        break;
                    case 1:
                        status = "审核中";
                        break;
                    case 2:
                        status = "审核通过";
                        break;
                    case -1:
                        status = "审核失败";
                        break;
                    default:
                        status = "草稿";
                        break;
                }
                return status;
            },
            statusBg(){
                if(this.aniviewData.status == 1){
                    return {
                        backgroundColor: '#00cc4d'
                    }
                }else if(this.aniviewData.status == -1){
                    return {
                        backgroundColor: 'red'
                    }
                }else if(this.aniviewData.status == 2){
                    return {
                        backgroundColor: 'transparent'
                    }
                }else{
                    return {
                        backgroundColor: 'black'
                    }
                }

            },
            ...mapState([
                'eleTemplate',
                'settingInfo',
                'userInfo'
            ])
        },
        components: {},
        methods: {
            ...mapMutations([
                'SETTING_INFO',
                'CURRENT_PANEL'
            ]),
            formatDate(timestamp){
                let d = new Date(timestamp);
                return (d.getYear() + 1900) + "-" + (d.getMonth() + 1) + "-" + d.getDate();
            },
            shareHandler(id){
                let self = this;
                if (platformAPI.getEnvInf() === 'androidapp') {
                    this.CURRENT_PANEL([
                        {
                            popupName: 'moreSettingBar',
                            mask: true,
                            icons: [
                                {
                                    src: require('../../images/icon_wx.png'),
                                    handler: function () {
                                        self.appShareToFirends(id);
                                    }
                                }
                            ]
                        }
                    ]);
                } else {
                    this.to_myWorksView(id)
                }
            },
            appShareToFirends(id){
                let url, title, des, imgSrc;

                switch (this.routeType) {
                    case "myAnimation":
                        url = location.origin + location.pathname + '#/myWorksView/' + id;
                        break;
                    case "myVedio":
                        url = location.origin + location.pathname + '#/myWorksView/' + id;
                        break;
                    case "myArticle":
                        url = location.origin + location.pathname + '#/myArticleView/' + id;
                        break;
                }
                title = this.aniviewData.name;
                des = this.aniviewData.describe;
                imgSrc = this.aniviewData.coverImage;
                platformAPI.shareBtnHandler(url, title, des, imgSrc);
            },
            to_myWorksEditView(id){
                if (this.routeType === 'myAnimation') {
                    this.$router.push({
                        name: 'myWorksView',
                        params: {id: id, settingData: this.aniviewData}
                    });
                } else if (this.routeType === 'myVedio') {
                    this.$router.push({
                        name: 'myWorksView',
                        params: {id: id, settingData: this.aniviewData}
                    });
                } else if (this.routeType === 'myArticle') {
                    this.$router.push({
                        name: 'myArticleView',
                        params: {id: this.aniviewData.photoId, settingData: this.aniviewData}
                    });
                }
            },
            to_editTemplate(id) {
                if (this.routeType == 'myAnimation') {
                    this.$router.push({path: '/editTemplate/' + id});
                } else if (this.routeType == 'myVedio') {
                    this.$router.push({path: '/editTemplate/' + id});
                } else if (this.routeType == 'myArticle') {
                    this.$router.push({path: '/articleEdit/' + id});
                }
            },
            to_myWorksView(id) {
                if (this.routeType === 'myAnimation') {
                    this.$router.push({
                        name: 'myWorksView',
                        params: {id: this.aniviewData.photoId}
                    });
                } else if (this.routeType === 'myVedio') {
                    this.$router.push({
                        name: 'myWorksView',
                        params: {id: this.aniviewData.photoId}
                    });
                } else if (this.routeType === 'myArticle') {
                    this.$router.push({
                        name: 'myArticleView',
                        params: {id: this.aniviewData.photoId}
                    });
                }
            },
            to_doMore(){
                let self = this;
                let settingIcon = {
                    src: require('../../images/icon_self_setting.png'),
                    handler: function () {
                        self.to_setting(self.aniviewData);
                    }
                };
                let deleteIcon = {
                    src: require('../../images/icon_delete.png'),
                    handler: function () {
                        self.delTemplate(self.aniviewData.photoId, self.index)
                    }
                };
                let videoIcon = {
                    src: require('../../images/icon_save_vedio.png'),
                    handler: function () {
                        self.covertToVideo();
                    }
                }
                let icons;
                if (this.status === '审核中' || this.status === '审核通过') {
                    icons = [deleteIcon];
                    if (this.routeType === 'myVedio' && this.status === '审核通过') {
                        icons.push(videoIcon);
                    }
                } else {
                    icons = [settingIcon, deleteIcon];
                }
                this.CURRENT_PANEL([
                    {
                        popupName: 'moreSettingBar',
                        mask: true,
                        icons: icons
                    }
                ]);
            },
            to_setting(aniviewData){
                let self = this;
                let settingInfo = {
                    id: aniviewData.photoId,
                    title: aniviewData.name,
                    desc: aniviewData.describe,
                    pic: aniviewData.coverImage,
//                    account: aniviewData.account,
                    account: self.userInfo.account,
                    url: aniviewData.url
                };
                settingInfo = $.extend(true, {}, this.eleTemplate, settingInfo);
                settingInfo.properties.src = settingInfo.pic;
                this.SETTING_INFO(settingInfo);
                this.CURRENT_PANEL([{popupName: 'setting'}]);
            },
            delTemplate(id, index){
                let self = this;
                messageBus.$emit('tipCoverShow', {
                    status: 1,
                    desc: ['删除后不可恢复','是否继续删除'],
                    btns: [{
                        text: '取消',
                        btnCallBack: function () {
                            messageBus.$emit("tipCoverShow", {
                                status: 0
                            });
                        }
                    }, {
                        text: '确定',
                        btnCallBack: function () {
                            messageBus.$emit("tipCoverShow", {
                                status: 0
                            });
                            ajax.deletePhoto({"photoId": id}).then(function (data) {
                                data = utils.processReturnObj(data);
                                if (data.resultCode === 0) {
                                    messageBus.$emit('modify_listPersonalPhoto', id, index);
                                    setTimeout(function () {
                                        messageBus.$emit('tipCoverShow', {
                                            status: 2,
                                            icon: 'check',
                                            desc: ['场景删除成功'],
                                            interval: 1000,
                                            style:{
                                                tipDescPadding:'0 0.32rem 0.4rem'
                                            }
                                        })
                                    }, 100)
                                }
                            }).catch(function () {
                                messageBus.$emit('tipCoverShow', {
                                    status: 2,
                                    icon: 'times',
                                    desc: ['场景删除失败', '请稍后重试'],
                                    interval: 1000,
                                    style:{
                                        tipDescPadding:'0 0.32rem 0.4rem'
                                    }
                                })
                            })
                            self.CURRENT_PANEL([]);
                        }
                    }]
                })
            },
            covertToVideo(aniviewData){
                let self = this;

                window.location.href = 'http://47.107.125.18/mssp_photo/media/uploadH5ToMedia.do?Width=376&Height=668&id=2018072500011&Url=http%3A%2F%2Fyxb.mmarket.com%2Fmssp_photo%2Fassets%2Findex.html%3Ffrom%3Dsinglemessage%23%2FmyWorksEditView%2F2018081000005';

                messageBus.$emit('tipCoverShow', {
                    status: 2,
                    icon: 'load',
                    desc: ['视频导出中', '请稍后'],
                    style:{
                        tipDescPadding:'0 0.32rem 0.4rem'
                    }
                });
            }
        },
        mounted: function () {
        }
    }
</script>
<style scoped lang="less">
    .viewContainer {
        width: 100%;
        height: 100%;
        background-color: white;
        .viewArea {
            width: 100%;
            height: 2.32rem;
            background-color: white;
            .viewImg {
                position: relative;
                width: 1.98rem;
                height: 1.98rem;
                margin: 0.16rem;
                float: left;
                background-size: contain;
                background-repeat: no-repeat;
                background-position: center;
                .status {
                    position: absolute;
                    bottom: 0;
                    width: 100%;
                    height: 0.4rem;
                    .mask {
                        position: absolute;
                        width: 100%;
                        height: 100%;
                        opacity: 0.7;
                    }
                    .text {
                        position: absolute;
                        height: 100%;
                        width: 100%;
                        color: white;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        font-size: 0.22rem;
                    }
                }
            }
            .rightCom {
                width: 4.70rem;
                height: 100%;
                float: left;
                padding: 0.3rem 0.2rem 0.16rem 0.06rem;
            }
            .viewTitle {
                display: flex;
                align-items: center;
                font-size: 0.28rem;
                margin-bottom: 0.2rem;
                p {
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                    color: #333;
                }
            }
            .viewDesc {
                height:0.8rem;
                margin-bottom: 0.36rem;
            }
            .viewDesc div {
                font-size: 0.24rem;
                line-height: 1.5;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                overflow: hidden;
                -webkit-line-clamp: 3;
                color: #666;
            }
            .viewTimes {
                font-size: 0.18rem;
                color: #888;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .viewEye {
                width: 0.24rem;
            }
        }
        .functionBar {
            width: 100%;
            height: 0.7rem;
            padding: 0.15rem 0;
            box-sizing: border-box;
            display: flex;
            justify-content: center;
            align-items: center;
            .edit, .set, .del {
                flex: 1;
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 1vw 0;
                cursor: pointer;
                font-size: 0.22rem;
                color:#888
            }
        }
        .bottomBorder {
            border-bottom: 1px solid #d2d2d2;
        }
        .rightBorder {
            box-shadow: 1px 0 0 #d2d2d2;
        }
    }
</style>
