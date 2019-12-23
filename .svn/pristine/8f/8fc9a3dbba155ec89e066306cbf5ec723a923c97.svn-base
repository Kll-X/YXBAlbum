import {isWeixin} from "./checkEnv.js";
import * as ajax from "../../lib/ajax.js";

const components = {};

components["1"] = function (eleDef) {
    var ret = document.createElement("div");
    ret.id = eleDef.id;
    ret.setAttribute("class", "element comp_title");
    eleDef.content && (ret.textContent = eleDef.content);
    if (eleDef.css) {
        var eleStyle, eleCss = eleDef.css;
        for (eleStyle in eleCss) {
            ret.style[eleStyle] = eleCss[eleStyle]
        }
    }
    if (eleDef.properties.labels) {
        for (var e = eleDef.properties.labels, f = 0; f < e.length; f++) {
            $('<a class = "label_content" style = "display: inline-block;">').appendTo($(ret)).html(e[f].title).css(e[f].color).css("width", 100 / e.length + "%");
        }
    }
    return ret
};

components["2"] = function (eleDef) {

    var element = document.createElement("div");
    element.id = eleDef.id;
    element.setAttribute("ctype", eleDef.type);
    element.setAttribute("class", "element comp_paragraph editable-text");
    eleDef.content && (
        eleDef.properties.anim &&
        eleDef.properties.anim.length &&
        "typer" === eleDef.properties.anim[0].type ?
            element.innerHTML = "" :
            element.innerHTML = eleDef.content
    );
    element.style.cursor = "default";
    eleDef.css.fontSize && (element.style.fontSize = eleDef.css.fontSize + "px", element.style.padding = "0.3em 5px");
    /*
    * element.content为<span>编辑文字</span>
    * element加载后，往其中添加<a>标签

    setTimeout(function () {
        var id = ""+element.id;
        var href = localStorage.getItem(id)
        var span = $("#"+id).find('span');
        if( span.length > 0){
            var text = span.text();
            var child = "<a href="+href+" class='hint--right hint--rounded'"+"data-hint="+href+">"+ text + "</a>";
            span.html(child)
        }
    })*/

    return element;
};

components["x"] = function (eleDef) {
    function b() {
        c = document.createElement("div");
        c.id = eleDef.id;
        c.setAttribute("ctype", eleDef.type);
        c.setAttribute("class", "element comp_paragraph editable-text");
        eleDef.content && (c.innerHTML = eleDef.content);
        c.style.cursor = "default"
    }

    var c;
    !mobilecheck() &&
    window.top === window.self &&
    $(".create_left").get(0)
    b();
    return c
};

components["3"] = function (eleDef, editArea) {

    var d, e = document.createElement("div");

    d = editArea.parent(".edit_wrapper");


    if (2 !== eleDef.properties.croptype) {
        var f = "100%";
        //取得初始化的背景框高度
        // var f = b.properties.pageLength != "100%" ?
        //     b.properties.pageLength * 486+'px':
        //     '100%';

        $(e).prependTo(d);

        2 !== eleDef.properties.croptype || (f = 486 * eleDef.properties.pageLength + "px", $(e).parent().css("overflow", "visible"));

        $(e).css({
            width: "100%",
            height: f
        })
    }

    var g, h = new Image;

    if (eleDef.properties.imgSrc) {
        g = eleDef.properties.imgSrc;
        var i = /\?imageMogr2/,
            j = /.svg/;
        yxbCore.isMobileApp() || j.test(g) || (g += i.test(g) ? "" : "");
        if (2 === eleDef.properties.croptype) {
            var k = "";
            k = /^http.*!/.test(g) ? "url(" + g + ")" : "url(" + PREFIX_FILE_HOST + g + ")";

            editArea.css({
                backgroundImage: k,
                height: 486 * (eleDef.properties.pageLength - 1) + (mobilecheck() ? $(document).height() : 486) + "px"
            });

            return e
        }

        /^http.*!/.test(g) ?
            (h.src = g, e.style.backgroundImage = "url(" + g + ")") :
            (h.src = PREFIX_FILE_HOST + g, e.style.backgroundImage = "url(" + PREFIX_FILE_HOST + g + ")");

        e.style.backgroundOrigin = "element content-box";
        e.style.backgroundSize = "cover";
        e.style.backgroundPosition = "50% 50%";
        eleDef.effect &&
        (
            "scaleUp" === eleDef.effect.type ?
                $(e).css({
                    animation: "scaleUp 7s ease 1s",
                    "animation-fill-mode": "both"
                }) :
                "scaleDown" === eleDef.effect.type && $(e).css({
                    animation: "scaleDown 7s ease 1s",
                    "animation-fill-mode": "both"
                })
        )
    } else {
        eleDef.properties.bgColor && (e.style.backgroundColor = eleDef.properties.bgColor);
    }
    return e
};

