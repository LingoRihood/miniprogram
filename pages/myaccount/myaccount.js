// pages/myaccount/myaccount.js
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
  onLoad(options) {
    // console.log(app.globalData);
    this.setData({
      myname: app.globalData.userInfo.realName,
      myphone: app.globalData.userInfo.userphone,
      mysection: app.globalData.userInfo.usersection,
      myhouse: app.globalData.userInfo.userhouse,
      isAdmin: app.globalData.userInfo.isAdmin
    })
  },

  // 修改个人信息
  onModifyInfo: function() {
    setTimeout(() => {
      wx.showToast({
        title: '只能修改电话',
        icon: 'none',
        duration: 6000
      })
    }, 1000);
    wx.navigateTo({
      url: '/pages/modifyInfo/modifyInfo',
    })
  },

  // 修改密码
  onModifypwd: function() {
    wx.navigateTo({
      url: '/pages/modifypwd/modifypwd',
    })
  },

  // 刷新修改后的页面数据
  refreshData: function() {
    db.collection('login_users').where({
      id: app.globalData.userInfo.id
    }).update({
      data: {
        userphone: app.globalData.userInfo.userphone
      },success(res) {
        // console.log(res);
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    // console.log(app.globalData.userInfo);
    this.refreshData()
    this.setData({
      myphone: app.globalData.userInfo.userphone
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})