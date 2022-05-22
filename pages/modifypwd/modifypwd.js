// pages/modifypwd/modifypwd.js
const db=wx.cloud.database()
const app = getApp()

let reg = /^[0-9]\w{5,17}$/

Page({

  /**
   * 页面的初始数据
   */
  data: {
    rawflag : false,
    rawflagerr : false,
    newflag : false,
    newflagerr : false,
    confirm : false,
    confirmerr : false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // console.log(app.globalData.userInfo);
  },

  onrawPwd: function(e) {
    // console.log(e.detail.value);
    this.setData({
      rawPwd : e.detail.value
    })
  },

  onnewPwd: function(e) {
    // console.log(e.detail.value);
    this.setData({
      newPwd : e.detail.value
    })
  },

  onRaw: function(e) {
    let that = this
    // console.log(e.detail.value);
    // 是管理员则去login_admin数据库查
    if(app.globalData.userInfo.isAdmin) {
      db.collection('login_admin').doc(app.globalData.userInfo.id).get({
        success(res) {
          // console.log(res.data.adminPwd);
          that.setData({
            pwd: res.data.adminPwd
          })
          if(that.data.rawPwd == res.data.adminPwd) {
            that.setData({
              rawflag: true,
              rawflagerr: false
            })
          } else {
            that.setData({
              rawflagerr: true,
              rawflag: false
            })
          }
        }
      })
    }else {
      // 是住户则去userInfoVer数据库查
      db.collection('userInfoVer').doc(app.globalData.userInfo.id).get({
        success(res) {
          // console.log(res.data.userIdCode);
          that.setData({
            pwd: res.data.userIdCode
          })
          if(that.data.rawPwd == res.data.userIdCode) {
            that.setData({
              rawflag: true,
              rawflagerr: false
            })
          }else {
            that.setData({
              rawflagerr: true,
              rawflag: false
            })
          }
        }
      })
    }
  },

  onNew: function(e) {
    // console.log(e.detail.value);
    // 保证新密码与原始密码不一样
    if(!(reg.test(this.data.newPwd)) || (this.data.pwd == this.data.newPwd)) {
      this.setData({
        newflag: false,
        newflagerr: true
      })
    }else {
      this.setData({
        newflag: true,
        newflagerr: false
      })
    }
    if(this.data.newPwd != this.data.connewPwd && (this.data.confirm)) {
      this.setData({
        confirm: false,
        confirmerr: true
      })
    }
  },

  onconfirmPwd: function(e) {
    this.setData({
      connewPwd : e.detail.value
    })
    if(this.data.connewPwd == this.data.newPwd) {
      this.setData({
        confirm: true,
        confirmerr: false
      })
    }
    else {
      this.setData({
        confirm: false,
        confirmerr: true
      })
    }
  },

  onConfirm: function(e) {
    // console.log(e);
    if(this.data.connewPwd == this.data.newPwd) {
      this.setData({
        confirm: true,
        confirmerr: false
      })
    }
    else {
      this.setData({
        confirm: false,
        confirmerr: true
      })
    }
  },

  submit: function() {
    let that = this
    if(this.data.rawflag == true && this.data.newflag == true && this.data.confirm == true) {
      // 如果是管理员则修改login_admin数据库密码
      if(app.globalData.userInfo.isAdmin) {
        db.collection('login_admin').doc(app.globalData.userInfo.id).update({
          data: {
            adminPwd: that.data.connewPwd
          },
          success(res) {
            // console.log(res);
            wx.showToast({
              title: '修改成功',
              icon: 'success',
              duration: 3000
            })
            setTimeout(() => {
              wx.navigateBack()
            }, 1000);
          }
        })
      }else {
        // 如果是住户则修改userInfoVer数据库密码
        db.collection('userInfoVer').doc(app.globalData.userInfo.id).update({
          data: {
            userIdCode: that.data.connewPwd
          },
          success(res) {
            // console.log(res);
            
            wx.showToast({
              title: '修改成功',
              icon: 'success',
              duration: 3000
            })
            setTimeout(() => {
              wx.navigateBack()
            }, 1000);
            
          }
        })
      }
    }else {
      wx.showToast({
        title: '请正确填写信息',
        icon: 'error',
        duration: 2000
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