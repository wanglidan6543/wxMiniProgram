const { ROOTPATH, VERSION } = require('../config')

module.exports = function(cfg) {
  return new Promise((resolve, reject) => {
    console.log(ROOTPATH + cfg.url);
    let header = { 
      'app_id': 3,
      'device': 0,
      'version': VERSION,
      'content-type': 'application/json', 
      'authorization': wx.getStorageSync('authorization')
    };
    wx.request({
      url: cfg.url.indexOf('http') !== 0 ? ROOTPATH + cfg.url : cfg.url,
      header: cfg.header || header,
      method: cfg.method || 'GET',
      responseType: cfg.responseType,
      data: cfg.data,
      success(res){
        resolve(res)
      },
      fail(res){
        reject(res)
      }
    })
  })
}
