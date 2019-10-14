Page({
  data: {
    tips: '请稍后',
    show: true,
    animated: true,
    slideButtons: [{
      text: '普通',
      src: '', // icon的路径
    },{
      text: '普通',
      extClass: 'test',
      src: '', // icon的路径
    },{
      type: 'warn',
      text: '警示',
      extClass: 'test',
      src: '', // icon的路径
    }],
  },
  onShow() {
    this.timer = setInterval(() => {
      this.setData({
        show: !this.data.show
      })
    }, 2000)
  },
  onUnload() {
    clearInterval(this.timer)
  },
  click() {
    console.log('click');
  },
  slideButtonTap() {
    console.log('slideButtonTap');
  }

  // 测试 git 提交命令 1
  // 测试 git 提交命令 2
})