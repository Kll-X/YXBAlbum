var tplCount = 0;
var eqxCommon = function() {
    var convertType = function(animType) {
            var type, direction, typeCode = animType.type;
            return "typer" === typeCode && (type = "typer"),
                0 === typeCode && (type = "fadeIn"),
                1 === typeCode && (direction = animType.direction,
                    0 === direction && (type = "fadeInLeft"),
                    1 === direction && (type = "fadeInDown"),
                    2 === direction && (type = "fadeInRight"),
                    3 === direction && (type = "fadeInUp")),
                6 === typeCode && (type = "wobble"),
                5 === typeCode && (type = "rubberBand"),
                7 === typeCode && (type = "rotateIn"),
                8 === typeCode && (type = "flip"),
                9 === typeCode && (type = "swing"),
                2 === typeCode && (direction = animType.direction,
                    0 === direction && (type = "bounceInLeft"),
                    1 === direction && (type = "bounceInDown"),
                    2 === direction && (type = "bounceInRight"),
                    3 === direction && (type = "bounceInUp")),
                3 === typeCode && (type = "bounceIn"),
                4 === typeCode && (type = "zoomIn"),
                10 === typeCode && (type = "fadeOut"),
                11 === typeCode && (type = "flipOutY"),
                12 === typeCode && (type = "rollIn"),
                13 === typeCode && (type = "lightSpeedIn"),
                14 === typeCode && (type = "bounceOut"),
                15 === typeCode && (type = "rollOut"),
                16 === typeCode && (type = "lightSpeedOut"),
                17 === typeCode && (direction = animType.direction,
                    0 === direction && (type = "fadeOutRight"),
                    1 === direction && (type = "fadeOutDown"),
                    2 === direction && (type = "fadeOutLeft"),
                    3 === direction && (type = "fadeOutUp")),
                18 === typeCode && (type = "zoomOut"),
                19 === typeCode && (direction = animType.direction, 0 === direction && (type = "bounceOutRight"), 1 === direction && (type = "bounceOutDown"), 2 === direction && (type = "bounceOutLeft"), 3 === direction && (type = "bounceOutUp")),
            20 === typeCode && (type = "flipInY"),
            21 === typeCode && (type = "tada"),
            22 === typeCode && (type = "jello"),
            23 === typeCode && (type = "flash"),
            26 === typeCode && (type = "twisterInDown"),
            27 === typeCode && (type = "puffIn"),
            28 === typeCode && (type = "puffOut"),
            29 === typeCode && (type = "slideDown"),
            30 === typeCode && (type = "slideUp"),
            24 === typeCode && (type = "flipInX"),
            25 === typeCode && (type = "flipOutX"),
            31 === typeCode && (type = "twisterInUp"),
            32 === typeCode && (type = "vanishOut"),
            33 === typeCode && (type = "vanishIn"),
                type
        },
        animation = function(JDomElement, element, mode, properties, e) {
            function f(a, d, e, g, h) {
                if (e.length && i < e.length) {
                    if ("typer" == d[i]) {
                        var j = a.find(".element"),
                            k = e[i].interval,
                            l = e[i].delay;
                        if (g && h.top > 486 && "view" === mode) {
                            var m = function(c, g) {
                                Math.abs(g) > h.top && (j.data("typed") && (clearInterval(j.data("typed").timeout), j.removeData("typed")), j.empty(), j.typed({
                                    strings: [element.content],
                                    contentType: "html",
                                    showCursor: !1,
                                    typeSpeed: 1e3 * k || 0,
                                    startDelay: 1e3 * l || 0,
                                    callback: function() {
                                        clearInterval(j.data("typed").timeout), j.removeData("typed"), i++, f(a, d, e)
                                    }
                                }), $(document).unbind("pageScrollPos", m))
                            };
                            return void $(document).bind("pageScrollPos", m)
                        }
                        j.data("typed") && (clearInterval(j.data("typed").timeout), j.removeData("typed")), j.empty(), j.typed({
                            strings: [element.content],
                            contentType: "html",
                            showCursor: !1,
                            typeSpeed: 1e3 * k || 0,
                            startDelay: 1e3 * e[i].delay || 0,
                            callback: function() {
                                clearInterval(j.data("typed").timeout), j.removeData("typed"), i++, f(a, d, e)
                            }
                        })
                    }
                    a.css("animation", "");
                    a.get(0);
                    a.css("animation", d[i] + " " + e[i].duration + "s ease " + e[i].delay + "s " + (e[i].countNum ? e[i].countNum : ""));

                    "view" === mode ?
                        (e[i].count && i === e.length - 1 && a.css("animation-iteration-count", "infinite"), a.css("animation-fill-mode", "backwards")) :
                        (a.css("animation-iteration-count", "1"), a.css("animation-fill-mode", "backwards"));

                    e[i].linear && a.css("animation-timing-function", "linear");

                    if (g && h.top > 486 && "view" === mode) {
                        a.css("display", "none");
                        var n = function(b, c) {
                            Math.abs(c) > h.top && (a.css("display", "block"), $(document).unbind("pageScrollPos", n))
                        };
                        $(document).bind("pageScrollPos", n)
                    }
                    a.one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
                        i++, f(a, d, e)
                    })
                }
            }

            // if (element.trigger && element.trigger.receives && element.trigger.receives.length && !e && "view" === mode) {
            //     for (var g = element.trigger.receives, h = 0; h < g.length; h++)
            //         if (1 == g[h].type && g[h].ids.length) return;
            // }

            var i = 0;
            if (element.properties && element.properties.anim) {
                var j = [];
                element.properties.anim.length ? j = element.properties.anim : j.push(element.properties.anim);
                var k = $(".element-box", JDomElement);
                k.attr("element-anim", "");
                var l, m = [], n = [];

                for (var h = 0, o = j.length; o > h; h++) {
                    null != j[h].type &&
                    -1 != j[h].type &&
                    (l = eqxCommon.convertType(j[h]), m.push(l), n.push(j[h]));
                }
                if (properties && properties.scale) return;
                element.properties.anim.trigger ? JDomElement.click(function() {
                    f(k, l, element.properties.anim)
                }) : properties && properties.longPage ? f(k, m, n, !0, element.css) : f(k, m, n)
            }
        },
        bindTrigger = function(a, element) {
            var c, d = $(a);
            if (element.trigger && element.trigger.receives && element.trigger.receives.length) {
                $.each(element.trigger.receives, function(index, item) {
                    if (item.ids.length) {
                        var f = utilTrigger.getHandleType(item.type).name;
                        ("show" == f || "randomEvent" == f) && d.hide(), "hide" == f && d.show(), d.bind(f, function(a, e) {
                            if ("show" == f) $(this).show(), c || (c = !0, eqxCommon.animation(d, element, "view", null, !0));
                            else if ("hide" == f) $(this).hide(), c = !1;
                            else if ("randomEvent" == f) {
                                yxbCore.playTriggerSound(), $(this).show();
                                var g = Math.floor(Math.random() * element.properties.pics.length);
                                $(this).find("img").css({
                                    display: "none"
                                }), $(this).find("img").eq(g).css({
                                    display: "block"
                                })
                            }
                        })
                    }
                })
            }
        },
        getFirstBrowserLanguage = function() {
            var a, b, c = window.navigator,
                d = ["language", "browserLanguage", "systemLanguage", "userLanguage"];
            if ($.isArray(c.languages))
                for (a = 0; a < c.languages.length; a++)
                    if (b = c.languages[a], b && b.length) return b;
            for (a = 0; a < d.length; a++)
                if (b = c[d[a]], b && b.length) return b;
            return null
        };
    return {
        convertType: convertType,
        animation: animation,
        bindTrigger: bindTrigger,
        getFirstBrowserLanguage: getFirstBrowserLanguage
    }
}();

export {eqxCommon};