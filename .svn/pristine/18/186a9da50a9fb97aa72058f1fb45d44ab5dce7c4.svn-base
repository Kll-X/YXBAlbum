import messageBus from "@src/components/messageBus";
import {refreshToken} from '@lib/platformAPI'

function _getSessionToken() {
    return sessionStorage.getItem('token');
    // return '4c00dd7a06f5909975fa11856f133c6c'
}
//统一处理请求
const albumAjax = function (url, postData, token, customAjax, hideMsg, handler) {
    let ajax;
    token?postData.token =  _getSessionToken() : '';
    // postData.token = '123';
    ajax = customAjax? $.ajax(customAjax):$.ajax({
        url: PREFIX_JAVA + url,
        type: 'post',
        data: JSON.stringify(postData),
        processData: false,
        contentType: false,
        headers: {
            "content-type": "application/json",
        },
    })
    return ajax.then(function (res) {
        //默认把后台返回数据变成json
        if (typeof res === "string") {
            if (res === "") {
                return {}
            }
            res = JSON.parse(res);
        }
        return new Promise(function (resolve, reject) {
            //token过期
            if(res.resultCode === -10002){
                if(handler && handler.handler10002){
                    handler.handler10002();
                }else{
                    refreshToken().then(()=>{
                        let handler = {}
                        handler.handler10002 = ()=>{
                            messageBus.$emit("tipCoverShow", {
                                status: 2,
                                desc: ['无法获取有效token，','请刷新重试'],
                                interval: 1000
                            });
                            let res={
                                resultCode: -10002,
                                msg: '无法获取有效token，请刷新重试'
                            }
                            resolve(res);
                        }
                        albumAjax(url, postData, token, customAjax, true, handler);
                    }).catch(()=>{
                        messageBus.$emit("tipCoverShow", {
                            status: 2,
                            desc: ['无法获取有效token，','请刷新重试'],
                            interval: 1000
                        });
                        let res={
                            resultCode: -10002,
                            msg: '无法获取有效token，请刷新重试'
                        }
                        resolve(res);
                    })
                }
            }else{
                //对于resultCode不等于0，即后台没有正确返回的情况，默认提示后台的错误
                if (!hideMsg && res.resultCode !== 0) {
                    messageBus.$emit("tipCoverShow", {
                        status: 2,
                        desc: [res.msg],
                        interval: 1000
                    });
                }
                //原封不动将后台返回的消息传递下去
                resolve(res)
            }
        })
    }).catch(function (res) {
        //对于没有返回http200的情况都提示网络错误，实际情况并不一定是网络问题
        messageBus.$emit("tipCoverShow", {
            status: 2,
            desc: ["网络错误，请重试"],
            interval: 1000
        });
        return new Promise(function (resolve, reject) {
            resolve(res)
        })
    })
};

const templateAjax = function (sceneId) {
    let e = "index.php?c=scene&a=view&id=" + sceneId + "&time=" + (new Date).getTime();//scendId
    return $.ajax({ //请求场景的所有页面
        url: PREFIX_PHP + e,
        xhrFields: {
            withCredentials: true
        },
        loading: !0,
        type: "GET"
    })
};

//复制场景
function copyScence(openId, sceneId) {
    let method = 'c=scene&a=Copypic';
    let param = {
        "uid": openId,
        "id": sceneId
    };
    return php2Java(method, param)
}

function getWxConfig(url) {
    let pUrl = {
        url: url
    };
    return $.ajax({
        url: PREFIX_JAVA + 'media/getWechatConfig.do',
        type: 'post',
        data: JSON.stringify(pUrl),
        headers: {
            "content-type": "application/json",
            "authentication": _getSessionToken()
        }
    })
}
//透传接口
function php2Java(method, data) {
    let url = 'comm/java2Php.do';
    let param = {
        "method": method,
        "data": JSON.stringify(data)
    };
    return $.ajax({
        url: PREFIX_JAVA + url,
        type: 'post',
        data: JSON.stringify(param),
        headers: {
            "content-type": "application/json"
        }
    });
}

//上传图片
function uploadPictureFile(postData){
    return albumAjax(null,null, null,{
        url: PREFIX_JAVA + 'media/uploadPictureFile.do',
        type:'post',
        crossDomain:true,
        processData:false,
        contentType:false,
        mimeType:'multipart/form-data',
        data:postData,
    })
}

