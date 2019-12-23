<template>
    <div class="phone-update-com">
        <div class="phone-item">
            <span class="item-text">手机号</span>
            <input class="item-input" type="number" v-model="phone" @input="inputHandler" placeholder="请输入11位数的手机号码" />
        </div>
        <div class="phone-item">
            <span class="item-text">验证码</span>
            <input class="item-input" maxlength="4" v-model="imgCode" placeholder="请输入图片验证码"/>
            <div class="img-code" type="number" @click="getImgCodeBtn">
                <img :src="verifyCodeStr">
            </div>
        </div>
        <div class="phone-item">
            <span class="item-text">验证码</span>
            <input class="item-input" v-model="code" placeholder="请输入验证码"/>
            <div class="get-code-btn" type="number" @click="getCodeBtn">获取验证码</div>
        </div>
        <div class="confirm-btn" @click="confirmBtn">
            确认绑定
        </div>
    </div>
</template>

<script>
    import {checkPhone,checkYiDong} from "@src/lib/utils";
    import messageBus from '@components/messageBus.js'
    import {getVerifyCode,sendSmsCode,bindingPhoneGzh} from '@lib/ajax.js'
    import {getToken,getOpenId,setToken} from '@lib/platformAPI'
    import {mapState,mapMutations} from 'vuex'

    export default {
        name: "phone-update",
        data:function(){
            return {
                phone:'',
                code:'',
                verifyId:'',
                verifyCodeStr:'',
                imgCode:'',
                success:false
            }
        },
        mounted:function () {
            let self = this;
            getVerifyCode({}).then(function(res){
                if(res.resultCode === 0){
                    self.verifyId = res.data.verifyId;
                    self.verifyCodeStr = res.data.verifyCodeStr;
                }
            })
        },
        methods:{
            getCodeBtn(){
                let self = this;
                if(!checkPhone(this.phone)){
                    messageBus.$emit("tipCoverShow", {
                        status: 2,
                        desc: ['请输入正确的手机号'],
                        interval: 1500,
                    });
                }else if (!checkYiDong(this.phone)) {
                    messageBus.$emit("tipCoverShow", {
                        status: 2,
                        desc: ['非中国移动用户', '暂不支持注册'],
                        interval: 1500,
                    });
                } else{
                    sendSmsCode({
                        "phone":self.phone,
                        "verifyCode": self.imgCode,
                        "verifyId": self.verifyId
                    }).then(function(res){
                        if(res.resultCode === 0){
                            messageBus.$emit("tipCoverShow", {
                                status: 2,
                                desc: ['验证码发送成功，请留意短信'],
                                interval: 1500
                            });
                        }else{
                            messageBus.$emit("tipCoverShow", {
                                status: 2,
                                desc: [res.msg],
                                interval: 1500
                            });
                        }
                    })
                }
            },
            getImgCodeBtn(){
                let self = this;
                getVerifyCode({}).then(function(res) {
                    if(res.resultCode === 0){
                        self.verifyId = res.data.verifyId;
                        self.verifyCodeStr = res.data.verifyCodeStr;
                    }
                })
            },
            confirmBtn(){
                let self =this;
                if(!checkPhone(this.phone)){
                    messageBus.$emit("tipCoverShow", {
                        status: 2,
                        desc: ['请输入正确的手机号'],
                        interval: 1500
                    });
                }else{
                    bindingPhoneGzh({
                        "access_token":this.userInfo.access_token,
                        "openid":getOpenId(),
                        "phone": this.phone,
                        "smscode": this.code
                    }).then(function(res){
                        if(res.resultCode === 0){
                            setToken(res.data.token);
                            messageBus.$emit("tipCoverShow", {
                                status: 2,
                                desc: ['绑定成功'],
                                interval: 1500
                            });
                            self.success = true;
                            self.$router.push({path: 'works'});
                        }
                    })
                }
            },
            inputHandler(e){
                if(e.target.value.length > 11){
                    this.phone = e.target.value.slice(0,11);
                }
            }
        },
        computed:{
            ...mapState([
                'userInfo'
            ])
        },
        beforeRouteLeave(to,from,next){
            if(this.success){
                next();
            }else{
                next(false);
            }
        }
    }
</script>

<style scoped>
.phone-update-com{
    width: 100%;
    height: 100%;
    background-color: white;
}
.phone-item{
    display: flex;
    height: 1rem;
    border-bottom: 1px solid #eee;
}
.item-text{
    margin-left: .24rem;
    margin-right: .7rem;
    color: #444;
    font-size: .3rem;
    display: flex;
    align-items: center;
}
.get-code-btn{
    color: #fff;
    font-size: 0.24rem;
    border-radius: 5px;
    background-color: #0080cc;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 .24rem;
    margin: .1rem .24rem .1rem 0;
    width: 1.8rem;
}
.img-code{
    margin: .1rem .24rem .1rem 0;
    width: 1.8rem;

}
.confirm-btn{
    border-radius: 5px;
    background-color:#0080cc;
    color:#fff;
    font-size:.37rem;
    height: .8rem;
    width: 6.24rem;
    margin: .7rem auto 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
}
.item-input{
    flex-grow: 1;
    border: none;
}
.img-code img{
    width: 100%;
    height: 100%;
}
</style>