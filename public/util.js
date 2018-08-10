const moment = require('moment');
    

module.exports = {
    // 去空格
    trim(str) {
        return str.replace(/(^\s*)|(\s*$)/g, '').replace(/ /g, '')
    },
    // 匹配删除a标签
    deleteAlabel(s) {
        let reg = /<a .*?>/ig, reg2 = /<\/a>/ig
        return s.replace(reg,'').replace(reg2, '')
    },
    // 删除换行制表符
    compress_html(s) {  
        return s.replace(/\n/g, '').replace(/\t/g, '').replace(/\r/g, '').replace(/\f/g, '').replace(/\v/g, '').replace(/(^\s*)|(\s*$)/g,''); //清除换行符  
    },
    // 对$().html() 获取到的  $#x2367;  这样的字符串转码
    htmlToStr(str) {
        return str.replace(/&#(x)?(\w+);/g, ($, $1, $2) => {
            return String.fromCharCode(parseInt($2, $1 ? 16 : 10));
        })
    },
    getImgName(url) {
        // 获取文章封面图  解析   http://res0.dyhjw.com/ueditor/php/upload/image/20180803/1533259159803007.jpg  这样的地址, 只取图片名  xxx.jpg
        // const now = moment().format('YYYY/M/D/');
        return /([^/]+)$/.exec(url)[0]
    },
    parseTime(a) {
        let t;
        if (a) {
            t = new Date(a)
        } else {
            t = new Date()
        }
        return t.toLocaleDateString() + ' ' + (t.getHours() < 10 ? ('0' + t.getHours()) : t.getHours()) + ':' + (t.getMinutes() < 10 ? ('0' + t.getMinutes()) : t.getMinutes()) + ':' + (t.getSeconds() < 10 ? ('0' + t.getSeconds()) : t.getSeconds())
    },
    curDate() {
        // 范湖 2018/9/12/
        let curDate = new Date();
        return curDate.getFullYear()+'/'+(curDate.getMonth()+1)+'/'+curDate.getDate()+'/'
    }
}


