<template>
    <div class="wrapper">
        <div class="phone">
            <div v-img-edit="imgInformation" class="outer">
                <!--<canvas ref="myCanvas" style="position: absolute;display: none "></canvas>-->
                <canvas ref="myCanvas" style="position: absolute;display: none;"></canvas>
                <img src="" alt="" ref="base64_pic"
                     style="position: absolute;right: 0;width:100px;height: 100px;display: none ">
                <img class="inner-image" :src="imgSrc" alt="" ref="tulip">
                <!--<div class="img" :style="'background-image: url(' + eleDef.properties.src + ');'"></div>-->
                <div class="cover" ref="cover"
                     :style="'width:' + eleDef.css.width + 'px; height:' + eleDef.css.height + 'px;'" :mode="coverMode">
                    <div class="scale-handle"></div>
                </div>
            </div>
        </div>
        <!--<div v-if="showToolBar" class="tool-bar">-->
        <div class="tool-bar">
            <div class="btn-list">
                <div @click.stop="cancel" class="tool-bar-cancel"></div>
            </div>
            <div class="btn-list">
                <div @click.stop="finish" class="tool-bar-finish"></div>
            </div>
        </div>
    </div>

</template>

<script>
    import messageBus from '../../messageBus.js'
    import {mapState, mapMutations} from 'vuex'

    export default {
        props: ['eleDef', 'lastMainItem', "coverMode"],
        data() {
            return {
                showToolBar: true,
                bgPosition: {
                    backgroundPositionX: this.eleDef.properties.imgStyle.backgroundPositionX || "50%",
                    backgroundPositionY: this.eleDef.properties.imgStyle.backgroundPositionY || "50%",
                    scaleX: this.eleDef.properties.imgStyle.backgroundSizeX || "cover",
                    scaleY: this.eleDef.properties.imgStyle.backgroundSizeY || "cover",
                },
                imgInformation: {
                    scaleX: this.eleDef.properties.imgStyle.backgroundSizeX || "cover",
                    scaleY: this.eleDef.properties.imgStyle.backgroundSizeY || "cover",
                    x: this.eleDef.properties.imgStyle.backgroundPositionX || "50%",
                    y: this.eleDef.properties.imgStyle.backgroundPositionY || "50%",
                    updated: 0,
                    option: {}
                },
            }
        },
        computed: {
            imgSrc: function () {
                return /http/i.test(this.eleDef.properties.src) ||
                /weixin/i.test(this.eleDef.properties.src) ||
                /wxLocalResource/i.test(this.eleDef.properties.src) ?
                    this.eleDef.properties.src :
                    PREFIX_FILE_HOST + this.eleDef.properties.src
            }
        },
        methods: {

            ...mapMutations([
                'CURRENT_PANEL'
            ]),
            finish() {
                let self = this;
                if (self.lastMainItem === 'setting') {
                    let sx = self.$refs.cover.style.left.replace("px", "") - self.$refs.tulip.style.left.replace("px", "");
                    let sy = self.$refs.cover.style.top.replace("px", "") - self.$refs.tulip.style.top.replace("px", "");
                    let coverWidth = self.$refs.cover.style.width.replace("px", "") - 0;
                    let coverHeight = self.$refs.cover.style.height.replace("px", "") - 0;
                    let imgWidth = self.$refs.tulip.style.width.replace("px", "") - 0;
                    let imgHeight = self.$refs.tulip.style.height.replace("px", "") - 0;


                    let canvas = self.$refs.myCanvas;//获取canvas
                    let ctx = canvas.getContext("2d"); //对应的CanvasRenderingContext2D对象(画笔)
                    let min = Math.min(imgWidth, imgHeight);

                    canvas.width = min;
                    canvas.height = min;
                    let image = new Image();//创建新的图片对象
                    image.setAttribute('crossOrigin', 'anonymous');

                    image.onload = function () {
//                        alert('enter image.onload');
                        let imgOriWidth = image.width;
                        let imgOriHeight = image.height;
                        let xRate = imgWidth / imgOriWidth;
                        let yRate = imgHeight / imgOriHeight;
                        ctx.drawImage(image, sx / xRate, sy / yRate, coverWidth / xRate, coverHeight / yRate, 0, 0, min, min);

                        let base64Image = canvas.toDataURL();
                        self.$refs.base64_pic.src = base64Image;
//--------------------------todo 发送base64字符串转换地址的请求,跨域问题待解决
                        messageBus.$emit("sendBase64AndGetUrl", base64Image);
                    };
                    image.src = self.$refs.tulip.src;
                } else {
                    self.CURRENT_PANEL('');
                    messageBus.$emit("scrollToPosition");
                    messageBus.$emit("showCommonBar");
                    messageBus.$emit('imgPositionChanged', {
                        id: self.eleDef.id,
                        x: self.bgPosition.backgroundPositionX,
                        y: self.bgPosition.backgroundPositionY,
                        scaleX: self.bgPosition.scaleX,
                        scaleY: self.bgPosition.scaleY,
                        width: $(".cover").width(),
                        height: $(".cover").height(),
                    });
                }
            },
            cancel() {
                let self = this;
                if (self.lastMainItem === 'setting') {
                    // self.CURRENT_PANEL([{popupName:'setting'}]);
                    self.CURRENT_PANEL('');
                } else {
                    self.CURRENT_PANEL('');
                    messageBus.$emit("scrollToPosition");
                    messageBus.$emit('showCommonBar');
                }
                messageBus.$emit('allEditCoverHide');
                messageBus.$emit('allProxyItemHide');

            }
        },
        created() {
        },
        mounted() {
            let self = this;
            messageBus.$on('imgBgParamsChanged', function (data) {
                self.bgPosition.backgroundPositionX = data.widthPosition + '%';
                self.bgPosition.backgroundPositionY = data.heightPosition + '%';
                self.bgPosition.scaleX = data.scaleX + '%';
                self.bgPosition.scaleY = data.scaleY + '%';
            });
            messageBus.$on('imgEditShowToolBar', function (info) {
                self.showToolBar = info;
            });
        },
        beforeDestroy: function () {
            messageBus.$off(['imgBgParamsChanged','imgEditShowToolBar']);
        },
    }
