//index.js
//获取应用实例
const app = getApp()

const sleep = timeountMS => new Promise(resolve => {
  setTimeout(resolve, timeountMS);
});

Page({
  data: {
    isPrecedureShow: false,
    precedureNum: 0,
    hintText1: '您好，欢迎使用',
    hintText1Anim: false,
    hintText2: '请选择想要使用的功能',
    hintText3Anim: false
  },
  onReady: function (e) {
    const _this = this;
    _this.setData({
      isPrecedureShow: true,
      precedureNum: 1
    })
    sleep(1500).then(() => {
      _this.setData({
        hintText1Anim: true
      })
      sleep(1000).then(() => {
        _this.setData({
          precedureNum: 2
        })
        sleep(1500).then(() => {
          _this.setData({
            precedureNum: 3,
            hintText3Anim: true
          })
        })
      })
    })
  },
  gotoMovie: function(e) {
    wx.navigateTo({
      url: '../movie/movie',
    })
  }
})