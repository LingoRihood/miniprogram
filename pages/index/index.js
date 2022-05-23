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

  // 物业缴费模块
  communityPay: function() {
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
        url: '/pages/communityCost/communityCost',
      })
    }
  },

  // 停车场服务模块
  parkingCosts: function() {
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
        url: '/pages/parkingService/parkingService',
      })
    }
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

  // 防疫全家桶模块
  tools: function() {
    // 不需要用户授权登录
    wx.navigateTo({
      url: '/pages/protectTools/protectTools',
    })
  },

  // 报事报修板块
  repair: function() {
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
        url: '/pages/myrepair/myrepair',
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
