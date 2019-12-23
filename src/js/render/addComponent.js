import {isAndroid,isWeixin} from "./checkEnv.js"
import {eqxCommon} from "./005eqxCommon.js"

import components from "./yxbCoreComponents.js"
import afterRenderEvents from "./afterRenderEvents.js"
import messageBus from "../../components/messageBus.js"

/// 请合并我把
! function(yxbCore) {

    var u = {};
    var v = function(a) {
        var b = a.webkitBackingStorePixelRatio || a.mozBackingStorePixelRatio || a.msBackingStorePixelRatio || a.oBackingStorePixelRatio || a.backingStorePixelRatio || 1,
            c = (window.devicePixelRatio || 1) / b;
        return c
    };
    var w;

    function AddStyleContent(styleContent) {
        var styleElement = document.getElementsByTagName("style")[0];
        styleElement || (styleElement = document.createElement("style"), head = document.head || document.getElementsByTagName("head")[0], styleElement.type = "text/css", head.appendChild(styleElement));
        var c = document.createTextNode(styleContent);
        styleElement.appendChild(c)
    }

    function c() {
        var a = [{
            value: 1,
            path: "1.7 0.1 0.1 0 -0.287 0 1.7 0.1 0 -0.287 0 0.1 1.6 0 -0.287 0 0 0 1.0 0"
        }, {
            value: 2,
            path: "2.1 -1.4 0.6 0.0 -0.12 -0.3 2.0 -0.3 0.0 -0.12 -1.1 -0.2 2.6 0.0 -0.12 0.0 0.0 0.0 1.0 0.0"
        }, {
            value: 3,
            path: "1.9 -0.3 -0.2 0 -0.341 -0.2  1.7 -0.1  0 -0.341 -0.1 -0.6 2.0 0 -0.341 0 0 0 1.0 0"
        }, {
            value: 4,
            path: "1.0 0.0 0.0 0.0 -0.26 0.0 1.1 0.0 0.0 -0.26 0.0 0.0 1.0 0.0 -0.26 0.0 0.0 0.0 1.0 0.0"
        }, {
            value: 5,
            path: "1.2 0.0 0.0 0.0 0.0 0.0 0.9 0.0 0.0 0.0 0.0 0.0 0.8 0.0 0.0 0 0 0 1.0 0"
        }, {
            value: 6,
            path: "0.8 0.3 0.1 0.0 0.182 0.1 0.9 0.0 0.0 0.182 0.1 0.3 0.7 0.0 0.182 0.0 0.0 0.0 1.0 0.0"
        }, {
            value: 7,
            path: "0.9 0 0 0 0.255 0 0.9 0 0 0.255 0 0 0.9 0 0.255 0 0 0 1.0 0"
        }, {
            value: 8,
            path: "0.6 0.3 0.1 0 0.28745 0.2 0.7 0.1 0 0.28745 0.2 0.3 0.4 0 0.28745 0 0 0 1.0 0"
        }, {
            value: 9,
            path: "0.8 1.6 0.2 0 -0.639 0.8 1.6 0.2 0 -0.639 0.8 1.6 0.2 0 -0.639 0 0 0 1.0 0"
        }, {
            value: 10,
            path: "0.2 0.5 0.1 0 0.16 0.2 0.5 0.1 0 0.16 0.2 0.5 0.1 0 0.16 0 0 0 1 0"
        }, {
            value: 11,
            path: "4.8 -1.0 -0.1 0 -1.523 -0.5 4.4 -0.1 0 -1.523 -0.5 -1.0 5.2 0 -1.523 0 0 0 1.0 0"
        }];
        return a
    }

    function d(a, b) {
        for (var c = 0; c < a.length; c++) {
            var d = [];
            $.each(b, function(b, e) {
                var f, g = $(e).attr("style");
                if (g) {
                    for (var h = g.split(";"), i = 0, j = h.length; j > i; i++)
                        if (h[i].indexOf("fill:") >= 0) {
                            f = h[i].split(":")[1];
                            break
                        }
                } else f = $(e).attr("fill");
                f === a[c].svgFill && d.push(b)
            });
            a[c].elements = d
        }
        return a
    }

    function f(a, b, c) {
        var d, e = a.properties.lineChart,
            f = [],
            g = "",
            h = "",
            i = "",
            j = [],
            k = [],
            l = [],
            m = [],
            n = [];
        c.datasets.forEach(function(a) {
            m.push(a.strokeColor), n.push(a.fillColor)
        });
        for (var o = 0; o < m.length; o++) "line" === e.chartType ? m[o] = e.fillColors[o] : n[o] = e.fillColors[o];
        for (var p = e.segments, q = 0; q < p.length; q++) d = p[q], g = isNaN(d.value1) || d.value1 < 0 ? 0 : d.value1, h = isNaN(d.value2) || d.value2 < 0 ? 0 : d.value2, i = isNaN(d.value3) || d.value3 < 0 ? 0 : d.value3, (d.label || g || h || i) && (f.push(d.label), j.push(g), k.push(h), l.push(i));
        var r = {
                labels: f,
                datasets: [{
                    label: e.lengends[0],
                    fillColor: n[0],
                    strokeColor: m[0],
                    pointColor: m[0],
                    pointStrokeColor: "#fff",
                    data: j
                }, {
                    label: e.lengends[1],
                    fillColor: n[1],
                    strokeColor: m[1],
                    pointColor: m[1],
                    pointStrokeColor: "#fff",
                    data: k
                }, {
                    label: e.lengends[2],
                    fillColor: n[2],
                    strokeColor: m[2],
                    pointColor: m[2],
                    pointStrokeColor: "#fff",
                    data: l
                }]
            },
            s = c.options;
        return e.options && e.options.scaleFontColor && (s.scaleFontColor = e.options.scaleFontColor), c.destroy(), c = new Chart(b).Line(r, s), c.datasets.forEach(function(a) {
            var b = !0;
            a.points.forEach(function(a) {
                a.value && (b = !1)
            }), b ? a.points.length = 0 : a.points.forEach(function(a) {
                a.value || (a.value = 0)
            })
        }), c.update(), c
    }

    function g(a, b, c) {
        for (var d, e = c.options, f = a.properties.barChart, g = [], h = "", i = "", j = "", k = [], l = [], m = [], n = f.segments, o = 0; o < n.length; o++) {
            var d = n[o];
            h = isNaN(d.value1) || d.value1 < 0 ? "" : d.value1, i = isNaN(d.value2) || d.value2 < 0 ? "" : d.value2, j = isNaN(d.value3) || d.value3 < 0 ? "" : d.value3, (d.label || h || i || j) && (g.push(d.label), k.push(h), l.push(i), m.push(j))
        }
        var p = {
            labels: g,
            datasets: [{
                fillColor: f.fillColors[0],
                strokeColor: "rgba(0,0,0,0)",
                data: k,
                label: f.lengends[0]
            }, {
                fillColor: f.fillColors[1],
                strokeColor: "rgba(0,0,0,0)",
                data: l,
                label: f.lengends[1]
            }, {
                fillColor: f.fillColors[2],
                strokeColor: "rgba(0,0,0,0)",
                data: m,
                label: f.lengends[2]
            }]
        };
        return f.options && f.options.scaleFontColor && (e.scaleFontColor = f.options.scaleFontColor), c.destroy(), new Chart(b).Bar(p, e)
    }

    function h(a, b, c) {
        var d = c.options,
            e = "#000",
            f = a.properties.pieChart;
        f.options && f.options.scaleFontColor && (e = f.options.scaleFontColor), d.scaleFontColor = e, d.onAnimationComplete = function() {
            var a = this.chart.ctx,
                b = this.segments;
            a.textAlign = "start", a.textBaseline = "middle";
            for (var c = 0, d = 0; d < b.length; d++) c += parseFloat(b[d].value);
            a.fillText(c, a.width / 2 - 20, a.height / 2, 100);
            for (var d = 0; d < b.length; d++) {
                var f = b[d].startAngle + (b[d].endAngle - b[d].startAngle) / 2,
                    g = (b[d].outerRadius - b[d].innerRadius) / 1.5 + b[d].innerRadius,
                    h = b[d].x + Math.cos(f) * g,
                    i = b[d].y + Math.sin(f) * g;
                a.textAlign = "center", a.textBaseline = "middle", a.fillStyle = e, a.font = "normal 12px Helvetica", a.fillText(b[d].value, h, i)
            }
        };
        var g = f;
        f.segments && (g = f.segments);
        for (var h = 0; h < g.length; h++)(isNaN(g[h].value) || g[h].value < 0) && (g[h].value = "");
        return c.destroy(), new Chart(b).Pie(g, d)
    }

    function i(a) {
        var b = [{
                value: 300,
                color: "#57c7d4",
                label: "1月"
            }, {
                value: 150,
                color: "#3aa99e",
                label: "2月"
            }, {
                value: 100,
                color: "#f2a654",
                label: "3月"
            }, {
                value: 140,
                color: "#f96868",
                label: "4月"
            }, {
                value: 120,
                color: "#926dde",
                label: "5月"
            }],
            c = {
                segmentShowStroke: !1,
                showTooltips: !1,
                scaleFontColor: "#000",
                legendTemplate: '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<segments.length; i++){%><li><%if(segments[i].label){%><span style="background-color:<%=segments[i].fillColor%>"></span><%=segments[i].label%><%}%></li><%}%></ul>',
                animation: !1,
                onAnimationComplete: function() {
                    var a = this.chart.ctx,
                        b = this.segments;
                    a.textAlign = "start", a.textBaseline = "middle";
                    for (var c = 0, d = 0; d < b.length; d++) c += parseFloat(b[d].value);
                    a.fillText(c, a.width / 2 - 20, a.height / 2, 100);
                    for (var d = 0; d < b.length; d++) {
                        var e = b[d].startAngle + (b[d].endAngle - b[d].startAngle) / 2,
                            f = (b[d].outerRadius - b[d].innerRadius) / 1.5 + b[d].innerRadius,
                            g = b[d].x + Math.cos(e) * f,
                            h = b[d].y + Math.sin(e) * f;
                        a.textAlign = "center", a.textBaseline = "middle", a.fillStyle = "#000", a.font = "normal 12px Helvetica", a.fillText(b[d].value, g, h)
                    }
                }
            },
            d = new Chart(a).Pie(b, c);
        return d
    }

    function j(a) {
        var b = {
                labels: ["1月", "2月", "3月", "4月", "5月"],
                datasets: [{
                    fillColor: "#62a8ea",
                    strokeColor: "rgba(0,0,0,0)",
                    data: [60, 70, 80, 56, 40],
                    label: "图例1"
                }, {
                    fillColor: "#926dde",
                    strokeColor: "rgba(0,0,0,0)",
                    data: [80, 56, 40, 93, 112],
                    label: "图例2"
                }, {
                    fillColor: "#f2a654",
                    strokeColor: "rgba(0,0,0,0)",
                    data: [160, 86, 140, 123, 23],
                    label: "图例3"
                }]
            },
            c = {
                showTooltips: !1,
                scaleShowLabels: !0,
                scaleShowGridLines: !1,
                scaleBeginAtZero: !0,
                legendTemplate: '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><%if(datasets[i].label){%><span style="background-color:<%=datasets[i].fillColor%>"></span><%=datasets[i].label%><%}%></li><%}%></ul>',
                animation: !1,
                onAnimationComplete: function() {
                    var a = this.chart.ctx;
                    a.fillStyle = this.scale.textColor, a.font = "normal 12px Helvetica", a.textAlign = "center", a.textBaseline = "bottom", this.datasets.forEach(function(b) {
                        b.bars.forEach(function(b) {
                            a.fillText(b.value, b.x, b.y)
                        })
                    })
                }
            },
            d = new Chart(a).Bar(b, c);
        return d
    }

    function k(a, b) {
        var c = ["rgba(255,255,255,0)", "rgba(255,255,255,0)", "rgba(255,255,255,0)"],
            d = ["rgba(146,109,222,1)", "rgba(87,199,212,1)", "rgba(242,166,84,1)"],
            e = !1,
            f = '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><%if(datasets[i].label){%><span style="background-color:<%=datasets[i].pointColor%>"></span><%=datasets[i].label%><%}%></li><%}%></ul>';
        "curve" === b && (c = ["rgba(146, 109, 222,0.2)", "rgba(87,199,212,0.2)", "rgba(242,166,84,0.2)"], e = !0, f = '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><%if(datasets[i].label){%><span style="background-color:<%=datasets[i].fillColor%>"></span><%=datasets[i].label%><%}%></li><%}%></ul>');
        var g = {
                labels: ["1月", "2月", "3月", "4月", "5月"],
                datasets: [{
                    label: "图例1",
                    fillColor: c[0],
                    strokeColor: d[0],
                    pointColor: d[0],
                    pointStrokeColor: "#fff",
                    data: [28, 24, 40, 19, 27]
                }, {
                    label: "图例2",
                    fillColor: c[1],
                    strokeColor: d[1],
                    pointColor: d[1],
                    pointStrokeColor: "#fff",
                    data: [123, 132, 146, 118, 189]
                }, {
                    label: "图例3",
                    fillColor: c[2],
                    strokeColor: d[2],
                    pointColor: d[2],
                    pointStrokeColor: "#fff",
                    data: [201, 232, 256, 215, 278]
                }]
            },
            h = {
                showTooltips: !1,
                scaleShowLabels: !0,
                scaleShowGridLines: !1,
                scaleBeginAtZero: !0,
                bezierCurve: e,
                legendTemplate: f,
                animation: !1,
                onAnimationComplete: function() {
                    var a = this.chart.ctx,
                        b = this.scale.max;
                    a.font = this.scale.font, a.fillStyle = this.scale.textColor, a.textAlign = "center", a.textBaseline = "bottom", this.datasets.forEach(function(c) {
                        c.points.forEach(function(d, e) {
                            var f = 5;
                            b - d.value < 10 && (f = 0), 0 === e ? a.fillText(d.value, d.x + 10, d.y - f) : e === c.points.length - 1 ? a.fillText(d.value, d.x - 10, d.y - f) : a.fillText(d.value, d.x, d.y - f)
                        })
                    })
                }
            },
            i = new Chart(a).Line(g, h);
        return i
    }

    function l(a, b) {
        b.properties.url && $(a).click(function() {
            var a = b.properties.url;
            isNaN(a) ? window.open(a) : eqxiu.pageScroll(a)
        })
    }

    function m(a) {
        $(a).bind("touchstart mousedown", function(a) {
            a.stopPropagation()
        })
    }

    function n(a) {
        a.focus(function() {
            eqxiu.pauseAutoFlip()
        }).blur(function() {
            $(document).trigger("startAutoFlip")
        })
    }

    function o(a) {
        for (var b = $(a).find("a[data]"), c = 0; c < b.length; c++)
            if (b[c] && "view" === jsonParser.mode) {
                $(b[c]).css("cursor", "pointer");
                var d = $(b[c]).attr("data");
                !
                function(a) {
                    b[c].removeAttribute("href"), $(b[c]).click(function() {
                        eqxiu.pageScroll(a)
                    })
                }(d)
            }
    }

    function p(b, c, d) {
        var tempAddCompUrl1 = PREFIX_S1_URL + "index.php?c=scenedata&a=getmsg&sceneId="
        var e = tempAddCompUrl1 + b;
        d && (e += "&lastTime=" + d), e += "&date=" + (new Date).getTime(), $.ajax({
            type: "GET",
            url: e,
            success: function(b) {
                if (b.success) {
                    for (var d, e, f, g = document.createDocumentFragment(), h = b.list, i = 0; i < h.length; i++) e = h[i].url ? '<div class="headimg" style="background-image:url(' + h[i].url + ')"></div>' : '<div class="headimg headimg-bg"><div class="logo-scale"><em class="eqf-eqxiu"></em></div></div>', d = $('<div class="record">' + e + '<div class="name">' + h[i].name + '</div><div class="mes">' + h[i].content + '</div><div class="time">' + yxbCore.DateFormit(h[i].createTime, "MM月DD日") + "</div></div>").get(0), g.appendChild(d);
                    10 === h.length ? f = h[h.length - 1].createTime : 0 === h.length && (f = 0), d && g.appendChild(d), c(g, f)
                }
            }
        })
    }

    function q(a, b) {
        if (b.trigger) {
            var c = $(a);
            c.attr("data-event", "1120603");
            w && clearTimeout(w);
            b.trigger.sends && b.trigger.sends.length && $.each(b.trigger.sends, function(a, b) {
                c.bind(utilTrigger.getSendType(b.type).name, function() {
                    w = setTimeout(function() {
                        $.each(b.handles, function(a, b) {
                            var c = utilTrigger.getHandleType(b.type).name;
                            $.each(b.ids, function(a, b) {
                                var d;

                                d = $("#inside_" + b, ".phone-view").length ?
                                    $("#inside_" + b, ".phone-view") :
                                    $("#inside_" + b);

                                d.trigger(c)
                            })
                        })
                    }, 1e3 * b.delay)
                })
            })
        }
    }

    function r(b, c) {
        if (c.sound) {
            var d = $(b),
                e = $("#media").get(0);
            0 === c.sound.src.indexOf("http://") ?
                c.sound.src = c.sound.src :
                c.sound.src = PREFIX_FILE_HOST + c.sound.src;

            utilSound.addAudio(b, c.sound.src);

            d.click(function() {
                utilSound.play(b, function() {
                    e && yxbCore.executePlay()
                }, function() {
                    e && yxbCore.executePause()
                })
            })
        }
    }

    var jsonParser = yxbCore.templateParser("jsonParser", function() {

        function wrapArray(array) {
            return function(index, func) {
                array[index] = func
            }
        }

        function wrapComp(eleDef, mode, coverImage) {
            // try {
            //     var d = components[("" + eleDef.type).charAt(0)](eleDef, c)
            // } catch (e) {
            //     throw
            // }
            var d = components[("" + eleDef.type).charAt(0)](eleDef, mode, coverImage);

            var styleContent, l = eleDef.fonts || eleDef.css.fontFamily || eleDef.fontFamily;

            if (d) {
                var jCompHtml = $('<li comp-drag comp-rotate class="comp-resize comp-rotate inside" id="inside_' + eleDef.id + '" num="' + eleDef.num + '" ctype="' + eleDef.type + '"></li>');

                var eleType = ("" + eleDef.type).charAt(0);

                //todo 暂时解决超出可视区域的图片，编辑或替换后被拉伸的bug
                if(eleType === '4' && (eleDef.properties.imgStyle.marginLeft != '0' ||eleDef.properties.imgStyle.marginTop != '0' ||eleDef.properties.imgStyle.marginLeft != '0px' || eleDef.properties.imgStyle.marginTop != '0px')){
                    eleDef.properties.imgStyle.marginLeft = '0px';
                    eleDef.properties.imgStyle.marginTop = '0px';
                    eleDef.properties.imgStyle.width = eleDef.css.width;
                    eleDef.properties.imgStyle.height = eleDef.css.height;
                    if(eleDef.css.borderRadius !== '0px'){
                        eleDef.properties.imgStyle.position='absolute';
                        eleDef.properties.imgStyle.left= 0;
                        eleDef.properties.imgStyle.top= 0;
                        eleDef.properties.imgStyle.zIndex=-1;
                    }
                }

                "3" !== eleType && "1" !== eleType && jCompHtml.attr("comp-resize", "");

                "p" === eleType ?
                    jCompHtml.removeAttr("comp-rotate") :
                    "1" === eleType ?
                    jCompHtml.removeAttr("comp-drag") :
                    "2" === eleType ?
                    jCompHtml.addClass("wsite-text") :
                    "x" === eleType ?
                    jCompHtml.addClass("show-text") :
                    "4" === eleType ?
                    (eleDef.properties.imgStyle && $(d).css(eleDef.properties.imgStyle), jCompHtml.addClass("wsite-image")) :
                    "n" === eleType ?
                    jCompHtml.addClass("wsite-image") :
                    "h" === eleType ?
                    jCompHtml.addClass("wsite-shape") :
                    "5" === eleType ?
                    jCompHtml.addClass("wsite-input") :
                    "6" === eleType ?
                    jCompHtml.addClass("wsite-button") :
                    "8" === eleType ?
                    jCompHtml.addClass("wsite-button") :
                    "v" === eleType ?
                    jCompHtml.addClass("wsite-video") :
                    "b" === eleType && (jCompHtml.addClass("wsite-boards"), jCompHtml.attr("min-h", 60), jCompHtml.attr("min-w", 230));

                "v" === ("" + eleDef.type).charAt(0) && jCompHtml.addClass("wsite-video");

                eleDef.properties && eleDef.properties.lock && jCompHtml.addClass("alock");

                jCompHtml.mouseenter(function() {
                    $(this).addClass("inside-hover")
                });

                jCompHtml.mouseleave(function() {
                    $(this).removeClass("inside-hover")
                });

                if ("edit" === jsonParser.mode || "x" !== ("" + eleDef.type).charAt(0)) {
                    var h = $('<div class="element-box-contents">'),
                        i = $('<div class="element-box">').append(h.append(d));

                    jCompHtml.append(i);

                    "5" !== ("" + eleDef.type).charAt(0) &&
                        "6" !== ("" + eleDef.type).charAt(0) &&
                        "r" !== eleDef.type &&
                        "c" !== eleDef.type &&
                        "a" !== eleDef.type &&
                        "8" !== eleDef.type &&
                        "l" !== eleDef.type &&
                        "s" !== eleDef.type &&
                        "i" !== eleDef.type &&
                        "h" !== eleDef.type &&
                        "z" !== eleDef.type ||
                        "edit" !== mode ||
                        $(d).before($('<div class="element" style="position: absolute; height: 100%; width: 100%;z-index: 1;">'))
                }
                if ("2" === eleType || "x" === eleType) {
                    for (var eleContent = eleDef.content, reg = /font-family:(.*?);/g, matchResult = [], p = []; null !== (matchResult = reg.exec(eleContent));) {
                        p.push(matchResult[1].trim());
                    }

                    1 !== p.length ||
                        "defaultFont" !== p[0] &&
                        "moren" !== p[0] ||
                        (l = null);

                    if (l) {

                        "view" === jsonParser.mode &&
                            eleDef.css.fontFamily &&
                            window.scene &&
                            (
                                window.scene.publishTime ||
                                !mobilecheck() &&
                                !tabletCheck() ||
                                (
                                    styleContent = "@font-face{font-family:" + eleDef.css.fontFamily + ';src: url("' + eleDef.properties.localFontPath + '") format("truetype");}',
                                    AddStyleContent(styleContent)
                                )
                            );

                        if ("object" === typeof l && l.constructor === Object) {
                            if (!jQuery.isEmptyObject(l)) {
                                for (var q in l) {
                                    u[q] ||
                                        (
                                            "edit" === jsonParser.mode ?
                                            styleContent = "@font-face{font-family:" + q + ";src: url(" + PREFIX_FILE_HOST + l[q] + ") format(woff);}" :
                                            window.scene && window.scene.publishTime && (
                                                styleContent = "@font-face{font-family:" + q + ';src: url("' + PREFIX_S2_URL + "fc/" + q + "_" + eleDef.sceneId + "_" + scene.publishTime + '.woff") format("woff");}'
                                            ),
                                            AddStyleContent(styleContent),
                                            u[q] = !0
                                        )
                                }
                            }
                        } else {
                            u[l] ||
                                (
                                    "edit" === jsonParser.mode ?
                                    styleContent = "@font-face{font-family:" + l + ";src: url(" + PREFIX_FILE_HOST + eleDef.preWoffPath + ") format(woff);}" :
                                    window.scene && window.scene.publishTime && (
                                        styleContent = "@font-face{font-family:" + l + ';src: url("' + PREFIX_S2_URL + "fc/" + l + "_" + eleDef.sceneId + "_" + scene.publishTime + '.woff") format("woff");}'
                                    ),
                                    AddStyleContent(styleContent),
                                    u[l] = !0
                                );
                        }

                        "edit" === jsonParser.mode && localStorage.setItem("shoppingFontFamily", JSON.stringify(u));
                    }
                }

                if (eleDef.css) {
                    var r = 320 - parseInt(eleDef.css.left, 10);

                    jCompHtml.css({
                        width: r
                    });

                    jCompHtml.css({
                        width: eleDef.css.width,
                        height: eleDef.css.height,
                        left: eleDef.css.left,
                        top: eleDef.css.top,
                        zIndex: eleDef.css.zIndex,
                        bottom: eleDef.css.bottom,
                        transform: eleDef.css.transform,
                    });

                    (0 === eleDef.css.boxShadowSize || "" + eleDef.css.boxShadowSize == "0") && (eleDef.css.boxShadow = "0px 0px 0px rgba(0,0,0,0.5)");

                    if ("edit" !== jsonParser.mode && "x" === ("" + eleDef.type).charAt(0)) {
                        jCompHtml.append(d);
                        jCompHtml.find(".element-box").css({
                            borderStyle: eleDef.css.borderStyle,
                            borderWidth: eleDef.css.borderWidth,
                            borderColor: eleDef.css.borderColor,
                            borderTopLeftRadius: eleDef.css.borderTopLeftRadius,
                            borderTopRightRadius: eleDef.css.borderTopRightRadius,
                            borderBottomRightRadius: eleDef.css.borderBottomRightRadius,
                            borderBottomLeftRadius: eleDef.css.borderBottomLeftRadius,
                            boxShadow: eleDef.css.boxShadow,
                            backgroundColor: eleDef.css.backgroundColor,
                            opacity: eleDef.css.opacity,
                            width: "100%",
                            height: "100%",
                            overflow: "hidden"
                        });
                        jCompHtml.find("img").css({
                            width: "100%"
                        });

                        return jCompHtml;
                    }

                    isAndroid() && isWeixin() &&
                        "" + eleDef.type == "4" &&
                        "0px" !== eleDef.css.borderRadius &&
                        0 === eleDef.css.borderWidth &&
                        eleDef.properties.anim &&
                        (eleDef.css.borderWidth = 1, eleDef.css.borderColor = "rgba(0,0,0,0)");

                    var s = $.extend(!0, {}, eleDef.css);

                    delete s.fontFamily;


                    //修复文本增加内容，预览页超出可选框不可视bug
                    if("edit" !== jsonParser.mode && "2" === ("" + eleDef.type).charAt(0)){
                        i.css(s).css({
                            width: "100%",
                            height: "100%",
                            transform: "none",
                            overflow: "visible"
                        });
                    }else{
                        i.css(s).css({
                            width: "100%",
                            height: "100%",
                            transform: "none",
                            overflow: "hidden"
                        });
                    }

                    i.children(".element-box-contents").css({
                        width: "100%",
                        height: "100%",
                        // borderRadius: eleDef.css.borderRadius,
                        // overflow: "hidden",
                    });

                    $(d).css({
                        borderRadius: eleDef.css.borderRadius,
                    });

                    "4" !== ("" + eleDef.type).charAt(0) &&
                        "n" !== ("" + eleDef.type).charAt(0) &&
                        "p" !== ("" + eleDef.type).charAt(0) &&
                        "h" !== ("" + eleDef.type).charAt(0) &&
                        "t" !== ("" + eleDef.type).charAt(0) &&
                        "z" !== ("" + eleDef.type).charAt(0) &&
                        $(d).css({
                            width: eleDef.css.width,
                            height: eleDef.css.height
                        });

                    ("w01" === eleDef.type || "w02" === eleDef.type) &&
                    $(d).css({
                        lineHeight: eleDef.css.height + "px"
                    });

                    "h" === ("" + eleDef.type).charAt(0) &&
                        (
                            $(d).find("g").length ?
                            $(d).find("g").attr("fill", eleDef.css.color) :
                            $(d).children().attr("fill", eleDef.css.color),
                            i.children(".element-box-contents").css("position", "relative")
                        )
                }

                return jCompHtml
            }
        }

        function rearrangeZindex(a) {
            for (var b = 0; b < a.length - 1; b++)
                for (var c = b + 1; c < a.length; c++)
                    if (parseInt(a[b].css.zIndex, 10) > parseInt(a[c].css.zIndex, 10)) {
                        var d = a[b];
                        a[b] = a[c], a[c] = d
                    }
            for (var e = 0; e < a.length; e++) a[e].css.zIndex = e + 1 + "";
            return a
        }

        function e(pageDef, editWrapper, mode, coverImage) {
            editWrapper = editWrapper.find(".edit_area");
            var f, g = pageDef.elements;

            function bgLengthInit(bgCompObj) {
                bgCompObj.properties.pageLength = pageDef.properties && pageDef.properties.longPage ?
                    pageDef.properties.longPage :
                    '100%';
            }

            if (g) {
                for (g = rearrangeZindex(g), f = 0; f < g.length; f++) {
                    g[f].sceneId = pageDef.sceneId;
                    if ("" + g[f].type === "3") {

                        //初始化背景框的高度
                        // bgLengthInit(g[f]);

                        var h = components[("" + g[f].type).charAt(0)](g[f], editWrapper);

                    } else {
                        var i = wrapComp(g[f], mode, coverImage);

                        if (!i) continue;

                        editWrapper.append(i);

                        afterRenderEvents[("" + g[f].type).charAt(0)] && afterRenderEvents[("" + g[f].type).charAt(0)](i, g[f])
                    }
                    // let ele = new Element(g[f], editWrapper);
                    //
                    // ele.render();
                }
            }

            messageBus.$emit("showPhoneView");
        }

        // function Element(eleDef, editWrapper) {
        //     this.eleDef = eleDef;
        //     this.editWrapper = editWrapper;
        // }
        //
        // Element.prototype.render = function () {
        //     if ("" + this.eleDef.type === "3") {
        //
        //         let h = components[("" + this.eleDef.type).charAt(0)](this.eleDef, this.editWrapper);
        //
        //     } else {
        //         let i = wrapComp(this.eleDef, "view");
        //
        //         if (i) {
        //             this.editWrapper.append(i);
        //         }
        //     }
        // };

        function getEventHandlers() {
            return eventHandlers
        }

        function getComponents() {
            return components
        }

        function getElementDefSet(key) {
            return elementDefSets[key]
        }

        function getInterceptors() {
            return interceptors
        }

        function addInterceptor(a) {
            interceptors.push(a)
        }
        var compAddFuncs = {},
            compEditFuncs = {},
            compOtherFuncs = {},

            eventHandlers = {},
            elementDefSets = {},
            previews = {},
            interceptors = [],
            n = window.containerWidth=375,
            o = window.containerHeight=667,
            p = 1,
            s = 1,
            ret = {
                addComponent: wrapArray(components),
                getComponents: getComponents,

                addCompAddFunc: wrapArray(compAddFuncs),
                getCompAddFunc: function(key) { return compAddFuncs[key] },

                addCompEditFunc: wrapArray(compEditFuncs),
                getCompEditFunc: function(key) { return compEditFuncs[key] },

                addCompOtherFunc: wrapArray(compOtherFuncs),
                getCompOtherFunc: function(key) { return compOtherFuncs[key] },

                addInterceptor: addInterceptor,
                getInterceptors: getInterceptors,

                addElementDefSet: wrapArray(elementDefSets),
                getElementDefSet: getElementDefSet,

                addPreview: wrapArray(previews),
                getPreview: function(key) { return previews[key] },

                getEventHandlers: getEventHandlers,
                bindEditEvent: wrapArray(eventHandlers),
                bindAfterRenderEvent: wrapArray(afterRenderEvents),

                wrapComp: wrapComp,
                disEvent: !1,
                mode: "view",
                parse: function(options) {
                    var editWrapper = $('<div class="edit_wrapper" data-scene-id="' + options.def.sceneId + '"><div class="wrapper-background" id="4378913315" style="position: absolute; width: 100%; {{\'height:\'+(pageLength*486)+\'px\'}};background: url(/images/yxb/editBg.png) center center; background-size: cover; background-position: 50% 50%; top: 0;z-index: -1"></div><ul eqx-edit-destroy id="edit_area' + options.def.id + '"paste-element class="edit_area weebly-content-area weebly-area-active" style="{{\'height:\'+(pageLength*486)+\'px\'}}" ></div>');

                    var c = this.mode = options.mode;

                    this.def = options.def;

                    options.disEvent && (this.disEvent = !0);

                    "view" === c && window.tplCount++;

                    var d = $(options.appendTo);

                    containerWidth = d.width();
                    containerHeight = d.height();
                    p = n / containerWidth;
                    s = o / containerHeight;
                    return e(options.def, editWrapper.appendTo($(options.appendTo)), c, options.coverImage)
                }
            };

        return ret
    });
}(window.yxbCore);