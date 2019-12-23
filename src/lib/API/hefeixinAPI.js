import * as ajax from '../ajax';
import {getOpenId,setToken,parseLocationSearch} from "@src/lib/platformAPI";
import messageBus from "@src/components/messageBus";

function init() {
    let search = parseLocationSearch();
    if(search.token && search.id){
        ajax.fxLogin({
            access_token: search.token,
            openid: search.id
        }).then((res)=>{
            if(res.resultCode === 0 ){
                if (!res.data.headPortrait) {
                    res.data.headPortrait = res.data.headimgurl = require('@src/images/defaultHeadPortrait.png');
                }
                messageBus.$emit('updateUserinfo',res.data);
                setToken(res.data.token);
            }else{
                throw res
            }
        }).catch((err)=>{
            console.log(err)
        })
    }else{
        console.log("无openid");
    }

}

function chooseImgs(imagesInformation, messageName, number) {
    // window.WebContainer.rcsOpenFileSelecter()
    messageBus.$emit('inputChooseImg',{
        messageName: messageName,
        imagesInformation: imagesInformation,
        number:number
    })
}
function changeImages(eleDefId,mark) {
    // window.WebContainer.rcsOpenFileSelecter()
    messageBus.$emit('inputChooseImg',{
        messageName: 'changeImages',
        eleDefId:eleDefId,
        mark:mark,
        number:1
    })
}

function refreshToken(){
    return new Promise((resolve, reject)=>{
        let search = parseLocationSearch();
        ajax.fxLogin({
            access_token: search.token,
            openid: search.id
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
export {chooseImgs,changeImages,init, refreshToken}