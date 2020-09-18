const fs = require('fs');

//获取random.json中的数据
let params = [];
try {
    const data = fs.readFileSync('random.json');
    params = JSON.parse(data.toString());
} catch (error) {
    console.error(error);
    return;
}

//获取list的中的数据
let list = [];
try {
    const data = fs.readFileSync('list.json');
    list = JSON.parse(data.toString());
} catch (error) {
    console.error(error);
    return;
}

if (!list || !list.length) {
    console.log('There is nothing in list.json,please create it first.')
    return;
}


if (!params || !params.length) {
    console.log('There is nothing in params.json,please create it first.')
    return;
}

//根据传入的params的family设置list相应的family
//如果list不存在，则新增
for (let i = 0; i < params.length; i++) {
    const param = params[i];
    let idx = list.map(item => item.lbl).indexOf(param.lbl);
    if (idx !== -1) {
        list[idx].family = param.family;
    } else
        list.push({ ...param, count: 1 });
}
//把新数据重新写入
fs.writeFileSync('list.json', JSON.stringify(list));






