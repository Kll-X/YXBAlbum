import {timeFormat} from './utils.js';
import messageBus from '../components/messageBus.js';

var eyeImgUrl = require('../images/eye.png');
var tpls={};
function articleParser(ele,data,userData){
    init();
    let mode = data.list[0].properties?data.list[0].properties.mode?data.list[0].properties.mode:0:0;
    switch(mode){
        case 0: tpls[1](ele,data,userData);break;
        case 4: tpls[4](ele,data,userData);break;
        default: tpls[0](ele,data,userData);break; //标准模式
    }
}

function addTpl(index,desc,func){
    tpls[index] = func;
}

function init(){

    addTpl("0","标准模式",function(ele,data,userData){
        if(!userData){
            userData = {};
            userData.name = "模板";
            userData.createTime = new Date().getTime() ;
            userData.count = 0;
            userData.userName = "和美秀"
        }
        let userName;
        let wrapper = document.createElement("div");
        wrapper.setAttribute("class","wrapper wrapper0");
        ele.appendChild(wrapper);

        wrapper.innerHTML=`
            <div class="info">
                <div class="title">${userData.name}</div>
                <div class="infoContent">
                    <div class="time">${timeFormat(userData.createTime)}</div>
                    <div class="count"><img src="${eyeImgUrl}">${userData.count}</div>
                    <div class="userName">${userData.userName}</div>
                </div>
            </div>
            <div class="articleContent"></div>
        `.trim();
    
        let list = data.list;
        let pageId;
        let page;
        let articleContent = document.getElementsByClassName("articleContent")[0];
        for(let i = 0; i<list.length;i++){
            let elements = list[i].elements;
            for(let j = 0; j<elements.length; j++){
                let element = elements[j];
                if(element.pageId != pageId){
                    page = addPage(articleContent);
                }
                pageId = element.pageId;
                switch(parseInt(element.type)){
                    case 4: addImg(page,element);break;
                    case 2: addTxt(page,element);break;
                    case 3: console.log(element);break;
                    default: console.log(element.type);
                }
            }
        }
        // let elements = data.elements;
        // for(let i = 0; i<elements.length;i++){
        //     let element = elements[i];
        //     switch(parseInt(element.type)){
        //         case 4: addImg(wrapper,element);break;
        //         case 2: addTxt(wrapper,element);break;
        //         case 3: console.log(element);break;
        //         default: console.log(element.type);
        //     }
        // }
        

    });
    addTpl("1","编辑器首页模式",function(ele,data,userData){
        if(!userData){
            userData = {};
            userData.name = "模板";
            userData.createTime = new Date().getTime() ;
            userData.count = 0;
            userData.userName = "和美秀"
        }
        let userName;
        let wrapper = document.createElement("div");
        wrapper.setAttribute("class","wrapper wrapper1");
        ele.appendChild(wrapper);

        wrapper.innerHTML=`
            <div class="info">
                <div class="title">${userData.name}</div>
                <div class="infoContent">
                    <div class="time">${timeFormat(userData.createTime)}</div>
                    <div class="count"><img src="${eyeImgUrl}">${userData.count}</div>
                    <div class="userName">${userData.userName}</div>
                </div>
            </div>
            <div class="articleContent"></div>
        `.trim();

        let list = data.list;
        let pageId;
        let page;
        let articleContent = document.getElementsByClassName("articleContent")[0];
        for(let i = 0; i<list.length;i++){
            let elements = list[i].elements;
            for(let j = 0; j<elements.length; j++){
                let element = elements[j];
                if(element.pageId != pageId){
                    page = addPage(articleContent);
                }
                pageId = element.pageId;
                switch(parseInt(element.type)){
                    case 4: addImg(page,element);break;
                    case 2: addTxt(page,element);break;
                    case 3: console.log(element);break;
                    default: console.log(element.type);
                }
            }
        }
    })
    addTpl("4","自定义模板",function(ele,data,userData){
        if(!userData){
            userData = {};
            userData.name = "模板";
            userData.createTime = new Date().getTime() ;
            userData.count = 0;
            userData.userName = "和美秀"
        }
        let userName;
        let wrapper = document.createElement("div");
        wrapper.setAttribute("class","wrapper wrapper4");
        ele.appendChild(wrapper);

        wrapper.innerHTML=`
            <div class="top"></div>
            <div class="info">
                <div class="title">${userData.name}</div>
                <div class="infoContent">
                    <div class="time">${timeFormat(userData.createTime)}</div>
                    <div class="count"><img src="${eyeImgUrl}">${userData.count}</div>
                    <div class="userName">${userData.userName}</div>
                </div>
            </div>
            <div class="articleContent"></div>
            <div class="bottom"></div>
        `.trim();
        setHeightScale(".top",0.62);
        setHeightScale(".bottom",0.43);

        let list = data.list;
        let pageId;
        let page;
        let articleContent = document.getElementsByClassName("articleContent")[0];
        for(let i = 0; i<list.length;i++){
            let elements = list[i].elements;
            for(let j = 0; j<elements.length; j++){
                let element = elements[j];
                if(element.pageId != pageId){
                    page = addPage(articleContent);
                }
                pageId = element.pageId;
                switch(parseInt(element.type)){
                    case 4: addImg(page,element,3,0.7);break;
                    case 2: addTxt(page,element);break;
                    case 3: console.log(element);break;
                    default: console.log(element.type);
                }
            }
        }
    })
}
function setHeightScale(ele,scale){
    $(ele).height($(ele).width()*scale);
}
function addPage(parent) {
    let div = document.createElement("div");
    div.style.width = 100 + "%";
    parent.appendChild(div);
    return div
}
function addImg(parent,data,decNum,widthScale){
    // console.log(data);
    let scale = widthScale||1;
    let itemWrapper = document.createElement("div");
    let imgWrapper = document.createElement("div");
    let img = document.createElement("div");
    let parentWidth = $(parent).width()*scale;
    itemWrapper.appendChild(imgWrapper);
    imgWrapper.appendChild(img);
    if(decNum){
        for(let i=0;i<decNum;i++){
            let dec = document.createElement("div");
            dec.className = "dec"+(i+1);
            imgWrapper.appendChild(dec);
        }
    }
    itemWrapper.className = "itemWrapper";
    imgWrapper.className = "imgWrapper";
    img.className = "imgItem";
    img.style.backgroundImage = "url("+getImgSrc(data.properties.src)+")";
    // img.style.height = data.properties.height+'px';
    // img.style.width = data.properties.width+'px';
    img.style.width = parentWidth+"px";
    img.style.height = parseInt(data.properties.height)/parseInt(data.properties.width)*parentWidth +"px" ;
    let bgSizeX,bgSizeY;
    if(data.properties.imgStyle.backgroundSizeX&&data.properties.imgStyle.backgroundSizeY) {
        bgSizeX = parseInt(data.properties.imgStyle.backgroundSizeX);
        bgSizeY = parseInt(data.properties.imgStyle.backgroundSizeY);
        img.style.backgroundSize = bgSizeX + "% " + bgSizeY + "%";
    }else{
        img.style.backgroundSize = "cover";
    }
    img.style.backgroundPositionX = data.properties.imgStyle.backgroundPositionX||"50%";
    img.style.backgroundPositionY = data.properties.imgStyle.backgroundPositionY||"50%";


    parent.appendChild(itemWrapper);

    function getImgSrc(src){
      return  /http/i.test(src) ||
        /weixin/i.test(src) ||
        /wxLocalResource/i.test(src) ?
            src :
            PREFIX_FILE_HOST + src
    }
}
function addTxt(parent,data){
    // console.log(data);
    let div = document.createElement("div");
    let txtWrapper = document.createElement("div");
    div.appendChild(txtWrapper);
    txtWrapper.className = "txtWrapper";
    div.className = "itemWrapper";
    txtWrapper.innerHTML= data.content;
    parent.appendChild(div);
}

export {articleParser}