<template>
    <div class="myTemplateStore">
        <!-- 菜单 -->
        <div class="typeIndex">
            <div class="item">
                <div @click="routeChange('/myTemplateStore/myAnimation','myTemplateStore')" class="aniBtn"
                     :class="{active:routeType=='myAnimation'}">
                    <div class="text">H5</div>
                </div>
                <div @click="routeChange('/myTemplateStore/myVedio','myTemplateStore')" class="vedioBtn"
                     :class="{active:routeType=='myVedio'}">
                    <div class="text">视频</div>
                </div>
                <div @click="routeChange('/myTemplateStore/myArticle','myTemplateStore')" class="artBtn"
                     :class="{active:routeType=='myArticle'}">
                    <div class="text">图文</div>
                </div>
            </div>
        </div>

        <!--根据导航分类标签数量,复用MescrollVue组件-->
        <mescroll-vue v-for="(tab,i) in mescrollArr"
                      v-show="tabType===i"
                      :key="'mescroll'+i"
                      :ref="'mescroll'+i"
                      :up="getMescrollUp(i)"
                      :down="tab.down"
                      @init="mescrollInit(i,arguments)">
                <ul class="dataList" :id="'dataList'+i">
                    <li v-for="(item,index) in tab.list" 
                        :key= "index"
                        :class="{aniviewItemTop:index<3,aniviewItemLeft:(index+1)%3==1}"
                        class="aniviewItem">
                        <aniview-com :aniview-data="item" :sceneId="item.id"></aniview-com>
                    </li>
                </ul>
        </mescroll-vue>
    </div>
</template>

