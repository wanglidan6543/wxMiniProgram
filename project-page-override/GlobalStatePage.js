// let result = object.assign({}, data)

// result.onLoad=function(...vals){
//   console.log('log')

//   data.onLoad.call(this,...vals)
// }

function globalPage(Page) {
  const app = getApp();
  let globalData = app.globalData;


  let result = Object.assign({}, Page);

  result.data = Object.assign(Page.data, {
    global: globalData
  })

  result.onLoad = function(...val) {
    console.log('global page onload');
    Page.onLoad.call(this, ...val);
  },

  result.onShow = function(...val) {
    this.setData({
      global: globalData
    })

    console.log('global page onshow');

    Page.onShow.call(this, ...val);
  }

  result.updateGlobalData = function() {
    getApp().globalData = this.data.global;
  }

  console.log(Page);
  console.log(result);

  return result;
}

module.exports.Page = globalPage;

// function global(page){
//     getGlobal = {}

//     let result = obect.assign({})
//     result.data = object.assign(page.data, {
//         global: getGlobal
//     })

//     this.state.global  = ''

//     page.onShow=()=>{
//         this.setState(global, getGlobal )
//     }
//     page.setGlobalState=()=>{

//     }
// }
// global => state 
// page => state

// couter 
// page1 change =>counter   global  data
// page2 onshow  => global => data

// basePage onshow => global => data

// page state this.updateGolbalData


