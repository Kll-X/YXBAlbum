<template>
        <div class="select">
            <span>{{selectData.title}}</span>
            <select  v-model="selectData.value">
                <option  v-for="item in selectData.options" :value="item.value">{{item.name}}</option>
             </select>
        </div>
</template>
<script>
export default {
    props: ['selectData'],
    data: function() {
        return {
        }
    }
}
</script>
<style scoped lang="less">
    .select{
        color: #F93C67;
        width: 100%;
        margin-top: 10%;
        span {
            width: 20%;
        }
        select{
            height: 30px;
            border: none;
            background-color: white;
            width: 75%;
        }
    }
</style>