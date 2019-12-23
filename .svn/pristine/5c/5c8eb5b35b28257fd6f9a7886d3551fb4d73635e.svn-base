<template>
    <div class="mine">
        <transition name="slide-fade">
            <div class="avatar" v-show="avatarFlag">
                <div class="avatar-top">
                    <img class="headPortrait" :src="userInfo.headPortrait"/>
                    <img class="userInfo-setting" src="../../images/icon_setting.png" @click.stop="userInfoSetting()"/>
                    <div class="nickname">{{userInfo.nickname}}</div>
                </div>
                <div class="avatar-bottom">
                    <div class="exchangeTicket" @click.stop="askTips">
                        <div class="ticketLeft">
                            <!-- <span @click.stop="toTicketStore">兑换券</span> -->
                            <span>兑换券</span>
                            <img class="askTips" src="../../images/question_icon.png"/>
                        </div>
                        <!-- <div class="ticketRight" @click.stop="toTicketStore"> -->
                        <div class="ticketRight">
                            <span class="ticketNumber">{{voucherCount}} &nbsp;</span>
                            <span>张</span>
                        </div>
                    </div>
                    <div class="boughtTemplate">
                        <div class="templateLeft">
                            <span @click.stop="toMyTemplateStore">已购模板</span>
                        </div>
                        <div class="templateRight"  @click.stop="toMyTemplateStore">
                            <span class="templateNumber">{{templateCount}} &nbsp;</span>
                            <span>个</span>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <div class="mineIndex">
            <div class="item">
                <div @click="routeChange('/index/mine/myAnimation','myAnimation')" class="aniBtn"
                     :class="{active:routeType=='myAnimation'}">
                    <div class="text">H5</div>
                </div>
                <div @click="routeChange('/index/mine/myVedio','myVedio')" class="vedioBtn"
                     :class="{active:routeType=='myVedio'}">
                    <div class="text">视频</div>
                </div>
                <div @click="routeChange('/index/mine/myArticle','myArticle')" class="artBtn"
                     :class="{active:routeType=='myArticle'}">
                    <div class="text">图文</div>
                </div>
            </div>
        </div>
        <!--<myarticle-com class="mineContent" v-else></myarticle-com>-->
        <!--<router-view class="mineContent" v-if="hackReset"></router-view>-->
        <myanimation class="mineContent" v-if="hackReset" @scrollTop="scrollTopHandler"></myanimation>
        <!--<endLoading v-if="showEndLoading"></endLoading>-->
    </div>

