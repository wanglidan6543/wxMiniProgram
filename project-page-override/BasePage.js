let originalPage = Page; // 保存原本的Page对象
let route = '';

let basePage = function (data) {
  // let result = object.assign({}, data)
  
  // result.onLoad=function(...vals){
  //   console.log('log')

  //   data.onLoad.call(this,...vals)
  // }


  // 重写onLoad默认执行一些初始事件
  let originalOnLoad = data.onLoad;
  data.onLoad = function (o) {
    let pages = getCurrentPages();
    route = pages[pages.length - 1].route;
    console.log(route, '页面onLoad');
    
    originalOnLoad.call(this, o);
  }

  // 重写onShow默认执行一些初始事件
  let originalOnShow = data.onShow;
  data.onShow = function (o) {
    let pages = getCurrentPages();
    route = pages[pages.length - 1].route;
    console.log(route,' 页面onShow');

    // let identify = getApp().globalData.identify;
    // console.log(identify, route, '的权限是：', Authority.getAuthority(identify, route));
    // console.log(identify, route, 'price 的权限是：', Authority.getAuthority(identify, route, 'price'));

    if (originalOnShow) {
      originalOnShow.call(this, o);
    }
  }

  // 重写bindViewTap方法
  let originalbindViewTap = data.bindViewTap;
  data.bindViewTap = function (o) {
    console.log('自定义函数, bindViewTap');

    if (originalbindViewTap) {
      originalbindViewTap.call(this, o);
    }
  }

  return originalPage(data);
};

module.exports.basePage = basePage;