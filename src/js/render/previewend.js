function isAndroid() {
    var a = navigator.userAgent,
        b = (navigator.appVersion, a.indexOf("Android") > -1 || a.indexOf("Linux") > -1);
    return b
}

function mobilecheck() {
    var a = !1;
    return function (b) {
        (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(b) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(b.substr(0, 4))) && (a = !0)
    }(navigator.userAgent || navigator.vendor || window.opera), document.body && document.body.clientWidth && document.body.clientHeight && document.body.clientWidth < 350 && document.body.clientHeight < 500 && (a = !0), a
}

function tabletCheck() {
    var a = /ipad|android|android 3.0|xoom|sch-i800|playbook|tablet|kindle/i.test(navigator.userAgent.toLowerCase());
    return a
}
function isWeixin() {
    var a = navigator.userAgent.toLowerCase();
    return "micromessenger" == a.match(/MicroMessenger/i) ? !0 : !1
}

yxbCore.clearTyperText = function (a) {
    if (a && a.elements) {
        var b = a.elements;
        $.each(b, function (a, b) {
            if (b.properties && b.properties.anim) {
                var c = b.properties.anim;
                $.each(c, function (a, c) {
                    0 == a && "typer" == c.type && $("#inside_" + b.id).find(".element").empty()
                })
            }
        })
    }
};
yxbCore.isMobileApp = function () {
    return !!window.viewData
};
yxbCore.setPageHis = function (a) {
    if (mobilecheck()) {
        var b = yxbCore.getQueryString("toPage"),
            c = location.href;
        b ? b !== "" + a && (c = c.replace(b, a)) : c += (/\?/.test(c) ? "&" : "?") + "toPage=" + a;
        //     window.history.pushState({
        //     title: $("title").html(),
        //     url: c
        // }, $("title").html(), c)
    }
};
yxbCore.getShowCount = function (a) {
    this.showCount = $.ajax({
        type: "GET",
        url: PREFIX_S1_URL + "index.php?c=scene&a=pv&sceneId=" + a,
        xhrFields: {
            withCredentials: !0
        },
        error: function () {
            // alert("Connection error")
        },
        crossDomain: !0
    });
    return this.showCount
};
yxbCore.getQueryString = function (a) {
    var b = new RegExp("(^|&)" + a + "=([^&]*)(&|$)", "i"),
        c = window.location.search.substr(1).match(b);
    return c ? unescape(c[2]) : null
};
yxbCore.delQueStr = function (a, b) {
    var c = "";
    if (-1 === a.indexOf("?")) return a;
    c = a.substr(a.indexOf("?") + 1);
    var d = [],
        e = "";
    if (-1 !== c.indexOf("&")) {
        d = c.split("&");
        for (i in d) d[i].split("=")[0] != b && (e = e + d[i].split("=")[0] + "=" + d[i].split("=")[1] + "&");
        return a.substr(0, a.indexOf("?")) + "?" + e.substr(0, e.length - 1)
    }
    return d = c.split("="), d[0] == b ? a.substr(0, a.indexOf("?")) : a
};
yxbCore.getDomain = function (a) {
    var b = "null";
    ("undefined" == typeof a || null == a) && (a = window.location.href);
    var c = /.*\:\/\/([^\/]*).*/,
        d = a.match(c);
    return "undefined" != typeof d && null != d && (b = d[1]), b
};
yxbCore.DateFormit = function (a, b) {
    var c, d = new Date(a);
    switch (b) {
        case "MM月DD日":
            c = d.getMonth() + 1 + "月" + d.getDate() + "日 " + d.getHours() + ":" + d.getMinutes();
            break;
        case "T":
            c = "刚刚"
    }
    return c
};
yxbCore.fixedNum = function (a) {
    var b;
    return 1e4 > a ? b = a : a >= 1e4 && 1e8 > a ? b = (a / 1e4).toFixed(2) + "万" : a >= 1e8 && (b = (a / 1e8).toFixed(2) + "亿"), b
};
yxbCore.showProgressBar = function (a, b, c) {
    if (a.obj.property.slideNumber && !a.obj.property.pagesDurationTime.length) {
        // var d = $('<div class="progress"></div>'),
        //     e = $('<div class="progress-bar-inner"></div>'),
        //     f = $('<em class="page-tip"></em>');
        var d = $('<div class="progress-modified"></div>'),
            e = $('<div class="progress-bar-inner-modified"></div>'),
            f = $('<div class="page-tip-modified"></div>');
            $.each(b,function(idx,item){
                var $img = $('<img class="viewPageIndex" style="width:10px;padding: 3px 0" />');
                $img.attr({'datanum':idx});
                if($(item).hasClass('z-current')){
                    f.append($img.attr({'src':require('../../images/activeIndex.png')}));
                }else{
                    f.append($img.attr({'src':require('../../images/commonIndex.png')}));
                }
            });
        d.append(e).append(f), c && a.obj.property.slideDisplay ? c.append(d.css("display", a.obj.property.slideDisplay)) : $("#nr").append(d.css("display", "block"));
    }
    var activityId = a.obj.id;


    var temp = '';
    var g = function () {

        a.obj.property.slideNumber && e && setTimeout(function () {

            var a = $(".z-active").get(0) ? $(".z-active").get(0) : $(".z-currentPage").get(0);
            if (a) {
                // var c = $(a).find(".m-img").attr("id").substring(4),
                //     g = b.length,
                //     h = c / g,
                //     i = 100;
                // f.text(c + "/" + g), e.css("width", parseFloat(d.width()) * h), $(a).find(".lock").length && (i = 0), d.css("z-index", i);
                // if (c != temp) {
                    // var ua = navigator.userAgent.toLowerCase();
                    // var timeId = new Date().getTime();
                    // var dataInit = {
                    //     "index": "actrecord",
                    //     "type": "visit",
                    //     "activityId": activityId,
                    //     "event": "pagein",
                    //     "pageId": c,
                    //     // "ip": ip, //test
                    //     "user-agent": ua,
                    //     "createTime": timeId
                    // };
                    // var urlInit = "ela/collect.do";

                    //test
                    // function commitPageIdAndActivityId(data, url) {
                    //     var php_w = "";
                    //     //test
                    //     var datas = {
                    //         "data": data,
                    //         "api": url
                    //     }
                    //     var promise = $.ajax({
                    //         type: "POST",
                    //         headers: {"location": 'test'},
                    //         url: php_w + "index.php?c=Api&a=api_j",
                    //         data: datas,
                    //         dataType: 'json'
                    //     });
                    //     return promise;
                    // }

                    // // console.log(temp,activityId,c);
                    // temp = c;
                    // commitPageIdAndActivityId(dataInit, urlInit).success(function (data) {

                    //     // console.log(temp,activityId,c);

                    // })

                // }

                //--------------以下为实现显示相册预览页轮播图标所做修改--------------
                var c = $(a).find(".m-img").attr("id").substring(4),
                    g = b.length,
                    h = c / g,
                    i = 100;
                // f.text(c + "/" + g);

                e.css("width", parseFloat(d.width()) * h), $(a).find(".lock").length && (i = 0), d.css("z-index", i);
            }
        }, 100)
    };
    g(), b.eq(0).find(".u-arrow-bottom").css("bottom", "30px"), yxbCore.progressInterval = setInterval(function () {
        g();
    }, 300)
};
yxbCore.selectElement = function (a) {
    var b;
    return b = $("#inside_" + a, ".phone-view").length ? $("#inside_" + a, ".phone-view") : $("#inside_" + a)
};
yxbCore.substtrCharacters = function (a, b) {
    if (a && (a = a.replace(/\n|\r/g, " ")), a && a.length > b / 2) {
        var c = a.replace(/[^\x00-\xff]/g, "xx");
        if (c.length > b) {
            var d = c.substring(0, b).replace(/xx/g, "中").length;
            a = a.substring(0, d)
        }
    }
    return a
};
yxbCore.getCharactersLen = function (a) {
    var b = a.replace(/[^\x00-\xff]/g, "xx");
    return b.length
};
yxbCore.getRGB = function (a) {
    if (a = a.toLowerCase(), a.indexOf("rgba") >= 0) {
        var b = a.split(",");
        b[0] = b[0].replace("rgba", "rgb"), b.pop(), b[b.length - 1] += ")", a = b.join(",")
    }
    return a
};
yxbCore.convertToHexColor = function (a) {
    if (a = a.toLowerCase(), a.indexOf("rgb") >= 0) {
        var b = a.split(","),
            c = b[0].substring(b[0].indexOf("(") + 1);
        c = parseInt(c, 10).toString(16), c = c.length < 2 ? "0" + c : c;
        var d = parseInt(b[1], 10).toString(16);
        d = d.length < 2 ? "0" + d : d;
        var e = b[2].substring(0, b[2].indexOf(")"));
        e = parseInt(e, 10).toString(16), e = e.length < 2 ? "0" + e : e, a = "#" + c + d + e
    }
    return a
};
yxbCore.responsiveImage = function (a, b, c, d, e) {
    var f = new Image;
    f.src = a, f.onload = function (f) {
        var g, h, i = this;
        $.each(b, function (a, b) {
            b.elements && b.elements.length && $.each(b.elements, function (a, b) {
                if (b.id == c) {
                    var d = parseInt(b.css.width),
                        e = parseInt(b.css.height);
                    i.width / i.height >= d / e ? (g = d, h = i.height * (d / i.width)) : (h = e, g = i.width * (e / i.height))
                }
            })
        }), e.css({
            display: "block",
            width: g + "px",
            height: h + "px",
            "margin-top": (parseInt(d.height()) - h) / 2 + "px",
            "margin-left": (parseInt(d.width()) - g) / 2 + "px"
        }).attr("src", a)
    }
};
yxbCore.getCookieId = function () {
    var a = "",
        b = "C_ID=",
        c = document.cookie,
        d = c.indexOf(b);
    if (-1 != d) {
        d += b.length;
        var e = c.indexOf(";", d);
        -1 == e && (e = c.length), a = c.substring(d, e)
    }
    return a
};
yxbCore.delayLoadJSAndCSS = function (a, b, c) {
    var d, e;
    if (b || (b = a.substr(a.lastIndexOf(".") + 1)), "js" == b) {
        var f = document.getElementsByTagName("script");
        for (e = 0; e < f.length; e++)
            if (f[e].src && -1 != f[e].src.indexOf(a) || f[e].title == c) return f[e];
        d = document.createElement("script"), d.type = "text/javascript", d.src = a, c && (d.title = c)
    } else {
        if ("css" != b) return;
        var g = document.getElementsByTagName("link");
        for (e = 0; e < g.length; e++)
            if (g[e].href && -1 != g[e].href.indexOf(a) || g[e].title == c) return g[e];
        d = document.createElement("link"), d.rel = "stylesheet", d.type = "text/css", d.href = a, c && (d.title = c), d.disabled = !1
    }
    var h = document.getElementsByTagName("head")[0];
    return h.appendChild(d), d
};
yxbCore.copyToClipboard = function (a) {
    var b, c, d = "_hiddenCopyText_",
        e = "INPUT" === a.tagName || "TEXTAREA" === a.tagName;
    if (e) f = a, b = a.selectionStart, c = a.selectionEnd;
    else {
        if (f = document.getElementById(d), !f) {
            var f = document.createElement("textarea");
            f.style.position = "absolute", f.style.left = "-9999px", f.style.top = "0", f.id = d, document.body.appendChild(f)
        }
        f.textContent = a.textContent
    }
    var g = document.activeElement;
    f.focus(), f.setSelectionRange(0, f.value.length);
    var h;
    try {
        h = document.execCommand("copy")
    } catch (i) {
        h = !1
    }
    return g && "function" == typeof g.focus && g.focus(), e ? a.setSelectionRange(b, c) : f.textContent = "", h
};
yxbCore.getUrlParameter = function (a) {
    var b, c, d = decodeURIComponent(window.location.search.substring(1)),
        e = d.split("&");
    for (c = 0; c < e.length; c++)
        if (b = e[c].split("="), b[0] === a) return void 0 === b[1] ? !0 : b[1]
};

var listPages = [];

