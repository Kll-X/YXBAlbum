<template>
    <div class="reportPage">
        <div class="reportType">
            <div class="title">举报类型:</div>
            <!--举报类型:  1.色情  2.政治敏感  3.诈骗  4.侵权(抄袭)  5.谣言  6.其他-->
            <div class="chooseType">
                <label v-for="(item,index) in reportTypeList" v-if="index < 3" style="color:black">
                    <input type="radio" name="reportType" value="item.value" checked="item.value === currentReportType" @click.stop="chooseReportType(item.value)"/><i></i>{{item.text}}
                </label>
            </div>
            <div class="chooseType">

                <label v-for="(item,index) in reportTypeList" v-if="index > 2" style="color:black">
                    <input type="radio" name="reportType" value="item.value" checked="item.value === currentReportType" @click.stop="chooseReportType(item.value)"/><i></i>{{item.text}}
                </label>
            </div>
        </div>
        <div class="reportSubmit">
            <div class="title">举报内容(选填):</div>
            <textarea name="reportDesc" class="reportDesc" placeholder="请输入举报内容" maxlength="150"
                      ref="reportDesc"></textarea>
            <div class="reportBtns">
                <span class="cancel" @click.stop="cancel()">取消</span>
                <span class="submit" @click.stop="confirm()">提交</span>
            </div>
            <p class="communicate">可直接致电00000进行反馈</p>
        </div>
    </div>
</template>
<script>
    import * as ajax from "../../lib/ajax.js"
    import messageBus from './../messageBus.js';
    import * as utils from '../../lib/utils.js';

    export default{
        data: function () {
            return {
                reportTypeList: [
                    {
                        value: 1,
                        text: '色情'
                    }, {
                        value: 3,
                        text: '诈骗'
                    }, {
                        value: 5,
                        text: '谣言'
                    }, {
                        value: 2,
                        text: '政治敏感'
                    }, {
                        value: 4,
                        text: '侵权(抄袭)'
                    }, {
                        value: 6,
                        text: '其他'
                    },
                ],
                currentReportType: 6
            }
        },
        methods: {
            cancel: function () {
                this.$router.go(-1);
            },
            confirm: function () {
                let self = this;
                ajax.reportScene({
                    "photoId": this.$route.params.id,
                    "reportType": this.currentReportType,
                    "reportContent": this.$refs.reportDesc.value + ''
                }).then(function (data) {
                    data = utils.processReturnObj(data);
                    if (data.msg === 'success') {
                        messageBus.$emit('tipCoverShow', {
                            status: 2,
                            desc: ['举报提交成功'],
                            icon: 'check',
                            noMinHeight:true,
                            callBack: function () {
                                self.$router.go(-1);
                            }
                        })
                    } else {
                        throw 1
                    }
                }).catch(function (error) {
                    messageBus.$emit('tipCoverShow', {
                        status: 2,
                        desc: ['举报提交失败','请重新提交'],
                        icon: 'times',
                        style:{
                            tipDescPadding:'0 0.32rem 0.4rem'
                        }
                    })
                });
            },
            chooseReportType: function (type) {
                this.currentReportType = type
            }
        }
    }

</script>
<style scoped lang="less">
    * {
        margin: 0;
        padding: 0;
        border: 0;
        outline: none;
        font-family: "Microsoft YaHei";
        .reportPage {
            width: 100vw;
            height: 100vh;
            background: #e8e8e8;
            padding-top: 2vh;
            font-size: 3.7vw;
            position: relative;
            .reportType {
                height: 22vh;
                margin-bottom: 2vh;
                background: #fff;
                display: flex;
                flex-direction: column;
                justify-content: center;
                padding: 0 3.3vw;
                .title {
                    flex: 1;
                    color: #0080cc;
                    display: flex;
                    align-items: center;
                }
                .chooseType {
                    flex: 1;
                    width: 100%;
                    display: flex;
                    align-items: center;
                    label {
                        flex: 1;
                        position: relative;
                        padding-left: 9.4vw;
                        box-sizing: border-box;
                        color:#333333;
                        input {
                            position: relative;
                            opacity: 0;
                            top: -2px
                        }
                        i {
                            display: block;
                            position: absolute;
                            top: 1px;
                            left: 7.4vw;
                            width: 3.7vw;
                            height: 3.7vw;
                            outline: 0;
                            border: 1px solid #CCC;
                            background: #ffffff;
                            border-radius: 50%;
                            transition: border-color .3s;
                            -webkit-transition: border-color .3s;

                        }
                        input + i:after {
                            position: absolute;
                            content: '';
                            left: 50%;
                            top: 50%;
                            width: 1.8vw;
                            height: 1.8vw;
                            transform: translate(-50%, -50%);
                            border-radius: 50%;
                            background-color: #0080cc;
                            opacity: 0;
                            transition: opacity .1s;
                            -webkit-transition: opacity .1s;
                        }

                        input:checked + i:after {
                            opacity: 1;
                        }
                    }
                }
            }
            .reportSubmit {
                background: #fff;
                height: 74vh;
                padding: 0 3.3vw;
                .title {
                    flex: 1;
                    color: #0080cc;
                    height: 7.33vh;
                    line-height: 7.33vh;
                }
                .reportDesc {
                    border-radius: 5px;
                    border: 1px solid #ccc;
                    width: 100%;
                    height: 32.2vh;
                    box-sizing: border-box;
                    padding: 4vw;
                    font-size: 3.7vw;
                    line-height: 4.9vw;
                }
                .reportBtns {
                    display: flex;
                    justify-content: center;
                    position: absolute;
                    bottom: 12.2vh;
                    left: 50%;
                    transform: translateX(-50%);
                    span {
                        display: inline-block;
                        background: #0080cc;
                        color: white;
                        width: 40vw;
                        height: 34px;
                        line-height: 34px;
                        text-align: center;
                        margin: 4vw;
                        border-radius: 5px;
                        box-shadow: 0px 2px 2px #888;
                        font-size: 4.5vw;
                    }
                }
                .communicate {
                    color: #0080cc;
                    text-align: center;
                    position: absolute;
                    left: 50%;
                    transform: translateX(-50%);
                    bottom: 5.9vh;
                    font-size: 3.7vw;
                }
            }
        }
    }

</style>