<template>
    <div class="confirmCom" >
        <div class ="mask">
        </div>
        <div class="content">
            <div class="txt">{{content}}</div>
            <div class="button">
                <div @click="cancelHandler" class="cancelBtn">取消</div>
                <div @click="confirmHandler" class="confirmBtn">确定</div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props:['content'],
        data:function(){
            return {
                reject:"",
                resolve:"" ,
                promise:""
            }
        },
        methods:{
            confirmHandler(){
                this.resolve('confirm');
            },
            cancelHandler(){
                this.reject('cancel');
            },
            confirm(){
                this.promise= new Promise((resolve,reject)=>{
                    this.reject = reject;
                    this.resolve = resolve;
                });
                return this.promise;
            }
        }
    }
</script>
<style scoped>
    .confirmCom{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    .mask{
        width: 100%;
        height: 100%;
        background-color: black;
        filter: alpha(opacity = 60);
        opacity: 0.6;
        -moz-opacity: 0.6;
        position:absolute;
        top: 0;
        left: 0;
    }
    .txt{
        text-align: center;
        line-height: 13rem;
        font-size: 16px;
    }
    .content{
        width:80%;
        height: 15rem;
        background-color: white;
        position: absolute;
        left: 10%;
        top: 15%;
        border-radius: 3px;
    }
    .button{
        width:100%;
        position:absolute;
        bottom: 0;
    }
    .button div{
        width: 50%;
        height: 100%;
        width: 50%;
        height: 100%;
        float: left;
        text-align: center;
        line-height: 2rem;
        border: 1px solid #D5D5D6;
    }
    .confirmBtn{
        color:#0BB20C;
        border-bottom-right-radius: 3px;
    }
    .cancelBtn{
        border-bottom-left-radius: 3px;
    }
</style>