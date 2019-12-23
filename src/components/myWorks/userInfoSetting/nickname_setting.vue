<template>
  <div class="nickname_setting" v-disable-move>
    <div class="nickname">
      <input class="nicknameInput" type="text" v-model="nickname" maxlength="15">
      <div class="empty_default_Wrapper" @click.stop="clearNickname()">
        <img src="../../../../src/images/clear.png" alt>
      </div>
    </div>
    <div class="nicknameBtns">
      <div class="nicknameCancel" @click.stop="nicknameCancel()">取消</div>
      <div class="nicknameConfirm" @click.stop="nicknameConfirm()">确定</div>
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
      nickname: ""
    };
  },
  computed: {
    ...mapState(["currentPanel", "userInfo"])
  },
  methods: {
    ...mapMutations(["CURRENT_PANEL", "USER_INFO"]),
    nicknameConfirm() {
      let self = this;
      ajax
        .updatePhotoNickname(
          Object.assign(
            {},
            {
              nickname: this.nickname
            }
          )
        )
        .then(function(data) {
          data = utils.processReturnObj(data);
          if (0 === data.resultCode) {
            let tempInfoObj = Object.assign({}, self.userInfo, {
              nickname: self.nickname
            });
            self.USER_INFO(tempInfoObj);
          } else if (-10002 === data.resultCode) {
            messageBus.$emit("tipCoverShow", {
              status: 2,
              desc: ["请先登录"],
              icon: "times",
              interval: 2000,
              style: {
                tipDescPadding: "0 0.32rem 0.4rem"
              }
            });
          }
          messageBus.$emit("show_userInfoSetting");
        });
    },
    nicknameCancel() {
      messageBus.$emit("show_userInfoSetting");
    },
    clearNickname() {
      this.nickname = "";
    }
  },
  created() {
    document.title = "修改昵称";
    this.nickname = this.userInfo.nickname;
  },
  mounted() {}
};
</script>

<style scoped lang="less">
.nickname_setting {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 140;
  overflow: hidden;
  background: #eee;
  .nickname {
    position: relative;
    .nicknameInput {
      outline: none;
      border: 0;
      width: 100%;
      margin-top: 0.1rem;
      height: 0.9rem;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      font-size: 0.28rem;
    }
    .empty_default_Wrapper {
      position: absolute;
      right: 0.25rem;
      top: 50%;
      transform: translateY(-50%);
      img {
        width: 0.3rem;
        height: 0.3rem;
      }
    }
  }
  .nicknameBtns {
    padding: 0 0.4rem;
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin: 0.5rem auto;
    .nicknameCancel,
    .nicknameConfirm {
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
  }
}
</style>