components["4"] = function (eleDef, undefined, imgUrl) {

    var d, e = new RegExp(yxbCore.getDomain(PREFIX_FILE_HOST)),
        f = /http/.test(eleDef.properties.src) ||
            /weixin/.test(eleDef.properties.src) ?
            eleDef.properties.src :
            PREFIX_FILE_HOST + eleDef.properties.src;
    var g = /\?imageMogr2/,
        h = /.svg/;

    yxbCore.isMobileApp() || (f = f.replace(OLD_FILE_HOST, PREFIX_FILE_HOST));

    if(eleDef.properties.endPage){
        f = imgUrl;
    }

    if(eleDef.properties.report){
        let sceneId = location.hash.split('/')[2];
        eleDef.properties.url = PREFIX_JAVA + "assets/index.html#/report/" + sceneId;
    }

    if (eleDef.properties.replacement) {
        if (typeof eleDef.properties.replaced !== "undefined") {
            if (eleDef.properties.replaced === true) {
                parsePicture();
            } else {
                //1、根据serverId从自有后台下载图片
                // 如果成功下载就替换图片并渲染，把replaced字段设为true
                // 如果失败就从微信端下载图片并替换，不设置replaced字段
                parsePicture();
            }
        } else {
            parsePicture()
        }
    } else {
        parsePicture()
    }

    function parsePicture() {
        if (e.test(f) && !h.test(f)) {
            if (g.test(f)) {
                f += "";
            } else {
                var i = eleDef.css;
                if (i) {
                    var j = parseInt(eleDef.css.height, 10),
                        k = parseInt(eleDef.css.width, 10);
                    f += 600 >= j && 600 >= k ? "" : ""
                } else {
                    f += "?imageMogr2/strip"
                }
            }
        }
        if (eleDef.properties.filter) {
            if (eleDef.properties.filter.type) {
                var l = c(),
                    m = l[eleDef.properties.filter.type - 1];
                d = document.createElement("div");
                var n;
                n = mobilecheck() ?
                    '<svg width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg"><g><image width="100%" height="100%" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="' + f + '" filter="url(#' + eleDef.id + ')"></image><defs><filter id="' + eleDef.id + '"><feColorMatrix class="saturation" color-interpolation-filters="sRGB" type="matrix" values="' + m.path + '"></feColorMatrix></filter></defs></g></svg>' :
                    '<svg width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg"><g><image width="100%" height="100%" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="' + f + '" filter="url(' + window.location.href + "#" + eleDef.id + ')"></image><defs><filter id="' + eleDef.id + '"><feColorMatrix class="saturation" color-interpolation-filters="sRGB" type="matrix" values="' + m.path + '"></feColorMatrix></filter></defs></g></svg>';
                d.innerHTML = n
            }
        } else if(eleDef.properties.replacement) {
            d = document.createElement("div");
            d.id = eleDef.id;
            d.setAttribute("ctype", eleDef.type);
            d.setAttribute("class", "element comp_image editable-image");
            d.style.width = "100%";
            d.style.height = "100%";
            d.style.backgroundImage = "url(" + f + ")";
            // d.style.backgroundSize = eleDef.properties.imgStyle.backgroundSize ? eleDef.properties.imgStyle.backgroundSize : "cover";
            d.style.backgroundPositionX = eleDef.properties.imgStyle.backgroundPositionX ? eleDef.properties.imgStyle.backgroundPositionX : "50%";
            d.style.backgroundPositionY = eleDef.properties.imgStyle.backgroundPositionY ? eleDef.properties.imgStyle.backgroundPositionY : "50%";
            d.style.backgroundRepeat = "no-repeat";
            if(eleDef.properties.imgStyle.backgroundSizeX && eleDef.properties.imgStyle.backgroundSizeY){
                d.style.backgroundSize = eleDef.properties.imgStyle.backgroundSizeX + " " + eleDef.properties.imgStyle.backgroundSizeY;
            } else {
                d.style.backgroundSize = "cover";
            }
            // d.style.transform = "translateZ(0)";
        } else {
            d = document.createElement("img");
            d.id = eleDef.id;
            d.setAttribute("ctype", eleDef.type);
            d.setAttribute("class", "element comp_image editable-image");
            d.src = f;
            // d.style.transform = "translateZ(0)";
        }

        "" + eleDef.type == "403" &&
        d.setAttribute("data-event", "1120611");

        "" + eleDef.type == "403" &&
        eleDef.properties.wxSrc &&
        isWeixin() &&
        (d.style.display = "none");
    }
    return d
};

