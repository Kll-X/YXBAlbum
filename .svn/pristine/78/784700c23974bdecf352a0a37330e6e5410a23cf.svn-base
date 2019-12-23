import * as ajax from '../ajax';
import * as utils from "../utils";
import {getOpenId, parseLocationSearch, setToken} from "@src/lib/platformAPI";
import messageBus from "../../components/messageBus";
let cover={};
function init(url){
    function connectWebViewJavascriptBridge(callback) {
        if (window.WebViewJavascriptBridge) {
            callback(WebViewJavascriptBridge)
        } else {
            document.addEventListener('WebViewJavascriptBridgeReady', function() {
                callback(WebViewJavascriptBridge)
            }, false)
        }
    }
    connectWebViewJavascriptBridge(function(bridge) {
        console.log('bridege is ready');
        bridge.init(function(message, responseCallback) {
            // log('JS got a message', message)
            var data = { 'Javascript Responds':'Wee!' }
            // log('JS responding with', data)
            responseCallback(data)
        })
        bridge.callHandler(
            'fetchToken',
            '',
            function(userInfo){
                messageBus.$emit('updateUserinfo',userInfo);
                setToken(userInfo.token);
            }
        )

        bridge.registerHandler('imageUploadDone',function(data){
            //更换图片 changeImages
            if(data.messageName === 'changeImages'){
                if(data.markData.eleDefId){
                    messageBus.$emit('imgSrcChanged', {
                        src: data.filepath[0],
                        id: data.markData.eleDefId
                    });
                }
                if(data.markData.mark){
                    messageBus.$emit('imgSrcAdd',{
                        src:data.filepath[0],
                        mark:data.markData.mark
                    })
                }
                messageBus.$emit('showCommonBar');
                messageBus.$emit('allEditCoverHide');
                messageBus.$emit('allProxyItemHide');
            }else{
                // 批量替换 chooseImgs
                for(let i=0;i<data.filepath.length;i++){
                    data.imagesInformation.ownUrls[i] = data.filepath[i];
                }
                messageBus.$emit(data.messageName, data.imagesInformation);
            }
        })
    })

}
function chooseImgs(imagesInformation, messageName, number = 9){
    window.WebViewJavascriptBridge.callHandler(
            'photoPicker'//app要求有四个参数
            , {'num': number,'imagesInformation':imagesInformation, 'messageName':messageName , 'markData':{}}
            , function(responseData) {
                // alert(JSON.stringfy(responseData));
            }
        );
}
function changeImages(eleDefId,mark) {
    window.WebViewJavascriptBridge.callHandler(
        'photoPicker'
        , {'num': 1,'imagesInformation':{}, 'messageName':'changeImages', 'markData':{'eleDefId':eleDefId,'mark':mark}}
        , function(responseData) {
            // alert(JSON.stringfy(responseData));
        }
    );
}
function shareBtnHandler(url,title,des,imgSrc){
    window.WebViewJavascriptBridge.callHandler(
        'shareToWX'
        , {
            'url': url,
            'title': title,
            'des': des,
            'imgSrc': imgSrc
        }
        , function(responseData) {
            console.log(responseData);
            // alert(JSON.stringfy(responseData));
        }
    );
}

function refreshToken() {
    return new Promise((resolve, reject)=>{
        let search = parseLocationSearch();
        window.WebViewJavascriptBridge.callHandler(
            'fetchToken',
            '',
            function(userInfo){
                if(userInfo){
                    setToken(userInfo.token);
                    resolve();
                }else{
                    reject();
                }
            }
        )
    })
}

export {chooseImgs, init, shareBtnHandler, changeImages, refreshToken}