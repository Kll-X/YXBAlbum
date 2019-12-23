import {mobilecheck, tabletCheck} from "./checkEnv.js"
import {eqxCommon} from "./005eqxCommon.js"
var abccc = {};
var eqxiu = function () {
    window.pageChangeTime = [0.4];

    var n, o, p, q, r, s, t, u, v, w, x, y, z, A = $(window),
        B = !1,
        C = !1,
        D = mobilecheck(),
        E = tabletCheck(),
        F = 0,
        G = 0,
        H = 0,
        I = 0,
        J = !1,
        K = !1,
        L = !0,
        M = 500,
        app = function (target_element, pageMode, c, e) {
            function f(a, b, c) {
                for (var d = ["", "webkit", "moz"], e = 0, f = d.length; f > e; e++) {
                    0 != e || mobilecheck() || (b = b.substring(0, 1).toLowerCase() + b.substring(1, b.length));
                    var g = c instanceof Array ? c[e] : c,
                        h = d[e] + b;
                    if (typeof a !== 'undefined' && typeof a[h] !== 'undefined') {
                        a[h] = g
                    }
                }
            }

            function g(a, b, c) {
                for (var d = ["", "-webkit-", "-moz-"], e = 0; e < d.length; e++) a.css(d[e] + b, c)
            }

            function h(a) {
                var b;
                return b = $("#inside_" + a, ".phone-view").length ? $("#inside_" + a, ".phone-view") : $("#inside_" + a)
            }

            function i() {
                n._isDisableFlipPage = !0;
                var a;
                "0" == pageMode || "1" == pageMode || "2" == pageMode || "6" == pageMode || "9" == pageMode || "11" == pageMode || "12" == pageMode ? (a = I > 0 ? -t : t, g($(n.$activePage), "transform", "translateY(" + a + "px)"), g($(n.$currentPage), "transform", "translateY(0) scale(1)")) : ("3" == pageMode || "5" == pageMode) && (a = H > 0 ? -s : s, g($(n.$activePage), "transform", "translateX(" + a + "px)"), g($(n.$currentPage), "transform", "translateX(0) scale(1)")), setTimeout(function () {
                    $(n.$currentPage).attr("style", ""), $(n.$activePage).attr("style", ""), $(n.$activePage).removeClass("z-active z-move"), n._isDisableFlipPage = !1
                }, 500)
            }

            function j() {
                if (Math.abs(I) > Math.abs(H) && completeEffect($(n.$currentPage))) {
                    if (I > 0) {
                        if (n._isDisableFlipPrevPage) return;
                        K || L ? (K = !1, L = !1, aa(!0), ba(!0, "bottom center", "translateY", t)) : ca(!0, "translateY", t, I, n._scrollMode)
                    } else if (0 > I) {
                        if (n._isDisableFlipNextPage) return;
                        !K || L ? (K = !0, L = !1, aa(!1), ba(!1, "top center", "translateY", t)) : ca(!1, "translateY", t, I, n._scrollMode)
                    }
                }
            }

            function k() {
                Math.abs(I) > Math.abs(H) && Math.abs(I) > 20 || n.jumpOk ? (da("translateY", I, t, n._scrollMode), $(document).trigger("flipend")) : (n._isDisableFlipPage = !1, i())
            }

            function l() {
                if (Math.abs(H) > Math.abs(I) && completeEffect($(n.$currentPage)))
                    if (H > 0) {
                        if (n._isDisableFlipPrevPage) return;
                        K || L ? (K = !1, L = !1, aa(!0), ba(!0, "center right", "translateX", s)) : ca(!0, "translateX", s, H, n._scrollMode)
                    } else if (0 > H) {
                        if (n._isDisableFlipNextPage) return;
                        !K || L ? (K = !0, L = !1, aa(!1), ba(!1, "center left", "translateX", s)) : ca(!1, "translateX", s, H, n._scrollMode)
                    }
            }

            function m() {
                Math.abs(H) > Math.abs(I) && Math.abs(H) > 20 ? (da("translateX", H, s, n._scrollMode), $(document).trigger("flipend")) : (n._isDisableFlipPage = !1, i())
            }

            function r() {
                if (Math.abs(H) > Math.abs(I) && completeEffect($(n.$currentPage)))
                    if (H > 0) {
                        if (n._isDisableFlipPrevPage) return;
                        K || L ? (K = !1, L = !1, aa(!0), s = D ? window.innerWidth : $(".nr").width(), ba(!0, "", "translateX", s)) : ca(!0, "translateX", s, H, n._scrollMode)
                    } else if (0 > H) {
                        if (n._isDisableFlipNextPage) return;
                        !K || L ? (K = !0, L = !1, aa(!1), s = D ? window.innerWidth : $(".nr").width(), ba(!1, "", "translateX", s)) : ca(!1, "translateX", s, H, n._scrollMode)
                    }
            }

            function u() {
                Math.abs(H) > Math.abs(I) && Math.abs(H) > 20 ? (da("translateX", H, s, n._scrollMode), $(document).trigger("flipend")) : (n._isDisableFlipPage = !1, i())
            }

            function z() {
                if (Math.abs(I) > Math.abs(H) && completeEffect($(n.$currentPage)))
                    if (I > 0) {
                        if (n._isDisableFlipPrevPage) return;
                        K || L ? (K = !1, L = !1, aa(!0), t = D ? window.innerHeight : $(".nr").height(), ba(!0, "", "translateY", t)) : ca(!0, "translateY", t, I, n._scrollMode)
                    } else if (0 > I) {
                        if (n._isDisableFlipNextPage) return;
                        !K || L ? (K = !0, L = !1, aa(!1), t = D ? window.innerHeight : $(".nr").height(), ba(!1, "", "translateY", t)) : ca(!1, "translateY", t, I, n._scrollMode)
                    }
            }

            function O() {
                Math.abs(I) > Math.abs(H) && Math.abs(I) > 20 ? (da("translateY", I, t, n._scrollMode), $(document).trigger("flipend")) : (n._isDisableFlipPage = !1, i())
            }

            function P() {
                if (Math.abs(I) > Math.abs(H) && completeEffect($(n.$currentPage)))
                    if (I > 0) {
                        if (n._isDisableFlipNextPage) return;
                        (!K || L) && (K = !0, L = !1, n.$activePage && $(n.$activePage).removeClass("z-move z-active"), aa(!0), f(n.$activePage.style, "Transform", "rotateX(90deg) translateY(-" + t / 2 + "px) translateZ(" + t / 2 + "px)"), f(ea.get(0).style, "Perspective", "700px"), f(ea.get(0).style, "TransformStyle", "preserve-3d")), n.$activePage && n.$activePage.classList.contains("main-page") && ($(n.$activePage).addClass("z-active z-move").trigger("active").css("zIndex", 1), f(n.$currentPage.style, "Transform", "rotateX(-" + I / t * 90 + "deg) translateY(" + I / 2 + "px) translateZ(" + I / 2 + "px)"), f(n.$activePage.style, "Transform", "rotateX(" + (90 - I / t * 90) + "deg) translateY(" + (-(t / 2) + I / 2) + "px) translateZ(" + (t / 2 - I / 2) + "px)"))
                    } else if (0 > I) {
                        if (n._isDisableFlipNextPage) return;
                        (!K || L) && (K = !0, L = !1, n.$activePage && $(n.$activePage).removeClass("z-move z-active"), aa(!1), f(n.$activePage.style, "Transform", "rotateX(-90deg) translateY(-" + t / 2 + "px) translateZ(-" + t / 2 + "px)"), f(ea.get(0).style, "Perspective", "700px"), f(ea.get(0).style, "TransformStyle", "preserve-3d")), n.$activePage && n.$activePage.classList.contains("main-page") ? ($(n.$activePage).addClass("z-active z-move").trigger("active").css("zIndex", 0), f(n.$currentPage.style, "Transform", "rotateX(" + -I / t * 90 + "deg) translateY(" + I / 2 + "px) translateZ(" + -I / 2 + "px)"), f(n.$activePage.style, "Transform", "rotateX(" + (-90 - I / t * 90) + "deg) translateY(" + (t / 2 + I / 2) + "px) translateZ(" + (t / 2 + I / 2) + "px)")) : (f(n.$currentPage.style, "Transform", "translateX(0px) scale(1)"), n.$activePage = null)
                    }
            }

            function Q() {
                Math.abs(I) > Math.abs(H) && Math.abs(I) > 20 ? (I > 0 ? f(n.$currentPage.style, "Transform", "rotateX(-90deg) translateY(" + t / 2 + "px) translateZ(" + t / 2 + "px)") : f(n.$currentPage.style, "Transform", "rotateX(90deg) translateY(-" + t / 2 + "px) translateZ(" + t / 2 + "px)"), f(n.$currentPage.style, "zIndex", "0"), f(n.$activePage.style, "Transform", "rotateX(0deg) translateY(0px) translateZ(0px)"), f(n.$activePage.style, "zIndex", "2"), $(document).trigger("flipend")) : (f(n.$currentPage.style, "Transition", "none"), f(n.$activePage.style, "Transition", "none"), n._isDisableFlipPage = !1, i())
            }

            function R() {
                if (Math.abs(I) > Math.abs(H) && completeEffect($(n.$currentPage)))
                    if (I > 0) {
                        if (n._isDisableFlipNextPage) return;
                        (!K || L) && (K = !0, L = !1, n.$activePage && $(n.$activePage).removeClass("z-move z-active"), aa(!0), g(ea, "perspective", "700px"), g(ea, "transform-style", "preserve-3d"), f(n.$activePage.style, "TransformOrigin", "top"), f(n.$activePage.style, "Transform", "rotateX(90deg)")), n.$activePage && n.$activePage.classList.contains("main-page") && ($(n.$activePage).addClass("z-active z-move").trigger("active"), f(n.$activePage.style, "Transform", "rotateX(" + (90 - I / t * 90) + "deg) "))
                    } else if (0 > I) {
                        if (n._isDisableFlipNextPage) return;
                        (!K || L) && (K = !0, L = !1, n.$activePage && $(n.$activePage).removeClass("z-move z-active"), aa(!1), f(n.$activePage.style, "TransformOrigin", "bottom"), f(n.$activePage.style, "Transform", "rotateX(-90deg)"), g(ea, "perspective", "700px"), g(ea, "transform-style", "preserve-3d")), n.$activePage && n.$activePage.classList.contains("main-page") ? ($(n.$activePage).addClass("z-active z-move").trigger("active"), f(n.$activePage.style, "Transform", "rotateX(" + (-90 - I / t * 90) + "deg) ")) : (f(n.$currentPage.style, "Transform", "translateX(0px) scale(1)"), n.$activePage = null)
                    }
            }

            function S() {
                Math.abs(I) > Math.abs(H) && Math.abs(I) > 20 || n.jumpOk ? (I > 0 ? f(n.$activePage.style, "Transform", "rotateX(0deg)") : f(n.$activePage.style, "Transform", "rotateX(0deg)"), $(document).trigger("flipend")) : (f(n.$currentPage.style, "Transition", "none"), f(n.$activePage.style, "Transition", "none"), n._isDisableFlipPage = !1, i())
            }

            function T() {
                if (Math.abs(I) > Math.abs(H) && completeEffect($(n.$currentPage))) {
                    if (I > 0) {
                        if (n._isDisableFlipPrevPage) return;
                        (K || L) && (K = !1, L = !1, n.$activePage && (n.$activePage.classList.remove("z-active"), n.$activePage.classList.remove("z-move")), aa(!0), n.$activePage.style.zIndex = 2, n.$activePage && n.$activePage.classList.contains("main-page") && (n.$activePage.classList.add("z-active"), n.$activePage.classList.add("z-move")), n.$activePage.style.opacity = 0)
                    } else if (0 > I) {
                        if (n._isDisableFlipNextPage) return;
                        (!K || L) && (K = !0, L = !1, n.$activePage && (n.$activePage.classList.remove("z-active"), n.$activePage.classList.remove("z-move")), aa(!1), n.$activePage.style.zIndex = 2, n.$activePage && n.$activePage.classList.contains("main-page") && (n.$activePage.classList.add("z-active"), n.$activePage.classList.add("z-move")), n.$activePage.style.opacity = 0)
                    }
                    var a = Math.abs(I) / t * 1.3;
                    n.$activePage.style.opacity = a.toFixed(1), a.toFixed(3) <= 1 && g($(n.$activePage), "transform", "scale(" + a.toFixed(3) + ")")
                }
            }

            function U() {
                Math.abs(I) > Math.abs(H) && Math.abs(I) > 20 ? (g($(n.$activePage), "transform", "scale(1)"), n.$activePage.style.opacity = 1, $(document).trigger("flipend")) : (f(n.$currentPage.style, "Transition", "none"), f(n.$activePage.style, "Transition", "none"), n._isDisableFlipPage = !1, i())
            }

            function V() {
                if (Math.abs(I) > Math.abs(H) && completeEffect($(n.$currentPage)))
                    if (I > 0) {
                        if (n._isDisableFlipPrevPage) return;
                        (K || L) && (K = !1, L = !1, n.$activePage && (n.$activePage.classList.remove("z-active"), n.$activePage.classList.remove("z-fade-in"), n.$activePage.classList.remove("z-move")), aa(!0), n.$currentPage.style.zIndex = 1, n.$activePage.style.zIndex = 2, n.$activePage && n.$activePage.classList.contains("main-page") && (n.$activePage.classList.add("z-active"), n.$activePage.classList.add("z-fade-in"), n.$activePage.classList.add("z-move")))
                    } else if (0 > I) {
                        if (n._isDisableFlipNextPage) return;
                        (!K || L) && (K = !0, L = !1, n.$activePage && (n.$activePage.classList.remove("z-active"), n.$activePage.classList.remove("z-fade-in"), n.$activePage.classList.remove("z-move")), aa(!1), n.$currentPage.style.zIndex = 1, n.$activePage && n.$activePage.classList.contains("main-page") && (n.$activePage.style.zIndex = 2, n.$activePage.classList.add("z-active"), n.$activePage.classList.add("z-fade-in"), n.$activePage.classList.add("z-move")))
                    }
            }

            function W() {
                Math.abs(I) > Math.abs(H) && Math.abs(I) > 20 ? setTimeout(function () {
                    $(document).trigger("flipend")
                }, 1600) : (n._isDisableFlipPage = !1, i())
            }

            function X() {
                if (Math.abs(H) > Math.abs(I) && completeEffect($(n.$currentPage)))
                    if (H > 0) {
                        if (n._isDisableFlipPrevPage) return;
                        K || L ? (K = !1, L = !1, n.$activePage && (n.$activePage.classList.remove("z-active"), n.$activePage.classList.remove("z-move")), aa(!0), n.$activePage && n.$activePage.classList.contains("main-page") && (n.$activePage.classList.add("z-active"), n.$activePage.classList.add("z-move"), g($(n.$activePage), "Transform", "scale(0.3) translateX(0) translateZ(-" + t + "px) rotateY(45deg)"), n.$activePage.style.zIndex = "0"), g(ea, "perspective", "1000px"), n.$currentPage.style.zIndex = "100") : n.$activePage && (s / 4 >= H ? g($(n.$currentPage), "Transform", "translateX(" + H + "px)") : g($(n.$currentPage), "Transform", "translateX(" + 1.5 * H + "px) scale(" + ((5 * s / 4 - H) / s).toFixed(3) + ") rotateY(" + H / s * 45 + "deg) translateZ(-" + (H - s / 4) + "px)"))
                    } else if (0 > H) {
                        if (n._isDisableFlipNextPage) return;
                        !K || L ? (K = !0, L = !1, n.$activePage && (n.$activePage.classList.remove("z-active"), n.$activePage.classList.remove("z-move")), aa(!1), n.$activePage && n.$activePage.classList.contains("main-page") && (n.$activePage.classList.add("z-active"), n.$activePage.classList.add("z-move"), g($(n.$activePage), "Transform", "scale(0.3) translateX(" + (s + 300) + "px) translateZ(-" + t + "px) rotateY(-45deg)"), n.$activePage.style.zIndex = "0"), g(ea, "perspective", "1000px"), n.$currentPage.style.zIndex = "100") : n.$activePage && (H >= -s / 4 ? g($(n.$currentPage), "Transform", "translateX(" + H + "px)") : g($(n.$currentPage), "Transform", "translateX(" + 1.5 * H + "px) scale(" + ((5 * s / 4 + H) / s).toFixed(3) + ") rotateY(" + H / s * 45 + "deg) translateZ(" + (H + s / 4) + "px)"), g($(n.$activePage), "Transform", "scale(" + (.3 - (H + s / 4) / s).toFixed(3) + ") translateX(" + (-H - s / 4 + 200) + "px) translateZ(" + (-H - 3 * s / 4) + "px) rotateY(-" + (45 + (H + s / 4) / s * 45) + "deg)"))
                    }
            }

            function Y() {
                Math.abs(H) > Math.abs(I) && Math.abs(H) > 20 ? (H > 0 ? (n.$currentPage.style.webkitTransformOrigin = "left", n.$currentPage.style.webkitTransform = "translateX(0) translateZ(-" + t + "px) rotateY(0) scale(0.2)", n.$activePage.style.webkitTransform = "translateX(0) translateZ(0) rotateY(0) scale(1)", n.$currentPage.style.zIndex = "0", n.$activePage.style.zIndex = "1") : (n.$currentPage.style.webkitTransformOrigin = "right", n.$currentPage.style.webkitTransform = "translateX(" + s + "px) translateZ(-" + t + "px) rotateY(0) scale(0.2)", n.$activePage.style.webkitTransform = "translateX(0) translateZ(0) rotateY(0) scale(1)", n.$activePage.style.zIndex = "1", n.$currentPage.style.zIndex = "0"), $(document).trigger("flipend")) : (f(n.$currentPage.style, "Transition", "none"), f(n.$activePage.style, "Transition", "none"), n._isDisableFlipPage = !1, i())
            }

            function Z() {
                if (Math.abs(I) > Math.abs(H) && completeEffect($(n.$currentPage))) {
                    if (I > 0) {
                        if (n._isDisableFlipPrevPage) return;
                        (K || L) && (K = !1, L = !1, n.$activePage && (n.$activePage.classList.remove("z-active"), n.$activePage.classList.remove("z-move")), aa(!0), n.$activePage && n.$activePage.classList.contains("main-page") && ($(n.$activePage).addClass("z-active z-move"), $(n.$activePage).css({
                            zIndex: 0,
                            opacity: 1
                        })), $(n.$currentPage).css({
                            opacity: 1
                        }), $(n.$activePage).css({
                            zIndex: 0,
                            opacity: 1
                        }), g($(n.$activePage), "transform", "translateY(0)"), g($(n.$currentPage), "transform-origin", "0% 0% 0px"))
                    } else if (0 > I) {
                        if (n._isDisableFlipNextPage) return;
                        (!K || L) && (K = !0, L = !1, n.$activePage && (n.$activePage.classList.remove("z-active"), n.$activePage.classList.remove("z-move")), aa(!1), n.$activePage && n.$activePage.classList.contains("main-page") && (n.$activePage.classList.add("z-active"), n.$activePage.classList.add("z-move"), $(n.$activePage).css({
                            zIndex: 0,
                            opacity: 1
                        })), $(n.$currentPage).css({
                            opacity: 1
                        }), $(n.$activePage).css({
                            zIndex: 0,
                            opacity: 1
                        }), g($(n.$activePage), "transform", "translateY(0)"), g($(n.$currentPage), "transform-origin", "0% 0% 0px"))
                    }
                    n.$activePage && (g($(n.$currentPage), "transform-origin", "0% 0% 0px"), g($(n.$currentPage), "transform", "rotate(" + Math.abs(I) / t * 90 + "deg)"), n.$currentPage.style.opacity = ((t - Math.abs(I)) / t).toFixed(1))
                }
            }

            function _() {
                Math.abs(I) > Math.abs(H) && Math.abs(I) > 20 ? (g($(n.$currentPage), "transform", "translateY(" + t + "px) rotate(" + Math.abs(I) / t * 90 + "deg)"), $(n.$currentPage).css({
                    opacity: .5
                }), $(document).trigger("flipend")) : (f(n.$currentPage.style, "Transition", "none"), f(n.$activePage.style, "Transition", "none"), n._isDisableFlipPage = !1, i())
            }

            function aa(a) {
                C || (a ? n.$currentPage.previousElementSibling && n.$currentPage.previousElementSibling.classList.contains("main-page") ? n.$activePage = n.$currentPage.previousElementSibling : B ? n.$activePage = n._$pages.last().get(0) : n.$activePage = !1 : n.$currentPage.nextElementSibling && n.$currentPage.nextElementSibling.classList.contains("main-page") ? n.$activePage = n.$currentPage.nextElementSibling : B ? n.$activePage = n._$pages.first().get(0) : n.$activePage = !1)
            }

            function ba(a, b, c, d) {
                n.$activePage && (n.$activePage.classList.remove("z-active"), n.$activePage.classList.remove("z-move"))
                if (n.$activePage && n.$activePage.classList.contains("main-page")) {

                    n.$activePage.classList.add("z-active");
                    n.$activePage.classList.add("z-move");

                    var e = a ? "-" : "";

                    n.$activePage.style.webkitTransition = "none";
                    n.$activePage.style.webkitTransform = c + "(" + e + d + "px)";
                    n.$activePage.style.mozTransition = "none";
                    n.$activePage.style.mozTransform = c + "(" + e + d + "px)";
                    n.$activePage.style.transition = "none";
                    n.$activePage.style.transform = c + "(" + e + d + "px)";
                    // $(n.$activePage).trigger("active");
                    b && g($(n.$currentPage), "transform-origin", b)

                } else {
                    f(n.$currentPage.style, "Transform", c + "(0px) scale(1)")
                }
            }

            function ca(a, b, c, d, e) {
                if (n.$activePage) {
                    var f = a ? "-" : "";
                    g($(n.$activePage), "transform", b + "(" + f + (c - Math.abs(d)) + "px)"), "1" == e || "3" == e ? g($(n.$currentPage), "transform", "scale(" + ((c - Math.abs(d)) / t).toFixed(3) + ")") : ("5" == e || "11" == e) && g($(n.$currentPage), "transform", b + "(" + d + "px)")
                }
            }

            function da(a, b, c, d) {
                if ("1" == d || "3" == d) g($(n.$currentPage), "transform", "scale(0.2)");
                else if ("5" == d || "11" == d) {
                    var e = b > 0 ? "" : "-";
                    g($(n.$currentPage), "transform", a + "(" + e + c + "px)")
                } else g($(n.$currentPage), "transform", "scale(1)");
                g($(n.$activePage), "transform", a + "(0px)")
            }

            this._$app = target_element;
            this._$pages = this._$app.find(".main-page");
            this.$currentPage = this._$pages.eq(0);
            this.$activePage = null;
            this._isInitComplete = !1;
            this._isDisableFlipPage = !1;
            this._isDisableFlipPrevPage = !1;
            this._isDisableFlipNextPage = !1;
            this._scrollMode = pageMode;
            this._pageData = c;
            this.pageData = e;
            pageMode = pageMode;
            this._isforbidHandFlip = e.obj.property.forbidHandFlip;
            n = this;
            s = D || E ?
                window.innerWidth :
                target_element.width();

            t = D || E ?
                window.innerHeight :
                target_element.height();

            var ea = $("#con"),
                fa = !1;

            ("8" == pageMode || "9" == pageMode) && (M = 800);
            // (N = .7, M = 800);

            0 == pageMode ||
            1 == pageMode ||
            2 == pageMode ||
            6 == pageMode ||
            7 == pageMode ||
            8 == pageMode ||
            11 == pageMode ||
            12 == pageMode ?
                x = !0 :
                (3 == pageMode || 4 == pageMode || 5 == pageMode || 10 == pageMode) &&
                (w = !0);

            x ?
                (y = $(".ctrl_panel_dir .ctrl-down"), window.$nextCtrl = $(".ctrl_panel_dir .ctrl-up")) :
                w && (y = $(".ctrl_panel_dir .ctrl-right"), window.$nextCtrl = $(".ctrl_panel_dir .ctrl-left"));

            e.obj.property.hasOwnProperty("triggerLoop") || (e.obj.property.triggerLoop = !0);

            B = e.obj.property.triggerLoop;

            e.obj.property.autoFlip && (v = 1e3 * e.obj.property.autoFlipTime, d());

            var ga;
            if (c[0].elements && c[0].elements.length) {
                for (var ha = 0; ha < c[0].elements.length; ha++) {
                    ga || (yxbCore.shakeTrigger(c, n.$currentPage), ga = !0);
                    var ia = h(c[0].elements[ha].id);
                    eqxCommon.bindTrigger(ia, c[0].elements[ha])
                }
            }

            (function () {
                A
                    .on("scroll.elasticity", function (a) {
                        a.preventDefault()
                    })
                    .on("touchmove.elasticity", function (a) {
                        if ($('.phone-view').length > 0) {
                            a.preventDefault()
                        }
                    });

                A.delegate("img", "mousemove", function (a) {
                    a.preventDefault()
                })
            })();

            if ("10" != pageMode) {
                var ja = !1;
                n._$app
                    .on("mousedown touchstart", function (a) {
                        n._isforbidHandFlip || (o(a), ja = !0)
                    })
                    .on("mousemove touchmove", function (event) {
                        n._isforbidHandFlip || ja && p(event)
                    })
                    .on("mouseup touchend mouseleave", function (a) {
                        n._isforbidHandFlip || (q(a), ja = !1)
                    })
            } else {
                turnBook(e);
            }

            o = function (a) {
                fa = !1;
                D && a && (a = event);
                n._isDisableFlipPage ||
                (
                    n.$currentPage = n._$pages.filter(".z-current").get(0),
                    C || (n.$activePage = null),
                    n.$currentPage &&
                    completeEffect($(n.$currentPage)) &&
                    (
                        J = !0,
                            K = !1,
                            L = !0,
                            H = 0,
                            I = 0,
                            a && "mousedown" == a.type ?
                                (F = a.pageX, G = a.pageY) :
                                a && "touchstart" == a.type && (
                                    F = a.touches ?
                                        a.touches[0].pageX :
                                        a.originalEvent.touches[0].pageX,
                                        G = a.touches ?
                                            a.touches[0].pageY :
                                            a.originalEvent.touches[0].pageY
                                ),
                            n.$currentPage.classList.add("z-move"),
                            f(n.$currentPage.style, "Transition", "none"),
                        "12" == n._scrollMode && (n.$currentPage.style.zIndex = 3)
                    )
                )
            };

            p = function (event) {
                D && event && (event = event);

                J && n._$pages.length > 1 &&
                (
                    event && "mousemove" == event.type ?
                        (H = event.pageX - F, I = event.pageY - G) :
                        event && "touchmove" == event.type && (H = (event.touches ? event.touches[0].pageX : event.originalEvent.touches[0].pageX) - F, I = (event.touches ? event.touches[0].pageY : event.originalEvent.touches[0].pageY) - G),
                    !fa && (Math.abs(H) > 20 || Math.abs(I) > 20) && (fa = !0),
                        "0" == n._scrollMode ||
                        "2" == n._scrollMode ||
                        "1" == n._scrollMode ||
                        "15" == n._scrollMode ?
                            j() :
                            "4" == n._scrollMode ||
                            "3" == n._scrollMode ?
                                l() :
                                "5" == n._scrollMode ?
                                    r() :
                                    "6" == n._scrollMode ?
                                        P() :
                                        "7" == n._scrollMode ?
                                            R() :
                                            "8" == n._scrollMode ?
                                                T() :
                                                "9" == n._scrollMode ?
                                                    X() :
                                                    "11" == n._scrollMode ?
                                                        z() :
                                                        "12" == n._scrollMode ?
                                                            Z() :
                                                            "13" == n._scrollMode ?
                                                                V() :
                                                                "14" == n._scrollMode && V()
                )
            };

            function init_guide_pageIndex(){
                $.each(n._$pages,function(idx,item){
                    if($(item).hasClass('z-active')){
                        //换页更新轮播下标
                        $('.viewPageIndex').eq(idx).attr('src',require('../../images/activeIndex.png')).siblings().attr('src',require('../../images/commonIndex.png'));
                        //换页判断是否尾页隐藏上拉提示图
                        if(idx === n._$pages.length-1){
                            $('#guide').hide()
                        }else {
                            $('#guide').show()
                        }
                    }
                })
            };

            q = function (a) {
                if (J && completeEffect($(n.$currentPage))) {
                    J = !1;
                    if (n.$activePage) {
                        n._isDisableFlipPage = !0;
                        var b;
                        b = "6" == n._scrollMode || "7" == n._scrollMode ?
                            "cubic-bezier(0,0,0.99,1)" :
                            "12" == n._scrollMode ?
                                "cubic-bezier(.17,.67,.87,.13)" :
                                "linear";

                        n.$currentPage.style.webkitTransition = "-webkit-transform " + window.pageChangeTime[0] + "s " + b;

                        n.$activePage.style.webkitTransition = "-webkit-transform " + window.pageChangeTime[0] + "s " + b;

                        n.$currentPage.style.mozTransition = "-moz-transform " + window.pageChangeTime[0] + "s " + b;

                        n.$activePage.style.mozTransition = "-moz-transform " + window.pageChangeTime[0] + "s " + b;

                        n.$currentPage.style.transition = "transform " + window.pageChangeTime[0] + "s " + b;

                        n.$activePage.style.transition = "transform " + window.pageChangeTime[0] + "s " + b;

                        "0" == n._scrollMode ||
                        "2" == n._scrollMode ||
                        "1" == n._scrollMode ||
                        "15" == n._scrollMode ?
                            k() :
                            "4" == n._scrollMode ||
                            "3" == n._scrollMode ?
                                m() :
                                "5" == n._scrollMode ?
                                    u() :
                                    "6" == n._scrollMode ?
                                        Q() :
                                        "7" == n._scrollMode ?
                                            S() :
                                            "8" == n._scrollMode ?
                                                U() :
                                                "9" == n._scrollMode ?
                                                    Y() :
                                                    "11" == n._scrollMode ?
                                                        O() :
                                                        "12" == n._scrollMode ?
                                                            _() :
                                                            "13" == n._scrollMode ?
                                                                W() :
                                                                "14" == n._scrollMode && W();

                        var c = $(n.$activePage).find(".m-img").attr("id").replace("page", "") - 1;

                        n._pageData[c].properties &&
                        n._pageData[c].properties.longPage &&
                        $(document).trigger("clearTouchPos");

                        $(n.$activePage).find("li.comp-resize").each(function (a) {
                            for (var b = 0; b < n._pageData[c].elements.length; b++) {
                                if (n._pageData[c].elements[b].id == parseInt($(this).attr("id").substring(7), 10)) {
                                    eqxCommon.animation($(this), n._pageData[c].elements[b], "view", n._pageData[c].properties);
                                    var d = h(n._pageData[c].elements[b].id);
                                    eqxCommon.bindTrigger(d, n._pageData[c].elements[b])
                                }
                            }
                        });

                        for (var d = 0; d < n._pageData.length; d++) {
                            n._pageData[d].effObj && (n._pageData[d].effObj.pause = !0);
                        }

                        n._pageData[c].effObj &&
                        n._pageData[c].effObj.startPlay();

                        yxbCore.setPageHis(n._pageData[c].id);
                    } else {
                        n.$currentPage.classList.remove("z-move");
                    }


                    init_guide_pageIndex()
                }

                C = !1
            };

            $(n._$pages.eq(0)).find("li.comp-resize").each(function (a) {
                for (var b = 0; b < n._pageData[0].elements.length; b++) {
                    if (n._pageData[0].elements[b].id == parseInt($(this).attr("id").substring(7), 10)) {
                        eqxCommon.animation($(this), n._pageData[0].elements[b], "view", n._pageData[0].properties);
                    }
                }
            });

            $(document).on("flipend", function (a) {
                completeEffect($(n.$activePage)) || $("#audio_btn").css("opacity", 0);

                var d = $("#report0"),
                    g = $(n.$activePage).find(".m-img").attr("id").substring(4),
                    h = [];

                c = n._pageData;

                c[g - 1].elements &&
                c[g - 1].elements.length &&
                (h = c[g - 1].elements, $.each(h, function (a, b) {
                    "d" == b.type && yxbCore.getShowCount(e.obj.id).then(function (a) {
                        var c = yxbCore.fixedNum(a);
                        $("#" + b.id).find(".counter-number").text(c)
                    })
                }));

                yxbCore.clearTyperText(c[g - 1]);

                setTimeout(function () {
                    f(n.$currentPage.style, "Transition", "none");
                    $(n.$activePage).removeClass("z-active z-move").addClass("z-current");
                    $(n.$currentPage).removeClass("z-current z-move");
                    n._isDisableFlipPage = !1;
                    // n.$currentPage = $(n.$activePage).trigger("currentPage");//wjptest
                    $(n.$currentPage).trigger("hide");
                    utilSound.pause();
                    d.length && d.remove();

                    ("8" == pageMode || "9" == pageMode || "12" == pageMode) &&
                    ($(n.$currentPage).css("z-index", "1"), $(".main-page").attr("style", ""));

                    yxbCore.shakeTrigger(c, n.$currentPage);

                    B || (1 == g ? y.removeClass("enabled") : g == n._pageData.length ? $nextCtrl.removeClass("enabled") : (y.addClass("enabled"), $nextCtrl.addClass("enabled")));

                    window.wechatUtils && wechatUtils.stopWechatSound()
                }, M)
            });

            $(document).on("startAutoFlip", function (a) {
                e.obj.property.autoFlip && d()
            });
            yxbCore.showProgressBar(e, n._$pages, target_element)
        };

    abccc = n;

    function pageScroll(a, d) {
        for (var e, f = 0, g = n._pageData.length; g > f; f++) {
            a == n._pageData[f].id && (e = n._pageData[f].num);
        }

        e || (e = a);
        if (d) {
            if (1 == e) return;
            $(n.$currentPage).removeClass("z-current");
            n.$currentPage = $(n.$currentPage).siblings(".main-page").find("#page" + e).parent().addClass("z-current");
        } else if ("10" != n._scrollMode) {
            C = !0;
            var h = $(n.$currentPage).find(".m-img").attr("id").substring(4),
                i = $(n.$currentPage).siblings(".main-page").find("#page" + e);

            if (!i) return;

            n.$activePage = $(i).parent(".main-page").get(0);
            h > e ?
                prePage() :
                e > h && nextPage()
        } else flipBookScroll(a)
    }

    function prePage(a) {
        // 按上一页会进到这里来

        if (!(w && 2 == a || x && 1 == a)) {

            if ("10" != n._scrollMode) {
                var b = 0;

                o();
                if (window.pageChangeTime[0] != 0.4) {
                    if(window.pageChangeTime[0] == 0){
                        b=22;
                        "0" == n._scrollMode ||
                        "1" == n._scrollMode ||
                        "2" == n._scrollMode ||
                        "6" == n._scrollMode ||
                        "7" == n._scrollMode ||
                        "8" == n._scrollMode ||
                        "11" == n._scrollMode ||
                        "12" == n._scrollMode ||
                        "13" == n._scrollMode ||
                        "14" == n._scrollMode ||
                        "15" == n._scrollMode ?
                            I = b :
                            (
                                "3" == n._scrollMode ||
                                "4" == n._scrollMode ||
                                "5" == n._scrollMode ||
                                "9" == n._scrollMode
                            ) &&
                            (H = b);
                        p();
                        q(), B || n.$activePage || clearInterval(z)
                    }else{
                        var c = setInterval(function () {
                            b -= 2;

                            "0" == n._scrollMode ||
                            "1" == n._scrollMode ||
                            "2" == n._scrollMode ||
                            "6" == n._scrollMode ||
                            "7" == n._scrollMode ||
                            "8" == n._scrollMode ||
                            "11" == n._scrollMode ||
                            "12" == n._scrollMode ||
                            "13" == n._scrollMode ||
                            "14" == n._scrollMode ||
                            "15" == n._scrollMode ?
                                I = b :
                                (
                                    "3" == n._scrollMode ||
                                    "4" == n._scrollMode ||
                                    "5" == n._scrollMode ||
                                    "9" == n._scrollMode
                                ) &&
                                (H = b);

                            p();

                            -21 >= b && (clearInterval(c), q(), B || n.$activePage || clearInterval(z))
                        }, 1)
                    }
                }
                else {
                    var c = setInterval(function () {
                        b += 2;

                        "0" == n._scrollMode ||
                        "1" == n._scrollMode ||
                        "2" == n._scrollMode ||
                        "6" == n._scrollMode ||
                        "7" == n._scrollMode ||
                        "8" == n._scrollMode ||
                        "11" == n._scrollMode ||
                        "12" == n._scrollMode ||
                        "13" == n._scrollMode ||
                        "14" == n._scrollMode ||
                        "15" == n._scrollMode ?
                            I = b :
                            (
                                "3" == n._scrollMode ||
                                "4" == n._scrollMode ||
                                "5" == n._scrollMode ||
                                "9" == n._scrollMode
                            ) &&
                            (H = b);

                        p();

                        b >= 21 && (clearInterval(c), q())

                    }, 1)
                }
            } else {
                $(document).trigger("bookFlipPre")
            }

        }
    }

    function nextPage(a) {
        // 按下一页会进到这里来
        if (!(w && 2 == a || x && 1 == a)) {

            if ("10" != n._scrollMode) {
                u = !1;
                var b = 0;

                "block" == $("body .boards-panel").css("display") &&
                ($("body .boards-panel").hide(), $("body .z-currentPage").show());

                o();
                // if ("7" == n._scrollMode) {
                //     I = -22;
                //     p();
                //     q(), B || n.$activePage || clearInterval(z)
                // }
                if (window.pageChangeTime[0] != 0.4) {
                    if(window.pageChangeTime[0] == 0){
                        b = -22;
                        "0" == n._scrollMode ||
                        "1" == n._scrollMode ||
                        "2" == n._scrollMode ||
                        "6" == n._scrollMode ||
                        "7" == n._scrollMode ||
                        "8" == n._scrollMode ||
                        "11" == n._scrollMode ||
                        "12" == n._scrollMode ||
                        "13" == n._scrollMode ||
                        "14" == n._scrollMode ||
                        "15" == n._scrollMode ?
                            I = b :
                            (
                                "3" == n._scrollMode ||
                                "4" == n._scrollMode ||
                                "5" == n._scrollMode ||
                                "9" == n._scrollMode
                            ) &&
                            (H = b);
                        p();
                        q(), B || n.$activePage || clearInterval(z)
                    }else{
                        var c = setInterval(function () {
                            b -= 2;

                            "0" == n._scrollMode ||
                            "1" == n._scrollMode ||
                            "2" == n._scrollMode ||
                            "6" == n._scrollMode ||
                            "7" == n._scrollMode ||
                            "8" == n._scrollMode ||
                            "11" == n._scrollMode ||
                            "12" == n._scrollMode ||
                            "13" == n._scrollMode ||
                            "14" == n._scrollMode ||
                            "15" == n._scrollMode ?
                                I = b :
                                (
                                    "3" == n._scrollMode ||
                                    "4" == n._scrollMode ||
                                    "5" == n._scrollMode ||
                                    "9" == n._scrollMode
                                ) &&
                                (H = b);

                            p();

                            -21 >= b && (clearInterval(c), q(), B || n.$activePage || clearInterval(z))
                        }, 1)
                    }
                }else {
                    var c = setInterval(function () {
                        b -= 2;

                        "0" == n._scrollMode ||
                        "1" == n._scrollMode ||
                        "2" == n._scrollMode ||
                        "6" == n._scrollMode ||
                        "7" == n._scrollMode ||
                        "8" == n._scrollMode ||
                        "11" == n._scrollMode ||
                        "12" == n._scrollMode ||
                        "13" == n._scrollMode ||
                        "14" == n._scrollMode ||
                        "15" == n._scrollMode ?
                            I = b :
                            (
                                "3" == n._scrollMode ||
                                "4" == n._scrollMode ||
                                "5" == n._scrollMode ||
                                "9" == n._scrollMode
                            ) &&
                            (H = b);

                        p();

                        -21 >= b && (clearInterval(c), q(), B || n.$activePage || clearInterval(z))
                    }, 1)
                }
            } else {
                $(document).trigger("bookFlipNext");
            }
        }
    }

    function jumpPage(index,func) {
        // 卡片翻页模式下，直接翻到第一页
        if ("10" != n._scrollMode) {
            var b = 0;

            o();
            if (window.pageChangeTime[0] != 0.4) {
                b=-22;
                "0" == n._scrollMode ||
                "1" == n._scrollMode ||
                "2" == n._scrollMode ||
                "6" == n._scrollMode ||
                "7" == n._scrollMode ||
                "8" == n._scrollMode ||
                "11" == n._scrollMode ||
                "12" == n._scrollMode ||
                "13" == n._scrollMode ||
                "14" == n._scrollMode ||
                "15" == n._scrollMode ?
                    I = b :
                    (
                        "3" == n._scrollMode ||
                        "4" == n._scrollMode ||
                        "5" == n._scrollMode ||
                        "9" == n._scrollMode
                    ) &&
                    (H = b);
                n.jumpOk = true;
                p();
                $(n._$pages[n._$pages.length-1]).attr({'class':'main-page z-current'});
                $(n._$pages[index]).attr({'class':'main-page z-active'});
                n.$activePage = n._$pages[index];
                q(), B || n.$activePage || clearInterval(z);
                func()
            }
        } else {
            $(document).trigger("bookFlipPre")
        }
    }
    function d() {
        z = setInterval(function () {
            10 === n._scrollMode || J || nextPage()
        }, v)
    }

    function pauseAutoFlip() {
        clearInterval(z)
    }

    function f() {
        n.$activePage = n._$pages.last().get(0);
        n._$pages.parent().find(".z-current").removeClass("z-current");
        n._$pages.last().addClass("z-current");
    }

    function removeLastPage(a) {
        a ?
            n._$pages.last().prev().remove() :
            n._$pages.last().remove()
    }

    function changeScrollMode(a) {
        n._scrollMode = a;
        r = a;
        _scrollMode = a
    }

    function forbidHandFlip(a) {
        n._isforbidHandFlip = a
    }

    function startAutoFlip(a) {
        v = 1e3 * a;
        pauseAutoFlip();
        d()
    }

    function changeAppPage() {
        n._$pages = n._$app.find(".main-page")
    }

    function lastPage(a) {
        n._$pages.parent().find(".z-current").removeClass("z-current");

        a ?
            (n.$activePage = n._$pages.last().prev().get(0), n._$pages.last().prev().addClass("z-current")) :
            (n.$activePage = n._$pages.last().get(0), n._$pages.last().addClass("z-current"));
    }

    function setPageData(a) {
        n._pageData = a
    }

    function setTriggerLoop(a) {
        B = a
    }
    return {
        pageScroll: pageScroll,
        nextPage: nextPage,
        prePage: prePage,
        lastPage: lastPage,
        app: app,
        pauseAutoFlip: pauseAutoFlip,
        removeLastPage: removeLastPage,
        changeScrollMode: changeScrollMode,
        startAutoFlip: startAutoFlip,
        changeAppPage: changeAppPage,
        setTriggerLoop: setTriggerLoop,
        forbidHandFlip: forbidHandFlip,
        setPageData: setPageData,
        jumpPage: jumpPage
    }
}();

export {eqxiu}