const { pageConfig } = require('./pageConfig');
const { dataConfig } = require('./dataConfig');

function getAuthority(identify, page, data) {
  if (!identify || identify.length === 0) {
    return false;
  }
  if (!page || page.length === 0) {
    return false;
  }

  let pageResult = pageConfig[identify][page];
  let dataResult = dataConfig[identify][data];

  if (!data) {
    return pageResult;
  }
  if (pageResult && dataResult) {
    return true;
  }
  return false;
}

function updateAuthority() {
  let identify = getApp().globalData.identify;
  let auditStatus = getApp().globalData.auditStatus;
  console.log('更新配置', identify, auditStatus);

  let pages = pageConfig[identify];
  if (identify === 'user' || identify === 'salesman') {
    switch(auditStatus) {
      case 0:
      case 1:
      case 3:
      {
        pages['pages/index/index'] = true;
        pages['pages/logs/logs'] = false;
        pages['pages/second/index'] = true;
        break;
      }
      case 2:
      {
        pages['pages/index/index'] = true;
        pages['pages/logs/logs'] = true;
        pages['pages/second/index'] = true;
        break;
      }
      default: break;
    }
  } else if (identify === 'tourist') {
    pages['pages/index/index'] = false;
    pages['pages/logs/logs'] = false;
    pages['pages/second/index'] = false;
  }

  let datas = dataConfig[identify];
  if (identify === 'user') {
    switch(auditStatus) {
      case 0:
      case 1:
      case 3:
      {
        datas['addToShopCart'] = false;
        datas['price'] = false;
        break;
      }
      case 2:
      {
        datas['addToShopCart'] = true;
        datas['price'] = true;
        break;
      }
      default: break;
    }
  } else if (identify === 'salesman') {
    switch(auditStatus) {
      case 0:
      case 1:
      case 3:
      {
        datas['addToShopCart'] = false;
        datas['price'] = false;
        break;
      }
      case 2:
      {
        datas['addToShopCart'] = false;
        datas['price'] = true;
        break;
      }
      default: break;
    }
  } else if (identify === 'tourist') {
    datas['addToShopCart'] = false;
    datas['price'] = false;
  }
}

module.exports = { getAuthority, updateAuthority }