<template>
    <div>
        <div v-show="showPhoneView && limit.agree === 0" class="phone-view" @touchstart.stop="stopTriggerPlay">
            <!--背景音乐组件-->
            <bg-music-ctrl :template-data='templateData'></bg-music-ctrl>
            <!--翻页提示组件-->
            <guide v-if="tempProperty && pagesLength > 1" :template-data='templateData'></guide>
            <!--剩余预览次数组件-->
            <left-preview v-if="myWorkStatus - 0 === 0 ||myWorkStatus - 0 === 1" :sum="limit.sum"
                          :used="limit.used" :myWorkStatus="myWorkStatus"></left-preview>
            <!--场景自动播放功能组件-->
            <trigger-play v-if="tempProperty && tempProperty.pagesDurationTime && tempProperty.pagesDurationTime.length"
                          :tempProperty="tempProperty" :myWorkStatus="myWorkStatus"></trigger-play>
        </div>
    </div>
</template>
<script>
    import '@src/js/render/checkEnv.js'
    import '@src/js/render/previewbegin.js'
    import '@src/js/render/previewend.js'
    import '@src/js/render/addComponent.js'
    import '@src/js/render/005eqxCommon.js'
    import {eqxiu} from '@src/js/render/eqxiu.js'
    import '@src/js/render/renderPage.js'
    import {parse} from '@src/js/render/index.js'
    import * as ajax from '@lib/ajax'
    import * as utils from '@lib/utils'
    import messageBus from '@components/messageBus'
    import bgMusicCtrl from "@components/bgMusic/bgMusicCtrl.vue"
    import triggerPlay from "@components/triggerPlay/triggerPlay.vue"
    import guide from "@components/guide/guide.vue"
    import leftPreview from "@components/leftPreview/leftPreview.vue"
    import endPage from "@components/commonComponent/endPage.js"
    import {mapState, mapMutations} from 'vuex'


    export default {
        props: ['myWorkStatus', 'limit'],
        data: function () {
            return {
//              页面元素渲染所需的所有数据
                templateData: {},
                showPhoneView: false,
//              跟场景是否自动轮播有关，包含着场景轮播所需的数据
                tempProperty: null,
//              这个是标志预览下方的翻页箭头，如果总页数只有1页，就不闪烁翻页箭头
                pagesLength: 1
            }
        },
        watch: {
            limit(newval, oldval){
                let self = this;
                if (newval.agree !== 0) {
                    messageBus.$emit('tipCoverShow', {
                        status: 1,
                        desc: ['已超过允许预览次数'],
                        btns: [
                            {
                                text: '回到首页',
                                btnCallBack: function () {
                                    self.$router.push({path:'/index'});
                                    messageBus.$emit("tipCoverShow", {
                                        status: 0
                                    });
                                }
                            }
                        ]
                    });
                }
            }
        },
        computed: {
            ...mapState([
                "currentType"
            ])
        },
        components: {
            bgMusicCtrl,
            triggerPlay,
            guide,
            leftPreview
        },
        methods: {
            ...mapMutations([
                'CURRENT_TYPE'
            ]),
            forceLoadEnd() {
                messageBus.$emit('globalLoadCoverSimple');
            },
            stopIosBgmusic() {
                let audio1 = document.querySelector("#audio1");
                audio1.src = '';
                audio1.pause();
                if ($('.musicStatusCtrlBtn').length > 0) {
                    $('.musicStatusCtrlBtn').removeClass("musicActive");
                }
            },
            stopTriggerPlay(e){
                if (e && $(e.target).hasClass('replay')) {
                    return
                }
                messageBus.$emit('stopTriggerPlay', e);
            },
            fetchData(id) {
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
                            //  loadEnd
                            messageBus.$emit('globalLoadCover', {
                                status: false,
                                mark: mark
                            });
                            // 如果是template组件引用,title为作品标题
                            if(self.$route.fullPath.indexOf('template')>0){
                                document.title = data.obj.name;
                            }


                            self.templateData = data;

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
                            if(self.templateData.list[0].properties.bgAudio){
                                if(utils.isIos()){
                                    // $('#audio1')[0].src = PREFIX_FILE + 'Uploads/' + self.templateData.list[0].properties.bgAudio;
                                }else{
                                    $('#audio')[0].src = PREFIX_FILE + 'Uploads/' + self.templateData.list[0].properties.bgAudio;
                                }
                                setTimeout(()=>{
                                    messageBus.$emit('audioSrc',PREFIX_FILE + 'Uploads/' + self.templateData.list[0].properties.bgAudio);
                                console.log('已更新src',PREFIX_FILE + 'Uploads/' + self.templateData.list[0].properties.bgAudio);
                                },0)
                                
                            }

                            // 添加尾页
                            if (!data.obj.property || !utils.processReturnObj(data.obj.property).hideEqAd) {
                                self.templateData.list.push(endPage);
                            }
                            parse(data);

//todo 数据初始化
                            self.tempProperty = Object.assign(data.obj.property);
                            self.pagesLength = eqxiu._$pages.length

                        }
                        self.forceLoadEnd();
                    })
                    .catch(function (error) {
                        self.forceLoadEnd();
                    })
            }
        },
        created: function () {
            let self = this;
            self.fetchData(self.$route.params.id);
        },
        mounted() {
            messageBus.$on("showPhoneView", () => this.showPhoneView = true);
        },
        beforeRouteLeave(to, from, next) {
            this.stopTriggerPlay();
            this.stopIosBgmusic();
            next();
        }
    }
</script>
<style lang="less" scoped>
    .phone-view::-webkit-scrollbar{
        width:0;
        height:0;
    }
</style>

