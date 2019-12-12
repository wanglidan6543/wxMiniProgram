const { requestApi } = require('./api');
const { USERLOCATION } = require('../config');
const { STATUSTEXTS } = require('./statusConfig');

function wxLogin(onSuccess) {
  wx.login({
    success(res) {
      if (res.code) {
        codeToSession(res.code, onSuccess);
      }
    }
  });
}

function codeToSession(code, onSuccess) {
  let data = {
    js_code: code
  };
  requestApi('user/codetosession', 'GET', data, false, 
    (res) => {
      const data = res.data;
      const authorization = data.authorization;
      try {
        wx.setStorageSync('authorization', authorization);
      } catch (e) {
        console.error('写入authorization缓存错误');
      }
      if (onSuccess) {
        onSuccess();
      }
    }
  );
}

function getUserLocation(onSuccess) {
  wx.getLocation({
    type: 'wgs84',
    success(res) {
      const latitude = res.latitude
      const longitude = res.longitude
      uploadUserLocation(latitude, longitude, onSuccess);
    },
    fail(res) {
      wx.showModal({
        title: '位置信息授权',
        content: '为了给您提供更好的购物服务，需要您授权位置信息',
        showCancel: false,
        confirmText: '去设置',
        confirmColor: '#FF8727',
        success(res) {
          if (res.confirm) {
            wx.openSetting({
              success(res) {
                if (res.authSetting['scope.userLocation']) {
                  getUserLocation(onSuccess);
                }
              }
            })
          }
        }
      })
    }
  });
}

function uploadUserLocation(latitude, longitude, onSuccess) {
  let lat = 0;
  let lng = 0;
  if (USERLOCATION === 'HB') {
    lat = 30.535444;
    lng = 114.363428;
  } else if (USERLOCATION === 'BJ') {
    lat = 39.908823;
    lng = 116.39747;
  } else {
    lat = latitude;
    lng = longitude;
  }

  let data = {
    lat: lat,
    lng: lng
  };
  requestApi('user/lnglat', 'POST', data, false, 
    (res) => {
      if (onSuccess) {
        onSuccess();
      }
    }
  );
}

function getConfigInfo(onSuccess) {
  const app = getApp();
  requestApi('config', 'GET', {}, false, 
    (res) => {
      const data = res.data;
      app.globalData.inventory_partition_line = Number(data.inventory_partition_line);
      app.globalData.small_payment_limit = Number(data.small_payment_limit);
      app.globalData.order_close_time = Number(data.order_close_time);
      app.globalData.freight = Number(data.freight);
      app.globalData.auto_delivery_time = Number(data.auto_delivery_time);
      app.globalData.initial_delivery_amount = Number(data.initial_delivery_amount);

      if(onSuccess) {
        onSuccess();
      }
    }
  );
}

function getUserInfoData(onSuccess, onFail) {
  const app = getApp();

  requestApi('user/info', 'GET', {}, false, 
    (res) => {
      const data = res.data;
      let userInfo = {};
      userInfo.nickName = data.wx_nice;
      userInfo.headImg = data.head_img_url;
      userInfo.userId = data.user_id;
      userInfo.mobile = data.mobile;
      userInfo.unionId = data.union_id;
      userInfo.credit = data.credit_line;
      userInfo.balance = data.balance;
      userInfo.loanBalance = data.loan_outstanding_balance;
      userInfo.isMobileBind = data.is_mobile_bind;
      userInfo.auditStatus = data.audit_status; 
      userInfo.storeAreaAddress = data.store_area_address;
      userInfo.isDistributionScope = data.is_distribution_scope;
      userInfo.customerType = data.customer_type;  // 用户类型 1 普通用户 2 经销商
      userInfo.salesmanMobile = data.salesman_mobile;
      userInfo.salesmanName = data.salesman_name;
      userInfo.isSapCustomer = data.is_sap_customer;
      userInfo.canAddNewStore = data.create_store_status;
      userInfo.isSalesman = data.is_salesman;
      userInfo.isNotAllowOrder = data.is_not_allow_order;  // 是否允许下单  0允许 1不允许
      userInfo.defaultStoreId = data.store_id;  // 默认门店Id
      
      app.globalData.userInfo = userInfo;

      let obj = app.globalData.currentUserStatus;
      obj.status = userInfo.auditStatus;
      obj.link = '';

      let key = userInfo.isSalesman ? 'salesman' : (userInfo.customerType === 2) ? 'dealer' : 'user';
      if (!userInfo.isSalesman) {
        if (!userInfo.isMobileBind) {
          obj.status = 0;
          obj.link = '/pages/auth/index/index';
        } else {
          if (obj.status === 0 || obj.status === 3) {
            obj.link = '/pages/auth/step1/step1';
          }
        } 
      }

      obj.address = STATUSTEXTS[key][obj.status].address;
      obj.toast = STATUSTEXTS[key][obj.status].toast;

      if (obj.status === 2 && userInfo.customerType === 2 && userInfo.isNotAllowOrder === 0) {
        obj.toast = '';
      }

      if (obj.status === 2) {
        let subStr = '';
        if (userInfo.storeAreaAddress.length > 8) {
          subStr = userInfo.storeAreaAddress.substring(0,8);
          subStr = subStr.concat('...');
        } else {
          subStr = userInfo.storeAreaAddress;
        }
        obj.address = subStr;
      }

      app.globalData.currentUserStatus = obj;

      if (onSuccess) {
        onSuccess();
      }
    },
    () => {
      wxLogin(() => {
        if (onFail) { onFail(); }
      });
    }
  );
}

function getReLaunchPage() {
  const app = getApp();

  if (app.globalData.fromShare) {
    if (app.globalData.userInfo.isMobileBind === 0) {
      if (app.globalData.shareOrderId.length || app.globalData.shareOrderStauts) {
        wx.reLaunch({
          url: '/pages/auth/index/index'
        })
        return;
      }
    }
    wx.reLaunch({
      url: '/pages/home/home'
    })
    return;
  }

  if (app.globalData.userInfo.isMobileBind === 0) {
    wx.reLaunch({
      url: '/pages/auth/index/index'
    })
  } else {
    wx.reLaunch({
      url: '/pages/home/home'
    })
  }
}

module.exports = { wxLogin, getUserLocation, getConfigInfo, getUserInfoData, getReLaunchPage }