(function ($) {
    function b(b) {
        return b.classList ? b.classList : $(b).attr("class").match(/\S+/gi)
    }

    $.fn.ShareLink = function (c) {
        function d(a) {
            var b = g[a];
            return b = b.replace("{url}", encodeURIComponent(c.url)), b = b.replace("{title}", encodeURIComponent(c.title)), b = b.replace("{text}", encodeURIComponent(c.text)), b = b.replace("{image}", encodeURIComponent(c.image))
        }

        var e = {
                title: "",
                text: "",
                image: "",
                url: window.location.href,
                class_prefix: "s_"
            },
            c = $.extend({}, e, c),
            f = c.class_prefix.length,
            g = {
                twitter: "https://twitter.com/intent/tweet?url={url}&text={text}",
                pinterest: "https://www.pinterest.com/pin/create/button/?media={image}&url={url}&description={text}",
                facebook: "https://www.facebook.com/sharer.php?u={url}",
                vk: "https://vkontakte.ru/share.php?url={url}&title={title}&description={text}&image={image}&noparse=true",
                linkedin: "https://www.linkedin.com/shareArticle?mini=true&url={url}&title={title}&summary={text}&source={url}",
                myworld: "https://connect.mail.ru/share?url={url}&title={title}&description={text}&imageurl={image}",
                odnoklassniki: "http://odnoklassniki.ru/dk?st.cmd=addShare&st.s=1&st._surl={url}&st.comments={text}",
                tumblr: "https://tumblr.com/share?s=&v=3&t={title}&u={url}",
                blogger: "https://blogger.com/blog-this.g?t={text}&n={title}&u={url}",
                delicious: "https://delicious.com/save?url={url}&title={title}",
                plus: "https://plus.google.com/share?url={url}",
                digg: "https://digg.com/submit?url={url}&title={title}",
                reddit: "http://reddit.com/submit?url={url}&title={title}",
                stumbleupon: "https://www.stumbleupon.com/submit?url={url}&title={title}",
                pocket: "https://getpocket.com/edit?url={url}&title={title}",
                chiq: "http://www.chiq.com/create/bookmarklet?u={url}&i={image}&d={title}&c={url}",
                qrifier: "http://qrifier.com/q?inc=qr&type=url&size=350&string={url}",
                qrsrc: "http://www.qrsrc.com/default.aspx?shareurl={url}",
                qzone: "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url={url}",
                tulinq: "http://www.tulinq.com/enviar?url={url}&title={title}",
                misterwong: "http://www.mister-wong.com/index.php?action=addurl&bm_url={url}&bm_description={title}&bm_notice=",
                sto_zakladok: "http://www.100zakladok.ru/save/?bmurl={url}&bmtitle={title}",
                two_linkme: "http://www.2linkme.com/?collegamento={url}&id=2lbar",
                adifni: "http://www.adifni.com/account/bookmark/?bookmark_url={url}",
                amazonwishlist: "http://www.amazon.com/gp/wishlist/static-add?u={url}&t={title}",
                amenme: "http://www.amenme.com/AmenMe/Amens/AmenToThis.aspx?url={url}&title={title}",
                aim: "http://lifestream.aol.com/share/?url={url}&title={title}&description={text} ",
                aolmail: "http://webmail.aol.com/25045/aol/en-us/Mail/compose-message.aspx?to=&subject={title}&body={{content}}",
                arto: "http://www.arto.com/section/linkshare/?lu={url}&ln={title}",
                baidu: "http://cang.baidu.com/do/add?it={title}&iu={url}&fr=ien&dc={text}",
                bitly: "https://bitly.com/a/bitmarklet?u={url}",
                bizsugar: "http://www.bizsugar.com/bizsugarthis.php?url={url}",
                blinklist: "http://www.blinklist.com/blink?u={url}&t={title}&d={text}",
                blip: "http://blip.pl/dashboard?body={title}%3A%20{url}",
                blogmarks: "http://blogmarks.net/my/new.php?mini=1&simple=1&url={url}&title={title}&content={text}",
                blurpalicious: "http://www.blurpalicious.com/submit/?url={url}&title={title}&desc={text}",
                bobrdobr: "http://bobrdobr.ru/addext.html?url={url}&title={title}&desc={text}",
                bonzobox: "http://bonzobox.com/toolbar/add?u={url}&t={title}&desc={text}",
                bookmerkende: "http://www.bookmerken.de/?url={url}&title={title}",
                box: "https://www.box.net/api/1.0/import?import_as=link&url={url}&name={title}&description={text}",
                bryderi: "http://bryderi.se/add.html?u={url}",
                buddymarks: "http://buddymarks.com/add_bookmark.php?bookmark_title={title}&bookmark_url={url}&bookmark_desc={text}",
                camyoo: "http://www.camyoo.com/note.html?url={url}",
                care2: "http://www.care2.com/news/compose?sharehint=news&share[share_type]news&bookmarklet=Y&share[title]={title}&share[link_url]={url}&share[content]={text}",
                citeulike: "http://www.citeulike.org/posturl?url={url}&title={title}",
                classicalplace: "http://www.classicalplace.com/?u={url}&t={title}&c={text}",
                cosmiq: "http://www.cosmiq.de/lili/my/add?url={url}",
                diggita: "http://www.diggita.it/submit.php?url={url}&title={title}",
                diigo: "http://www.diigo.com/post?url={url}&title={title}&desc={text}",
                domelhor: "http://domelhor.net/submit.php?url={url}&title={title}",
                dotnetshoutout: "http://dotnetshoutout.com/Submit?url={url}&title={title}",
                douban: "http://www.douban.com/recommend/?url={url}&title={title}",
                dropjack: "http://www.dropjack.com/submit.php?url={url}",
                edelight: "http://www.edelight.de/geschenk/neu?purl={url}",
                ekudos: "http://www.ekudos.nl/artikel/nieuw?url={url}&title={title}&desc={text}",
                elefantapl: "http://elefanta.pl/member/bookmarkNewPage.action?url={url}&title={title}&bookmarkVO.notes=",
                embarkons: "http://www.embarkons.com/sharer.php?u={url}&t={title}",
                evernote: "http://www.evernote.com/clip.action?url={url}&title={title}",
                extraplay: "http://www.extraplay.com/members/share.php?url={url}&title={title}&desc={text}",
                ezyspot: "http://www.ezyspot.com/submit?url={url}&title={title}",
                fabulously40: "http://fabulously40.com/writeblog?subject={title}&body={url}",
                informazione: "http://fai.informazione.it/submit.aspx?url={url}&title={title}&desc={text}",
                fark: "http://www.fark.com/cgi/farkit.pl?u={url}&h={title}",
                farkinda: "http://www.farkinda.com/submit?url={url}",
                favable: "http://www.favable.com/oexchange?url={url}&title={title}&desc={text}",
                favlogde: "http://www.favlog.de/submit.php?url={url}",
                flaker: "http://flaker.pl/add2flaker.php?title={title}&url={url}",
                folkd: "http://www.folkd.com/submit/{url}",
                fresqui: "http://fresqui.com/enviar?url={url}",
                friendfeed: "http://friendfeed.com/share?url={url}&title={title}",
                funp: "http://funp.com/push/submit/?url={url}",
                fwisp: "http://fwisp.com/submit.php?url={url}",
                givealink: "http://givealink.org/bookmark/add?url={url}&title={title}",
                gmail: "http://mail.google.com/mail/?view=cm&fs=1&to=&su={title}&body={text}&ui=1",
                goodnoows: "http://goodnoows.com/add/?url={url}",
                google: "http://www.google.com/bookmarks/mark?op=add&bkmk={url}&title={title}&annotation={text}",
                googletranslate: "http://translate.google.com/translate?hl=en&u={url}&tl=en&sl=auto",
                greaterdebater: "http://greaterdebater.com/submit/?url={url}&title={title}",
                hackernews: "http://news.ycombinator.com/submitlink?u={url}&t={title}",
                hatena: "http://b.hatena.ne.jp/bookmarklet?url={url}&btitle={title}",
                hedgehogs: "http://www.hedgehogs.net/mod/bookmarks/add.php?address={url}&title={title}",
                hotmail: "http://www.hotmail.msn.com/secure/start?action=compose&to=&subject={title}&body={{content}}",
                w3validator: "http://validator.w3.org/check?uri={url}&charset=%28detect+automatically%29&doctype=Inline&group=0",
                ihavegot: "http://www.ihavegot.com/share/?url={url}&title={title}&desc={text}",
                instapaper: "http://www.instapaper.com/edit?url={url}&title={title}&summary={text}",
                isociety: "http://isociety.be/share/?url={url}&title={title}&desc={text}",
                iwiw: "http://iwiw.hu/pages/share/share.jsp?v=1&u={url}&t={title}",
                jamespot: "http://www.jamespot.com/?action=spotit&u={url}&t={title}",
                jumptags: "http://www.jumptags.com/add/?url={url}&title={title}",
                kaboodle: "http://www.kaboodle.com/grab/addItemWithUrl?url={url}&pidOrRid=pid=&redirectToKPage=true",
                kaevur: "http://kaevur.com/submit.php?url={url}",
                kledy: "http://www.kledy.de/submit.php?url={url}&title={title}",
                librerio: "http://www.librerio.com/inbox?u={url}&t={title}",
                linkuj: "http://linkuj.cz?id=linkuj&url={url}&title={title}&description={text}&imgsrc=",
                livejournal: "http://www.livejournal.com/update.bml?subject={title}&event={url}",
                logger24: "http://logger24.com/?url={url}",
                mashbord: "http://mashbord.com/plugin-add-bookmark?url={url}",
                meinvz: "http://www.meinvz.net/Suggest/Selection/?u={url}&desc={title}&prov=addthis.com",
                mekusharim: "http://mekusharim.walla.co.il/share/share.aspx?url={url}&title={title}",
                memori: "http://memori.ru/link/?sm=1&u_data[url]={url}",
                meneame: "http://www.meneame.net/submit.php?url={url}",
                mixi: "http://mixi.jp/share.pl?u={url}",
                moemesto: "http://moemesto.ru/post.php?url={url}&title={title}",
                myspace: "http://www.myspace.com/Modules/PostTo/Pages/?u={url}&t={title}&c=",
                n4g: "http://www.n4g.com/tips.aspx?url={url}&title={title}",
                netlog: "http://www.netlog.com/go/manage/links/?view=save&origin=external&url={url}&title={title}&description={text}",
                netvouz: "http://netvouz.com/action/submitBookmark?url={url}&title={title}&popup=no&description={text}",
                newstrust: "http://newstrust.net/submit?url={url}&title={title}&ref=addthis",
                newsvine: "http://www.newsvine.com/_tools/seed&save?u={url}&h={title}&s={text}",
                nujij: "http://nujij.nl/jij.lynkx?u={url}&t={title}&b={text}",
                oknotizie: "http://oknotizie.virgilio.it/post?title={title}&url={url}",
                oyyla: "http://www.oyyla.com/gonder?phase=2&url={url}",
                pdfonline: "http://savepageaspdf.pdfonline.com/pdfonline/pdfonline.asp?cURL={url}",
                pdfmyurl: "http://pdfmyurl.com?url={url}",
                phonefavs: "http://phonefavs.com/bookmarks?action=add&address={url}&title={title}",
                plaxo: "http://www.plaxo.com/events?share_link={url}&desc={text}",
                plurk: "http://www.plurk.com/m?content={url}+({title})&qualifier=shares ",
                posteezy: "http://posteezy.com/node/add/story?title={title}&body={url}",
                pusha: "http://www.pusha.se/posta?url={url}&title={title}&description={text}",
                rediff: "http://share.rediff.com/bookmark/addbookmark?title={title}&bookmarkurl={url}",
                redkum: "http://www.redkum.com/add?url={url}&step=1&title={title}",
                scoopat: "http://scoop.at/submit?url={url}&title={title}&body={text}",
                sekoman: "http://sekoman.lv/home?status={title}&url={url}",
                shaveh: "http://shaveh.co.il/submit.php?url={url}&title={title}",
                shetoldme: "http://shetoldme.com/publish?url={url}&title={title}&body={text}",
                sinaweibo: "http://v.t.sina.com.cn/share/share.php?url={url}&title={title}",
                sodahead: "http://www.sodahead.com/news/submit/?url={url}&title={title}",
                sonico: "http://www.sonico.com/share.php?url={url}&title={title}",
                springpad: "http://springpadit.com/s?type=lifemanagr.Bookmark&url={url}&name={title}",
                startaid: "http://www.startaid.com/index.php?st=AddBrowserLink&type=Detail&v=3&urlname={url}&urltitle={title}&urldesc={text}",
                startlap: "http://www.startlap.hu/sajat_linkek/addlink.php?url={url}&title={title}",
                studivz: "http://www.studivz.net/Suggest/Selection/?u={url}&desc={title}&prov=addthis.com",
                stuffpit: "http://www.stuffpit.com/add.php?produrl={url}",
                stumpedia: "http://www.stumpedia.com/submit?url={url}",
                svejo: "http://svejo.net/story/submit_by_url?url={url}&title={title}&summary={text}",
                symbaloo: "http://www.symbaloo.com/en/add/?url={url}&title={title}",
                thewebblend: "http://thewebblend.com/submit?url={url}&title={title}",
                thinkfinity: "http://www.thinkfinity.org/favorite-bookmarklet.jspa?url={url}&subject={title}",
                thisnext: "http://www.thisnext.com/pick/new/submit/url/?description={text}&name={title}&url={url}",
                tuenti: "http://www.tuenti.com/share?url={url}",
                typepad: "http://www.typepad.com/services/quickpost/post?v=2&qp_show=ac&qp_title={title}&qp_href={url}&qp_text={text}",
                viadeo: "http://www.viadeo.com/shareit/share/?url={url}&title={title}&urlaffiliate=32005&encoding=UTF-8",
                virb: "http://virb.com/share?external&v=2&url={url}&title={title}",
                visitezmonsite: "http://www.visitezmonsite.com/publier?url={url}&title={title}&body={text}",
                vybralisme: "http://vybrali.sme.sk/sub.php?url={url}",
                webnews: "http://www.webnews.de/einstellen?url={url}&title={title}",
                wirefan: "http://www.wirefan.com/grpost.php?d=&u={url}&h={title}&d={text}",
                wordpress: "http://wordpress.com/wp-admin/press-this.php?u={url}&t={title}&s={text}&v=2",
                wowbored: "http://www.wowbored.com/submit.php?url={url}",
                wykop: "http://www.wykop.pl/dodaj?url={url}&title={title}&desc={text}",
                yahoobkm: "http://bookmarks.yahoo.com/toolbar/savebm?opener=tb&u={url}&t={title}&d={text}",
                yahoomail: "http://compose.mail.yahoo.com/?To=&Subject={title}&body={{content}}",
                yammer: "https://www.yammer.com/home/bookmarklet?bookmarklet_pop=1&u={url}&t={title}",
                yardbarker: "http://www.yardbarker.com/author/new/?pUrl={url}&pHead={title}",
                yigg: "http://www.yigg.de/neu?exturl={url}&exttitle={title}&extdesc={text}",
                yoolink: "http://go.yoolink.to/addorshare?url_value={url}&title={title}",
                yorumcuyum: "http://www.yorumcuyum.com/?baslik={title}&link={url}",
                youmob: "http://youmob.com/mobit.aspx?title={title}&mob={url}",
                zakladoknet: "http://zakladok.net/link/?u={url}&t={title}",
                ziczac: "http://ziczac.it/a/segnala/?gurl={url}&gtit={title}"
            };
        this.each(function (e, h) {
            for (var i = b(h), e = 0; e < i.length; e++) {
                var j = i[e];
                if (j.substr(0, f) == c.class_prefix && g[j.substr(f)]) {
                    var k = d(j.substr(f));
                    $(h).attr("href", k).click(function () {
                        var b = screen.width,
                            d = screen.height,
                            e = c.width ? c.width : b - .2 * b,
                            f = c.height ? c.height : d - .2 * d,
                            g = b / 2 - e / 2,
                            h = d / 2 - f / 2,
                            i = "toolbar=0,status=0,width=" + e + ",height=" + f + ",top=" + h + ",left=" + g;
                        return window.open($(this).attr("href"), "", i) && !1
                    })
                }
            }
        })
    }
})(jQuery);

(function () {
    var a, b = 0;
    yxbCore.shakeTrigger = function (c, d) {
        function e(a) {
            var c = a.accelerationIncludingGravity,
                d = (new Date).getTime();
            if (d - m > 100) {
                var g = parseInt(d - m);
                m = d, j = c.x, k = c.y, l = c.z;
                var i = Math.abs(j + k + l - n - o - p) / g * 1e4;
                window.removeEventListener("devicemotion", e, !0), i > h && (q || (yxbCore.playTriggerSound(), q = !0), window.removeEventListener("devicemotion", e, !0), f.sends && f.sends.length && $.each(f.sends, function (a, c) {
                    time = setTimeout(function () {
                        $.each(c.handles, function (a, c) {
                            var d = utilTrigger.getHandleType(c.type).name;
                            $.each(c.ids, function (a, c) {
                                var e = $("#inside_" + c);
                                e.trigger(d, b)
                            })
                        })
                    }, 1e3 * c.delay)
                })), n = j, o = k, p = l
            }
        }

        var f, g = $(d).find(".m-img").attr("id").substring(4);
        if (c[g - 1].properties && (f = c[g - 1].properties.trigger), f && f.sends) {
            var h = 4e3,
                i = PREFIX_HOST + "/assets/audio/wxShake.mp3";
            a = document.createElement("audio"), a.src = i;
            var j, k, l, m = 0,
                n = 0,
                o = 0,
                p = 0,
                q = !1;
            window.DeviceMotionEvent && d && window.addEventListener("devicemotion", e, !1)
        }
    }, yxbCore.playTriggerSound = function () {
        a && a.play()
    }
})();

(function () {
    yxbCore.getImagesResourceHost = function (a, b) {

        -1 !== location.host.indexOf(window.DOMAIN) &&
        (
            -1 !== ["2", "21"].indexOf(a) && -1 !== ["1", "2", "3", "4", "6", "7", "8", "9"].indexOf(b) ?
                PREFIX_FILE_HOST = VIP_FILE_HOST :
                PREFIX_FILE_HOST = COMMON_FILE_HOST
        );

        return PREFIX_FILE_HOST
    }
})();

