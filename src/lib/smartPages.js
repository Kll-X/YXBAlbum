import * as utils from "./utils.js";
import * as ajax from "./ajax.js";
import messageBus from "../components/messageBus.js"

//todo localIds和serverIds应该没什么用了，可以都改为使用ownUrls。

function replaceImages(imagesInformation, templateData) {
    let localIds = imagesInformation.localIds;
    let serverIds = imagesInformation.serverIds;
    let ownUrls = imagesInformation.ownUrls;
    let localIdsCopy = localIds.slice();
    let serverIdsCopy = serverIds.slice();
    let ownUrlsCopy = ownUrls.slice();

    //拿到可替换图片的页面列表

    let alterableListObj = getAlterableList(templateData);
    let alterableList = alterableListObj.alterableList;
    let lastPageIndex = alterableListObj.lastPageIndex;

    //拿到可替换图片的总数
    let allAlterImgsCount = calcAllAlterImgs(alterableList);

    if(allAlterImgsCount > 0) {

        if (localIdsCopy.length > allAlterImgsCount) {
            let smartPage = getSmartPage(alterableList);
            // 计算添加灵活的次数
            let times = Math.ceil((localIdsCopy.length - allAlterImgsCount) / smartPage.alterImgsCount);

            let smartPageArray = [];

            for (let i = 0; i < times; i++) {
                let smartPageCopy = $.extend(true, {}, smartPage);
                smartPageCopy.elements.forEach(function (item) {
                    item.id = utils.getRandomId();
                });
                smartPageCopy.num = i + 1;
                smartPageCopy.id = '';
                smartPageArray.push(smartPageCopy)
            }

            templateData.list = templateData.list.slice(0, lastPageIndex + 1)
                .concat(smartPageArray)
                .concat(templateData.list.slice(lastPageIndex + 1));

        }

        //如果需要替换的图片总数大于可替换图片的总数
        replacePic(templateData.list, ownUrlsCopy, serverIdsCopy);

        templateData.list.forEach(function (pageInfo, index, array) {
            pageInfo.num = index + 1
        });

    }
}

function replacePic(list, ownUrlsCopy, serverIdsCopy) {
    list.forEach(function (pageInfo) {
        pageInfo.elements.forEach(function (item) {
            if (ownUrlsCopy.length > 0) {
                if (item.properties.replacement) {
                    item.properties.src = ownUrlsCopy.shift().toString();
                    item.properties.serverId = serverIdsCopy.shift().toString();
                    item.properties.replaced = true;
                    // item.id = utils.getRandomId();
                }
            }
        })
    })
}

//获取可替换图片的列表
function getAlterableList(templateData) {
    let alterableList = [];
    let lastPageIndex = null;
    templateData.list.forEach(function (pageInfo, index, array) {
        if (isAlterable(pageInfo)) {
            lastPageIndex = index;
            pageInfo.alterImgsCount = calcAlterImgs(array[index]);
            alterableList.push(pageInfo)
        }
    });
    return {
        alterableList,
        lastPageIndex
    }
}

//判断列表内是否存在可替换图片的元素
function isAlterable(pageInfo) {
    for (let x in pageInfo.elements) {
        if (pageInfo.elements[x].properties.replacement) {
            return true
        }
    }
}

//计算每个列表内可替换图片的个数
function calcAlterImgs(pageInfo) {
    let i = 0;
    pageInfo.elements.forEach(function (element) {
        if (element.properties.replacement) {
            i++
        }
    });

    return i
}

//计算可替换图片的总数
function calcAllAlterImgs(alterableList) {
    let count = 0;
    alterableList.forEach(function (item) {
        count += item.alterImgsCount
    });
    return count
}

function getSmartPage(alterableList) {
    let length = alterableList.length;
    if (length) {
        let smartPage = alterableList[length - 1];
        smartPage.num = alterableList[length - 1].num;
        return smartPage
    }
}

export {getAlterableList, replaceImages}