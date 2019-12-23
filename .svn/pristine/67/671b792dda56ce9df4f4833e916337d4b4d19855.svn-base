<template>
  <div class="account_setting" v-disable-move>
    <ul class="account">
      <li>
        <div class="type">手机号</div>
        <input v-model="account" placeholder="请输入11位数的手机号码" maxlength="11">
      </li>
      <li>
        <div class="type">验证码</div>
        <input class="img_code_num" v-model="img_code_num" placeholder="请输入图片验证码">
        <img
          class="img_code"
          v-if="targetImgObj"
          :src="targetImgObj.data.verifyCodeStr"
          alt
          @click.stop="getTargetImgObj()"
        >
      </li>
      <li>
        <div class="type">验证码</div>
        <input class="sms_code_num" v-model="sms_code_num" placeholder="请输入验证码">
        <div class="getSms" :class="{'disabled': img_code_num === '' || smsflag != 1}" @click.stop="getSms()">{{getsms_status}}</div>
      </li>
    </ul>
    <div class="accountBtns">
      <div class="accountCancel" @click.stop="accountCancel()">取消</div>
      <div class="accountConfirm disabled" v-if="img_code_num === '' || sms_code_num === ''">确定</div>
      <div class="accountConfirm" v-else @click.stop="accountConfirm()">确定</div>
    </div>
  </div>
</template>

<script>
import messageBus from "../../messageBus";
import { chooseImgs, getToken } from "@src/lib/platformAPI";
import * as ajax from "@src/lib/ajax";
import * as utils from "@src/lib/utils";
import { mapState, mapMutations } from "vuex";

export default {
  data: function() {
    return {
      targetImgObj: null,
      img_code_num: "",
      sms_code_num: "",
      smsTimer:null,
      getsms_status:'获取验证码',
      smsflag:1
    };
  },
  computed: {
    ...mapState(["currentPanel", "userInfo"])
  },
  methods: {
    ...mapMutations(["USER_INFO"]),
    getTargetImgObj() {
      let self = this;
      ajax.getVerifyCode({}).then(function(data) {
        data = utils.processReturnObj(data);
        if (0 === data.resultCode) {
          self.targetImgObj = data;
        }
      });
    },
    getSms() {
      let self = this;
      if (!self.smsflag) {
        return;
      }
      if (!utils.checkPhone(this.account)) {
        messageBus.$emit("tipCoverShow", {
          status: 2,
          desc: ["请输入正确的手机号"],
          interval: 2000
        });
      } else if (!utils.checkYiDong(this.account)) {
        messageBus.$emit("tipCoverShow", {
          status: 2,
          desc: ["非中国移动用户", "暂不支持注册"],
          interval: 1500
        });
      } else {
        ajax
          .sendSmsCode(
            Object.assign(
              {},
              {
                phone: self.account,
                verifyCode: self.img_code_num,
                verifyId: self.targetImgObj.data.verifyId
              }
            )
          )
          .then(function(data) {
            data = utils.processReturnObj(data);
            if (0 === data.resultCode) {
              //检测图片验证码正确并成功下发了短信验证码

              //倒计时禁止点击

              self.smsflag = 0;
              self.getsms_status = "60 s";
              let i = 60;
              self.smsTimer = setInterval(() => {
                // console.log(i, i == 0);
                if (i == 0) {
                  self.smsflag = 1;
                  self.getsms_status = "获取验证码";
                  clearInterval(self.smsTimer);
                  return;
                }
                i--;
                self.getsms_status = i + " s";
              }, 1000);
            } else if (-1111 === data.resultCode) {
              messageBus.$emit("tipCoverShow", {
                status: 2,
                desc: ["图片验证码", "不正确或失效"],
                icon: "times",
                interval: 1500,
                style: {
                  tipDescPadding: "0 0.32rem 0.4rem"
                }
              });
            }
          });
      }
    },
    accountConfirm() {
      let self = this;
      ajax
        .updatePhotoAccount({
          phone: self.account,
          smscode: self.sms_code_num
        })
        .then(function(data) {
          data = utils.processReturnObj(data);
          if (0 === data.resultCode) {
            let tempInfoObj = Object.assign({}, self.userInfo, {
              account: self.account
            });
            self.USER_INFO(tempInfoObj);
          } else {
            messageBus.$emit("tipCoverShow", {
              status: 2,
              desc: ["短信验证码", "不正确或失效"],
              icon: "times",
              interval: 2000,
              style: {
                tipDescPadding: "0 0.32rem 0.4rem"
              }
            });
          }
          messageBus.$emit("show_userInfoSetting");
        })
        .catch(function(e) {
          console.log(e);
        });
    },
    accountCancel() {
      messageBus.$emit("show_userInfoSetting");
    }
  },
  created() {
    document.title = "修改绑定手机";
    this.account = this.userInfo.account;
    this.getTargetImgObj();
  }
};
</script>

<style scoped lang="less">
* {
  outline: none;
  border: 0;
  padding: 0;
  margin: 0;
}

.account_setting {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 140;
  overflow: hidden;
  background: #fff;
  padding: 0 0.4rem;
  .account {
    li {
      height: 1.03rem;
      border-bottom: 1px solid #eee;
      display: flex;
      align-items: center;
      .type {
        color: black;
        width: 1.38rem;
        font-size: 0.28rem;
      }
      input {
        font-size: 0.28rem;
        height: 100%;
        width: 3.5rem;
        outline: none;
        border: 0;
        display: flex;
        align-items: center;
        padding: 0;
      }
      .img_code {
        display: block;
        width: 1.92rem;
        height: 0.8rem;
        border-radius: 5px;
      }
      .getSms {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 1.92rem;
        height: 0.8rem;
        background: #0088cc;
        border-radius: 5px;
        color: #fff;
      }
      .disabled {
        background: #cccccc;
      }
    }
  }
  .accountBtns {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin: 0.5rem auto;
    .accountCancel,
    .accountConfirm {
      width: 40%;
      height: 0.8rem;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 0.36rem;
      background: #0088cc;
      color: white;
      border-radius: 5px;
    }
    .disabled {
      background: #cccccc;
    }
  }
}
</style>