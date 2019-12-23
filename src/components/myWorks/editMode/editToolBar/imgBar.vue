<template>
    <div class="container">
        <div class="editImg" >
            <div class="cancelBtn" @click="cancel()"></div>
        </div>
        <div class="editImg" >
            <div class="editBtn" @click="goToImgEditPage()"></div>
        </div>
        <div class="editImg" >
            <div class="changeBtn" @click="changeImage()"></div>
        </div>
    </div>

</template>
<script>
    import {chooseImgs} from "@src/lib/platformAPI";
    import messageBus from '../../../messageBus.js';
    import {mapState, mapMutations} from 'vuex'


    export default {
        props: ['eleDefId'],
        methods: {
            goToImgEditPage () {
                // this.CURRENT_PANEL([{popupName:'imgEditPage'}])
                messageBus.$emit('showImgEditPage');
            },

            changeImage () {
                let oneImagesInformation = {localIds: [], serverIds: [], ownUrls: []};
                return chooseImgs(oneImagesInformation, "imgUpOK", 1);
            },

            cancel () {
                messageBus.$emit('showCommonBar');
                messageBus.$emit('allEditCoverHide');
                messageBus.$emit('allProxyItemHide');
            },
            ...mapMutations([
                'CURRENT_PANEL'
            ]),
        },
        mounted: function () {
            let self = this;

            messageBus.$on("imgUpOK", function (info) {
                messageBus.$emit('imgSrcChanged', {
                    src: info.ownUrls[0],
                    id: self.eleDefId
                });
                messageBus.$emit('showCommonBar');
                messageBus.$emit('allEditCoverHide');
                messageBus.$emit('allProxyItemHide');
            })
        },
        beforeDestroy: function () {
            messageBus.$off(["imgUpOK"]);
        },
    }
</script>
<style scoped>
    .container {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 1.05rem;
        z-index: 100;
        background-color: #fff;
        background-size: 100% 100%;
        padding-left:0;
        padding-right: 0;
    }

    .container .editImg {
        width: 33%;
        height: 100%;
        float: left;
        position: relative;
    }
    .cancelBtn {
        background: url("../../../../images/cancel.png") center center no-repeat;
    }
    .editBtn {
        background: url("../../../../images/editBtn.png") center center no-repeat;
    }

    .changeBtn {
        background: url("../../../../images/change.png") center center no-repeat;
    }
    .cancelBtn, .editBtn, .changeBtn {
        background-size: contain;
        position: absolute;
        top: 20%;
        left: 30%;
        width: 40%;
        height: 60%;
    }
</style>