(function (a) {
    function b(a, b, i) {
        var j = 0,
            k = [0],
            l = "",
            m = null,
            l = i || "UTF8";
        if ("UTF8" !== l && "UTF16" !== l) throw "encoding must be UTF8 or UTF16";
        if ("HEX" === b) {
            if (0 !== a.length % 2) throw "srcString of HEX type must be in byte increments";
            m = d(a), j = m.binLen, k = m.value
        } else if ("ASCII" === b || "TEXT" === b) m = c(a, l), j = m.binLen, k = m.value;
        else {
            if ("B64" !== b) throw "inputFormat must be HEX, TEXT, ASCII, or B64";
            m = e(a), j = m.binLen, k = m.value
        }
        this.getHash = function (a, b, c, d) {
            var e, i = null,
                l = k.slice(),
                m = j;
            if (3 === arguments.length ? "number" != typeof c && (d = c, c = 1) : 2 === arguments.length && (c = 1), c !== parseInt(c, 10) || 1 > c) throw "numRounds must a integer >= 1";
            switch (b) {
                case "HEX":
                    i = f;
                    break;
                case "B64":
                    i = g;
                    break;
                default:
                    throw "format must be HEX or B64"
            }
            if ("SHA-1" !== a) throw "Chosen SHA variant is not supported";
            for (e = 0; c > e; e++) l = o(l, m), m = 160;
            return i(l, h(d))
        }, this.getHMAC = function (a, b, i, m, n) {
            var p, q, r, s, t = [],
                u = [];
            switch (p = null, m) {
                case "HEX":
                    m = f;
                    break;
                case "B64":
                    m = g;
                    break;
                default:
                    throw "outputFormat must be HEX or B64"
            }
            if ("SHA-1" !== i) throw "Chosen SHA variant is not supported";
            if (q = 64, s = 160, "HEX" === b) p = d(a), r = p.binLen, p = p.value;
            else if ("ASCII" === b || "TEXT" === b) p = c(a, l), r = p.binLen, p = p.value;
            else {
                if ("B64" !== b) throw "inputFormat must be HEX, TEXT, ASCII, or B64";
                p = e(a), r = p.binLen, p = p.value
            }
            if (a = 8 * q, b = q / 4 - 1, r / 8 > q) {
                if ("SHA-1" !== i) throw "Unexpected error in HMAC implementation";
                p = o(p, r), p[b] &= 4294967040
            } else q > r / 8 && (p[b] &= 4294967040);
            for (q = 0; b >= q; q += 1) t[q] = 909522486 ^ p[q], u[q] = 1549556828 ^ p[q];
            if ("SHA-1" !== i) throw "Unexpected error in HMAC implementation";
            return i = o(u.concat(o(t.concat(k), a + j)), a + s), m(i, h(n))
        }
    }

    function c(a, b) {
        var c, d, e = [],
            f = [],
            g = 0;
        if ("UTF8" === b)
            for (d = 0; d < a.length; d += 1)
                for (c = a.charCodeAt(d), f = [], c > 2048 ? (f[0] = 224 | (61440 & c) >>> 12, f[1] = 128 | (4032 & c) >>> 6, f[2] = 128 | 63 & c) : c > 128 ? (f[0] = 192 | (1984 & c) >>> 6, f[1] = 128 | 63 & c) : f[0] = c, c = 0; c < f.length; c += 1) e[g >>> 2] |= f[c] << 24 - g % 4 * 8, g += 1;
        else if ("UTF16" === b)
            for (d = 0; d < a.length; d += 1) e[g >>> 2] |= a.charCodeAt(d) << 16 - g % 4 * 8, g += 2;
        return {
            value: e,
            binLen: 8 * g
        }
    }

    function d(a) {
        var b, c, d = [],
            e = a.length;
        if (0 !== e % 2) throw "String of HEX type must be in byte increments";
        for (b = 0; e > b; b += 2) {
            if (c = parseInt(a.substr(b, 2), 16), isNaN(c)) throw "String of HEX type contains invalid characters";
            d[b >>> 3] |= c << 24 - b % 8 * 4
        }
        return {
            value: d,
            binLen: 4 * e
        }
    }

    function e(a) {
        var b, c, d, e, f, g = [],
            h = 0;
        if (-1 === a.search(/^[a-zA-Z0-9=+\/]+$/)) throw "Invalid character in base-64 string";
        if (b = a.indexOf("="), a = a.replace(/\=/g, ""), -1 !== b && b < a.length) throw "Invalid '=' found in base-64 string";
        for (c = 0; c < a.length; c += 4) {
            for (f = a.substr(c, 4), d = e = 0; d < f.length; d += 1) b = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(f[d]), e |= b << 18 - 6 * d;
            for (d = 0; d < f.length - 1; d += 1) g[h >> 2] |= (e >>> 16 - 8 * d & 255) << 24 - h % 4 * 8, h += 1
        }
        return {
            value: g,
            binLen: 8 * h
        }
    }

    function f(a, b) {
        var c, d, e = "",
            f = 4 * a.length;
        for (c = 0; f > c; c += 1) d = a[c >>> 2] >>> 8 * (3 - c % 4), e += "0123456789abcdef".charAt(d >>> 4 & 15) + "0123456789abcdef".charAt(15 & d);
        return b.outputUpper ? e.toUpperCase() : e
    }

    function g(a, b) {
        var c, d, e, f = "",
            g = 4 * a.length;
        for (c = 0; g > c; c += 3)
            for (e = (a[c >>> 2] >>> 8 * (3 - c % 4) & 255) << 16 | (a[c + 1 >>> 2] >>> 8 * (3 - (c + 1) % 4) & 255) << 8 | a[c + 2 >>> 2] >>> 8 * (3 - (c + 2) % 4) & 255, d = 0; 4 > d; d += 1) f = 8 * c + 6 * d <= 32 * a.length ? f + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(e >>> 6 * (3 - d) & 63) : f + b.b64Pad;
        return f
    }

    function h(a) {
        var b = {
            outputUpper: !1,
            b64Pad: "="
        };
        try {
            a.hasOwnProperty("outputUpper") && (b.outputUpper = a.outputUpper), a.hasOwnProperty("b64Pad") && (b.b64Pad = a.b64Pad)
        } catch (c) {
        }
        if ("boolean" != typeof b.outputUpper) throw "Invalid outputUpper formatting option";
        if ("string" != typeof b.b64Pad) throw "Invalid b64Pad formatting option";
        return b
    }

    function i(a, b) {
        return a << b | a >>> 32 - b
    }

    function j(a, b, c) {
        return a ^ b ^ c
    }

    function k(a, b, c) {
        return a & b ^ ~a & c
    }

    function l(a, b, c) {
        return a & b ^ a & c ^ b & c
    }

    function m(a, b) {
        var c = (65535 & a) + (65535 & b);
        return ((a >>> 16) + (b >>> 16) + (c >>> 16) & 65535) << 16 | 65535 & c
    }

    function n(a, b, c, d, e) {
        var f = (65535 & a) + (65535 & b) + (65535 & c) + (65535 & d) + (65535 & e);
        return ((a >>> 16) + (b >>> 16) + (c >>> 16) + (d >>> 16) + (e >>> 16) + (f >>> 16) & 65535) << 16 | 65535 & f
    }

    function o(a, b) {
        var c, d, e, f, g, h, o, p, q, r = [],
            s = k,
            t = j,
            u = l,
            v = i,
            w = m,
            x = n,
            y = [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
        for (a[b >>> 5] |= 128 << 24 - b % 32, a[(b + 65 >>> 9 << 4) + 15] = b, q = a.length, o = 0; q > o; o += 16) {
            for (c = y[0], d = y[1], e = y[2], f = y[3], g = y[4], p = 0; 80 > p; p += 1) r[p] = 16 > p ? a[p + o] : v(r[p - 3] ^ r[p - 8] ^ r[p - 14] ^ r[p - 16], 1), h = 20 > p ? x(v(c, 5), s(d, e, f), g, 1518500249, r[p]) : 40 > p ? x(v(c, 5), t(d, e, f), g, 1859775393, r[p]) : 60 > p ? x(v(c, 5), u(d, e, f), g, 2400959708, r[p]) : x(v(c, 5), t(d, e, f), g, 3395469782, r[p]), g = f, f = e, e = v(d, 30), d = c, c = h;
            y[0] = w(c, y[0]), y[1] = w(d, y[1]), y[2] = w(e, y[2]), y[3] = w(f, y[3]), y[4] = w(g, y[4])
        }
        return y
    }

    "function" == typeof define ?
        define(function () {
            return b
        }) :
        "undefined" != typeof exports ?
            "undefined" != typeof module && module.exports ?
                module.exports = exports = b :
                exports = b :
            a.jsSHA = b
})(this);

var wechatUtils = function () {
    function a(a, c, d, g, h) {
        f = "", e = "";
        var i = c.obj.name,
            j = c.obj.cover,
            k = c.obj.description || "",
            l = a;
        a.indexOf("toPage") > -1 && (l = yxbCore.delQueStr(a, "toPage"));
        var k = c.obj.description || "",
            m = c.obj.property;
        if (c.list) a: for (var n = 0; n < c.list.length; n++)
            if (c.list[n].elements)
                for (var o = 0; o < c.list[n].elements.length; o++)
                    if (("401" == c.list[n].elements[o].type || "201" == c.list[n].elements[o].type) && "share" == c.list[n].elements[o].properties.type) {
                        l.indexOf("&userKey=") > -1 ? l = l.split("&userKey=")[0] : l.indexOf("?userKey=") > -1 && (l = l.split("?userKey=")[0]), f = Date.now() + "" + Math.floor(1e5 * Math.random()), e += (/\?/.test(l) ? "&" : "?") + "userKey=" + f;
                        break a
                    }
        d && g && (e = "", l.indexOf("&userKey=") > -1 ? l = l.split("&userKey=")[0] : l.indexOf("?userKey=") > -1 && (l = l.split("?userKey=")[0]), f = Date.now() + "" + Math.floor(1e5 * Math.random()), e += (/\?/.test(l) ? "&" : "?") + "userKey=" + f),
        d && g && (window.wxCompData[d] = g),
            m && "1" == m.showShareCount ? (c.map || (c.map = {}, c.map.shareCount = 0), $.ajax({
                type: "GET",
                url: PREFIX_S1_URL + "eqs/scene/pv?sceneId=" + window.scene.id,
                xhrFields: {
                    withCredentials: !0
                },
                error: function (a) {
                    //alert("服务器异常！")
                },
                success: function (a) {
                    k += "我是第" + a + "位" + m.shareDes, k || (k = " "), b(i, k, l, e, j)
                }
            })) : (k || (k = " "), b(i, k, l, e, j)),
        h && $("#media") && $("#media").get(0) && $("#media").get(0).play()
    }

    function b(a, b, d, e, f) {
        var g = d + e,
            h = scene.dsAppId ? DS.linkChange(g) : g;
        wx.onMenuShareTimeline({
            title: a,
            link: h,
            imgUrl: PREFIX_FILE_HOST + f,
            success: function () {
                scene.dsAppId && DS.sendRepost("timeline"), c(wxCompData)
            },
            cancel: function () {
            }
        }), wx.onMenuShareAppMessage({
            title: a,
            desc: b,
            link: h,
            imgUrl: PREFIX_FILE_HOST + f,
            success: function () {
                scene.dsAppId && DS.sendRepost("appMessage"), c(wxCompData)
            },
            cancel: function (a) {
                // console.log(a)
            }
        }), wx.onMenuShareQQ({
            title: a,
            desc: b,
            link: g,
            imgUrl: PREFIX_FILE_HOST + f,
            success: function () {
            },
            cancel: function () {
            }
        }), wx.onMenuShareWeibo({
            title: a,
            desc: b,
            link: g,
            imgUrl: PREFIX_FILE_HOST + f,
            success: function () {
            },
            cancel: function () {
            }
        })
    }

    function c(a) {
        if (f) {
            var b = {
                userKey: f
            };
            weChatUser && weChatUser.headimgurl && (a.shareUserHeader = weChatUser.headimgurl), weChatUser && weChatUser.headimgurl && (a.shareUserName = weChatUser.nickname), b.data = JSON.stringify(a), $.ajax({
                type: "POST",
                url: PREFIX_S1_URL + "eqs/wx/component",
                data: $.param(b),
                error: function (a) {
                    // alert(JSON.stringify(a))
                },
                success: function (a) {
                }
            })
        }
    }

    function d(a, b) {
        var c = PREFIX_S1_URL + "index.php?c=eqs&a=wxuser";
        $.ajax({
            type: "GET",
            url: c,
            xhrFields: {
                withCredentials: !0
            },
            success: function (d) {
                if (200 === d.code)
                    if (d.obj) window.weChatUser = d.obj, a();
                    else {
                        var e = yxbCore.getDomain(window.location.href),
                            f = "";
                        b && (f = "?toPage=" + b), yxbCore.getQueryString("userKey") && (f = (/\?/.test(c) ? "&" : "?") + "userKey=" + yxbCore.getQueryString("userKey")), window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + APPID_WX + "&redirect_uri=" + encodeURIComponent(PREFIX_S1_URL + "eqs/wx/user/info") + "&response_type=code&scope=snsapi_userinfo&state=" + encodeURIComponent("http://" + e + "/v/" + window.scene.code + f) + "#wechat_redirect"
                    }
                else {
                    // alert("error")
                }
            },
            error: function (a) {
            },
            crossDomain: !0
        })
    }

    var e, f;
    return {
        shareWeixinWhenReady: a,
        shareWidthSDK: b,
        saveComponentInfo: c,
        weChatAuth: d
    }
}(window);

(function () {
    function a(b, c) {
        var d = 0;
        $.each(c, function (e, f) {
            "shareUserHeader" != e && "shareUserName" != e && (d++, 1 == d && wx.downloadImage({
                serverId: f,
                isShowProgressTips: 0,
                success: function (d) {
                    yxbCore.responsiveImage(d.localId, b, e, $("#inside_" + e), $("#" + e)), delete c[e], a(b, c)
                },
                fail: function (a) {
                    $("#" + e).css("display", "block")
                }
            }))
        })
    }

    wechatUtils.wechatImgUpload = function (b, c) {
        var d, e, f = c.list;
        if ($(document).on("wx.img.upload", function (a, g) {
                wx.chooseImage({
                    count: 1,
                    sizeType: ["original", "compressed"],
                    sourceType: ["album", "camera"],
                    success: function (a) {
                        d = a.localIds, setTimeout(function () {
                            wx.uploadImage({
                                localId: d.toString(),
                                isShowProgressTips: 1,
                                success: function (a) {
                                    yxbCore.responsiveImage(d, f, g, $("#inside_" + g), $("#" + g)), e = a.serverId, wechatUtils.shareWeixinWhenReady(b, c, g, e, !1)
                                }
                            })
                        }, 100)
                    }
                })
            }), c.map && c.map.wxComponent) {
            var g = $.extend(!0, {}, c.map.wxComponent);
            a(c.list, g)
        }
    }
})();

(function () {
    var a, b = {};
    wechatUtils.wechatAudioUpload = function (c, d) {
        function e(a, e) {
            b[e] = a, wx.uploadVoice({
                localId: a,
                isShowProgressTips: 1,
                success: function (a) {
                    var b = a.serverId;
                    wechatUtils.shareWeixinWhenReady(c, d, "wxp" + e.substring(3), b, !1)
                }
            })
        }

        function f(a) {
            var b = document.createElement("audio");
            b.src = a, b.play(), $(b).bind("ended", function () {
                yxbCore.executePlay()
            })
        }

        function g(a, b) {
            $("#panel" + a).length && $("#panel" + a).remove();
            var c = $("#wxp" + a.substring(3)),
                d = '<div class="voice-panel" id="panel' + a + '"><span class="icon eqf-voice"></span><div class="voice-tip">松开手指 停止录音</div></div>';
            $(d).prependTo(".z-current"), c.addClass("background-transform"), j = setInterval(function () {
                b++, c.toggleClass("green-back"), b >= 50 && $("#panel" + a).text(60 - b), 60 == b && (clearInterval(j), $("#panel" + a).remove(), c.removeClass("green-back"), wx.onVoiceRecordEnd({
                    complete: function (c) {
                        b = 0, $(document).trigger("wx.audio.recordend", a), yxbCore.executePlay(), e(c.localId, a)
                    }
                }))
            }, 1e3)
        }

        var h, i = 0;
        $(document).on("wx.audio.record", function (a, b) {
            wx.startRecord({
                success: function (a) {
                    yxbCore.executePause(), h = !0, i = 0, g(b, i)
                }
            }), $("#" + b).addClass("recording").text("松开 结束")
        }), $(document).on("wx.audio.recordend", function (a, b) {
            j && clearInterval(j), $("#" + b).removeClass("recording").text("按住 说话"), $("#panel" + b).remove(), $("#wxp" + b.substring(3)).removeClass("green-back"), wx.stopRecord({
                success: function (a) {
                    i = 0, yxbCore.executePlay(), e(a.localId, b)
                },
                error: function (a) {
                    // alert(JSON.stringify(a))
                }
            })
        }), $(document).on("wx.audio.play", function (c, e) {
            var g = ($("#media").get(0), CLIENT_CDN + "assets/audio/wexin_sound.mp3");
            utilSound.pause(), b["wxr" + e.substring(3)] ? (a = b["wxr" + e.substring(3)], yxbCore.executePause(), wx.playVoice({
                localId: a
            })) : d.map && d.map.wxComponent && d.map.wxComponent[e] ? wx.downloadVoice({
                serverId: d.map.wxComponent[e],
                isShowProgressTips: 1,
                success: function (b) {
                    var c = a = b.localId;
                    yxbCore.executePause(), wx.playVoice({
                        localId: c
                    })
                },
                error: function (a) {
                    yxbCore.executePause(), f(g)
                }
            }) : (yxbCore.executePause(), f(g)), wx.onVoicePlayEnd({
                success: function (a) {
                    yxbCore.executePlay()
                }
            })
        });
        var j
    }, wechatUtils.stopWechatSound = function () {
        a && wx.stopVoice({
            localId: a
        })
    }
})();

var wechatConfig = function () {
    function a(a) {
        var e = location.href.split("#")[0],
            f = Date.now(),
            g = "index.php?c=eqs&a=ticket",
            h = new RegExp(d.replace("h5.", "")),
            i = new RegExp(d.replace("h5.", "").replace("cn", "com"));
        h.test(e) || i.test(e) || (g += (/\?/.test(g) ? "&" : "?") + "domain=" + c), g += (/\?/.test(g) ? "&" : "?") + "time=" + (new Date).getTime(), $.ajax({
            type: "GET",
            url: PREFIX_S1_URL + g,
            crossDomain: !0
        }).then(function (c) {
            c.success && c.obj.appId && c.obj.ticket && -1 != c.obj.ticket && b(c.obj.appId, c.obj.ticket, a, f)
        }, function (a) {
        })
    }

    function b(a, b, c, d) {
        var e = location.href.split("#")[0],
            f = "eqxiuview",
            g = "jsapi_ticket=" + b + "&noncestr=" + f + "&timestamp=" + d + "&url=" + e,
            h = new jsSHA(g, "TEXT"),
            i = h.getHash("SHA-1", "HEX");
        wx.config({
            debug: !1,
            appId: a,
            timestamp: d,
            nonceStr: f,
            signature: i,
            jsApiList: ["checkJsApi", "onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo", "chooseImage", "previewImage", "uploadImage", "downloadImage", "startRecord", "stopRecord", "onVoiceRecordEnd", "playVoice", "pauseVoice", "stopVoice", "onVoicePlayEnd", "uploadVoice", "downloadVoice"]
        }), wx.ready(function () {
            wechatUtils.shareWeixinWhenReady(e, c, null, null, !0), wechatUtils.wechatImgUpload(e, c), wechatUtils.wechatAudioUpload(e, c)
        })
    }

    var c = yxbCore.getDomain(window.location.href),
        d = yxbCore.getDomain(PREFIX_SHOW_HOST);
    return {
        configWeixin: a
    }
}(window);

(function (a) {
    a.completeEffect = function (a) {
        return a.find(".lock").get(0) ? !1 : !0
    }
})(window, jQuery);

// eqx effects
(function () {
    window.eqx = {};
    window.eqx.money = {
        config: {
            mode: 3,
            effectCallback: "editMoney",
            imageCallback: "countMoney",
            resources: [{
                url: CLIENT_CDN + "common/js/countMoney.js",
                type: "js"
            }, {
                url: CLIENT_CDN + "assets/images/money/moneybg.png",
                type: "image"
            }, {
                url: CLIENT_CDN + "assets/images/money/moremoney.png",
                type: "image"
            }, {
                url: CLIENT_CDN + "assets/images/money/flymoney.png",
                type: "image"
            }, {
                url: CLIENT_CDN + "assets/images/money/float.png",
                type: "image"
            }, {
                url: CLIENT_CDN + "assets/images/money/float2.png",
                type: "image"
            }, {
                url: CLIENT_CDN + "assets/images/money/float3.png",
                type: "image"
            }]
        }
    };
    window.eqx.snowFly = {
        config: {
            mode: 4,
            effectCallback: "flyAction",
            resources: [{
                url: CLIENT_CDN + "common/js/snoweffect.js",
                type: "js"
            }, {
                url: CLIENT_CDN + "common/js/threecanvas.js",
                type: "js"
            }]
        }
    };
    window.eqx.rainyDay = {
        config: {
            mode: 4,
            effectCallback: "rainyEffect",
            resources: [{
                url: CLIENT_CDN + "common/js/rainyday.js",
                type: "js"
            }, {
                url: CLIENT_CDN + "common/js/rainyeffect.js",
                type: "js"
            }]
        }
    };
    window.eqx.fireWorks = {
        config: {
            mode: 4,
            effectCallback: "fireWorks",
            resources: [{
                url: CLIENT_CDN + "common/js/fireworks.js",
                type: "js"
            }]
        }
    };
})();

// window resources
(function () {
    function load(a) {
        resources.loaded = !0;
        a instanceof Array ?
            a.forEach(function (a) {
                b(a)
            }) : b(a)
    }

    function b(a) {
        if ("loading" !== f[a.url]) {

            if (f[a.url]) return f[a.url];

            f[a.url] = !1;
            if ("image" === a.type) {
                var b = new Image;
                f[a.url] = "loading";
                b.onload = function () {
                    f[a.url] = b;
                    isReady() && g.forEach(function (a) {
                        a()
                    })
                };
                b.src = a.url
            } else {
                "js" === a.type && (f[a.url] = "loading", $.getScript(a.url, function () {
                    f[a.url] = !0;
                    isReady() && g.forEach(function (a) {
                        a()
                    })
                }))
            }
        }
    }

    function get(a) {
        return f[a]
    }

    function isReady() {
        var a = !0;
        for (var b in f)
            if (f.hasOwnProperty(b) && (!f[b] || "loading" === f[b])) return !1;
        return a
    }

    function onReady(a) {
        g.push(a)
    }

    var f = {},
        g = [];
    window.resources = {
        load: load,
        get: get,
        onReady: onReady,
        isReady: isReady
    }
})();

(function (window, b) {
    function c(a, c) {
        completeEffect(b(".z-current")) &&
        (
            E = "started",
            D.length || (D = n.find(".main-page")),
            c ||
            (
                B ?
                    (a = event, q = {
                        x: a.touches[0].pageX - n.offset().left,
                        y: a.touches[0].pageY - n.offset().top
                    }) :
                    q = {
                        x: a.pageX - n.offset().left,
                        y: a.pageY - n.offset().top
                    }
            )
        )
    }

    function d(a, c) {
        E = "turning";
        W &&
        W.obj.property.autoFlip &&
        W.obj.property.autoFlipTime &&
        m();

        c ||
        (
            B ?
                (a = event, r = {
                    x: a.touches[0].pageX - n.offset().left,
                    y: a.touches[0].pageY - n.offset().top
                }) :
                r = {
                    x: a.pageX - n.offset().left,
                    y: a.pageY - n.offset().top
                }
        );

        s = r.x - q.x;

        if (0 > s) {
            if (x) {
                x = !1;
                B && p ?
                    v = !0 :
                    q.y >= n.height() / 2 ?
                        t = !0 :
                        q.y < n.height() / 2 && (u = !0);

                y = b(".z-current").get(0);

                var d = b(y).find(".m-img").attr("id").substring(4);


                o = b("#flip" + d);
                Z ||
                (
                    z = b(y).parent(".flip-mask").get(0).nextElementSibling &&
                    b(b(y).parent(".flip-mask").get(0).nextElementSibling).find(".main-page").get(0) ?
                        b(b(y).parent(".flip-mask").get(0).nextElementSibling).find(".main-page").get(0) :
                        A ?
                            D.first().get(0) :
                            !1
                );

                if (z) {
                    b(z).find(".m-img").attr("id").substring(4);
                    b(y).parent(".flip-mask").css({
                        zIndex: 100,
                        display: "block"
                    });
                    b(z).addClass("z-active").parent(".flip-mask").css({
                        zIndex: 99,
                        display: "block"
                    });
                    i(z);
                    completeEffect(b(z)) ||
                    b("#audio_btn").css("opacity", 0);

                    t ?
                        (b(".z-current").css({
                            top: o.height() - n.height() + "px",
                            left: "0"
                        }), o.css({
                            top: "-" + (o.height() - n.height()) + "px"
                        }), b(".turning").css({
                            transformOrigin: "0% 100% 0px",
                            left: n.width() + "px",
                            top: n.height() + "px"
                        })) :
                        u ?
                            b(".turning").css({
                                top: "0",
                                left: n.width() + "px",
                                transformOrigin: "0% 0% 0px"
                            }) :
                            v &&
                            (
                                b(".z-current").css({
                                    top: 0,
                                    left: b(this).width() - n.width() + "px"
                                }),
                                    o.css({
                                        top: 0,
                                        left: -(o.width() - n.width()) + "px"
                                    }),
                                    b(".turning").css({
                                        transformOrigin: "0% 100% 0px",
                                        left: n.width() + "px",
                                        top: 0
                                    })
                            )
                }
            }
        } else if (s > 0 && x) {
            x = !1;
            w = !0;
            y = b(".z-current").get(0);
            var d = b(y).find(".m-img").attr("id").substr(4);

            o = b("#flip" + d);

            Z ||
            (
                z = b(y).parent(".flip-mask").get(0).previousElementSibling &&
                b(b(y).parent(".flip-mask").get(0).previousElementSibling).find(".main-page").get(0) ?
                    b(b(y).parent(".flip-mask").get(0).previousElementSibling).find(".main-page").get(0) :
                    A ?
                        D.last().get(0) :
                        !1
            );

            z && (
                i(z),
                completeEffect(b(z)) ||
                b("#audio_btn").css("opacity", 0),
                    b(y).parent(".flip-mask").css({
                        display: "block"
                    }),
                    b(z).addClass("z-active").parent(".flip-mask").css({
                        zIndex: 99,
                        display: "block"
                    }),
                    b(".turning").css({
                        top: "0",
                        left: "0",
                        transformOrigin: "0% 0% 0px"
                    })
            )
        }

        z && f(r)
    }

    function e(a, b) {
        if (!z) return E = "feeling", t = !1, u = !1, v = !1, w = !1, void(x = !0);

        E = "leaving";

        var c, d, e, g;

        b ?
            (c = a.x, d = a.y) :
            B ?
                (c = r.x - n.offset().left, d = r.y - n.offset().top) :
                (c = a.pageX - n.offset().left, d = a.pageY - n.offset().top);

        t ?
            (F = 16, e = -n.width(), g = n.height(), C = setInterval(function () {
                c = F >= c - e ? c : c - F, d = F >= g - d ? d : d + F, f({
                    x: c,
                    y: d
                }), F >= c - e && F >= g - d && (clearInterval(C), h())
            }, 10)) :
            u ?
                (F = 16, e = -n.width(), g = 0, C = setInterval(function () {
                    c = F >= c - e ? c : c - F, d = F >= d - g ? d : d - F, f({
                        x: c,
                        y: d
                    }), F >= c - e && F >= d - g && (clearInterval(C), h())
                }, 1)) :
                v ?
                    (F = 5, e = -n.width(), C = setInterval(function () {
                        c = F >= c - e ? c : c - F, f({
                            x: c,
                            y: d
                        }), F >= c - e && (clearInterval(C), h())
                    }, 1)) :
                    w && (F = 3, e = n.width(), g = 0, C = setInterval(function () {
                        c = F >= e - c ? c : c + F, f({
                            x: c,
                            y: d
                        }), F >= e - c && (clearInterval(C), h())
                    }, 1))
    }

    function f(a) {
        t || u ? (H = n.width() - a.x, t ? I = Math.abs(n.height() - a.y) : u && (I = a.y), J = I / H, K = I / Math.sqrt(H * H + I * I), L = Math.sqrt(1 - K * K), M = Math.sqrt(H * H + I * I) / 2, N = M * J, O = Math.sqrt(N * N + M * M), P = O / J, G = 180 * Math.atan(J) / Math.PI > 0 ? 180 * Math.atan(J) / Math.PI : 0, Q = (n.width() - O) * L, R = (n.width() - O) * K * L, S = (n.width() - O) * (1 - K * K), Q >= 1 && (t ? (G > 1 ? b(".turning").css({
            width: O + "px",
            height: P + "px",
            backgroundColor: "#ff0000",
            background: "-webkit-linear-gradient(" + (180 - G) + "deg, #fff 10%, #d1cfc7 40%, #f2eee2 50%, transparent 50%, transparent 100%)",
            transform: "translateX(-" + (O - 3) + "px) translateY(-" + (P - 3) + "px) rotate(" + 2 * G + "deg) scaleX(-1)"
        }) : g(a), T = "0% 100% 0px", U = "rotate(-" + (90 - G) + "deg) translateY(" + Q + "px)", V = "rotate(" + (90 - G) + "deg) translateY(-" + R + "px) translateX(-" + S + "px)") : u && (G > 1 ? b(".turning").css({
                width: O + "px",
                height: P + "px",
                backgroundColor: "#000",
                background: "-webkit-linear-gradient(-" + (180 - G) + "deg, #fff 10%, #d1cfc7 40%, #f2eee2 50%, transparent 50%, transparent 100%)",
                transform: "translateX(-" + (O - 2) + "px) rotate(-" + 2 * G + "deg) scaleX(-1)"
            }) : g(a), T = "0% 0% 0px", U = "rotate(" + (90 - G) + "deg) translateY(-" + Q + "px)", V = "rotate(-" + (90 - G) + "deg) translateY(" + R + "px) translateX(-" + S + "px)"), o.css({
            zIndex: 100,
            transformOrigin: T,
            transform: U
        }), b(z).parent(".flip-mask").css({
            zIndex: 99,
            display: "block"
        }), b(z).css({
            zIndex: 1e3
        }), b(y).css({
            transformOrigin: T,
            transform: V
        }))) : v ? (b(".turning").css({
            width: (n.width() - a.x) / 2 + "px",
            height: n.height() + "px",
            left: a.x + "px",
            background: "-webkit-linear-gradient(left, #fff 0% , #d1cfc7 15%, #f2eee2 85%, #fff 100%)"
        }), o.css({
            transformOrigin: "0% 50% 0px",
            left: 0,
            transform: "translateX(-" + (o.width() - a.x) + "px)"
        }), b(y).css({
            transformOrigin: "0% 50% 0px",
            transform: "translateX(" + (o.width() - a.x) + "px)"
        })) : w && (o.css({
                zIndex: 100,
                transformOrigin: "0% 50% 0px",
                transform: "translateX(" + a.x + "px)"
            }), b(y).css({
                transformOrigin: "0% 50% 0px",
                transform: "translateX(-" + a.x + "px)"
            }), b(".turning").css({
                width: n.width() - a.x + "px",
                height: n.height() + "px",
                left: -(n.width() - 2 * a.x) + "px",
                background: "-webkit-linear-gradient(left, #fff 0% , #d1cfc7 15%, #f2eee2 85%, #fff 100%)"
            }))
    }

    function g(a) {
        b(".turning").css({
            width: (n.width() - a.x + 6) / 2 + "px",
            height: n.height() + "px",
            top: 0,
            left: a.x + 2 + "px",
            background: "-webkit-linear-gradient(left, #fff 0% , #d1cfc7 10%, #f2eee2 90%, #fff 100%)",
            transform: "",
            border: 0
        })
    }

    function h() {
        var a = W.list;
        W.obj.property.autoFlip && W.obj.property.autoFlipTime && l(), utilSound.pause();
        var c = b("#report0");
        c.length && c.remove(), E = "feeling", t = !1, u = !1, v = !1, w = !1, x = !0, s = 0, b(".flip-mask").css({
            transform: "",
            top: 0,
            left: 0,
            zIndex: 0
        }), b(y).removeClass("z-current").css({
            transform: "",
            top: 0,
            left: 0
        }), b(z).removeClass("z-active").addClass("z-current").css({
            transform: ""
        }), b(".turning").css({
            width: 0,
            height: 0,
            top: 0,
            left: 0,
            transform: "",
            background: "none"
        }), y = z;
        var d = b(z).find(".m-img").attr("id").substring(4);
        b("#flip" + d).css({
            zIndex: 100
        }), b("#audio_btn").css("opacity", 1), z = null;
        var e = b(y).find(".m-img").attr("id").substring(4);
        a[e - 1].elements && a[e - 1].elements.length && b.each(a[e - 1].elements, function (a, c) {
            "d" == c.type && yxbCore.getShowCount(W.obj.id).then(function (a) {
                var d = yxbCore.fixedNum(a);
                b("#" + c.id).find(".counter-number").text(d)
            })
        }), $ || yxbCore.showProgressBar(W, b("#nr").find(".main-page")), $ = !0;
    }

    function i(a) {
        if (a) {
            var c = b(a).find(".m-img").attr("id").substring(4);
            b(a).find("li").each(function (a) {
                for (var d = 0; d < W.list[c - 1].elements.length; d++) W.list[c - 1].elements[d].id == parseInt(b(this).attr("id").substring(7), 10) && eqxCommon.animation(b(this), W.list[c - 1].elements[d], "view")
            })
        }
    }

    function j() {
        "turning" != E &&
        "leaving" != E &&
        (
            q = {
                x: 0,
                y: n.height()
            },
                c(q, "mock"),
                E = "turning",
                b(".main-page").css({
                    width: n.width() + "px",
                    height: n.height() + "px"
                }),
                r = {
                    x: 0,
                    y: n.height()
                },
                w = !0,
                C = setInterval(function () {
                    r.x++;
                    d(r, "mock");
                    r.x <= 250 && (clearInterval(C), e(r, "mock"))
                }, 1)
        )
    }

    function k() {
        "turning" != E &&
        "leaving" != E &&
        (
            q = {
                x: n.width(),
                y: n.height()
            },
                c(q, "mock"),
                E = "turning",
                b(".main-page").css({
                    width: n.width() + "px",
                    height: n.height() + "px"
                }),
                r = {
                    x: n.width(),
                    y: n.height()
                },
                B && p ?
                    v = !0 :
                    t = !0,
                Y = setInterval(function () {
                    r.x -= 5;
                    r.y -= 5;
                    d(r, "mock");
                    r.x <= 200 && (clearInterval(Y), e(r, "mock"), A || z || m())
                }, 1)
        )
    }

    function l() {
        _ = setInterval(function () {
            return completeEffect(b(".z-current")) ? void k() : void m()
        }, 1e3 * X)
    }

    function m() {
        clearInterval(_)
    }


    var n = b(".nr"),
        o = null,
        p = isAndroid(),
        q = {},
        r = {},
        s = 0,
        t = !1,
        u = !1,
        v = !1,
        w = !1,
        x = !0,
        y = null,
        z = null,
        A = !1,
        B = mobilecheck(),
        C = null,
        D = [],
        E = "feeling",
        F = 0,
        G = 0,
        H = 0,
        I = 0,
        J = 0,
        K = 0,
        L = 0,
        M = 0,
        N = 0,
        O = 0,
        P = 0,
        Q = 0,
        R = 0,
        S = 0,
        T = 0,
        U = 0,
        V = 0,
        W = null,
        X = 0,
        Y = "",
        Z = !1;
    window.turnBook = function (a) {
        W = a;
        W.obj.property.autoFlip &&
        W.obj.property.autoFlipTime &&
        (X = W.obj.property.autoFlipTime, l());

        A = W.obj.property.triggerLoop;

        b('<div class="turning"></div>').appendTo(".nr");

        b(".main-page").css({
            width: b(".nr").width() + "px",
            height: b(".nr").height() + "px"
        });

        n
            .on(B ? "touchstart" : "mousedown", function (a) {
                W.obj.property.forbidHandFlip || "feeling" == E && (c(a), b(".main-page").css({
                    width: n.width() + "px",
                    height: n.height() + "px"
                }))
            })
            .on(B ? "touchmove" : "mousemove", function (a) {
                W.obj.property.forbidHandFlip || ("started" == E || "turning" == E) && d(a)
            })
            .on(B ? "touchend" : "mouseup mouseleave", function (a) {
                return !W.obj.property.forbidHandFlip && (Z = !1, b(".z-current").get(0)) ? 0 == s ? (x = !0, void(E = "feeling")) : void("turning" == E && e(a)) : void 0
            })
    };

    var $ = !1;

    window.flipBookScroll = function (a) {
        Z = !0;
        for (var c, d = 0, e = W.list.length; e > d; d++) {
            a == W.list[d].id && (c = W.list[d].num);
        }

        c || (c = a);

        y = b(".z-current").get(0);

        var f = b(y).find(".m-img").attr("id").substring(4),
            g = b(y).parent(".flip-mask").siblings(".flip-mask").find(".main-page").find("#page" + c);

        g && (z = b(g).parent(".main-page").get(0), f > c ? j() : c > f && k())
    };
    b(document).on("bookFlipPre", function (a) {
        j()
    });
    b(document).on("bookFlipNext", function (a) {
        k()
    });

    var _
})(window, jQuery);

(function (a, b) {
    function c(a, c) {
        if (!b("#report0").length) {
            var e = [];
            e[0] = '<div id="report0"></div>', e[1] = '<div id="report1"></div>', e[2] = '<div id="report2"><p><img src="' + CLIENT_CDN + '/view/images/jubao_03.png" width="50px;"></p><h1>请选择举报原因</h1></div>', e[3] = '<div id="report3"><ul id="reportList"></ul></div>', e[4] = '<div id="report4"><a id="reportSubmit" data-event="11203">提交举报</a></div>', b(e[0]).appendTo("#page" + a), b(e[1]).appendTo("#report0");
            for (var f = 2; 4 >= f; f++) b(e[f]).appendTo("#report1");
            d(c)
        }
    }

    function d(a) {
        if (g.length) return void e(g, a);
        var c = PREFIX_S1_URL + "eqs/class/expose_types";
        b.ajax({
            type: "GET",
            url: c,
            xhrFields: {
                withCredentials: !0
            },
            crossDomain: !0
        }).then(function (b) {
            b.success && (g = b.list, e(g, a))
        })
    }

    function e(a, c) {
        for (var d, e = 0, g = a.length; g > e; e++) {
            var h = '<li value="' + a[e].value + '"><span>' + a[e].name + "</span></li>";
            b(h).appendTo("#reportList")
        }
        var i = b("#reportList").find("li").eq(0);
        i.addClass("active"), d = i.val(), b("#reportList").find("li").click(function (a) {
            b(this).siblings().removeClass("active"), b(this).addClass("active"), d = b(this).val()
        }), b("#reportSubmit").click(function (a) {
            f(c, d)
        }), b("#report0").parent(".m-img").click(function (a) {
            b("#report0").remove()
        }), b("#report0").click(function (a) {
            a.stopPropagation()
        })
    }

    function f(a, c) {
        var d = PREFIX_URL + "eqs/expose",
            e = {
                sceneId: a,
                type: c
            };
        b.ajax({
            type: "POST",
            url: d,
            data: b.param(e),
            xhrFields: {
                withCredentials: !0
            },
            crossDomain: !0
        }).then(function (a) {
            a.success && (b("#report0").remove(), alert("举报成功！"))
        }, function (a) {
            b("#report0").remove()
        })
    }

    a.addReport = function (a, d) {
        var e = '',
            f = b("#page" + a).find(".edit_wrapper").find("ul");
        b(e).appendTo(f).click(function (b) {
            b.stopPropagation();
            c(a, d);
        })
    };
    var g = []
})(window, jQuery);

(function (window, $) {
    function appendActivityPage(a, b) {
        a.obj.property.activityPageId && (activityPagePromise = $.ajax({
            type: "GET",
            url: PREFIX_S2_URL + "?c=scene&a=getlastpagebg&id=" + a.obj.property.activityPageId,
            crossDomain: !0,
            success: function (a) {
                a.obj && b.push(a.obj)
            }
        }))
    }

    function internationalLastPage(a, b, c) {
        var d = '{"id":"","sceneId":"","num":2,"name":null,"properties":null,"elements":[{"id":439880,"pageId":129810,"sceneId":16060,"num":0,"type":"3","isInput":0,"title":null,"content":null,"status":1,"css":{},"properties":{"bgColor":"#E6E9EE"}},{"id":439881,"pageId":129810,"sceneId":16060,"num":1,"type":"2","isInput":0,"title":null,"content":"<div style=\\"text-align: center;\\"><span style=\\"line-height: 1; background-color: initial;\\"><font size=\\"4\\" color=\\"#888888\\"><b>场景名称</b></font></span></div>","status":1,"css":{"height":"65","zIndex":"10","width":"320","left":"0px","top":"77px"},"properties":{}},{"id":439882,"pageId":129810,"sceneId":16060,"num":1,"type":"4","isInput":0,"title":null,"content":null,"status":1,"css":{"borderRadius":"10px","borderStyle":"solid","zIndex":"9","borderColor":"rgba(0,0,0,1)","paddingTop":"0px","height":"141","backgroundColor":"","color":"","boxShadow":"0px 0px 0px #333333","borderWidth":"0px","width":"142.13709677419354","left":"92px","paddingBottom":"0px","top":"177px"},"properties":{"height":"100px","imgStyle":{"width":142,"height":142,"marginTop":"-0.5px","marginLeft":"0px"},"width":"100px","src":"group1/M00/BA/DA/yq0KA1Rq8COAAYRjAAKU4OVYum0889.jpg"}},{"id":439883,"pageId":129810,"sceneId":16060,"num":1,"type":"4","isInput":0,"title":null,"content":null,"status":1,"css":{"height":"16","zIndex":"11","width":"280","left":"21px","top":"122px"},"properties":{"height":"100px","imgStyle":{"width":280,"height":73,"marginTop":"-24px","marginLeft":"0px"},"width":"100px","src":"' + CLIENT_CDN + 'view/images/line.png"}},';
        return 100 == a.obj.bizType && isMobile && (d += '{"id":439884,"pageId":129810,"sceneId":16060,"num":1,"type":"2","isInput":0,"title":null,"content":"<div id=\\"eqx-share-container\\" style=\\"text-align: center;padding-top: 0;\\"></div>","status":1,"css":{"height":"45","zIndex":"11","width":"280","left":"21px","top":"360px","text-align": "center"},"properties":{"anim":[{"type":20,"direction":0,"duration":"1","delay":"1","countNum":"1"}]}},'), d += '{"id":439885,"pageId":129810,"sceneId":16060,"num":1,"type":"2","isInput":0,"title":null,"content":"<div style=\\"text-align: center;padding-top: 0;\\"><span style=\\"font-size: small; line-height: 1; background-color: initial;\\"><a href=\\"' + PREFIX_S1_URL + "eqs/link?id=16060&amp;url=" + encodeURIComponent(redirectUrl) + '\\" target=\\"_blank\\"><img style=\\"width: 140px;\\" src=\\"' + CLIENT_CDN + 'assets/images/available-on-the-app-store.png\\"></a></span></div>","status":1,"css":{"borderRadius":"0px","borderStyle":"solid","height":"50","paddingTop":"0px","borderColor":"rgba(222,220,227,1)","zIndex":"12","boxShadow":"0px 0px 0px rgba(200,200,200,0.6)","color":"","backgroundColor":"rgba(255,255,255,0)","borderWidth":"0px","width":"320","left":"1px","paddingBottom":"20px","top":"410px"},"properties":{"anim":{"type":1,"direction":3,"duration":"1","delay":"0.6"}}}]}'
    }

    function eqFreepage(a, b, c) {
        function d(a, b, c) {
            activityPagePromise ?
                activityPagePromise.done(function () {
                    c.list.push(a), parsePage(b, c)
                }).fail(function () {
                    c.list.push(a), parsePage(b, c)
                }) :
                (c.list.push(a), parsePage(b, c))
        }

        var e = '{"id":"","sceneId":"","num":2,"name":null,"properties":null,"elements":[{"id":439880,"pageId":129810,"sceneId":16060,"num":0,"type":"3","isInput":0,"title":null,"content":null,"status":1,"css":{},"properties":{"bgColor":"#E6E9EE"}},{"id":439881,"pageId":129810,"sceneId":16060,"num":1,"type":"2","isInput":0,"title":null,"content":"<div style=\\"text-align: center;\\"><span style=\\"line-height: 1; background-color: initial;\\"><font size=\\"4\\" color=\\"#888888\\"><b>场景名称</b></font></span></div>","status":1,"css":{"height":"65","zIndex":"10","width":"320","left":"0px","top":"77px"},"properties":{}},{"id":439882,"pageId":129810,"sceneId":16060,"num":1,"type":"2","isInput":0,"title":null,"content":"<div class=\\"bottom-logo\\" style=\\"text-align: center;cursor:pointer;height:142px;width:142px;border-radius:10px;\\"><em style=\\"color:white;line-height:142px;font-size:120px;\\" class=\\"eqf-eqxiu\\"></em></div>","status":1,"css":{"height":"157","width":"172","left":"77px","top":"170px"},"properties":{}},{"id":439883,"pageId":129810,"sceneId":16060,"num":1,"type":"2","isInput":0,"title":null,"content":"<div style=\\"width:280px;height:1px;background-color:rgba(60,60,60,0.4);cursor:pointer;position:absolute;left:0;-webkit-filter:drop-shadow(0px 1px 0px rgba(60,60,60,0.4));top:12px;\\"></div>","status":1,"css":{"height":"24","width":"280","left":"21px","top":"122px"},"properties":{}},{"id":439885,"pageId":129810,"sceneId":16060,"num":1,"type":"2","isInput":0,"title":null,"content":"<div style=\\"text-align: center;padding-top: 0;\\"><span style=\\"font-size: small; line-height: 1; background-color: initial;\\"><a href=\\"' + PREFIX_S1_URL + "index.php?c=scene&a=link&id=16060&amp;url=" + encodeURIComponent(lastpagelink) + '\\" target=\\"_blank\\"><font color=\\"#888888\\">创建一个H5？→</font><font color=\\"' + lastpagetext_color + '\\">' + lastpagetext + '</font></a></span></div>","status":1,"css":{"borderRadius":"0px","borderStyle":"solid","height":"30","paddingTop":"0px","borderColor":"rgba(222,220,227,1)","zIndex":"12","boxShadow":"0px 0px 0px rgba(200,200,200,0.6)","color":"","backgroundColor":"rgba(255,255,255,0)","borderWidth":"0px","width":"320","left":"1px","paddingBottom":"20px","top":"420px"},"properties":{"anim":{"type":1,"direction":3,"duration":"1","delay":"0.6"}}}]}';

        100 == a.obj.bizType && (e = internationalLastPage(a, b, c));

        var f = '{"id":439882,"pageId":129810,"sceneId":16060,"num":1,"type":"4","isInput":0,"title":null,"content":null,"status":1,"css":{"borderRadius":"10px","borderStyle":"solid","zIndex":"9","borderColor":"rgba(0,0,0,1)","paddingTop":"0px","height":"141","backgroundColor":"","color":"","boxShadow":"0px 0px 0px #333333","borderWidth":"0px","width":"142.13709677419354","left":"92px","paddingBottom":"0px","top":"177px"},"properties":{"height":"100px","imgStyle":{"width":142,"height":142,"marginTop":"-0.5px","marginLeft":"0px"},"width":"100px","src":"group1/M00/BA/DA/yq0KA1Rq8COAAYRjAAKU4OVYum0889.jpg"}}',
            g = '{"id":81395,"pageId":"","sceneId":"","num":1,"type":"4","isInput":0,"title":null,"content":null,"status":1,"css":{"borderRadius":"%","borderStyle":"solid","height":"158","zIndex":"1000","paddingTop":"0px","borderColor":"rgba(0,0,0,1)","boxShadow":"0 0px 0px #333333","color":"#000000","backgroundColor":"white","borderWidth":"0px","width":"158","left":"84px","paddingTop":"11px","paddingLeft":"10px","top":"170px"},"properties":{"height":"100px","imgStyle":{"width":139,"height":136,"marginTop":"0px","marginLeft":"0px"},"width":"100px","src":"group1/M00/01/30/yq0JCFQpOR-AOULFAAFBPO1yzBQ984.jpg"}}',
            h = '{"id":439882,"pageId":129810,"sceneId":16060,"num":1,"type":"2","isInput":0,"title":null,"content":"<div class=\\"bottom-logo\\" style=\\"text-align: center;cursor:pointer;height:136px;width:139px;\\"><em style=\\"color:white;line-height:136px;font-size:120px;\\" class=\\"eqf-eqxiu\\"></em></div>","status":1,"css":{"height":"158","width":"158","left":"84px","top":"170px","backgroundColor":"white"},"properties":{}}',
            i = '{"id":81465,"pageId":"","sceneId":"","num":1,"type":"2","isInput":0,"title":null,"content":"<div style=\\"text-align: center;\\"><font color=\\"#ffffff\\" size=\\"3\\">击此处进行编辑</font></div>","status":1,"css":{"zIndex":"102","height":"65","width":"320","left":"0px","top":"70px"},"properties":{}}',
            j = '{"id":2557867,"pageId":129810,"sceneId":16060,"num":1,"type":"2","isInput":0,"title":null,"content":"<div class=\\"logo-shadow1\\" style=\\"text-align: center;cursor:pointer;height:127px;width:220px;transform:rotate(-45deg);-webkit-transform:rotate(-45deg);position:absolute;left:20px;top:56px;\\"></div>","status":1,"css":{"height":"257","width":"257","left":"78px","top":"175px"},"properties":{}}',
            k = '{"id":439883,"pageId":129810,"sceneId":16060,"num":1,"type":"2","isInput":0,"title":null,"content":"<div style=\\"width:280px;height:1px;background-color:rgba(60,60,60,0.4);cursor:pointer;position:absolute;left:0;-webkit-filter:drop-shadow(0px 1px 0px rgba(60,60,60,0.4));top:12px;\\"></div>","status":1,"css":{"height":"24","width":"280","left":"21px","top":"122px"},"properties":{}}';

        ad = 1;
        if (a.obj.property.lastPageId) {
            customLastPage = !0;
            $.ajax({
                type: "GET",
                url: PREFIX_S2_URL + "?c=scene&a=getlastpagebg&id=" + a.obj.property.lastPageId,
                crossDomain: !0,
                success: function (c) {
                    if (!c.obj) {
                        e = e.replace(/id=16060/, "id=" + a.obj.id);
                        var f = JSON.parse(e);
                        f.num = a.list.length + 1;
                        f.elements[2].properties.src = a.obj.cover.replace("/strip", "");
                        f.elements[1].content = f.elements[1].content.replace(/场景名称/, a.obj.name);
                        f.elements[1].properties.height = 65;
                        f.elements[1].height = 65;

                        return void d(f, b, a)
                    }

                    c.obj.sceneId = a.obj.id;

                    for (var l, m = 0; m < c.obj.elements.length; m++) {
                        "4" != c.obj.elements[m].type ||
                        "group1/M00/A5/5E/yq0KA1QmePmAKr7yAAEByp5jyLc752.jpg" != c.obj.elements[m].properties.src &&
                        "group1/M00/C5/9D/yq0KA1SH1zuAFgkLAAAFgBR8hJs456.png" != c.obj.elements[m].properties.src &&
                        "group1/M00/C5/3F/yq0KA1SHp-2AQZZZAAB-7rIaK6I743.png" != c.obj.elements[m].properties.src &&
                        "group1/M00/C5/9D/yq0KA1SH1zuAeQuFAAAFfUkeXDc110.png" != c.obj.elements[m].properties.src ||
                        (c.obj.elements.splice(m, 1), m--);
                    }

                    "group1/M00/61/8A/yq0KA1T2vYSAEgo7AACovQVgHxk048.jpg" != a.obj.cover ?
                        (l = JSON.parse(g), l.properties.src = a.obj.cover.replace("/strip", "")) :
                        l = JSON.parse(h);

                    c.obj.elements.push(l);
                    c.obj.elements.push(JSON.parse(j));
                    c.obj.elements.push(JSON.parse(k));

                    var n = JSON.parse(i);

                    n.content = n.content.replace(/击此处进行编辑/, a.obj.name);
                    c.obj.elements.push(n);

                    // for (var m = 0; m < c.obj.elements.length; m++) "2" === c.obj.elements[m].type ? /http:\/\/service.eqxiu.com\/eqs\/link/.test(c.obj.elements[m].content) && (c.obj.elements[m].content = c.obj.elements[m].content.replace(/;url=.*com"/, ";url=" + encodeURIComponent(redirectUrl) + '"')) : "3" === c.obj.elements[m].type && c.obj.elements[m].properties.imgSrc ? c.obj.elements[m].properties.imgSrc = window.moblieViewImgBg ? window.moblieViewImgBg + c.obj.elements[m].properties.imgSrc : c.obj.elements[m].properties.imgSrc : "4" === c.obj.elements[m].type && c.obj.elements[m].properties.src && (c.obj.elements[m].properties.src = window.moblieViewImgBg ? window.moblieViewImgBg + c.obj.elements[m].properties.src : c.obj.elements[m].properties.src);
                    d(c.obj, b, a)
                }
            });
        } else {
            e = e.replace(/id=16060/, "id=" + a.obj.id);

            var l = JSON.parse(e);

            l.num = a.list.length + 1;
            a.obj.cover = window.moblieViewImgBg ?
                window.moblieViewImgBg + a.obj.cover :
                a.obj.cover;

            "group1/M00/00/0D/wKj5L1aog9iANhl8AAAdI0Feqt0377.jpg" != a.obj.cover &&
            (l.elements[2] = JSON.parse(f), l.elements[2].properties.src = a.obj.cover.replace("/strip", ""));
            l.elements[1].content = l.elements[1].content.replace(/场景名称/, a.obj.name);

            d(l, b, a);
        }
    }

    function eqDefaultBottomLabel(a, b) {

        var c = '{"id":480292,"pageId":136042,"sceneId":16060,"num":1,"type":"2","isInput":0,"title":null,"content":"<div style=\\"text-align: center;transform: none;-webkit-animation: fadeIn 2s ease 1s both;-webkit-animation-play-state: initial;\\"><a href=\\"' + PREFIX_S1_URL + "eqs/link?id=16060&amp;url=" + encodeURIComponent(redirectUrl) + '\\" target=\\"_blank\\" style=\\"font-size: x-small;display:block;line-height: 10px;\\" data-event=\\"1120202\\"><font color=\\"#ffffff\\">' + companyName + '</font></a></div>","status":1,"css":{"zIndex":"1000","height":"20","width":"129","left":"97px","top":"418px","backgroundColor":"rgba(0,0,0,0.6)","borderRadius":"20px"},"properties":{"anim":{"type":0,"direction":0,"duration":2,"delay":"0"}}}';

        ad = 2;
        var d;

        c = c.replace(/id=16060/, "id=" + a.obj.id);
        d = b[b.length - 1].elements;

        b[b.length - 1].properties &&
        b[b.length - 1].properties.longPage &&
        (c = c.replace("418px", 486 * b[b.length - 1].properties.longPage - 68 + "px"));

        b[b.length - 1].elements ||
        (d = b[b.length - 1].elements = []);

        d.push(JSON.parse(c));

        parsePage(b, a);
    }

    function eqCustomBottomLabel(a, b) {
        ad = 2;

        $.ajax({
            type: "GET",
            url: PREFIX_S2_URL + "?c=scene&a=getlastpagebg&id=" + a.obj.property.bottomLabel.id,
            crossDomain: !0,
            success: function (c) {
                if (!c.obj) return void eqDefaultBottomLabel(a, b);

                var d = c.obj.elements;
                if (b[b.length - 1].properties && b[b.length - 1].properties.longPage) {
                    for (var e = b[b.length - 1].properties.longPage - 1, f = 0; f < d.length; f++) {
                        d[f].css.top += 486 * e;
                    }
                }
                var f = 0;
                for (d.length; f < d.length; f++) {
                    var g = d[f];
                    if (g.sceneId = a.obj.id, g.pageId = b[b.length - 1].id, a.obj.property.bottomLabel.name && a.obj.property.bottomLabel.url && "http://" != a.obj.property.bottomLabel.url) {
                        2 == g.type &&
                        g.content.indexOf("") > 0 &&
                        (
                            g.content = g.content.replace(/EQXIU.COM科技公司/, '<a href="' + PREFIX_S1_URL + "eqs/link?id=" + a.obj.id + "&amp;url=" + encodeURIComponent(a.obj.property.bottomLabel.url) + '" target=_blank data-event="1120203">' + a.obj.property.bottomLabel.name + "</a>")
                        );
                    } else if (a.obj.property.bottomLabel.name) {
                        2 == g.type && g.content.indexOf("") > 0
                    } else if (/营销宝技术支持/.test(g.content)) {
                        g.content = '<div style="text-align: center;">' + g.content + "</div>";
                        var h = {
                            zIndex: "1000",
                            height: "33",
                            width: "129",
                            left: "97px"
                        };
                        $.extend(g.css, h)
                    } else {
                        2 == g.type && g.content && (g.content = "");
                    }

                    g.css.zIndex = 200;
                    a.list[a.list.length - 1].elements ||
                    (a.list[a.list.length - 1].elements = []);

                    a.list[a.list.length - 1].elements.push(g);
                    customLastPage = !0
                }
                parsePage(b, a)
            }
        })
    }

    function eqHideAll(a, b) {
        ad = 0;
        parsePage(b, a);
    }

    function parsePage(a, b) {
        var c = b.map;
        c && c.wxComponent && $.each(c.wxComponent, function (b, c) {
            $.each(a, function (a, c) {
                c.elements && c.elements.length && $.each(c.elements, function (a, c) {
                    b == c.id && (c.properties.wxSrc = !0)
                })
            })
        });

        window.eqxiuSvg ?
            window.eqxiuSvg.SYMBOLS || (window.eqxiuSvg.SYMBOLS = {}) :
            window.eqxiuSvg = {
                SYMBOLS: {}
            };

        var d = [], e = !1, f = !1,
            g = {
                bgAudio: b.obj.bgAudio
            },
            h = [];

        for (var i = 1; i <= a.length; i++) {
            a[i - 1].elements &&
            a[i - 1].elements.length &&
            $.each(a[i - 1].elements, function (a, b) {
                if ("h" == b.type && b.properties.type && b.properties.type.indexOf("symbols") >= 0) {
                    f = !0;
                    var c = b.properties.type.replace(/^symbols\-/, ""),
                        d = CLIENT_CDN + "view/js/shape/" + c + ".js";
                    h.push({
                        url: d,
                        type: "js"
                    })
                }
            });
        }
        var j = 0;
        f && (resources.load(h), resources.onReady(function () {
            if (j++, 1 == j) {
                for (var c = 1; c <= a.length; c++) {
                    var f = c;

                    a[f - 1].properties &&
                    !$.isEmptyObject(a[f - 1].properties) ?
                        a[f - 1].properties.image ||
                        a[f - 1].properties.scratch ?
                            scriptLoaded.scratch ?
                                addScratchEffect(a, f) :
                                (function (b) {
                                    $.getScript(CLIENT_CDN + "common/js/scratch_effect.js", function (c, d, e) {
                                        scriptLoaded.scratch = !0, addScratchEffect(g, a, b)
                                    })
                                })(f) :
                            a[f - 1].properties.finger ?
                                (
                                    d.push({
                                        num: f,
                                        finger: a[f - 1].properties.finger
                                    }),
                                    e || (e = !0, $.getScript(CLIENT_CDN + "common/js/lock_effect.js", function (b, c, e) {
                                        lockEffect(g, a, d, $(".m-img").width(), $(".m-img").height())
                                    }))
                                ) :
                                a[f - 1].properties.fallingObject ?
                                    scriptLoaded.fallingObject ?
                                        fallingObject(a, f) :
                                        (function (b) {
                                            $.getScript(CLIENT_CDN + "common/js/falling_object.js", function (c, d, e) {
                                                scriptLoaded.fallingObject = !0;
                                                fallingObject(a, b);
                                                1 == b && yxbCore.playVideo(g);
                                            })
                                        })(f) :
                                    a[f - 1].properties.effect ?
                                        (function (b) {
                                            resources.load(window.eqx[a[b - 1].properties.effect.name].config.resources);
                                            resources.onReady(function () {
                                                window[a[b - 1].properties.effect.name].doEffect(g, b, a, renderPage)
                                            })
                                        })(f) :
                                        renderPage(yxbCore, f, a) :
                        (renderPage(yxbCore, f, a), 1 == f && yxbCore.playVideo(g))

                    if (c == a.length) {
                        eqxiu.app($(".nr"), b.obj.pageMode, a, b);

                        addEnabledClassToPageCtrl(b);

                        var h = yxbCore.getQueryString("toPage");

                        h && eqxiu.pageScroll(h, !0)
                    }
                }
                addReportToLastPage(a, b)
            }
        }));

        for (var k = 1; k <= a.length; k++) {

            $('<section class="main-page"><div class="m-img" id="page' + k + '"></div></section>').appendTo(".nr");
            10 == pageMode &&
            (
                $("#page" + k).parent(".main-page").wrap('<div class="flip-mask" id="flip' + k + '"></div>'),
                    $(".main-page").css({
                        width: $(".nr").width() + "px",
                        height: $(".nr").height() + "px"
                    })
            );

            a.length > 1 &&
            14 != pageMode &&
            !b.obj.property.forbidHandFlip &&
            (
                0 == pageMode ||
                1 == pageMode ||
                2 == pageMode ||
                6 == pageMode ||
                7 == pageMode ||
                8 == pageMode ||
                11 == pageMode ||
                12 == pageMode ||
                13 == pageMode ||
                14 == pageMode ?
                    $('<section class="u-arrow-bottom"><div class="pre-wrap"><div class="pre-box1"><div class="pre1"></div></div><div class="pre-box2"><div class="pre2"></div></div></div></section>').appendTo("#page" + k) :
                    (3 == pageMode || 4 == pageMode || 5 == pageMode || 9 == pageMode || 10 == pageMode) &&
                    $('<section class="u-arrow-right"><div class="pre-wrap-right"><div class="pre-box3"><div class="pre3"></div></div><div class="pre-box4"><div class="pre4"></div></div></div></section>').appendTo("#page" + k));

            1 == k &&
            (
                $(".loading").hide(),
                    $(".main-page").eq(0).addClass("z-current"),
                a[k - 1].elements &&
                a[k - 1].elements.length &&
                $.each(a[k - 1].elements, function (a, c) {
                    "d" == c.type && yxbCore.getShowCount(b.obj.id)
                })
            );

            if (!f && (a[k - 1].properties && !$.isEmptyObject(a[k - 1].properties) ? a[k - 1].properties.image || a[k - 1].properties.scratch ? scriptLoaded.scratch ? addScratchEffect(a, k) : !
                    function (b) {
                        $.getScript(CLIENT_CDN + "common/js/scratch_effect.js", function (c, d, e) {
                            scriptLoaded.scratch = !0, addScratchEffect(g, a, b)
                        })
                    }(k) : a[k - 1].properties.finger ? (d.push({
                    num: k,
                    finger: a[k - 1].properties.finger
                }), e || (e = !0, $.getScript(CLIENT_CDN + "common/js/lock_effect.js", function (b, c, e) {
                    test(g, a, d, $(".m-img").width(), $(".m-img").height())
                }))) : a[k - 1].properties.fallingObject ? scriptLoaded.fallingObject ? a[k - 1].effObj = fallingObject(a, k) : !
                    function (b) {
                        $.getScript(CLIENT_CDN + "common/js/falling_object.js", function (c, d, e) {
                            scriptLoaded.fallingObject = !0, a[b - 1].effObj = fallingObject(a, b), 1 == b && yxbCore.playVideo(g)
                        })
                    }(k) : a[k - 1].properties.effect ? !
                    function (b) {
                        resources.load(window.eqx[a[b - 1].properties.effect.name].config.resources), resources.onReady(function () {
                            a[b - 1].effObj = window[a[b - 1].properties.effect.name].doEffect(g, b, a, renderPage)
                        })
                    }(k) : (renderPage(yxbCore, k, a), 1 == k && yxbCore.playVideo(g)) : (renderPage(yxbCore, k, a), 1 == k && yxbCore.playVideo(g)), k == a.length)) {
                eqxiu.app($(".nr"), b.obj.pageMode, a, b);
                addEnabledClassToPageCtrl(b)
            }

            if (k == a.length && (isMobile || $("img").on("dragstart", function (a) {
                    a.preventDefault()
                }), !preview)) {

                var m = PREFIX_S1_URL + "index.php?c=scene&a=addpv&id=" + b.obj.id;

                param && (m += "&1=1", m += /\?.*/.test(param) ? "&" + param.substring(1) : /\&.*/.test(param) ? param : "&" + param);

                m += (/\?/.test(m) ? "&" : "&") + "ad=" + ad;

                $.ajax({
                    type: "GET",
                    url: m,
                    xhrFields: {
                        withCredentials: !0
                    },
                    crossDomain: !0
                })
            }
        }
        f || addReportToLastPage(a, b);
    }

    function addEnabledClassToPageCtrl(a) {
        var b, c, d = a.obj.pageMode,
            e = a.obj.property.triggerLoop;
        0 == d || 1 == d || 2 == d || 6 == d || 7 == d || 8 == d || 11 == d || 12 == d ? b = !0 : (3 == d || 4 == d || 5 == d || 10 == d) && (c = !0), setTimeout(function () {
            b ? ($(".ctrl_panel_dir .ctrl-up").addClass("enabled"), e && $(".ctrl_panel_dir .ctrl-down").addClass("enabled")) : c && ($(".ctrl_panel_dir .ctrl-left").addClass("enabled"), e && $(".ctrl_panel_dir .ctrl-right").addClass("enabled"))
        }, 0)
    }

    function addPreviewFooter() {
        var a = yxbCore.getUrlParameter("id"),
            b = PREFIX_HOST + "/mobile/fillHome.html?edit=true&id=" + a;
        yxbCore.getUrlParameter("preview") && $('<div id="shareFooter" style="background-color: rgba(51, 51, 51, 0.4);border-top: 2px solid rgba(8, 161, 239, 0.4);padding: 10px;position: fixed;bottom: 0;left: 0;right: 0;overflow: scroll;z-index: 10000;height:40px"><div  style="float: left;margin-top: 12px;margin-left: 12px;color:#FFFFFF"><laber ><a style="color:#FFFFFF" href="' + b + '">编辑</a></laber></div><div style="float: right;margin-right: 15px;margin-top:2px;"><button style="width: 80px;height: 32px;background-color: #44cb83;border: 0px;border-radius: 2px;color: #FFFFFF;"><a style="color:#FFFFFF" onclick="wapTitleSet();">分享</a></button></div></div>').appendTo(".nr")
    }

    var redirectUrl, companyName, pageMode, preview, param, ad, customLastPage = !1,
        isMobile = mobilecheck(),
        scriptLoaded = [],
        activityPagePromise = null;

    window.appendLastPage = function (a, b, c, d, e, f) {

        pageMode = c;
        preview = d;
        param = e;
        ad = f;
        100 == a.obj.bizType ?
            (
                redirectUrl = "https://itunes.apple.com/us/app/easyshow-free-h5-sence-slides/id987351120?mt=8",
                    companyName = "Hypefolio"
            ) :
            (
                redirectUrl = "http://yxb.mmarket.com",
                    companyName = "营销宝技术支持"
            );

        addPreviewFooter();
        appendActivityPage(a, b);

        if (a.obj.createTime > 14165028e5) {
            if (100 == a.obj.bizType) {
                eqFreepage(a, b);
            } else if (a.obj.property.hideEqAd) {
                eqHideAll(a, b);
            } else {
                if (a.obj.property && a.obj.property.eqAdType) {
                    switch (a.obj.property.eqAdType) {
                        case 1:
                            return void eqFreepage(a, b);
                        case 2:
                            return void eqDefaultBottomLabel(a, b);
                        case 3:
                            return void eqCustomBottomLabel(a, b)
                    }
                }
                a.obj.property.isAdvancedUser ?
                    a.obj.property &&
                    a.obj.property.bottomLabel &&
                    a.obj.property.bottomLabel.id ?
                        eqCustomBottomLabel(a, b) :
                        eqDefaultBottomLabel(a, b)
                    : eqFreepage(a, b)
            }
        } else eqHideAll(a, b)
    };

    isMobile && $(".nr").css({
        width: "100%",
        height: "100%"
    });

    window.wapTitleSet = function () {
        $.get(PREFIX_HOST + "/view/share.html", function (a) {
            $("#wapShareSet").show();
            $("#wapShareSet").html(a);
            $("#shareFooter").hide();
            wapShare.init(scene);
        })
    }
})(window, jQuery);

(function (window, $) {

    function isSample() {
        $("#view_reg").after('<div id="sample_btn">使用该样例</div>')
    }

    function fontset(a, b) {
        var p = list = a.list;
        var str = "";
        p.forEach(function (a, b) {
            var cp = a.elements;
            cp.forEach(function (a, b) {
                if (a.fonts) {
                    $.each(a.fonts, function (key, val) {
                        var c = JSON.stringify($.makeArray(val));
                        var cc = JSON.stringify($.makeArray(key));
                        d = c.substring(c.indexOf('font'), c.length - 2);
                        e = cc.substring(2, cc.length - 2);
                        //console.log(e); 
                        str = str + '@font-face{font-family: "' + e + '"; src: url("' + PREFIX_FILE_HOST + d + '") format("woff");}';
                    });
                }
            });
        });
        $("head").append('<style type="text/css">' + str + '</style>');
    }

    function getWechatAuth(a, b) {
        window.weChatUser = {};
        window.wxCompData = {};
        return void(a ? completeLoad(b) : getSceneData());

        var d = PREFIX_S1_URL + "index.php?c=eqs&a=wxuser";
        $.ajax({
            type: "GET",
            url: d,
            xhrFields: {
                withCredentials: !0
            },
            success: function (c) {
                if (200 === c.code)
                    if (c.obj) window.weChatUser = c.obj, a ? (replaceNameAndHeader(b, c.obj), completeLoad(b, !0)) : getSceneData(c.obj);
                    else {
                        var d = "";
                        yxbCore.getQueryString("userKey") && (d = "?userKey=" + yxbCore.getQueryString("userKey")), window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + APPID_WX + "&redirect_uri=" + encodeURIComponent(PREFIX_S1_URL + "eqs/wx/user/info") + "&response_type=code&scope=snsapi_userinfo&state=" + encodeURIComponent("http://" + hostDomain + "/v/" + window.scene.code + d) + "#wechat_redirect"
                    }
                else {
                    // alert("error")
                }
            },
            error: function (a) {
            },
            crossDomain: !0
        })
    }

    function getSceneData(a) {
        var b = window.viewData;
        if (b) {
            return b.obj = window.scene, replaceNameAndHeader(b, a), void completeLoad(b, !1);
        }

        window.isStatic && window.location.href.indexOf(VIP_HOST) >= 0 && (vipService = !0);

        var c = getRequestUrl(),
            d = {
                type: "GET",
                url: c,
                crossDomain: !0
            };

        window.viewOverflow ||
        vipService ||
        (d.xhrFields = {
            withCredentials: !0
        });

        $.ajax(d)
            .done(function (data) {
                data.obj =
                    data.obj ||
                    window.scene;

                replaceNameAndHeader(data, a);
                completeLoad(data, !1)
            })
    }

    function replaceNameAndHeader(data, b) {
        isWeixin() &&
        data.list &&
        data.list.length &&
        $.each(data.list, function (c, d) {
            d.elements &&
            d.elements.length &&
            $.each(d.elements, function (c, d) {
                "201" == d.type &&
                (
                    "own" == d.properties.type &&
                    b &&
                    (d.content = b.nickname),

                    "share" == d.properties.type &&
                    data.map &&
                    data.map.wxComponent &&
                    data.map.wxComponent.shareUserName &&
                    (d.content = data.map.wxComponent.shareUserName)
                );

                "401" == d.type &&
                (
                    "own" == d.properties.type &&
                    b &&
                    (d.properties.src = b.headimgurl, delete d.properties.imgStyle),

                    "share" == d.properties.type &&
                    data.map &&
                    data.map.wxComponent &&
                    data.map.wxComponent.shareUserHeader &&
                    (d.properties.src = data.map.wxComponent.shareUserHeader, delete d.properties.imgStyle)
                )
            })
        })
    }

    function completeLoad(data, b) {
        fontset(data, b);
        data.map &&
        data.map.wxComponent &&
        (window.wxCompData = data.map.wxComponent);

        getCounterValues(data);

        for (var c = !1, d = 0; d < data.list.length; d++) {
            var e = data.list[d];
            if (e.elements)
                for (var f = 0; f < e.elements.length; f++)
                    if (e.elements[f].type + "" === "m") {
                        c = !0;
                        break
                    }
        }

        if (c) {
            yxbCore.parseStart = function () {
                $(document).trigger("parseStart")
            };

            $(document).on("parseStart", function () {
                parseJson(data, b)
            });

            var g = document.createElement("script");

            g.type = "text/javascript";
            g.src = "http://map.qq.com/api/js?v=2.exp&callback=yxbCore.parseStart";
            document.body.appendChild(g)
        } else {
            parseJson(data, b)
        }
    }

    function getCounterValues(a) {
        var b = {
            sceneId: a.obj.id,
            fieldIds: ""
        };
        $.each(a.list, function (a, c) {
            c.elements && $.each(c.elements, function (a, c) {
                "i" === c.type && (b.fieldIds += (b.fieldIds ? "," : "") + c.id)
            })
        });
        b.fieldIds && (window.yxbCore.counterValues = $.ajax({
            type: "GET",
            url: PREFIX_S1_URL + "index.php?c=scene&a=countervalues",
            data: $.param(b),
            xhrFields: {
                withCredentials: !0
            },
            error: function (a) {
                // alert("Connection error")
            },
            crossDomain: !0
        }))
    }

    function getRequestUrl() {
        window.isStatic && window.location.href.indexOf(VIP_HOST) >= 0 && (vipService = !0);
        var a;

        if (preview) {
            a = isNewPreviewLocation ?
                PREFIX_URL + "m/scene/preview/" + sceneId + ".data" :
                PREFIX_URL + "m/scene/preview/" + sceneId;

            branchid && (a += (/\?/.test(a) ? "&" : "?") + "user=" + branchid);
        } else if (mobileview) {
            a = PREFIX_URL + "event/9100?p1=" + sceneId;
        } else if (window.scene && window.scene.id) {
            if (window.isCheck) {
                a = MAX_SERVER_HOST + "m/eqs/view/page/" + window.scene.id;
            } else {
                var b = window.viewOverflow || vipService ? PREFIX_S2_URL : PREFIX_S6_URL;
                a = b + "?c=scene&a=view&id=" + window.scene.id;
                var b, c = yxbCore.getQueryString("userKey"),
                    d = yxbCore.getQueryString("cache");

                if (window.viewOverflow || vipService) {
                    b = PREFIX_S2_URL;
                } else {
                    //JSON.parse(window.scene.property);
                    b =
                        null != c &&
                        c.toString().length > 1 ||
                        null != d &&
                        d.toString().length > 1 ?
                            PREFIX_S1_URL :
                            PREFIX_S6_URL
                }

                a = b + "?c=scene&a=view&id=" + window.scene.id;

                null != c &&
                c.toString().length > 1 &&
                (a += (/\?/.test(a) ? "&" : "?") + "userKey=" + c);

                null != d &&
                d.toString().length > 1 &&
                (a += (/\?/.test(a) ? "&" : "?") + "cache=" + d)
            }
        } else {
            a = PREFIX_S1_URL + "eqs/v/" + sceneId;
        }

        window.viewOverflow ||
        vipService ||
        (a += (/\?/.test(a) ? "&" : "?") + "time=" + (new Date).getTime());

        return a
    }

    function bindShare(data) {
        if (mobilecheck() || tabletCheck()) isWeixin() && wechatConfig.configWeixin(data);
        else if (100 != data.obj.bizType) with (window._bd_share_config = {
            common: {
                bdSnsKey: {},
                bdText: data.obj.name,
                bdSign: "on",
                bdMini: "2",
                bdMiniList: !1,
                bdDesc: data.obj.description ? data.obj.description : "",
                bdUrl: PREFIX_HOST + "/v/" + sceneId,
                bdPic: PREFIX_FILE_HOST + data.obj.cover,
                bdStyle: "0",
                bdSize: "32"
            },
            share: {}
        }, document) 0[(getElementsByTagName("head")[0] || body).appendChild(createElement("script")).src = "http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion=" + ~(-new Date / 36e5)]
    }

    function parseJson(data, b) {
        isNewPreviewLocation ||
        window.scene ||
        (
            document.title = data.obj.name,
                $("#metaDescription").attr("content", data.obj.name + ", " + data.obj.description + ", 由营销宝提供技术支持"),
                $(".scene_title").text(data.obj.name)
        );

        var c = data.obj.cover;

        if (isWeixin()) {
            var d = /\?imageMogr2/,
                e = /.svg/;

            e.test(c) ||
            (c += d.test(c) ? "" : "");

            $("#shareImage").find("img").attr("src", PREFIX_FILE_HOST + c)
        }

        bindShare(data);

        pageMode = data.obj.pageMode;

        var f = [];

        data.obj.property &&
        (data.obj.property = JSON.parse(data.obj.property) || {});

        data.obj.bgAudio &&
        "string" === typeof data.obj.bgAudio &&
        (data.obj.bgAudio = JSON.parse(data.obj.bgAudio) || null);

        f = data.list;

        return f.length <= 0 ?
            (
                // alert("此场景不存在!"),
                void(window.location.href = "http://yxb.mmarket.com")
            ) : void appendLastPage(data, f, pageMode, preview, param, ad)
    }

    var url, preview, mobileview, pageMode, branchid, ad = 0,
        hostDomain = yxbCore.getDomain(window.location.href),
        eqxDomain = yxbCore.getDomain(PREFIX_HOST),
        h5Domain = yxbCore.getDomain(PREFIX_SHOW_HOST);

    $.ajaxSetup({
        cache: !0
    });

    var vipService, isNewPreviewLocation = /[http|https]:\/\/.*\/m\/scene\/preview\//.test(window.location.href);

    url = /[http|https]:\/\/.*\/v\//.test(window.location.href) ?
        window.location.href.split("/v/")[1] :
        isNewPreviewLocation ?
            window.location.href.split("/m/scene/preview/")[1] :
            window.location.href.split("?sceneId=")[1];
    window.viewData && (url = scene.code);

    //wjptest
    url = "http://yxbsve.mmarket.com/v/170717008";
    var sceneId = url.split("#")[0].split("&")[0].split("?")[0];

    isNewPreviewLocation && (sceneId = sceneId.substring(0, sceneId.indexOf(".html")));
    var param = url.split(sceneId)[1];

    (param.indexOf("preview=preview") > 0 || window.preview || isNewPreviewLocation) &&
    (preview = !0);

    param.indexOf("branchid=") > 0 &&
    (branchid = param.substring(param.indexOf("branchid=") + 9));

    param.indexOf("mobileview=mobileview") > 0 && (mobileview = !0);

    if (!(mobilecheck() || tabletCheck() && window == window.top)) {
        var getBg = function () {
            $.ajax({
                type: "GET",
                url: PREFIX_S2_URL + "?c=view&a=imagePreview",
                crossDomain: !0
            })
                .then(
                    function (a) {
                        a ?
                            $("body").css("backgroundImage", "url(" + a + ")") :
                            $("body").css("backgroundImage", "url(/view/images/previewbg_spring.jpg)")
                    },
                    function () {
                        $("body").css("backgroundImage", "url(/view/images/previewbg_spring.jpg)")
                    })
        };

        window.addElmentsForPc = function (a) {
            var b = document.getElementsByTagName("head")[0],
                c = document.createElement("link");

            c.href = CLIENT_CDN + "common/css/pcviewer.css";
            c.rel = "stylesheet";
            b.appendChild(c);
            window != window.top ?
                $("body").css("background-image", "none") :
                (
                    getBg(),
                        $.getScript(CLIENT_CDN + "common/js/qrcode.js", function () {
                            $.getScript(CLIENT_CDN + "common/js/jquery.qrcode.js", function () {
                                window.scene && 100 == window.scene.bizType ? ($("#con").before('<div id="code" style="margin-top: -200px;">\n    <div style="font-size: 14px;">Share your folio on social network!</div>\n    <div class="eqx-share">\n        <a class="eqx-share-btn btn-facebook"><span class="eqx-share-icon icon-facebook"></span></a>\n        <a class="eqx-share-btn btn-twitter"><span class="eqx-share-icon icon-twitter"></span></a>\n        <a class="eqx-share-btn btn-plus"><span class="eqx-share-icon icon-google_plus"></span></a>\n        <a class="eqx-share-btn btn-linkedin"><span class="eqx-share-icon icon-linkedin"></span></a>\n        <a class="eqx-share-btn btn-pinterest"><span class="eqx-share-icon icon-pinterest"></span></a>\n        <a class="addthis_sharing_toolbox"></a>\n    </div>\n    <div id="view_reg" style="border: none;margin-bottom: 26px;"><span>\n        <a target="_blank" href="http://yxb.mmarket.com/index.html" style="color: #fff;border-bottom-color: #fff;font-size: 14px;">So Cool, Let me try it!</a>\n    </span></div>\n    <div style="text-align: center;background:#fff;padding: 10px;" id="codeImg"/> \n    <div style="text-align: center;font-size: 14px;">Scan the QR Code!</div>\n    <div id="support">Powered BY <a target="_blank" href="http://yxb.mmarket.com"><img id="logoSmall" style="width: 64px;vertical-align: bottom;" src="' + CLIENT_CDN + 'view/images/hypefolio-logo.png"/></a></div></div>'), $(".eqx-share-btn").ShareLink({
                                    title: window.scene.name,
                                    text: window.scene.description,
                                    image: PREFIX_FILE_HOST + window.scene.cover,
                                    url: window.location.href.split("#")[0],
                                    class_prefix: "btn-"
                                })) : ($("#con").before('<div id="code"><div style="margin-bottom:15px;"><div class="app" style="position:relative;"><div id="downAppView" class="zoomIn-change"><h3><a id="close" style="cursor:pointer">X</a>营销宝APP</h3><div id="downCode"></div><p style="padding-bottom:20px;padding-top:10px;">一键生成H5，随时随地查数据</p></div></div>扫一扫，分享给朋友！</div><div style="text-align: center;background:#fff;padding: 10px;" id="codeImg"/><div id="support">技术支持 BY <a target="_blank" href=' + your_demain + '><img id="logoSmall" src="../view/images/bg_small.png"/></a></div></div>'), window.scene && 1 === window.scene.isTemplate && isSample());
                                //  })) : ($("#con").before('<div id="code"><div style="margin-bottom:15px;"><div class="app" style="position:relative;"><div id="downAppView" class="zoomIn-change"><h3><a id="close" style="cursor:pointer">X</a>营销宝APP</h3><div id="downCode"></div><p style="padding-bottom:20px;padding-top:10px;">一键生成H5，随时随地查数据</p></div></div>扫一扫，分享给朋友！</div><div style="text-align: center;background:#fff;padding: 10px;" id="codeImg"/><div id="support">技术支持 BY <a target="_blank" href=' + your_demain + '><img id="logoSmall" src="' + CLIENT_CDN + 'view/images/bg_small.png"/></a></div></div>'), window.scene && 1 === window.scene.isTemplate && isSample());


                                // <div id="view_share" class="bdsharebuttonbox"><a href="#" class="bds_more" data-cmd="more"></a><a href="#" class="bds_tsina" data-cmd="tsina" title="分享到新浪微博"></a><a href="#" class="bds_tqq" data-cmd="tqq" title="分享到腾讯微博"></a><a href="#" class="bds_qzone" data-cmd="qzone" title="分享到QQ空间"></a><a href="#" class="bds_sqq" data-cmd="sqq" title="分享到QQ好友"></a><a href="#" class="bds_douban" data-cmd="douban" title="分享到豆瓣网"></a></div><div id="view_reg">这么漂亮的场景&nbsp;→<span><a target="_blank" href=' + your_demain + '>我也来制作</a></span></div>
                                var b;
                                //b = window.location.href.indexOf(eqxDomain) >= 0 || window.location.href.indexOf(h5Domain) >= 0 ? 1 == scene.userType ? PREFIX_HOST_ARRAY[Math.floor(11 * Math.random()) % 11] + "/" : 2 != scene.userType && 21 != scene.userType || scene.memberType ? 3 == scene.userType || 4 == scene.userType ? PREFIX_SERVICE_HOST + "/" : 99 == scene.userType ? PREFIX_SHOW_HOST + "/" : scene.expiryTime && new Date(scene.expiryTime).getTime() < Date.now ? PREFIX_HOST_ARRAY[Math.floor(11 * Math.random()) % 11] + "/" : PREFIX_COMPANY_HOST_ARRAY[Math.floor(2 * Math.random()) % 2] + "/" : PREFIX_HOST_ARRAY[Math.floor(11 * Math.random()) % 11] + "/" : "http://" + hostDomain + "/", window.isStatic && (b = VIP_HOST), $("#downApp").click(function() {

                                b = PREFIX_S1_URL, window.isStatic && (b = VIP_HOST), $("#downApp").click(function () {
                                    $("#downAppView").css("display", "block")
                                }), $("#close").click(function () {
                                    $("#downAppView").css("display", "none")
                                }), $("#downCode").qrcode({
                                    render: "canvas",
                                    width: 200,
                                    height: 200,
                                    text: "javascript:;"
                                }), $("#codeImg").qrcode({
                                    render: "canvas",
                                    width: 200,
                                    height: 200,
                                    text: b + "v/" + a + "?eqrcode=1"
                                })
                            })
                        }),
                        $(".p-index").wrap('<div class = "phone_panel"></div>'),
                        $('<div class = "ctrl_panel"></div>').appendTo($(".phone_panel")),
                        setTimeout(function () {
                            window.scene && 100 == window.scene.bizType ?

                                (
                                    $(".phone_menubar").addClass("hypefolio"),
                                        $('<a id = "pre_page" type = "button" class = "pre_btn btn" onclick = "eqxiu.prePage()">\n    <span style="transform: rotateZ(90deg);display: inline-block;font-size: 36px;">&lt;</span>\n</a>').prependTo($(".ctrl_panel")),
                                        $('<a id = "next_page" type = "button" class = "next_btn btn" onclick = "eqxiu.nextPage()">\n    <span style="transform: rotateZ(90deg);display: inline-block;font-size: 36px;margin-top: 5px;">&gt;</span>\n</a>').appendTo($(".ctrl_panel"))
                                ) :
                                (
                                    $('<a id = "pre_page" type = "button" class = "pre_btn btn" onclick = "eqxiu.prePage()">上一页</a>').prependTo($(".ctrl_panel")),
                                        $('<a id = "next_page" type = "button" class = "next_btn btn" onclick = "eqxiu.nextPage()">下一页</a>').appendTo($(".ctrl_panel"))
                                )
                        }, 100)
                )
        }
    }

    $("body").on("click", "#sample_btn", function () {
        window.open(PREFIX_HOST + "/scene?useTplId=" + scene.id)
    });

    window.moblieViewImgBg;

    jQuery.support.cors = !0;

    yxbCore.bootstrap = function () {
        window.viewData ?
            (window.moblieViewImgBg = PREFIX_FILE_HOST, PREFIX_FILE_HOST = "") :
            PREFIX_FILE_HOST = yxbCore.getImagesResourceHost(scene.userType, scene.memberType);

        getWechatAuth();

        yxbCore.forExemplarReview() ||
        mobilecheck() ||
        tabletCheck() &&
        window == window.top ||
        (
            addElmentsForPc(scene.id),
                $("title").text(window.scene.name + " | H5微场景制作")
        )
    };

    yxbCore.bootstrapWithPassword = function () {
        function a() {
            $("#verifyTip").addClass("shake").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () {
                $(this).removeClass("shake"), c()
            })
        }

        function b(b) {
            $("#loading").show();

            $.ajax({
                type: "GET",
                url: g,
                data: $.param({
                    password: b
                }),
                xhrFields: {
                    withCredentials: !0
                },
                success: function (b) {
                    200 === b.code ?
                        (b.obj = b.obj || window.scene, $("#verifyCode").remove(), getWechatAuth(!0, b)) :
                        ($("#loading").hide(), $("#verifyCode").show(), a())
                },
                crossDomain: !0
            })
        }

        function c() {
            $(".password-indicator li").each(function (a, b) {
                a < o.length ? $(b).addClass("active") : $(b).removeClass("active")
            })
        }

        function d(a) {
            var d = $(a.target);
            d.addClass("active"), o += d.text(), c(), 4 == o.length && (b(o), o = ""), setTimeout(function () {
                d.removeClass("active")
            }, 100)
        }

        function e(a) {
            o = "", c()
        }

        function f(a) {
            o && (o = o.substring(0, o.length - 1), c())
        }

        yxbCore.forExemplarReview() ||
        mobilecheck() ||
        tabletCheck() &&
        window == window.top ||
        addElmentsForPc(scene.id);

        var g = getRequestUrl();
        if ($("#loading").hide(), $("#verifyCode").show(), window.scene) {
            var h = {
                name: window.scene.name,
                cover: window.scene.cover,
                property: window.scene.property,
                description: window.scene.description
            };
            bindShare({
                obj: h
            })
        }
        var i = mobilecheck(),
            j = tabletCheck();
        if (!i || i && /Android (\d+\.\d+)/.test(navigator.userAgent) ? ($(".password-numbers>span").on("click", d), $("#btnClear").on("click", e), $("#btnCancel").on("click", f)) : ($(".password-numbers>span").on("touchstart", d), $("#btnClear").on("touchstart", e), $("#btnCancel").on("touchstart", f)), i || j) {
            var k, l = $(".container"),
                m = l.width(),
                n = l.height();
            k = Math.floor(10 * Math.min(document.documentElement.clientHeight / n, document.documentElement.clientWidth / m)) / 10, l.css("transform", "scale(" + k + ", " + k + ")")
        }
        var o = ""
    }

})(window, jQuery);

