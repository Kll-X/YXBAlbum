<template>
    <div v-screen-ori-demon style="position: relative;height:100%">
        <div class="appContainer">
            <!--<transition :name="transitionName">-->
            <!--<router-view class="appContent"></router-view>-->
            <!--</transition>-->
            <router-view class="appContent"></router-view>
            <div v-if="globalLoadCover" class="globalCover">
                <div></div>
            </div>
            <div v-if="orientationCoverShow" class="orientationCover">
                <div>竖屏显示效果最佳</div>
            </div>
            <transition :name="tipCoverShowTransitionName">
                <tip-cover :tip-info="tipInfo"></tip-cover>
            </transition>
            <transition-group :name="'fade'">
                <full-screen-popup v-for="(data,index) in currentPanel" :popupData="data"
                                   :key="JSON.stringify(data)" :style="{zIndex:500+index}"></full-screen-popup>
            </transition-group>
            <img-upload></img-upload>
        </div>
    </div>
</template>
<script>
    import messageBus from "./messageBus.js";
    import tipCover from "../components/commonComponent/tipCover.vue";
    import "../lib/ALBUMCONST.js"
    import fullScreenPopup from "@components/commonComponent/fullScreenPopup.vue"
    import setting from '../components/setting/setting.vue';
    // import imgEditPage from '../components/myWorks/editMode/imgEditPage.vue';
    import imgUpload from '@components/commonComponent/imgUpload.vue'
    import {queryPhotoUserInfo} from '../lib/ajax.js'
    import * as utils from '../lib/utils.js'
    import * as platformAPI  from "@src/lib/platformAPI";
    import {mapState, mapMutations} from 'vuex'

    export default {
        data() {
            return {
                transitionName: 'slide-left',
                globalLoadCover: false,
                orientationCoverShow: false,
                tipCoverShowTransitionName: 'fade',
                tipInfo: {
                    //status: [0, 1, 2],
                    //title:'弹窗标题',
                    //icon: check || times ||load,
                    //desc:'弹窗文本描述',
                    //noMinHeight: true || false,  //若要显示一句话，但不想提示框太高,就让此属性为true，例如上传图片提示进度，想框高贴紧内容
                    //interval: interval || 1500,
                    //callBack,
                    //btns: [
                    //    {
                    //        text: 'xxxx',
                    //        btnCallBack: function(){}
                    //    }
                    //]
                },
            }
        },
        watch: {
            '$route'(to, from) {
                const toDepth = to.path.split('/').length;
                const fromDepth = from.path.split('/').length;
                this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
            },
        },
        components: {
            fullScreenPopup,
            tipCover,
            setting,
            // imgEditPage,
            imgUpload
        },
        computed: {
            ...mapState([
                'currentPanel',
                'settingInfo',
            ])
        },
        methods: {
            init(){
                window.addEventListener('resize',function () {
                    console.log('resize');
                    messageBus.$emit("resize");
                },false);
                this.setRem();
                $("body").css('fontSize','.24em');
            },
            setRem(designWidth){
                designWidth = designWidth || 750;
                document.documentElement.style.fontSize = 100*document.documentElement.clientWidth/designWidth+"px";
            },
            ...mapMutations([
                'CURRENT_PANEL',
                'USER_INFO',
                'UPDATE_TOKEN',
            ]),
        },
        created:function(){
            if(_DEV_){
                if(location.href.search("yxbTest")>-1){
                    var vConsole = new VConsole();
                }
            }else{
                if(location.href.search("yxbTest")>-1){
                    var vConsole = new VConsole();
                }
            }
            //设置默认页，因为和飞信不允许入口路径带有hash
            let hash = platformAPI.parseLocationSearch().hash;
            if(hash){
                // let search = location.search.replace("&hash="+hash,"");
                // search = search.replace("hash="+hash,"");
                // search == "?" && (search = '');
                // location.href = location.origin + location.pathname + search + "#" + hash;
                this.$router.push({path:hash});
            }

            let url = location.href.split('#')[0];
            //微信注入config,获取token
            //安卓初始化bridge，获取token
            platformAPI.init(url,this);
        },
        mounted: function () {
            this.init();
            let self = this;
            let asyncManager = utils.getAsyncManager();
            let tipShowTimer = null;

            platformAPI.login();

            messageBus.$on('globalLoadCover', function (info) {
                try {
                    if (!info.mark) {
                        return
                    } else {
                        if (info.status) {
                            asyncManager.register(info.mark);
                            self.globalLoadCover = true
                        } else {
                            if (asyncManager.checkLast(info.mark)) {
                                setTimeout(function () {
                                    self.globalLoadCover = false;
                                    if (typeof info.afterLastAsyncCb === "function") {
                                        info.afterLastAsyncCb.call();
                                    }
                                }, 1000)
                            }
                        }
                    }
                } catch (err) {
//                    asyncManager.loadingQueue.push({});
//                    alert(err);
                } finally {

                }
            });
            messageBus.$on('globalLoadCoverSimple', function (time) {
                setTimeout(function () {
                    self.globalLoadCover = false;
                    asyncManager.clear();
                }, time === 0 ? 0 : 1000)

            });

            messageBus.$on("windowOrientation", function (info) {
                self.orientationCoverShow = info;
            });

            //todo 需要重构或者注释逻辑
            messageBus.$on("tipCoverShow", function (info) {
                self.tipInfo = info;
                if (self.tipInfo.status) {
                    messageBus.$emit('globalLoadCoverSimple');
                }

                if (tipShowTimer) {
                    clearTimeout(tipShowTimer);
                }

                if (info.status === 2) {

                    tipShowTimer = setTimeout(function () {
                        self.tipInfo.status = 0;


                        if (typeof self.tipInfo.callBack === 'function') {
                            setTimeout(function () {
                                self.tipInfo.callBack()
                                tipShowTimer = null;
                            })
                        } else {
                            tipShowTimer = null;
                        }

                    }, info.interval || 400);

                }
            });


            messageBus.$on('showVConsole', function () {
                new VConsole();
            });

            messageBus.$on("editImgEleDef_toImgEditPage_app", function (eleDef) {
                // self.CURRENT_PANEL([{popupName:'imgEditPage',eleDef:self.settingInfo,lastMainItem:'setting'}])
                self.CURRENT_PANEL({popupName:'imgEditPage',eleDef:self.settingInfo,lastMainItem:'setting'})
            });

            messageBus.$on("updateUserinfo",function(userInfo){
                self.USER_INFO(userInfo);
            });
            messageBus.$on("updateToken",function(token) {
                self.UPDATE_TOKEN(token)
            });

            messageBus.$on("resize",function () {
                self.setRem();
            })
            // messageBus.$emit("tipCoverShow", {
            //     status: 1,
            //     desc: ['未知错误', '请重新进入'],
            //     icon: 'times',
            //     style:{
            //         tipDescPadding:'0 0.32rem 0.4rem'
            //     }
            // });
        },
        beforeDestroy: function () {
            messageBus.$off(['globalLoadCover', 'windowOrientation', 'tipCoverShow', 'editImgEleDef_toImgEditPage_app','updateUserinfo','updateToken']);
        }
    }

