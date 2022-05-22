// pages/detail/detail.js
const timeform = require("../../utils/timeform")
const app = getApp()
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 当前动态的id
    actionid: null,
    // 当前用户的openid
    openid: null,
    // 当前用户的账号
    myPhone: null,
    // 当前用户在评论模块输入的内容
    inputValue: '',
    // 动态的所有数据
    action: {},
    placeholder: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      openid : app.globalData.openid,
      myPhone: app.globalData.userInfo.userphone
    })
    // console.log(app.globalData);
    // console.log(options.id);
    this.data.actionid = options.id
    this.getDetail()
  },

  // 页面刷新
  getDetail() {
    // 从云数据库获得id所属的数据集合
    let that = this
    wx.cloud.database().collection('actions').doc(that.data.actionid).get({
      success(res) {
        // console.log(res);
        let tmpdata = res.data

        // 格式化时间
        tmpdata.time = timeform.formatTime(new Date(tmpdata.time))

        // 用户点赞与取消点赞的渲染
        for(let k in tmpdata.likeList) {
          // 用户点过赞
          if(tmpdata.likeList[k].userphone == app.globalData.userInfo.userphone) {
            tmpdata.isLiked = true
          }
        }

        // 用户评论的时间数据格式化
        for(let k in tmpdata.commentList) {
          tmpdata.commentList[k].time = timeform.formatTime(new Date(tmpdata.commentList[k].time))
        }

        that.setData({
          action: tmpdata
        })
      }
    })
  },

  // 删除动态模块
  delete: function() {
    // console.log(this.data.actionid);
    wx.cloud.database().collection('actions').doc(this.data.actionid).remove({
      success(res) {
        // console.log(res)
        wx.navigateBack({
          success(res) {
            wx.showToast({
              title: '删除成功',
              icon: 'success',
              duration: 1000
            })
          }
        })
      }
    })
  },

  // 点赞模块
  likeAction : function(event) {
    let that = this
    
    // console.log(this.data.actionid);
    let id = this.data.actionid
    db.collection('actions').doc(id).get({
      success(res) {
        // console.log(res);
        let action = res.data
        let flag = false
        let index = 0
        
        // 判断当前点赞用户是否曾出现在点赞列表里
        for(let k in action.likeList) {
          if(action.likeList[k].userphone == app.globalData.userInfo.userphone) {
            flag = true
            index = k
            break
          }
        }
        // console.log(flag);
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
              that.getDetail()
            }
          })
          
        }else {
          // 从没点击则添加点赞用户数据
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
              that.getDetail()
            }
          })
        }
      }
    })
  
  },

  // 获取当前评论内容
  getInputValue: function(event) {
    // console.log(event.detail.value);
    this.data.inputValue = event.detail.value
  },

  // 评论提交
  publishComment: function() {
    let that = this
    
    // 如果用户输入的评论内容为空则不允许发送
    if(this.data.inputValue.trim() == '') {
      wx.showToast({
        title: '内容不能为空',
        icon: 'error',
        duration: 2000
      })
    }
    // 用户输入的评论内容不为空则允许发送
    else {
      let id = this.data.actionid
      db.collection('actions').doc(id).get({
        success(res) {
          // console.log(res.data)
          let tmpdata = res.data
          let comment = {}
          comment.nickName = app.globalData.userInfo.nickName
          comment.realName = app.globalData.userInfo.realName
          comment.userphone = app.globalData.userInfo.userphone
          comment.usersection = app.globalData.userInfo.usersection
          comment.userhouse = app.globalData.userInfo.userhouse
          comment.faceImg = app.globalData.userInfo.avatarUrl
          comment.openid = app.globalData.openid
          comment.text = that.data.inputValue
          comment.time = Date.now()
          // 回复评论对象
          comment.toOpenid = that.data.toOpenid
          comment.toNickName = that.data.toNickName
          comment.toPhone = that.data.toPhone
            
          tmpdata.commentList.push(comment)
            // 数据库中评论列表数据更新
            db.collection('actions').doc(id).update({
              data: {
                commentList: tmpdata.commentList
              },
              success(res) {
                // console.log(res);
                wx.showToast({
                  title: '评论成功',
                  icon: 'success',
                  duration: 1000
                })
                that.getDetail()
                that.setData({
                  inputValue: '',
                  placeholder: '请输入你的评论'
                })
              }
            })
        }
      })
    }
  },

  // 删除评论
  deleteComment: function(e) {
    let that = this
    // console.log(e.currentTarget.dataset.index);
    let index = e.currentTarget.dataset.index

    wx.showModal({
      title: '提示',
      content: '确定要删除此评论吗',
      success(res) {
        if(res.confirm) {
          db.collection('actions').doc(that.data.actionid).get({
            success(res) {
              // console.log(res);
              let action = res.data
              
              action.commentList.splice(index, 1)
              db.collection('actions').doc(that.data.actionid).update({
                data: {
                  commentList: action.commentList
                },
                success(res) {
                  // console.log(res);
                  wx.showToast({
                    title: '删除评论成功',
                    icon: 'success',
                    duration: 1000
                  })
                  that.getDetail()
                }
              })
            }
          })
        }else if (res.cancel) {
          
        }
      }
    })
  },

  // 回复用户
  onReply: function(e) {
    let index = e.currentTarget.dataset.index
    this.setData({
      placeholder: '回复' + this.data.action.commentList[index].nickName,
      toOpenid: this.data.action.commentList[index].openid,
      toNickName: this.data.action.commentList[index].nickName,
      toPhone: this.data.action.commentList[index].userphone
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
    this.getDetail()
    this.setData({
      openid : app.globalData.openid,
      myPhone: app.globalData.userInfo.userphone,
      placeholder: '请输入你的评论'
    })
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