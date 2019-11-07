//Component Object
const { getAuthority } = require('../../authority');

Component({
  properties: {
    key: {
      type: String,
      value: ''
    }
  },
  data: {
    pageShow: true
  },
  methods: {
    update() {
      let pages = getCurrentPages();
      let route = pages[pages.length - 1].route;

      let identify = getApp().globalData.identify;
      let pageResult = getAuthority(identify, route);

      console.log(identify, route, '的权限是：', pageResult);

      if (this.properties.key) {
        let keyResult = getAuthority(identify, route, this.properties.key);
        console.log(identify, route, this.properties.key, '的权限是：', keyResult);

        if (this.properties.key === 'price') {
          this.triggerEvent('updatePriceStatus', keyResult);
        } else if (this.properties.key === 'addToShopCart') {
          let audit = getApp().globalData.auditStatus;
          if (!keyResult) {
            if (audit === 0) {
              let url = '/pages/second/logs';
              this.triggerEvent('needNavigateTo', url);
            } else if (audit === 1) {
              let title = '审核中';
              this.triggerEvent('needToast', title);
            }
          } else {
            this.triggerEvent('needNavigateTo');
            this.triggerEvent('needToast');
          }
        }  
      }

      this.setData({
        pageShow: pageResult,
      })
    },
  },
  attached: function () {
  },
  
  pageLifetimes: {
    show: function() {
      this.update();
    }
  }
});