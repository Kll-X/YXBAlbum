<template>
    <div v-disable-move v-show="tipInfo.status" class="tipCover">

        <div class="tipContent" :style="{width:contentWidth}">
            <div class="tipTitle" v-if="tipInfo.title" :style="{color:titleColor}">
                {{tipInfo.title}}
            </div>
            <div class="icon" v-if="tipInfo.icon === 'times'">
                <!--<svg style="width:25px;height: 25px;" width="1792" height="1792" viewBox="0 0 1792 1792"-->
                <!--xmlns="http://www.w3.org/2000/svg">-->
                <!--<path d="M1225 1079l-146 146q-10 10-23 10t-23-10l-137-137-137 137q-10 10-23 10t-23-10l-146-146q-10-10-10-23t10-23l137-137-137-137q-10-10-10-23t10-23l146-146q10-10 23-10t23 10l137 137 137-137q10-10 23-10t23 10l146 146q10 10 10 23t-10 23l-137 137 137 137q10 10 10 23t-10 23zm215-183q0-148-73-273t-198-198-273-73-273 73-198 198-73 273 73 273 198 198 273 73 273-73 198-198 73-273zm224 0q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"-->
                <!--fill="#fff"/>-->
                <!--</svg>-->
                <img src="../../images/times.png" alt="" style="width:20px;height: 20px;">
            </div>
            <div class="icon" v-if="tipInfo.icon === 'check'">
                <!--<svg style="width:25px;height: 25px;" width="1792" height="1792" viewBox="0 0 1792 1792"-->
                <!--xmlns="http://www.w3.org/2000/svg">-->
                <!--<path d="M1299 813l-422 422q-19 19-45 19t-45-19l-294-294q-19-19-19-45t19-45l102-102q19-19 45-19t45 19l147 147 275-275q19-19 45-19t45 19l102 102q19 19 19 45t-19 45zm141 83q0-148-73-273t-198-198-273-73-273 73-198 198-73 273 73 273 198 198 273 73 273-73 198-198 73-273zm224 0q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"-->
                <!--fill="#fff"/>-->
                <!--</svg>-->
                <img src="../../images/check.png" alt="" style="width:20px;height: 20px;">
            </div>
            <div class="icon" v-if="tipInfo.icon === 'load'">
                <!--<div class="loading time"></div>-->
                <img src="../../images/loading1.gif" alt="" style="width:20px;height: 20px;">
            </div>
            <div class="tipDesc" v-if="tipInfo.desc" :style="{padding:tipDescPadding}">
                <div :class="{marginBottom:index!==tipInfo.desc.length-1}" :style="{color:descColor}" v-for="(desc,index) in tipInfo.desc" v-html="desc"></div>
            </div>
            <div class="btnWrapper" v-if="tipInfo.btns">
                <div v-for="(btn,index) in tipInfo.btns" v-if="typeof btn.btnCallBack === 'function'" class="btn"
                     @click.stop="btn.btnCallBack()"
                     :class="{btnRightBorder:index+1 !== tipInfo.btns.length,btnColorSpecial:index+1 === tipInfo.btns.length}">
                    {{btn.text}}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {getWxConfig} from "../../lib/ajax";
    import messageBus from "./../messageBus.js";
    import * as utils from "../../lib/utils";

    export default {
        props: ['tipInfo'],
        data() {
            return {}
        },
        methods: {
            hideTipCover (){
                messageBus.$emit('tipCoverShow', {
                    status: 0
                })
            }
        },
        updated: function () {

        },
        beforeDestroy: function () {

        },
        computed: {
            titleColor: function () {
                return this.tipInfo.style && this.tipInfo.style.titleColor ? this.tipInfo.style.titleColor : "#333";
            },
            descColor: function () {
                return this.tipInfo.style && this.tipInfo.style.descColor ? this.tipInfo.style.descColor : "#333";
            },
            contentWidth: function () {
                return this.tipInfo.style && this.tipInfo.style.contentWidth ? this.tipInfo.style.contentWidth : 'auto';
            },
            tipDescPadding(){
                return this.tipInfo.style && this.tipInfo.style.tipDescPadding ? this.tipInfo.style.tipDescPadding :'0.4rem 0.32rem'
            }
        }
    }

</script>
<style scoped lang="less">
    .tipCover {
        background-color: rgba(0, 0, 0, 0);
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        z-index: 1000;
        .tipContent {
            position: absolute;
            /*background-color: rgba(0, 0, 0, 0.6);*/
            background-color: rgb(255, 255, 255);
            border-radius: 0.13rem;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            box-sizing: border-box;
            white-space: normal;
            word-break: break-all;
            word-wrap: break-word;
            color: white;
            overflow: hidden;
            box-shadow: 0px 0px 3px #555;
            .tipTitle {
                font-size: 0.32rem;
                font-family: "SimHei", "Microsoft YaHei", "FangSong";
                display: flex;
                justify-content: center;
                align-items: flex-end;
                height:0.72rem;
            }
            .icon {
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 8px 0;
            }
            .tipDesc {
                font-family: "SimHei", "Microsoft YaHei", "FangSong";
                text-align: center;
                box-sizing: border-box;
                font-size: 0.3rem;
                line-height: 0.35rem;
                div{
                    font-size: 0.3rem;
                }
                span{
                    font-size: 0.3rem;
                }
                .marginBottom{
                    margin-bottom:0.2rem
                }
            }
            .btnWrapper {
                float: left;
                width: 100%;
                height: 0.76rem;
                display: flex;
                text-align: center;
                justify-content: center;
                align-items: center;
                border-top: 1px solid #d9d9d9;
                .btn {
                    flex: 1;
                    text-align: center;
                    background: white;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    color: #0080cc;
                    margin: 0;
                    padding: 0;
                    border: 0;
                    height: 100%;
                    font-family: "SimHei", "Microsoft YaHei", "FangSong";
                    font-size: 0.28rem;
                    border-radius: 0;
                }
                .btnRightBorder {
                    margin-right: 1px;
                    box-shadow: 1px 0 0 #d9d9d9;
                    color: #333;
                }
                .btnColorSpecial {
                    color: #0080cc;
                }
            }
        }
    }
</style>