components["h"] = function (eleDef) {
    var b, c;
    if (eleDef.properties.src) return b = document.createElementNS(eqxiuSvg.NAMESPACE, "svg"), b.setAttribute("class", "element svg-element"), $.ajax({
        type: "GET",
        url: PREFIX_FILE_HOST + eleDef.properties.src,
        dataType: "xml",
        success: function (c) {
            var e = c.getElementsByTagName("svg"),
                f = parseFloat($(e).attr("width")),
                g = parseFloat($(e).attr("height")),
                h = $(e).find('[fill], [style*="fill"]'),
                i = eleDef.properties.items ? eleDef.properties.items : [];
            if (eleDef.properties.items)
                if (i[0].elements || (eleDef.properties.items = d(i, h)), h.length === i.length)
                    for (var j = 0; j < i.length; j++) h.eq(j).css({
                        fill: i[j].fill
                    });
                else $.each(h, function (a, b) {
                    for (var c = 0; c < i.length; c++)
                        for (var d = i[c].elements, e = 0; e < d.length; e++) a === d[e] && ("" !== i[c].fill ? h.eq(a).css({
                            fill: i[c].fill
                        }) : h.eq(a).css({
                            fill: "none"
                        }))
                });
            else {
                var k = [],
                    l = {};
                $.each(h, function (a, b) {
                    var c = $(b).attr("style");
                    if (c) {
                        for (var d = c.split(";"), e = 0, f = d.length; f > e; e++)
                            if (d[e].indexOf("fill:") >= 0) {
                                k.push(d[e].split(":")[1]);
                                break
                            }
                    } else k.push($(b).attr("fill"))
                });
                for (var m = 0; m < k.length; m++) l[k[m]] || (l[k[m]] = 1, "none" !== k[m] ? i.push({
                    fill: k[m],
                    svgFill: k[m]
                }) : i.push({
                    fill: "",
                    svgFill: "none"
                }));
                eleDef.properties.items = d(i, h)
            }
            viewBoxVal = "0 0 " + f + " " + g;
            var n = b.parentNode;
            n.removeChild(b), b = e[0], n.appendChild(b), b.setAttribute("viewBox", viewBoxVal), b.setAttribute("preserveAspectRatio", "none"), b.setAttribute("width", "100%"), b.setAttribute("height", "100%"), b.id = eleDef.id, b.setAttribute("class", "element svg-element")
        }
    }), b;
    if (eleDef.properties.type.indexOf("symbol") < 0) {
        var b = document.createElementNS(eqxiuSvg.NAMESPACE, "svg");
        return b.id = eleDef.id, b.setAttribute("class", "element svg-element"), b.setAttribute("xmlns", eqxiuSvg.NAMESPACE), b.setAttribute("version", "1.1"), b.setAttribute("width", "100%"), b.setAttribute("height", "100%"), b.setAttribute("preserveAspectRatio", "none"), c = eqxiuSvg.ShapeFromType(eleDef.properties.type), c.setAttribute("fill", "#555"), b.appendChild(c), s = eqxiuSvg.boundingBox(c), viewBox = [Math.round(s.x) || 0, Math.round(s.y) || 0, Math.round(s.width) || 32, Math.round(s.height) || 32].join(" "), b.setAttribute("viewBox", viewBox), b
    }
    return b = document.createElement("div"), c = eqxiuSvg.ShapeFromType(eleDef.properties.type, 100, 100, eleDef.id, eleDef.css.color), b = '<svg id="' + eleDef.id + '" class="element svg-element" ctype="' + eleDef.type + '" xmlns="' + eqxiuSvg.NAMESPACE + '" version="1.1" width="100%" height="100%" preserveAspectRatio="xMidYMid" viewBox="' + eleDef.properties.viewBox + '">' + c + "</svg>"
};

