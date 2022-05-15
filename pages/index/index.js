// index.js
const db=wx.cloud.database()

Page({
  data: {
    swiperList: [],
    noticeArr: [],
    value: 100
  },

  onLoad: function (options) {
    // 轮播图图片获取
    db.collection("indexSwiper").get().then(
      res=> {
        // console.log(this.data.value);
        // console.log(res);
        this.setData({
          swiperList: res.data
        })
      }
    )
      // 通知公告信息获取
    db.collection("notice").get().then(
      res=> {
        // console.log(res);
        this.setData({
          noticeArr: res.data
        })
      }
    )
  },

  

})
