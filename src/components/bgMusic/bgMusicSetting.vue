<template>
    <div class="bgMusicSetting">
        <div>
            <div class="music-tip">
                <button @click="cancel" class="musicBtn">取消</button>
                <h1 class="title">选择音乐</h1>
                <button @click="confirm" class="musicBtn">确定</button>
            </div>
            <ul class="musicBase">
                <li :musicId="item.id" v-for="(item,index) in musicList" :key="index"
                    @click="bgMusicPick($event,index)">
                    <p class="music-tit">{{item.name}}</p>
                    <i :class="{active:currentIndex === index}"></i>
                </li>
                <li v-if="loadstatus === 'goOnPull'"
                    style="display: flex;justify-content: center;align-items: flex-start;">
                    <div style="font-weight: bold;padding-top: 6px">上拉加载更多</div>
                </li>
                <li v-if="loadstatus === 'loadMore'"
                    style="display: flex;justify-content: center;align-items: center;">
                    <div style="font-weight: bold;">
                        <img src="../../images/loading.gif" alt=""
                             style="width: 20px;height: 20px;"></div>
                </li>
                <li v-if="loadstatus === 'noMore'"
                    style="display: flex;justify-content: center;align-items: center;">
                    <div style="font-weight: bold;">没有更多了</div>
                </li>

            </ul>
            <!--<div class="noBgMusicBar">-->
                <!--<h1 class="noBgMusicBtn" @click.stop="noBgMusic">无背景音乐</h1>-->
            <!--</div>-->
            <div class="musicActiveBar">
                <h1 class="musicActiveTip">
                    <img src="../../images/musicActiveTip.png" alt="" style="height: 15px;width: 17px;padding-right: 2px">
                    当前选择：{{musicList[currentIndex]?musicList[currentIndex].name: '无'}}</h1>
            </div>
        </div>
    </div>
