<template>
    <div class="leftPreview" v-if="limitTip" :style="extraStyle">{{msg}}<span>{{sum-used}}</span>个</div>
</template>
<script>
    export default {
        data: function () {
            return {
                leftPreview: '',
                msg:''
            }
        },
        props:['sum','used','myWorkStatus'],
        created(){
            if(this.myWorkStatus === 0){
                this.msg = '作品尚未发布，当前剩余IP浏览个数'
            }else if(this.myWorkStatus === 1){
                this.msg = '作品正在审核中，当前剩余IP浏览个数'
            }else{
                this.msg = '作品尚未发布，当前剩余IP浏览个数'
            }
        },
        computed:{
            limitTip(){return location.search.indexOf('id') <= -1},
            extraStyle(){
                if(this.$route.name === "myArticleView"){
                    return {
                        height:'0.58rem',
                        fontSize:'0.23rem'
                    }
                }else{
                    return {
                        height:'0.5rem',
                        fontSize:'0.2rem'
                    }
                }
            }
        }
    }

</script>
<style scoped lang="less">
    .leftPreview {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100vw;
        position: fixed;
        bottom: 0;
        background: rgba(0, 0, 0, .3);
        z-index: 100;
        color: #ffffff;
        font-family:"Microsoft YaHei";
        span {
            color: #e0ab48
        }
    }
</style>