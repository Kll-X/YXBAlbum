<template>
    <div class="ticket">
        <img class='headPortrait' :src="userInfo.headPortrait" alt="">
        <div class="title">{{item.voucherName}}</div>
        <div v-if="routeType ==='unuse'" class="desc">兑换自"{{item.source}}"</div>
        <div v-if="routeType ==='used'" class="desc">兑换了《{{item.name}}》模板</div>
        <div v-if="routeType ==='unuse'" class="date">兑换时间：{{date}}</div>
        <div v-if="routeType ==='used'" class="date">使用时间：{{date}}</div>
        <img v-if="routeType ==='unuse'" class="unuse_bg" src="../../../images/unuse_bg.png" alt="">
        <img v-if="routeType ==='used'" class="unuse_bg" src="../../../images/used_bg.png" alt="">
    </div>
</template>
<script>
    import {mapState, mapMutations} from 'vuex'

    export default {
        props: ['idx', 'item'],
        data: function () {
            return {}
        },
        computed: {
            ...mapState([
                'userInfo'
            ]),
            routeType() {
                this.CURRENT_TYPE(this.$route.params.type);
                return this.$route.params.type;
            },
            date() {
                let self = this;
                return self.item.usedTime? self.formatDate(self.item.usedTime): self.formatDate(self.item.createTime)
            }
        },
        methods: {
            ...mapMutations(['CURRENT_TYPE']),
            formatDate(now) {
                let time = new Date(now);
                let year = time.getFullYear();
                let month = time.getMonth() + 1;
                let date = time.getDate();
                return year + "." + month + "." + date
            }
        },
        mounted() {

        }
    }
</script>
<style scoped lang="less">
    .ticket {
        width: 7rem;
        height: 1.9rem;
        position: relative;
        .headPortrait {
            width: 0.98rem;
            height: 0.98rem;
            -webkit-border-radius: 50%;
            -moz-border-radius: 50%;
            border-radius: 50%;
            position: absolute;
            left: 0.40rem;
            top: 50%;
            transform: translateY(-50%);
        }

        .title {
            font-size: 0.3rem;
            color: #333;
            position: absolute;
            top: 0.36rem;
            left: 1.94rem
        }

        .desc {
            font-size: 0.24rem;
            color: #333333;
            position: absolute;
            top: 0.82rem;
            left: 1.94rem
        }

        .date {
            font-size: 0.2rem;
            color: #333333;
            position: absolute;
            bottom: 0.2rem;
            left: 1.94rem
        }

        .unuse_bg, .used_bg {
            width: 100%;
        }
    }
</style>