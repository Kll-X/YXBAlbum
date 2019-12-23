<template>
    <div class="articleTemplate" :style="{backgroundImage:'url('+bgImg+')'}">
        <div class="top" ref="topImgCom" v-if="topImg">
            <img :src="topImg"/>
        </div>
        <div class="info">
            <div class="title" :style="getInfoStyle('title')">{{userData.name}}</div>
            <div class="time" :style="getInfoStyle('time')">{{formatTime(userData.createTime)}}</div>
            <div class="userName" :style="getInfoStyle('userName')">{{userData.userName}}</div>
            <div class="count" :style="getInfoStyle('count')">{{"阅读 "+userData.count}}</div>
        </div>
        <div class="content" :style="{top:contentTop}">
            <div class="innerContent">
                <div v-for="(page,pageIndex) in contentData" :key="pageIndex">
                    <parser-item :borderImg="borderImg" :data="item" :img-width="imgWidth" v-for="(item,index) in page.elements" :key="index"></parser-item>
                </div>
            </div>
            <div class="bottom" v-if="bottomImg">
                <img :src="bottomImg"/>
            </div>
        </div>
        <bg-music-ctrl :template-data="articleData"></bg-music-ctrl>

    </div>
</template>
<script>
    import {timeFormat} from '../../../lib/utils.js';
    import messageBus from '../../messageBus.js';
    import {addCount} from '../../../lib/ajax.js'
    import {addTemplateCount} from '../../../lib/ajax.js'
    import parserItem from "./parserItem.vue"
    import bgMusicCtrl from "../../bgMusic/bgMusicCtrl.vue"
    import * as articleTools from "../../../lib/articleTools.js"
    import {mapState, mapMutations} from 'vuex'

    export default {
        props:['articleData','userData','isTpl','addCount'],
        components:{
            parserItem,
            bgMusicCtrl
        },
        data:function() {
            return{
                bgImg:"",
                topImg:"",
                bottomImg:"",
                borderImg:"",
                contentTop:"100px",
                contentData:"",
                styleEle:"",
                imgWidth:window.screen.width*0.8,
                infoStyle:{
                    title:{top:"40",left:"40",fontSize:"20",color: "black"},
                    time:{top:"70",left:"40",fontSize:"14",color: "black"},
                    count:{top:"70",left:"170",fontSize:"14",color: "black"},
                    userName:{top:"70",left:"270",fontSize:"14",color: "black"},
                }
            }
        },
        methods:{
            init(){
                this.contentData = this.articleData.list.slice(1);
                let self = this;
                let styleEle= this.articleData.list[0].elements;
                if(styleEle.length == 0){
                    this.infoStyle={
                        title:{top:"40",left:"40",fontSize:"20",color: "black"},
                        time:{top:"70",left:"40",fontSize:"14",color: "black"},
                        count:{top:"70",left:"170",fontSize:"14",color: "black"},
                        userName:{top:"70",left:"270",fontSize:"14",color: "black"},
                    }
                    this.contentTop = "100px";
                    this.borderImg = "";
                    this.topImg = "";
                    this.bottomImg="";
                    this.bgImg="";
                    return;
                }
                let styleObj = articleTools.getArticleStyle(this.articleData.list[0]);
                // this.ARTICLE_INFO(styleObj);
                copyData(this.infoStyle.title,styleObj.titleTxtEle.css,["top","left","fontSize","color"]);
                copyData(this.infoStyle.time,styleObj.timeTxtEle.css,["top","left","fontSize","color"]);
                copyData(this.infoStyle.count,styleObj.countTxtEle.css,["top","left","fontSize","color"]);
                copyData(this.infoStyle.userName,styleObj.userTxtEle.css,["top","left","fontSize","color"]);
                this.bgImg = this.getImgSrc(styleObj.bgImgEle.properties.src);
                this.topImg = this.getImgSrc(styleObj.topImgEle.properties.src);
                this.borderImg = this.getImgSrc(styleObj.borderImgEle.properties.src);
                this.bottomImg = this.getImgSrc(styleObj.bottomImgEle.properties.src);

                // let imgEle=[],imgEleCopy;
                // for(let item of styleEle){
                //     if(parseInt(item.type)==4){
                //         imgEle.push(item);
                //     }
                //     if(parseInt(item.type)==2){
                //         if(item.content.search("标题")>-1){
                //             copyData(this.infoStyle.title,item.css,["top","left","fontSize","color"]);
                //         };
                //         if(item.content.search("时间")>-1){
                //             copyData(this.infoStyle.time,item.css,["top","left","fontSize","color"]);
                //         };
                //         if(item.content.search("阅读量")>-1){
                //             copyData(this.infoStyle.count,item.css,["top","left","fontSize","color"]);
                //         };
                //         if(item.content.search("作者")>-1){
                //             copyData(this.infoStyle.userName,item.css,["top","left","fontSize","color"]);
                //         }
                //     }
                // }
                // compare(imgEle,"height",false);
                // this.bgImg = this.getImgSrc(imgEle[0].properties.src);
                // imgEleCopy=imgEle.slice(1);
                // compare(imgEleCopy,"top",true);
                // this.topImg = this.getImgSrc(imgEleCopy[0].properties.src);
                // this.borderImg = this.getImgSrc(imgEleCopy[1].properties.src);
                // // this.imgWidth = parseInt(imgEleCopy[1].properties.width);
                // this.bottomImg = this.getImgSrc(imgEleCopy[2].properties.src);

                //top和left根据屏幕大小进行校正
                this.contentTop = (styleObj.borderImgEle.css.top-styleObj.topImgEle.css.top)*window.screen.width/320+'px';
                styleFix(["title","time","count","userName"],["top","left"]);
                function styleFix(name){
                    for(let i of name){
                        self.infoStyle[i].top= (self.infoStyle[i].top-styleObj.bgImgEle.css.top)*window.screen.width/320;
                        self.infoStyle[i].left = (self.infoStyle[i].left-styleObj.bgImgEle.css.left)*window.screen.width/320;
                    }
                }

                function copyData(original,target,attr){
                    for(let i of attr){
                        target&&target[i]&&(original[i] = target[i]);
                    }
                }
            },
            countAdd(){//阅读量增加
                let id = this.articleData.obj.id;
                if(this.isTpl){
                    addTemplateCount({"id":id}).then(function(info){
                        console.log(info);
                    })
                }else{
                    addCount({"photoId":id}).then(function(info){
                        console.log(info);
                    })
                }
            },
            getImgSrc(src){
                return  /http/i.test(src) ||
                /weixin/i.test(src) ||
                /wxLocalResource/i.test(src)||
                 !src? //src为空时也原样返回
                    src :
                    PREFIX_FILE_HOST + src
            },
            formatTime(info){
                return timeFormat(info);
            },
            getInfoStyle(name){
                return {
                    fontSize:this.infoStyle[name].fontSize+'px',
                    top: this.infoStyle[name].top+'px',
                    left: this.infoStyle[name].left+'px',
                    color: this.infoStyle[name].color
                }
            },
            ...mapMutations([
                'ARTICLE_INFO'
            ])
        },
        created:function(){
            this.init();
            this.addCount&&this.countAdd();
        },
        watch:{
            articleData:{
                handler:function(){
                    this.init();
                },
                deep:true
            }
        },
    }

