<template>
  <div class="singleTemplatesWrap">
    <!--标题-->
    <div class="header" :style="classifyNavExtraStyel">
      <div class="tabs-warp" :style="classifyNavExtraStyel">
        <div ref="tabsContent" class="tabs-content mescroll-touch-x">
          <div style="display: inline-block">
            <!--PC端运行,加上这个div可修复tab-bar错位的问题 -->
            <ul class="tabs" ref="tabs">
              <li
                class="tab"
                v-for="(tab,i) in tabs"
                :class="{active: i===curIndex}"
                :style="{width: tabWidth+'vw'}"
                :key="i"
                @click="changeTab(i)"
              >{{tab.name}}</li>
            </ul>
            <div class="tab-bar" :style="{width: barWidth+'vw', left: barLeft}"></div>
          </div>
        </div>
      </div>
    </div>
    <swiper ref="mySwiper" :options="swiperOption">
      <swiper-slide v-for="(tab,i) in tabs" :key="i">
        <mescroll-vue
          :ref="'mescroll'+i"
          :down="tab.down"
          :up="getMescrollUp(i)"
          @init="mescrollInit(i,arguments)"
        >
          <div class="dataList" :id="'dataList'+i">
                <page-view  class="pages" :templateData="tab"></page-view >
          </div>
        </mescroll-vue>
      </swiper-slide>
    </swiper>
    <div class="cancelWrapper">
        <img class="cancel" @click.stop="cancel" src="../../../../images/cancel.png" />
    </div>
  </div>
</template>

<script>
// 轮播组件: https://github.com/surmon-china/vue-awesome-swiper
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
// 引入mescroll的vue组件
import MescrollVue from "mescroll.js/mescroll.vue";
import {getStandardTemplates} from "../../../../lib/ajax";
import * as utils from "../../../../lib/utils";
import {mapState, mapMutations} from 'vuex'
import pageView from './pageView.vue';


