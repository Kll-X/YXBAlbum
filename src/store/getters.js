import {getArticleStyle} from "../lib/articleTools.js"
export default{
    articleStyle:state => {
        if(state.articleInfo){
            return getArticleStyle(state.articleInfo.list[0]);
        }else{
            return null;
        }
    },
    articleProfile:state => {
        if(state.articleInfo){
            return {
                id:state.articleInfo.obj.id
            }
        }else{
            return null;
        }
    }


}