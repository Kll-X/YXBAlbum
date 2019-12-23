<template>
    <div class="edit-view">
        <section class="main-page" v-for="(page, pIndex) in templateData.list" :key="page.id">
            <ul :id="'edit_area' + page.id" class="edit_area"
                style="height: 486px;overflow: hidden; position: relative;">
                <li v-for="(eleDef, eIndex) in page.elements" :id="'inside_' + eleDef.id" :num="eleDef.num"
                    :key="eleDef.id"
                    :ctype="eleDef.type"
                    :style="eleDef.type === 3 ? 'z-index: 0' :'z-index:' + (1*eleDef.css.zIndex + 1)">
                    <item :eleDef="eleDef"></item>
                    <proxy-item v-if="eleDef.type === 4 && eleDef.properties.replacement === true" :eleDef="eleDef" :elementsNum="page.elements.length"></proxy-item>
                </li>
                <!--<li v-for="(eleDef, eIndex) in page.elements"-->
                    <!--v-if="eleDef.type === 4 && eleDef.properties.replacement === true"-->
                    <!--:style="{zIndex: (1*eleDef.css.zIndex + 1*page.elements.length + 1)}"-->
                <!--&gt;-->
                    <!--<proxy-item :eleDef="eleDef" :elementsNum="page.elements.length"></proxy-item>-->
                <!--</li>-->
            </ul>
            <div class="wrapperBar">
                <span class="insertOnePage" @click.stop="insertOnePage(pIndex,page.id)"></span>
                <span class="pageNum">{{pIndex + 1}} / {{templateData.list.length}}</span>
                <span class="deleteOnePage" @click.stop="deleteOnePage(pIndex,page.id)"
                      v-if="templateData.list.length > 1"></span>
                <span class="repalceOnePage" @click.stop="repalceOnePage(pIndex,page.id)"></span>
                <span class="insteadBg" @click.stop="bgReplace(pIndex,page.id)"></span>
            </div>
        </section>
    </div>
</template>
<script>
    import item from "./item.vue";
    import proxyItem from "./proxyItem.vue";
    import * as ajax from '../../../lib/ajax.js'
    import messageBus from "../../messageBus";


    export default {
        props: ['templateData', 'imagesInformation'],
        data: function () {
            return {
//                templateData:{}
            }
        },
        computed: {
            proxyItemStyleObject(){
                return {
                    zIndex: (1*this.eleDef.css.zIndex + 1*page.elements.length + 1),
                    top: this.eleDef.css.top + "px",
                    left: this.eleDef.css.left + "px",
                    width: this.eleDef.css.width + "px",
                    height: this.eleDef.css.height + "px"
                }
            }
        },
        components: {
            item,
            proxyItem
        },
        mounted: function () {
        },
        methods: {

            deleteOnePage(pageIndex, pageId){
                messageBus.$emit('tipCoverShow', {
                    status: 1,
                    desc: ['删除所选页面'],
                    btns: [
                        {
                            text: '否',
                            btnCallBack: function () {
                                messageBus.$emit("tipCoverShow", {
                                    status: 0
                                });
                            }
                        }, {
                            text: '是',
                            btnCallBack: function () {
                                messageBus.$emit("tipCoverShow", {
                                    status: 0
                                });
                                messageBus.$emit('deleteOnePage', pageIndex, pageId);
                            }
                        }
                    ]
                });
            },
            repalceOnePage: function (pageIndex, pageId) {
                messageBus.$emit('repalceOnePage', pageIndex, pageId);
            },
            bgReplace(pageIndex, pageId){
                messageBus.$emit('bgReplace', pageIndex, pageId);
            },
            insertOnePage: function (pageIndex, pageId) {
                let pageHeight = $(".main-page").height()+parseFloat($(".main-page").css('marginBottom'));
                messageBus.$emit('insertOnePage', pageIndex, pageId, pageHeight);
            },

        },

    }
</script>
<style scoped lang="less">

    .edit-view {
        padding-bottom: 1.8rem;
        background: #4d4d4d;
    }

    .main-page {
        background-color: white;
        width: 320px;
        height: 486px;
        margin: auto;
        margin-bottom: 1rem;
        border-radius: 5px;
        /*box-shadow: 1px 0 10px rgba(0,0,0,.6) ;*/
    }

    .main-page:last-child {
        margin-bottom: 0;
    }
    .wrapperBar {
        position: relative;
        z-index: 50

    ;
        height: 1rem;
        display: flex;
        justify-content: center;
        align-items: center;
        .insertOnePage {
            display: inline-block;
            width: 0.525rem;
            height: 0.525rem;
            background: url("../../../images/addPage.png") no-repeat center;
            background-size: 100% 100%
        }
        .pageNum {
            position: absolute;
            right: 0.6rem;
            top: 0.2rem;
            color: #fff;
        }
        .insteadBg {
            position: absolute;
            color: #000;
            top: -0.75rem;
            right: 0.25rem;
            width: 0.55rem;
            height: 0.55rem;
            background: url("../../../images/insteadBg.png") no-repeat center;
            background-size: 100% 100%;
            z-index: 1;
        }

        .deleteOnePage {
            position: absolute;
            color: #000;
            top: -0.75rem;
            right: 1.75rem;
            width: 0.55rem;
            height: 0.55rem;
            background: url("../../../images/deletePage.png") no-repeat center;
            background-size: 100% 100%;
            z-index: 1;
        }

        .repalceOnePage {
            position: absolute;
            color: #000;
            top: -0.75rem;
            right: 1rem;
            width: 0.55rem;
            height: 0.55rem;
            background: url("../../../images/insteadPage.png") no-repeat center;
            background-size: 100% 100%;
            z-index: 1;
        }
    }

    .proxy-item {
        position: absolute;
        border: 2px solid black;
    }

</style>