<template>
    <div class="editCom">
        <div class="item">
            <div class="batchBtn" v-on:click="batch"></div>
        </div>
        <div class="item">
            <div class="musicBtn" v-on:click="choseMusic"></div>
        </div>
        <div class="item">
            <div class="settingBtn" v-on:click="setting"></div>
        </div>
        <div class="item">
            <div class="saveBtn" v-on:click="save"></div>
        </div>
    </div>
</template>
<script>
    import messageBus from "../../../messageBus.js";
    import {mapState, mapMutations} from 'vuex'

    export default {
        props:['imgSum'],
        computed:{
            ...mapState([
                'settingInfo'
            ])
        },
        methods: {
            ...mapMutations([
                'CURRENT_PANEL'
            ]),
            batch(){
//                this.$router.push({name: 'middlePage', params: {id: this.$route.params.id, nextRouterName: "edit"}});
                let self = this;
                messageBus.$emit('changeCurrentBar','null');
                self.CURRENT_PANEL([{popupName:'middlePage',imgSum:self.imgSum}])
            },
            save() {
                messageBus.$emit("saveScene");
            },
            choseMusic() {
                messageBus.$emit("chooseMusic");
            },
            setting() {
                this.CURRENT_PANEL([{popupName:'setting'}]);
            },

        }
    }
</script>
<style scoped>
    .editCom {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 1.04rem;
        z-index: 100;
        background-color: #fff;
        background-size: 100% 100%;
        box-shadow: 1px 0 10px rgba(0,0,0,.4);;
    }

    .editCom .item {
        width: 25%;
        height: 100%;
        float: left;
        position: relative;
    }
    .batchBtn{
        background: url("../../../../images/batch.png") center center no-repeat;
    }
    .saveBtn {
        background: url("../../../../images/save.png") center center no-repeat;
    }

    .musicBtn {
        background: url("../../../../images/music.png") center center no-repeat;
    }

    .settingBtn {
        background: url("../../../../images/setting.png") center center no-repeat;
    }

    .batchBtn, .saveBtn, .musicBtn, .settingBtn {
        background-size: contain;
        position: absolute;
        top: 20%;
        left: 30%;
        width: 38%;
        height: 60%;
    }
</style>