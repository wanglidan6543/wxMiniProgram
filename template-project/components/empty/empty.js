const app = getApp();

Component({
  properties: {
    status: {
      type: String,
      value: ''
    }
  },
  data: {
  },
  methods: {
    catchTouchMove() { return; },

    update() {
      
    },
  },
  attached() { 
    this.update();
  }

})