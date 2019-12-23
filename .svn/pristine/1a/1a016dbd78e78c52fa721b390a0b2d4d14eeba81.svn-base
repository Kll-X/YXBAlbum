<template>
    <div class="itemWrapper">
        <div v-if="parseInt(data.type) == 4">
            <div class="imgWrapper">
                <div class="imgItemWrapper" ref="imgItemWrapper">
                    <div class="imgItem" ref="imgItem"></div>
                </div>
            </div>
        </div>
        <div v-if="parseInt(data.type) == 2">
            <div class="txtWrapper" v-html="data.content"></div>
        </div>
    </div>
</template>
<script>
    export default {
        props:["data","imgWidth","borderImg"],
        data:function(){
            return{
            }
        },
        methods:{
            getImgSrc(src){
                return  /http/i.test(src) ||
                /weixin/i.test(src) ||
                /wxLocalResource/i.test(src) ?
                    src :
                    PREFIX_FILE_HOST + src
            },
            init(){
                if(parseInt(this.data.type) == 4){
                    let imgItemWrapper = this.$refs.imgItemWrapper;
                    let img = this.$refs.imgItem;
                    if(this.borderImg){
                        imgItemWrapper.style.borderStyle = "solid";
                        imgItemWrapper.style.borderWidth = "8px";
                        imgItemWrapper.style.borderImage = "url("+this.borderImg+") 11";
                    }else{
                        imgItemWrapper.style.border = "none";
                        imgItemWrapper.style.borderImage = "none 100% 1 0 stretch";
                    }
                    img.style.backgroundImage = "url("+this.getImgSrc(this.data.properties.src)+")";
                    // img.style.width = this.imgWidth+"px";
                    img.style.width = Math.round(document.body.clientWidth*0.8)+"px";
                    img.style.height = parseInt(this.data.properties.height)/parseInt(this.data.properties.width)*parseInt(img.style.width) +"px" ;
                    imgItemWrapper.style.width = parseInt(img.style.width)+2*parseInt(imgItemWrapper.style.borderWidth)+"px";
                    imgItemWrapper.style.height = parseInt(img.style.height)+2*parseInt(imgItemWrapper.style.borderWidth)+"px";
                    let bgSizeX,bgSizeY;
                    if(this.data.properties.imgStyle.backgroundSizeX&&this.data.properties.imgStyle.backgroundSizeY) {
                        bgSizeX = parseInt(this.data.properties.imgStyle.backgroundSizeX);
                        bgSizeY = parseInt(this.data.properties.imgStyle.backgroundSizeY);
                        img.style.backgroundSize = bgSizeX + "% " + bgSizeY + "%";
                    }else{
                        img.style.backgroundSize = "cover";
                    }
                    img.style.backgroundPositionX = this.data.properties.imgStyle.backgroundPositionX||"50%";
                    img.style.backgroundPositionY = this.data.properties.imgStyle.backgroundPositionY||"50%";
                }
            }

        },
        mounted:function(){
            this.init();
        },
        watch:{
            borderImg:{
                handler:function(){
                    this.init();
                },
                deep:true
            }
        }



    }
</script>
<style scoped>
    .itemWrapper{
        margin: .5rem 0;
    }
    .imgWrapper{
        position: relative;
        width: 100%;
        margin:0 auto;
    }
    .txtWrapper{
        color: #333;
        word-wrap: break-word;
        padding: 0 15px;
        line-height: 1.8;
        font-size: 16px;
        letter-spacing: 2px;
    }
    .imgItemWrapper{
        margin:0 auto;
    }
    .imgItem{
        margin: 0 auto;
    }

</style>