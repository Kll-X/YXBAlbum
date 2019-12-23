<template>
    <div class="bgMusicWrapper" v-if="audioShow">
        <img class="musicStatusCtrlBtn" @click.stop="changeMusicStatus()" loop="loop" src="../../images/bgMusic1.png"/>
        <!--<img class="musicStatusCtrlBtn" @click.stop="changeMusicStatus()" loop="loop" src="../../images/bgMusic.png"/>-->
        <!--{{templateData.list[0].properties.bgAudio}}-->
    </div>
</template>
<script>
    import * as ajax from '../../lib/ajax.js'
    import * as utils from '../../lib/utils.js'
    import messageBus from "../messageBus.js"
    import Vue from 'vue'

    export default {
        props: ['templateData'],
        data: function () {
            return {
                musicPreUrl: PREFIX_FILE + 'Uploads/',
                genVConsole: 0,
                isIos: utils.isIos(),
                uneffect_modifyTemplateData: false
            }
        },
        computed: {
            audioShow: function () {
                return this.templateData.list && this.templateData.list[0] && this.templateData.list[0].properties ? this.templateData.list[0].properties && this.templateData.list[0].properties.bgAudio : ''
            },
            audioSrc: {
                get: function () {
                    let src = this.templateData.list && this.templateData.list[0] && this.templateData.list[0].properties && this.templateData.list[0].properties.bgAudio ? this.musicPreUrl + this.templateData.list[0].properties.bgAudio : '';
                    // messageBus.$emit('audioSrc',src);
                    console.log(123123,src);
                    return src
                },
                set: function (newValue) {
                    $('.musicStatusCtrlBtn').removeClass("musicActive");
                    return ''
                }
            }
        },
        methods: {
            changeMusicStatus() {
                let self = this;
                let audio = $('#audio')[0];
                let audio1 = $('#audio1')[0];
                if (self.isIos) {
                    if (audio1) {
                        if (audio1.paused) {
                            audio1.play();
                            self.sync(audio1);
                        } else {
                            audio1.pause();
                            self.sync(audio1);
                        }
                    }
                } else {
                    if (audio) {
                        if (audio.paused) {
                            audio.play();
                            self.sync(audio);
                        } else {
                            audio.pause();
                            self.sync(audio);
                        }
                    }
                }

                self.genVConsole += 1;
                if (self.genVConsole > 20) {
                    messageBus.$emit('showVConsole');
                }
                if (self.genVConsole > 30) {
                    this.$router.push({name: 'report'})
                }
            },
            sync(target) {
                if (target.paused) {
                    $('.musicStatusCtrlBtn').removeClass("musicActive");
                } else {
                    $('.musicStatusCtrlBtn').addClass("musicActive");
                }
            }
        },
        mounted: function () {
            let self = this;
            let audio = $('#audio')[0];
            let audio1 = $('#audio1')[0];
            if (self.isIos) {
                audio1.src = self.audioSrc;
                if (self.audioSrc) {
                     //因图文网页结构不一样,单独处理背景设置页与全局背景音乐同时播放问题
                    if(self.$route.fullPath.indexOf('articleEdit') >-1){
                        audio1 && audio1.pause();
                    }
                    audio1.play();
                    if (audio1.paused) {
                        $('.musicStatusCtrlBtn').removeClass("musicActive");
                    } else {
                        $('.musicStatusCtrlBtn').addClass("musicActive");
                    }
                }
            } else {
                    audio && (audio.src = self.audioSrc);
                    //因图文网页结构不一样,单独处理背景设置页与全局背景音乐同时播放问题
                    if(self.$route.fullPath.indexOf('articleEdit') >-1){
                        audio && audio.pause();
                    }
                self.changeMusicStatus();
            }
            messageBus.$on('uneffect_modifyTemplateData',function (data) {
                self.uneffect_modifyTemplateData = data;
            });
            messageBus.$on('changeMusicStatus',function () {
                self.changeMusicStatus();
            });
        },
        updated: function () {
            let self = this;
            if(!self.uneffect_modifyTemplateData){
                let audio1 = document.querySelector('#audio1');
                if (self.isIos) {
                    audio1.src = self.audioSrc;
                    if (self.audioSrc) {
                        audio1.play();
                        if (audio1.paused) {
                            $('.musicStatusCtrlBtn').removeClass("musicActive");
                        } else {
                            $('.musicStatusCtrlBtn').addClass("musicActive");
                        }
                    }
                } else {
                    self.changeMusicStatus();
                }
            };
        },
        beforeDestroy: function () {
            
                let audio = $('#audio')[0];
                let audio1 = $('#audio1')[0];
                if (this.isIos) {
                    if (audio1) {
                        audio1.pause();
                    }
                } else {
                    if (audio) {
                        audio.pause();
                    }
                }
            

            messageBus.$off('uneffect_modifyTemplateData');
            messageBus.$off('changeMusicStatus');
        }
    }
</script>
<style scoped lang="less">
    .bgMusicWrapper {
        z-index: 140;
        .musicStatusCtrlBtn {
            width: 25px;
            height: 25px;
            position: fixed;
            right: 13px;
            top: 16px;
            z-index: 200;
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
    }


</style>