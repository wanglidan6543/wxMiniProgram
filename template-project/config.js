const APPID = 'wxc1e9fd54cae880cd'

const IMGPATH = 'https://fe-ifarm.cpgroupcloud.com/static_resource/cpmart-customer/'

// 上次提审版本 v1.1.1
const VERSION = '1.3.0'  // 当前版本

// 用户定位位置 -- 实际(REAL)) 湖北(HB) 北京(BJ)
const USERLOCATION = 'REAL';

//mock 地址
// const ROOTPATH = 'http://localhost/'

//测试环境域名
const ROOTPATH = 'https://gateway-cpmart-wx-api-dev.cpgroupcloud.com/'

//线上环境域名
// const ROOTPATH = 'https://gateway-cpmart-wx-api.cpgroupcloud.com/'

module.exports = { APPID, IMGPATH, ROOTPATH, VERSION, USERLOCATION }