<script>
    // 引入mescroll的vue组件
    import MescrollVue from "mescroll.js/mescroll.vue";
    import aniviewCom from '@src/components/pubWorks/aniview.vue'
    import endLoading from '@src/components/commonComponent/endLoading.vue'
    import messageBus from "@src/components/messageBus";
    import {getBoughtTemplateList} from "@src/lib/ajax";
    import * as utils from "@src/lib/utils";
    import {mapState, mapMutations} from 'vuex'
    export default {
        name: "myTemplateStore",
        components: {
          MescrollVue,
          aniviewCom
        },
        data() {
            return {
                mescrollArr: [
                    { name: "h5", mescroll: null, list: [], isListInit: false,pageNum: 1,pageSize: 12,label6: "06",down:this.getMescrollDown(0)}, // h5
                    { name: "视频", mescroll: null, list: [], isListInit: false,pageNum: 1,pageSize: 12,label8: "08",down:this.getMescrollDown(1)}, // 视频
                    { name: "图文", mescroll: null, list: [], isListInit: false,pageNum: 1,pageSize: 12,label7: "07",down:this.getMescrollDown(2)}, // 图文
                ],
                tabType: 0, // 菜单类型
            };
        },
        created(){
          this.updateTabType();
        },
        computed: {
            routeType() {
                      return this.$route.params.type;
                  },
          ...mapState(["userInfo"])
        },
        methods: {
          ...mapMutations([
              'CURRENT_TYPE'
          ]),
          routeChange(path, name) {
              let self = this;
              if (path) {
                  self.$router.replace({path: path});
              } else if (name) {
                  self.$router.replace({name: name});
              }
              this.updateTabType();
              this.changeTab(this.tabType)
          },
          updateTabType(){
            let self = this;
            if (
                  self.$route.params.type === "animation" ||
                  self.$route.params.type === "myAanimation"
              ) {
                  self.tabType = 0;
              } else if (
                  self.$route.params.type === "vedio" ||
                  self.$route.params.type === "myVedio"
              ) {
                  self.tabType = 1;
              } else if (
                  self.$route.params.type === "article" ||
                  self.$route.params.type === "myArticle"
              ) {
                  self.tabType = 2;
              } else {
                  self.tabType = 0;
              }
          },
          getParams(){
          let self = this;
          let obj = {
              "type": "1",
              "page": self.mescrollArr[self.tabType].pageNum
          };
          if (self.mescrollArr[self.tabType].label6) {
              obj.label6 = self.mescrollArr[self.tabType].label6
          } else if (self.mescrollArr[self.tabType].label7) {
              obj.label7 = self.mescrollArr[self.tabType].label7
          } else if (self.mescrollArr[self.tabType].label8) {
              obj.label8 = self.mescrollArr[self.tabType].label8
          }
          return obj
          },
          
            // mescroll组件初化始的回调,可获取到mescroll对象
            mescrollInit(tabIndex, arg) {
                let mescroll = arg[0];   // 传入mescroll对象
                mescroll.tabType = tabIndex;
                this.mescrollArr[tabIndex].mescroll = mescroll;
            },
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
            getMescrollUp(tabType) {
                let self = this;
                let emptyWarpId = "dataList" + tabType;
                return {
                    page:{num:1, size:12},
                    auto: false,
                    scrollbar:{
                        use : false , 
                        barClass : "mescroll-bar" 
                    },
                    callback: this.upCallback, // 上拉回调,此处可简写; 相当于 callback: function (page) { upCallback(page); }
                    noMoreSize: 3, // 如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
                    empty: {
                      warpId: emptyWarpId, // 列表父布局的id;
                      icon: require("../../../images/avatar.png"), // 图标,默认null
                      tip: "暂无相关数据~", // 提示
                      btntext: "去逛逛 >", // 按钮,默认""
                      btnClick: function() {
                        // 点击按钮的回调,默认null
                        // alert("点击了按钮,具体逻辑自行实现");
                        self.$router.push({ path: "/index/works/animation" });
                      }
                    },
                    htmlNodata:'<p class="loadTipWrap" class="upwarp-nodata">-- 没有更多了 --</p>',
                    htmlLoading:'<div class="loadTipWrap"><img style="display: inline-block;width: 18px;height: 18px" src=http://yxbsve.mmarket.com/Uploads/pic/50/201811/5bf4fa7c8dfff.gif /><p class="upwarp-tip">加载中 . . .</p></div>',
                    // toTop: {
                    //   // 配置回到顶部按钮
                    //   src: "http://www.mescroll.com/img/mescroll-totop.png" // 图片路径,默认null (建议写成网络图,不必考虑相对路径)
                    // },
                    lazyLoad: {
                        use: true, // 是否开启懒加载,默认false
                        attr: 'imgurl', // 网络图片地址的属性名 (图片加载成功会自动移除改属性): <img imgurl='网络图  src='占位图''/>
                        showClass: 'mescroll-lazy-in', // 图片加载成功的显示动画: 渐变显示,参见mescroll.css
                        delay: 500, // 列表滚动的过程中每500ms检查一次图片是否在可视区域,如果在可视区域则加载图片
                        offset: 200 // 超出可视区域200px的图片仍可触发懒加载,目的是提前加载部分图片
                    }
                };
            },
            /* 下拉刷新的回调 */
            downCallback(mescroll) {
                // 这里加载你想下拉刷新的数据, 比如刷新tab1的轮播数据
                if (mescroll.tabType === 0) {
                    // loadSwiper();
                } else if (mescroll.tabType === 1) {
                    // ....
                } else if (mescroll.tabType === 2) {
                    // ....
                } else if (mescroll.tabType === 3) {
                    // ....
                }
                mescroll.resetUpScroll(); // 触发下拉刷新的回调,加载第一页的数据
            },
            /* 上拉加载的回调 page = {num:1, size:10}; num:当前页 从1开始, size:每页数据条数 */
            upCallback(page, mescroll) {
                if (typeof mescroll.tabType === "number") {
                    // 全部
                    this.mescrollArr[this.tabType].isListInit = true; // 标记列表已初始化,保证列表只初始化一次
                    this.getListDataFromNet(
                        mescroll.tabType,
                        page.num,
                        page.size,
                        curPageData => {
                            mescroll.endSuccess(curPageData.length); // 联网成功的回调,隐藏下拉刷新和上拉加载的状态;
                            if (page.num === 1) this.mescrollArr[this.tabType].list = []; // 如果是第一页需手动制空列表
                            this.mescrollArr[this.tabType].list = this.mescrollArr[this.tabType].list.concat(curPageData); // 追加新数据
                        },
                        () => {
                            if (page.num === 1) this.mescrollArr[this.tabType].isListInit = false;
                            mescroll.endErr(); // 联网失败的回调,隐藏下拉刷新的状态
                        }
                    );
                }
            },

            // 切换菜单
            changeTab(type) {
                let curTab = this.getTabData(this.tabType); // 当前列表
                let newTab = this.getTabData(type); // 新转换的列表
                curTab.mescroll.hideTopBtn(); // 隐藏当前列表的回到顶部按钮
                this.tabType = type; // 切换菜单
                if (!newTab.isListInit) {
                    newTab.mescroll.triggerDownScroll(); // 加载列表
                } else {
                    setTimeout(() => {
                        // 检查新转换的列表是否需要显示回到到顶按钮
                        var curScrollTop = newTab.mescroll.getScrollTop();
                        if (curScrollTop >= newTab.mescroll.optUp.toTop.offset) {
                            newTab.mescroll.showTopBtn();
                        } else {
                            newTab.mescroll.hideTopBtn();
                        }
                    }, 30);
                }
            },
            // 获取菜单对应的数据
            getTabData(tabType) {
                if (tabType === null) tabType = this.tabType;
                if (typeof tabType === "number") {
                    return this.mescrollArr[tabType];
                }
            },
            /* 联网加载列表数据
                  在您的实际项目中,请参考官方写法: http://www.mescroll.com/api.html#tagUpCallback
                  请忽略getListDataFromNet的逻辑,这里仅仅是在本地模拟分页数据,本地演示用
                  实际项目以您服务器接口返回的数据为准,无需本地处理分页.
                  * */
            getListDataFromNet(
                tabType,
                pageNum,
                pageSize,
                successCallback,
                errorCallback
            ) {
                let self = this;
                // 要先获取到userInfo.account才能请求列表数据
                self.timer = setInterval(() => {
                  if (self.userInfo.account) {
                    // 请求列表数据
                    getBoughtTemplateList(self.getParams()).then(function (data) {
                            data = utils.processReturnObj(data);
                                if (data.resultCode === 0) {
                                    let listData = data.data.templateList;
                                    // 回调
                                    successCallback && successCallback(listData);
                                }else{
                                    throw data;
                                }
                            }
                        ).catch((err)=>{
                            // 联网失败的回调
                          errorCallback && errorCallback();
                        });
                      clearInterval(self.timer);
                    }
                }, 30);
            }
        },
        beforeRouteEnter(to, from, next) {
            // 如果没有配置回到顶部按钮或isBounce,则beforeRouteEnter不用写
            next(vm => {
                let curMescroll = vm.$refs["mescroll" + vm.tabType][0]; // 找到当前mescroll的ref,调用子组件mescroll-vue的beforeRouteEnter方法
                curMescroll && curMescroll.beforeRouteEnter(); // 进入路由时,滚动到原来的列表位置,恢复回到顶部按钮和isBounce的配置
            });
        },
        beforeRouteLeave(to, from, next) {
            // 如果没有配置回到顶部按钮或isBounce,则beforeRouteLeave不用写
            let curMescroll = this.$refs["mescroll" + this.tabType][0]; // 找到当前mescroll的ref,调用子组件mescroll-vue的beforeRouteEnter方法
            curMescroll && curMescroll.beforeRouteLeave(); // 退出路由时,记录列表滚动的位置,隐藏回到顶部按钮和isBounce的配置
            next();
        }
    };