export default {
  name: "mescrollSwiperNav",
  props:['oriTemplateData'],
  data() {
    return {
      tabs: [
        {
          name: "原图",
          typeCode: 0,
          mescroll: null,
          list: [],
          isListInit: false,
          down: this.getMescrollDown(0)
        },
        {
          name: "一图",
          typeCode: 2001,
          mescroll: null,
          list: [],
          isListInit: false,
          down: this.getMescrollDown(1)
        },
        {
          name: "二图",
          typeCode: 2002,
          mescroll: null,
          list: [],
          isListInit: false,
          down: this.getMescrollDown(2)
        },
        {
          name: "三图",
          typeCode: 2003,
          mescroll: null,
          list: [],
          isListInit: false,
          down: this.getMescrollDown(3)
        },
        {
          name: "四图",
          typeCode: 2004,
          mescroll: null,
          list: [],
          isListInit: false,
          down: this.getMescrollDown(4)
        }
      ],
      tabWidth: 20, // 每个tab的宽度
      barWidth: 8, // tab底部红色线的宽度
      curIndex: 0, // 当前tab的下标
      tabScrollLeft: 0, // 菜单滚动条的位置
      swiperOption: {
        // 轮播配置
        on: {
          transitionEnd: () => {
            this.changeTab(this.swiper.activeIndex);
          }
        }
      }
    };
  },
  components: {
    swiper, // 轮播组件
    swiperSlide, // 轮播组件
    MescrollVue, // Mescroll组件
    pageView
    },
  computed: {
    swiper() {
      // 轮播对象
      return this.$refs.mySwiper.swiper;
    },
    barLeft() {
      // 红线的位置
      return (
        this.tabWidth * this.curIndex +
        (this.tabWidth - this.barWidth) / 2 +
        "vw"
      );
    },
    classifyNavExtraStyel(){
        return utils.isIos()?{'backgroundColor': '#1b1a1f'}:{'backgroundColor': '#393a3f'}
    }
  },
  methods: {
    ...mapMutations([
        'CURRENT_PANEL'
    ]),
    // 多mescroll的配置,需通过方法获取,保证每个配置是单例
    getMescrollDown(tabIndex) {
      let isAuto = tabIndex === 0; // 第一个mescroll传入true,列表自动加载
      return {
        offset: 45,
        textLoading:"刷新中 . . .",
        htmlContent:'<div class="loadTipWrap"><img style="display: inline-block;width: 18px;height: 18px" src=http://yxbsve.mmarket.com/Uploads/pic/50/201811/5bf4fa7c8dfff.gif /><p class="downwarp-tip"></p></div>',
        auto: isAuto,
        callback: this.downCallback
      };
    },
    // mescroll上拉加载的配置
    getMescrollUp(tabIndex) {
      let self = this;
      let emptyWarpId = "dataList" + tabIndex;
      return {
        page:{num:1,size:12},
        scrollbar:{
            use : false , 
            barClass : "mescroll-bar" 
        },
        auto: false,
        callback: this.upCallback, // 上拉回调,此处可简写; 相当于 callback: function (page) { upCallback(page); }
        noMoreSize: 3, // 如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
        empty: {
          warpId: emptyWarpId, // 父布局的id;
          icon: require("../../../../images/avatar.png"), // 图标,默认null
          tip: "暂无相关数据~", // 提示
          btntext: "去逛逛 >", // 按钮,默认""
          btnClick: function() {
            // 点击按钮的回调,默认null
            self.$router.push({path:"/"})
          }
        },
        htmlNodata:'<p class="loadTipWrap" class="upwarp-nodata">-- 没有更多了 --</p>',
        htmlLoading:'<div class="loadTipWrap"><img style="display: inline-block;width: 18px;height: 18px" src=http://yxbsve.mmarket.com/Uploads/pic/50/201811/5bf4fa7c8dfff.gif /><p class="upwarp-tip">加载中 . . .</p></div>',
        // toTop: {
        //   // 配置回到顶部按钮
        //   src: "http://www.mescroll.com/img/mescroll-totop.png" // 图片路径,默认null (建议写成网络图,不必考虑相对路径)
        // },
        // lazyLoad: {
        //     use: true, // 是否开启懒加载,默认false
        //     attr: 'imgurl', // 网络图片地址的属性名 (图片加载成功会自动移除改属性): <img imgurl='网络图  src='占位图''/>
        //     showClass: 'mescroll-lazy-in', // 图片加载成功的显示动画: 渐变显示,参见mescroll.css
        //     delay: 500, // 列表滚动的过程中每500ms检查一次图片是否在可视区域,如果在可视区域则加载图片
        //     offset: 200 // 超出可视区域200px的图片仍可触发懒加载,目的是提前加载部分图片
        // }
      };
    },
    // mescroll初始化的回调
    mescrollInit(tabIndex, arg) {
      this.tabs[tabIndex].mescroll = arg[0]; // 传入mescroll对象
      this.tabs[tabIndex].mescroll.tabIndex = tabIndex; // 加入标记,便于在回调中取到对应的list
    },
    // 切换菜单
    changeTab(tabIndex) {
      if (this.curIndex === tabIndex) return; // 避免重复调用
      let curTab = this.tabs[this.curIndex]; // 当前列表
      let newTab = this.tabs[tabIndex]; // 新转换的列表
      curTab.mescroll && curTab.mescroll.hideTopBtn(); // 隐藏当前列表的回到顶部按钮
      this.curIndex = tabIndex; // 切换菜单
      this.swiper.slideTo(tabIndex);
      // 菜单项居中动画
      if (curTab.mescroll) {
        let tabsContent = this.$refs.tabsContent;
        let tabDom = tabsContent.getElementsByClassName("tab")[tabIndex];
        let star = tabsContent.scrollLeft; // 当前位置
        let end =
          tabDom.offsetLeft +
          tabDom.clientWidth / 2 -
          document.body.clientWidth / 2; // 居中
        this.tabScrollLeft = end;
        curTab.mescroll.getStep(star, end, function(step) {
          tabsContent.scrollLeft = step; // 从当前位置逐渐移动到中间位置,默认时长300ms
        });
      }
      if (newTab.mescroll) {
        if (!newTab.isListInit) {
          // 加载列表
          newTab.mescroll.triggerDownScroll();
        } else {
          // 检查新转换的列表是否需要显示回到到顶按钮
          setTimeout(() => {
            let curScrollTop = newTab.mescroll.getScrollTop();
            if (curScrollTop >= newTab.mescroll.optUp.toTop.offset) {
              newTab.mescroll.showTopBtn();
            } else {
              newTab.mescroll.hideTopBtn();
            }
          }, 30);
        }
      }
    },
    /* 下拉刷新的回调 */
    downCallback(mescroll) {
      this.tabs[mescroll.tabIndex].pageNum = 1;
      // 这里加载你想下拉刷新的数据, 比如刷新tab1的轮播数据
      if (mescroll.tabIndex === 0) {
        // loadSwiper();
      } else if (mescroll.tabIndex === 1) {
        // ....
      } else if (mescroll.tabIndex === 2) {
        // ....
      }
      mescroll.resetUpScroll(); // 触发下拉刷新的回调,加载第一页的数据
    },
    /* 上拉加载的回调 page = {num:1, size:10}; num:当前页 从1开始, size:每页数据条数 */
    upCallback(page, mescroll) {
      // if (mescroll.tabType === 0) {
      //   // 可以单独处理每个tab的请求
      // }else if (mescroll.tabType === 1) {
      //   // 可以单独处理每个tab的请求
      // }
      let self = this;
      self.tabs[mescroll.tabIndex].isListInit = true; // 标记列表已初始化,保证列表只初始化一次
      self.getListDataFromNet(
        mescroll.tabIndex,
        page.num,
        page.size,
        curPageData => {
          mescroll.endSuccess(curPageData.length); // 联网成功的回调,隐藏下拉刷新和上拉加载的状态;
          if (page.num === 1) self.tabs[mescroll.tabIndex].list = []; // 如果是第一页需手动制空列表
          self.tabs[mescroll.tabIndex].list = self.tabs[
            mescroll.tabIndex
          ].list.concat(curPageData); // 追加新数据
        },
        () => {
          if (page.num === 1) self.tabs[mescroll.tabIndex].isListInit = false;
          mescroll.endErr(); // 联网失败的回调,隐藏下拉刷新的状态
        }
      );
    },
    /* 联网加载列表数据
          * */
    getListDataFromNet(
      tabIndex,
      pageNum,
      pageSize,
      successCallback,
      errorCallback
    ) {
        let self = this;
        if(tabIndex === 0){
            let listData = self.oriTemplateData.list;
            successCallback && successCallback(listData);
        }else{
        getStandardTemplates({
            "method": "c=scene&a=syspagephonetpl&tagid=" + self.tabs[tabIndex].typeCode + "&pageSize=12&pageNo=" + pageNum,
            "methodType": 'get'
        }).then(function (data) {
                data = utils.processReturnObj(data);
                data.data = utils.processReturnObj(data.data);
                if (data.data.success === true) {
                    if (data.data.list.length > 0) {
                        let listData = data.data.list;
                    // 回调
                    successCallback && successCallback(listData);
                    }
                    else{
                        throw data
                    }
                }else{
                    throw data
                }
            }).catch(function(err){
                // 联网失败的回调
            errorCallback && errorCallback();
            })}
    },
    cancel () {
        this.CURRENT_PANEL([])
    }
  },
  beforeRouteEnter(to, from, next) {
    // 如果没有配置回到顶部按钮或isBounce,则beforeRouteEnter不用写
    next(vm => {
      let curMescroll = vm.$refs["mescroll" + vm.curIndex][0]; // 找到当前mescroll的ref,调用子组件mescroll-vue的beforeRouteEnter方法
      curMescroll && curMescroll.beforeRouteEnter(); // 进入路由时,滚动到原来的列表位置,恢复回到顶部按钮和isBounce的配置
      // 恢复水平菜单的滚动条位置
      if (vm.$refs.tabsContent)
        vm.$refs.tabsContent.scrollLeft = vm.tabScrollLeft;
    });
  },
  beforeRouteLeave(to, from, next) {
    // 如果没有配置回到顶部按钮或isBounce,则beforeRouteLeave不用写
    let curMescroll = this.$refs["mescroll" + this.curIndex][0]; // 找到当前mescroll的ref,调用子组件mescroll-vue的beforeRouteEnter方法
    curMescroll && curMescroll.beforeRouteLeave(); // 退出路由时,记录列表滚动的位置,隐藏回到顶部按钮和isBounce的配置
    next();
  }
};
</script>

