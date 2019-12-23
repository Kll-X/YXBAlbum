<template>
    <div>
        <scene-view :myWorkStatus="2" :limit="limit"></scene-view>

        <div class="useTxt">
            <!--<div class="useImg"><img src="../../../images/use.png" alt=""></div>-->
            <div v-if="usable===1" class="use" v-on:click="useTemplate()">立即使用</div>
            <!-- <div v-if="usable===0" class="exchange" v-on:click="exchange()">兑换</div>
            <div v-if="usable===0" class="buy" v-on:click="buy()">¥ {{costMoney}} 购买</div> -->
            <div v-if="usable===0" class="onlyBuy" v-on:click="buy()">
                <span class="pay">¥ {{costMoney}}购买 </span>
                <!-- &nbsp;限时免费 -->
            </div>
            <!-- <div v-if="usable===0" class="limitTimeFree" v-on:click="useTemplate()">
                <span class="pay">¥ {{costMoney}}购买 </span>
                &nbsp;限时免费
            </div> -->
        </div>
    </div>
</template>
<script>
    import * as ajax from '@lib/ajax'
    import * as utils from '@lib/utils'
    import messageBus from '@components/messageBus'
    import sceneView from '@components/commonComponent/sceneView.vue'
    import {getOpenId,getEnvInf} from "@lib/platformAPI"


    export default {
        data: function () {
            return {
                limit: {
                    agree: 0,
                    sum: 100,
                    used: 0,
                },
                usable: 'init',
                costTicket: 0,
                costMoney: 0,
                voucherCount:'',
                templateCount:''
            }
        },
        components: {
            sceneView
        },
        methods: {
            exchange() {
                let self = this;
                messageBus.$emit("tipCoverShow", {
                    status: 1,
                    desc: [
                        `使用<span style="color:red">${this.costTicket}</span>张模板券兑换该模板`
                    ],
                    btns: [{
                        text: '取消',
                        btnCallBack: function () {
                            messageBus.$emit("tipCoverShow", {
                                status: 0
                            });
                        }
                    }, {
                        text: '兑换',
                        btnCallBack: function(){
                            //todo 兑换按钮回调
                            if(self.costTicket > self.voucherCount){
                                messageBus.$emit("tipCoverShow", {
                                    status: 1,
                                    desc: [
                                        `很抱歉,兑换券不足`
                                    ],
                                    btns: [{
                                        text: '我知道了',
                                        btnCallBack: function () {
                                            messageBus.$emit("tipCoverShow", {
                                                status: 0
                                            });
                                        }
                                    }]
                                });
                            }else{
                                ajax.pay({
                                    "activityId":self.$route.params.id,
                                    "source":0
                                }).then((res)=>{
                                    res = utils.processReturnObj(res);
                                    if(res.resultCode === 0){
                                        console.log('兑换成功')
                                    }else{
                                        throw(res)
                                    }
                                }).catch(
                                    (err)=>{
                                        console.log('兑换失败',err);
                                    }
                                );
                            }
                        }
                    }]
                });
            },
            buy() {
                let self = this;
                messageBus.$emit("tipCoverShow", {
                    status: 1,
                    desc: [
                        `支付<span style="color:red">${this.costMoney}</span>元购买模板`
                    ],
                    btns: [{
                        text: '取消',
                        btnCallBack: function () {
                            messageBus.$emit("tipCoverShow", {
                                status: 0
                            });
                        }
                    }, {
                        text: '支付',
                        btnCallBack: function () {
                            //todo 支付按钮回调
                            //微信直付type 1 / 非微信环境type 0
                            function payRequest(){
                                let payObj = {
                                        "activityId":self.$route.params.id,
                                        "source":1,
                                        "type":1
                                    };
                                if(getEnvInf() !== 'weixin'){
                                    payObj.type = 0
                                }
                                // alert(getEnvInf());
                                // alert(getEnvInf() !== 'weixin');
                                // alert(JSON.stringify(payObj));
                                return ajax.pay(payObj)
                            }
                            payRequest().then((res)=>{
                                res = utils.processReturnObj(res);
                                console.log(res.resultCode === 0 ,res.data,res.data.prePayUrl)
                                if(res.resultCode === 0 && res.data && res.data.prePayUrl){
                                    let url = decodeURIComponent(res.data.prePayUrl);
                                    console.log(url,'跳转支付页面成功');
                                    window.location.href = url
                                }else{
                                    throw(res)
                                }
                            }).catch(
                                (err)=>{
                                    console.log('跳转支付页面失败',err)
                                }
                            );
                            messageBus.$emit("tipCoverShow", {
                                status: 0
                            });
                        }
                    }]
                });
            },
            useTemplate() {
//                this.$router.push({name: 'middlePage', params: {id: this.$route.params.id, nextRouterName: "edit"}});
                let openId = getOpenId();
                let self = this;
                let id = "";

                let copySceneMark = {};
                messageBus.$emit('globalLoadCover', {
                    mark: copySceneMark,
                    status: true
                });
                
                ajax.copyScence(openId, self.$route.params.id)
                    .then(function (res) {
                        messageBus.$emit('globalLoadCover', {
                            mark: copySceneMark,
                            status: false
                        });

                        let data = utils.processReturnObj(res);
                        let dataPro = utils.processReturnObj(data.data);
                        id = dataPro.obj.id;

                        self.$router.push({
                            name: "edit",
                            nextRouterName: "edit",
                            params: {id, imagesInformation: self.imagesInformation}
                        })
                    })
                    .catch(function (error) {
//                        messageBus.$emit("tipCoverShow",{
//                            status:true,
//                            content:"Copy Promise error" + JSON.stringify(error)
//                        });
                    });
            }
        },
        created: function () {
            let self = this;


            // 访问统计
            ajax.addTemplateCount({"id": self.$route.params.id}).then(function (info) {
//                console.log(info);
            });

            //查询拥有多少未使用的兑换券
            ajax.queryNumber({}).then((res) => {
                res = utils.processReturnObj(res);
                if(res.resultCode === 0){
                    this.voucherCount = res.data && res.data.voucherCount?res.data.voucherCount:'';
                    this.templateCount = res.data && res.data.templateCount? res.data.templateCount:'';
                }else{
                    throw(res)
                }
            }).catch((err) => {
                console.log(err.msg)
            });

            //    查询模板价格
            ajax.queryPrice({"activityId": self.$route.params.id}).then(function (res) {
                res = utils.processReturnObj(res);
                self.costMoney = res.data.price;
                self.costTicket = res.data.voucherNumber;
            });

            //是否有使用该模板的权利
            ajax.queryChargeActivity({"activityId": self.$route.params.id, "source": 0}).then(function (res) {
                res = utils.processReturnObj(res);
                self.usable = res.data;
            });
        }
    }
