// pages/modifyInfo/modifyInfo.js
const app = getApp()
const db=wx.cloud.database()
let reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tmpLen: 11
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      myname: app.globalData.userInfo.realName,
      myphone: app.globalData.userInfo.userphone,
      mysection: app.globalData.userInfo.usersection,
      myhouse: app.globalData.userInfo.userhouse,
      isAdmin: app.globalData.userInfo.isAdmin
    })
    // console.log(app.globalData);
  },

  onModify: function(e) {
    // console.log(e.detail.cursor);
    // console.log(e.detail.value);
    this.setData({
      tmpValue: e.detail.value,
      tmpLen: e.detail.cursor
    })
  },

  onCertain: function() {
    let that = this
    // 原先号码与提交的号码一致，则不改动
    if(this.data.myphone == this.data.tmpValue) {
      setTimeout(() => {
        wx.showToast({
          title: '前后号码一致',
          icon: 'none',
          duration: 3000
        })
      }, 600);
      wx.navigateBack()
    }else if(!(reg.test(this.data.tmpValue))) {
      wx.showToast({
        title: '此手机号不合法',
        icon: 'error',
        duration: 2000
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '这个新的手机号将是您的登录账户',
        success (res) {
          if (res.confirm) {
            // 是管理员则修改管理员数据库login_admin
            if(that.data.isAdmin) {
              db.collection('login_admin').doc(app.globalData.userInfo.id).update({
                data: {
                  adminPhone: that.data.tmpValue
                },
                success(res) {
                  // console.log(res);
                  app.globalData.userInfo.userphone = that.data.tmpValue
                  setTimeout(() => {
                    wx.showToast({
                      title: '修改成功',
                      icon: 'success',
                      duration: 3000
                    })
                  }, 600);
                  wx.navigateBack()
                }
              })
            } else {
            // 是用户则修改用户的数据库userInfoVer
              db.collection('userInfoVer').doc(app.globalData.userInfo.id).update({
                data: {
                  user_phone: that.data.tmpValue
                },
                success(res) {
                  // console.log(res);
                  app.globalData.userInfo.userphone = that.data.tmpValue
                  setTimeout(() => {
                    wx.showToast({
                      title: '修改成功',
                      icon: 'success',
                      duration: 3000
                    })
                  }, 600);
                  wx.navigateBack()
                }
              })
            }

            // console.log('用户点击确定')
          } else if (res.cancel) {
            // console.log('用户点击取消')
          }
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