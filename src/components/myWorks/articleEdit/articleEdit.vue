<template>
    <div class="articleEditCom" v-on:click.self="othersClick">
        <div class="scrollerPart">
            <!--<div class="title" @click="editTitle">-->
                <!--<div class="titleTxt">-->
                    <!--{{titleTxt}}-->
                <!--</div>-->
                <!--<img class="pencilImg" src="../../../images/pencil.png" alt="">-->
            <!--</div>-->

            <div class="banner">
                <div class="bannerImgContainer" :style="{backgroundImage:'url('+bgImgSrc+')'}">
                    <!--<img :src="topImgSrc" class="bannerImg" :class="{noBannerCut:!bannerCutFlag}" alt="">-->
                    <img :src="topImgSrc" class="bannerImg"  alt="">
                    <div class="batch" @click="bacthChangeImg"><img src="../../../images/batch_row.png"></div>
                </div>
                <!--<img src="../images/changeImg.png" class="changeImg" alt="" @click="changeImg(-1)">-->
                <!--<div class="changeImg change" @click="changeImg(-1)">更换封面</div>-->
            </div>
            <div class="addItemCom" v-on:click.self="othersClick">
                <div class="addItemBtn" v-if="addItemFlag!=0" @click="addItemFlag=0">
                    <img src="../../../images/btn_add.png">
                </div>
                <div class="addItemType" v-if="addItemFlag==0">
                    <div class="item txt" @click="addTxt(0,'outer')">
                        <img src="../../../images/txt.png"><div class="addTxt">文字</div></div>
                    <div class="item img" @click="addImg(0,'outer')">
                        <img src="../../../images/img.png"><div class="addTxt">图片</div></div>
                </div>
            </div>
            <!--<transition-group name="slide-right">-->
                <div v-for="(n,dataIndex) in sortedTypeData" :key="n[0].id">
                    <article-item @itemChange="itemChange" :data="n" :index="dataIndex">
                        <div class="upArrow" @click="changeIndex(dataIndex,-1)" v-show="dataIndex!=0"><img src="../../../images/upArrow.png" alt=""></div>
                        <div class="downArrow" @click="changeIndex(dataIndex,1)" v-show="dataIndex!=sortedTypeData.length-1"><img src="../../../images/downArrow.png" alt=""></div>
                    </article-item>
                    <div class="addItemCom" v-on:click.self="othersClick">
                        <div class="addItemBtn" v-if="addItemFlag!=dataIndex+1" @click="addItemFlag=dataIndex+1">
                            <img src="../../../images/btn_add.png">
                        </div>
                        <div class="addItemType" v-if="addItemFlag==dataIndex+1">
                            <div class="item txt" @click="addTxt(dataIndex+1,'outer')">
                                <img src="../../../images/txt.png"> <div class="addTxt">文字</div></div>
                            <div class="item img" @click="addImg(dataIndex+1,'outer')">
                                <img src="../../../images/img.png"><div class="addTxt">图片</div></div>
                        </div>
                    </div>
                </div>
            <!--</transition-group>-->

            <div class="doneBtn" autofocus @click="complete">完成</div>
            <img-edit-bar class="imgEditBar" v-if="imgEditFlag"></img-edit-bar>
            <!--<img-edit-page class="imgEditPage" v-if="imgEditPageFlag" :eleDef="imgEleDef" :coverMode="coverMode"></img-edit-page>-->
        </div>
        <editor v-bind="editorSetting" v-if="editorFlag" @closeEditor="closeEditorPanel" @txtChange="changeTxt"></editor>
    </div>
</template>

<script>
import * as utils from "@lib/utils.js";
import articleItem from './articleItem.vue'
import editor from './editor.vue'
import imgEditBar from './imgEditBar.vue'
import imgEditPage from '../editMode/imgEditPage.vue'
import {getOpenId,changeImage,chooseImgs} from "@lib/platformAPI.js";
import messageBus from '../../messageBus.js'
import * as ajax from "../../../lib/ajax.js";
import * as articleTools from "@lib/articleTools.js"
import Vue from 'vue'
import {mapState,mapMutations} from 'vuex'
import leaveFullScreen from '@src/mixins/leavefullScreen'