components["v"] = function (eleDef) {
    var b = document.createElement("a");
    return b.setAttribute("class", "element video_area"), b.id = eleDef.id, b.setAttribute("ctype", eleDef.type), eleDef.properties.src && b.setAttribute("videourl", eleDef.properties.src), b
};

components["5"] = function (eleDef, j) {

    // console.log("----4444-----")
    // console.log(a)
    var b = document.createElement("textarea");
    var placeholder = true;

    $(b).focus(function () {
        if ($(this).attr("placeholder") != "") {
            placeholder = $(this).attr("placeholder")
        }
        // console.log(placeholder)
        $(this).attr("placeholder", '')
    }).blur(function (c) {
        // console.log(placeholder)
        var val = $(this).val()
        var _this = $(this)
        if (val != "") {
            val = _this.val();
        } else {
            val = $(this).attr("placeholder", placeholder);
            // console.log(val)
        }

    });

    return b.id = eleDef.id,
        // b.setAttribute("ctype", a.type),
        // b.getAttribute("ctype") == 502 ? b.setAttribute("class", "element comp_input editable-text username") : b.getAttribute("ctype") == 501 ? b.setAttribute("class", "element comp_input editable-text formName") : b.getAttribute("ctype") == 504 && a.properties.placeholder == "公司（必填）" ? b.setAttribute("class", "element comp_input editable-text company") : b.setAttribute("class", "element comp_input editable-text"), b.setAttribute("maxlength", "300"), a.properties.required && b.setAttribute("required", a.properties.required), a.properties.placeholder && b.setAttribute("placeholder", a.properties.placeholder), b.setAttribute("name", "eq[f_" + a.id + "]"), b.style.width = "100%", b
        b.setAttribute("ctype", eleDef.type),
        b.setAttribute("class", "element comp_input editable-text"), b.setAttribute("maxlength", "300"), eleDef.properties.required && b.setAttribute("required", eleDef.properties.required), eleDef.properties.placeholder && b.setAttribute("placeholder", eleDef.properties.placeholder), b.setAttribute("name", "eq[f_" + eleDef.id + "]"), b.style.width = "100%", b

};

components["r"] = function (eleDef) {
    var b = $('<div class="element comp_radio editable-text" id="' + eleDef.id + '"></div>');
    b.attr("ctype", eleDef.type), b.attr("required", eleDef.properties.required), b.attr("title", eleDef.title), b.attr("name", "eq[f_" + eleDef.id + "]");
    var c = $('<div class="radio-title">' + eleDef.title + "</div>");
    eleDef.properties.titleStyle && c.css(eleDef.properties.titleStyle), b.append(c);
    var d = $('<div class="options"></div>'),
        e = JSON.parse(eleDef.choices);
    return $.each(e.options, function (b, c) {
        var f = $('<div class="option-group"  style="display:' + c.display + '"><label class="option-label"        for="' + (eleDef.id + "" + (b + 1)) + '" data-event="11208"><input class="option" id="' + (eleDef.id + "" + (b + 1)) + '" type="radio" name="eq[f_' + eleDef.id + ']" value="' + c.value + '" data-event="11208" ' + (c.picked ? "checked" : '') + ' >' + c.label + "</label></div>");
        eleDef.properties.optionStyle && b < e.options.length - 1 && f.css(eleDef.properties.optionStyle), d.append(f)
    }), b.append(d), b.width("100%"), b.get(0)
};

components["c"] = function (eleDef) {
    var b = $('<div class="element comp_radio editable-text" id="' + eleDef.id + '"></div>');
    b.attr("ctype", eleDef.type), b.attr("required", eleDef.properties.required), b.attr("title", eleDef.title), b.attr("name", "eq[f_" + eleDef.id + "]");
    var c = $('<div class="radio-title">' + eleDef.title + "(可多选)</div>");
    eleDef.properties.titleStyle && c.css(eleDef.properties.titleStyle), b.append(c);
    var d = $('<div class="options"></div>'),
        e = JSON.parse(eleDef.choices);
    return $.each(e.options, function (b, c) {
        var f = $('<div class="option-group"   style="display:' + c.display + '" ><label class="option-label"       for="' + (eleDef.id + "" + (b + 1)) + '" data-event="11209"><input class="option" id="' + (eleDef.id + "" + (b + 1)) + '" type="checkbox" name="eq[f_' + eleDef.id + ']" value="' + c.value + '" data-event="11209" ' + (c.checked ? "checked" : '') + ' >' + c.label + "</label></div>");
        eleDef.properties.optionStyle && b < e.options.length - 1 && f.css(eleDef.properties.optionStyle), d.append(f)
    }), b.append(d), b.width("100%"), b.get(0)
};

