import * as ajax from '../ajax';
import * as utils from "../utils";
import {getOpenId, setToken} from "@src/lib/platformAPI";
import messageBus from "../../components/messageBus";

function init(url, vm) {
    if (_DEV_) {
        if(getOpenId()){
            ajax.login({
                "openid": getOpenId()
            }).then(function (res) {
                if (res.resultCode === 0) {
                    let access_token = res.data.access_token;
                    if (res.data.headPortrait) {
                        // res.data.headPortrait = res.data.headimgurl;
                        res.data.account = res.data.account || res.data.phone;
                    }else{
                        res.data.headPortrait = res.data.headimgurl = require('@src/images/defaultHeadPortrait.png');
                    }
                    messageBus.$emit('updateUserinfo', res.data);
                    messageBus.$emit('initList');
                    if (!res.data.token) {
                        if (vm.$router.currentRoute.name !== 'phoneUpdate') {
                            messageBus.$emit('tipCoverShow', {
                                status: 1,
                                desc: ['您还没绑定手机，请先绑定手机号'],
                                icon: 'check',
                                style:{
                                    tipDescPadding:'0 0.32rem 0.4rem'
                                },
                                btns: [
                                    {
                                        text: '确定',
                                        btnCallBack: function () {
                                            messageBus.$emit('tipCoverShow', {status: 0})
                                            vm.$router.push({
                                                name: 'phoneUpdate',
                                                params: {access_token: res.data.access_token}
                                            });
                                        }
                                    }
                                ]
                            })
                        }
                    } else {
                        setToken(res.data.token);
                        // messageBus.$emit('updateToken',res.data.token);
                    }
                }
            })
        }else{
            console.log("无openid")
        }

    }
}

function chooseImgs(imagesInformation, messageName, number) {
    messageBus.$emit('inputChooseImg',{
        messageName: messageName,
        imagesInformation: imagesInformation,
        number:number
    })
}
function changeImages(eleDefId,mark) {
    messageBus.$emit('inputChooseImg',{
        messageName: 'changeImages',
        eleDefId:eleDefId,
        mark:mark,
        number:1
    })
}

function refreshToken(){
    return new Promise((resolve, reject)=>{
        ajax.login({
            "openid":getOpenId()
        }).then((res)=>{
            if(res.resultCode === 0 && res.data.token){
                setToken(res.data.token);
                resolve()
            }else{
                reject();
            }
        })
    })
}
export {init,chooseImgs,changeImages, refreshToken}