</template>
<script>
    import * as ajax from '../../lib/ajax.js'
    import * as utils from '../../lib/utils.js'
    import messageBus from "../messageBus"
    import {mapState, mapMutations} from 'vuex'


    export default {
        props: ['templateData'],
        data: function () {
            return {
                currentIndex: '',
                musicList: [],
                currentPage: 1,
                totalPage: 1,
                oldBgMusic: '',
                loadstatus: 'loadmore',
                loadLock: false
            }
        },
        watch: {
            musicList: function (newVal, oldVal) {
                let self = this;
                if (newVal !== oldVal && self.oldBgMusic) {
                    $.each(self.musicList, function (idx, item) {
                        if (self.musicList[idx].path === self.oldBgMusic) {
                            self.currentIndex = idx;
                            return false
                        }
                    })
                }
            }
        },
        methods: {
            ...mapMutations([
                'CURRENT_PANEL'
            ]),
            stopTempMusic(){
                let audioTemp = document.querySelector('#audioTemp');
                audioTemp.src = '';
                audioTemp.pause();
            },
            playTempMusic(src){
                let audioTemp = document.querySelector('#audioTemp');
                audioTemp.src = src;
                audioTemp.play();
            },
            bgMusicPick(e, index) {
                let self = this;
                if(self.currentIndex === index){
                    self.noBgMusic();
                    self.stopTempMusic();
                    return
                }
                self.currentIndex = index;
                self.playTempMusic(PREFIX_FILE + 'Uploads/' + self.musicList[self.currentIndex].path)
            },
            confirm() {
                let self = this;
                self.stopTempMusic();
                if (self.currentIndex === -1) {
                    messageBus.$emit('bgMusicChanged', {
                        bgAudio: ''
                    });
                } else if (self.currentIndex === '') {
                    messageBus.$emit('bgMusicChanged', {
                        bgAudio: self.oldBgMusic
                    });
                } else if (self.musicList[self.currentIndex].path) {
                    messageBus.$emit('bgMusicChanged', {
                        bgAudio: self.musicList[self.currentIndex].path
                    });
                }
                this.CURRENT_PANEL('')
            },
            cancel() {
                this.stopTempMusic();
                this.CURRENT_PANEL('')
                messageBus.$emit('playMusic');

            },
            getMusicList: function () {
                let self = this;
                if (self.currentPage === 1) {
                    messageBus.$emit('globalLoadCover', {
                        status: true,
                        mark: {}
                    })
                }
                if(self.templateData.list[0].properties){
                    self.oldBgMusic = self.templateData.list[0].properties.bgAudio;
                }else{
                    self.oldBgMusic = '';
                }
                ajax.queryCommonSongList({
                    "method": "c=upfile&a=syslist&pageNo=" + self.currentPage + "&pageSize=12&fileType=2&bizType=0&time=1513737002029",
                    "methodType": 'get'
                }).then(function (data) {
                    if (self.currentPage === 1) {
                        messageBus.$emit('globalLoadCoverSimple');
                    }
                    data = utils.processReturnObj(data);
                    data.data = utils.processReturnObj(data.data);
                    if (data.data.msg === 'success') {
                        setTimeout(function () {
                            self.totalPage = Math.ceil(data.data.map.count / 12);
                            self.currentPage++;
                            self.musicList = self.musicList.concat(data.data.list);
                            self.loadstatus = 'loadMore';
                            self.loadLock = false;
                        }, 600)
                    } else {
                        throw 1
                    }
                }).catch(function (error) {
                    if (self.currentPage === 1) {
                        messageBus.$emit('globalLoadCoverSimple');
                    }
                    setTimeout(function () {
                        self.loadstatus = 'loadMore';
                        self.loadLock = false;
                    }, 600);
                    messageBus.$emit("tipCoverShow", {
                        status: 2,
                        desc: ['未知错误', '请重新进入'],
                        icon: 'times',
                        style:{
                            tipDescPadding:'0 0.32rem 0.4rem'
                        }
                    });
                })
            },
            noBgMusic: function () {
                this.currentIndex = -1
            }
        },
        mounted: function () {
            let self = this;
            self.getMusicList();
            $('.musicBase').scroll(function () {
                let scrollTop = $(this).scrollTop();
                let contentHeight = $(this)[0].scrollHeight;
                let wrapperHeight = $(this).height();
//                console.log(contentHeight-scrollTop,wrapperHeight);
                if (contentHeight - scrollTop < parseInt(wrapperHeight) + 40 && contentHeight - scrollTop >= parseInt(wrapperHeight) + 3) {
                    self.loadstatus = 'goOnPull';
                } else if (contentHeight - scrollTop < parseInt(wrapperHeight) + 24) {
                    self.loadstatus = 'loadMore';
                    if (self.currentPage <= self.totalPage) {
                        if (self.loadLock) {
                            return
                        }
                        self.loadLock = true;
                        self.getMusicList();
                    } else {
                        self.loadstatus = 'noMore';
//                        messageBus.$emit("tipCoverShow", {
//                            status: 2,
//                            desc: ['没有更多了']
//                        });
                    }
                }
            });
        },
    }
</script>
<style scoped lang="less">

    .bgMusicSetting {
        background-color: #fff;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 150;
        .music-tip {
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: #0080cc;
            height: 10vh;
            padding: 0 3.2vw;
            box-shadow: 1px 0 10px rgba(0, 0, 0, .5);
            .musicBtn {
                border: none;
                color: #333;
                background: none;
                font-size: 14px;
            }
            .title {
                font-size: 16px;
            }
        }
        .musicBase {
            overflow: scroll;
            -webkit-overflow-scrolling: touch;
            height: 80vh;
            li {
                border-top: 1px solid #a0a0a0;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                height: 10vh;
                padding: 0 3.2vw;
                .music-tit {
                    width: 80vw;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                }
                i {
                    width: 13.6vw;
                    height: 100%;
                    background: url(../../images/tick_default.png) no-repeat;
                    background-position: right 2vw center;
                    background-size: 7vw auto;
                }
            }
        }
        .noBgMusicBar {
            display: flex;
            justify-content: center;
            align-items: center;
            color: #0080cc;
            height: 10vh;
            padding: 0 3.2vw;
            box-shadow: 1px 0 10px rgba(0, 0, 0, .5);
            .noBgMusicBtn {
                font-size: 16px;
            }
        }
        .musicActiveBar {
            display: flex;
            justify-content: center;
            align-items: center;
            background:#0080cc;
            color: #fff;
            height: 10vh;
            padding: 0 3.2vw;
            box-shadow: 1px 0 10px rgba(0, 0, 0, .5);
            .musicActiveTip {
                font-size: 13px;
            }
        }
        .active {
            background: url(../../images/tick_blue.png) no-repeat !important;
            background-position: right 2vw center !important;
            background-size: 7vw auto !important;
            /*background: lightgreen;*/
        }
    }
</style>