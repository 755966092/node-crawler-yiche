# 启动


# 配置文件config.js

```JavaScript

module.exports = {
    // 爬虫配置
    crawler: {
        // 超时时间
        timeout: 10000000,
        // 失败重试次数
        retries: 10,
        // 失败重试等待时间
        retryTimeout: 1000,
        // 最大并发数
        maxConnections: 1,
         // 两次请求之间将闲置1000ms
        rateLimit: 500,
    },
}
```

# 命令行指令
```
-a, --all: 抓取全部数据
-p, --page <n>: 抓取前n页数据
-o, --one <n>: 抓取前n条数据
```