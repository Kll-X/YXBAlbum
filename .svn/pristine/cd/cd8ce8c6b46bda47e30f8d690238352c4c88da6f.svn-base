<template>
    <div class="viewContainer" >
        <p class="viewTitle">{{titleTxt}}</p>
        <div class="viewTimes">
            <span class="viewDate">{{formatDate(ariviewData.createTime)}}</span>
            <img src="../../images/eye.png" class="viewEye" alt="">
            <span class="viewNum">{{ariviewData.count}}</span>
        </div>
        <div class="viewImgContainer" @click="showTemplate">
            <img :src="bannerImgSrc" class="viewImg" :class="{defaultImg:defaultFlag}" alt="">
        </div>
    </div>
</template>
<script>
    let bannerDefaultUrl = require('../../images/article_default.png');
    import {timeFormat} from '../../lib/utils.js'
    export default {
        props: ['ariviewData'],
        data: function () {
            return {
                defaultFlag:""
            }
        },
        components: {},
        methods: {
            formatDate(timestamp) {
                return timeFormat(timestamp);
            },
            showTemplate() {
                // this.$router.push({path:'/articleTemplate/'+this.ariviewData.id})
                this.$router.push({name:'articleTemplate',params:{id:this.ariviewData.id}})
            }
        },
        computed: {
            bannerImgSrc: function () {
                if(this.ariviewData.picture.search("default_thum.jpg")>-1){
                    this.defaultFlag = true;
                    return bannerDefaultUrl;
                }else{
                    this.defaultFlag = false;
                    return /http/i.test(this.ariviewData.picture)?this.ariviewData.picture:PREFIX_FILE_HOST+this.ariviewData.picture;
                }
            },
            titleTxt:function(){
                if(this.ariviewData.name.length<18){
                    return this.ariviewData.name;
                }else{
                    return this.ariviewData.name.slice(0,17)+"..."
                }
            }
        }
    }
</script>
<style scoped>
    .viewContainer {
        width: 100%;
        height: 100%;
        background-color: white;
        padding: 0.9rem;
    }

    .viewImgContainer {
        width: 100%;
        /*height: 9.75rem;*/
        padding-top: 36%;
        position: relative;
        overflow:hidden;
    }

    .viewImg {
        width: 100%;
        position:absolute;
        top: 0;
    }
    .defaultImg{
        height:100%;
    }

    .viewTitle {
        font-size: 1.35rem;
        color: #333;
        margin-bottom: 0.45rem;
    }

    .viewTimes {
        font-size: 1.2rem;
        color: #888;
        margin-bottom: 0.45rem;
    }

    .viewEye {
        width: 1.5rem;
        margin-left: 3vw;
    }
</style>
