<template>
    <div class="indexContainer">
        <transition name="fade">
            <router-view class="indexContent"></router-view>
        </transition>
        <index-bar :icons="indexIcons" :tab="true" :default-tab="defaultTab"></index-bar>
    </div>
</template>

<script>
    import messageBus from './messageBus.js';
    import {mapState, mapMutations} from 'vuex';
    import indexBar from '@components/commonComponent/btnsBar.vue'

    export default {
        data() {
            return {
                transitionName: 'slide-left',
                h5Path: "/index/works/animation",
                articlePath: "/index/works/article",
                vedioPath: "/index/works/vedio",
                minePath: "/index/mine/myAnimation",
                currentMainItem: '',
                indexIcons:[
                    {
                        src: require('../images/h5_default.png'),
                        activeSrc: require('../images/h5.png'),
                        handler:this.to_h5
                    },
                    {
                        src: require('../images/vedio_defaultBtn.png'),
                        activeSrc: require('../images/vedio_activeBtn.png'),
                        handler:this.to_vedio
                    },
                    {
                        src: require('../images/article_defaultBtn.png'),
                        activeSrc: require('../images/article_activeBtn.png'),
                        handler:this.to_article
                    },
                    {
                        src: require('../images/mine_default.png'),
                        activeSrc: require('../images/mine.png'),
                        handler:this.to_mine
                    },
                ]
            }
        },
        components:{
            indexBar
        },
        watch: {
            '$route'(to, from) {
                const toDepth = to.path.split('/').length;
                const fromDepth = from.path.split('/').length;
                this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
            }
        },
        computed: {
            routeType(){
                return this.$route.params.type;
            },
            defaultTab(){
                let index;
               switch (this.routeType){
                   case "animation": index = 0;break;
                   case "vedio": index = 1;break;
                   case "article": index = 2;break;
                   case "myAnimation": ;
                   case "myArticle":;
                   case "myVedio": index = 3;break;
                   default: index = 0;
               }
               return index;
            },
            ...mapState([
                'currentType'
            ])
        },
        mounted: function () {
            let self = this;
            switchRoute(self.$route.path.split("/").pop());
            messageBus.$on("routeChange", function (info) {
                switchRoute(info.route);
            });

            function switchRoute(path) {
                switch (path) {
                    case "animation":
                        self.h5Path = "/index/works/animation";
                        break;
                    case "article":
                        self.articlePath = "/index/works/article";
                        break;
                    case "vedio":
                        self.vedioPath = "/index/works/vedio";
                        break;
                }
            }

//            messageBus.$on("showCurrentMainItem", function (currentMainItem, lastMainItem) {
//                self.currentMainItem = currentMainItem;
//                console.log(currentMainItem)
//            });
        },
        methods: {
            to_h5(){
                this.$router.push({path: this.h5Path})
            },
            to_article(){
                this.$router.push({path: this.articlePath})
            },
            to_vedio(){
                this.$router.push({path: this.vedioPath})
            },
            to_mine(){
                this.$router.push({path: this.minePath})
            }
        },
        beforeDestroy(){
            messageBus.$off('showCurrentMainItem')
        }
    }
</script>

<style scoped lang="less">
    .indexContainer {
        background: #e8e8e8;
        height: 100%;
        position: relative;
    }

    .index {
        position: fixed;
        bottom: 0;
        height: 10%;
        width: 100%;
        background-color: white;
        border-top: 1px solid #626262;
        /*z-index: 0;*/
    }

    /*.index::after {*/
    /*content: "";*/
    /*background-color: #888888;*/
    /*width: 1px;*/
    /*display: block;*/
    /*height: 50%;*/
    /*position: absolute;*/
    /*top: 25%;*/
    /*left: 50%;*/
    /*}*/

    .indexContent {
        width: 100%;
        height: calc(~"100% - 1.04rem");
        /*z-index:1;*/
    }

    .index .item {
        float: left;
        width: 25%;
        height: 100%;
        margin: 0 auto;
        position: relative;
    }

    .h5Btn {
        background: url("../images/h5_default.png") center center no-repeat;
    }

    .articleBtn {
        background: url("../images/article_defaultBtn.png") center center no-repeat;
    }

    .vedioBtn {
        background: url("../images/vedio_defaultBtn.png") center center no-repeat;
    }

    .mineBtn {
        background: url("../images/mine_default.png") center center no-repeat;
    }

    .h5Btn, .articleBtn, .vedioBtn, .mineBtn {
        background-size: contain;
        position: absolute;
        height: 65%;
        width: 36%;
        top: 17%;
        left: 33%;
    }

    .h5Btn.active {
        background-image: url("../images/h5.png");
    }

    .articleBtn.active {
        background-image: url("../images/article_activeBtn.png");
    }

    .vedioBtn.active {
        background-image: url("../images/vedio_activeBtn.png");
    }

    .mineBtn.active {
        background-image: url("../images/mine.png");
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s
    }

    .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */
    {
        opacity: 0
    }

    .slide-right-leave-active {
        transition: all .1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }

    .slide-right-enter, .slide-right-leave-to
        /* .slide-fade-leave-active for below version 2.1.8 */
    {
        transform: translateX(100%);
        opacity: 0;
    }

    .slide-left-leave-active {
        transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }

    .slide-left-enter, .slide-left-leave-to
        /* .slide-fade-leave-active for below version 2.1.8 */
    {
        transform: translateX(-100%);
        opacity: 0;
    }
</style>