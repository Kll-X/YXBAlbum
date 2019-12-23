import {eqxiu} from "./eqxiu.js"
import * as utils from "../../lib/utils.js"


function parse(data, coverImage) {
    let htmlHeight = $("html").height();
    let scaleWidth = $("html").width() / 320;
    let realHeight = 486 * scaleWidth;
    let top = (htmlHeight - realHeight) / 3;
    // let scaleHeight = $("html").height() / 486;
    // $(".phone-view").css("transform", "scale(" + scaleWidth + "," + scaleHeight + ")");
    // let scaleHeight = $("html").height() / 500;
    // $(".phone-view").css("height", realHeight + "px");
    $(".phone-view").css("transform-origin", "center top");
    $(".phone-view").css("transform", "scale(" + scaleWidth + "," + scaleWidth + ")");
    if(top > 0){
        $(".phone-view").css("top", top + "px");
    } else {
        $(".phone-view").css("top", "0");
    }
    function isIos() {
        return !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //ios终端
    }
    if(isIos()){
        $('.appContent').css('background','#1b1a1f');
    }else{
        $('.appContent').css('background','#393a3f');
    }
    $('.appContent').css('background','#000');
    $('.appContent').css({position:'fixed',left:0,top:0,bottom:0,top:0,width:"100vw",height:"100vh"});


    // let data = data;
    let pages = data.list;
    let c = data.obj.pageMode;
    data.obj.property = utils.processReturnObj(data.obj.property);
    data.obj.property.slideNumber ?
        data.obj.property.slideDisplay = "block" :
        data.obj.property.slideDisplay = "none";

    data.obj.property.slideNumber = !0;

    let d = {bgAudio: data.obj.bgAudio};

    for (let pageNumber = 1; pageNumber <= pages.length; pageNumber++) {

        $('<section class="main-page"><div class="m-img" id="page' + pageNumber + '"></div></section>')
            .appendTo(".phone-view");

        1 === pageNumber && $(".phone-view .main-page").eq(0).addClass("z-current") && yxbCore.playVideo(d);

        yxbCore.templateParser("jsonParser").parse({
            def: pages[pageNumber - 1],
            appendTo: "#page" + pageNumber,
            mode: "view",
            disEvent: d,
            coverImage
        });

        if (pageNumber === pages.length) {
            eqxiu.app($(".phone-view"), data.obj.pageMode, pages, data)
        }
    }

    0 === c || 1 === c || 2 === c || 6 === c || 7 === c || 8 === c || 11 === c || 12 === c || 13 === c ?
        $(".phone-view .u-arrow-right").hide() :
        (3 === c || 4 === c || 5 === c || 9 === c || 10 === c) &&
        $(".phone-view .u-arrow-bottom").hide()
}

export {parse};
