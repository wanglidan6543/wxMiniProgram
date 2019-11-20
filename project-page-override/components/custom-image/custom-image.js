//Component Object
const IMGPATH = 'https://fe-ifarm.cpgroupcloud.com/static_resource/cpmart-customer/'
const {GlobalCache} = require('../../GlobalCache');

Component({
  properties: {
    url:{
      type:String,
      value: '',
    },
  },
  data: {
    imageUrl: IMGPATH + 'empty-product-big.png'
  },
  methods: {

  },
  created: function(){

  },
  attached: function(){
    let that = this;
    GlobalCache.addLoadTask(() => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (that.properties.url === undefined || that.properties.url.length === 0) {
            reject();
          } else {
            that.setData({
              imageUrl: that.properties.url
            })
            resolve();
          }
        }, 200);
      })
    });
  }
});