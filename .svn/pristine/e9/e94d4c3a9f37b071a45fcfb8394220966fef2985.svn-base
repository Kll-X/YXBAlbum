import * as ajax from '../ajax';
import * as utils from '../utils';
import {getOpenId,setToken,parseLocationSearch} from "@src/lib/platformAPI";
import messageBus from "@src/components/messageBus";

function init() {
    let search = parseLocationSearch();
    console.log(search);
    if(search.token){
        ajax.validateToken({
            token:search.token
        }).then((res)=>{
            res = utils.processReturnObj(res);
            if(res.resultCode === 0 ){
                if (!res.data.headPortrait) {
                    res.data.headPortrait = res.data.headimgurl = require('@src/images/defaultHeadPortrait.png');
                }
                messageBus.$emit('updateUserinfo',res.data);
                setToken(res.data.token);
            }
        })
    }else{
        console.log("未正常获得token参数,不请求用户数据");
    }
}

function chooseImgs(imagesInformation, messageName, number) {
    console.log('负一屏chooseImgs',number);
    messageBus.$emit('inputChooseImg',{
        messageName: messageName,
        imagesInformation: imagesInformation,
        number:number
    })
    // function backFunc(imagesInformation, messageName, number,res){
    //     console.log(imagesInformation, messageName, numberres)
    // }
    // let jsonString = JSON.stringify({
    //     backFunc:backFunc,
    //     httpMethod:'Get'
    // });
    // if(utils.isIos()){
    //     navigator.WebContainer. rcsOpenFileSelecter (jsonString)
    // }else if(utils.isAndroid()){
    //     window.WebContainer. rcsOpenFileSelecter (jsonString)
    // }

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
        // ajax.fxLogin({
        //     access_token: search.token,
        //     openid: search.id
        // }).then((res)=>{
        //     if(res.resultCode === 0 && res.data.token){
        //         setToken(res.data.token);
        //         resolve()
        //     }else{
        //         reject();
        //     }
        // })

        function backFunc_getToken(res){
            res = utils.processReturnObj(res);
            console.log('res',res);
            if(res.status == 1){
                setToken(res.token);
                resolve()
            }else{
                reject();
            }
        }

        let jsonString = JSON.stringify({
            backId:'123',
            backFunc:backFunc_getToken
        })

        let getRCSToken = '';

        if(utils.isIos()){
            getRCSToken = navigator.WebContainer.getRCSToken;
        }else if(utils.isAndroid()){
            getRCSToken = window.WebContainer.getRCSToken;
        }

        getRCSToken(jsonString);
    })
}

function share(shareData) {
    let jsonString = JSON.stringify(shareData);
    if(utils.isIos()){
        console.log('ios分享');
        navigator.WebContainer.setShareParam(jsonString)
    }else if(utils.isAndroid()){
        console.log('android分享');
        window.WebContainer.setShareParam(jsonString)
    }
}
export {chooseImgs,changeImages,init, refreshToken,share}