const fs = require('fs');
const { Command } = require('commander');
const program = new Command();
program.version('0.0.1');
function myParseInt(value, dummyPrevious) {
    return parseInt(value);
}
program.option('-c, --count <number>', 'the count that you want to random', myParseInt);
program.parse(process.argv);

if (program.count < 2) {
    console.error('try this:node random.js -c 200');
    return;
}


/**
 * 得到一个两数之间的随机整数，包括两个数在内
 * @param {*} min 
 * @param {*} max 
 */
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //含最大值，含最小值 
}

/**
 * 根据熟练度获取出现次数
 * 越熟练出现次数越小 但是也会出现
 * 算法可以修改
 * @param {*} min 
 * @param {*} max 
 */
function createTimes(obj) {
    let times = 0;
    const { count, family } = obj ? obj : {};
    if (family)
        times = count - (family * 2 - 6)
    else
        times = count;

    if (times <= 0)
        times = 1;
    return times;
}


//获取list.txt中的数据
let list = [];
try {
    const data = fs.readFileSync('list.json');
    list = JSON.parse(data.toString());
} catch (error) {
    console.error(error);
}
//根据count和family生成数组，供随机使用
let tmpList = [];
for (let i = 0; i < list.length; i++) {
    const obj = list[i];
    for (let j = 0; j < createTimes(obj); j++)
        tmpList.push({ ...obj });
}

let items = [];
while (items.length < program.count) {
    const obj = tmpList[getRandomIntInclusive(0, tmpList.length - 1)];
    if (items.find(item => item.lbl === obj.lbl))
        continue;
    delete obj.count;
    items.push(obj);
}

fs.writeFileSync('random.json', JSON.stringify(items));
console.log(JSON.stringify(items && items.map(item => item.lbl)));






