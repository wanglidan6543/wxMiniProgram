const send = require('./send');

function requestApi(url, method, data,  showLoading, onSuccess, onFail) {
  if (showLoading) {
    wx.showLoading({
      title: ''
    })
  }
  // console.log('url:', url, '请求参数' , data);
  send({
    url: url,
    method: method,
    data: data
  }).then(res => {
    console.log(url, res);
    if (res.data.error === 0) {
      // 请求成功
      wx.hideLoading();
      onSuccess(res.data);
    } else {
      wx.hideLoading();
      let error = res.data === null || typeof (res.data) === "undefined" ? "网络请求失败，请稍后再试" : res.data.msg;
      if (!error || error === '') {
        error = "网络请求失败，请稍后再试";
      }
      if (error === 'authorization error') {
        if (onFail) { onFail(); }
        return;
      }
      wx.showToast({
        title: error,
        icon: 'none',
        duration: 2000
      });
      onFail();
    }
  })
}

module.exports = { requestApi };