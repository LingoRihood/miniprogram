// pages/bbs/bbs.js
const app = getApp()
const db = wx.cloud.database()
const timeform = require("../../utils/timeform")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    myopenid: null,
    actionsList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(app.globalData.userInfo);
    // console.log(app.globalData.openid);
    this.setData({
      myopenid: app.globalData.openid
    })
    this.getActionList()
  },

  // 发布模块
  onPublish() {
    // 发布之前必须授权登陆，否则跳到mine的tabbar页面
    if(app.globalData.userInfo == null) {
      wx.switchTab({
        url: '/pages/mine/mine',
      })
      wx.showToast({
        title: '请进行登录授权',
        icon: 'error',
        duration: 2000
      })
    }
    else {
      wx.navigateTo({
        url: '/pages/publish/publish',
      })
    }
  },

  // 跳转到详情页面模块实现
  toDetail: function (event) {
    // console.log(event.currentTarget.dataset.id)
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + event.currentTarget.dataset.id,
    })
  },

  // 删除动态模块
  deleteAction: function (event) {
    let that = this
    // console.log(event.currentTarget.dataset.id)
    // 获取用户删除的帖子id
    let id = event.currentTarget.dataset.id
    db.collection('actions').doc(id).remove({
      success(res) {
        // console.log(res)
        wx.showToast({
          title: '删除成功',
          icon: 'success',
          duration: 1000
        })
        that.getActionList()
      }
    })
  },

  // 获取动态列表
  getActionList() {
    let that = this
    // 降序排列
    db.collection('actions').orderBy('time', 'desc').get({
      success(res) {
        // console.log(res)
        // 格式化时间
        let list = res.data
        for(let i in list) {
          list[i].time = timeform.formatTime(new Date(list[i].time))
        }

        // 用户点赞数据渲染
        // 先遍历每一条帖子
        for(let k in list) {
          for(let j in list[k].likeList) {
            // 用户点过赞
            if(list[k].likeList[j].openid == app.globalData.openid) {
              list[k].isLiked = true
            }
            else {
              list[k].isLiked = false
            }
          }
        }

        // 用户评论数据渲染
        // 先遍历每一条帖子
        for(let k in list) {
          for(let j in list[k].commentList) {
            // 每条评论时间格式化
            list[k].commentList[j].time = timeform.formatTime(new Date(list[k].commentList[j].time))
          }
        }
        that.setData({
          actionsList: list
        })
      }
    })
  },

  // 点赞模块
  likeAction : function(event) {
    let that = this
    // 点赞之前必须授权登陆，否则跳到mine的tabbar页面
    if(app.globalData.userInfo == null) {
      wx.switchTab({
        url: '/pages/mine/mine',
      })
      wx.showToast({
        title: '请进行登录授权',
        icon: 'error',
        duration: 2000
      })
    }
    // 已经授权过那就直接添加进点赞列表里
    else {
      // console.log(event.currentTarget.dataset.id);
      // 获取用户点赞的帖子id
      let id = event.currentTarget.dataset.id
      db.collection('actions').doc(id).get({
        success(res) {
          // console.log(res);
          let action = res.data
          let flag = false
          let index = 0
          
          // 判断当前点赞用户是否曾出现在点赞列表里
          for(let k in action.likeList) {
            if(action.likeList[k].openid == app.globalData.openid) {
              flag = true
              index = k
              break
            }
          }

          if(flag) {
            // 二次点赞 删除点赞用户数据
            action.likeList.splice(index, 1)
            db.collection('actions').doc(id).update({
              data: {
                // 点赞列表更新
                likeList: action.likeList
              },
              success(res) {
                // console.log(res);
                wx.showToast({
                  title: '取消点赞成功',
                  icon: 'success',
                  duration: 1000
                })
                that.getActionList()
              }
            })
            
          }else {
            // 从没点击：添加点赞用户数据

            let user = {}
            user.realName = app.globalData.userInfo.realName
            user.userphone = app.globalData.userInfo.userphone
            user.nickName = app.globalData.userInfo.nickName
            user.faceImg = app.globalData.userInfo.avatarUrl
            user.usersection = app.globalData.userInfo.usersection
            user.userhouse = app.globalData.userInfo.userhouse
            user.openid = app.globalData.openid
            action.likeList.push(user)

            // 数据库中点赞列表数据更新
            db.collection('actions').doc(id).update({
              data: {
                likeList: action.likeList
              },
              success(res) {
                // console.log(res);
                wx.showToast({
                  title: '点赞成功',
                  icon: 'success',
                  duration: 1000
                })
                that.getActionList()
              }
            })
          }
        }
      })
    } 
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
    this.getActionList()
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