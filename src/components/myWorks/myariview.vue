<template>
    <div class="viewContainer" >
        <div class="viewMainContent">
            <p class="viewTitle">{{titleTxt}}</p>
            <div class="viewTimes">
                <span class="viewDate">{{formatDate(ariviewData.createTime)}}</span>
                <img src="../../images/eye.png" class="viewEye" alt="">
                <span class="viewNum">{{ariviewData.count}}</span>
            </div>
            <div class="viewImgContainer" @click="showMyArticleView">
                <img :src="coverImgSrc" class="viewImg" :class="{defaultImg:defaultFlag}" alt="">
            </div>
        </div>
        <div class="viewDelBtn" @click="delItem">
            <img src="../../images/delete.png">
        </div>
    </div>
</template>
<script>
    let bannerDefaultUrl = require('../../images/article_default.png');
    import {timeFormat} from '../../lib/utils.js'
    import messageBus from '../messageBus.js'
    export default {
    props: ['ariviewData'],
    data: function() {
        return {
            defaultFlag:""
        }
    },
    components: {
    },
    methods:{
        formatDate(timestamp){
            return timeFormat(timestamp);
        },
        showMyArticleView(){
            console.log("ariviewData");
            console.log(this.ariviewData);
            this.$router.push({name: 'myArticleView', params: {id:this.ariviewData.photoId,settingData:this.ariviewData}});
        },
        delItem(){
            messageBus.$emit('delMyArticle',{
                id:this.ariviewData.photoId
            });
        }
    },
    computed:{
        coverImgSrc:function () {
            if(this.ariviewData.coverImage.search("default_thum.jpg")>-1){
                this.defaultFlag = true;
                return bannerDefaultUrl;
            }else{
                // if(this.ariviewData.coverImagePer != "{}"){
                //     this.defaultFlag = true;
                // }else{
                //     this.defaultFlag = false;
                // }
                this.defaultFlag = false;
                return  /http/i.test(this.ariviewData.coverImage)?this.ariviewData.coverImage:PREFIX_FILE_HOST+this.ariviewData.coverImage;
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
.viewContainer{
    width: 100%;
    height: 100%;
    background-color: white;
    padding: 0.9rem;
    overflow-x: scroll;
    position: relative;
}
.viewMainContent{

}

.defaultImg{
    height:100%;
}
.viewTimes{
    font-size: 1.2rem;
    color: #888;
    margin-bottom: 0.45rem;
}
.viewImg{
    width: 100%;
    position:absolute;
    top:0;
}
.viewTitle{
    font-size: 1.2rem;
    color: #333;
    margin-bottom: 0.45rem;
}
.viewDate{
    float: left;
}
.viewEye{
    width: 1.5rem;
    margin-left: 3vw;
}
.viewImgContainer{
    width:100%;
    /*height:9.75rem;*/
    position:relative;
    padding-top: 36%;
    overflow:hidden;
}
.viewDelBtn{
    background-color:#0080cc;
    width:10%;
    position: absolute;
    left:100%;
    height: 100%;
    top:0;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
}
.viewDelBtn img{
    width:60%;
}
</style>
