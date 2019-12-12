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
    pageShow: true
  },
  methods: {
    update() {
      
    },
  },
  attached: function () {
    console.log('c2 attached');
    console.log(this.properties.key);
  },
});