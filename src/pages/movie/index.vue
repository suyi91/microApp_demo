<template>
  <div class="container">
    <picker @change="cityChanged" :value="cityIndex" :range="cityArray">
      <button v-if="!loading" class="switch-btn">切换城市</button>
    </picker>
    <div class="movie-item"
      v-for="(item, index) in subjects" :key="index" :data-id="item.id" @click="clickMovie(item)">
      <img class="image" :src="item.images.small">
      <view class="detail">
        <view class="row">
          <text class="name">{{item.title}}</text>
          <text class="tags">{{item.tags}}</text>
        </view>
        <view class="row">
          <text>评分: {{ item.rating.average }}/{{ item.rating.max }}</text>
        </view>
        <view class="row">
          <text>主演: {{item.mainCasts}}</text>
        </view>
      </view>
    </div>
    <view class="footer"><text>小程序由Sean®所做，侵删</text></view>
  </div>
</template>
<script>
const COMMON_CITY_LIST = [
  '北京',
  '上海',
  '广州',
  '深圳',
  '南京',
  '天津',
  '重庆',
  '石家庄',
  '郑州',
  '武汉',
  '长沙',
  '南昌',
  '沈阳',
  '长春',
  '哈尔滨',
  '西安',
  '太原',
  '济南',
  '成都',
  '西宁',
  '合肥',
  '海口',
  '贵阳',
  '杭州',
  '福州',
  '兰州',
  '昆明',
  '拉萨',
  '银川',
  '南宁',
  '乌鲁木齐',
];

const getMoviewUrl = 'https://zhangaoo.com/v2/movie/in_theaters'; // 豆瓣API 403

export default {
  data() {
    return {
      loading: false,
      count: 0,
      subjects: [],
      total: 0,
      cityIndex: 0,
      cityArray: COMMON_CITY_LIST,
    };
  },
  mounted() {
    this.loadMovies();
  },
  onReachBottom() {
    this.loadMovies();
  },
  methods: {
    loadMovies() {
      if (this.subjects.length !== 0 && this.subjects.length >= this.total) return;
      wx.showLoading({
        title: '加载中...',
      });
      this.loading = true;
      wx.request({
        url: getMoviewUrl,
        data: {
          city: this.cityArray[this.cityIndex],
          start: this.subjects.length,
        },
        header: {
          'Content-Type': 'json',
        },
        success: ({ data }) => {
          wx.hideLoading();
          wx.setNavigationBarTitle({
            title: data.title,
          });
          const subjects = data.subjects.map(i => ({
            ...i,
            tags: i.genres.join(' '),
            mainCasts: i.casts.map(({ name }) => name).join('/'),
          }));
          this.count = data.count;
          this.subjects = [...this.subjects, ...subjects];
          this.total = data.total;
          this.loading = false;
        },
        fail: () => {
          wx.hideLoading();
          this.loading = false;
          wx.showModal({
            title: '失败了',
            content: '获取数据失败，请稍后再试',
            showCancel: false,
          });
        },
      });
    },
    clickMovie(item) {
      wx.previewImage({
        urls: [item.images.large],
      });
    },
    cityChanged(e) {
      const index = Number(e.target.value);
      if (index !== this.cityIndex) {
        this.subjects = [];
        this.cityIndex = Number(e.target.value);
        this.loadMovies();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  padding: 20rpx 20rpx 60rpx;
  display: block;
  position: relative;
}

.movie-item {
  padding: 15rpx 0;
  border-bottom: 1px solid lightgoldenrodyellow;
  display: flex;
  font-size: 12px;
  color: darkgray;
  .image {
    width: 120rpx;
    height: 160rpx;
    margin: 0 20rpx 0 0;
  }
  .name {
    color: black;
    font-size: 16px;
  }
  .tags {
    position: absolute;
    right: 0;
    top: 0;
  }
  .detail {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
}
.detail .row {
  flex: 1;
  position: relative;
  vertical-align: middle;
  width: 100%;
}

.footer {
  position: absolute;
  box-sizing: border-box;
  height: 60rpx;
  bottom: 0;
  left: 0;
  right: 0;
  font-size: 12px;
  color: lightgray;
  text-align: center;
  padding-top: 15rpx;
}

.switch-btn {
  position: fixed;
  display: inline-block;
  bottom: 20px;
  right: 20px;
  z-index:100;
}
</style>
