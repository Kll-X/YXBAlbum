<template>
    <div class="edit-bar">
        <div class="edit-bar-inner">
            <div v-html="textValue" contenteditable="true" class="edit-text" @blur="blurAdjust"></div>
            <i @click="deleteAll"></i>
        </div>
        <span class="edit-btn" @click="commitEdit()">完成</span>
    </div>
</template>
<script>
    import messageBus from "../../../messageBus.js"

    const reg = /(<span.*?font-size.*?>)(.*?)(<\/span>)/;
    
    export default {
        props: ['eleDef'],
        data: function () {
            return {
                textValue: this.eleDef.content,
            }
        },
        watch:{
            eleDef: function (newVal, oldVal) {
                this.textValue = self.eleDef.content
            }
        },
        methods: {
            commitEdit: function () {
                let self = this;
                let result = self.textValue = $('.edit-text').html();

                messageBus.$emit('textChanged', {
                    content: result,
                    id: self.eleDef.id
                });
                messageBus.$emit('showCommonBar');
                messageBus.$emit('allEditCoverHide');
                messageBus.$emit('allProxyItemHide');
            },
            deleteAll(){
                this.textValue = "";
            },
            blurAdjust(e){
                setTimeout(()=>{
                    if(document.activeElement.tagName == 'INPUT' || document.activeElement.tagName == 'TEXTAREA'){
                        return
                    }
            
                    let result = 'pc';
                    if(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) { //判断iPhone|iPad|iPod|iOS
                        result = 'ios'
                    }else if(/(Android)/i.test(navigator.userAgent)) {  //判断Android
                        result = 'android'
                    }
            
                    if( result = 'ios' ){
                        document.activeElement.scrollIntoViewIfNeeded(true);
                    }
                },400)
            }
        },
        mounted: function () {

        },
        updated(){
        }


    }
</script>
<style scoped>
    .edit-bar{
        height: 100%;
        display:flex;
        justify-content: center;
        align-items: center;
        background-color: #eee;
    }
    .edit-bar .edit-bar-inner{
        border-radius: 3px;
        background-color: #fff;
        width: 68vw;
        height:80% ;
        display:flex;
        align-items: center;
        padding-right: 2vw;
    }
    .edit-bar .edit-text{
        color:#5f5f5f;
        font-size:14px;
        height:100%;
        width: 90vw;
        border:none;
        outline: none;
        padding: 10px;
        box-sizing: border-box;
        overflow: auto
    }
    .edit-bar .edit-bar-inner i{
        width: 8vw;
        height: 8vw;
        background: url(../../../../images/empty.png) no-repeat;
        background-position: center center;
        background-size:contain;
    }
    .edit-bar .edit-btn{
        width: 20vw;
        background-color: #009944;
        color:#fff;
        border-radius:3px;
        margin-left:4vw;
        height:47%;
        display:flex;
        justify-content: center;
        align-items: center;
        font-size:14px;
    }
    .edit-btn:before{
        content:'';
        width:5vw;
        height:3vw;
        background: url(../../../../images/ok.png) no-repeat;
        background-position: center center;
        background-size:contain;
        margin-right:1vw;
    }
</style>