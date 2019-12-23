<template>
    <div id="pageDurationAll" @click="stopTriggerPlay" v-if="pageDurationAllFlag && !bridgeObj">
        <span class="costTimeWrapper" v-if="showTimeFlag">
            <span>00 :</span>
            <span class="costTime">{{costTime < 10 ? '0' + costTime : costTime}}</span>
        </span>
        <span class="sumTimeWrapper" v-if="showTimeFlag">
                    <span>/ 00 :</span>
                    <span class="sumTime">{{sumTime < 10 ? '0' + sumTime : sumTime}}</span>
                </span>
        <span class="replay" v-if="showReplayFlag">重新播放</span>
    </div>
</template>
<script>
    import * as ajax from '../../lib/ajax.js'
    import * as utils from '../../lib/utils.js'
    import messageBus from "../messageBus.js"
    import {
        eqxiu
    } from '../../js/render/eqxiu.js'
    import Vue from 'vue'

    export default {
        props: ['tempProperty'],
        data: function () {
            return {
                /* 场景已费时间 */
                costTime: 0,
                /* 场景显示倒数时总费时时间（如实际时间为10.8，这里就会处理为11） */
                sumTime: 0,
                /* 场景实际总费时时间（如10.8） */
                sumTimeOri: 0,
                /* 页面逗留时长数组的索引下标 */
                idx: 0,
                /* 场景轮播计时器 */
                timerPage: null,
                /* 场景是否播放 */
                triggerPlay: false,
                /* 场景全局每页切换所耗时长，如[0.22],这个数据也将会保存到window.pageChangeTime中，给window对象中的同名属性赋值，是因为eqxiu.js切换页面的相关数据是从window.pageChangeTime取的，使用数组是因为某个地方改变了这个值（例如用户点击了页面，停止播放，window.pageChangeTime会被重置为默认值[0.4]），此时所有引用都同步最新修改的值，不受技术框架限制 */
                pageChangeTime: [],
                /*这个数组存放每页逗留的时长信息*/
                pagesDurationTime: [],
                /*获得eqxiu对象，主要使用其中翻页的API---nextPage*/
                eqxiuData: eqxiu,
                /*当点击的地方不是重新播放，就让clearLock为真，轮播立即结束*/
                clearLock: false,
                /*背景音乐地址*/
                audioSrc: '',
                /*播放完一次场景，此标志为true则显示“重新播放”*/
                showReplayFlag: false,
                /*此标志为true则显示倒数时间*/
                showTimeFlag: true,
                /*此标志为true则显示倒数或者“重新播放”，若点击了页面中不是“重新播放”的地方，轮播结束，此标志为false，消去倒数或“重新播放”字样*/
                pageDurationAllFlag: true,
                /*录制视频时，如果宋健提供的bridge对象为真，则不显示倒计时的提示板*/
                bridgeObj: ''
            }
        },
        computed: {
            record() {
                /*
                 这里要注意，只有myWorksView路由下，才允许场景播放时可以录制
                 使用宋健的浏览器调测时，输入网址要是myWorksView路由下的
                 不能直接点击个模板的网址（template路由下）来调测录制
                 */
                return this.$route.name === 'myWorksView';
            },
        },
        watch: {
            audioSrc(n, o) {
                let self = this;
                if (n && n !== o && self.triggerPlay) {
                    if (self.pageChangeTime.length) {
                        window.pageChangeTime = self.pageChangeTime;
                    }
                    /*
                     要获取到音乐地址，才开始轮播
                     因为宋健开始录制视频就需要我们把背景音乐地址传过去
                     */
                    self.initPlayScene()
                }
            }
        },
        methods: {
//          初始化所有相关变量
            init() {
                let self = this;
                clearInterval(self.sceneTimer);
                self.idx = 0;
                self.sumTime = 0;
                self.costTime = 0;
                self.timerPage = null;
                self.triggerPlay = self.tempProperty.triggerPlayScene;
                self.pageChangeTime = self.tempProperty.pageChangeTime ? self.tempProperty.pageChangeTime : [0.4];
                self.pagesDurationTime = self.tempProperty.pagesDurationTime ? self.tempProperty.pagesDurationTime : [];
                self.pagesDurationTime.forEach(function (val, idx) {
                    self.sumTime += (val - 0)
                });
                self.sumTimeOri = self.sumTime;
                self.sumTime = Math.ceil(self.sumTime);
                // console.log(self.sumTimeOri,self.sumTime);
            },
//          停止轮播
            stopTriggerPlay(e) {
                let self = this;
                clearTimeout(self.timerPage);
                clearInterval(self.sceneTimer);
                if (e && $(e.target).hasClass('replay')) {
                    setTimeout(function () {
                        self.eqxiuData.jumpPage(0, self.initPlayScene);
                    }, 100)
                } else {
                    self.pageDurationAllFlag = false;
                    //                    $('#pageDurationAll').hide();
                    self.clearLock = true;
                    window.pageChangeTime = [0.4]
                }
            },
//          轮播开始时调用，主要用于通知开始录制视频
            startCallBack() {
                let self = this;
                self.record && window.bridge && bridge.start(self.audioSrc);
            },
//          轮播开始时调用，主要用于通知开始录制视频
            endCallBack() {
                this.record && window.bridge && bridge.end();
            },
//          展示倒数时间
            showTime() {
                let self = this;
                self.showTimeFlag = true;
                self.showReplayFlag = false;
                self.pageDurationAllFlag = true;
            },
//          展示“重新播放”
            showReplay() {
                let self = this;
                self.showTimeFlag = false;
                self.showReplayFlag = true;
                self.pageDurationAllFlag = true;
            },
//          关于左上角展示“倒数时间”还是“重新播放”的选择
            showSceneTimer() {
                let self = this;
                if (this.triggerPlay) {
                    this.sceneTimer = setInterval(function () {
                        self.costTime++;
                        let leftTime = self.sumTime - self.costTime;
                        if (leftTime >= 0) {
                            self.showTime();
                        } else if (self.sumTime !== 0 && self.costTime !== 0 && leftTime === 0) {
                            self.showTime();
                        } else if (leftTime < 0) {
                            clearInterval(self.sceneTimer);
                            self.showReplay()
                        }
                    }, 1000)
                }
            },
//          轮播初始化
            initPlayScene() {
                let self = this;
                self.startCallBack();
                clearTimeout(self.timerPage);
                clearInterval(self.sceneTimer);
                self.initMusic();
                self.initSceneTimer();
                self.triggerPlayScene(self.pagesDurationTime[self.idx]);
            },
//          音乐初始化（音乐重置为0秒，正要开始播放的状态）
            initMusic() {
                let audio = document.querySelector("#audio");
                let audio1 = document.querySelector("#audio1");
                if (audio) {
                    audio.currentTime = 0;
                }
                if (audio1) {
                    audio1.currentTime = 0;
                }

            },
//          初始化倒数时间
            initSceneTimer() {
                let self = this;
                self.init();
                self.showTime();
                self.showSceneTimer();
            },
//          场景页面轮播逻辑，使用递归，触发递归的时刻，跟每页逗留的时长一致
            triggerPlayScene(pageDuration) {
                let self = this;
                let pageDurationDisposed = 1000 * (pageDuration - 0);
                if (self.tempProperty.triggerLoop) {
                    self.timerPage = setTimeout(function () {
                        if (self.clearLock) {
                            clearTimeout(self.timerPage);
                            clearInterval(self.sceneTimer);
                            return
                        }
                        eqxiu.nextPage();
                        self.idx++;
                        if (self.idx >= eqxiu._$pages.length) {
                            self.idx = 0;
                            self.endCallBack();
                            setTimeout(function () {
                                self.initMusic();
                                self.initSceneTimer()
                            })
                        }
                        self.triggerPlayScene(self.pagesDurationTime[self.idx]);
                    }, pageDurationDisposed)
                } else {
                    self.timerPage = setTimeout(function () {
                        if (self.clearLock) {
                            clearTimeout(self.timerPage);
                            clearInterval(self.sceneTimer);
                            return
                        }
                        eqxiu.nextPage();
                        self.idx++;
                        if (self.idx >= eqxiu._$pages.length && self.sumTimeOri - self.costTime <= 0) {
                            clearTimeout(self.timerPage);
//                            这里不设置50毫秒的延时，不会影响场景的正常使用，但会导致宋健录制视频未显示出最后一秒的倒数时间
                            setTimeout(function () {
                                self.endCallBack();
                            }, 50);
                        } else {
                            self.triggerPlayScene(self.pagesDurationTime[self.idx]);
                        }
                    }, pageDurationDisposed)
                }
            }
        },
        created() {
            let self = this;
            self.init();
            if(window.bridge){
            self.bridgeObj = window.bridge;
            }
        },
        mounted: function () {
            let self = this;
            console.log(678);
            messageBus.$on('audioSrc', (src) => {
                debugger
                console.log('收到更新后的src',src);
                self.audioSrc = src;
            });
            messageBus.$on('stopTriggerPlay', self.stopTriggerPlay);
        },
        updated: function () {
        },
//        跳转路由或关闭页面，触发停止轮播逻辑
        beforeRouteLeave(to, from, next) {
            this.stopTriggerPlay();
        },
        beforeDestroy: function () {
            this.stopTriggerPlay();
            messageBus.$off(['audioSrc', 'stopTriggerPlay']);
        }
    }
</script>
<style scoped lang="less">
    #pageDurationAll {
        position: absolute;
        left: 20px;
        top: 20px;
        z-index: 200;
        /*display: none;*/
        color: white;
        padding: 6px;
        background: rgba(0, 0, 0, .2);
    }
</style>