// pages/mine/mine.js
// 用于获取全局内容
const app = getApp()
const db=wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(app.globalData);

    this.setData({
      // cnt: true,
      userInfo: app.globalData.userInfo,
      isAdmin: app.globalData.userInfo.isAdmin
    })
  },

  // 权限登录
  permissionLogin: function() {
    wx.navigateTo({
      url: '/pages/permissiondiv/permissiondiv',
    })
  }, 

  // 进入我的账户信息查看
  myaccount: function() {
    // 进入我的账户之前必须授权登陆，否则提醒授权登录
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
      url: '/pages/myaccount/myaccount',
      })
    }
  },

  // 上传行动轨迹
  mytrack: function() {
    // 在上传行动轨迹之前必须授权登陆，否则提醒授权登录
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
      url: '/pages/mytrack/mytrack',
      })
    }
  },

  // 上传体温信息
  mytemperature: function() {
    // 在上传体温信息之前必须授权登陆，否则提醒授权登录
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
      setTimeout(() => {
        wx.showToast({
          title: '请先填写姓名，填完一项接下来的问题也会出来',
          icon: 'none',
          duration: 5000
        })
      }, 600);
      wx.navigateTo({
      url: '/pages/mytemper/mytemper',
      })
    }
  },

  // 健康码上传
  onHealthCode: function() {
    // 在进入健康码上传模块之前必须授权登陆，否则提醒授权登录
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
      url: '/pages/myhealthcode/myhealthcode',
      })
    }
  },

  // 行程码上传
  onTravelCode: function() {
    // 在进入行程码上传模块之前必须授权登陆，否则提醒授权登录
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
      url: '/pages/mytravelcode/mytravelcode',
      })
    }
  },

  // 志愿者申请模块
  onVolunteer: function() {
    // 在进入志愿者申请模块之前必须授权登陆，否则提醒授权登录
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
      url: '/pages/volunteer/volunteer',
      })
    }
  },

  // 智慧党建模块
  partyBuild: function() {
    // 在进入智慧党建模块之前必须授权登陆，否则提醒授权登录
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
      url: '/pages/partyb/partyb',
      })
    }
  },

  // 投诉建议模块
  complainAdv: function() {
    // 在进入投诉建议模块之前必须授权登陆，否则提醒授权登录
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
      url: '/pages/complainAdv/complainAdv',
      })
    }
  },

  // 消息提醒授权
  msgNotice: function() {
    
    wx.requestSubscribeMessage({
      tmplIds: ['Nfj2O2TdlFeLrRd5fL6u8Qo1TRsf2_jM2beOcE8GDwM'],
      success(res) {
        console.log('授权成功', res);
      },
      fail(res) {
        console.log('授权失败', res);
      }
    })
  },

  sendNotice: function(){
    let that = this
    let arr = []
    db.collection('login_users').get({
      success(res) {
        // console.log(res.data);
        arr = res.data
        arr.forEach((value, index) => {
          // console.log(value._openid);
          // console.log(value.realName);
          // console.log(index);
          that.sendAll(value._openid, value.realName)
        })
      }
    })
  },

  sendAll: function(openid, realName) {
    let tmp = new Date().toLocaleDateString()
    tmp = tmp.split('')
    tmp[4] = '年'
    tmp[6] = '月'
    tmp[9] = '日'
    tmp[10] = ' '
    // console.log(tmp);
    tmp = tmp.join('')
    console.log(tmp);
    // console.log(typeof tmp);
    tmp = tmp + new Date().getHours() + ':' + new Date().getMinutes()
    // console.log(tmp);

    wx.cloud.callFunction({
      name: "sendmsg",
      data: {
        openid: openid,
        name: realName,
        time: tmp
      }
    }).then(res => {
      console.log("发送单条成功", res);
    }).catch(res => {
      console.log("发送单条失败", res);
    })
  },

  // 退出登录
  logout: function () {
    app.globalData.userInfo = null
    this.setData({
      userInfo: null
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      // 更新用户信息
      userInfo: app.globalData.userInfo
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // this.getUserInfo()
    // setTimeout(wx.stopPullDownRefresh, 600)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})