components["a"] = function (eleDef) {
    var b = $('<div class="element comp_rating editable-text" id="' + eleDef.id + '"></div>');
    b.attr("ctype", eleDef.type), b.attr("required", eleDef.properties.required), b.attr("title", eleDef.title), b.attr("name", "eq[f_" + eleDef.id + "]"), b.append($('<div class="rating-title">' + eleDef.title + "</div>"));
    for (var c = $('<div class="rating-icons"></div>'), d = 0; 5 > d; d++) c.append($('<i class="' + eleDef.properties.icon + "-line " + eleDef.properties.size + '">').css("color", eleDef.properties.color));
    return b.append(c), b.append($('<input type="hidden" name="eq[f_' + eleDef.id + ']" value="">')), b.width("100%"), b.get(0)
};

components["n"] = function (eleDef) {
    if (eleDef.properties && eleDef.properties.pics.length) {
        var b = $('<div id="' + eleDef.id + '" class="random-event element comp_image editable-image" ctype="' + eleDef.type + '"></div>');
        eleDef.css.width || (eleDef.css.width = "180px");
        var c = 180 * parseInt(eleDef.properties.pics[0].height, 10) / parseInt(eleDef.properties.pics[0].width, 10);
        return eleDef.css.height || (eleDef.css.height = c + "px"), $.each(eleDef.properties.pics, function (a, c) {
            var d = $('<img src="' + PREFIX_FILE_HOST + c.src + '">');
            d.css({
                width: "100%",
                height: "100%",
                display: "none"
            }), 0 === a && (d.css({
                display: "block"
            }), b.css({
                width: "100%",
                height: "100%"
            })), b.append(d)
        }), b.get(0)
    }
};

components["6"] = function (eleDef) {
    var b = document.createElement("button");
    if (b.id = eleDef.id, b.setAttribute("ctype", eleDef.type), b.setAttribute("class", "element comp_button editable-text submitButton"), b.setAttribute("data-event", "11201"), eleDef.properties.title) {
        var c = eleDef.properties.title.replace(/ /g, "&nbsp;");
        b.innerHTML = c
    }
    return b.style.width = "100%", b
};

components["8"] = function (eleDef) {
    var b = document.createElement("a");
    b.id = eleDef.id, b.setAttribute("ctype", eleDef.type), b.setAttribute("class", "element comp_anchor editable-text"), b.setAttribute("data-event", "1120602");
    var c = null;

    eleDef.properties.imgSrc ?
        (
            c = $('<img style="width: 100%; height: 100%;" src="' + (PREFIX_FILE_HOST + eleDef.properties.imgSrc) + '"/>'), $(b).html(c), $(b).attr("href", "tel:" + eleDef.properties.number)
        ) :
        eleDef.properties.title &&
        (
            c = eleDef.properties.title.replace(/ /g, "&nbsp;"), $(b).html(c), $(b).attr("href", "tel:" + eleDef.properties.number)
        );

    b.style.cursor = "default";
    b.style.width = "100%";

    return b
};

components["l"] = function (eleDef) {
    var b = document.createElement("a");
    b.id = eleDef.id, b.setAttribute("ctype", eleDef.type), b.setAttribute("class", "element comp_anchor editable-text"), b.setAttribute("data-event", "1120601");
    var c = null;
    return eleDef.properties.imgSrc ? (c = $('<img style="width: 100%; height: 100%;" src="' + (PREFIX_FILE_HOST + eleDef.properties.imgSrc) + '"/>'), $(b).html(c)) : eleDef.properties.title && (c = eleDef.properties.title.replace(/ /g, "&nbsp;"), $(b).html(c)), b.style.cursor = "default", b.style.width = "100%", b
};

