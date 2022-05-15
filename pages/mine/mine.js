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
    // console.log(app.globalData.userInfo);
    this.setData({
      userInfo: app.globalData.userInfo
    })
  },

  // 获取用户信息
  login: function() {
    let that = this
    wx.getUserProfile({
      desc: '获取用户信息',
      success(res) {
        // console.log(res.userInfo)
        // 得到用户信息对象
        let user = res.userInfo
        // 全局用户信息设定
        app.globalData.userInfo = user
        // 设置页面的data信息，userInfo承接用户信息
        that.setData({
          userInfo: user
        })

        // 检查之前是否已经授权登录注册成功了
        db.collection('login_users').where({
          _openid: app.globalData.openid
        }).get({
          success(res) {
            // console.log(res);
            if(res.data.length == 0) {
               // 添加用户数据表到数据库
              db.collection('login_users').add({
                data: {
                  num: Date.now() + Math.floor(Math.random()*100),
                  avatarUrl: user.avatarUrl,
                  nickName: user.nickName
                },
                success(res) {
                  // console.log(res);
                }
              })
            }
            else {
              // 更新用户信息
              // 全局添加用户数据
              app.globalData.userInfo = res.data[0]
              // 页面也添加用户数据
              that.setData({
                userInfo: res.data[0]
              })
            }
            // 显示登录成功
            wx.showToast({
              title: '登录成功',
              icon: 'success',
              duration: 2000
            })
          }
        })

      }
    })
  },

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