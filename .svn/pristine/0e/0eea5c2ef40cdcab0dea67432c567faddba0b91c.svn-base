<template>
    <div @click="proxyTap"
         class="proxy-item"
         :style=proxyItemStyleObject
         v-finger:touch-start="touchStart"
         v-finger:touch-move="touchMove"
         v-finger:touch-end="touchEnd"
         v-finger:pinch="pinch"
         v-finger:rotate="rotate"
         v-finger:multipoint-end="multipointEnd"
    >
    </div>
</template>

<script>
    import components from "../../../js/render/yxbCoreComponents.js";
    import * as utils from "../../../lib/utils.js";
    import messageBus from "../../messageBus.js"

    export default {
        props: ["eleDef", "elementsNum"],
        data: function () {
            return {
                id: utils.getRandomId(),
                proxyItemShow: false,
                originalSize: {
                    top: 0,
                    left: 0,
                    width: 0,
                    height: 0
                }
            }
        },
        computed: {
            proxyItemStyleObject(){
                return {
                    zIndex: (1 * this.eleDef.css.zIndex + 1 * this.elementsNum + 1),
//                    top: 1*this.eleDef.css.top + 1*this.eleDef.css.borderWidth || 2 + 'px',
                    top: (1 * this.eleDef.css.top + 1 * (this.eleDef.css.borderWidth ? this.eleDef.css.borderWidth : 0) || 2) + 'px',
//                    left: 1*this.eleDef.css.left + 1*this.eleDef.css.borderWidth || 2 + 'px',
                    left: (1 * this.eleDef.css.left + 1 * (this.eleDef.css.borderWidth ? this.eleDef.css.borderWidth : 0) || 2) + 'px',
                    width: this.eleDef.css.width + 'px',
                    height: this.eleDef.css.height + 'px',
                    transform: this.eleDef.css.transform,
                    borderRadiusPerc: this.eleDef.css.borderRadiusPerc,
                    borderBottomRightRadius: this.eleDef.css.borderBottomRightRadius,
                    borderBottomLeftRadius: this.eleDef.css.borderBottomLeftRadius,
                    borderTopRightRadius: this.eleDef.css.borderTopRightRadius,
                    borderTopLeftRadius: this.eleDef.css.borderTopLeftRadius,
                    border: this.proxyItemShow ? "2px dotted red" : "2px dotted white"
                }
            }
        },
        methods: {
            proxyTap() {

                this.proxyItemShow = !this.proxyItemShow;

                messageBus.$emit("proxyTap", {
                    id: this.eleDef.id
                });

                messageBus.$emit('otherProxyItemHide', {
                    id: this.id,
                });
            },
            touchStart(evt) {
                console.log('start')
            },
            touchMove(evt) {
                console.log("move");
                if (this.proxyItemShow) {
                    evt.preventDefault();
                    evt.stopPropagation();
                    this.eleDef.css.top = 1 * this.eleDef.css.top + 1 * (evt.deltaY);
                    this.eleDef.css.left = 1 * this.eleDef.css.left + 1 * (evt.deltaX);
                }

            },
            touchEnd(evt) {
                console.log('end')
            },
            pinch(evt){
                if (this.proxyItemShow) {
                    console.log('pinch')
                    console.log(evt.zoom)
                    let zoom = evt.zoom;
                    let width = this.originalSize.width * zoom;
                    let height = this.originalSize.height * zoom;
                    let top = this.originalSize.top - ( this.originalSize.width * (zoom - 1) / 2 );
                    let left = this.originalSize.left - ( this.originalSize.height * (zoom - 1) / 2 );

                    this.eleDef.css.top = top;
                    this.eleDef.css.left = left;
                    this.eleDef.css.width = width;
                    this.eleDef.css.height = height;
                    this.eleDef.properties.imgStyle.width = width;
                    this.eleDef.properties.imgStyle.height = height;
                }

            },
            rotate: function (evt) {
                console.log(evt.angle);
                console.log('onRotate');
            },
            multipointEnd(evt){
                this.originalSize = {
                    top: this.eleDef.css.top,
                    left: this.eleDef.css.left,
                    height: this.eleDef.css.height,
                    width: this.eleDef.css.width,

                };
            }
        },
        mounted: function () {
            let self = this;

            self.originalSize = {
                top: self.eleDef.css.top,
                left: self.eleDef.css.left,
                height: self.eleDef.css.height,
                width: self.eleDef.css.width,

            };

            messageBus.$on("otherProxyItemHide", function (info) {
                if (info) {
                    if (self.id !== info.id) {
                        self.proxyItemShow = false;
                    }
                } else {
                    self.proxyItemShow = false;
                }
            });

            messageBus.$on("allProxyItemHide", function () {
                self.proxyItemShow = false;
            });
        },
        beforeDestroy: function () {
            messageBus.$off(['otherProxyItemHide', 'allProxyItemHide']);
        },
    }
</script>
<style scoped lang="less">
    .proxy-item {
        position: absolute;
    }

</style>