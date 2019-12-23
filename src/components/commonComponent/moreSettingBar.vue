<template>
    <div class="common-bar">
        <div class="mask" v-if="mask"></div>
        <div class="content">
            <div class="icons">
                <div class="icon" v-for="item in icons">
                    <img :src="item.src" @click="item.handler"></img>
                </div>
            </div>
            <div class="cancel" @click="cancel">取消</div>
        </div>
    </div>
</template>

<script>
    import {mapState,mapMutations} from 'vuex'
    export default {
        name: "common-bar",
        props:{
            icons:Array,
            mask:{
                default: false
            }
        },
        methods:{
            ...mapMutations([
               'CURRENT_PANEL'
            ]),
            cancel(){
                this.CURRENT_PANEL(this.currentPanel.slice(0,-1));
            }
        },
        computed:{
            ...mapState([
                'currentPanel'
            ])
        },
    }
</script>

<style scoped>
.bottom-bar{
    position: relative;
    width: 100%;
    height: 100%;
}
.mask{
    width: 100%;
    height: 100%;
    background-color:black;
    opacity: 0.7;
    position: absolute;
    top: 0;
    left: 0;
}
.content{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
}
.icons{
    display: flex;
    justify-content: left;
    align-items: center;
    height: 1.52rem;
    width: 100%;
    background-color: white;
}
.icon{
    height: 60%;
    width: 1.5rem;
    display: flex;
    justify-content: center;
}
.icon img{
    height: 100%;
}
.cancel{
    width: 100%;
    height: .9rem;
    background-color: #e8e8e8;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top:1px solid #d2d2d2;
    font-size: .34rem;
}
</style>