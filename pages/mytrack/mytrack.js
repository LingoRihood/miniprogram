// pages/mytrack/mytrack.js
const app = getApp()
const db = wx.cloud.database()
const timeform = require("../../utils/timeform")

Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    trackList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // console.log(app.globalData.openid);
    this.getTrackList()
  },

  // 转到上传行程轨迹页面
  onUpload: function () {
    wx.navigateTo({
      url: '/pages/mytrackPub/mytrackPub',
    })
  },

  // 获取行程轨迹列表
  getTrackList() {
    let that = this
    // 降序排列
    db.collection('trackInfo').orderBy('time', 'desc').where({
      phone: app.globalData.userInfo.userphone
    }).get({
      success(res) {
        console.log(res)
        let list = res.data
        // 格式化时间
        for(let k in list) {
          list[k].time = timeform.formatTime(new Date(list[k].time))
        }
        that.setData({
        trackList: list
        })
      }
    })
  },

  deleteTrack: function(event) {
    let that = this
    // console.log(event.currentTarget.dataset.id);
    let id = event.currentTarget.dataset.id
    db.collection('trackInfo').doc(id).remove({
      success(res) {
        wx.showToast({
          title: '删除成功',
          icon: 'success',
          duration: 1000
        })
        that.getTrackList()
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
    this.getTrackList()
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
    this.getTrackList()
    setTimeout(wx.stopPullDownRefresh, 600)
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