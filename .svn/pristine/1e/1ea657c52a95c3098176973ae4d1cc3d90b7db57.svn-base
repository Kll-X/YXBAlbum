<template>
    <div class="editorCom">
        <div class="mask"></div>
        <div class="editor">
            <div class="editorPanel">
                <textarea class="editorTxt mode1" v-if="mode===1"></textarea>
                <!--<textarea class="editorTxt" v-if="mode===2" v-model="changedContent" maxlength="50" cols="30" rows="10" onfocus="if(value=='请输入文章标题(最多50字)'){value=''}" onblur="if (value ==''){value='请输入文章标题(最多50字)'}">请输入文章标题(最多50字)</textarea>-->
                <textarea class="editorTxt mode2" @input="inputFunc" v-if="mode===2" :placeholder="placeholder" v-model="changedContent" :maxlength="length" cols="10" rows="8" ></textarea>
            </div>
            <div class="editorBtn">
                <div class="cancelBtn" @click="cancel">取消</div>
                <div class="confirmBtn" @click="confirm">确认</div>
                <div class="clear"></div>
            </div>
            <div class="wordCount" :class="{mode2:mode===2}"><span v-html="count"></span></div>
        </div>
    </div>
</template>

<script>
import '../../../plugin/Simditor/simditor.css'
import Simditor from '@plugin/Simditor/simditor.js'
import messageBus from "../../messageBus.js"
export default {
    // props:['setting'],//{length:,placeholder:"",mode:1,origin:"",mark:"",markData:"",necessary:true}
    props: {
        length:{
            default:5000
        },
        placeholder:{
            default:""
        },
        mode:{
            default:1
        },
        origin:{
            default:""
        },
        necessary:{
            default:false
        },
        message:{
        },
        toolbar:{
            default:function(){
                return ['fontScale', 'bold', 'italic', 'underline', 'alignment', 'color']
            },
        },
        allowedStyles:{
            default:function(){
                return {
                    div: ['text-align'],
                        span: ['color', 'font-style', 'font-size', 'font-weight', 'font-family'],
                    p: ['color', 'text-align', 'font-style', 'font-size', 'font-weight', 'font-family'],
                    font: ['size'],
                    }
                }
        }

    },
    data:function(){
        return {
            editor:"",
           // allowedTags: ['div','span', 'a', 'img', 'b', 'strong', 'i', 'strike', 'u', 'font', 'ul', 'ol', 'li', 'blockquote', 'pre', 'code', 'h1', 'h2', 'h3', 'h4', 'hr'],
            valueHtml:"",
            changeFlag: true,
            changedContent:"",
            content:"",
            count:'',
        }

    },
    methods:{
        cancel(){
            this.$emit("closeEditor");
        },
        confirm(){
            let txtContent;
            let self = this;
            if(this.mode===1){
                // this.$emit("txtChange",{mark:"title",content:this.editor.getValue()});
                txtContent = this.editor.getValue();
            }else if(this.mode === 2){
                // this.$emit("txtChange",{title:"title",content:this.changedContent});
                txtContent = this.changedContent;
            }
            if(this.necessary && txtContent == ""){
                messageBus.$emit("tipCoverShow", {
                    status: 2,
                    desc: ['内容不能为空哦~'],
                    interval:3000,
                });
            }else{
                this.$emit('txtChange',
                    {
                        content:txtContent,
                        message:self.message,
                    })
            }
        },
        init1(){
            let self = this;
            let origin = self.origin;
            this.editor = new Simditor({
                textarea: $('.editorTxt'),
                toolbar: self.toolbar,
                placeholder: self.placeholder,
                // allowedTags: self.allowedTags,
                allowedStyles: self.allowedStyles
            });
            console.log(origin);
//            origin = origin.replace(/color:\s*inherit/g,"color:#333");
            //营销宝编辑器格式修改
            origin = origin.replace(/(<\/?)(div)>/g,function(all,$1){
                return $1+"p>"
            })
            //替换插件不兼容的div标签；
            console.log(origin);
            this.content = this.editor.getValue();
            let formatStr = origin.replace(/<[^>]+>/g, "");
            this.count = formatStr.length+"/"+this.length;
            this.editor.setValue(origin);
            let bodyHeight = $("body").height() - $(".simditor-toolbar").height() - $(".editorBtn").height() - 60;
            $(".simditor-body").css("height",bodyHeight);
            $(".simditor-body").scrollTop($(".simditor-body")[0].scrollHeight);//内容滑动到最低端
        },
        init2(){
            this.changedContent = this.origin;
            this.count = this.changedContent.length+"/"+this.length;
        },
        init3(){

        },
        inputFunc: function (e) {
            let strLength = e.target.value.length >=this.length ? this.length : e.target.value.length;
            this.count = strLength + "/"+this.length;
        }
        // settingInit:function () {
        //     let self = this;
        //     $.extend(true,self.setting,self.setting);
        // }
    },
    mounted:function(){
        // this.settingInit();
        //防止键盘弹出导致变形
        $(".editor").height(document.documentElement.clientHeight);
        if(this.mode===1){
            let self = this;
            this.init1(); //富文本

            this.editor.on('valuechanged',(e,src)=>{
                 if(this.changeFlag){
                     let htmlStr = this.editor.getValue();
                     let formatStr = htmlStr.replace(/<[^>]+>/g, "");
                     self.changeFlag = false;
                     if(formatStr.length>self.length){
                        self.editor.setValue(self.content);
                         self.editor.selection.setSelectionSaved(true);//保证存在simditor-caret-start和end类才可以设置为true
                         // self.editor.selection.restore();

                         self.count = self.content.replace(/<[^>]+>/g, "").length+"/"+self.length;
                     }else{
                         // self.editor.selection.save();
                         self.count = formatStr.length +"/"+self.length;
                         self.content = this.editor.getValue();
                         console.log("save");
                         console.log(self.content);
                     }
                     self.changeFlag = true;
                 }
             } )
            this.editor.on("focus",(e,src)=>{
                // $(".editor")[0].scrollIntoView();//将编辑器滑动到可视视图内
                // $(".simditor-body")[0].scrollIntoView();
                $(".simditor-body")[0].scrollIntoView(false);
            });
            this.editor.focus();

        }else if(this.mode === 2){
            this.init2(); //纯文本
            $(".mode2").focus()
        }
        // this.editor.on('valuechanged',(e,src)=>{
        //     if(self.changeFlag){
        //         this.editor.selection.save();//保存光标信息,simditor
        //         let htmlStr = this.editor.getValue();
        //         console.log(htmlStr);
        //         let formatStr = htmlStr.replace(/<(?!span).*?>/g, "");
        //         console.log(formatStr);
        //         self.changeFlag = false;
        //         this.editor.setValue(formatStr);
        //         self.changeFlag = true;
        //         this.editor.focus();
        //         this.editor.selection.restore();//恢复光标信息

        //     }
            
        // } )
    }

}
</script>