</script>

<style scoped lang="less">
.myTemplateStore {
        background: rgb(232, 232, 232);
        width: 100%;
        height: 100%;
        position: relative;
        overflow: hidden;
        display: flex;
        flex-direction: column;

        .typeIndex {
            height: 0.5rem;
            width: 100%;
            padding: 0.36rem 0;
            overflow: hidden;
            display: flex;
            justify-content: center;
            box-sizing: content-box;
            .item {
                width: 5.43rem;
                height: 100%;
                display: flex;
                justify-content: center;
                .text {
                    display: flex;
                    justify-content: center;
                    align-items: Center;
                }
            }

            .aniBtn, .vedioBtn, .artBtn {
                color: #0080cc;
                background: #e8e8e8;
                flex: 1;
                text-decoration: none;
                height: 0.5rem;
                line-height: 0.5rem;
                border-top: #0080cc 1px solid;
                border-bottom: #0080cc 1px solid;
                box-sizing: border-box;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .aniBtn {
                /*left: 0;*/
                border-top-left-radius: 15px;
                border-bottom-left-radius: 15px;
                border-left: #0080cc 1px solid;
            }

            .vedioBtn {
                /*left: 33.3%;*/
            }

            .artBtn {
                /*right: 0;*/
                border-top-right-radius: 15px;
                border-bottom-right-radius: 15px;
                border-right: #0080cc 1px solid;
            }

            /*.aniBtn.active,.artBtn.active{*/
            /*color: white;*/
            /*background: #0080cc;*/
            /*}*/
            .aniBtn.active, .vedioBtn.active, .artBtn.active {
                color: white;
                background: #0080cc;
            }

        }
/*以fixed的方式固定mescroll的高度*/
        .mescroll {
            position: fixed;
            top: 1.22rem;
            bottom: 0;
            height:auto;
        }
        .dataList{
            overflow:hidden;
            /*展示上拉加载的数据列表*/
            .aniviewItem {
                float: left;
                width: 2.24rem;
                height: 2.94rem;
                margin-left: 0.14rem;
                margin-top: 0.14rem;
            }
            .aniviewItemLeft {
                margin-left: 0.24rem;
            }
            .aniviewItemTop {
                margin-top: 0.2rem;
            }
        }
    }
</style>
