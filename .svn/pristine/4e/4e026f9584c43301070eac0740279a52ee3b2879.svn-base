<template>
    <div class="page-view">
        <section class="main-page" v-for="(bgInfo, bgIndex) in listData" :key="bgIndex" :style="sectionStyle"
                 @click.stop="useBgTemplate(bgInfo.bgSrc)">
            <!--<img :src="bgInfo.bgFullSrc" alt="" style="width:100%;">-->
            <div style="width: 100%;height: 100%;" :style="{background:'url('+bgInfo.bgFullSrc+') no-repeat',backgroundSize:'cover',backgroundPosition: '50% 50%'}"></div>
            <!--<img :src="bgInfo.bgFullSrc" alt="" style="width:100%;">-->
        </section>
    </div>
</template>
<script>
    import item from "./itemView.vue";
    import * as ajax from '../../../../lib/ajax.js'
    import messageBus from "../../../messageBus";
    import {mapState, mapMutations} from 'vuex'



    export default {
        props: ['listData'],
        data: function () {
            return {}
        },
        computed: {
            sectionStyle: function () {
                return {
                    'zoom': window.screen.availWidth / 1170,
                }
            }
        },
        components: {
            item
        },
        methods: {
            ...mapMutations([
                'CURRENT_PANEL'
            ]),
            useBgTemplate: function (bgSrc) {
                messageBus.$emit('useBgTemplate', bgSrc);
                this.CURRENT_PANEL([])
            }
        }
    }
</script>
<style scoped lang="less">

    .page-view {
        background: #e8e8e8;
        width: 100%;
        display: flex;
        flex-flow: row wrap;
        align-content: flex-start;
        overflow-y: auto;
        .main-page {
            width: 320px;
            height: 486px;
            overflow: hidden;

            margin: 30px 0 0 30px;
            padding: 15px;
            background: #fff;
            box-sizing: content-box;
        }
        .main-page:last-child {
            margin-bottom: 0;
        }
        .deleteOnePage {
            position: absolute;
            color: #000;
            z-index: 1
        }
        .wrapperBar {
            display: flex;
            justify-content: center
        }
        .insertOnePage {

        }
        .opacity0 {
            opacity: 0
        }
    }


</style>