</template>
<script>
    import myanimation from './myanimation.vue'
    import myarticleCom from './myarticle.vue'
    import messageBus from '../messageBus.js'
    import {mapState, mapMutations} from 'vuex'
    import * as ajax from '@lib/ajax'
    import * as utils from '@lib/utils'
    import {chooseImgs} from "@src/lib/platformAPI";


    export default {
        data: function () {
            return {
                ok: "",
                hackReset: "true",
                showEndLoading: false,
                currentMainItem: 'myAnimation',
                lastMainItem: 'myAnimation',
                avatarFlag: true,
                voucherCount: '',
                templateCount: ''
            }
        },
        created() {
            ajax.queryNumber({}).then((res) => {
                res = utils.processReturnObj(res);
                if(res.resultCode === 0){
                    this.voucherCount = res.data && res.data.voucherCount?res.data.voucherCount:0;
                    this.templateCount = res.data && res.data.templateCount? res.data.templateCount:0;
                }else{
                    throw(res)
                }
            }).catch((err) => {
                console.log(err.msg)
            });
        },
        mounted() {
            let self = this;
            messageBus.$on('showEndLoading', (info) => (this.showEndLoading = info));
            messageBus.$on('v_if_mineIndexBar', (currentMainItem, lastMainItem) => (this.currentMainItem = currentMainItem, this.lastMainItem = lastMainItem));
            messageBus.$on('show_userInfoSetting', () => {
                self.userInfoSetting();
            });
            messageBus.$on("update_headPortrait", function (imgData) {
                if (imgData.ownUrls[0].search('http') !== -1) {
                    ajax.updateHeadPortrait({
                        headPortrait: imgData.ownUrls[0],
                    }).then((data) => {
                        data = utils.processReturnObj(data);
                        if (0 === data.resultCode) {
                            let tempInfoObj = Object.assign({}, self.userInfo, {"headPortrait": data.data});
                            self.USER_INFO(tempInfoObj);
                            self.CURRENT_PANEL([]);
                            messageBus.$emit('show_userInfoSetting');
                        } else {
                            throw 1
                        }
                    }).catch(function (e) {
                        messageBus.$emit("tipCoverShow", {
                            status: 2,
                            desc: ['头像更换失败', '请稍后重试'],
                            icon: 'times',
                            interval: 2000,
                            style:{
                                tipDescPadding:'0 0.32rem 0.4rem'
                            }
                        });
                        messageBus.$emit('show_userInfoSetting');
                    });
                } else {
                    messageBus.$emit("tipCoverShow", {
                        status: 2,
                        desc: ['头像更换失败', '请稍后重试'],
                        icon: 'times',
                        interval: 2000,
                        style:{
                            tipDescPadding:'0 0.32rem 0.4rem'
                        }
                    });
                    messageBus.$emit('show_userInfoSetting');
                }
            });
        },
        computed: {
            routeType() {
                this.CURRENT_TYPE(this.$route.params.type);
                return this.$route.params.type;
            },
            ...mapState([
                'currentPanel',
                'userInfo'
            ])
        }
        ,
        components: {
            myanimation,
            myarticleCom
        }
        ,
        methods: {
            ...mapMutations([
                'CURRENT_TYPE',
                'CURRENT_PANEL',
                'USER_INFO',
            ]),
            toTicketStore() {
                this.$router.push({
                    path: '/ticketStore/unuse',
                });
            },
            askTips() {
                messageBus.$emit("tipCoverShow", {
                    status: 1,
                    // title: '兑换券说明',
                    // desc: [
                    //     `<div style="text-align: left"><span style="text-align: left;font-size: 0.26rem">1.使用兑换券可等价兑换收费模板。</span></div>`,
                    //     `<div style="text-align: left"><span style="text-align: left;font-size: 0.26rem">2.用户可从<span style="color:red">“积分商城”</span>获取兑换券。</span></div>`,
                    //     `<div style="text-align: left"><span style="text-align: left;font-size: 0.26rem">3.兑换券仅限领取账号使用，不可赠送或转让。</span></div>`,
                    //     `<div style="text-align: left"><span style="text-align: left;font-size: 0.26rem">4.每张兑换券只可使用<span style="color:red">1</span>次，支付完毕后，该兑换券被标记为<span style="color:red">“已使用”</span>状态。</span></div>`
                    // ],
                    // style:{
                    //     contentWidth:'4.8rem'
                    // },
                    desc:['新功能正在开发中','敬请期待!'],
                    btns: [{
                        text: '知道了',
                        btnCallBack: function () {
                            messageBus.$emit("tipCoverShow", {
                                status: 0
                            });
                        }
                    }]
                });
            },
            toMyTemplateStore() {
                this.$router.push({
                    path: '/myTemplateStore/myAnimation',
                });
            },
            routeChange(path, name) {
                let self = this;
                self.avatarFlag = true;
                if (path) {
                    self.$router.replace({path: path});
                } else if (name) {
                    self.$router.replace({name: name});
                }
            }
            ,
            changeAvatar() {
                let oneImagesInformation = {localIds: [], serverIds: [], ownUrls: []};
                chooseImgs(oneImagesInformation, "update_headPortrait", 1);
            }
            ,
            userInfoSetting() {
                let self = this;
                self.CURRENT_PANEL([{
                    popupName: 'userInfoSetting',
                    userInfo: [
                        {
                            name: '头像',
                            data: self.userInfo.headPortrait,
                            handler: function () {
                                self.changeAvatar();
                            }
                        },
                        {
                            name: '昵称',
                            data: self.userInfo.nickname,
                            handler: function () {
                                self.CURRENT_PANEL([{
                                    popupName: 'nickname_setting',
                                    info: self.userInfo.nickname
                                }])
                            }
                        },
                        {
                            name: '手机',
                            data: self.userInfo.account,
                            handler: function () {
                                self.CURRENT_PANEL([{
                                    popupName: 'account_setting',
                                    info: self.userInfo.account
                                }])
                            }
                        }
                    ]
                }])
            },
            scrollTopHandler(per) {
                if (per === 0) {
                    this.avatarFlag = false;
                    $(".mineContent").height($(".indexContent").height() - $(".mineIndex").height())
                } else {
                    this.avatarFlag = true;
                    $(".mineContent").height($(".indexContent").height() - $(".avatar").height() - $(".mineIndex").height())
                }
            }
        }
        ,
        watch: {
            routeType() {
                this.hackReset = false;
                this.$nextTick(() => {
                    this.hackReset = true;
                })
            }
        }
        ,
        beforeDestroy: function () {
            messageBus.$off(['showEndLoading', 'v_if_mineIndexBar', 'show_userInfoSetting', 'update_headPortrait']);
        },
        beforeRouteLeave(to, from, next) {
            if(this.currentPanel.length){
                console.log(1);
                this.CURRENT_PANEL("");
                next(false);
            }else{
                console.log(2);
               next(); 
            }
        }
    }
