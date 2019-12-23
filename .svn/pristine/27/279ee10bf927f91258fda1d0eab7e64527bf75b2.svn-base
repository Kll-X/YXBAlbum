import messageBus from '../components/messageBus.js';

export default {
    install (Vue) {
        
        Vue.prototype.toJSON = function () {
            
        };
        
        Vue.directive('img-edit', {
            inserted: function (el, binding) {
                let innerImage = $(el).find('.inner-image');
                let cover = $(el).find('.cover');
                let scaleHandle = $(el).find('.scale-handle');
                let toolBar = $(el).find('.tool-bar');

                innerImage.hide();
                cover.hide();

                innerImage.on("load", function () {

                    // 阻止冒泡，点击后不会触发下层的行为
                    toolBar.on('click touchstart touchmove touchend', function (event) {
                        event.stopPropagation();
                    });
                    scaleHandle.on('click touchstart touchmove touchend', function (event) {
                        event.stopPropagation();
                    });

                    function Item(el) {
                        this.el = el;
                        this.width = this.el.width();
                        this.height = this.el.height();
                        this.selfRate = this.width / this.height;
                        this.oldWidth = 0;
                        this.oldHeight = 0;
                        this.top = 0;
                        this.bottom = 0;
                        this.left = 0;
                        this.right = 0;
                        this.mode = this.el.attr("mode");
                    }

                    /**
                     * @desc set instance size
                     * @param option - { rate: 比例, width, height, top, bottom, left, right, oldWidth, oldHeight }
                     */

                    Item.prototype.setSize = function (option) {
                        if (option.rate) {
                            (this.width *= option.rate) && this.el.width(this.width);
                            (this.height *= option.rate) && this.el.height(this.height);
                        }

                        option.width && (this.width = option.width) && this.el.width(this.width);
                        option.height && (this.height = option.height) && this.el.height(this.height);
                        option.top && (this.top = option.top) && this.el.css("top", this.top + "px");
                        option.bottom && (this.bottom = option.bottom) && this.el.css("bottom", this.bottom + "px");
                        option.left && (this.left = option.left) && this.el.css("left", this.left + "px");
                        option.right && (this.right = option.right) && this.el.css("right", this.right + "px");
                    };

                    Item.prototype.setOldSize = function (option) {
                        this.oldWidth = option.oldWidth;
                        this.oldHeight = option.oldHeight;
                    };

                    let outerItem = new Item($(el));
                    let innerItem = new Item(innerImage);
                    let coverItem = new Item(cover);
                    console.log(coverItem);

                    // 读取或者计算初始scale(页面真实使用的值，比如50，200)，scaleValue(小数，比如0.5,0.1,代码中计算使用的值)
                    let scaleValueX,
                        scaleValueY,
                        scaleX,
                        scaleY,
                        widthPosition = (+binding.value.x.slice(0, -1)).toFixed(2),
                        heightPosition = (+binding.value.y.slice(0, -1)).toFixed(2);

                    let widthRate = outerItem.width / innerItem.width,
                        heightRate = outerItem.height / innerItem.height,
                        coverWidthRate = innerItem.width / coverItem.width,
                        coverHeightRate = innerItem.height / coverItem.height;
                    if(binding.value.scaleX === "cover"){
                        if(coverWidthRate < coverHeightRate){
                            scaleX = 100;
                            scaleY = (coverHeightRate * 100 / coverWidthRate).toFixed(2);
                        } else {
                            scaleY = 100;
                            scaleX = (coverWidthRate * 100 / coverHeightRate).toFixed(2);
                        }

                    } else {
                        scaleX = (+binding.value.scaleX.slice(0, -1)).toFixed(2);
                        scaleY = (+binding.value.scaleY.slice(0, -1)).toFixed(2);
                    }

                    scaleValueX = (100 / scaleX).toFixed(2);
                    scaleValueY = (100 / scaleY).toFixed(2);

                    console.log("scaleValueX:" + scaleValueX);
                    console.log("scaleValueY:" + scaleValueY);
                    console.log("x:" + widthPosition);
                    console.log("y:" + heightPosition);


                    // 第一次调整cover大小，跟原图匹配
                    if (coverWidthRate < coverHeightRate) {
                        coverItem.setSize({rate: coverWidthRate});
                    } else {
                        coverItem.setSize({rate: coverHeightRate});
                    }

                    // 调整原图大小，同时调整cover大小，跟容器匹配
                    if (widthRate < heightRate) {

                        innerItem.setSize({
                            rate: widthRate,
                        });

                        innerItem.setSize({
                            top: (outerItem.height - innerItem.height) / 2,
                            left: 0,
                        });

                        coverItem.setSize({
                            rate: widthRate,
                            top: (outerItem.height - innerItem.height) / 2,
                        });

                    } else {
                        innerItem.setSize({
                            rate: heightRate
                        });
                        innerItem.setSize({
                            left: (outerItem.width - innerItem.width) / 2,
                            top: 0,
                        });
                        coverItem.setSize({
                            rate: heightRate,
                            left: (outerItem.width - innerItem.width) / 2,
                        })
                    }


                    //根据传入数据，再次定位cover

                    if(scaleValueX > scaleValueY){
                        coverItem.setSize({
                            rate: scaleValueX
                        })
                    } else {
                        coverItem.setSize({
                            rate: scaleValueY
                        })
                    }

                    coverItem.setSize({
                        left: (widthPosition * (innerItem.width - coverItem.width) / 100 + innerItem.left).toFixed(2),
                        top: (heightPosition * (innerItem.height - coverItem.height) / 100 + innerItem.top).toFixed(2)
                    });

                    coverItem.setOldSize({
                        oldWidth: coverItem.width,
                        oldHeight: coverItem.height
                    });


                    innerImage.show();
                    cover.show();

                    //绑定行为
                    let leftEdge = 0,
                        rightEdge = 0,
                        topEdge = 0,
                        bottomEdge = 0;

                    scaleHandle.on('touchstart', function () {
                        messageBus.$emit('imgEditShowToolBar', false);
                        coverItem.setOldSize({
                            oldWidth: coverItem.width,
                            oldHeight: coverItem.height
                        });
                    });

                    scaleHandle.on('touchmove touchend', function (event) {
                        event.preventDefault();

                        let type = event.type;
                        // console.log(type)

                        event = event.pageX ? event : event.changedTouches[0];
                        // event = event.changedTouches[0];

                        leftEdge = event.pageX - innerItem.left;
                        rightEdge = outerItem.width - event.pageX - innerItem.left;
                        topEdge = event.pageY - innerItem.top;
                        bottomEdge = outerItem.height - event.pageY - innerItem.top;

                        // if( event.pageX - innerItem.left >= innerItem.width|| event.pageY - innerItem.top >= innerItem.height) {
                        //     return
                        // }

                        if(coverItem.mode){
                            // 设置了coverMode，cover长宽比不固定;
                            // coverItem.setSize({
                            //     width: event.pageX - coverItem.left>60?event.pageX - coverItem.left:60,
                            //     // height: (event.pageX - coverItem.left)/ coverItem.selfRate
                            //     height: event.pageY - coverItem.top>60?event.pageY - coverItem.top:60
                            // })
                            if(event.pageY - innerItem.top > innerItem.height){
                                coverItem.setSize({
                                    height: innerItem.top+innerItem.height - coverItem.top
                                })
                            }else{
                                coverItem.setSize({
                                    height: event.pageY - coverItem.top>60?event.pageY - coverItem.top:60
                                })
                            }
                            if(event.pageX - innerItem.left > innerItem.width){
                                coverItem.setSize({
                                    width: innerItem.left+innerItem.width - coverItem.left
                                })
                            }else{
                                coverItem.setSize({
                                    width: event.pageX - coverItem.left>60?event.pageX - coverItem.left:60,
                                })
                            }

                        }else{
                            // 没有设置coverMode,cover长宽比固定;
                            // coverItem.setSize({
                            //     width: event.pageX - coverItem.left>60?event.pageX - coverItem.left:60,
                            //     height: event.pageX - coverItem.left>60?(event.pageX - coverItem.left)/ coverItem.selfRate:60/coverItem.selfRate
                            //     // height: event.pageY - coverItem.top
                            // })
                            if(event.pageY - innerItem.top > innerItem.height||event.pageX - innerItem.left > innerItem.width) { //超出图片边缘
                                if(event.pageX - innerItem.left <= innerItem.width){ //只有y超出
                                    coverItem.setSize({
                                        width: (innerItem.top+innerItem.height - coverItem.top)* coverItem.selfRate,
                                        height: innerItem.top+innerItem.height - coverItem.top
                                    })
                                }else if(event.pageY - innerItem.top <= innerItem.height){//只有x超出
                                    coverItem.setSize({
                                        width: innerItem.left+innerItem.width - coverItem.left,
                                        height: (innerItem.left+innerItem.width - coverItem.left)/ coverItem.selfRate
                                    })
                                }else{ //x和y都超出
                                    //y超出较多
                                    if((event.pageX - innerItem.left - innerItem.width)/coverItem.selfRate <event.pageY - innerItem.top - innerItem.height){
                                        coverItem.setSize({
                                            width: (innerItem.top+innerItem.height - coverItem.top)* coverItem.selfRate,
                                            height: innerItem.top+innerItem.height - coverItem.top
                                        })
                                    }else{
                                        //x超出较多
                                        coverItem.setSize({
                                            width: innerItem.left+innerItem.width - coverItem.left,
                                            height: (innerItem.left+innerItem.width - coverItem.left)/ coverItem.selfRate
                                        })
                                    }
                                }
                            }else{
                                coverItem.setSize({
                                    width: event.pageX - coverItem.left>60?event.pageX - coverItem.left:60,
                                    height: event.pageX - coverItem.left>60?(event.pageX - coverItem.left)/ coverItem.selfRate:60/coverItem.selfRate
                                    // height: event.pageY - coverItem.top
                                })
                            }

                        }
                        // coverItem.setSize({
                        //     width: event.pageX - coverItem.left,
                        //     // height: (event.pageX - coverItem.left)/ coverItem.selfRate
                        //     height: event.pageY - coverItem.top
                        // });

                        coverItem.setSize({
                            right: outerItem.width - coverItem.left - coverItem.width,
                            bottom: outerItem.height - coverItem.top - coverItem.height
                        });


                        if (type === "touchend") {
                            console.log(`coverItem.width:${coverItem.width}`);
                            scaleValueX = scaleValueX * coverItem.width / coverItem.oldWidth;
                            scaleValueY = scaleValueY * coverItem.height / coverItem.oldHeight;

                            // background-position使用百分比的意思比较特殊，需要搞清楚。参考点既不是上端，不是下端，也不是中心。
                            widthPosition = innerItem.width - coverItem.width < 5 ? 100 :
                                ((coverItem.left - innerItem.left) * 100 / (innerItem.width - coverItem.width)).toFixed(2);
                            heightPosition = innerItem.height - coverItem.height < 5 ? 100 :
                                ((coverItem.top - innerItem.top) * 100 / (innerItem.height - coverItem.height)).toFixed(2);
                            scaleX = ( 100 / scaleValueX ).toFixed(2);
                            scaleY = ( 100 / scaleValueY ).toFixed(2);
                            console.log(`wid1: ${widthPosition}; height: ${heightPosition}; scaleValueX: ${scaleValueX}; scaleValueY: ${scaleValueY}`)
                            messageBus.$emit('imgBgParamsChanged', {
                                widthPosition,
                                heightPosition,
                                scaleX,
                                scaleY
                            });
                            messageBus.$emit('imgEditShowToolBar', true);
                        }

                    });

                    $(el).on('touchstart', function () {
                        messageBus.$emit('imgEditShowToolBar', false);
                    });

                    $(el).on('touchmove touchend', function (event) {

                        event.preventDefault();

                        let type = event.type;
                        event = event.pageX ? event : event.changedTouches[0];

                        leftEdge = event.pageX - innerItem.left;
                        rightEdge = outerItem.width - event.pageX - innerItem.left;
                        topEdge = event.pageY - innerItem.top;
                        bottomEdge = outerItem.height - event.pageY - innerItem.top;

                        if (leftEdge <= coverItem.width / 2) {
                            coverItem.setSize({
                                left: innerItem.left,
                                right: outerItem.width - innerItem.left - coverItem.width
                            });
                        } else if (rightEdge <= coverItem.width / 2) {
                            coverItem.setSize({
                                right: innerItem.left,
                                left: outerItem.width - innerItem.left - coverItem.width
                            })
                        } else {
                            coverItem.setSize({
                                left: event.pageX - coverItem.width / 2,
                                right: outerItem.width - event.pageX - coverItem.width / 2,
                            });
                        }

                        if (topEdge <= coverItem.height / 2) {
                            coverItem.setSize({
                                top: innerItem.top,
                                bottom: outerItem.height - innerItem.top - coverItem.height,
                            })
                        } else if (bottomEdge <= coverItem.height / 2) {
                            coverItem.setSize({
                                bottom: innerItem.top,
                                top: outerItem.height - innerItem.top - coverItem.height
                            })
                        } else {
                            coverItem.setSize({
                                top: event.pageY - coverItem.height / 2,
                                bottom: outerItem.height - event.pageY - coverItem.height / 2,
                            })
                        }

                        if (type === "touchend") {
                            // background-position使用百分比的意思比较特殊，需要搞清楚。参考点既不是上端，不是下端，也不是中心。
                            widthPosition = innerItem.width - coverItem.width < 1 ? 100 :
                                ((coverItem.left - innerItem.left) * 100 / (innerItem.width - coverItem.width)).toFixed(2);
                            heightPosition = innerItem.height - coverItem.height < 1 ? 100 :
                                ((coverItem.top - innerItem.top) * 100 / (innerItem.height - coverItem.height)).toFixed(2);
                            console.log(`wid: ${widthPosition}; height: ${heightPosition}; scaleValueX: ${scaleValueX}; scaleValueY: ${scaleValueY}`)
                            messageBus.$emit('imgBgParamsChanged', {
                                widthPosition,
                                heightPosition,
                                scaleX,
                                scaleY
                            });
                            messageBus.$emit('imgEditShowToolBar', true);
                        }
                    })
                })
            },
        });

        Vue.directive('screen-ori-demon', {
            inserted: function (el) {
                window.addEventListener("orientationchange",function(){
                    if(window.orientation !== 0) {
                        messageBus.$emit("windowOrientation", true);
                    } else {
                        messageBus.$emit("windowOrientation", false);
                    }
                });

                $(el).on('contextmenu', function (e) {
                    if($(e.target).closest(".simditor-body").length>0||$(e.target).closest(".editorTxt").length>0){
                        console.log("simditor-body");
                    }else{
                        e.preventDefault();
                    }
                })
            }
        });

        // 禁止传入事件的默认行为
        Vue.directive('disable-move', {
            inserted: function (el) {
                $(el).on('touchmove', function (event) {
                    event.preventDefault();
                })
            }
        })
    }
}