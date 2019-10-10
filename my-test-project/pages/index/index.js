//index.js
//获取应用实例
const app = getApp()


Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  click() {
    console.log('click')
    app.aldstat.sendEvent('点击按钮', {
      play: '这是个普通的按钮:click1',
      location: '1'
    });

    app.aldstat.sendEvent('测试click1');

    wx.navigateTo({url: '/pages/custom/custom'});
  },
  click2() {
    console.log('click2')
    app.aldstat.sendEvent('点击按钮', {
      play: '这是个普通的按钮:click2'
    });

    app.aldstat.sendEvent('测试click2');
  },
  handleContact(e) {
    console.log('handleContact');
    console.log(e);
  }
})
