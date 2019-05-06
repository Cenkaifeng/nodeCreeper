//外部依赖
const express = require('express');
const app = express();
const superagent= require('superagent');
const cheerio = require('cheerio');

//脚本常量
const targetUrl = 'http://news.baidu.com/';

//启动当前服务
let server = app.listen(3000, function () {
  let host = server.address().address;
  let port = server.address().port;
  console.log('Your App is running at http://%s:%s', host, port);
});


// router test
app.get('/', function (req, res) {
    res.send('Hello World!');
});


// 引入所需要的第三方包


let hotNews = [];                                // 热点新闻
let localNews = [];                              // 本地新闻

/**
 * index.js
 * [description] - 使用superagent.get()方法来访问百度新闻首页
 */
superagent.get(targetUrl).end((err, res) => {
  if (err) {
    // 如果访问失败或者出错，会这行这里
    console.log(`数据抓取失败 - ${err}`)
  } else {
   // 访问成功，请求http://news.baidu.com/页面所返回的数据会包含在res
   // 抓取热点新闻数据
   console.log('看看爬取了什么', res)
   hotNews = getHotNews(res)
  }
});



/**
 * index.js
 * [description] - 抓取热点新闻页面
 */

//数据dom 分析
let getHotNews = (res) => {
  let hotNews = [];
  // 访问成功，请求http://news.baidu.com/页面所返回的数据会包含在res.text中。
  
  /* 使用cheerio模块的cherrio.load()方法，将HTMLdocument作为参数传入函数
     以后就可以使用类似jQuery的$(selectior)的方式来获取页面元素
   */
  let $ = cheerio.load(res.text);

  // 找到目标数据所在的页面元素，获取数据
  $('div#pane-news ul li a').each((idx, ele) => {
    // cherrio中$('selector').each()用来遍历所有匹配到的DOM元素
    // 参数idx是当前遍历的元素的索引，ele就是当前便利的DOM元素
    let news = {
      title: $(ele).text(),        // 获取新闻标题
      href: $(ele).attr('href')    // 获取新闻网页链接
    };
    hotNews.push(news)              // 存入最终结果数组
  });
  return hotNews
};