</script>
<style lang="less" scoped>
    .useTxt {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 0.8rem;
        z-index: 100;
        display: flex;
        justify-content: center;

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
        .use {
            background-color: #0080cc;
            font-size: 0.24rem;
            color: white;
            font-family: Microsoft YaHei;
            height: 0.8rem;
            line-height: 0.8rem;
            text-align: center;
            width: 100%;
            display: block;
            border: 0;
        }
        .exchange {
            background-color: #fc855b;
            font-size: 0.24rem;
            color: #ffffff;
            font-family: Microsoft YaHei;
            height: 0.8rem;
            line-height: 0.8rem;
            text-align: center;
            flex: 1;
            display: block;
            border: 0;
        }
        .buy {
            background-color: #f46464;
            font-size: 0.24rem;
            color: #ffffff;
            font-family: Microsoft YaHei;
            height: 0.8rem;
            line-height: 0.8rem;
            text-align: center;
            flex: 1;
            display: block;
            border: 0;
        }
        .onlyBuy,.limitTimeFree {
            background-color: #fc855b;
            font-size: 0.24rem;
            color: red;
            font-family: Microsoft YaHei;
            height: 0.8rem;
            line-height: 0.8rem;
            text-align: center;
            width: 100%;
            display: block;
            border: 0;
            .pay{
                // text-decoration:line-through;
                color:#000
            }
        }
    }

    .end-page {
        height: 100vh;
        width: 100vw;
        position: absolute;
        z-index: 140;
        top: 245px;
        bottom: 0;
    }
</style>

