<template>
    <div
            v-if="eleDef.type === 4 && eleDef.properties.replacement !== true"
            :style="styleObject"
    >
        <img :src="imgSrc" :style="imgStyleObject">
    </div>

    <!--<div v-else-if="eleDef.type === 4 && eleDef.properties.replacement === true" @click="toggleEditShow('img')" :style="changeableStyleObject">-->

    <!--//移动和删除元素的代码，解注释，并把上面代码注释即可使用-->
    <div
            v-else-if="eleDef.type === 4 && eleDef.properties.replacement === true"
            v-finger:tap="toggleImgEditShow"
            v-finger:touch-start="touchStart"
            v-finger:touch-move="touchMove"
            v-finger:touch-end="touchEnd"
            :style="changeableStyleObject"
    >
        <div class="edit-container" :style="bgStyleObj"></div>
        <!--<div class="edit-cover" :style="coverStyleObject"></div>-->
        <div class="edit-cover"></div>
    </div>

    <div v-else-if="eleDef.type == 2" @click="toggleTextEditShow" :style="changeableStyleObject"
         v-finger:touch-start="touchStart"
         v-finger:touch-move="touchMove"
         v-finger:touch-end="touchEnd"
    >
        <!--<div v-else-if="eleDef.type == 2" v-finger:tap="toggleTextEditShow" :style="changeableStyleObject">-->
        <div class="edit-cover" :style="coverStyleObject"></div>
        <p v-html="eleDef.content" class="edit-font"></p>
    </div>

    <div v-else-if="eleDef.type === 3 && eleDef.properties.imgSrc" :style="bgEleStyleObj">
    </div>
</template>

