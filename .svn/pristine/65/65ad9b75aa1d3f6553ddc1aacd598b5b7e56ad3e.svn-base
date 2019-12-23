<template>
    <div>
        <scene-view :myWorkStatus="myWorkStatus" :limit="limit"></scene-view>
    </div>
</template>
<script>
    import * as ajax from '@lib/ajax'
    import * as utils from '@lib/utils'
    import messageBus from '@components/messageBus'
    import sceneView from '@components/commonComponent/sceneView.vue'
    import * as platformAPI from "@lib/platformAPI"


    export default {
        data: function () {
            return {
                myWorkStatus: undefined,
                limit: {
                    sum: '',
                    used: '',
                    agree: 0,
                    shareData:{}
                }
            }
        },
        components: {
            sceneView
        },
        computed: {
            showLeftPreview: function () {
                return location.search.indexOf('id') > -1
            }
        },
        methods: {
            loadStart(mark) {
                messageBus.$emit('globalLoadCover', {
                    mark: mark,
                    status: true
                });
            }
        },
        created: function () {
            let self = this;

            //访问统计
            ajax.addCount({
                "photoId": this.$route.params.id
            }).then(function (info) {

            });

            ajax.querySceneSetting({
                'photoId': self.$route.params.id
            }).then(function (data) {
                data = utils.processReturnObj(data);
                if (data.resultCode === 0) {
                    // document.title = data.data.name;
                    if (!self.showLeftPreview) {
                        self.myWorkStatus = data.data.status;
                        if (self.myWorkStatus - 0 === 0 || self.myWorkStatus - 0 === 1) {
                            //            剩余可访问用户数数据请求
                            ajax.queryLimitPreview({id: self.$route.params.id}).then(function (limitData) {
                                limitData = utils.processReturnObj(limitData);
                                if (limitData.resultCode === 0) {
                                    self.limit = Object.assign({}, limitData.data);
                                }
                            });
                        }
                    }

                    if(platformAPI.env === 'weixin'){
                        self.shareData = {
                            name: data.data.name,
                            desc: data.data.describe,
                            coverImage: data.data.coverImage,
                        };
                    }else if(platformAPI.env === 'hefeixinFyp'){
                        // 和飞信负一屏分享 shareData
                        console.log('和飞信负一屏分享信息整合')
                        let url = window.location.href.split('?')
                        self.shareData = {
                            url:url[0]+window.location.hash,
                            title:data.data.name,
                            content:data.data.describe,
                            iconUrl:data.data.coverImage,
                            author:'MM营销宝'
                        }
                    }
                    platformAPI.share(self.shareData);



                    
                } else {
                    console.log(JSON.stringify(data));
                }
            }).catch(function (error) {
                console.log("场景设置信息查询失败");
            });


            // 如在和飞信负一屏中,加载此组件时应在兼容安卓苹果前提下,显示出分享按钮
            if(platformAPI.env === 'hefeixinFyp'){
                let jsonString = JSON.stringify({show: 1});
                // window.rcsOptimizeReady = function(){
                    if(utils.isIos()){
                        navigator.WebContainer && navigator.WebContainer. rcsShowRightMoreButton(jsonString)
                    }else if(utils.isAndroid()){
                        window.WebContainer && window.WebContainer. rcsShowRightMoreButton(jsonString);
                    }
                // }
            }
        }
    }
</script>
<style lang="less" scoped>

</style>