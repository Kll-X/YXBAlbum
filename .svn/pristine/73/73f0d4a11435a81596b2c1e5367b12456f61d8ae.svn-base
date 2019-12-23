import * as ajax from '../ajax';
import * as utils from "../utils";
import {
    getOpenId,
    getToken,
    setToken
} from "@src/lib/platformAPI";
import messageBus from "../../components/messageBus";
//imagesInformation={localIds: [], serverIds: [], ownUrls: []}
function chooseImgs(imagesInformation, messageName, number = 9) {
    console.log('wx.chooseImgs');
    wx.chooseImage({
        count: number, // 默认9
        // sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
            let localIds = imagesInformation.localIds = res.localIds;
            let localIdsCopy = localIds.slice();
            messageBus.$emit("tipCoverShow", {
                status: 1,
                desc: [`1 / ${imagesInformation.localIds.length}`],
                icon: 'load',
                style:{
                    tipDescPadding:'0 0.32rem 0.4rem'
                }
            });
            wxUploadImages(imagesInformation, localIdsCopy, messageName);
        }
    });
}

function wxUploadImages(imagesInformation, localIdsCopy, messageName) {

    if (localIdsCopy.length > 0) {
        wxUploadOneImage(imagesInformation, localIdsCopy, messageName, afterUploadOneImageCallback)
    } else {
        afterUploadLastImage(imagesInformation, messageName);
    }
}

function wxUploadOneImage(imagesInformation, localIdsCopy, messageName, callback) {

    wx.uploadImage({
        localId: localIdsCopy.shift().toString(), // 需要上传的图片的本地ID，由chooseImage接口获得
        isShowProgressTips: 0, // 默认为1，显示进度提示
        success: function (res) {
            callback(res, imagesInformation, localIdsCopy, messageName);
        },
        fail: function (error) {}
    })
}

function afterUploadOneImageCallback(res, imagesInformation, localIdsCopy, messageName) {
    let openId = getOpenId();
    let serverIds = imagesInformation.serverIds;
    serverIds.push(res.serverId);

    let nth = serverIds.length;

    messageBus.$emit("tipCoverShow", {
        title:'',
        status: 1,
        desc: [`${nth} / ${imagesInformation.localIds.length}`],
        icon: 'load',
        style:{
            tipDescPadding:'0 0.32rem 0.4rem'
        }
    });

    //--------------------------------------
    ajax.notifySeverToDownloadPic({
        "mediaId": res.serverId,
        "openId": openId,
        "token": getToken()
    }).then(function (data) {
        if (utils.processReturnObj(data).resultCode === 0) {

        } else {

        }
    }).catch(function (error) {});
    //---------------------------------------

    wxUploadImages(imagesInformation, localIdsCopy, messageName);
}


function afterUploadLastImage(imagesInformation, messageName) {

    //拿到所有图片地址放进imagesInformation.ownUrls中

    let asyncManager = utils.getAsyncManager();

    imagesInformation.serverIds.forEach(function (id, index) {
        let i = 0;

        function queryLocalUrl(id, index) {
            let mark = {};
            asyncManager.register(mark);

            ajax.queryLocalUrl({
                "openId": getOpenId(),
                "mediaId": id,
                "token": getToken()
            }).then(function (data) {
                data = utils.processReturnObj(data);
                if (data.resultCode === 0 && data.data !== "") {

                    imagesInformation.ownUrls[index] = data.data;

                    if (asyncManager.checkLast(mark) && imagesInformation.ownUrls.indexOf("false") < 0) {
                        messageBus.$emit(messageName, imagesInformation);
                        messageBus.$emit("tipCoverShow", {
                            status: 0,
                        });
                    }
                } else {
                    imagesInformation.ownUrls[index] = "false";
                    asyncManager.checkLast(mark);
                    i++;
                    if (i < 30) {
                        setTimeout(function () {
                            queryLocalUrl(id, index);
                        }, 1500)
                    } else {
                        messageBus.$emit("tipCoverShow", {
                            status: 1,
                            icon: 'times',
                            desc: ['后台服务暂不可用'],
                            style:{
                                tipDescPadding:'0 0.32rem 0.4rem'
                            },
                            btns: [{
                                text: '取消',
                                btnCallBack: function () {
                                    messageBus.$emit("tipCoverShow", {
                                        status: 0
                                    });
                                }
                            },{
                                text: '再试一次',
                                btnCallBack: function () {
                                    messageBus.$emit("tipCoverShow", {
                                        status: 0
                                    });
                                    afterUploadLastImage(imagesInformation, messageName)
                                }
                            }]
                        });
                    }
                }

            })
        }

        messageBus.$emit("tipCoverShow", {
            status: 1,
            title: '',
            desc: ["生成中"],
            icon: "load",
            style:{
                tipDescPadding:'0 0.32rem 0.4rem'
            }
        });
        queryLocalUrl(id, index);
    });
}