<style>
.simditor{
    border:none;
}

.simditor .simditor-body{
    margin-top:8vh !important;
    /*margin-bottom:5px;*/
    padding:0px 15px 40px !important;
    height: 100%;
    overflow: scroll;
    /*min-height: 10rem;*/
    /*word-break: break-all;*/
    word-wrap: break-word;
}
.simditor .simditor-body a{
    word-break:inherit!important;
}
.simditor .simditor-wrapper .simditor-placeholder{
    margin-top:8vh !important;
    padding:0px 15px 40px !important;
}
.toolbar-menu.toolbar-menu-fontScale{
    width:120px;
}

.toolbar-menu.toolbar-menu-fontScale li{
    width:39px;
    float:left;
}
b{
    font-weight: bold;
}
i{
    font-style: italic;
}
u{
    text-decoration: underline;
}
</style>

<style scoped>

.mask{
    width:100%;
    height: 100%;
    background-color: white;
    /*opacity: 0.5;*/
    /*-moz-opacity: 0.5;*/
    /*filter: alpha(opacity = 50);*/
}
.clear{
    clear: both;
}
.editorCom{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 102;
}
.editor{
    position: absolute;
    background-color:white;
    /*top: 5%;*/
    /*position: fixed;*/
    top:0;
    width: 100%;
    /*height: 480px;  !*设置容器的高度*!*/
    /**/
    /* overflow:scroll; max-height:300px */
}
.editorPanel{
    /*margin-left: 5%;*/
    /*width: 90%;*/
    height: 100%;/*设置容器的高度*/
}
.editorBtn{
    background-color: white;
    /*border-bottom-right-radius: 5px;*/
    /*border-bottom-left-radius: 5px;*/
    position: absolute;
    height: 1rem;
    bottom: 0;
    width:100%;
    /*border-bottom:1px solid #c9d8db;*/
}
.editorBtn .cancelBtn,.editorBtn .confirmBtn{
    margin: 0 5%;
    width: 40%;
    border-radius: 5px;
    float: left;
    text-align:center;
    font-size: .38rem;
    line-height: 1rem;
    color: white;
}
.cancelBtn{
    background: #cccccc;
}
.confirmBtn{
    background: #2096f9;
}
.editorTxt{
    width: 100%;
    /*border-top-right-radius: 5px;*/
    /*border-top-left-radius: 5px;*/
    padding:2px;
    word-wrap: break-word;
}
.editorTxt.mode2{
    /*height:100%;*/
    padding: 3rem 0.6rem 0.6rem 0.6rem;
    font-size: 1.5rem;
    line-height: 1.2;
}
.editorTxt.mode2:focus{
    outline: none !important;
    border: 1px solid #ccd5db;
}
.wordCount{
    position: absolute;
    top: 1rem;
    right: .2rem;
}
.wordCount.mode2{
    top: 1rem;
}
</style>
