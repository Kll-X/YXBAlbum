<template>
    <div class="btns-bar-com">
        <div v-for="(item,index) in icons" :key="index" class="icon" @click="clickHandler(item.handler,index)">
            <img :src="activeIndex===index?item.activeSrc:item.src">
        </div>
    </div>
</template>

<script>
    export default {
        name: "btns-bar",
        data:function () {
            return {
                activeIndex:this.defaultTab
            }
        },
        watch:{
            defaultTab(n,o){
                this.activeIndex = n
            }
        },
        props:{
            tab:{
                default:false
            },
            icons:{
                type:Array
            },
            defaultTab:{
                default:0
            }
        },
        methods:{
            clickHandler(handler,index){
                this.tab && (this.activeIndex = index);
                handler&&handler();
            }
        }
    }
</script>

<style scoped>
.btns-bar-com{
    border-top: 1px solid rgb(217,217,217);
    width: 100%;
    background-color: white;
    position: fixed;
    bottom: 0;
    left: 0;
    height: 1.04rem;
    display: flex;
    align-items: center;
    justify-content: space-around;
}
.icon{
    height: 65%;
}
.icon img{
    height: 100%;
}
</style>