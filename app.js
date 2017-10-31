//app.js
App({
  onLaunch: function () {
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      },
      fail: () => {
        wx.showModal({
          title: '出错了',
          content: '微信登录失败，请稍后再试或联系管理员',
          showCancel: false
        })
      }
    })
  },
  globalData: {
    needRefreshList: false,
  }
})