<template>
    <img id="guide" ref="guide" class="animated fadeAnimate" src="../../images/guide.png">
</template>
<script>
    import {eqxiu} from '../../js/render/eqxiu.js'
    import messageBus from '@components/messageBus'
    export default {
        props: ['templateData'],
        data: function () {
            return {
            }
        },
        methods: {
        },
        mounted() {

        }
    }
</script>
<style scoped lang="less">
    #guide {
        width: 15px;
        position: absolute;
        left: 50%;
        bottom: 35px;
        transform: translateX(-50%);
        z-index: 100;
    }

    .fadeAnimate{
        -webkit-animation: twinkling 1.5s infinite ease-in-out
    }
    .animated{
        -webkit-animation-duration: 1.5s;
        animation-duration: 1.5s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both
    }
    @-webkit-keyframes twinkling{
        0%{
            opacity: 0.2;
        }
        100%{
            opacity: 0.8;
        }
    }
    @keyframes twinkling{
        0%{
            opacity: 0.2;
        }
        100%{
            opacity: 0.8;
        }
    }
</style>