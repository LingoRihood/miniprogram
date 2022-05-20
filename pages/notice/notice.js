// pages/notice/notice.js
const db=wx.cloud.database()
const timeform = require("../../utils/timeform")

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
    this.onRefresh()
  },

  onRefresh: function() {
    db.collection('news').orderBy('publishtime', 'desc').get().then(res => {
      // console.log('请求到的数据', res);
      let list = res.data
      for(let i in list) {
        list[i].publishtime = timeform.formatTime(new Date(list[i].publishtime))
      }
      this.setData({
        list: list
      })
    })
  },

  goDetail: function(e) {
    // console.log(e.currentTarget.dataset.id);
    wx.navigateTo({
      url: '/pages/noticenewsdetail/noticenewsdetail?id=' + e.currentTarget.dataset.id,
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
    this.onRefresh()
    setTimeout(wx.stopPullDownRefresh, 600)
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