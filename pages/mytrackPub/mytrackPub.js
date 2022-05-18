// pages/mytrackPub/mytrackPub.js
const app = getApp()
const db=wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 用户输入的行程轨迹内容
    inputValue: null,
    // 用于防止用户暴力点击重复提交
    lock: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // console.log(app.globalData.userInfo)
  },

  // 得到用户输入的内容
  getValue: function(e) {
    // console.log(e.detail.value)
    this.setData({
      inputValue: e.detail.value
    })
  },

  // 用户行动轨迹上传提交按钮
  submitData: function() {
    let that = this
    if(!this.data.lock) {
      that.setData({
        lock: true
      })
      db.collection('trackInfo').add({
        data: {
          realName: app.globalData.userInfo.realName,
          phone: app.globalData.userInfo.userphone,
          section: app.globalData.userInfo.usersection,
          house: app.globalData.userInfo.userhouse,
          time: Date.now(),
          text: that.data.inputValue
        },
        success(res) {
          // console.log(res)
          wx.navigateBack({
            delta: 1,
            success(result) {
              wx.showToast({
                title: '上传成功',
                icon: 'success',
                duration: 2000
              })
            }
          })
        }
      })
    }
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