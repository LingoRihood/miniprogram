// index.js
const db=wx.cloud.database()
const app = getApp()

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

  // 智慧门禁模块
  guard: function() {
    // 进入板块之前必须授权登陆，否则跳到mine的tabbar页面
    if(app.globalData.userInfo == null) {
      wx.switchTab({
        url: '/pages/mine/mine',
      })
      wx.showToast({
        title: '请进行登录授权',
        icon: 'error',
        duration: 2000
      })
    }
    else {
      wx.navigateTo({
        url: '/pages/security/security',
      })
    }
  },

  // 联系物业板块
  contact: function() {
    // 进入板块之前必须授权登陆，否则跳到mine的tabbar页面
    if(app.globalData.userInfo == null) {
      wx.switchTab({
        url: '/pages/mine/mine',
      })
      wx.showToast({
        title: '请进行登录授权',
        icon: 'error',
        duration: 2000
      })
    }
    else {
      wx.navigateTo({
        url: '/pages/contact/contact',
      })
    }
  },

  // 问卷调查模块
  questionnaire: function() {
    // 进入板块之前必须授权登陆，否则跳到mine的tabbar页面
    if(app.globalData.userInfo == null) {
      wx.switchTab({
        url: '/pages/mine/mine',
      })
      wx.showToast({
        title: '请进行登录授权',
        icon: 'error',
        duration: 2000
      })
    }
    else {
      wx.navigateTo({
        url: '/pages/questionnaire/questionnaire',
      })
    }
  },
  
  // 民主投票板块
  vote: function() {
    // 进入板块之前必须授权登陆，否则跳到mine的tabbar页面
    if(app.globalData.userInfo == null) {
      wx.switchTab({
        url: '/pages/mine/mine',
      })
      wx.showToast({
        title: '请进行登录授权',
        icon: 'error',
        duration: 2000
      })
    }
    else {
      wx.navigateTo({
        url: '/pages/vote/vote',
      })
    }
  }

})
