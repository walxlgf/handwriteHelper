const fs = require('fs')
/**
 * 只获取汉字
 * @param {*} str 
 */
function fetchChinese(str) {
    if (str != null && str != '') {
        var reg = /[\u4e00-\u9fa5]/g;
        return str.match(reg).join('');
    }
    else return '';
}

/**
 * 去除所有汉字
 * @param {*} str 
 */
function removeChinese(str) {
    if (str != null && str != '') {
        var reg = /[\u4e00-\u9fa5]/g;
        return str.replace(reg, '');
    }
    else
        return '';
}

//获取原始数据
const data = fs.readFileSync('origin.txt');
//转换为字符串
let origin = fetchChinese(data.toString());

//
let list = [];
for (let i = 0; i < origin.length; i++) {
    const chr = origin.charAt(i);
    let obj = list.find(item => item.lbl === chr);
    if (obj) {
        obj.count = obj.count + 1;
    } else {
        list.push({ lbl: chr, count: 1 });
    }
}


//获取list.txt中的数据 用于设置family
let oldList = [];
try {
    const oldData = fs.readFileSync('list.json');
    oldList = JSON.parse(oldData.toString());
} catch (error) {
    // console.error(error);
}

//同步熟练度
for (let i = 0; i < list.length; i++) {
    let obj = list[i];
    const oldObj = oldList && oldList.find(item => item.lbl === obj.lbl);
    //同步熟练度 不存在或为0时 设置为1
    obj.family = oldObj && oldObj.family ? oldObj.family : 1;
}

//排序
list && list.sort((a, b) => {
    if (a.count === b.count)
        return a.lbl - b.lbl;
    else
        return b.count - a.count;
})
fs.writeFileSync('list.json', JSON.stringify(list));



