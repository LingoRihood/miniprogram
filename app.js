// app.js
App({
  onLaunch() {
    // 云开发初始化
    wx.cloud.init({
      // 如果你的参数包含了对象，就可以使用大括号了，大括号整体是一个参数，是对象类型的。
      env: 'cloud1-8gxo7uj48759cab2',
      traceUser: true
    })

    // 获取用户openid
    let that = this
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login_get_openid',
      success(res) {
        // console.log(res);
        // 将用户的openid添加进全局变量
        that.globalData.openid = res.result.openid
        // console.log(that.globalData);
        // 查看数据库登录用户表里是否有这个用户记录
        wx.cloud.database().collection('login_users').where({
          _openid: res.result.openid
        }).get({
          success(result) {
            // console.log(result);
            that.globalData.userInfo = result.data[0]
          }
        })

      }
    })

  },
  // 全局数据
  globalData: {
    userInfo: null,
    openid: null
  }
})
