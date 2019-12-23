<template>
    <div class="articleItemCom">
        <div class="itemImg">
            <div v-if="imgData" class="itemImgContent" :class="{border:imgData&&imgBorderFlag}">
                <div @click="showImgEditBar" class="imgContent" :style="imgContentStyle" ></div>
            </div>
            <div v-if="!imgData" @click="addImg" class="addImgTxt">点击添加图片</div>
            <img class="closeBtn" @click="delLine" src="../../../images/rubbish.png" alt="">
        </div>
        <div class="itemTxt">
            <div v-if="txtData"  @click="changeTxt" v-html="txtContent" class="defaultSet" ></div>
            <!-- <textarea name="" id="" cols="30" rows="10" v-if="txtData" @click="changeTxt" v-html="txtData.content"></textarea> -->
            <div v-if="!txtData" class="textContentStyle" @click="addTxt">点击添加文字</div>
            <slot></slot>
        </div>
    </div>
</template>

<script>
import messageBus from '@components/messageBus.js'
export default {
    data:function(){
        return{
            imgData:"",
            txtData:"",
            imgTypeNum: 4,
            txtTypeNum:2,
            imgBorderFlag: false,
        }
    },
    props:['data','index'],
    created:function(){
        this.updateData();
    },
    watch:{
        data:function(){
            this.updateData();
        }
    },
    methods:{
        updateData(){
            this.imgData="";
            this.txtData="";
            for(let i = 0;i<this.data.length;i++){
                if(parseInt(this.data[i].type) == this.imgTypeNum){
                    this.imgData = this.data[i];
                }else{
                    this.txtData = this.data[i];
                }
            }
        },
        delImg(){
            this.$emit("itemChange",{
                id:this.imgData.id,
                commend:"delItem"
            });
        },
        delLine(){
            this.$emit("itemChange",{
                index: this.index,
                commend: "delLine"
            })
        },
        showImgEditBar(){
            let self = this;
            messageBus.$emit("showImgEditBar",{id:self.imgData.id,status:self.imgBorderFlag})
        },
        addImg(){
            let self = this;
            this.$emit("itemChange",{
                commend: "addImg",
                index: self.index
            })
        },
        changeTxt(){
            let info = {};
            info.mode = 1;
            info.length = 5000;
            info.placeholder = "请输入文章内容(最多5000字)";
            info.origin = this.txtData.content;
            info.message={};
            info.message.mark = "content";
            info.message.markData = this.txtData.id;
            messageBus.$emit("openEditor",info);
        },
        addTxt(){
            let self = this;
            this.$emit("itemChange",{
                commend: "addTxt",
                index: self.index
            })
        }
    },
    computed:{
        imgSrc: function () {
            return /^http.*/.test(this.imgData.properties.src) || /^weixin.*/.test(this.imgData.properties.src) ?
                this.imgData.properties.src :
                PREFIX_FILE_HOST + this.imgData.properties.src
        },
        imgContentStyle:function(){
            let backgroundSize,bgSizeX,bgSizeY,width,height,bgWidth,bgHeight;
            if(this.imgData.properties.imgStyle.backgroundSizeX&&this.imgData.properties.imgStyle.backgroundSizeY){
                bgSizeX = parseInt(this.imgData.properties.imgStyle.backgroundSizeX);
                bgSizeY = parseInt(this.imgData.properties.imgStyle.backgroundSizeY);
                console.log(bgSizeX);
                console.log(bgSizeY);
                backgroundSize =bgSizeX+"% "+bgSizeY+"%";
                console.log(backgroundSize);
//                width = bgSizeX>bgSizeY? 100*bgSizeY/bgSizeX+"%":98+"%";
//                height = bgSizeY>bgSizeX? 100*bgSizeX/bgSizeY+"%":98+"%";
                bgWidth = this.imgData.properties.imgStyle.width;
                bgHeight = this.imgData.properties.imgStyle.height;
                width = bgWidth<bgHeight? (98*bgWidth/bgHeight).toFixed(2)+"%":98+"%";
                height = bgHeight<bgWidth? (98*bgHeight/bgWidth).toFixed(2)+"%":98+"%";
            }else{
                backgroundSize = "contain"
                width = "98%";
                height = "98%";
            };

            return {
                'background-image': "url("+this.imgSrc+")",
                'background-position-x': this.imgData.properties.imgStyle.backgroundPositionX||"50%",
                'background-position-y': this.imgData.properties.imgStyle.backgroundPositionY||"50%",
                'background-size': backgroundSize,
                'width': width,
                'height': height,
                'margin': ((98-parseInt(height))/2).toFixed(2)+"% "+((98-parseInt(width))/2).toFixed(2)+"%"
            }
        },
        txtContent:function(){
            let content = this.txtData.content;
            let arr=[];
            let length = 0,maxLength=25;
            let result="";
//            content = content.replace(/color:\s*inherit/g,"color:#333");
//             content = content.replace(/&nbsp;/ig,"").replace(/<[^>]+>/g,"");
            content = content.replace(/div>/g,"p>");//将可能出现的div替换成p
            content = content.replace(/&nbsp;/ig,"").replace(/<(?!\/?p).*?>/g,"");//去除空白和除了p的所有html标签
            arr = content.match(/<p>.*?<\/p>/g);
            //大于maxLength的字符变为省略号
            if(arr){
                for(let item of arr){
                    console.log(item);
                    if(length+$(item).text().length<maxLength){
                        length = length+ $(item).text().length;
                        result = result+item;
                    }else{
                        if(length+$(item).text().length==maxLength){
                            result = result + item;
                        }else{
                            console.log(maxLength-length);
                            console.log($(item).text());
                            let div=document.createElement('div');
                            div.innerText=$(item).text().slice(0,maxLength-length); //不带字符实体的字符串
                            result = result + "<p>"+div.innerHTML+"...</p>";
                        }
                        break;
                    }
                }
            }else{
                result = content;
            }
            return result;
        }
    },
    mounted:function(){
        let self = this;
        messageBus.$on("showImgEditBar",function(info){
            if(info.id == self.imgData.id){
                self.imgBorderFlag = !self.imgBorderFlag;
            }else{
                self.imgBorderFlag = false;
            }
        })
    },
}
</script>

<style scoped lang="less">
.articleItemCom{
    height: 3rem;
    position: relative;
    margin-bottom: 0.2rem;
    margin-top: 0.2rem;

    .itemImg{
        width:35%;
        height: 100%;
        background-color: white;
        float: left;
        position: relative;


        .itemImgContent{
            width:100%;
            height: 100%;
            display:flex;
            justify-content:center;
            align-items:center;
            border-right: 1px solid #f9f8f8;

            .imgContent{
                width: 98%;
                height:98%;
                background-repeat: no-repeat;
                max-height: 100%;
                position: absolute;
                left: 1%;
                top: 1%;
            }
        }
        .border{
            border:1px dashed black;
        }

        .addImgTxt{
            line-height: 3rem;
            text-align: center;
            height: 3rem;
        }

        .closeBtn{
            width: .5rem;
            margin:.1rem;
            position: absolute;
            top: 0;
            left: 0;
        }
    }

    .itemTxt{
        width:65%;
        height: 100%;
        background-color: white;
        float: left;
        padding: 0.2rem 0.7rem 0.2rem 0.2rem;
        line-height: 1.3;
        font-size: 16px;

        .defaultSet{
            color: #333;
            line-height: 1.3;
            height:100%;
            /*word-break:break-all;*/
            word-wrap: break-word;
            font-size: 16px;
            overflow: scroll;
        }

        .textContentStyle{
            height: 100%;
        }
    }
}


</style>
