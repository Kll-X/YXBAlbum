<template>
    <div class="userInfoSetting" v-disable-move>

        <ul class="info">
            <li class="infoItem" v-for="(item,index) in userInfo.slice(0,3)" :key="index" @click.stop="item.handler()">
                <div class="left"> {{item.name}} </div>
                <div class="right">
                    <span v-if="item.name!='头像'&& item.name!='手机'"> {{item.data}} </span>
                    <span v-else-if="item.name==='手机'"> {{item.data.substr(0, 3) + '****' + item.data.substr(7)}} </span>
                    <img class="avatarImg" v-else :src="item.data">
                    &nbsp;<img class="goto" src="../../../images/goto.png">
                </div>
            </li>
        </ul>
        <!--<div class="exitLogin" @click.stop="exitLogin()">退出登录</div>-->
        <div class="exit" @click.stop="exit()">返回</div>
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    import {getToken} from "@src/lib/platformAPI";
    import * as ajax from "@src/lib/ajax";


    export default {
        data: function () {
            return {}
        },
        props: ['userInfo'],
        computed: {
        },
        methods: {
            ...mapMutations([
                'CURRENT_PANEL'
            ]),
            exitLogin(){
                this.CURRENT_PANEL([]);
                ajax.loginOut({
                }).then(function (data) {

                })
            },exit(){
                this.CURRENT_PANEL([]);
            }
        },
        created(){
            document.title = '编辑资料';
        },
        mounted() {

        }
    }
</script>

<style scoped lang="less">
    .userInfoSetting {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        bottom: 0;
        z-index: 140;
        overflow: hidden;
        background: #fff;
        .title {
            font-size: 0.38rem;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 1rem;
            border-bottom: 1px solid #ddd;
            font-weight: 600;
        }
        .info {
            font-size: 0.34rem;
            padding: 0 0.5rem;
            .infoItem {
                height: 1.68rem;
                display: flex;
                align-items: center;
                justify-content: space-between;
                border-bottom: 1px solid #ddd;
                .left {
                }
                .right {
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                    .avatarImg {
                        width: 0.85rem;
                        height: 0.85rem;
                        border-radius: 50%;
                    }
                    .goto {
                        width: 0.2rem;
                    }
                }

            }
        }
        .exit,.exitLogin {
            position:absolute;
            bottom:0;
            left:50%;
            transform: translateX(-50%);
            display: flex;
            align-items: center;
            justify-content: space-around;
            margin: 0.5rem auto;
            width: 80%;
            height: 0.8rem;
            font-size: 0.36rem;
            border-radius: 5px;
            background: #0088cc;
            color: white;

        }
    }
</style>