let bannerDefaultUrl = require('../../../images/article_default.png');
export default {
    mixins:[leaveFullScreen],
    data:function(){
        return {
            articleData:{},//模板数据
            userData: {},//用户数据，包括name、userName、createTime、count、coverImage、desc等信息
            listLen:"",
            imagesInformation: {localIds: [], serverIds: [], sceneId: ''},
            sortedTypeData:"",
            sortedDataMaxLength: 36,
            imgTypeNum: 4,
            txtTypeNum:2,
            editorFlag: false,
            imgEditFlag: false,
            addItemFlag: 1000,
            editorSetting: {length:50,placeholder:"",mode:1,origin:"",message:""},
            readyImgId:"",
            imgEleDef:{},
            coverMode:"free",
            titleTxt: "",
            coverImage:"", //存储的coverImage数据
            coverImageSrc: "", //显示的coverImage数据
            previewFlag: false,
            mark:{},
            bannerCutFlag:true, //是否截取封面
            orgTempId:"",
            topImgSrc:"",//顶部图片地址
            bgImgSrc:"",//背景图片地址
            textUpImgDown:true,//字上图下
            imgSum:0,//可替换图片总数,
            imgSrcAddMark:{} //用于imgSrcAdd消息的新增图片位置记录
        }
    },
    methods:{
        ...mapMutations([
            'ARTICLE_INFO',
            'CURRENT_PANEL'
        ]),
        cutBanner(){
            if(this.articleData.list[0].properties && this.articleData.list[0].properties.bannerCutFlag == false){
                self.bannerCutFlag == false;
            }else{
                return;
            }
        },
        fetchData(id) {
            let self = this;
            ajax.templateAjax(id)
                .then(function (data) {
                    messageBus.$emit('globalLoadCover', {
                        status: true,
                        mark: self.mark
                    });
                    self.dataEleQueue(data);
                    self.articleData = data;
                    self.ARTICLE_INFO(data);
                    self.listLen = data.list.length;
                    // if (self.$route.params.imagesInformation) {
                    //     console.log(self.$route.params.imagesInformation);
                    //     console.log(JSON.stringify(self.imagesInformation));
                    //     if(self.imagesInformation.ownUrls.length != 0){
                    //         self.replaceImages(self.imagesInformation, self.articleData);
                    //     }
                    // };
                    self.sortedTypeData = self.dataSort(self.articleData);
                    self.checkItem();

                    ajax.querySceneSetting({
                        'photoId':id
                    },true)
                        .then(function (tempData) {
                                messageBus.$emit('globalLoadCover', {
                                    status: false,
                                    mark: self.mark
                                });
                                if(tempData.resultCode === 0){ //个人
                                    self.titleTxt = tempData.data.name;
                                    self.userData.desc = tempData.data.describe;
                                    if(tempData.data.coverImage.search("default_thum.jpg")>-1 || tempData.data.coverImage == ""){
                                        self.userData.coverImage =  "http://yxbsve.mmarket.com/Uploads/default_thum.jpg";
                                        // self.coverImageSrc = bannerDefaultUrl;
                                        // self.bannerCutFlag = false;
                                    }else{
                                        // self.cutBanner();
                                        // self.coverImageSrc = self.getImgSrc(tempData.data.coverImage);
                                        self.userData.coverImage = self.getImgSrc(tempData.data.coverImage);
                                    }
                                }else{//模板
                                    self.titleTxt = self.articleData.obj.name.slice(3);
                                    self.userData.desc = self.articleData.obj.description;
                                    if(self.articleData.obj.cover.search("default_thum.jpg")>-1 || self.articleData.obj.cover == ""){
                                        // self.coverImageSrc =  bannerDefaultUrl;
                                        self.userData.coverImage =  "http://yxbsve.mmarket.com/Uploads/default_thum.jpg";
                                        // self.bannerCutFlag = false;
                                    }else{
                                        // self.cutBanner();
                                        // self.coverImageSrc = self.getImgSrc(self.articleData.obj.cover);
                                        self.userData.coverImage = self.getImgSrc(self.articleData.obj.cover);
                                    }

                                }

                            }
                        )
                        .catch(function(){
//                            alert("Promise error" + JSON.stringfy(error));
                            messageBus.$emit("tipCoverShow", {
                                status: 2,
                                desc: ['后台服务器繁忙','请刷新重试'],
                                icon: 'times',
                                style:{
                                    tipDescPadding:'0 0.32rem 0.4rem'
                                }
                            });
                        })
                })
                .catch(function (error) {
//                    alert("Promise error" + JSON.stringfy(error));
                    messageBus.$emit("tipCoverShow", {
                        status: 2,
                        desc: ['后台服务器繁忙','请刷新重试'],
                        icon: 'times',
                        style:{
                            tipDescPadding:'0 0.32rem 0.4rem'
                        }
                    });
                })

        },
        dataSort(articleData){//组装成一组包含图片和文字的格式,先文字后图片
            let elements = eleGetter(articleData);
            let result=[];
            let count = 0;
            let group = [];
            let firstType,secondType;
            if(this.textUpImgDown == true){
                firstType = this.txtTypeNum;
                secondType = this.imgTypeNum;
            }else{
                secondType = this.txtTypeNum;
                firstType = this.imgTypeNum;
            }

            for(let i = 0;i<elements.length;i++){
                count++;
                let type = parseInt(elements[i].type);
                if(count==1){
                    if(type == firstType){
                        group.push(elements[i]);
                    }else if(type == secondType){
                        group.push(elements[i]);
                        result.push(group);
                        this.imgSum++;
                        group=[];
                        count = 0;
                    }else{
                        count--;
                    }
                }else if(count == 2){
                    if(type == secondType){
                        group.push(elements[i]);
                        result.push(group);
                        this.imgSum++;
                        group=[];
                        count = 0;
                    }else if(type == firstType){
                        result.push(group);
                        group=[];
                        group.push(elements[i]);
                        // result.push(group);
                        // group=[];
                        count = 1;
                    }else{
                        count--;
                    }
                }

                if(i+1==elements.length&&!$.isEmptyObject(group)){
                    result.push(group);
                }
            }

            return result;

            //提取elements
            function eleGetter(articleData){
                let elements = [];
                for(let i = 1;i<articleData.list.length;i++){
                    for(let j = 0;j<articleData.list[i].elements.length; j++){
                        elements.push(articleData.list[i].elements[j]);
                    }
                }
                return elements;
            }
        },
        dataEleQueue(orgData){//从样式元素中找到topImg，对内容元素进行高度排序
            for(let index in orgData.list){
                if(index == 0){
                    //找到topImgSrc
                        let styleObj = articleTools.getArticleStyle(orgData.list[index]);
                        if(styleObj.topImgEle.properties.src){
                            this.topImgSrc = PREFIX_FILE_HOST + styleObj.topImgEle.properties.src;
                        }else{
                            this.topImgSrc = bannerDefaultUrl;
                        }
                        if(styleObj.bgImgEle.properties.src){
                            this.bgImgSrc = PREFIX_FILE_HOST + styleObj.bgImgEle.properties.src;
                        }else{
                            this.bgImgSrc="";
                        }
                }else{
                    //元素进行高度排序
                    orgData.list[index].elements.sort(articleTools.compare("top",true));
                }
            }
        },

        //根据sortedTypeData重新组装articleData,并设置top属性用于排序。
        dataSetter(articleData,sortedTypeData){
            let elements=[];
            let top = 0;
            for(let i = 0; i<sortedTypeData.length;i++){
                for(let j = 0; j<sortedTypeData[i].length;j++){
                    sortedTypeData[i][j].css.top = top;
                    elements.push(sortedTypeData[i][j]);
                    top = top + 10;
                }
            }
            let list = articleData.list[1];
            list.elements = elements;
            for(let i = 2;i<articleData.list.length;i++){
                articleData.list[i].elements={}
            }
            return articleData;
        },
        changeIndex(index,offset){
            let nextIndex= index+offset;
            let tempObj = this.sortedTypeData[index];
            Vue.set(this.sortedTypeData,index,this.sortedTypeData[nextIndex]);
            Vue.set(this.sortedTypeData,nextIndex,tempObj);
        },
        othersClick(){
            messageBus.$emit("showImgEditBar",{id:-1,status:true});
            this.addItemFlag = 1000;
        },
        editTitle(){
            // this.changedTitle = this.articleData.obj.name;
            let info = {};
            info.mode = 2;
            info.length = 50;
            info.placeholder = "请输入文章标题(最多50字)";
            info.origin = this.titleTxt;
            info.necessary = true;
            info.message={};
            info.message.mark = "title";
            // info.markData = this.txtData.id;
            this.editorSetting = info;
            this.editorFlag = true;
        },
        closeEditorPanel(){
            this.editorFlag = false;
            this.checkItem();
        },
        checkItem(){ //删除空数据
            for(let i = 0; i<this.sortedTypeData.length;i++){
                for(let j = 0; j<this.sortedTypeData[i].length;j++){
                    if(parseInt(this.sortedTypeData[i][j].type) == 4 && this.sortedTypeData[i][j].properties.src == ""){
                        this.sortedTypeData[i].splice(j,1);
                    }else if(parseInt(this.sortedTypeData[i][j].type) == 2 && this.sortedTypeData[i][j].content == ""){
                        this.sortedTypeData[i].splice(j,1);
                    }
                }
                if(this.sortedTypeData[i].length == 0){
                    this.sortedTypeData.splice(i,1);
                }
            }
        },
        itemChange(info){
            //接收来自articleItem的状态改变
            switch(info.commend){
                case "delItem": this.delItem(info.id);break;
                case "delLine": this.delLine(info.index);break;
                case "addImg": this.addImg(info.index,"inner");break;
                case "addTxt": this.addTxt(info.index,"inner");break;

            }
        },
        delItem(id){ //删除某一项
            let self = this;
            messageBus.$emit('tipCoverShow', {
                status: 1,
                desc: ['删除后不可恢复','是否继续删除'],
                btns: [
                    {
                        text: '取消',
                        btnCallBack: function () {
                            messageBus.$emit('tipCoverShow', {status: 0})
                        }
                    }, {
                        text: '确定',
                        btnCallBack: function () {
                            messageBus.$emit('tipCoverShow', {status: 0});
                            for(let i = 0; i<self.sortedTypeData.length;i++){
                                for(let j = 0; j<self.sortedTypeData[i].length;j++){
                                    if(id == self.sortedTypeData[i][j].id){
                                        if(self.sortedTypeData[i][j].type == self.imgTypeNum){
                                            self.imgSum--;
                                        }
                                        self.sortedTypeData[i].splice(j,1);
                                        if(self.sortedTypeData[i].length == 0){
                                            self.sortedTypeData.splice(i,1);
                                        }
                                        self.confirmSet.show = false;
                                        return;
                                    }
                                }
                            }
                        }
                    }
                ]
            })

        },
        delLine(index){//删除某一行
            let self = this;
            self.othersClick();
            messageBus.$emit('tipCoverShow', {
                status: 1,
                desc: ['删除后不可恢复','是否继续删除'],
                btns: [
                    {
                        text: '取消',
                        btnCallBack: function () {
                            messageBus.$emit('tipCoverShow', {status: 0})
                        }
                    }, {
                        text: '确定',
                        btnCallBack: function () {
                            messageBus.$emit('tipCoverShow', {status: 0});
                            for(let item of self.sortedTypeData[index]){
                                if(item.type == self.imgTypeNum){
                                    self.imgSum--;
                                }
                            }
                            self.sortedTypeData.splice(index,1);
                        }
                    }
                ]
            })

        },
        addImg(index,mode){
            let self = this;
            this.othersClick();
            this.imgSrcAddMark={index:index,mode:mode};
            let oneImagesInformation = { localIds: [], serverIds: [], ownUrls: [] };
            if(mode == 'inner'){
                chooseImgs(oneImagesInformation, "imgSrcAdd", 1);
            }else if(mode == 'outer'){
                if(this.sortedTypeData.length<this.sortedDataMaxLength){
                    let max = this.sortedDataMaxLength - this.sortedTypeData.length;
                    chooseImgs(oneImagesInformation, "imgSrcAdd", max>9?9:max);
                }else{
                    messageBus.$emit('tipCoverShow', {
                        status: 2,
                        desc: ['总数量不可以超过'+ self.sortedDataMaxLength],
                        interval: 1000
                    })
                }
            }
        },
        addTxt(index,mode){
            let self = this;
            let txtData = {
                        content: "",
                        css: {
                            top: 0
                        },
                        id: self.getRandomId(),
                        num: 1,
                        pageId: self.articleData.list[0].id,
                        properties: {},
                        sceneId: self.articleData.list[0].sceneId,
                        title: null,
                        type: 2
                    };
            if(mode ==="inner"){
                //行内添加文字，在序号为index的sortedTypeData内部添加数据
                if(self.textUpImgDown){
                    //字上图下
                    self.sortedTypeData[index].unshift(txtData);
                }else{
                    //字下图上
                    // self.sortedTypeData[index].push(txtData);
                }
            }else if(mode === "outer"){
                //行外添加文字,在序号为index的sortedTypeData上方添加数据
                self.addItemFlag = 1000;
                if(this.sortedTypeData.length<this.sortedDataMaxLength){
                    self.sortedTypeData.splice(index,0,[txtData]);
                }else{
                    messageBus.$emit('tipCoverShow', {
                        status: 2,
                        desc: ['总数量不可以超过'+ self.sortedDataMaxLength],
                        interval: 1000
                    });
                    return;
                }
            }
            let info = {};
            info.mode = 1;
            info.length = 5000;
            info.placeholder = "请输入内容(最多5000字)";
            info.origin = "";
            info.message = {};
            info.message.mark = "content";
            info.message.markData = txtData.id;
            self.editorSetting = info;
            self.editorFlag = true;
        },
        //新建元素id
        getRandomId(){
            return Math.ceil(1e10*Math.random());
        },
        //批量替换图片
        replaceImages(imagesInformation, sortedTypeData) {
            let self = this;
            let localIdsCopy = imagesInformation.localIds.slice(0);
            let serverIdsCopy = imagesInformation.serverIds.slice(0);
            let ownUrlsCopy = imagesInformation.ownUrls.slice(0);
            let imgNum=0,img=[],src;
            for(let list of sortedTypeData){
                for(let ele of list){
                    if(parseInt(ele.type) === 4) {
                        src = ownUrlsCopy.shift().toString();
                        ele.properties.src = src;
                        // ele.properties.serverId = serverIdsCopy.shift().toString();
                        ele.properties.replaced = true;
                        ele.properties.imgStyle = {};
                        ele.properties.imgStyle.marginLeft = "0px";
                        ele.properties.imgStyle.marginTop = "0px";
                        img[imgNum] = document.createElement("img");
                        img[imgNum].onload = function () {
                            ele.css.width = this.naturalWidth;
                            ele.css.height = this.naturalHeight;
                            ele.properties.width = this.naturalWidth;
                            ele.properties.height = this.naturalHeight;
                            ele.properties.imgStyle.width = this.naturalWidth;
                            ele.properties.imgStyle.height = this.naturalHeight;
                        }
                        img[imgNum].src = src;
                        imgNum++;
                        if (ownUrlsCopy.length === 0) {
                            return;
                        }
                    }
                }
            }

            // 批量新增模板之外的图片
            let lastList = self.articleData.list[self.articleData.list.length-1];
            let num = sortedTypeData.length;
            while(ownUrlsCopy.length!=0){
                src = ownUrlsCopy.shift().toString();
                img[imgNum] = document.createElement("img");
                (function(i){
                    let imgData = {
                        content: "",
                        css: {
                            width: 100,
                            height: 100,
                            top: 0
                        },
                        id: self.getRandomId(),
                        num: 1,
                        pageId: lastList.id,
                        properties: {
                            width: 100,
                            height: 100,
                            src: src,
                            imgStyle:{
                                width:100,
                                height:100
                            }
                        },
                        sceneId: self.articleData.list[0].sceneId,
                        title: null,
                        type: 4
                    };
                    sortedTypeData.push([imgData]);
                    // let lastListEle = self.sortedTypeData[i];
                    img[imgNum].onload = function(){
                        imgData.css.width = this.naturalWidth;
                        imgData.css.height = this.naturalHeight;
                        imgData.properties.width = this.naturalWidth;
                        imgData.properties.height = this.naturalHeight;
                        imgData.properties.imgStyle.width = this.naturalWidth;
                        imgData.properties.imgStyle.height = this.naturalHeight;
                    }
                })(num);
                img[imgNum].src = src;
                imgNum++;
                num++;
            }
        },
        //开始时批量替换图片
        // replaceImages(imagesInformation, articleData){
        //     let self = this;
        //     let localIdsCopy = imagesInformation.localIds.slice(0);
        //     let serverIdsCopy = imagesInformation.serverIds.slice(0);
        //     let ownUrlsCopy = imagesInformation.ownUrls.slice(0);
        //     let list = articleData.list,imgNum=0,img=[],src;
        //     for(let i in list){
        //         if(i == 0) continue;
        //         let page = list[i];
        //         let elements = page.elements;
        //         for(let ele of elements){
        //             if(parseInt(ele.type) === 4){
        //                 src = ownUrlsCopy.shift().toString();
        //                 ele.properties.src = src;
        //                 // ele.properties.serverId = serverIdsCopy.shift().toString();
        //                 ele.properties.replaced = true;
        //                 ele.properties.imgStyle = {};
        //                 ele.properties.imgStyle.marginLeft = "0px";
        //                 ele.properties.imgStyle.marginTop = "0px";
        //                 img[imgNum] = document.createElement("img");
        //                 img[imgNum].onload = function() {
        //                     ele.css.width = this.naturalWidth;
        //                     ele.css.height = this.naturalHeight;
        //                     ele.properties.width = this.naturalWidth;
        //                     ele.properties.height = this.naturalHeight;
        //                     ele.properties.imgStyle.width = this.naturalWidth;
        //                     ele.properties.imgStyle.height = this.naturalHeight;
        //                 }
        //                 img[imgNum].src = src;
        //                 imgNum++;
        //                 if(ownUrlsCopy.length === 0){
        //                     return;
        //                 }
        //             }
        //         }
        //     }
        //     // 批量新增模板之外的图片
        //     let lastList = articleData.list[articleData.list.length-1];
        //     let num = lastList.elements.length;
        //     while(ownUrlsCopy.length!=0){
        //         src = ownUrlsCopy.shift().toString();
        //         img[imgNum] = document.createElement("img");
        //         (function(i){
        //             let imgData = {
        //                 content: "",
        //                 css: {
        //                     width: 100,
        //                     height: 100,
        //                     top: 0
        //                 },
        //                 id: self.getRandomId(),
        //                 num: 1,
        //                 pageId: lastList.id,
        //                 properties: {
        //                     width: 100,
        //                     height: 100,
        //                     src: src,
        //                     imgStyle:{
        //                         width:100,
        //                         height:100
        //                     }
        //                 },
        //                 sceneId: self.articleData.list[0].sceneId,
        //                 title: null,
        //                 type: 4
        //             };
        //             Vue.set(lastList.elements,i,imgData);
        //             let lastListEle = lastList.elements[i];
        //             img[imgNum].onload = function(){
        //                 lastListEle.css.width = this.naturalWidth;
        //                 lastListEle.css.height = this.naturalHeight;
        //                 lastListEle.properties.width = this.naturalWidth;
        //                 lastListEle.properties.height = this.naturalHeight;
        //                 lastListEle.properties.imgStyle.width = this.naturalWidth;
        //                 lastListEle.properties.imgStyle.height = this.naturalHeight;
        //             }
        //         })(num);
        //         img[imgNum].src = src;
        //         imgNum++;
        //         num++;
        //     }
        // },
        //更改文本内容，包括标题，内容等的文字
        changeTxt(info){
            let self = this;
            switch(info.message.mark){
                case "title": this.titleTxt = info.content;break;
                case "content": changeTxtById(info.message.markData,info.content);break;
            }
            this.editorFlag = false;
            this.checkItem();

            function changeTxtById(id,content){
                for(let i = 0; i<self.sortedTypeData.length;i++){
                    for(let j = 0; j<self.sortedTypeData[i].length;j++){
                        if(id == self.sortedTypeData[i][j].id){
                            if(content==""){
                                self.sortedTypeData[i].splice(j,1);
                            }else{
                                self.sortedTypeData[i][j].content = content;
                            }
                            return;
                        }
                    }
                }
            }
        },
        //调用platformApi接口，根据id更改图片地址，触发imgSrcChanged事件
        changeImg(id){
            changeImage(id);
        },
        setImgEleDef(){
            for(let arr of this.sortedTypeData){
                for(let item of arr){
                    if(item.id == this.readyImgId){
                        this.imgEleDef = item;
                        return;
                    }
                }
            }
        },
        getImgSrc(src){
            return /^http.*/.test(src) || /^weixin.*/.test(src) ? src :PREFIX_FILE_HOST + src
        },
        setBannerCutFlag(flag){
            if(!this.articleData.list[0].properties){
                this.articleData.list[0].properties = {};
            }
            this.articleData.list[0].properties.bannerCutFlag = flag;
            this.bannerCutFlag = flag;
        },
        complete(){
            let self = this;
            if(this.sortedTypeData.length == 0){
                messageBus.$emit("tipCoverShow", {
                    status: 2,
                    desc: ['至少需要有一项內容'],
                    interval: 1500,
                    icon: 'times',
                    style:{
                        tipDescPadding:'0 0.32rem 0.4rem'
                    }
                })
                return;
            }
            this.userData.createTime = new Date().getTime();
            this.userData.count = 0;
            this.userData.name = this.titleTxt;
            this.dataSetter(this.articleData,this.sortedTypeData);
            if(!this.userData.userName){
                let coverMark = {};
                messageBus.$emit('globalLoadCover', {
                    status: true,
                    mark: coverMark
                });
                let openId = getOpenId();
                ajax.getUserInfo({
                    'account': openId
                }).then(function(info){
                    if(info.resultCode === 0){
                        self.userData.userName = info.data.nickname;
                    }else{
                        self.userData.userName = "和美秀";
                    };
                    messageBus.$emit('globalLoadCover', {
                        status: false,
                        mark: coverMark
                    });
                    // self.previewFlag = true;
                    self.CURRENT_PANEL([{popupName:'articlePreview',orgTempId:self.orgTempId,listLen:self.listLen,articleData:self.articleData,userData:self.userData}]);
                })
            }else{
                // this.previewFlag = true;
                self.CURRENT_PANEL([{popupName:'articlePreview',orgTempId:self.orgTempId,listLen:self.listLen,articleData:self.articleData,userData:self.userData}]);
            }
        },
        sync(target) {
            if (target.paused) {
                $('.musicStatusCtrlBtn').removeClass("musicActive");
            } else {
                $('.musicStatusCtrlBtn').addClass("musicActive");
            }
        },
        stopMusic(){
            let self = this;
            let audio = $('#audio')[0];
            let audio1 = $('#audio1')[0];
            if (utils.isIos()) {
                if (audio1) {
                    audio1.pause();
                    self.sync(audio1);
                }
            } else {
                if (audio) {
                    audio.pause();
                    self.sync(audio);
                }
            }
        },
        playMusic(){
            let self = this;
            let audio = $('#audio')[0];
            let audio1 = $('#audio1')[0];
            if (utils.isIos()) {
                if (audio1) {
                    audio1.play();
                    self.sync(audio1);
                }
            } else {
                if (audio) {
                    audio.play();
                    self.sync(audio);
                }
            }
        },
        bacthChangeImg(){
            let self = this;
            // this.$router.push({name: 'middlePage',params:{id: self.articleData.list[0].sceneId,nextRouterName:"articleEdit"}});
            //可传图片张数限制初始化
            // if(self.articleData && self.articleData.list){
            //     self.imgSum = 0;
            //     self.articleData.list.forEach(function (page, p_idx) {
            //         page.elements.forEach(function (ele, e_idx) {
            //             if (4 == ele.type && ele.properties.src.search('syspic')>-1) {
            //                 self.imgSum++
            //             }
            //         })
            //     });
            // }

            self.CURRENT_PANEL([{popupName:'middlePage',imgSum:self.sortedDataMaxLength,hideTips:true}]);
        }
    },
    components:{
        articleItem,
        editor,
        imgEditBar,
        imgEditPage,
        // articlePreview,
    },
    computed:{
        ...mapState([
            'currentPanel'
        ])
    },
    created: function () {
        let self = this;
        //id参数一定有，但只有从middlePage进来会带有imgaesInformation参数，也就是从模板过来
        if (this.$route.params.imagesInformation) {
            this.imagesInformation = this.$route.params.imagesInformation;
            this.orgTempId = this.imagesInformation.sceneId;
        }
        this.imagesInformation.sceneId = this.$route.params.id;
        this.fetchData(this.$route.params.id);
    },
    mounted: function(){
        let self = this;
        messageBus.$on("imgSrcChanged",function(info){
            if(info.id === -1){  //封面的id设为-1
                // self.setBannerCutFlag(false);
                self.setBannerCutFlag(true);
                self.coverImage = info.src;
                self.coverImageSrc = info.src;
            }else{
                let coverMark = {};
                messageBus.$emit('globalLoadCover', {
                    status: true,
                    mark: coverMark
                });
                for(let item of self.sortedTypeData){
                    for(let data of item){
                        if(data.id  === info.id){
                            data.properties.src = info.src;
                            data.properties.imgStyle = {};
                            data.properties.imgStyle.marginLeft = "0px";
                            data.properties.imgStyle.marginTop = "0px";
                            let img = document.createElement("img");
                            img.src = info.src;
                            img.onload = function(){
                                data.css.width = img.naturalWidth;
                                data.css.height = img.naturalHeight;
                                data.properties.width = img.naturalWidth;
                                data.properties.height = img.naturalHeight;
                                data.properties.imgStyle.width = img.naturalWidth;
                                data.properties.imgStyle.height = img.naturalHeight;

                                messageBus.$emit('globalLoadCover', {
                                    status: false,
                                    mark: coverMark
                                });
                            }
                            return;
                        }
                    }
                }
            }
        });
        messageBus.$on("imgSrcAdd",function(imagesInformation){
            // let mode = info.mark.mode;
            let mode = self.imgSrcAddMark.mode;
            // let index = info.mark.index;
            let index = self.imgSrcAddMark.index;
            let coverMark={};
            self.imgSum += imagesInformation.ownUrls.length;
            messageBus.$emit('globalLoadCover', {
                status: true,
                mark: coverMark
            });
            if(mode === "outer"){
                //行外添加图片,在序号为index的sortedTypeData上方添加数据
                imagesInformation.ownUrls.forEach(function(src,offset){
                    console.log(src)
                    let imgData = {
                        content: "",
                        css: {
                            width: 100,
                            height: 100,
                            top: 0
                        },
                        id: self.getRandomId(),
                        num: 1,
                        pageId: self.articleData.list[0].id,
                        properties: {
                            width: 100,
                            height: 100,
                            src: src,
                            imgStyle:{
                                width:100,
                                height:100
                            }
                        },
                        sceneId: self.articleData.list[0].sceneId,
                        title: null,
                        type: 4
                    };
                    self.sortedTypeData.splice(index + offset,0,[imgData]);
                    let img = document.createElement("img");
                    img.onload = function(){
                        self.addItemFlag = 1000;
                        imgData.css.width = imgData.properties.width = imgData.properties.imgStyle.width = img.naturalWidth;
                        imgData.css.height = imgData.properties.height = imgData.properties.imgStyle.height = img.naturalHeight;
                        // self.sortedTypeData[index + offset] = [imgData];
                        messageBus.$emit('globalLoadCover', {
                            status: false,
                            mark: coverMark
                        });
                    }
                    img.src = src;
                })
            }
            if(mode === "inner"){
                //行内添加图片，在序号为index的sortedTypeData内部添加数据,只有一张图片
                imagesInformation.ownUrls.forEach(function(src,offset){
                    let img = document.createElement("img");
                    img.onload = function(){
                        let imgData = {
                            content: "",
                            css: {
                                width: img.naturalWidth,
                                height: img.naturalHeight,
                                top: 0
                            },
                            id: self.getRandomId(),
                            num: 1,
                            pageId: self.articleData.list[0].id,
                            properties: {
                                width: img.naturalWidth,
                                height: img.naturalHeight,
                                src: img.src,
                                imgStyle:{
                                    width:img.naturalWidth,
                                    height:img.naturalHeight
                                }
                            },
                            sceneId: self.articleData.list[0].sceneId,
                            title: null,
                            type: 4
                        };
                        if(self.textUpImgDown){
                            //字上图下
                            self.sortedTypeData[index].push(imgData);
                        }else{
                            //字下图上
                            // self.sortedTypeData[index].unshift(imgData);
                        }
                        messageBus.$emit('globalLoadCover', {
                            status: false,
                            mark: coverMark
                        });
                    }
                    img.src = src;
                })
            }




        });
        messageBus.$on("openEditor",function(info){
            self.editorSetting = info;
            self.editorFlag = true;
        });
        messageBus.$on("showImgEditBar",function(info){
            info.status?self.imgEditFlag = false:self.imgEditFlag = true;
            self.readyImgId = info.id;
        });
        messageBus.$on("imgReplace",function(){
            changeImage(self.readyImgId);
            self.othersClick();
        });
        messageBus.$on("imgDel",function(){
            self.delItem(self.readyImgId);
            self.othersClick();
        });
        messageBus.$on("imgEdit",function(){
            self.setImgEleDef();
            self.CURRENT_PANEL([{popupName:'imgEditPage',eleDef:self.imgEleDef, coverMode:self.coverMode}]);
            self.othersClick();
        });
        messageBus.$on("imgPositionChanged",function(info){
            self.imgEditPageFlag = false;
            self.CURRENT_PANEL([]);
            for(let arr of self.sortedTypeData){
                for(let item of arr){
                    if (info.id === item.id) {
                        if(item.properties) {
                            Vue.set(item.properties.imgStyle, "backgroundPositionX", info.x);
                            Vue.set(item.properties.imgStyle, "backgroundPositionY", info.y);
                            Vue.set(item.properties.imgStyle, "backgroundSizeX", info.scaleX);
                            Vue.set(item.properties.imgStyle, "backgroundSizeY", info.scaleY);
                            Vue.set(item.properties.imgStyle, "width", info.width);
                            Vue.set(item.properties.imgStyle, "height", info.height);
                            Vue.set(item.properties, "width", info.width);
                            Vue.set(item.css, "width", info.width);
                            Vue.set(item.properties, "height", info.height);
                            Vue.set(item.css, "height", info.height);
                            return;
                        }
                    }
                }
            }
        });
        messageBus.$on("allEditCoverHide",function(){
            self.imgEditPageFlag = false;
        });
        messageBus.$on("articleModeChanged",function(info){
            self.articleData = info.data;
            let styleObj = articleTools.getArticleStyle(info.data.list[0]);
            if(styleObj.topImgEle.properties.src){
                self.topImgSrc = PREFIX_FILE_HOST + styleObj.topImgEle.properties.src;
            }else{
                self.topImgSrc = bannerDefaultUrl;
            }
            if(styleObj.bgImgEle.properties.src){
                self.bgImgSrc = PREFIX_FILE_HOST + styleObj.bgImgEle.properties.src;
            }else{
                self.bgImgSrc = "";
            }
        });
        messageBus.$on("articleBorderChanged",function(info){
            self.articleData = info.data;
        });
        messageBus.$on("bgMusicChanged",function (info) {
            self.articleData.list[0].properties = info;
            if(self.$route.fullPath.indexOf('articleEdit') >-1){
                self.stopMusic();
            }
        });
        messageBus.$on('batchChangeDone',function(imgs){
            if(imgs.imagesInformation.ownUrls.length != 0){
                // self.replaceImages(imgs.imagesInformation, self.articleData);
                self.replaceImages(imgs.imagesInformation, self.sortedTypeData);
            }
        });
        messageBus.$on('stopMusic',function(){
            self.stopMusic()
        });
        messageBus.$on('playMusic',function(){
            self.playMusic()
        });
    },
    beforeDestroy:function(){
        messageBus.$off(['imgSrcChanged','imgSrcAdd','openEditor','showImgEditBar','imgEdit','imgReplace','imgDel','allEditCoverHide','imgPositionChanged','articleModeChanged','stopMusic','playMusic']);
    },
    // beforeRouteLeave:function(to,from,next){
    //     if(to.path.search("/index/mine/myArticle")>-1){
    //         next();
    //     }else{
    //         next(false);
    //     }
    // }
       
}
</script>