</script>

<style scoped lang="less">

    @colorRed: #0080cc;
    .wrapper {
        height: 100%;
    }

    .phone {
        width: 100vw;
        height: 90%;
    }

    .outer {
        position: relative;
        width: 100vw;
        height: 100%;
        overflow: auto;
        background: black;
    }

    .img {
        width: 100vw;
        height: 100vh;
        background-size: contain;
        background-repeat: no-repeat;
    }

    .inner-image {
        position: absolute;
    }

    .cover {
        position: absolute;
        top: 0;
        left: 0;
        /*border: 2px dotted red;*/
        box-shadow: 0 0 2000px 2000px rgba(0, 0, 0, 0.5);
        min-height: 60px;
        min-width: 60px;
    }

    .tool-bar {
        position: absolute;
        /*height: 4.2rem;*/
        height: 10vh;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: #fff;
    }

    .tool-bar-toggle {
        position: fixed;
        border-radius: 50%;
        background-color: black;
        height: 5vh;
        width: 5vh;
        bottom: 2.5vh;
        right: 2.5vh;

    }

    .scale-handle {
        position: absolute;
        /*border-radius: 50%;*/
        /*border-right: 2px solid white;*/
        /*border-bottom: 2px solid white;*/
        /*background-color: transparent;*/
        width: 30px;
        height: 30px;
        background: url("../../../images/drag.png") no-repeat center;
        background-size: contain;
        bottom: 0px;
        right: 0px;
    }

    .tool-bar .btn-list {
        width: 50%;
        height: 100%;
        float: left;
        position: relative;
    }

    .tool-bar-cancel {
        background: url("../../../images/cancel.png") center center no-repeat;
    }

    .tool-bar-finish {
        background: url("../../../images/finish.png") center center no-repeat;
    }

    /*.tool-bar-change {*/
    /*background: url("../../../images/change.png") center center no-repeat;*/
    /*}*/

    .tool-bar-cancel, .tool-bar-finish {
        background-size: contain;
        position: absolute;
        top: 20%;
        left: 30%;
        width: 40%;
        height: 60%;
    }
</style>