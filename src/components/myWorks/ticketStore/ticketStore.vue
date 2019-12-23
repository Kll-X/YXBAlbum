<template>
    <div class="tickets">
        <div class="useBarIndex">
            <div class="unuse" :class="{tagActive:routeType=='unuse'}"
                 @click="routeChange('/ticketStore/unuse','ticketStore')">未使用({{unuseNumber}})
            </div>
            <div class="used" :class="{tagActive:routeType=='used'}"
                 @click="routeChange('/ticketStore/used','ticketStore')">已使用({{usedNumber}})
            </div>
        </div>
        <div class="ticketsList" ref="ticketsList">
            <transition-group name="list-complete" tag="div" style="position: relative">
                <div v-for="item,index in items[activeIndex].list"
                     :class="{noMarginTop:index === 0,noMarginBottom:index === items[activeIndex].list.length-1}" class="
        ticketWrapper list-complete-item" v-bind:key="JSON.stringify(item)">
                    <ticket :idx="activeIndex" :item="item"></ticket>
                </div>
            </transition-group>
        </div>
    </div>
</template>
<script>
    import ticket from "./ticket.vue";
    import {
        queryUnusedList,
        queryUsedList
    } from '../../../lib/ajax.js';
    import * as utils from '../../../lib/utils.js'
    import {mapState, mapMutations} from 'vuex'


    export default {
        props: [],
        data: function () {
            return {
                unuseNumber: '',
                usedNumber: '',
                items: [
                    {list: []},
                    {list: []},
                ],
                type: function () {
                    if (this.$route.params.type === "myArticle") {
                        return "article";
                    } else {
                        return "animation";
                    }
                },
                loadstatus: 'loadMore',
                busy: false,
                noMoreLock: false
            }
        },
        components: {
            ticket
        },
        computed: {
            ...mapState([
                'userInfo'
            ]),
            activeIndex() {
                return this.$route.params.type === 'used' ? 1 : 0;
            },
            routeType() {
                this.CURRENT_TYPE(this.$route.params.type);
                return this.$route.params.type;
            },
            currentPageNo() {
                return parseInt(this.items[this.activeIndex].list.length / 12) + 1;
            },
            leftItems() {
                return this.items[this.activeIndex].list.length % 12;
            },
            hasScrollBar() {
                return this.items[this.activeIndex].list.length >= 3;
            }
        },
        created() {
            //查询未使用的兑换券列表信息
            queryUnusedList({}).then((res) => {
                res = utils.processReturnObj(res);
                if(res.resultCode === 0){
                    this.unuseNumber = res.data.length;
                    this.items[0].list = res.data
                }
            }).catch((err) => {

            });

            //查询已使用兑换券列表信息
            queryUsedList({}).then((res) => {
                res = utils.processReturnObj(res);
                if(res.resultCode === 0){
                    this.usedNumber = res.data.length;
                    // res.data[1]=res.data[0];
                    // res.data[2]=res.data[0];
                    // res.data[3]=res.data[0];
                    // res.data[4]=res.data[0];
                    // res.data[5]=res.data[0];
                    // res.data[6]=res.data[0];
                    // res.data[7]=res.data[0];
                    // res.data[8]=res.data[0];
                    // res.data[9]=res.data[0];
                    // res.data[10]=res.data[0];
                    // res.data[11]=res.data[0];
                    // res.data[12]=res.data[0];
                    // res.data[13]=res.data[0];
                    // res.data[14]=res.data[0];
                    // res.data[15]=res.data[0];
                    // res.data[16]=res.data[0];
                    this.items[1].list = res.data;
                }
            }).catch((err) => {

            });
        },
        mounted: function () {
        },
        methods: {
            ...mapMutations([
                'CURRENT_TYPE'
            ]),
            routeChange(path, name) {
                let self = this;
                if (path) {
                    self.$router.replace({path: path});
                } else if (name) {
                    self.$router.replace({name: name});
                }
                $('.ticketsList').scrollTop(0)
            },

            ...mapMutations([
                'SETTING_INFO',
                'CURRENT_PANEL'
            ])
        },
        beforeDestroy: function () {}
    }
</script>
<style scoped lang="less">
    .tickets {
        background: #e8e8e8;
        width: 100%;
        height: 100%;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        .useBarIndex {
            margin-bottom: 0.2rem;
            height: 0.88rem;
            display: flex;
            justify-content: space-around;
            align-items: center;
            background: #fff;
            color: #333;
            .unuse {
                font-size: 0.32rem;
                width: 2rem;
                height: 0.88rem;
                line-height: 0.88rem;
                text-align: center;
            }
            .used {
                font-size: 0.32rem;
                width: 2rem;
                height: 0.88rem;
                line-height: 0.88rem;
                text-align: center;
            }
            .tagActive {
                color: #0080cc;
                position: relative;
            }
            .tagActive::after {
                content: '';
                display: block;
                overflow: hidden;
                background: #0080cc;
                position: absolute;
                left: 0;
                right: 0;
                bottom: 0;
                height: 0.05rem;
                width: 100%;
            }
        }
        .ticketsList {
            flex: 1;
            width: 100%;
            overflow: auto;
            -webkit-overflow-scrolling: touch;
            position: relative;
            padding: 0 0.24rem;
            .ticketWrapper {
                margin-bottom: 0.2rem;
            }
            .aniviewItem {
                width: 7.0rem;
                float: left;
            }

            .list-complete-item {
                transition: all 0.6s;
                /*display: inline-block;*/
                /*margin-right: 10px;*/
            }
            .noMarginTop {
                margin-top: 0;
            }
            .noMarginBottom {
                margin-bottom: 0;
            }
            .list-complete-enter, .list-complete-leave-to
                /* .list-complete-leave-active for below version 2.1.8 */ {
                opacity: 0;
            }

            .list-complete-leave-active {
                position: fixed;
                z-index: 1;
                /*transform: translateX(100px);*/
                height: 0px;
            }
        }
    }
</style>