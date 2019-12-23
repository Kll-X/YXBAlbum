<template>
    <div class="middlePage">
        <div style="height: 90%;border: 1px solid; overflow: hidden; padding: 0.2rem; ">
            <div style="height: calc((90vh - 100vw) / 2)"></div>
            <div class="main">

                <div class="image-list image-control" @click="chooseImages()">
                    <p style="text-align: center; font-size: 1.4rem;">+</p>
                    <p style="text-align: center; font-size: 14px;">添加图片</p>
                </div>

                <div class="image-list" v-for="(ownUrls, index) in imagesInformation.ownUrls" :key="index">
                    <img class="image-content" :src="ownUrls" alt="">
                </div>

                <div class="tips" v-if="!hideTips" style="color:#0080cc">该模板最多批量上传<span style="color: red;">{{imgSum}}</span>张图片</div>
            </div>
        </div>
        <div class="tool-bar">
            <div @click.stop="cancel()" class="btn-list">
                <div class="tool-bar-cancel"></div>
            </div>
            <div @click.stop="finish()" class="btn-list">
                <div class="tool-bar-finish"></div>
            </div>
        </div>
    </div>
</template>
<script>
    import {getOpenId, chooseImgs} from "@src/lib/platformAPI";
    import * as ajax from '../../lib/ajax';
    import * as utils from '../../lib/utils';
    import messageBus from "../messageBus.js";
    import {mapState, mapMutations} from 'vuex'


    export default {
        data: function () {
            return {
                imagesInformation: {
                    localIds: [],
                    serverIds: [],
                    ownUrls: [],
                    sceneId: ''
                },
                backgroundImage: ""
            }
        },
        props: [
            'imgSum',
            'hideTips'
        ],
        methods: {
            ...mapMutations([
                'CURRENT_PANEL'
            ]),
            chooseImages () {
                let self = this;
                if(self.imgSum > 0){
                    let onceImagesInformation = {localIds: [], serverIds: [], ownUrls: []};
                    return chooseImgs(onceImagesInformation, "allUploadOK", self.imgSum);
                }else{
                    messageBus.$emit('tipCoverShow', {
                        status: 2,
                        desc: ['没有可替换图片'],
                        interval: 1000
                    });
                }
            },
            finish(){
                let self = this;
                messageBus.$emit('batchChangeDone', {imagesInformation: self.imagesInformation});
                this.CURRENT_PANEL([]);
                messageBus.$emit('changeCurrentBar', 'commonBar');
            },
//             finish(){
//                 let openId = getOpenId();
//                 let self = this;
//                 let id = "";
//
//                 let copySceneMark = {};
//                 messageBus.$emit('globalLoadCover', {
//                     mark: copySceneMark,
//                     status: true
//                 });
//
//                 ajax.copyScence(openId, this.imagesInformation.sceneId)
//                     .then(function (res) {
//                         messageBus.$emit('globalLoadCover', {
//                             mark: copySceneMark,
//                             status: false
//                         });
//
//                         let data = utils.processReturnObj(res);
//                         let dataPro = utils.processReturnObj(data.data);
//                         id = dataPro.obj.id;
//
//                         self.$router.push({name: self.$route.params.nextRouterName, params: {id, imagesInformation: self.imagesInformation}})
//                     })
//                     .catch(function (error) {
// //                        messageBus.$emit("tipCoverShow",{
// //                            status:true,
// //                            content:"Copy Promise error" + JSON.stringify(error)
// //                        });
//                     });
//             },
            cancel(){
                // this.$router.go(-1);
                this.CURRENT_PANEL('');
                messageBus.$emit('changeCurrentBar', 'commonBar');
            }
        },
        created: function () {
            // this.imagesInformation.sceneId = this.$route.params.id;
        },
        mounted: function () {
            let self = this;

            messageBus.$emit("tipCoverShow", {
                status: 2,
                desc: ["请选择图片"],
                interval: 1000
            });

            messageBus.$on("allUploadOK", function (data) {
                if(self.imagesInformation.ownUrls.length < self.imgSum){
                    self.imagesInformation.localIds = self.imagesInformation.localIds.concat(data.localIds);
                    self.imagesInformation.serverIds = self.imagesInformation.serverIds.concat(data.serverIds);
                    self.imagesInformation.ownUrls = self.imagesInformation.ownUrls.concat(data.ownUrls);
                    if (self.imagesInformation.localIds.length >= self.imgSum) {
                        self.imagesInformation.localIds = self.imagesInformation.localIds.slice(0,self.imgSum);
                        self.imagesInformation.serverIds = self.imagesInformation.serverIds.slice(0,self.imgSum);
                        self.imagesInformation.ownUrls = self.imagesInformation.ownUrls.slice(0,self.imgSum);
                    }
                }else if(self.imagesInformation.ownUrls.length >= self.imgSum){
                    self.imagesInformation.localIds = data.localIds;
                    self.imagesInformation.serverIds = data.serverIds;
                    self.imagesInformation.ownUrls = data.ownUrls;
                }

            });
        },
        beforeDestroy: function () {
            messageBus.$off(["allUploadOK"]);
        },
    }
</script>
<style lang="less" scoped>

    @colorRed: #fb2d5c;
    .middlePage {
        background-color: #4b4b4b;
        height: 100%;
    }

    .image-list {
        float: left;
        height: 23.5%;
        width: 23.5%;
        margin: 0.5%;
    }

    .image-control {
        color: @colorRed;
    }

    .image-content {
        width: 100%;
        height: 100%;
    }

    .main {
        position:relative;
        height: 100vw;
        overflow-y: scroll;
        background-color: white;
        padding-top: 0.2rem;
        padding-bottom: 0.4rem;
        box-shadow: 4px 4px 12px -2px rgba(20%, 20%, 40%, 0.5);
        ::-webkit-scrollbar {
            width: 1%;
            border: 1px solid @colorRed;
        }
        .tips{
            position: absolute;
            bottom: 0;
            text-align: center;
            width: 100%;
            height:0.4rem
        }
    }

    .tool-bar {
        position: fixed;
        height: 10%;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: #fff;
    }

    .tool-bar .btn-list {
        width: 50%;
        height: 100%;
        float: left;
        position: relative;
    }

    .tool-bar-cancel {
        background: url("../../images/cancel.png") center center no-repeat;
    }

    .tool-bar-finish {
        background: url("../../images/finish.png") center center no-repeat;
    }

    .tool-bar-cancel, .tool-bar-finish {
        background-size: contain;
        position: absolute;
        top: 20%;
        left: 30%;
        width: 40%;
        height: 60%;
    }

</style>