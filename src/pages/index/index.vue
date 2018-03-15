<template>
  <div class="container">
    <div @click="gotoMovie"
      class="function-block bg-blue">
      <img :src="moviePng">
      <text>电影</text>
    </div>
  </div>
</template>

<script>
const moviePng = require('../../assets/movie.png');

export default {
  data() {
    return {
      moviePng,
    };
  },
  methods: {
    getUserInfo() {
      // 调用登录接口
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: res => {
              this.userInfo = res.userInfo;
            },
          });
        },
        fail: () => {
          wx.showModal({
            title: '出错了',
            content: '微信登录失败，请稍后再试或联系管理员',
            showCancel: false,
          });
        },
      });
    },
    gotoMovie() {
      wx.navigateTo({
        url: '../movie/movie',
      });
    },
  },

  created() {
    // 调用应用实例的方法获取全局数据
    this.getUserInfo();
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding-top: 200rpx;
}

.function-block {
  width: 180rpx;
  height: 180rpx;
  float: left;
  color: white;
  font-size: 14px;
  position: relative;
  border-radius: 8rpx;
}
.function-block text {
  position: absolute;
  right: 10rpx;
  bottom: 20rpx;
}

.function-block img {
  position: absolute;
  left: 0;
  top: 0;
  width: 180rpx;
  height: 180rpx;
}

.function-block:last-child {
  float: right;
}

.bg-blue {
  background-color: lightskyblue;
}

.bg-red {
  background-color: red;
}
</style>
