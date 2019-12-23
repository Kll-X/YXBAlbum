<template>
    <div class="classifyNav" v-if="tempTagsInfo" :style="classifyNavExtraStyel">
        <div class="classifyNavInner" :style="classifyNavInnerExtraStyel">
            <div class="perSlide" v-for="tagInfo,index in tempTagsInfo" :key="index" @click.stop="updateActiveIndex(index)">
                        <span :class="{active:index === activeIndex}">{{tagInfo.title}}
                        </span>
            </div>

        </div>
    </div>
</template>
<script>
    import messageBus from '../messageBus'
    import * as utils from '../../lib/utils.js'

    export default{
        props: ['tempTagsInfo', 'activeIndex'],
        methods: {
            updateActiveIndex: function (index) {
                messageBus.$emit('updateActiveIndex', index)
            }
        },
        computed:{
            classifyNavExtraStyel(){
                return utils.isIos()?{'backgroundColor': '#1b1a1f'}:{'backgroundColor': '#393a3f'}
            }
            ,
            classifyNavInnerExtraStyel(){
                let bg=utils.isIos()?{'backgroundColor': '#1b1a1f'}:{'backgroundColor': '#393a3f'};
                let other = {
                    'width': 'calc((20vw) * ' + this.tempTagsInfo.length + ')'
                    ,'minWidth':'100vw'
                };
                return Object.assign(other,bg)
            }
        },mounted(){
            let self = this;
            messageBus.$on('indexScrollIntoCenter', function () {
                self.$nextTick(function () {
                    $('.classifyNav').scrollLeft($('.perSlide').width() * (self.activeIndex-2));
                });
            })
        },
        beforeDestroy(){
            messageBus.$off('indexScrollIntoCenter')
        }
    }
</script>
<style scoped lang="less">
    .classifyNav {
        height: .8rem;
        width: 100vw;
        position: absolute;
        left:0;
        right:0;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        padding: 0;
        margin: 0;

        /*top: 0;*/
        .classifyNavInner {
            height: 100%;
            overflow: hidden;
            .perSlide {
                display: inline-block;
                width: 20vw;
                height: .8rem;
                text-align: center;
                span {
                    display: inline-block;
                    height: .8rem;
                    color: #888888;
                    line-height: .8rem;
                }

                .active {
                    color: #fff;
                    position: relative;
                }

                .active::after {
                    content: '';
                    display: block;
                    height: 2px;
                    width: 100%;
                    background: #0080cc;
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;

                }

            }
        }
    }
</style>