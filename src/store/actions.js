import * as ajax from "@lib/ajax.js";
import * as utils  from "@lib/utils.js"
import {ARTICLE_TEMPLIST_SET} from './mutation-types.js'
import blankImg from '@images/blank.png'
export default {
    getArticleTempList({commit,state}){
        if(state.articleTempList) return;
        ajax.getTemplateList({
            "type":"1",
            "label7":"07",//子标签筛选
        }).then(function(data){
            data = utils.processReturnObj(data);
            data.data.templateList.push({picture:blankImg,id:0});
            if(data.resultCode === 0){
                commit(ARTICLE_TEMPLIST_SET,data.data.templateList);
            }
        })
    }
}