components["s"] = function (eleDef) {
    // console.log(eleDef)
    // console.log(eleDef.sound.src)
    var src = 'Uploads/' + eleDef.sound.src
    // console.log(src)
    var b = document.createElement("a");
    var flag = true;
    $(b).click(function () {
        if (flag) {
            flag = false;
            play()
        } else {
            flag = true;
            pause()
        }
    })

    function play() {
        audio.setAttribute("src", src);
        audio.setAttribute("autoplay", "autoplay");
    }

    function pause() {
        audio.setAttribute("src", '');
        audio.removeAttribute("autoplay");
    }

    b.id = eleDef.id, b.setAttribute("ctype", eleDef.type), b.setAttribute("class", "element comp_anchor editable-text"), b.setAttribute("data-event", "1120604"), b.setAttribute("id", "musicEffect");
    var audio = document.createElement("audio");
    var c = null;
    return eleDef.properties.imgSrc ? (c = $('<img style="width: 100%; height: 100%;" src="' + (PREFIX_FILE_HOST + eleDef.properties.imgSrc) + '"/>'), $(b).html(c)) : eleDef.properties.title && (c = eleDef.properties.title.replace(/ /g, "&nbsp;"), $(b).html(c)), b.style.cursor = "default", b.style.width = "100%", $(b).append(audio), audio.setAttribute("src", ''), b
};

components["i"] = function (eleDef) {

    var c = $('<div class="element comp_counter not-voted editable-text" id="' + eleDef.id + '"></div>');

    c.attr("ctype", eleDef.type);
    c.attr("name", "eq[f_" + eleDef.id + "]");
    c.addClass(eleDef.properties.layout).addClass(eleDef.properties.size);

    var d = $('<div class="counter-container"></div>');

    eleDef.properties.imgSrc ?
        (d.append($('<img class="counter-elem counter-icon" style="width: 115px; height: 115px; margin: 0 auto;" src="' + (PREFIX_FILE_HOST + eleDef.properties.imgSrc) + '"/>')), d.attr("data-event", "1120609")) :
        (d.append($('<i class="counter-elem counter-icon ' + eleDef.properties.icon + '">').css("color", eleDef.properties.color)), "eqf-love" === eleDef.properties.icon ? d.attr("data-event", "1120605") : "eqf-good" === eleDef.properties.icon ? d.attr("data-event", "1120606") : "eqf-flower2" === eleDef.properties.icon ? d.attr("data-event", "1120607") : "eqf-vote" === eleDef.properties.icon && d.attr("data-event", "1120608"));

    var e = $('<span class="counter-elem counter-number">0</span>').css("color", eleDef.properties.color);

    d.append(e);

    yxbCore.counterValues && yxbCore.counterValues.then(function (c) {
        var d = c.map[eleDef.id] || 0;
        e.attr("data-counter-number", d);
        var f = yxbCore.fixedNum(d);
        e.text(f)
    })
    c.width("100%");

    if ("counter-tb" === eleDef.properties.layout) {
        var f = 0;
        f = eleDef.properties.imgSrc ?
            "counter-l" === eleDef.properties.size ?
                77 :
                "counter-m" === eleDef.properties.size ?
                    71 :
                    66 :
            "counter-l" === eleDef.properties.size ?
                40 :
                "counter-m" === eleDef.properties.size ?
                    30 :
                    20;
        d.css("margin-top", -f)
    }

    c.append(d);

    eleDef.css.lineHeight && c.css("line-height", eleDef.css.lineHeight);

    return c.get(0)
};

components["d"] = function (eleDef) {
    var c = $('<div class="element comp_counter editable-text" id="' + eleDef.id + '"></div>');
    c.attr("ctype", eleDef.type), c.addClass(eleDef.properties.layout).addClass(eleDef.properties.size);
    var d = $('<div class="counter-container"></div>');
    d.append($('<i class="counter-elem counter-icon ' + eleDef.properties.icon + '">').css("color", eleDef.properties.color));
    var e = $('<span class="counter-elem counter-number">0</span>').css("color", eleDef.properties.color);

    d.append(e);
    yxbCore.showCount && yxbCore.showCount.then(function (b) {
        var c = yxbCore.fixedNum(b),
            d = c || 0;
        e.text(d)
    });
    c.width("100%");

    if ("counter-tb" === eleDef.properties.layout) {
        var f = 0;
        f = "counter-l" === eleDef.properties.size ? 40 : "counter-m" === eleDef.properties.size ? 30 : 20, d.css("margin-top", -f)
    }
    return c.append(d), eleDef.css.lineHeight && c.css("line-height", eleDef.css.lineHeight), c.get(0)
};

