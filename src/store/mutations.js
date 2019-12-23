import {
    ARTICLE_INFO,
    CURRENT_TYPE,
    ARTICLE_USER_INFO,
    SETTING_INFO,
    CURRENT_PANEL,
    ARTICLE_TEMPLIST_SET,
    USER_INFO,
    UPDATE_TOKEN
} from './mutation-types.js'
export default {
    [ARTICLE_INFO](state, info){
        state.articleInfo = info;
    },
    [CURRENT_TYPE](state, type){
        state.currentType = type;
    },
    [ARTICLE_USER_INFO](state, info){
        state.articleUserInfo = info;
    },
    [SETTING_INFO](state, info){
        state.settingInfo = info;
    },
    [CURRENT_PANEL](state, info){
        if(info instanceof Array){
            state.currentPanel = info;  //替换
        }else if(typeof info === "object"){
            state.currentPanel.push(info); //增加
        }else if(info === ""){  //减少
            state.currentPanel = state.currentPanel.slice(0,-1);
        }

    },
    [ARTICLE_TEMPLIST_SET](state, info){
        state.articleTempList = info;
    },
    [USER_INFO](state, info){
        state.userInfo = info;
    },
    [UPDATE_TOKEN](state, info){
        state.userInfo = Object.assign(state.userInfo,{token:info});
    }
}