<style scoped lang="less">
    @import '../../../css/animate';

.clear{
    clear: both;
}
.articleEditCom{
    .scrollerPart{
        padding: .3rem .2rem 1.6rem .2rem;
        overflow: scroll;
        -webkit-overflow-scrolling: touch;
        height: 100%;
        background-color: #c9c9c9;

        .title{
            font-size: 1.3rem;
            color: black;
            background-color:white;
            padding:0.6rem;
            border-radius: 5px;
            margin-bottom: 1rem;
            position: relative;
            min-height: 2.5rem;

            .titleTxt{
                padding-right: 1.5rem;
                font-family: "SimSun", "Microsoft YaHei", "FangSong", "SimHei";
                color: rgb(118, 131, 143);
                line-height: 1.2em;
                /*word-break: break-all;*/
                word-wrap: break-word;
            }
            .pencilImg{
                height: 1.5rem;
                float: right;
                position: absolute;
                top: 0.6rem;
                right: 0.2rem;
            }
        }
    }
}

.addItemCom{
    width: 100%;
    .addItemBtn{
        img{
            width: 100%;
            height: 100%;
        }
        width: .5rem;
        margin: 0 auto;
        height: .5rem;
    }
    .addItemType{
        background-color: white;
        width: 2.8rem;
        height: .5rem;
        border-radius: 5px;
        margin: 0 auto;
        line-height: .5rem;
        font-size: 0.26rem;

        .item{
            float: left;
            width: 50%;
            height: 100%;
            text-align: center;
            position: relative;

            img{
                height: .3rem;
                vertical-align: text-bottom;
                position: absolute;
                left: 0.3rem;
                top: 0.1rem;
            }

            .addTxt{
                position: absolute;
                left: .7rem;
            }
            &.img{
                color: #d1bbe1;
            }
            &.txt{
                color: #fdab9a;
            }
        }
    }
}

