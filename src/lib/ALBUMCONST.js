/*全局变量*/
//地址常量
window.PREFIX_URL = "http://" + window.location.host + "/";
window.PREFIX_S1_URL = "http://" + window.location.host + "/"; //"/json/";
window.PREFIX_S2_URL = "http://" + window.location.host + "/index.php";
window.PREFIX_S6_URL = "http://" + window.location.host + "/index.php";
window.PREFIX_HOST = "http://" + window.location.host + "/index.php";
window.PREFIX_HOST1 = "http://" + window.location.host + "/index.php";
window.PREFIX_SHOW_HOST = "http://" + window.location.host + "/index.php";
window.TRACK_HOST = "http://" + window.location.host + "/";
//todo 动态获取url
// window.PREFIX_FILE_HOST = "http://" + '120.197.230.65:40585' + "/Uploads/";
window.PREFIX_FILE = getSourcePrevUrl();
window.PREFIX_PHP = getSourcePrevUrl();
window.PREFIX_JAVA = getJavaPrevUrl();
window.PREFIX_FILE_HOST = getSourcePrevUrl() + "/Uploads/";
window.PREFIX_COMPANY_HOST_ARRAY = ["http://" + window.location.host, "http://" + window.location.host];
window.OLD_FILE_HOST = "http://" + window.location.host + "/index.php";
window.CLIENT_CDN = "http://" + window.location.host + "/";
window.clientWidth = document.documentElement.clientWidth;
window.clientHeight = document.documentElement.clientHeight;
window.PREFIX_HOST_ARRAY = [
    "http://" + window.location.host,
    "http://" + window.location.host,
    "http://" + window.location.host,
    "http://" + window.location.host
];
// var tempAddCompUrl1 = PREFIX_S1_URL + "index.php?c=scenedata&a=getmsg&sceneId="
// var tempAddCompUrl2 = PREFIX_URL + "index.php?c=scenedata&a=sendmsg"
// var isEditor = false;

function getSourcePrevUrl() {
    if(_PROXY_){
        return "/phpApi/";
    }
    if (_DEV_) {
        return "http://47.107.125.18/";
    } else {
        return "http://yxbsve.mmarket.com/";
    }
}
function getJavaPrevUrl() {
    if(_PROXY_){
        return "/javaApi/";
    }
    if (_DEV_) {
        return "http://47.107.125.18/mssp_photo/";
    } else {
        return "http://yxb.mmarket.com/mssp_photo/";
    }
}