const ImageLoadQueue = {
  taskList: [],
  runTaskCount: 0,

  addLoadTask(task) {
    if (this.runTaskCount < 10) {
      this.loadTask(task);
    } else {
      this.taskList.push(task);
    }
  },

  loadTask(task) {
    if (!task && this.taskList.length === 0) { return; }

    this.runTaskCount++;
    task = task || this.taskList.shift();
    let result = task();
    if (result instanceof Promise) {
      result.then(() => {
        this.onLoad();
      }, () => {
        this.onLoad();
      })
    } else {
      this.onLoad();
    }
  },

  onLoad() {
    this.runTaskCount--;
    this.loadTask();
  },

  clear() {
    this.taskList = [];
    this.runTaskCount = 0;
  }
}

module.exports.ImageLoadQueue = ImageLoadQueue;