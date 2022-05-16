// pages/login/login.js
const db=wx.cloud.database()
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: null,
    pwd: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    
  },

  // 得到绑定的手机号
  togetPhonenum: function(event) {
    let that = this
    // console.log(event.detail.value)
    this.setData({
      phone: event.detail.value
    })
    // 验证用户手机号是否与云数据库存储的相吻合
    let phone = this.data.phone
    // console.log(typeof(phone));
    db.collection('userInfoVer').where({
      user_phone: phone
    }).get({
      success(res){
        // console.log(res.data);
        that.setData({
          phonelen: res.data.length
        })
        app.globalData.userDetail = res.data[0]
        // console.log(app.globalData.userDetail);
      }
    })
  },

  // 得到密码即身份证后六位
  togetpwd: function(event) {
    // console.log(event.detail.value)
    this.setData({
      pwd: event.detail.value
    })
  },

  // 登陆功能
  tologin: function() {
    let that = this
    // 输入的手机号数据库中有记录
    if(this.data.phonelen) {
      // console.log(app.globalData.userDetail.user_id_code);

      // 再验证密码是否正确
      if(this.data.pwd == app.globalData.userDetail.userIdCode)
      {
        // 登陆成功
        wx.showToast({
          title: '登录成功',
          icon: 'success',
          duration: 2000
        })

        // 获取微信用户的授权
        wx.getUserProfile({
          desc: '获取用户信息',
          success(res) {
            // console.log(res.userInfo)
            // 得到用户信息对象
            let user = res.userInfo
            let userDetail = app.globalData.userDetail
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
                      nickName: user.nickName,
                      realName: userDetail.user_name,
                      userphone: userDetail.user_phone,
                      usersection: userDetail.user_section,
                      userhouse: userDetail.user_house,
                      isAdmin: userDetail.isAdmin
                    },
                    success(res) {
                      // console.log(res);
                    }
                  })
                }
                else {
                  // 更新用户信息
                  db.collection('login_users').where({
                    _openid: user._openid
                  }).update({
                    data: {
                      realName: userDetail.user_name,
                      userhouse: userDetail.user_house,
                      userphone: userDetail.user_phone,
                      usersection: userDetail.user_section,
                      isAdmin: userDetail.isAdmin
                    },
                    success(result) {
                      // console.log(res);
                    }
                  })
                  // 全局添加用户数据
                  app.globalData.userInfo = res.data[0]
                  app.globalData.userInfo.realName = userDetail.user_name
                  app.globalData.userInfo.userphone = userDetail.user_phone
                  app.globalData.userInfo.userhouse = userDetail.user_house
                  app.globalData.userInfo.usersection = userDetail.user_section
                  app.globalData.userInfo.isAdmin = userDetail.isAdmin
                  // // 页面也添加用户数据
                  // that.setData({
                  //   userInfo: res.data[0]
                  // })
                  // console.log(app.globalData.userInfo);
                }
                
                // 显示授权成功
                wx.showToast({
                  title: '授权成功',
                  icon: 'success',
                  duration: 2000
                })
                wx.navigateBack({
                  delta: 2,
                })
              }
            })
          }
        })
      }else {
        // 密码输入有误
        wx.showToast({
          title: '密码错误',
          icon: 'error',
          duration: 2000
        })
      }
    }else {
      // 手机号输入有误
      wx.showToast({
        title: '手机号不存在',
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