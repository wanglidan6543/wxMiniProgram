//logs.js
const util = require('../../utils/util.js')
// const { Page } = require('../../GlobalStatePage');
const { basePage  } = require('../../BasePage');

const IMGPATH = 'https://fe-ifarm.cpgroupcloud.com/static_resource/cpmart-customer/'

basePage({
  data: {
    logs: [],
    urls: []
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  },
  onShow: function() {
    console.log('second logs show');
    setTimeout(()=> {
      let urls = [
        IMGPATH + 'product-1.png',
        IMGPATH + 'product-2.png',
        IMGPATH + 'product-3.png',
        IMGPATH + 'product-4.png',
        '',
        IMGPATH + 'product-6.png',
        IMGPATH + 'product-1.png',
        IMGPATH + 'product-2.png',
        IMGPATH + 'product-3.png',
        IMGPATH + 'product-4.png',
        IMGPATH + 'product-5.png',
        '',
        IMGPATH + 'product-1.png',
        IMGPATH + 'product-2.png',
        IMGPATH + 'product-3.png',
        IMGPATH + 'product-4.png',
        IMGPATH + 'product-5.png',
        IMGPATH + 'product-6.png',
      ];
      this.setData({
        urls: urls
      })
    },120)
  },
})
