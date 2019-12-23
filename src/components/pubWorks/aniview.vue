<template>
    <div class="viewContainer" v-on:click="showTemplate">
        <img class="viewImg" alt="" :imgUrl="aniviewData.picture" :src="require('../../images/avatar.png')" />
        <div class="viewInfo">
            <div class="viewTitle">
                <div>{{aniviewData.name}}</div>
            </div>
            <div class="viewCost">
                <div v-if="aniviewData.price === 0" class="viewCostTest">免费</div>
                <div v-if="aniviewData.price !== 0" class="viewCostTest">
                    <span class="pay">¥ {{aniviewData.price}}</span>
                    <!-- 限时免费 -->
                </div>
            </div>
        </div>
        
        <div v-if="$route.name === 'myTemplateStore'" class="usefulLife">{{usefulLife}}到期</div>
    </div>

</template>
<script>
    import {mapState, mapMutations} from 'vuex'
    import * as utils from "../../lib/utils";

export default {
        props: ['aniviewData'],
        data: function () {
            return {
            }
        },
        components: {},
        computed: {
            currentType() {
                return this.$route.params.type
            },
            usefulLife(){
                return utils.timeFormat(this.aniviewData.usefulLife,2)
            }
        },
        methods: {
            showTemplate: function () {
                let self = this;
                if (self.currentType === 'animation' || self.currentType === 'myAnimation' ) {
                    self.$router.push({path: '/template/' + self.aniviewData.id})
                } else if (self.currentType === 'vedio' || self.currentType === 'myVedio') {
                    self.$router.push({path: '/template/' + self.aniviewData.id})
                } else if (self.currentType === 'article' || self.currentType === 'myArticle') {
                    self.$router.push({name: 'articleTemplate', params: {id: self.aniviewData.id}})
                }
            },
        }
    }
</script>
<style scoped>

    .viewContainer {
        width: 100%;
        height: 100%;
        /*padding: 4px;*/
        background-color: white;
        border-radius: 2px;
        /*margin: 3px 0 0 3px;*/
        position:relative
    }

    .viewImg {
        width: 2.24rem;
        height: 2.3rem;
    }
    .viewInfo{
        height: 0.64rem;
        box-sizing: border-box;
        padding: 0.1rem 0.08rem 0.12rem;
    }
    .viewTitle div {
        width:2.08rem;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        font-size: 0.2rem;
        color: #333;
        height:0.26rem;
        line-height: 0.21rem;
    }

    /*.viewTimes{*/
    /*margin-top:0.5vh;*/
    /*}*/
    .viewEye {
        width: 11px;
        margin-right: .8vw;
    }

    .viewTimes div {
        font-size: 0.16rem;
        color: #888888;
    }
    .viewCost{
        /*margin-top:0.06rem;*/
    }
    .viewCost div {
        font-size: 0.16rem;
        color: red;
    }

    .noMarginTop{
        margin-top: 0;
    }
    .pay{
        /* text-decoration:line-through; */
        color:#333
    }
    .usefulLife{
        color:white;
        background:rgba(255,0,0,0.7);
        text-align:center;
        font-size:0.22rem;
        position:absolute;
        left:0;
        top:0;
        width:100%;
        height:0.4rem;
        line-height:0.4rem
    }
</style>