$(".main").show();

$.easing.jswing = $.easing.swing;

$.extend($.easing, {
    def: "easeOutQuad",
    swing: function (a, b, c, d, e) {
        return $.easing[$.easing.def](a, b, c, d, e)
    },
    easeInQuad: function (a, b, c, d, e) {
        return d * (b /= e) * b + c
    },
    easeOutQuad: function (a, b, c, d, e) {
        return -d * (b /= e) * (b - 2) + c
    },
    easeInOutQuad: function (a, b, c, d, e) {
        return (b /= e / 2) < 1 ? d / 2 * b * b + c : -d / 2 * (--b * (b - 2) - 1) + c
    },
    easeInCubic: function (a, b, c, d, e) {
        return d * (b /= e) * b * b + c
    },
    easeOutCubic: function (a, b, c, d, e) {
        return d * ((b = b / e - 1) * b * b + 1) + c
    },
    easeInOutCubic: function (a, b, c, d, e) {
        return (b /= e / 2) < 1 ? d / 2 * b * b * b + c : d / 2 * ((b -= 2) * b * b + 2) + c
    },
    easeInQuart: function (a, b, c, d, e) {
        return d * (b /= e) * b * b * b + c
    },
    easeOutQuart: function (a, b, c, d, e) {
        return -d * ((b = b / e - 1) * b * b * b - 1) + c
    },
    easeInOutQuart: function (a, b, c, d, e) {
        return (b /= e / 2) < 1 ? d / 2 * b * b * b * b + c : -d / 2 * ((b -= 2) * b * b * b - 2) + c
    },
    easeInQuint: function (a, b, c, d, e) {
        return d * (b /= e) * b * b * b * b + c
    },
    easeOutQuint: function (a, b, c, d, e) {
        return d * ((b = b / e - 1) * b * b * b * b + 1) + c
    },
    easeInOutQuint: function (a, b, c, d, e) {
        return (b /= e / 2) < 1 ? d / 2 * b * b * b * b * b + c : d / 2 * ((b -= 2) * b * b * b * b + 2) + c
    },
    easeInSine: function (a, b, c, d, e) {
        return -d * Math.cos(b / e * (Math.PI / 2)) + d + c
    },
    easeOutSine: function (a, b, c, d, e) {
        return d * Math.sin(b / e * (Math.PI / 2)) + c
    },
    easeInOutSine: function (a, b, c, d, e) {
        return -d / 2 * (Math.cos(Math.PI * b / e) - 1) + c
    },
    easeInExpo: function (a, b, c, d, e) {
        return 0 == b ? c : d * Math.pow(2, 10 * (b / e - 1)) + c
    },
    easeOutExpo: function (a, b, c, d, e) {
        return b == e ? c + d : d * (-Math.pow(2, -10 * b / e) + 1) + c
    },
    easeInOutExpo: function (a, b, c, d, e) {
        return 0 == b ? c : b == e ? c + d : (b /= e / 2) < 1 ? d / 2 * Math.pow(2, 10 * (b - 1)) + c : d / 2 * (-Math.pow(2, -10 * --b) + 2) + c
    },
    easeInCirc: function (a, b, c, d, e) {
        return -d * (Math.sqrt(1 - (b /= e) * b) - 1) + c
    },
    easeOutCirc: function (a, b, c, d, e) {
        return d * Math.sqrt(1 - (b = b / e - 1) * b) + c
    },
    easeInOutCirc: function (a, b, c, d, e) {
        return (b /= e / 2) < 1 ? -d / 2 * (Math.sqrt(1 - b * b) - 1) + c : d / 2 * (Math.sqrt(1 - (b -= 2) * b) + 1) + c
    },
    easeInElastic: function (a, b, c, d, e) {
        var f = 1.70158,
            g = 0,
            h = d;
        if (0 == b) return c;
        if (1 == (b /= e)) return c + d;
        if (g || (g = .3 * e), h < Math.abs(d)) {
            h = d;
            var f = g / 4
        } else var f = g / (2 * Math.PI) * Math.asin(d / h);
        return -(h * Math.pow(2, 10 * (b -= 1)) * Math.sin((b * e - f) * (2 * Math.PI) / g)) + c
    },
    easeOutElastic: function (a, b, c, d, e) {
        var f = 1.70158,
            g = 0,
            h = d;
        if (0 == b) return c;
        if (1 == (b /= e)) return c + d;
        if (g || (g = .3 * e), h < Math.abs(d)) {
            h = d;
            var f = g / 4
        } else var f = g / (2 * Math.PI) * Math.asin(d / h);
        return h * Math.pow(2, -10 * b) * Math.sin((b * e - f) * (2 * Math.PI) / g) + d + c
    },
    easeInOutElastic: function (a, b, c, d, e) {
        var f = 1.70158,
            g = 0,
            h = d;
        if (0 == b) return c;
        if (2 == (b /= e / 2)) return c + d;
        if (g || (g = e * (.3 * 1.5)), h < Math.abs(d)) {
            h = d;
            var f = g / 4
        } else var f = g / (2 * Math.PI) * Math.asin(d / h);
        return 1 > b ? -.5 * (h * Math.pow(2, 10 * (b -= 1)) * Math.sin((b * e - f) * (2 * Math.PI) / g)) + c : h * Math.pow(2, -10 * (b -= 1)) * Math.sin((b * e - f) * (2 * Math.PI) / g) * .5 + d + c
    },
    easeInBack: function (a, b, c, d, e, f) {
        return void 0 == f && (f = 1.70158), d * (b /= e) * b * ((f + 1) * b - f) + c
    },
    easeOutBack: function (a, b, c, d, e, f) {
        return void 0 == f && (f = 1.70158), d * ((b = b / e - 1) * b * ((f + 1) * b + f) + 1) + c
    },
    easeInOutBack: function (a, b, c, d, e, f) {
        return void 0 == f && (f = 1.70158), (b /= e / 2) < 1 ? d / 2 * (b * b * (((f *= 1.525) + 1) * b - f)) + c : d / 2 * ((b -= 2) * b * (((f *= 1.525) + 1) * b + f) + 2) + c
    },
    easeInBounce: function (a, b, c, d, e) {
        return d - $.easing.easeOutBounce(a, e - b, 0, d, e) + c
    },
    easeOutBounce: function (a, b, c, d, e) {
        return (b /= e) < 1 / 2.75 ? d * (7.5625 * b * b) + c : 2 / 2.75 > b ? d * (7.5625 * (b -= 1.5 / 2.75) * b + .75) + c : 2.5 / 2.75 > b ? d * (7.5625 * (b -= 2.25 / 2.75) * b + .9375) + c : d * (7.5625 * (b -= 2.625 / 2.75) * b + .984375) + c
    },
    easeInOutBounce: function (a, b, c, d, e) {
        return e / 2 > b ? .5 * $.easing.easeInBounce(a, 2 * b, 0, d, e) + c : .5 * $.easing.easeOutBounce(a, 2 * b - e, 0, d, e) + .5 * d + c
    }
});