function changeImage(eleDefId, mark) {
    let openId = getOpenId();
    wx.chooseImage({
        count: 1, // 可选图片数量
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
            wx.uploadImage({
                localId: res.localIds[0].toString(), // 需要上传的图片的本地ID，由chooseImage接口获得
                isShowProgressTips: 1, // 默认为1，显示进度提示
                success: function (res) {
                    let coverMark = {};
                    messageBus.$emit('globalLoadCover', {
                        status: true,
                        mark: coverMark
                    });
                    console.log("globalTrue");
                    let serverId = res.serverId;
                    ajax.notifySeverToDownloadPic({
                        "mediaId": serverId,
                        "openId": openId,
                        "token": getToken()
                    }).then(function (data) {
                        let i = 0;
                        let ownUrl = "";

                        function queryOwnUrl(serverId) {
                            ajax.queryLocalUrl({
                                "openId": getOpenId(),
                                "mediaId": serverId,
                                "token": getToken()
                            }).then(function (data) {
                                data = utils.processReturnObj(data);
                                console.log(data);
                                if (data.resultCode === 0 && data.data !== "") {
                                    ownUrl = data.data;
                                    if (eleDefId) {
                                        console.log(ownUrl);
                                        console.log(eleDefId);
                                        messageBus.$emit('imgSrcChanged', {
                                            src: ownUrl,
                                            id: eleDefId
                                        });
                                    }
                                    if (mark) {
                                        console.log(ownUrl);
                                        console.log(mark);
                                        messageBus.$emit('imgSrcAdd', {
                                            src: ownUrl,
                                            mark: mark
                                        })
                                    }
                                    messageBus.$emit('showCommonBar');
                                    messageBus.$emit('allEditCoverHide');
                                    messageBus.$emit('allProxyItemHide');
                                    messageBus.$emit('globalLoadCover', {
                                        status: false,
                                        mark: coverMark
                                    });
                                    console.log("globalfalse");
                                } else {
                                    i++;
                                    if (i < 10) {
                                        setTimeout(function () {
                                            queryOwnUrl(serverId)
                                        }, 1000)
                                    } else {
                                        throw "can not get resource"
                                    }
                                }
                            }).catch(function (error) {
                                console.log(error);
                                messageBus.$emit("tipCoverShow", {
                                    status: 1,
                                    desc: ['后台服务器繁忙', '请刷新重试'],
                                    icon: 'times',
                                    style:{
                                        tipDescPadding:'0 0.32rem 0.4rem'
                                    }
                                });
                            })
                        }

                        queryOwnUrl(serverId);

                    }).catch(function (error) {});
                },
                fail: function (error) {
                    // alert(JSON.stringify(error))
                }
            })
        }
    });
}

//
// function addImage(imagesInformation) {
//     wx.chooseImage({
//         count: 9, // 默认9
//         sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
//         sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
//         success: function (res) {
//             imagesInformation.localIds = res.localIds;
//             // uploadImages(imagesInformation);
//         }
//     });
// }
function share(data) {
    wx.ready(function () {
        wx.onMenuShareAppMessage({
            title: data.name, // 分享标题
            desc: data.desc, // 分享描述
            link: location.href.split('?')[0] + location.hash, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: data.coverImage ? data.coverImage : "http://yxbsve.mmarket.com/Uploads/default_thum.jpg", // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });

        wx.onMenuShareTimeline({
            title: data.name, // 分享标题
            link: location.href.split('?')[0] + location.hash, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: data.coverImage ? data.coverImage : "http://yxbsve.mmarket.com/Uploads/default_thum.jpg", // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
                console.log()
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });

        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
    });
}

function init(url, vm) {
    const jsApiList = [
        'chooseImage',
        'previewImage',
        'uploadImage',
        'downloadImage',
        'onMenuShareAppMessage',
        'getLocalImgData'
    ]; // 必填，需要使用的JS接口列表，所有JS接口列表见附录2

    ajax.getWxConfig(url)
        .then(function (data) {
            data = utils.processReturnObj(data);
            if (data.resultCode !== 0) {
                alert("微信认证失败，请检查网络");
                return;
            }
            let wxConfig = data.data;

            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: 'wx544cfd61241c9399', // 必填，公众号的唯一标识
                timestamp: wxConfig.timestamp, // 必填，生成签名的时间戳
                nonceStr: wxConfig.noncestr, // 必填，生成签名的随机串
                signature: wxConfig.signature, // 必填，签名，见附录1
                jsApiList: jsApiList
            });

            wx.error(function (error) {
                alert("微信认证失败，请检查网络");
                //                        alert("weixin error" + JSON.stringify(error))
                // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
            });
        })
        .catch(function (error) {
            alert("微信认证失败，请检查网络");
            //                    alert("Getwxconfig error" + JSON.stringify(error));
        });

    if (getOpenId()) {
        ajax.login({
            "openid": getOpenId()
        }).then(function (res) {
            if (res.resultCode === 0) {
                if (res.data.headPortrait) {
                    // res.data.headPortrait = res.data.headimgurl;
                    res.data.account = res.data.account || res.data.phone;
                } else {
                    res.data.headPortrait = res.data.headimgurl = require('@src/images/defaultHeadPortrait.png');
                }
                messageBus.$emit('updateUserinfo', res.data);
                messageBus.$emit('initList');
                if (!res.data.token) {
                    if (vm.$router.currentRoute.name !== 'phoneUpdate') {
                        messageBus.$emit('tipCoverShow', {
                            status: 1,
                            desc: ['您还没绑定手机', '请先绑定手机号'],
                            icon: 'check',
                            style:{
                                tipDescPadding:'0 0.32rem 0.4rem'
                            },
                            btns: [{
                                text: '确定',
                                btnCallBack: function () {
                                    messageBus.$emit('tipCoverShow', {
                                        status: 0
                                    })
                                    vm.$router.push({
                                        name: 'phoneUpdate',
                                        params: {
                                            access_token: res.data.access_token
                                        }
                                    });
                                }
                            }]
                        })
                    }
                } else {
                    setToken(res.data.token);
                    // messageBus.$emit('updateToken',res.data.token);
                }
            }
        })
    } else {
        console.log("无openid")
    }
}

function refreshToken() {
    return new Promise((resolve, reject) => {
        ajax.login({
            "openid": getOpenId()
        }).then((res) => {
            if (res.resultCode === 0 && res.data.token) {
                setToken(res.data.token);
                resolve()
            } else {
                reject();
            }
        })
    })
}

export {
    chooseImgs,
    changeImage,
    share,
    init,
    refreshToken
}