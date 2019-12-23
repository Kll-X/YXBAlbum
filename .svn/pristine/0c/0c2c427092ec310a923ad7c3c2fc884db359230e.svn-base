<template>
  <div>
    <!-- <input ref="inputChooseImg" @change="selectedImg" multiple="multiple" class="input-choose-img" type="file" accept="image/*;capture=camera"/>
    <input ref="inputChooseImg_single" @change="selectedImg"  class="input-choose-img-single" type="file" accept="image/*;capture=camera"/>-->
    <input
      ref="inputChooseImg"
      @change="selectFileImage"
      multiple="multiple"
      class="input-choose-img"
      type="file"
      accept="image/*"
    >
    <input
      ref="inputChooseImg_single"
      @change="selectFileImage"
      class="input-choose-img-single"
      type="file"
      accept="image/*"
    >
  </div>
</template>

<script>
import messageBus from "@src/components/messageBus";
import * as ajax from "@lib/ajax";
import * as utils from "@lib/utils";

export default {
  name: "img-upload",
  data: function() {
    return {
      msg: ""
    };
  },
  mounted: function() {
    let self = this;
    messageBus.$on("inputChooseImg", function(msg) {
      if (msg.number == 1) {
        self.$refs.inputChooseImg_single.value = "";
        self.msg = msg;
        self.$refs.inputChooseImg_single.click();
      } else {
        self.$refs.inputChooseImg.value = "";
        self.msg = msg;
        self.$refs.inputChooseImg.click();
      }
    });
  },
  methods: {

    selectFileImage(e) {
      let self = this;
      let images = [];
      let num = 0;
      let ii = 0;
      let max = Math.min(e.target.files.length, self.msg.number);
      //loading动画
      messageBus.$emit("tipCoverShow", {
        status: 1,
        title: "",
        desc: ["生成中"],
        icon: "load",
        style: {
          tipDescPadding: "0 0.32rem 0.4rem"
        }
      });
      

      function dealImg(i) {
        if (i >= max) {
          return false;
        } else {
          let file = e.target.files[i];
          //   console.log(e.target.files);
          //图片方向角
          var Orientation = null;

          if (file) {
            // console.log("正在上传,请稍后...");
            var rFilter = /^(image\/jpeg|image\/png)$/i; // 检查图片格式
            if (!rFilter.test(file.type)) {
              //showMyTips("请选择jpeg、png格式的图片", false);
              return;
            }
            // var URL = URL || webkitURL;
            //获取照片方向角属性，用户旋转控制
            EXIF.getData(file, function() {
              // alert(EXIF.pretty(this));
              EXIF.getAllTags(this);
              //alert(EXIF.getTag(this, 'Orientation'));
              Orientation = EXIF.getTag(this, "Orientation");
              //return;
            });

            var oReader = new FileReader();
            oReader.onload = function(e) {
              var image = new Image();
              image.src = e.target.result;
              image.onload = function() {
                var expectWidth = this.naturalWidth;
                var expectHeight = this.naturalHeight;
                // 如果小于100K，不在尺寸上压缩
                if (file.size > 100000) {
                  if (
                    this.naturalWidth > this.naturalHeight &&
                    this.naturalWidth > 800
                  ) {
                    expectWidth = 800;
                    expectHeight =
                      (expectWidth * this.naturalHeight) / this.naturalWidth;
                  } else if (
                    this.naturalHeight > this.naturalWidth &&
                    this.naturalHeight > 1200
                  ) {
                    expectHeight = 1200;
                    expectWidth =
                      (expectHeight * this.naturalWidth) / this.naturalHeight;
                  };
                  
                }
                var canvas = document.createElement("canvas");
                var ctx = canvas.getContext("2d");
                canvas.width = expectWidth;
                canvas.height = expectHeight;
                ctx.drawImage(this, 0, 0, expectWidth, expectHeight);
                var base64 = null;
                //修复ios
                if (navigator.userAgent.match(/iphone/i)) {
                  // console.log("iphone");
                  //alert(expectWidth + ',' + expectHeight);
                  //如果方向角不为1，都需要进行旋转
                  // alert(Orientation);
                  if (Orientation != "" && Orientation != 1) {
                    //   alert("旋转处理");
                    switch (Orientation) {
                      case 6: //需要顺时针（向左）90度旋转
                        //   alert("需要顺时针（向左）90度旋转");
                        self.rotateImg(this, "left", canvas);
                        break;
                      case 8: //需要逆时针（向右）90度旋转
                        //   alert("需要顺时针（向右）90度旋转");
                        self.rotateImg(this, "right", canvas);
                        break;
                      case 3: //需要180度旋转
                        //   alert("需要180度旋转");
                        self.rotateImg(this, "right", canvas); //转两次
                        self.rotateImg(this, "right", canvas);
                        break;
                    }
                  }

                  // 如果小于100K，不再降质压缩
                  if (file.size > 100000) {
                    base64 = canvas.toDataURL("image/jpeg", 0.5);
                  } else {
                    base64 = canvas.toDataURL("image/jpeg", 1);
                  }
                } else if (navigator.userAgent.match(/Android/i)) {
                  // 修复android
                  // var encoder = new JPEGEncoder();
                  // base64 = encoder.encode(ctx.getImageData(0, 0, expectWidth, expectHeight), 80);
                  // 如果小于100K，不再降质压缩
                  if (file.size > 100000) {
                    base64 = canvas.toDataURL("image/jpeg", 0.5);
                  } else {
                    
                    base64 = canvas.toDataURL("image/jpeg", 1);
                  }
                } else {
                  //alert(Orientation);
                  if (Orientation != "" && Orientation != 1) {
                    //alert('旋转处理');
                    switch (Orientation) {
                      case 6: //需要顺时针（向左）90度旋转
                        //   alert("需要顺时针（向左）90度旋转");
                        self.rotateImg(this, "left", canvas);
                        break;
                      case 8: //需要逆时针（向右）90度旋转
                        //   alert("需要顺时针（向右）90度旋转");
                        self.rotateImg(this, "right", canvas);
                        break;
                      case 3: //需要180度旋转
                        //   alert("需要180度旋转");
                        self.rotateImg(this, "right", canvas); //转两次
                        self.rotateImg(this, "right", canvas);
                        break;
                    }
                  }

                  // 如果小于100K，不再降质压缩
                  if (file.size > 100000) {
                    base64 = canvas.toDataURL("image/jpeg", 0.5);
                  } else {
                    
                    base64 = canvas.toDataURL("image/jpeg", 1);
                  }
                }
                //uploadImage(base64);
                // $("#myImage").attr("src", base64);
                // console.log(base64);
                ajax
                  .sendBase64AndGetUrl({ base64picStr: base64 })
                  .then(function(res) {
                    if (res.resultCode === 0) {
                      images[i] = res.data; //返回图片的网址
                    } else {
                      images[i] = null;
                    }

                    num++;
                    if (num == max) {
                      //changeImages的消息处理
                      if (self.msg.messageName === "changeImages") {
                        if (self.msg.eleDefId) {
                          messageBus.$emit("imgSrcChanged", {
                            src: res.data,
                            id: self.msg.eleDefId
                          });
                        }
                        if (self.msg.mark) {
                          messageBus.$emit("imgSrcAdd", {
                            src: res.data,
                            mark: self.msg.mark
                          });
                        }
                        messageBus.$emit("showCommonBar");
                        messageBus.$emit("allEditCoverHide");
                        messageBus.$emit("allProxyItemHide");
                      } else {
                        //chooseImgs的消息处理
                        //todo
                        self.msg.imagesInformation.ownUrls = images;
                        messageBus.$emit(
                          self.msg.messageName,
                          self.msg.imagesInformation
                        );
                      }
                      messageBus.$emit("tipCoverShow", {
                        status: 0
                      });
                    }
                    // console.log('123',"i", i,'ii',ii,'max',max);
                  })
                  .catch(function(error) {
                    messageBus.$emit("tipCoverShow", {
                      status: 2,
                      desc: ["服务器繁忙", "请再次编辑并提交"],
                      icon: "times",
                      style: {
                        tipDescPadding: "0 0.32rem 0.4rem"
                      }
                    });
                  })
                  .always(function() {
                    // console.log("i", i,'ii',ii,'max',max);
                    ii++;
                    dealImg(ii);
                  });
              };
            };
            oReader.readAsDataURL(file);
          }
        }
      }

      dealImg(ii);
    },
    rotateImg(img, direction, canvas) {
      //alert(img);
      //最小与最大旋转方向，图片旋转4次后回到原方向
      var min_step = 0;
      var max_step = 3;
      //var img = document.getElementById(pid);
      if (img == null) return;
      //img的高度和宽度不能在img元素隐藏后获取，否则会出错
      var height = img.height;
      var width = img.width;
      //var step = img.getAttribute('step');
      var step = 2;
      if (step == null) {
        step = min_step;
      }
      if (direction == "right") {
        step++;
        //旋转到原位置，即超过最大值
        step > max_step && (step = min_step);
      } else {
        step--;
        step < min_step && (step = max_step);
      }
      //img.setAttribute('step', step);
      /*var canvas = document.getElementById('pic_' + pid);   
                    if (canvas == null) {   
                        img.style.display = 'none';   
                        canvas = document.createElement('canvas');   
                        canvas.setAttribute('id', 'pic_' + pid);   
                        img.parentNode.appendChild(canvas);   
                    }  */
      //旋转角度以弧度值为参数
      var degree = (step * 90 * Math.PI) / 180;
      var ctx = canvas.getContext("2d");
      switch (step) {
        case 0:
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0);
          break;
        case 1:
          canvas.width = height;
          canvas.height = width;
          ctx.rotate(degree);
          ctx.drawImage(img, 0, -height);
          break;
        case 2:
          canvas.width = width;
          canvas.height = height;
          ctx.rotate(degree);
          ctx.drawImage(img, -width, -height);
          break;
        case 3:
          canvas.width = height;
          canvas.height = width;
          ctx.rotate(degree);
          ctx.drawImage(img, -width, 0);
          break;
      }
    }
  }
};
</script>

<style scoped>
.input-choose-img,
.input-choose-img-single {
  display: none;
}
</style>