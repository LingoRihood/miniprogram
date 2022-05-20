// pages/myhealthcode/myhealthcode.js
const db=wx.cloud.database()
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 云端上传图片数组
    cloudImgList: [],
    // 暂存图片数组
    tempImgList: [],
    // 用于防止用户暴力点击重复提交
    lock: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  chooseImage: function() {
    let that = this
    wx.chooseImage({
      count: 1 - that.data.tempImgList.length,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // console.log(res);
        // console.log(res.tempFilePaths);
        wx.showLoading({
          title: '上传中',
        })
        that.setData({
          tempImgList: res.tempFilePaths
        })
        setTimeout(function () {
          wx.hideLoading()
        }, 300)
      }
    })
  },

  deleteImg: function(e) {
    this.data.tempImgList.shift()
    this.setData({
      tempImgList: this.data.tempImgList
    })
  }, 

  onSubmit: function() {
    let that = this
    // 解决用户暴力点击重复提交问题
    if(!this.data.lock) {
      that.setData({
        // 上锁
        lock: true
      })
      // 上传到云端数据库
      wx.cloud.uploadFile({
        cloudPath: `healthCodeImgs/${Math.floor(Math.random()*100)}_${Date.now()}.${this.data.tempImgList[0].match(/\.(\w+)$/)[1]}`,
        filePath: this.data.tempImgList[0],
        success(res) {
          // console.log(res);
          // console.log(res.fileID)
          that.data.cloudImgList.push(res.fileID)
          // console.log(that.data.cloudImgList)
          that.setData({
            cloudImgList: that.data.cloudImgList
          })
        }
      })
      // 解决异步问题
      setTimeout(that.onFinalSubmit, 2000)
    }
  },

  onFinalSubmit: function() {
    let that = this
    // console.log(app.globalData.userInfo);
    db.collection('healthCode').add({
      data: {
        userphone: app.globalData.userInfo.userphone,
        realName: app.globalData.userInfo.realName,
        usersection: app.globalData.userInfo.usersection,
        userhouse: app.globalData.userInfo.userhouse,
        healthcodeimg: that.data.cloudImgList[0],
        time: Date.now()
      },
      success(res) {
        wx.navigateBack({
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