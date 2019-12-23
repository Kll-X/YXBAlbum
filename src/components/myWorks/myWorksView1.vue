<template>
    <div>
        <div class="phone-view">
        </div>
        <bg-music-ctrl :template-data='templateData'></bg-music-ctrl>

    </div>
</template>
<script>
    import '../../js/render/checkEnv.js'
    import '../../js/render/previewbegin.js'
    import '../../js/render/previewend.js'
    import '../../js/render/addComponent.js'
    import '../../js/render/005eqxCommon.js'
    import '../../js/render/eqxiu.js'
    import '../../js/render/renderPage.js'
    import {parse} from '../../js/render/index.js'
    import * as ajax from './../../lib/ajax';
    import messageBus from './../messageBus.js';
    import bgMusicCtrl from "./../bgMusic/bgMusicCtrl.vue";


    export default {
        data: function () {
            return {
                templateData: {},
            }
        },
        components: {
            bgMusicCtrl
        },
        methods: {
            fetchData(id) {
//                $.getJSON("mock/templates.json", function (data) {
//                    parse(data);
//                });
                let self = this;
                let mark = {};
                //  loadStart
                messageBus.$emit('globalLoadCover', {
                    status: true,
                    mark: mark
                });

                ajax.templateAjax(id)
                    .then(function (data) {
                        if (data.success === true) {
                            //  loadEnd
                            messageBus.$emit('globalLoadCover', {
                                status: false,
                                mark: mark
                            });
                            self.templateData = data;
                            //bgMusic初始化
                            if (self.templateData.list[0].properties === null && self.templateData.obj.bgAudio !== "null") {
                                self.templateData.list[0].properties = {};
                                self.templateData.list[0].properties.bgAudio = JSON.parse(JSON.stringify(self.templateData.obj.bgAudio)).url;
                            }else if(typeof self.templateData.list[0].properties === "string"){
                                let bgAudio = self.templateData.list[0].properties;
                                self.templateData.list[0].properties = {};
                                self.templateData.list[0].properties.bgAudio = bgAudio;
                            }else if(typeof self.templateData.list[0].properties === "object" && self.templateData.list[0].properties && self.templateData.list[0].properties.bgAudio){
                                self.templateData.list[0].properties.bgAudio = self.templateData.list[0].properties.bgAudio
                            }else{
                                self.templateData.list[0].properties = {};
                                self.templateData.list[0].properties.bgAudio = ''
                            }
                            parse(data);
                        } else {
                            messageBus.$emit('globalLoadCoverSimple');
//                            messageBus.$emit("tipCoverShow", {
//                                status: 2,
//                                desc: ['后台服务器繁忙','请刷新重试'],
//                                icon: 'times',
                                    // style:{
                                    //     tipDescPadding:'0 0.32rem 0.4rem'
                                    // }
//                            });
                        }
                    })
                    .catch(function (error) {
//                        alert("temp error" + JSON.stringify(error));
//                        messageBus.$emit("tipCoverShow", {
//                            status: 2,
//                            desc: ['后台服务器繁忙','请刷新重试'],
//                            icon: 'times',
                            // style:{
                            //     tipDescPadding:'0 0.32rem 0.4rem'
                            // }
//                        });
                    })
            }
        },
        created: function () {
            this.fetchData(this.$route.params.id);
        }
    }
</script>
<style lang="less" scoped>

    .useTxt {
        position: fixed;
        bottom: 0;
        left: 30%;
        width: 40%;
        height: 40px;
        z-index: 100;
        background-image: url("../../images/btnBg.png");
        background-size: 100% 100%;
        .useImg {
            width: 40%;
            height: 100%;
            float: left;
        }
        img {
            margin: 4px auto;
            height: 70%;
            display: table;
        }
        .txt {
            line-height: 40px;
            color: white;
            font-size: 16px;
            font-family: Microsoft YaHei;
            float: left;
            width: 60%;
        }

    }

    .editCom {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 12%;
        z-index: 100;
        background-color: #fff;
        background-size: 100% 100%;
        .item {
            width: 33%;
            height: 100%;
            float: left;
            position: relative;
        }
    }

    .saveBtn {
        background: url("../../images/save.png") center center no-repeat;
    }

    .musicBtn {
        background: url("../../images/music.png") center center no-repeat;
    }

    .settingBtn {
        background: url("../../images/setting.png") center center no-repeat;
    }

    .saveBtn, .musicBtn, .settingBtn {
        background-size: contain;
        position: absolute;
        top: 20%;
        left: 30%;
        width: 40%;
        height: 60%;
    }
</style>

