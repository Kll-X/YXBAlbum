function processReturnObj(data) {
    if (typeof data === "string") {
        if(data === ""){
            return {}
        }
        data = JSON.parse(data);
    }
    return data;
}

function timeFormat(timestamp,format){
    console.log(timestamp);
    let result;
    let d = new Date(timestamp);
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    let day = d.getDate();
    let hour = d.getHours();
    let min = d.getMinutes();
    let monthStr = month<10?'0'+month:month;
    let dayStr = day<10?'0' + day: day;
    let hourStr = hour<10?'0' + hour: hour;
    let minStr = min<10?'0' + min: min;
    if(format === 1){
        // result = 
    }else if(format === 2){
        result = year+"."+monthStr+"."+dayStr;
    }else{
        result = year+"-"+monthStr+"-"+dayStr;
    }
    return result;

}

function getAsyncManager(){
    function AsyncManager() {
        this.loadingQueue = [];
    }

    AsyncManager.prototype.register = function (mark) {
        this.loadingQueue.push(mark);
    };

    AsyncManager.prototype.checkLast = function (mark) {
        if (this.loadingQueue.some(function (item) {
                return item === mark
            })) {
            this.loadingQueue.splice(this.loadingQueue.indexOf(mark), 1);
        }
        return this.loadingQueue.length === 0;
    };

    AsyncManager.prototype.clear = function () {
        this.loadingQueue = [];
    };
    
    return new AsyncManager();
}

function getRandomId() {
    return Math.ceil(1e10 * Math.random())
}

function isIos() {
    return !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //ios终端
}

function isAndroid(){
    return navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1 //android终端
}

function isMobile() {
    return isIos()||isAndroid();
}

function rearrangeZindex(elements) {
    for (var b = 0; b < elements.length - 1; b++)
        for (var c = b + 1; c < elements.length; c++)
            if (parseInt(elements[b].css.zIndex, 10) > parseInt(elements[c].css.zIndex, 10)) {
                var d = elements[b];
                elements[b] = elements[c], elements[c] = d
            }
    for (var e = 0; e < elements.length; e++) elements[e].css.zIndex = e + 1 + "";
    return elements
}

function rearrangePos(elements) {
    elements.forEach(function (ele, idx) {
        ele.css.left = parseInt(ele.css.left);
        ele.css.top = parseInt(ele.css.top);
    });
    return elements
}

function iterateToFindItem(templateData, info) {
    for (let page of templateData.list) {
        for (let item of page.elements) {
            if (info.id === item.id) {
                return item;
            }
        }
    }
}

function checkPhone(phone) {
    return /^1[3|4|5|7|8]\d{9}$/.test(phone);
}

function checkYiDong(phone) {
    return /^1(3[4-9]|5[012789]|8[78])\d{8}$/.test(phone);
}

export {
    processReturnObj,
    timeFormat,
    getAsyncManager,
    getRandomId,
    isIos,
    isAndroid,
    isMobile,
    rearrangeZindex,
    rearrangePos,
    iterateToFindItem,
    checkPhone,
    checkYiDong
}