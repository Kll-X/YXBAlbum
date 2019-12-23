<template>
    <div class="fullScreenPopup">
        <component :is="currentPopup" v-bind="popupData"></component>
    </div>
</template>

<script>
    import setting from "@components/setting/setting.vue";
    import imgEditPage from "@components/myWorks/editMode/imgEditPage";
    import editor from "@components/myWorks/articleEdit/editor.vue";
    import middlePage from "@components/pubWorks/middlePage.vue";
    import singlePageTemplates from "@components/myWorks/editMode/singlePageTemplates/singlePageTemplates.vue";
    import bgReplace from "@components/myWorks/editMode/bgReplace/bgReplace.vue";
    import musicSetting from "@components/bgMusic/bgMusicSetting.vue";
    import userInfoSetting from "@components/myWorks/userInfoSetting/userInfoSetting.vue";
    import nickname_setting from "@components/myWorks/userInfoSetting/nickname_setting.vue";
    import account_setting from "@components/myWorks/userInfoSetting/account_setting.vue";
    import moreSettingBar from '@components/commonComponent/moreSettingBar.vue';
    import articlePreview from '@components/myWorks/articleEdit/articlePreview.vue'

    export default {
        components: {
            setting,
            editor,
            imgEditPage,
            middlePage,
            singlePageTemplates,
            bgReplace,
            musicSetting,
            moreSettingBar,
            userInfoSetting,
            nickname_setting,
            account_setting,
            articlePreview
        },
        name: "popup",
        props:['popupData'],
        data(){
            return {
                currentPopup:this.popupData.popupName,
            }
        }
    }
</script>

<style scoped>
.fullScreenPopup{
    position: absolute;
    top:0;
    left: 0;
    width:100%;
    height:100%;
}
</style>