<template>
    <div class="page-view">
        <section class="main-page" v-for="(page, pIndex) in templateData.list" :key="page.id" :style="sectionStyle"
                 @click.stop="usePageTemplate(pIndex,page.id)">
            <ul :id="'edit_area' + page.id" class="edit_area"
                style="height: 486px;overflow: hidden; position: relative;">
                <li v-for="(eleDef) in page.elements" :id="'inside_' + eleDef.id" :num="eleDef.num"
                    :key="eleDef.id"
                    :ctype="eleDef.type"
                    :style="eleDef.type === 3 ? 'z-index: 0' :'z-index:' + (1*eleDef.css.zIndex + 1)">
                    <item v-bind:eleDef="eleDef"></item>
                </li>
            </ul>

        </section>
    </div>
</template>
<script>
    import item from "./itemView.vue";
    import * as ajax from '../../../../lib/ajax.js'
    import messageBus from "../../../messageBus"
    import {mapState, mapMutations} from 'vuex'



    export default {
        props: ['templateData'],
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
        mounted: function () {

        },
        methods: {
            ...mapMutations([
                'CURRENT_PANEL'
            ]),
            usePageTemplate: function (pageIndex) {
                let pageData = JSON.parse(JSON.stringify(this.templateData.list[pageIndex]));
                messageBus.$emit('usePageTemplate', pageData);
                this.CURRENT_PANEL([]);
                messageBus.$emit("scrollToPosition");
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