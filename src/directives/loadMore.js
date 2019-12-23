import messageBus from '../components/messageBus.js';
import * as utils from '../../src/lib/utils.js';


export default {
    install (Vue) {

        // 上拉加载更多
        Vue.directive('loadmore-wrapper', {
            update: function (el, binding) {
                $(el).off('scroll').on('scroll', function (event) {
                    if ($(el).scrollTop() === 0) {
                        return
                    }
                    let scrollTop = $(this).scrollTop();
                    let contentHeight = $(this)[0].scrollHeight;
                    let wrapperHeight = $(this).height();
                    if (contentHeight - scrollTop < parseInt(wrapperHeight) + 60 && contentHeight - scrollTop >= parseInt(wrapperHeight) + 3) {
                        messageBus.$emit('updateLoadstatus','goOnPull');
                    } else if (contentHeight - scrollTop === parseInt(wrapperHeight)||contentHeight - scrollTop === Math.ceil(wrapperHeight) ||(!utils.isIos() && contentHeight - scrollTop === parseInt(wrapperHeight)+1)) {
                        messageBus.$emit('updateLoadstatus','loadMore');
                        if (binding.value.tempTagsInfo[binding.value.activeIndex].pageNo <= binding.value.tempTagsInfo[binding.value.activeIndex].totalPage) {
                            if (binding.value.busy) {
                                return
                            }
                            binding.value.busy = true;
                            binding.value.changeActiveList(binding.value.activeIndex);
                        } else {
                            messageBus.$emit('updateLoadstatus','noMore');
                        }
                    }
                })
            }
        })
    }
}