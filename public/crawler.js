const Crawler = require("crawler"),
    path = require('path'), root_path = process.cwd(),
    config = require(path.join(root_path, '/config'));
module.exports = {
    c: '',
    num: '',
    initCrawler(headers={}, cb) {
        this.c = new Crawler({
            // 超时时间
            timeout: config.crawler.timeout,
            // 失败重试次数
            retries: config.crawler.retries,
            // 失败重试等待时间
            retryTimeout: config.crawler.retryTimeout,
            // 最大并发数默认为10
            // maxConnections: config.crawler.maxConnections,
            // rateLimit: config.crawler.rateLimit,
            // 在每个请求处理完毕后将调用此回调函数
            headers: headers,
            callback: function (error, res, done) {
                if (error) {
                    console.log(error);
                } else {
                    cb(res)
                }
                done();
            }
        });
    }
}