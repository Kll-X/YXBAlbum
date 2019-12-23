<template>
    <div v-if="eleDef.type === 4 && eleDef.properties.replacement !== true" :style="styleObject">
        <img :src="imgSrc" :style="imgStyleObject">
    </div>

    <div v-else-if="eleDef.type === 4 && eleDef.properties.replacement === true" :style="changeableStyleObject">
        <div class="edit-container" :style="bgStyleObj"></div>
        <div class="edit-cover"></div>
    </div>

    <div v-else-if="eleDef.type == 2" :style="changeableStyleObject">那   <div class="edit-cover"></div>
        <p v-html="eleDef.content" class="edit-font"></p>
    </div>

    <div v-else-if="eleDef.type === 3 && eleDef.properties.imgSrc" :style="bgEleStyleObj">
    </div>
</template>

<script>
    import components from "../../../../js/render/yxbCoreComponents.js";
    import messageBus from "../../../messageBus.js"

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
                    backgroundPositionX: this.eleDef.properties.imgStyle.backgroundPositionX ? this.eleDef.properties.imgStyle.backgroundPositionX : "50%",
                    backgroundPositionY: this.eleDef.properties.imgStyle.backgroundPositionY ? this.eleDef.properties.imgStyle.backgroundPositionY : "50%",
                    backgroundSize: backgroundSize,
                    backgroundRepeat: "no-repeat"
                }
            },

            bgEleStyleObj: function () {
                return {
                    backgroundImage: "url('" + this.getBgImgSrc() + "')",
                    backgroundSize: "cover",
                    backgroundPositionX: "0%",
                    backgroundPositionY: "0%",
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
                    "http://yxbsve.mmarket.com/Uploads/" + this.eleDef.properties.imgSrc
            },
            changeableStyleObject: function () {
                return {
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
                    boxSizing: 'content-box'
                }
            }
        },
        methods: {
            getImgSrc() {
                if (/http/i.test(this.eleDef.properties.src) || /weixin/i.test(this.eleDef.properties.src) || /wxLocalResource/i.test(this.eleDef.properties.src)) {
                    return this.eleDef.properties.src
                } else {
                    return PREFIX_FILE_HOST + this.eleDef.properties.src
                }
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
        }
    }
</script>
<style scoped lang="less">
    .edit-cover {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
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