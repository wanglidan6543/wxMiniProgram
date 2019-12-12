//Component Object
const { getAuthority } = require('../../authority');

Component({
  properties: {
    key: {
      type: String,
      value: ''
    },
    isHidden: {
      type: Boolean,
      value: false
    }
  },
  data: {
    pageShow: true,
    HH: ''
  },
  methods: {
    update() {
      console.log(this.properties.key);
      console.log(this.data.HH);
    },
  },
  attached: function () {
    console.log('c1 attached');
    console.log(this.properties.key);
    this.setData({
      HH: 'HHH'
    })
  }
});