components["7"] = function (eleDef) {
    var b = document.createElement("div");
    if (b.id = "map_" + eleDef.id, b.setAttribute("class", "element comp_map_wrapper"), eleDef.content && (b.textContent = eleDef.content), eleDef.css) {
        var c, d = eleDef.css;
        for (c in d) b.style[c] = d[c]
    }
    return b.style.height = "250px", b
};

components["m"] = function (eleDef) {
    var b, c,
        d = new qq.maps.LatLng(eleDef.properties.lat ? eleDef.properties.lat : 39.916527, eleDef.properties.lng ? eleDef.properties.lng : 116.397128);

    b = document.createElement("div");
    b.id = eleDef.id;
    b.setAttribute("ctype", eleDef.type);
    b.setAttribute("class", "element");
    c = {
        disableDefaultUI: !0,
        center: d,
        zoom: eleDef.properties.zoom ? eleDef.properties.zoom : 11
    };
    $(b).on("mousedown mousemove mouseup mouseleave touchstart touchmove touchend", function (a) {
        a.stopPropagation()
    });

    var e = new qq.maps.Map(b, c);
    var g = new qq.maps.Point(25, 5),
        h = new qq.maps.Size(34, 34),
        i = new qq.maps.Point(0, 0),
        j = new qq.maps.MarkerImage(PREFIX_HOST + "/assets/images/marker.png", h, i, g),
        k = new qq.maps.Marker({
            map: e,
            position: e.getCenter()
        });
    return k.setIcon(j), $(b).data("marker", k), b
};

components["w"] = function (eleDef) {
    var b, c = document.createElement("a");
    return "" + eleDef.type == "w01" ? (b = "element comp_wechat_play", c.innerHTML = '<span style="font-size:16px;" class="eqf-nosy"></span>') : "" + eleDef.type == "w02" && (b = "element comp_wechat_hear", c.innerHTML = eleDef.properties.title, c.setAttribute("data-event", "1120612")), c.id = eleDef.id, c.setAttribute("class", b), c.setAttribute("ctype", eleDef.type), c
};

components["t"] = function (eleDef) {
    var b = $('<div class="create-chart" id="chart-' + eleDef.id + '"></div>'),
        c = document.createElement("h5");
    c.setAttribute("class", "chart-title"), b.append(c);
    var d = document.createElement("canvas");
    d.id = eleDef.id, d.setAttribute("ctype", eleDef.type), b.append(d);
    var e = document.createElement("div");
    e.id = "legend-" + eleDef.id, b.append(e);
    var l, m = eleDef.properties.chartType,
        n = d.getContext("2d"),
        o = v(n);
    if (mobilecheck() && o > 1) {
        var p = parseFloat(eleDef.css.width),
            q = parseFloat(eleDef.css.height) / 2;
        d.width = p, d.height = q, d.style.width = p / o + "px", d.style.height = q / o + "px", n.scale(o, o)
    }
    "pie" === m ? (l = i(n)) : "bar" === m ? (l = j(n)) : ("line" === m || "curve" === m) && (l = k(n, m)), eleDef.properties.chartTitle && (c.innerHTML = eleDef.properties.chartTitle), "pie" === m && eleDef.properties.pieChart && (l = h(eleDef, n, l), $(d).data("pieChart", l)), "bar" === m && eleDef.properties.barChart && (l = g(eleDef, n, l), $(d).data("barChart", l)), "line" !== m && "curve" !== m || !eleDef.properties.lineChart || (l = f(eleDef, n, l), $(d).data("lineChart", l)), e.innerHTML = l.generateLegend();
    var r = eleDef.properties.legPosition;
    return "position-align" === r ? $(e).addClass("position-align") : "position-right" === r ? $(e).addClass("position-right") : "position-none" === r && $(e).addClass("position-none"), mobilecheck() || ($(d).attr("width") && ($(d).removeAttr("width"), $(d).css("width", "100%")), $(d).attr("height") && ($(d).removeAttr("height"), $(d).css("height", "50%")), l.update()), b.get(0)
};

