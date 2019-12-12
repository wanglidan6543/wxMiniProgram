//index.js
//获取应用实例
const app = getApp()
const { updateAuthority } = require('../../authority');

app.BasePage({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,

    // 新加的
    showPrice: false,
    link: '',
    toast: '',
    showif: true,
    showhidden: false,
    showC1: true,
    key: 'default'
  },
  onLoad: function () {
    updateAuthority();
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

  onShow: function() {
    // let identify = getApp().globalData.identify;
    // console.log(identify, ROUTE, '的权限是：', getAuthority(identify, ROUTE));
    // console.log(identify, ROUTE, 'price 的权限是：', getAuthority(identify, ROUTE, 'price'));
    // console.log(identify, ROUTE, 'addToShopCart 的权限是：', getAuthority(identify, ROUTE, 'addToShopCart'));

    // 跳转 文案 toast 
  },

  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '/pages/second/logs'
    })
  },

  onTap1() {
    app.globalData.auditStatus = 1;
    updateAuthority();

    this.selectComponent('.price-auth').update();
    this.selectComponent('.cart-auth').update();
  },

  onTap2() {
    app.globalData.auditStatus = 2;
    updateAuthority();

    this.selectComponent('.price-auth').update();
    this.selectComponent('.cart-auth').update();
  },

  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  addToCart() {
    if (this.data.link) {
      wx.navigateTo({ url: this.data.link });
      return;
    } 

    if (this.data.toast) {
      wx.showToast({
        title: this.data.toast,
        icon: 'none',
        duration: 1500
      })
      return;
    }
    console.log('可以加入购物车啦');
  },

  updatePriceStatus(obj) {
    this.setData({
      showPrice: obj.detail
    })
  },
  needNavigateTo(obj) {
    this.data.link = obj.detail;
    this.data.toast = '';
  },
  needToast(obj) {
    this.data.toast = obj.detail;
    this.data.link = '';
  },
  handleIf(){
    this.setData({
      showif: !this.data.showif,
    });
  },
  handleHidden(){
    this.setData({
      showhidden: !this.data.showhidden,
    });
  },
  handleComponent() {
    this.setData({
      showC1: !this.data.showC1,
      key: this.data.key + ',|,'
    });
  }
})