</script>
<style lang="less">
    *{
        -webkit-overflow-scrolling: touch;
    }
    .appContainer {
        height: 100%;
    }

    .appContent {
        height: 100%;
    }

    .globalCover {
        background-color: rgba(0, 0, 0, 0);
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 150;
        div {
            position: absolute;
            width: 16vw;
            height: 16vw;
            background: url("../images/loading.gif") no-repeat center;
            background-color: rgba(0, 0, 0, 0.6);
            background-size: 60% 60%;
            background-position: 50% 50%;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            border-radius: 4px;
        }
    }

    .orientationCover {
        background-color: rgb(0, 0, 0);
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100vw;
        height: 100vh;
        z-index: 200;
        div {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .2s
    }

    .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */
    {
        opacity: 0.5
    }

    .slide-fade-enter-active {
        transition: all .3s ease;
    }

    .slide-right-leave-active {
        transition: all .1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }

    .slide-right-enter, .slide-right-leave-to
        /* .slide-fade-leave-active for below version 2.1.8 */
    {
        transform: translateX(100%);
        opacity: 0;
    }

    .slide-left-leave-active {
        transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }

    .slide-left-enter, .slide-left-leave-to
        /* .slide-fade-leave-active for below version 2.1.8 */
    {
        transform: translateX(-100%);
        opacity: 0;
    }
    .mescroll-upwarp {
        min-height:45px;
    }
    .mescroll-empty .empty-icon {
        width: 26%
    }
    .loadTipWrap {
        height:100%;
        display:flex;
        justify-content:center;
        align-items:center
    }
</style>