//index.js
//获取应用实例
const app = getApp()

const sleep = timeountMS => new Promise(resolve => {
  setTimeout(resolve, timeountMS);
});

const getMoviewUrl = 'https://api.douban.com/v2/movie/in_theaters?city=南京'

const loadMovies = function() {
  const _this = this;
  if (_this.data.subjects.length != 0 
    && _this.data.subjects.length >= _this.data.total) return
  wx.showLoading({
    title: '加载中...',
  })
  wx.request({
    url: getMoviewUrl,
    data: {
      start: _this.data.subjects.length
    },
    header: {
      'Content-Type': 'json'
    },
    success: ({ data }) => {
      wx.hideLoading()
      wx.setNavigationBarTitle({
        title: data.title,
      })
      data.subjects.forEach(i => {
        i.tags = i.genres.join(' ')
        i.mainCasts = i.casts.map(i => i.name).join('/')
      })
      _this.setData({
        count: data.count,
        subjects: _this.data.subjects.concat(data.subjects),
        total: data.total
      })
    },
    fail: () => {
      wx.hideLoading()
      wx.showModal({
        title: '失败了',
        content: '获取数据失败，请稍后再试',
        showCancel: false
      })
    }
  })
};

Page({
  data: {
    count: 0,
    subjects: [],
    total: 0
  },
  onReady: function (e) {
    loadMovies.call(this)
  },
  onReachBottom: function () {
    loadMovies.call(this)
  },
  clickMovie: function (e) {
    const postUrl = this.data.subjects.filter(i => i.id == e.currentTarget.dataset.id)[0].images.large
    wx.previewImage({
      urls: [postUrl],
    })
  }
})