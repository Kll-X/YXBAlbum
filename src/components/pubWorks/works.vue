<template>
    <div class="works">
        <animation-com v-if="currentType === 'animation'"></animation-com>
        <vedio-com v-if="currentType === 'vedio'"></vedio-com>
        <article-com v-if="currentType === 'article'"></article-com>
    </div>
</template>
<script>
    import animationCom from './animation.vue'
    import vedioCom from './vedio.vue'
    import articleCom from './article.vue'
    import messageBus from "../messageBus";
    import {getTemplateList} from "../../lib/ajax";
    import * as utils from "../../lib/utils";
    import {mapState, mapMutations} from 'vuex'

    export default {
        data: function () {
            return {
                
            }
        },
        computed:{
            currentType(){
                return this.$route.params.type
            }
        },
        components:{
            animationCom,
            vedioCom,
            articleCom
        }
    }
</script>
<style lang="less" scoped>
    .works {
        position: relative;
    }
</style>