</script>
<style lang="less" scoped>
    /*@import "../../css/animate.css";*/
    * {
        -webkit-overflow-scrolling: touch;
    }

    .slide-fade-enter-active {
        animation: slide-leave .3s linear;
    }

    .slide-fade-leave-active {
        animation: slide-enter .3s linear;
    }

    @keyframes slide-enter {
        0% {
            height: 40vw;
        }
        50% {
            height: 20vw;
        }
        100% {
            height: 0;
        }
    }

    @keyframes slide-leave {
        0% {
            height: 0;
        }
        50% {
            height: 20vw;
        }
        100% {
            height: 40vw;
        }
    }

    .mine {
        position: relative;
        display: flex;
        flex-direction: column;
        .avatar {
            width: 100%;
            height: 3rem;
            overflow: hidden;
            background-color: #0080cc;
            position: relative;
            .avatar-top {
                height: 2.2rem;
                position: relative;
                overflow: hidden;
                .headPortrait {
                    width: 1.2rem;
                    height: 1.2rem;
                    border-radius: 0.6rem;
                    display: block;
                    margin: 0.22rem auto 0 auto;
                }
                .userInfo-setting {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    right: 0.24rem;
                    width: 0.21rem
                }
                .nickname {
                    margin-top: 0.14rem;
                    text-align: center;
                    font-size: 4.4vw;
                    color: white;
                }
            }
            .avatar-bottom {
                background: rgba(0, 0, 0, 0.05);
                height: 0.4rem;
                padding: 0.2rem 0;
                box-sizing: content-box;
                display: flex;
                justify-content: center;
                align-items: center;
                .exchangeTicket {
                    flex: 1;
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                    color: #fff;
                    font-size: 0.28rem;
                    border-right: 0.01rem solid white;
                    .ticketLeft {
                        display: flex;
                        align-items: center;
                        .askTips {
                            margin-left: 0.04rem;
                            width: 0.26rem
                        }
                    }
                    .ticketNumber {
                        color: red;
                    }

                }
                .boughtTemplate {
                    flex: 1;
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                    color: #fff;
                    font-size: 0.28rem;
                    border-left: 0.01rem solid white;
                    .templateNumber {
                        color: red;
                    }
                }
            }
        }
    }

    .mineIndex {
        height: 0.5rem;
        width: 100%;
        padding: 0.36rem 0;
        overflow: hidden;
        display: flex;
        justify-content: center;
        box-sizing: content-box;
        .item {
            width: 5.43rem;
            height: 100%;
            display: flex;
            justify-content: center;
            .text {
                display: flex;
                justify-content: center;
                align-items: Center;
            }
        }
    }

    .mineContent {
        flex: 1;
        width: 100%;
        overflow: scroll;
        -webkit-overflow-scrolling: touch;
    }

    .aniBtn, .vedioBtn, .artBtn {
        color: #0080cc;
        background: #e8e8e8;
        flex: 1;
        text-decoration: none;
        height: 0.5rem;
        line-height: 0.5rem;
        border-top: #0080cc 1px solid;
        border-bottom: #0080cc 1px solid;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .aniBtn {
        left: 0;
        border-top-left-radius: 15px;
        border-bottom-left-radius: 15px;
        border-left: #0080cc 1px solid;
    }

    .vedioBtn {
        left: 33.3%;
    }

    .artBtn {
        right: 0;
        border-top-right-radius: 15px;
        border-bottom-right-radius: 15px;
        border-right: #0080cc 1px solid;
    }

    /*.aniBtn.active,.artBtn.active{*/
    /*color: white;*/
    /*background: #0080cc;*/
    /*}*/
    .aniBtn.active, .vedioBtn.active, .artBtn.active {
        color: white;
        background: #0080cc;
    }

</style>
