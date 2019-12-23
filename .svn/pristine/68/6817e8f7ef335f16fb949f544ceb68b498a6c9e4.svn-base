<template>
    <div class="articleSettingCom">
        <div class="tips">---请设置分享标题、描述和封面等信息---</div>
        <div class="banner">{{articleInfo}}</div>
        <div class="title"></div>
        <div class="describe"></div>
        <div class="confirm">确定</div>
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    export default {
        name: "article-setting",
        mounted:function () {
            console.log(this.$store.state.articleInfo);
        },
        computed:{
            ...mapState([
                'articleInfo'
            ])
        }
    }
</script>

<style scoped>
    .articleSettingCom{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height:100%;
        background-color: white;
        .tips{
            text-align: center;
            font-size: 16px;
            line-height: 20px;
            height: 20px;
            color: #2096f9;
        }
    }

</style>