(function (a, b) {
    function c() {
        var a = TRACK_HOST + "c.gif?",
            b = window,
            c = b.screen,
            d = c.availWidth + "x" + c.availHeight,
            e = encodeURIComponent,
            f = document;
        n = b.navigator;
        var g = {
            lag: n.userLanguage || n.language
        };
        typeof scene !== scene && (g.event_description = scene.description, g.event_id = scene.id, g.scene_type = scene.type, g.creator_id = scene.userId, g.creator_type = scene.userType);
        var h = "action_name=" + e(f.title) + "&idsite=2&url=" + e(f.location) + "&urlref=" + e(f.referrer) + "&res=" + d + "&data=" + e(JSON.stringify(g));
        h += 1, h += "&ct=" + (new Date).getTime(), a += h;
        var i = f.createElement("img");
        i.setAttribute("src", a), i.setAttribute("height", "0"), i.setAttribute("width", "0"), f.body.appendChild(i)
    }

    // wjptest
    // a.getScript(TRACK_HOST + "d.js?pid=2&v=1", function () {
    //     function a() {
    //         window.scene ? c() : b = setTimeout(a)
    //     }
    //
    //     if (window.scene) c();
    //     else var b = setTimeout(a, 100)
    // }), a.getScript(TRACK_HOST + "r.js?pid=3&v=1")
})(jQuery, window);

