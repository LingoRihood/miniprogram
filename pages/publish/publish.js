// pages/publish/publish.js
const app = getApp()
const db=wx.cloud.database()
 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue: null,
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

  // 获取用户输入的内容
  getValue: function(e) {
    // console.log(e.detail.value)
    this.setData({
      inputValue: e.detail.value
    })
  },

  // 将用户所选的照片暂存在一个数组里
  chooseImage: function() {
    let that = this
    wx.chooseImage({
      count: 9 - that.data.tempImgList.length,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // console.log(res);
        // console.log(res.tempFilePaths);
        wx.showLoading({
          title: '上传中',
        })
        that.setData({
          tempImgList: that.data.tempImgList.concat(res.tempFilePaths)
        })
        setTimeout(function () {
          wx.hideLoading()
        }, 300)
      }
    })
  },

  // 发布帖子功能
  submitData() {
    let that = this
    // 解决用户暴力点击重复提交问题
    if(!this.data.lock) {
      that.setData({
        // 上锁
        lock: true
      })
      for(let i = 0; i < this.data.tempImgList.length; i++) {
        // 上传到云端数据库
        wx.cloud.uploadFile({
          cloudPath: `publishImages/${Math.floor(Math.random()*100)}_${Date.now()}.${this.data.tempImgList[i].match(/\.(\w+)$/)[1]}`,
          filePath: this.data.tempImgList[i],
          success(res) {
            // console.log(res.fileID)
            that.data.cloudImgList.push(res.fileID)
            // console.log(that.data.cloudImgList)
            that.setData({
              cloudImgList: that.data.cloudImgList
            })
          }
        })
      }
      // 解决异步问题
      setTimeout(that.submitToDB, 2000)
    }
    
  },

  // 将用户删除的照片从暂存图片数组里删去
  deleteImg: function(e) {
    // console.log(e.currentTarget.dataset.index);
    let index = e.currentTarget.dataset.index
    this.data.tempImgList.splice(index, 1)
    this.setData({
      tempImgList: this.data.tempImgList
    })
  }, 

  // 上传到发布动态的数据集合actions中
  submitToDB: function() {
    db.collection('actions').add({
      data: {
        realName: app.globalData.userInfo.realName,
        phone: app.globalData.userInfo.userphone,
        usersection: app.globalData.userInfo.usersection,
        userhouse: app.globalData.userInfo.userhouse,
        faceImg: app.globalData.userInfo.avatarUrl,
        text: this.data.inputValue,
        images: this.data.cloudImgList,
        time: Date.now(),
        // 点赞用户信息数组
        likeList: [],
        // 动态下方评论信息数组
        commentList: []
      },
      success(res) { 
        // console.log(res);
        // console.log(that.data.cloudImgList);
        wx.navigateBack({
          success(result) {
            wx.showToast({
              title: '发布成功',
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