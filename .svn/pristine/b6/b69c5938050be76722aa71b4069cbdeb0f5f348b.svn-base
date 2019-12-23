function getArticleStyle(stylePage){
    //第一张图为背景，第二张为top，第三张为border，第四张为bottom
    let styleObj={
        bgImgEle:{
            properties:{},
            css:{
                top:0
            }
        },
        topImgEle:{
            properties:{},
            css:{
                top:0
            }
        },
        borderImgEle:{
            properties:{},
            css:{
                top:0
            }
        },
        bottomImgEle:{
            properties:{},
            css:{
                top:0
            }
        },
        titleTxtEle:{
            css:{}
        },
        timeTxtEle:{
            css:{}
        },
        countTxtEle:{
            css:{}
        },
        userTxtEle:{
            css:{}
        },
    };
    let imgEle=[];
    let allEle = stylePage.elements.slice(0);
    for(let item of allEle){
        if(parseInt(item.type)==4){
            imgEle.push(item);
        }
        if(parseInt(item.type)==2){
            if(item.content.search("标题")>-1){
                styleObj.titleTxtEle = item;
            };
            if(item.content.search("时间")>-1){
                styleObj.timeTxtEle = item;
            };
            if(item.content.search("阅读量")>-1){
                styleObj.countTxtEle = item;
            };
            if(item.content.search("作者")>-1){
                styleObj.userTxtEle = item;
            }
        }
    }

    imgEle.sort(compare("height",false));
    $.extend(true,styleObj.bgImgEle,imgEle[0]);
    let imgEleCopy=imgEle.slice(1);
    imgEleCopy.sort(compare("top",true));
    $.extend(true,styleObj.topImgEle,imgEleCopy[0]);
    $.extend(true,styleObj.borderImgEle,imgEleCopy[1]);
    $.extend(true,styleObj.bottomImgEle,imgEleCopy[2]);

    return styleObj;
}

function compare(attr,flag){//flag为true时升序，否则降序
    let flagNum = flag? 1:-1;
    return function (obj1,obj2) {
        if(parseInt(obj1.css[attr])>parseInt(obj2.css[attr])){
            return 1*flagNum;
        }else if(parseInt(obj1.css[attr])<parseInt(obj2.css[attr])){
            return -1*flagNum;
        }else{
            return 0;
        }
    }
}

export {
    getArticleStyle,
    compare
}