components["z"] = function (eleDef) {
    var b = $('<div style="width:100%;height:100%" id="' + eleDef.id + '"></div>');
    b.attr("ctype", eleDef.type), b.attr("required", eleDef.required);
    var c = $('<button type="button" class="btn dropdown-toggle btn-default" style="width:100%;height:100%;background-color:#ffffff;color:#666;padding-top: 0px;border: 1px solid rgb(8,161,239);font-family: Open Sans, sans-serif;font-weight: 400;font-size: 16px;border-top-left-radius: 0px;border-bottom-left-radius: 0px;border-top-right-radius: 0px;border-bottom-right-radius: 0px;position:absolute;top:0px;left:0px;pointer-events:none;padding-bottom: 0px;padding-right:0px;padding-left:0px;overflow: hidden" data-toggle="dropdown" title="Nothing selected" aria-expanded="false"><span class="filter-option pull-left" style="margin-left: 8px;float:left;width:calc(100% - 42px);width:-moz-calc(100% - 42px);width:-webkit-calc(100% - 42px);overflow:hidden;text-align: left;" id="selectButton' + eleDef.id + '">' + eleDef.showText + '</span>&nbsp;<span class="bs-caret" style="float:right;margin-right:10px;"><span class="caret" style="display: inline-block;width: 0px;height: 0px;vertical-align: middle;border-top:4px dashed;border-right: 4px solid transparent;border-left: 4px solid transparent;margin-left: 0px;"></span></span></button>');
    b.append(c);
    var d = JSON.parse(eleDef.choices).options,
        e = $('<select style="width:100%;height:100%; " name="eq[f_' + eleDef.id + ']"></select>');
    e.attr("ctype", eleDef.type), e.attr("data-event", "11210");
    var f = null,
        g = 0;
    return f = eleDef.placeholderText === eleDef.showText ? $('<option value="' + eleDef.placeholderText + '" selected>' + eleDef.placeholderText + "</option>") : $('<option value="' + eleDef.placeholderText + '">' + eleDef.placeholderText + "</option>"), e.append(f), $.each(d, function (b, c) {
        c.label === eleDef.showText ? (g++, f = $('<option value="' + c.label + '" selected>' + c.label + "</option>")) : f = $('<option value="' + c.label + '">' + c.label + "</option>"), e.append(f)
    }), $(e).change(function () {
        $("#selectButton" + eleDef.id).text($(e).val())
    }), b.append(e), b
};

components["b"] = function (eleDef) {
    var b, c, d = document.createElement("div"),
        e = document.createDocumentFragment(),
        // f = $('<div class="tool"><a class="replay">' + a.properties.meslabel + '</a><a class="more">' + a.properties.morelabel + "</a></div>").get(0);
        f = $('<div class="tool"><a class="replay" style="margin-left:72px">' + eleDef.properties.meslabel + '</a></div>').get(0);
    e.appendChild(f);
    p(eleDef.sceneId, function (b, c) {
        if (0 === c || 1 == c || 2 == c) {
            var e = $('<div class="empty-boards"><image style="margin-top:-20px;" src="../view/images/default_boards.png" /></div>').get(0);
            d.appendChild(e)
        }
        // if (0 === c) {
        //     var e = $('<div class="empty-boards"><image style="margin-top:-20px;" src="' + CLIENT_CDN + "view/images/" + a.properties.style + '_boards.png" /></div>').get(0);
        //     d.appendChild(e)
        // } else d.appendChild(b)
    });
    return d.appendChild(e), d.id = eleDef.id, d.setAttribute("class", "element boards-" + eleDef.properties.style), d.setAttribute("ctype", eleDef.type), d
};

components["g"] = function (eleDef, mode) {
    var c = document.createElement("div");
    "edit" === mode && $('<div class="over-ele"></div><div class="ad-contain"></div>').appendTo(c);

    eleDef.content &&
    (
        "edit" === mode ?
            $(c).find(".ad-contain").append($(eleDef.content)) :
            ($(eleDef.content).appendTo(c), eleDef.css.zIndex = 1e5)
    );

    c.id = eleDef.id;
    c.setAttribute("class", "element");
    c.setAttribute("ctype", eleDef.type);

    return c
};


//pc端新增组件，需要在手机相册此处，注入相关的外观逻辑代码
components["F"] = function (eleDef, mode) {
    return
};

export default components;