// pages/contact/contact.js
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
    db.collection('securityGuard').get().then(res => {
      console.log('请求到的数据', res);
      this.setData({
        guardList: res.data
      })
    })
    db.collection('cleaner').get().then(res => {
      console.log('请求到的数据', res);
      this.setData({
        cleanerList: res.data
      })
    })
    db.collection('officeInfo').get().then(res => {
      console.log('请求到的数据', res);
      this.setData({
        officeList: res.data
      })
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