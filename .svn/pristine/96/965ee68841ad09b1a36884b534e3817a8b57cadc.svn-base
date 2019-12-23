<template>
    <div>
        <scene-view :myWorkStatus="2" :limit="limit"></scene-view>
        <div class="useTxt">
            <!--<div class="cancel" @click.stop="to_editTemplate()">取消</div>-->
            <div class="draft" @click.stop="to_mine()">存草稿</div>
            <div class="publish" @click.stop="publish_to_mine()">发布</div>
        </div>
    </div>
</template>
<script>
    import * as ajax from '@lib/ajax'
    import * as utils from '@lib/utils'
    import messageBus from '@components/messageBus'
    import sceneView from '@components/commonComponent/sceneView.vue'
    import * as platformAPI from "@lib/platformAPI"
    import {mapState} from 'vuex'


    export default {
        data: function () {
            return {
                limit: {
                    agree: 0,
                    sum: 100,
                    used: 0
                }
            }
        },
        components: {
            sceneView
        },
        computed: {
            ...mapState([
                'currentType'
            ])
        },
        methods: {
            loadStart(mark) {
                messageBus.$emit('globalLoadCover', {
                    mark: mark,
                    status: true
                });
            },
            publish_to_mine(){
//                todo 添加发布活动逻辑------------
                let self = this;
                ajax.publish({
                    "photoId": self.$route.params.id
                }).then(function (data) {
                    self.to_mine()
                });

            },
            to_mine(){
                this.$router.push({path: '/index/mine/' + this.currentType});
            },
            to_editTemplate() {
                this.$router.push({
                    path: '/editTemplate/' + this.$route.params.id
                });
            }
        },
        created: function () {
            let self = this;

            //访问统计
            ajax.addCount({
                "photoId": this.$route.params.id
            }).then(function (info) {
                //                console.log(info);
            });

            ajax.querySceneSetting({
                'photoId': self.$route.params.id
            }).then(function (data) {
                data = utils.processReturnObj(data);

                if (data.resultCode === 0) {

                    // document.title = data.data.name;

                    let shareData = {
                        name: data.data.name,
                        desc: data.data.describe,
                        coverImage: data.data.coverImage,
                    };
                    // todo 分享待定修改--------------------------------------
                    platformAPI.share(shareData)

                } else {
                    console.log(JSON.stringify(data));
                }
            }).catch(function (error) {
                console.log("场景设置信息查询失败");
            });
        }
    }
</script>
<style lang="less" scoped>
    .useTxt {
        position: fixed;
        bottom: 10px;
        left: 0;
        width: 100%;
        height: 40px;
        z-index: 100;
        display: flex;
        align-items: center;
        justify-content: space-around;
        .publish, .draft, .cancel {
            width: 25%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
            background-color: #0080cc;
            border-radius: 5px;
        }
    }

    .ads {
        position: fixed;
        z-index: 200;
        bottom: 1vh;
        color: rgba(0, 0, 0, 0.3);
        left: 50%;
        transform: translate(-50%, 0)
    }
</style>