</script>
<style scoped>
    .articleTemplate{
        /*position: absolute;*/
        /*top: 0;*/
        /*left: 0;*/
        width: 100%;
        /*overflow-y: scroll;*/
        overflow-x: hidden;
        background-color: white;
        -webkit-overflow-scrolling: touch;
    }
    .top{
        width:100%;
    }
    .top img{
        width:100%;
    }
    .info{
        text-align: center;
        margin-top: 30px;
        padding:0 30px;
    }
    .info .title{
        margin: 15px 0;
        font-size: 24px!important;
        line-height: 1.2;
        word-wrap: break-word;
    }
    .info .time{
        display: inline-block;
        margin-right: 12px;
        font-size: 14px!important;
    }
    .info .count{
        display: inline-block;
        /*margin-right: 10px;*/
        font-size: 14px!important;
    }
    .info .userName{
        display: inline-block;
        font-size: 14px!important;
        margin-right: 12px;
    }
    /*.info{*/
        /*position: static;*/
    /*}*/
    /*.info .title{*/
        /*position: absolute;*/
        /*line-height: 1.2;*/
    /*}*/
    /*.info .time{*/
        /*position: absolute;*/
    /*}*/
    /*.info .count{*/
        /*position: absolute;*/
    /*}*/
    /*.info .userName{*/
        /*position: absolute;*/
        /*word-break:break-all;*/
    /*}*/
    .content{
        /*position: absolute;*/
        width:100%;
    }
    .content .innerContent{
        min-height: 10rem;
    }
    .bottom{
        width:100%;
    }
    .bottom img{
        width:100%;
        display: block;
    }
</style>