var path = require('path'),
    root_path = process.cwd(),
    crawler = require(path.join(root_path, '/public/crawler')),
    fs = require('fs');

    fs.appendFileSync('车型.json','[');
var headers = {}
let host = 'http://car.bitauto.com';
let cNum = 0, imgNum = 0; // 计数
// 初始化clawler对象
crawler.initCrawler(headers, res => {
    // 格式化请求到的数据
    res.body = res.body.replace('JsonpCallBack(','')
    res.body = res.body.substr(0,res.body.lastIndexOf(')'))
    res.body = res.body.replace(/(?:\s*['"]*)?([a-zA-Z0-9]+)(?:['"]*\s*)?:/g, '"$1":')
    res.body = JSON.parse(res.body);

    for (const key in res.body.brand) {
        if (res.body.brand.hasOwnProperty(key)) {
            const element = res.body.brand[key];
            element.forEach(e => {
                try {
                    getPage(host+e.url, e.name)
                } catch (error) {
                    console.error(error)                    
                }
            });
        }
    }
})
// 开始请求
crawler.c.queue('http://api.car.bitauto.com/CarInfo/getlefttreejson.ashx?tagtype=chexing&pagetype=masterbrand&objid=0')

// 请求每个品牌的页面
function getPage(url, name) {
    crawler.c.queue({
        uri: url,
        callback: function(err,res,done) {
            if (err) {
                return err
            }
            let $ = res.$;
            $('#divCsLevel_0 .col-xs-3 ').each((i, e) => {
                downImg($(e).find('.img img').attr('src'), $(e).find('.p-list li.name a').text())
                crawler.num++; // 请求成功
                console.log(crawler.num+':'+name+'--'+$(e).find('li.name a').text()+'; 价格--'+$(e).find('li.price a').text());
                var info = {
                    "品牌": name,
                    "车型": $(e).find('.p-list li.name a').text(),
                    "网址": host+ $(e).find('.p-list li.name a').attr('href'),
                    "价格": $(e).find('.p-list li.price a').text()
                }
                // 写入json文件, 存入数据库亦可
                fs.appendFile('车型.json',JSON.stringify(info)+',', function(err) {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    // 写入成功
                    cNum++;
                    end();
                });
            })
            done()
        }
    })
}

function downImg(link, name) {
    crawler.c.queue({
        uri: link,
        encoding: null,
        jQuery: false, 
        callback: function (err, res, done) {
            if (err) {
                console.error(err.stack);
            } else {
                imgNum++;
                fs.createWriteStream(root_path + '/images/' + name+'.png').write(res.body);
                console.log('下载成功: %d', imgNum);
                end();
            }
            done();
        }
    });
}

function end() {
    if (crawler.num == cNum && cNum == imgNum) {
        fs.appendFileSync('车型.json',']');
        // 如果请求并且写入完成, 退出程序
        process.exit(1)
    }
}