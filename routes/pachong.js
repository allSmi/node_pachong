const express = require('express');
const router = express.Router();
const phantom = require('phantom');
const cheerio = require('cheerio');

/* GET home page. */
router.get('/', async (req, res, next) => {
    res.header('Content-Type', 'text/html;charset=UTF-8');
    let phInstance = await phantom.create() //创建phantomj实例对象
    let page = await phInstance.createPage(); //创建网页对象实例
    await page.property('viewportSize', { width: 1800, height: 3000 });
    let status = await page.open('https://detail.tmall.com/item.htm?id=547122477838'); // 获取结果状态
    console.log('status:', status);
    // const $ = cheerio.load(content); //解析输出的结果内容
    // const jsonResult = [];
    // $('a[href]').each((i, item) => { //抓取符合条件的a标签的链接地址
    //     const href = $(item).attr('href');
    //     if (new RegExp(/http[s]?:\/\/.*/).test(href)) {
    //         jsonResult.push(href);
    //     }
    // });

    var title = await page.evaluate(function() {
        return document.title;
    })
    console.log('----', title, '----');
    await lateTime(10000);
    // await page.render(`${ title }--${Date.now()}.png`);

    let content = await page.property('content'); //获取相应的属性内容
    const $ = cheerio.load(content);

    page.close();
    phInstance.exit();
    res.send($.html())
});

let lateTime = (time) => {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve();
        }, time);
    });
}

module.exports = router;