(function (window, jQuery) {
    window.wapShare = function () {
        function c(a) {
            j = a, j.property && (j.property = JSON.stringify(j.property)), l = a.code;
            var c = PREFIX_HOST + "/v/" + l;
            jQuery("#sceneLink").text(c)
        }

        function d() {
            var a = jQuery("#sceneName").val();
            if (null !== a || void 0 !== a) {
                j.name = a;
                var c = {
                    name: j.name,
                    id: j.id,
                    status: 1,
                    code: j.code,
                    cover: j.cover
                };
                jQuery.ajax({
                    type: "POST",
                    url: PREFIX_URL + "m/scene/saveSettings",
                    contentType: "text/plain; charset=UTF-8",
                    data: JSON.stringify(c),
                    xhrFields: {
                        withCredentials: !0
                    },
                    success: function (a) {
                    }
                }), wechatUtils.shareWidthSDK(j.name, j.description, location.href.split("?")[0], "", j.cover)
            } else {
                // alert("你还没有填写作品名称！")
            }
        }

        function editScene() {
            window.location.href = PREFIX_HOST + "/mobile/fillHome.html?edit=true&id=" + k
        }

        function createAnotherScene() {
            window.location.href = PREFIX_HOST + "/mobile/fillHome.html?"
        }

        function backToPreview() {
            jQuery("#wapShareSet").hide(), jQuery("#shareFooter").show()
        }

        function h() {
            isWeixin() && (jQuery("#wechatShare").css({
                display: "block"
            }), jQuery("#backPreview").css({
                "float": "left"
            }))
        }

        function init(a) {
            c(a);
            k = a.id;
            jQuery("#sceneName").focus(function () {
                jQuery(this).val().length > 0 && jQuery(this).select()
            });
            jQuery("#sceneName").blur(function () {
                jQuery(this).val().length > 0 && d()
            });
            h()
        }

        var j = {},
            k = "",
            l = "";
        return {
            init: init,
            editScene: editScene,
            createAnotherScene: createAnotherScene,
            backToPreview: backToPreview
        }
    }()
})(window, jQuery);