.doneBtn{
    position: fixed;
    bottom: .2rem;
    left: 30%;
    width: 40%;
    height: 40px;
    background-image: url("../../../images/btnBg.png");
    background-size: 100% 100%;
    color:white;
    line-height: 35px;
    text-align: center;
    font-size: 20px;
}
.banner{
    width:100%;
    margin-bottom: 0.2rem;
    position: relative;

    .bannerImg{
        width: 100%;
        position:absolute;
        top: 0;
    }

    .change{
        position: absolute;
        bottom: 0.5rem;
        width: 4.6rem;
        height: 1.5rem;
        line-height: 1.5rem;
        text-align: center;
        font-size: 0.85rem;
        color: #0381cd;
        background-color: #dcd8d8;
        box-shadow: 1px 1px #888282;
        border-radius: 5px;
        letter-spacing: 0.1rem;
        &.changeMusic{
            left: 0.5rem;
        }
        &.changeImg{
            right: 0.5rem;
        }
    }

    .bannerImgContainer{
        width: 100%;
        padding-top: 40%;
        position: relative;
        overflow:hidden;
    }
}

.noBannerCut{
    height:100%;
}
.upArrow{
    position: absolute;
    top:.2rem;
    right: .2rem;
    width: .3rem;
    img{
        width: 100%;
    }
}
.downArrow{
    bottom: .2rem;
    right: .2rem;
    position: absolute;
    width: .3rem;
    img{
        width: 100%;
    }
}
.imgEditBar{
    position: fixed;
    bottom:0;
    left: 0;
    z-index: 101;
}
.imgEditPage{
    position: fixed!important;
    top: 0;
    left: 0;
    background-color:white;
}
    .batch{
        position: absolute;
        /* z-index: 10; */
        bottom: 0;
        right: 0;
        background-color: black;
        opacity: 0.5;
        padding: 5px;
        border-radius: 5px;
        margin: 10px;
    }
</style>
