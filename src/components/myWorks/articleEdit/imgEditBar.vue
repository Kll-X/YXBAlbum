<template>
    <div class="imgEditBarCom">
        <div class="item">
            <div class="cancelBtn" @click="cancel"></div>
        </div>
        <div class="item">
            <div class="editBtn" @click="imgEdit"></div>
        </div>
        <div class="item">
            <div class="replaceBtn" @click="imgReplace"></div>
        </div>
        <div class="item">
            <div class="delBtn" @click="imgDel"></div>
        </div>
    </div>
</template>
<script>
    import messageBus from '../../messageBus'
export default{
    data: function(){
        return {

        }
    },
    methods:{
        cancel(){
            messageBus.$emit("showImgEditBar",{id:-1,status:true}); //取消选择
        },
        imgEdit(){
            messageBus.$emit("imgEdit");
        },
        imgReplace(){
            messageBus.$emit("imgReplace");
        },
        imgDel(){
            messageBus.$emit("imgDel");
        }
    }
}
</script>
<style scoped>
    .imgEditBarCom{
        height:10vh;
        width: 100%;
        background-color: white;
        border-top: 1px solid #626262;
    }
    .imgEditBarCom .item{
        float: left;
        width: 25%;
        height: 100%;
        position: relative;
    }

    .cancelBtn{
        background: url("../../../images/cancel.png") center center no-repeat;
    }
    .editBtn{
        background: url("../../../images/editBtn.png") center center no-repeat;
    }
    .replaceBtn{
        background: url("../../../images/change.png") center center no-repeat;
    }
    .delBtn{
        background: url("../../../images/del.png") center center no-repeat;
    }
    .cancelBtn,.editBtn,.replaceBtn,.delBtn{
        position: absolute;
        background-size:contain;
        height: 70%;
        top: 15%;
        width: 36%;
        left: 32%;
    }
</style>