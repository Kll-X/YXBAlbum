<template>
  <div class="tempContainer">
    <!--<div id="article"></div>-->
    <article-parser-com
      v-if="articleFlag"
      :is-tpl="true"
      :add-count="true"
      :articleData="this.articleInfo"
      :user-data="this.userData"
    ></article-parser-com>
    <!-- <div class="useTxt" @click="editTemplate">
      <div class="useImg">
        <img src="../../../images/use.png" alt>
      </div>
      <div class="txt">立即使用</div>
    </div> -->

    <div class="useTxt">
            <div v-if="usable===1" class="use" v-on:click="useTemplate()">立即使用</div>
            <!-- <div v-if="usable===0" class="exchange" v-on:click="exchange()">兑换</div>
            <div v-if="usable===0" class="buy" v-on:click="buy()">¥ {{costMoney}} 购买</div> -->
            <div v-if="usable===0" class="onlyBuy" v-on:click="buy()">
                <span class="pay">¥ {{costMoney}}购买 </span>
            </div>
            <!-- <div v-if="usable===0" class="limitTimeFree" v-on:click="useTemplate()">
                <span class="pay">¥ {{costMoney}}购买 </span>
                &nbsp;限时免费
            </div> -->
        </div>
  </div>
</template>

<script>
import * as ajax from "@lib/ajax.js";
import * as utils from "@lib/utils.js";
import articleParserCom from "../articleEdit/articleParser.vue";
import messageBus from "../../messageBus.js";
import "../../../css/articleTemp.css";
import { mapState, mapMutations } from "vuex";
import { getOpenId,getEnvInf } from "@src/lib/platformAPI";

export default {
  components: {
    articleParserCom
  },
  data: function() {
    return {
      articleData: "",
      imagesInformation: { localIds: [], serverIds: [], sceneId: "" },
      userData: {},
      articleFlag: false,
      articleInfo: "",
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
    };
  },
  methods: {
    ...mapMutations(["ARTICLE_INFO"]),
    fetchData(id) {
      let self = this;
      ajax
        .templateAjax(id)
        .then(function(data) {
          document.title = data.obj.name;
          let mark = {};
          messageBus.$emit("globalLoadCover", {
            status: true,
            mark: mark
          });
          self.dataEleQueue(data);
          self.articleData = data;
          self.ARTICLE_INFO(data);
          //模板
          ajax
            .queryPhotoInfo({
              id: id
            })
            .then(function(info) {
              if (info.resultCode === 0) {
                self.userData.count = info.data.count;
                self.userData.createTime = info.data.createTime;
                self.userData.name = info.data.name;
                self.userData.userName = "美秀";
                // let ele = document.getElementById("article");
                // articleParser(ele,data,self.userData);
                self.articleInfo = data;
                self.articleFlag = true;
                messageBus.$emit("globalLoadCover", {
                  status: false,
                  mark: mark
                });
              } else {
                messageBus.$emit("tipCoverShow", {
                  status: 2,
                  desc: ["后台服务器繁忙", "请刷新重试"],
                  icon: "times",
                  style: {
                    tipDescPadding: "0 0.32rem 0.4rem"
                  }
                });
              }
            })
            .catch(function() {
              messageBus.$emit("tipCoverShow", {
                status: 2,
                desc: ["后台服务器繁忙", "请刷新重试"],
                icon: "times",
                style: {
                  tipDescPadding: "0 0.32rem 0.4rem"
                }
              });
            });
        })
        .catch(function(error) {
          messageBus.$emit("tipCoverShow", {
            status: 2,
            desc: ["后台服务器繁忙", "请刷新重试"],
            icon: "times",
            style: {
              tipDescPadding: "0 0.32rem 0.4rem"
            }
          });
        });
    },
    // editTemplate() {
    //   // this.$router.push({name: 'middlePage',params:{id: this.$route.params.id,nextRouterName:"articleEdit"}});
    //   let self = this,
    //     openId = getOpenId(),
    //     copySceneMark = {},
    //     id = "";
    //   ajax
    //     .copyScence(openId, self.imagesInformation.sceneId)
    //     .then(function(res) {
    //       messageBus.$emit("globalLoadCover", {
    //         mark: copySceneMark,
    //         status: false
    //       });

    //       let data = utils.processReturnObj(res);
    //       let dataPro = utils.processReturnObj(data.data);
    //       id = dataPro.obj.id;
    //       self.$router.push({ path: "/articleEdit/" + id });
    //     })
    //     .catch(function(error) {
          
    //     });
    // },
    useTemplate() {
      // this.$router.push({name: 'middlePage',params:{id: this.$route.params.id,nextRouterName:"articleEdit"}});
      let self = this,
        openId = getOpenId(),
        copySceneMark = {},
        id = "";
      ajax
        .copyScence(openId, self.imagesInformation.sceneId)
        .then(function(res) {
          messageBus.$emit("globalLoadCover", {
            mark: copySceneMark,
            status: false
          });

          let data = utils.processReturnObj(res);
          let dataPro = utils.processReturnObj(data.data);
          id = dataPro.obj.id;
          self.$router.push({ path: "/articleEdit/" + id });
        })
        .catch(function(error) {
          
        });
    },
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
                      // console.log(JSON.stringify(payObj));
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
    dataEleQueue(orgData) {
      //对模板元素进行高度排序
      for (let list of orgData.list) {
        console.log(orgData);
        list.elements.sort(compare());
      }

      function compare() {
        return function(obj1, obj2) {
          if (obj1.css.top > obj2.css.top) {
            return 1;
          } else if (obj1.css.top < obj2.css.top) {
            return -1;
          } else {
            return 0;
          }
        };
      }
    }
  },
  created: function() {
    this.imagesInformation.sceneId = this.$route.params.id;
    this.fetchData(this.$route.params.id);

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
  },
  mounted: function() {
    let self = this;
    messageBus.$on("routeToEdit", function(info) {
      self.$router.push({
        path: "/articleEdit/" + info.id,
        query: { imagesInformation: info.imagesInformation }
      });
    });
  },
  beforeDestroy: function() {
    messageBus.$off(["routeToEdit"]);
  }
};
</script>

<style lang="less">
.tempContainer {
  background-color: white;
}
/* .useTxt {
  position: fixed;
  bottom: 0;
  left: 30%;
  width: 40%;
  height: 40px;
  z-index: 100;
  background-image: url("../../../images/btnBg.png");
  background-size: 100% 100%;
}

.useTxt .useImg {
  width: 40%;
  height: 100%;
  float: left;
}

.useTxt img {
  margin: 4px auto;
  height: 70%;
  display: table;
}

.useTxt .txt {
  line-height: 40px;
  color: white;
  font-size: 16px;
  font-family: Microsoft YaHei;
  float: left;
  width: 60%;
} */

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

#article .wrapper {
  font-size: medium;
  padding: 1rem;
  background-color: white;
  min-height: 100vh;
  padding-bottom: 40px;
}
#article .wrapper .title {
  font-size: 21px;
  color: black;
  margin-bottom: 10px;
}
#article .wrapper .infoContent {
  overflow: hidden;
  margin-bottom: 10px;
  height: 1.5rem;
}
#article .wrapper .time,
#article .wrapper .count,
#article .wrapper .userName {
  float: left;
  margin-right: 10px;
}
#article .wrapper .count img {
  margin-right: 3px;
}
#article .wrapper .userName {
  color: #0080cc;
}
#article .wrapper .itemWrapper {
  margin: 1rem 0;
  color: #333;
  word-wrap: break-word;
}
#article .wrapper .imgItem {
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: 50% 50%;
}
</style>