(function (window, yxbCore) {
    yxbCore.forExemplarReview = function () {
        var ret = !1;
        yxbCore.getUrlParameter("exemplarReview") ?
            (
                $(".phoneBox").css({
                    width: "320px",
                    height: "486px",
                    marginLeft: "0px",
                    marginRight: "40px"
                }),

                    $("#con").after('<div class="exemplarReview" style="width:40px;height:486px;background:#ffffff;position: fixed;right: 0px;top: 0px;border-right: 1px solid #ccd5db;"><div class="preview" style="position:relative;height: 70px;margin-top:173px;"><a onclick="eqxiu.prePage()" ><em class="eqf-clickmore2" style="color:#7b8893;"></em></a></div> <div class="next" style="height:73px;margin-bottom:173px;"><a onclick="eqxiu.nextPage()"><em class="eqf-clickmore" style="color:#7b8893;"></em></a> </div></div>'),

                    $(".exemplarReview a").css({
                        width: "40px",
                        height: "70px",
                        display: "block",
                        textAlign: "center",
                        lineHeight: "70px"
                    }),

                    $(".exemplarReview a").hover(function () {
                        $(this).css({
                            backgroundColor: "#f0f3f4"
                        })
                    }, function () {
                        $(this).css({
                            backgroundColor: "#FFFFFF"
                        })
                    }),

                    ret = !0
            ) :
            ret = !1;
        return ret
    }
})(window, yxbCore);