function saveSceneSetting(postData) {
    return albumAjax('personal/savePhotoInfo.do', postData)
}
function saveVedioSetting(postData) {
    return albumAjax('personal/savePicTextInfo.do', postData)
}
function saveArticleSetting(postData) {
    return albumAjax('personal/savePicTextInfo.do', postData)
}
function querySceneSetting(postData,hideMsg) {
    return albumAjax('personal/queryPhotoInfo.do', postData, null, null, hideMsg)
}
function saveSceneDetail(postData) {
    return albumAjax('comm/java2Php.do', postData)
}
function savaScene_detail(postData) {
    return albumAjax('comm/java2Php.do', postData)
}
function notifySeverToDownloadPic(postData) {
    return albumAjax('media/savaPicture.do', postData)
}
function queryLocalUrl(postData) {
    return albumAjax('media/queryPicture.do', postData)
}
function queryCommonSongList(postData) {
    return albumAjax('comm/java2Php.do', postData)
}
function createPage(postData) {
    return albumAjax('comm/java2Php.do', postData)
}
function getStandardTemplates(postData) {
    return albumAjax('comm/java2Php.do', postData)
}
function getBgTemlates(postData) {
    return albumAjax('comm/java2Php.do', postData)
}
function getAnimationData(postData) {
    return albumAjax('personal/listPersonalPhoto.do', postData, 'token')
}
function getArticleData(postData) {
    return albumAjax('personal/listPersonalPicText.do', postData, 'token')
}
function getVedioData(postData) {
    return albumAjax('personal/listPersonalPicText.do', postData, 'token')
}
function getUserInfo(postData) {
    return albumAjax('media/getUserInfo.do', postData)
}
function queryPhotoInfo(postData) {
    return albumAjax('photeTemplate/queryPhotoInfo.do', postData)
}
function reportScene(postData) {
    return albumAjax('personal/saveReportInfo.do', postData)
}
function sendBase64AndGetUrl(postData) {
    return albumAjax('media/uploadPicture.do', postData)
}
function java2Php(postData) {
    return albumAjax('comm/java2Php.do', postData);
}
function addCount(postData) {
    return albumAjax('personal/addCount.do', postData);
}
function addTemplateCount(postData) {
    return albumAjax('photeTemplate/addTemplateCount.do', postData)
}
function deletePhoto(postData) {
    return albumAjax('personal/deletePhoto.do', postData)
}
function getTemplateList(postData) {
    return albumAjax('photeTemplate/list.do', postData)
}
function queryPhotoUserInfo(postData) {
    return albumAjax('user/queryPhotoUserInfo.do', postData, 'token')
}
function updateHeadPortrait(postData) {
    return albumAjax('user/updateHeadPortrait.do', postData, 'token')
}
function updatePhotoNickname(postData) {
    return albumAjax('user/updatePhotoNickname.do', postData, 'token')
}
function getVerifyCode(postData) {
    return albumAjax('user/getVerifyCode.do', postData)
}
function sendSmsCode(postData) {
    return albumAjax('user/sendSmsCode.do', postData)
}
function updatePhotoAccount(postData) {
    return albumAjax('user/updatePhotoAccount.do', postData, 'token')
}
function loginOut(postData) {
    return albumAjax('user/loginOut.do', postData, 'token')
}
function queryLimitPreview(postData) {
    return albumAjax('personal/queryLimitPreview.do', postData)
}
function publish(postData) {
    return albumAjax('personal/publish.do', postData)
}
function login(postData) {
    return albumAjax('wechat/getGzhMsg.do', postData)
}
function fxLogin(postData) {
    return albumAjax('wechat/loginHfx.do',postData)
}
function bindingPhoneGzh(postData){
    return albumAjax('wechat/bindingPhoneGzh.do',postData)
}
function uploadH5ToMedia(postData) {
    // return albumAjax('./media/uploadH5ToMedia.do', postData, 'token')
}
function pay(postData) {
    return albumAjax('charge/add.do', postData,'token')
}
function queryPrice(postData) {
    return albumAjax('charge/queryPrice.do', postData)
}
function queryChargeActivity(postData) {
    return albumAjax('charge/queryChargeActivity.do', postData,'token')
}
function getBoughtTemplateList(postData) {
    return albumAjax('charge/chargeList.do', postData,'token')
}
function queryNumber(postData) {
    return albumAjax('charge/queryNumber.do', postData,'token')
}
function queryUnusedList(postData) {
    return albumAjax('charge/queryUnusedList.do', postData,'token')
}
function queryUsedList(postData) {
    return albumAjax('charge/queryUsedList.do', postData,'token')
}
function validateToken(postData) {
    return albumAjax('comm/validateToken.do', postData)
}
//测试用接口，获取token
// function getToken(postData){
//     return albumAjax('user/login.do', {
//         "phone":1380885443,
//         "smscode":12345
//     })
// }
export {
    // albumAjax,
    templateAjax,
    getWxConfig,
    copyScence,
    saveSceneSetting,
    saveArticleSetting,
    querySceneSetting,
    saveSceneDetail,
    savaScene_detail,
    notifySeverToDownloadPic,
    queryLocalUrl,
    queryCommonSongList,
    createPage,
    getStandardTemplates,
    getBgTemlates,
    getAnimationData,
    getArticleData,
    getVedioData,
    getUserInfo,
    queryPhotoInfo,
    reportScene,
    sendBase64AndGetUrl,
    java2Php,
    addCount,
    addTemplateCount,
    deletePhoto,
    getTemplateList,
    saveVedioSetting,
    queryPhotoUserInfo,
    updateHeadPortrait,
    updatePhotoNickname,
    getVerifyCode,
    sendSmsCode,
    updatePhotoAccount,
    loginOut,
    queryLimitPreview,
    publish,
    login,
    fxLogin,
	uploadH5ToMedia,
    uploadPictureFile,
    bindingPhoneGzh,
    pay,
    queryPrice,
    queryChargeActivity,
    getBoughtTemplateList,
    queryNumber,
    queryUnusedList,
    queryUsedList,
    validateToken
}