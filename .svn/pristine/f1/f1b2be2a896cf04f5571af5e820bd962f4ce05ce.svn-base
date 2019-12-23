function renderPage(pageNumber, pages, d) {

    function e(pageNumber, b) {

        var longPageNumber = b.properties.longPage,
            d = 1;
        var isClicked, g, h, i, j, pageMode = window.scene ? scene.pageMode : 0,
            n = 0,
            o = {
                touchPos: 0,
                pLen: -486 * (longPageNumber - 1),
                contain: $("#page" + pageNumber),
                cH: mobilecheck() ? $(document).height() : 486,
                stopInertiaMove: !1
            },
            p = 1 == d ?
                ".edit_area" :
                ".edit_wrapper";
        var q = 0,
            r = 0;

        if (b.elements){
            for (var index = 0; index < b.elements.length; index++){
                if (3 == b.elements[index].type) {
                    2 == b.elements[index].properties.croptype && (d = 2);
                    break
                }
            }

        }

        0 == pageMode || 1 == pageMode || 2 == pageMode || 6 == pageMode || 7 == pageMode || 8 == pageMode || 11 == pageMode || 12 == pageMode || 13 == pageMode ?
            pageMode = "NS" :
            (
                pageMode = "WE",
                    $('<section class="u-arrow-bottom"><div class="pre-wrap"><div class="pre-box1"><div class="pre1"></div></div><div class="pre-box2"><div class="pre2"></div></div></div></section>')
                        .appendTo("#page" + pageNumber)
            );

        o.contain.on("mousedown touchstart", function (event) {
            return "button" == event.target.tagName.toLowerCase() ||
            event.target.getAttribute("data") ||
            event.target.getAttribute("href") ||
            "8" == event.target.getAttribute("ctype") ||
            "z" == event.target.getAttribute("ctype") ?
                void event.stopPropagation() :
                (event.stopPropagation(),
                    event.preventDefault(),
                    void(
                        o.touchPos < o.pLen ||
                        o.touchPos > 0 ||
                        (
                            isClicked = !0,
                                h = 0,
                                o.stopInertiaMove = !0,
                                g = event.originalEvent.touches ?
                                    event.originalEvent.changedTouches[0].clientY :
                                    event.clientY,

                            "WE" == pageMode &&
                            (i = event.originalEvent.touches ?
                                event.originalEvent.changedTouches[0].clientX :
                                event.clientX
                            ),
                                r = o.touchPos,
                                q = Date.now()
                        )
                    )
                )
        });

        o.contain.on("mousemove touchmove", function (event) {
            event.stopPropagation();

            if (isClicked) {
                h = o.touchPos + (event.originalEvent.touches ? event.originalEvent.changedTouches[0].clientY : event.clientY) - g;

                if ("WE" == pageMode && (j = (event.originalEvent.touches ? event.originalEvent.touches[0].clientX : event.clientX) - i, Math.abs(j) > Math.abs(h - o.touchPos) && !scene.property.forbidHandFlip)) {
                    if (j > 0) {
                        if (5 > j) return;
                        eqxiu.prePage()
                    } else eqxiu.nextPage();
                    return void(isClicked = !1)
                }

                if (h < o.pLen || h > 5) {

                    isClicked = !1;
                    h > 0 &&
                    "NS" == pageMode &&
                    (window.scene&&window.scene.property.forbidHandFlip ? o.touchPos = 0 : eqxiu.prePage());

                    return void(0 > h && "NS" == pageMode && (window.scene&&window.scene.property.forbidHandFlip ? o.touchPos = o.pLen : eqxiu.nextPage()));
                }

                if (h > 0) {
                    return;
                }

                o.stopInertiaMove = !0;

                $(this).find(p).css("transform", "translate3d(0," + (h - n) + "px,0)");

                $(this).find(p).css("-webkit-transform", "translate3d(0," + (h - n) + "px,0)");

                var b = $(this).find(".alock");

                if (b.length > 0) {
                    for (var c = 0; c < b.length; c++) {
                        l(b[c], b[c].style.transform, n - h);
                    }
                }

                var d = Date.now();

                $(document).trigger("pageScrollPos", [h - o.cH]);

                d - q > 300 && (q = d, r = h);

                o.stopInertiaMove = !1
            }
        });

        o.contain.on("mouseup touchend mouseleave", function (a) {
            a.stopPropagation();

            if (isClicked) {
                // if((a.target !== $('#luckyPick')[0])){
                //     if (f = !1, 0 === h || h - r == 0) return void $(a.target).trigger("click", "longPage");
                // }
                isClicked = !1;

                if ( 0 === h || h - r == 0) {
                    return void $(a.target).trigger("click", "longPage");
                }

                if (!(0 > h && h > o.pLen)) {
                    return h >= 0 ?
                        void(o.touchPos = 0) :
                        void(o.touchPos = o.pLen);
                }

                o.touchPos = h;

                "WE" == pageMode && o.contain.find(".u-arrow-bottom").hide();

                var b = Date.now(),
                    c = (h - r) / (b - q);
                !
                    function (a, b, c, d) {
                        function e() {
                            if (!d.stopInertiaMove) {
                                var h = Date.now(),
                                    i = h - b,
                                    j = a + i * g;
                                if (!(0 > f * j)) {
                                    var k = (a + j) / 2 * i,
                                        m = c + k;
                                    // console.log(m,d.pLen);
                                    if (!(m > 0 || m < d.pLen)) {
                                        d.timmer = null;
                                        d.contain.find(p).css("transform", "translate3d(0," + (m - n) + "px,0)");
                                        d.contain.find(p).css("-webkit-transform", "translate3d(0," + (m - n) + "px,0)");
                                        var o = d.contain.find(".alock");
                                        if (o.length > 0) {
                                            for (var q = 0; q < o.length; q++) {
                                                l(o[q], o[q].style.transform, n - m);
                                            }
                                        }

                                        d.touchPos = m;

                                        $(document).trigger("pageScrollPos", [m - d.cH]);

                                        setTimeout(e, 10);
                                    }else if(m > 0 && m<=10){
                                        m = 0;
                                        d.timmer = null;
                                        d.contain
                                            .find(p)
                                            .css("transform", "translate3d(0," + (m - n) + "px,0)");
                                    }
                                }
                            }
                        }

                        var f = 0 > a ? -1 : 1,
                            g = f * -6e-4;

                        e();
                    }(c, b, h, o)
            }
        });

        $(document).on("clearTouchPos", function () {
            o.touchPos = 0;
            o.contain.find(p).css("transform", "translateY(0px)");
            o.contain.find(p).css("-webkit-transform", "translateY(0px)");

            var a, b = o.contain.find(".alock");
            if (b.length > 0) {
                for (var c = 0; c < b.length; c++) {
                    a = b[c].style.transform.replace(k, "");
                    b[c].style.transform = "translate3d(0,0,0) " + a;
                }
            }
        });
    }
    //wjptest
    function parse(options){
        var b = $('<div class="edit_wrapper" data-scene-id="' + options.def.sceneId + '"><div class="wrapper-background" id="4378913315" style="position: absolute; width: 100%; {{\'height:\'+(pageLength*486)+\'px\'}};background: url(/images/yxb/editBg.png) center center; background-size: cover; background-position: 50% 50%; top: 0;z-index: -1"></div><ul eqx-edit-destroy id="edit_area' + options.def.id + '"paste-element class="edit_area weebly-content-area weebly-area-active" style="{{\'height:\'+(pageLength*486)+\'px\'}}" ></div>');

        var c = this.mode = options.mode;

        this.def = options.def;

        options.disEvent && (this.disEvent = !0);

        "view" === c && tplCount++;

        var d = $(options.appendTo);

        containerWidth = d.width();
        containerHeight = d.height();
        n=320;
        o=486;
        p = n / containerWidth;
        s = o / containerHeight;

        return e(options.def, b.appendTo($(options.appendTo)), c)
    }

    var f, g, h = 1,
        zCurrentWidth = $(".z-currentPage").width(),
        zCurrentHeight = $(".z-currentPage").height();

    var k = /translate3d\(.*?\)/g,
        l = function (a, b, c) {
            b = b.replace(k, "");
            b &&
            (
                a.style.transform = "translate3d(0," + c + "px,0) " + b
            )
        };

    yxbCore.templateParser("jsonParser").parse({
        def: pages[pageNumber - 1],
        appendTo: "#page" + pageNumber,
        mode: "view",
        disEvent: d
        // mode: "edit"
    });

    window.listPages = pages;

    // $(".z-currentPage").css("width", "320px");
    // $(".m-img").css("width", "320px");
    // $(".z-currentPage").css("position", "relative");

    window.imageWidth = $(".m-img").width();

    window.imageHeight = $(".m-img").height();

    zCurrentWidth / zCurrentHeight >= 320 / 486 ?
        (h = zCurrentHeight / 486, f = (zCurrentWidth / h - 320) / 2) :
        (h = zCurrentWidth / 320, g = (zCurrentHeight / h - 486) / 2);

    window !== window.top && $(".phoneBox .nr").css({
        width: "100%",
        // height: "100%", //java 小预览注释
        overflow: "hidden",
        "transform-origin": "top left",
        transform: "scale(" + h + ")"
    });

    window !== window.top &&
    mobilecheck() ||
    // $(".edit_area").css({
    //     marginTop: g || 0
    // }),
    // f && $(".edit_area").css({
    //     // marginLeft: f
    //     width:"100%",
    //     backgroundSize:"cover",
    // }),
    $(".edit_area").css({
        width:"100%",
        backgroundSize:"cover",
        backgroundPosition: "50% 50%"
    });

    tplCount == pages.length &&
    $("#eqMobileViewport").attr("content", "width=320, initial-scale=" + h + ", maximum-scale=" + h + ", user-scalable=no");

    pages[pageNumber - 1].properties &&
    pages[pageNumber - 1].properties.longPage &&
    e(pageNumber, pages[pageNumber - 1]);
}

export {renderPage};