import index from './components/index.vue'
import works from './components/pubWorks/works.vue'
import mine from './components/myWorks/mine.vue'
import animation from './components/pubWorks/animation.vue'
import article from './components/pubWorks/article.vue'
import myAnimation from './components/myWorks/myanimation.vue'
import myArticle from './components/myWorks/myarticle.vue'
import yxbTemplate from './components/pubWorks/template/template.vue'
import myWorksEditView from './components/myWorks/myWorksEditView.vue'
import myArticleView from './components/myWorks/myArticleView.vue'
import myWorksView from './components/myWorks/myWorksView.vue'
import editTemplate from './components/myWorks/editMode/editTemplate.vue'
import articleTemplate from './components/myWorks/templateShow/articleTemplate.vue'
import articleEdit from './components/myWorks/articleEdit/articleEdit.vue'
import middlePage from './components/pubWorks/middlePage.vue';
import report from './components/commonComponent/report.vue';
import ticketStore from './components/myWorks/ticketStore/ticketStore.vue';
import myTemplateStore from './components/myWorks/myTemplateStore/myTemplateStore.vue';
import editor from './components/myWorks/articleEdit/editor.vue';
import phoneUpdate from './components/phoneUpdate/phoneUpdate.vue'

export default [
    {path: '', redirect: '/index'},
    {
        path: '/index', component: index,
        children: [
            {path: '', redirect: "works/animation"},
            {
                path: 'works', redirect: "works/animation",
                meta: {title: '美秀相册-作品'}
            },
            {
                path: 'works/:type', component: works, name: 'works',
                meta: {title: '美秀相册-作品'}
            },
            {
                path: 'mine', redirect: "mine/myAnimation",
                meta: {title: '美秀相册-我的'}
            },
            {
                path: 'mine/:type', component: mine,
                meta: {title: '美秀相册-我的'}
            },
        ]
    },
    {path: '/phoneUpdate', name: 'phoneUpdate', component: phoneUpdate, meta: {title: '手机绑定'}},

    {path: '/template/:id', name: 'view', component: yxbTemplate, meta: {title: ''}},
    {path: '/middlePage/:id/:nextRouterName', name: 'middlePage', component: middlePage, meta: {title: '选择图片'}},
    {path: '/editTemplate/:id', name: 'edit', component: editTemplate, meta: {title: '编辑'}},
    {path: '/myWorksEditView/:id', name: 'myWorksEditView', component: myWorksEditView, meta: {title: '预览'}},
    {path: '/myWorksView/:id', name: 'myWorksView', component: myWorksView, meta: {title: '预览'}},

    {path: '/myArticleView/:id', name: 'myArticleView', component: myArticleView, meta: {title: '预览'}},
    {path: '/articleTemplate/:id', name: 'articleTemplate', component: articleTemplate, meta: {title: ''}},
    {path: '/articleEdit/:id', name: 'articleEdit', component: articleEdit, meta: {title: '编辑'}},
    {path: '/editor/:id', name: 'editor', component: editor, meta: {title: '编辑'}},

    {path: '/ticketStore/:type', component: ticketStore, name: 'ticketStore',meta: {title: '兑换券'}},
    {path: '/myTemplateStore/:type', component: myTemplateStore, name: 'myTemplateStore',meta: {title: '已购模板'}},
    {path: '/report/:id', name: 'report', component: report, meta: {title: '举报'}},
    {path: '*', redirect: '/'}
];