<script>
    import components from "../../../js/render/yxbCoreComponents.js";
    import messageBus from "../../messageBus.js"

    export default {
        props: ["eleDef"],
        data: function () {
            return {
                styleObject: {
                    position: 'absolute',
                    zIndex: this.eleDef.css.zIndex,
                    top: this.eleDef.css.top + 'px',
                    left: this.eleDef.css.left + 'px',
                    lineHeight: this.eleDef.css.lineHeight,
                    width: this.eleDef.css.width + 'px',
                    height: this.eleDef.css.height + 'px',
                    backgroundColor: this.eleDef.css.backgroundColor,
                    opacity: this.eleDef.css.opacity,
                    color: this.eleDef.css.color,
                    borderWidth: this.eleDef.css.borderWidth + 'px',
                    borderStyle: this.eleDef.css.borderStyle,
                    borderColor: this.eleDef.css.borderColor,
                    paddingBottom: this.eleDef.css.paddingBottom + 'px',
                    paddingTop: this.eleDef.css.paddingTop + 'px',
                    borderRadius: this.eleDef.css.borderRadius,
                    transform: this.eleDef.css.transform,
                    borderRadiusPerc: this.eleDef.css.borderRadiusPerc,
                    borderBottomRightRadius: this.eleDef.css.borderBottomRightRadius,
                    borderBottomLeftRadius: this.eleDef.css.borderBottomLeftRadius,
                    borderTopRightRadius: this.eleDef.css.borderTopRightRadius,
                    borderTopLeftRadius: this.eleDef.css.borderTopLeftRadius,
                    boxShadow: this.eleDef.css.boxShadow,
                    boxShadowDirection: this.eleDef.css.boxShadowDirection,
                    boxShadowSize: this.eleDef.css.boxShadowSize,
                },
                imgStyleObject: {
                    width: this.eleDef.css.width + 'px',
                    height: this.eleDef.css.height + 'px'
                },
                editCoverShow: false,
            }
        },
        computed: {
            imgSrc: function () {
                return /http/i.test(this.eleDef.properties.src) ||
                /weixin/i.test(this.eleDef.properties.src) ||
                /wxLocalResource/i.test(this.eleDef.properties.src) ?
                    this.eleDef.properties.src :
                    PREFIX_FILE_HOST + this.eleDef.properties.src
            },

            bgStyleObj: function () {

                let backgroundSize;

                if (
                    this.eleDef.properties.imgStyle.backgroundSizeX &&
                    this.eleDef.properties.imgStyle.backgroundSizeX !== "cover" &&
                    this.eleDef.properties.imgStyle.backgroundSizeY &&
                    this.eleDef.properties.imgStyle.backgroundSizeY !== "cover"
                ) {
                    backgroundSize = this.eleDef.properties.imgStyle.backgroundSizeX + " " + this.eleDef.properties.imgStyle.backgroundSizeY;
                } else {
                    backgroundSize = "cover";
                }

                return {
                    backgroundImage: "url('" + this.getImgSrc() + "')",
//                    backgroundImage: "url(" + "wxlocalresource://53586274335838" + "')",
                    backgroundPositionX: this.eleDef.properties.imgStyle.backgroundPositionX ? this.eleDef.properties.imgStyle.backgroundPositionX : "50%",
                    backgroundPositionY: this.eleDef.properties.imgStyle.backgroundPositionY ? this.eleDef.properties.imgStyle.backgroundPositionY : "50%",
                    backgroundSize: backgroundSize,
                    backgroundRepeat: "no-repeat",
                    borderRadius: this.eleDef.css.borderRadius,
                    borderRadiusPerc: this.eleDef.css.borderRadiusPerc,
                    borderBottomRightRadius: this.eleDef.css.borderBottomRightRadius,
                    borderBottomLeftRadius: this.eleDef.css.borderBottomLeftRadius,
                    borderTopRightRadius: this.eleDef.css.borderTopRightRadius,
                    borderTopLeftRadius: this.eleDef.css.borderTopLeftRadius,
                }
            },

            bgEleStyleObj: function () {
                return {
                    backgroundImage: "url('" + this.getBgImgSrc() + "')",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPositionX: "50%",
                    backgroundPositionY: "50%",
                    zIndex: "-1",
                    width: "320px",
                    height: "486px"
                }
            },
            bgSrc: function () {
                return /http/i.test(this.eleDef.properties.imgSrc) ||
                /weixin/i.test(this.eleDef.properties.imgSrc) ||
                /wxLocalResource/i.test(this.eleDef.properties.src) ?
                    this.eleDef.properties.imgSrc :
                    //                    PREFIX_FILE_HOST + this.eleDef.properties.imgSrc
                    "http://yxbsve.mmarket.com/Uploads/" + this.eleDef.properties.imgSrc
            },
            changeableStyleObject: function () {
                let tempStr = '';
                let tempObj = {};
                if (this.eleDef.content) {
                    let reg = /(style=\".*\")/g;
                    let a = this.eleDef.content.match(reg);
                    if (a) {
                        tempStr = tempStr + $(this.eleDef.content).attr('style');
                        if ($(this.eleDef.content).children().length) {
                            tempStr = tempStr + $(this.eleDef.content).children().attr('style');
                        }
                        tempStr.split(';').forEach(function (item, idx) {
                            let a = item.split(':');
                            if(a[0].indexOf('font-size') >= 0){
                            }else{
                                if (a.length && a[1] && a[0].trim() !== 'color') {
                                    let index = a[0].trim().indexOf('-');
                                    let lower = a[0].trim().charAt(index+1);
                                    a[0] = a[0].replace('-'+lower,lower.toUpperCase());
                                    tempObj[a[0].trim()] = a[1].trim();
                                } 
                            }
                        });
                    }
                }
                this.eleDef.css = Object.assign(this.eleDef.css,tempObj);
                return {
                    backgroundColor: this.eleDef.css.backgroundColor,
                    borderRadiusPerc: this.eleDef.css.borderRadiusPerc,
                    borderBottomRightRadius: this.eleDef.css.borderBottomRightRadius,
                    borderBottomLeftRadius: this.eleDef.css.borderBottomLeftRadius,
                    borderTopRightRadius: this.eleDef.css.borderTopRightRadius,
                    borderTopLeftRadius: this.eleDef.css.borderTopLeftRadius,
                    borderColor: this.eleDef.css.borderColor,
                    borderRadius: this.eleDef.css.borderRadius,
                    borderStyle: this.eleDef.css.borderStyle,
                    color: this.eleDef.css.color,
                    borderWidth: this.eleDef.css.borderWidth + 'px',
                    boxShadow: this.eleDef.css.boxShadow,
                    boxShadowDirection: this.eleDef.css.boxShadowDirection,
                    boxShadowSize: this.eleDef.css.boxShadowSize,
                    fontSize: typeof this.eleDef.css.fontSize === 'string' && this.eleDef.css.fontSize.indexOf('px')?this.eleDef.css.fontSize:this.eleDef.css.fontSize + 'px',
                    position: 'absolute',
                    zIndex: this.eleDef.css.zIndex,
                    top: this.eleDef.css.top + 'px',
                    left: this.eleDef.css.left + 'px',
                    lineHeight: this.eleDef.css.lineHeight,
                    width: this.eleDef.css.width + 'px',
                    height: this.eleDef.css.height + 'px',
                    opacity: this.eleDef.css.opacity,
                    paddingBottom: this.eleDef.css.paddingBottom + 'px',
                    paddingTop: this.eleDef.css.paddingTop + 'px',
                    paddingLeft: this.eleDef.css.paddingLeft + 'px',
                    paddingRight: this.eleDef.css.paddingRight + 'px',
                    textAlign: this.eleDef.css.textAlign,
                    transform: this.eleDef.css.transform,
                    boxSizing: 'content-box'
                };
            },
            coverStyleObject () {
                return {
                    border: this.editCoverShow ? "2px dotted red" : "2px dotted white",
                    borderRadius: this.eleDef.css.borderRadius,
                    borderRadiusPerc: this.eleDef.css.borderRadiusPerc,
                    borderBottomRightRadius: this.eleDef.css.borderBottomRightRadius,
                    borderBottomLeftRadius: this.eleDef.css.borderBottomLeftRadius,
                    borderTopRightRadius: this.eleDef.css.borderTopRightRadius,
                    borderTopLeftRadius: this.eleDef.css.borderTopLeftRadius,
                }
            },
        },
        methods: {
            // toggleEditShow被分解为针对text和img的两个函数，此函数已无用。
            toggleEditShow: function (type) {
                let self = this;
                self.editCoverShow = !self.editCoverShow;

                if (self.editCoverShow === true) {
                    if (type === "text") {
                        messageBus.$emit('showTextBar', self.eleDef);
                    } else if (type === "img") {
                        messageBus.$emit('showImgBar', self.eleDef);
                    }
                } else {
                    messageBus.$emit('showCommonBar');
                }

                messageBus.$emit('otherEditCoverHide', self.eleDef.id);
            },
            toggleTextEditShow: function () {
                let self = this;
                self.editCoverShow = !self.editCoverShow;
                messageBus.$emit('allProxyItemHide');
                if (self.editCoverShow === true) {
                    messageBus.$emit('showTextBar', self.eleDef);

                } else {
                    messageBus.$emit('showCommonBar');
                }

                messageBus.$emit('otherEditCoverHide', self.eleDef.id);
            },
            toggleImgEditShow: function () {
                let self = this;
                self.editCoverShow = !self.editCoverShow;

                if (self.editCoverShow === true) {
                    messageBus.$emit('showImgBar', self.eleDef);
                } else {
                    messageBus.$emit('showCommonBar');
                }

                messageBus.$emit('otherEditCoverHide', self.eleDef.id);
            },
            touchStart(evt) {
            },
            //todo 由于alloyfinger是使用移动前后的坐标来判断是否tap的，所以如果移动很远后再移回原位附近会触发tap事件，目前已想到办法解决，已提pr。
            touchMove(evt) {
                let self = this;
                if (self.editCoverShow) {
                    evt.preventDefault();
                    evt.stopPropagation();
                    messageBus.$emit("itemTopLeftChanged", {
                        id: self.eleDef.id,
                        top: 1 * (self.eleDef.css.top) + 1 * (evt.deltaY),
                        left: 1 * (self.eleDef.css.left) + 1 * (evt.deltaX)
                    })
                }
            },
            touchEnd(evt) {
            },
            deleteItem(evt) {
                evt.preventDefault();
                let self = this;
                if (self.editCoverShow) {
                    messageBus.$emit("itemDelete", {
                        id: self.eleDef.id
                    })
                }
            },
            getImgSrc() {
                if (/http/i.test(this.eleDef.properties.src) || /weixin/i.test(this.eleDef.properties.src) || /wxLocalResource/i.test(this.eleDef.properties.src)) {
                    return this.eleDef.properties.src
                } else {
                    return PREFIX_FILE_HOST + this.eleDef.properties.src
                }
//                return /http/i.test(this.eleDef.properties.src) ||
//                /weixin/i.test(this.eleDef.properties.src) ||
//                /wxLocalResource/i.test(this.eleDef.properties.src) ?
//                    this.eleDef.properties.src :
//                    PREFIX_FILE_HOST + this.eleDef.properties.src
            },
            getBgImgSrc() {
                if (/http/i.test(this.eleDef.properties.imgSrc) || /weixin/i.test(this.eleDef.properties.imgSrc) || /wxLocalResource/i.test(this.eleDef.properties.imgSrc)) {
                    return this.eleDef.properties.imgSrc
                } else {
                    return PREFIX_FILE_HOST + this.eleDef.properties.imgSrc
                }
            }
        },
        mounted: function () {
            let self = this;

            messageBus.$on('otherEditCoverHide', function (id) {
                if (self.eleDef.id !== id) {
                    self.editCoverShow = false;
                }
            });

            messageBus.$on('allEditCoverHide', function () {
                self.editCoverShow = false;
            });

            messageBus.$on("toggleImgEditShow", function (eleDef) {
                if (self.eleDef.id === eleDef.id) {
                    self.toggleImgEditShow();
                }
            });

            messageBus.$on("proxyTap", function (info) {
                if (self.eleDef.id === info.id) {
                    self.toggleImgEditShow();
                }
            })
        },
        beforeDestroy: function () {
            messageBus.$off(["otherEditCoverHide", "allEditCoverHide", "toggleImgEditShow"]);
        },
    }
</script>
<style scoped lang="less">
    .edit-cover {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        /*border: 2px dashed black;*/
    }

    .edit-container {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-origin: border-box;
        background-repeat: no-repeat;
    }

    .edit-font {
        padding: 2vw;
    }

    .edit-font span {
        font-size: 16px !important;
        line-height: 1.5;
    }

</style>