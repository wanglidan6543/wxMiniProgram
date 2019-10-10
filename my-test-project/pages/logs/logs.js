//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: []
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  },
  catClick() {
    console.log('cat click');
    wx.navigateTo({url: '/package1/pages/cat/cat'})
  },
  dogClick() {
    console.log('dog click');
    wx.navigateTo({url: '/package1/pages/dog/dog'})
  },
  appleClick() {
    console.log('apple click');
    wx.navigateTo({url: '/package2/pages/apple/apple'})
  },
  bananaClick() {
    console.log('banana click');
    wx.navigateTo({url: '/package2/pages/banana/banana'})
  },
  adLoad() {
    console.log('Banner 广告加载成功')
  },
  adError(err) {
    console.log('Banner 广告加载失败', err)
  },
  adClose() {
    console.log('Banner 广告关闭')
  }
})