<style scoped lang="less">
.singleTemplatesWrap{
    height: 100vh;
    overflow: hidden;
    background: #e8e8e8;
    /*模拟的标题*/
    .header {
    z-index: 9990;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 0.8rem;
    line-height: 16px;
    text-align: center;
    /*菜单*/
    .tabs-warp {
        height: 0.8rem; /*高度比tabs-content小, 目的是隐藏tabs的水平滚动条*/
        overflow-y: hidden;
        border-bottom: 1px solid #eee;
        box-sizing: content-box;
        .tabs-content {
        width: 100%;
        height: 3rem; /*chrome/firefox/IE滚动条默认宽度为：17px，safari滚动条默认宽度为：21px   高度比外框（如70-42）高于21，普遍兼容 */
        overflow-x: auto;
        .tabs {
            width: 100%;
            white-space: nowrap;
            li {
            display: inline-block;
            height: 0.75rem;
            line-height: 0.80rem;
            vertical-align: middle;
            color: #888888;
            }
            .active {
            color: #fff;
            }
        }
        .tab-bar {
            position: relative;
            height: 0.05rem;
            background-color: #0080cc;
            transition: left 300ms;
            }
        }
    }
    }
    /*列表*/
    .swiper-container {
    position: fixed;
    top: 0.8rem;
    left: 0;
    right: 0;
    bottom: 1.04rem;
    }
    .dataList{
        overflow:hidden;
        /*展示上拉加载的数据列表*/
        



    }

    .cancelWrapper {
        height: 1.05rem;
        width: 100%;
        overflow: hidden;
        display: flex;
        align-items: center;
        background: #ffffff;
        position: absolute;
        bottom: 0;
        z-index: 20;
        .cancel {
            height: 60%;
            margin: 0 auto;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;

        }
    }
}
</style>



