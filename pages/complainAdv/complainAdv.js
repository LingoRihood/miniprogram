// pages/complainAdv/complainAdv.js
const db=wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: false,
    // 用于防止用户暴力点击重复提交
    lock: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  getInputValue: function(e) {
    // console.log(e.detail.value);
    this.setData({
      inputValue: e.detail.value
    })
  },

  info1: function(e) {
    // console.log(e);
    // console.log(e.currentTarget.dataset.value);
    // console.log(e.detail.value);
    this.setData({
      // nametitle: e.currentTarget.dataset.value,
      nameValue: e.detail.value
    })
    if(this.data.inputValue != null && this.data.nameValue != null && this.data.phoneValue != null && this.data.sectionValue != null && this.data.houseValue != null) {
      this.setData({
        flag: true
      })
    } else {
      this.setData({
        flag: false
      })
    }
  },

  info2: function(e) {
    // console.log(e);
    // console.log(e.currentTarget.dataset.value);
    // console.log(e.detail.value);
    this.setData({
      // phonetitle: e.currentTarget.dataset.value,
      phoneValue: e.detail.value
    })
    if(this.data.inputValue != null && this.data.nameValue != null && this.data.phoneValue != null && this.data.sectionValue != null && this.data.houseValue != null) {
      this.setData({
        flag: true
      })
    } else {
      this.setData({
        flag: false
      })
    }
  },

  info3: function(e) {
    // console.log(e);
    // console.log(e.currentTarget.dataset.value);
    // console.log(e.detail.value);
    this.setData({
      // sectiontitle: e.currentTarget.dataset.value,
      sectionValue: e.detail.value
    })
    if(this.data.inputValue != null && this.data.nameValue != null && this.data.phoneValue != null && this.data.sectionValue != null && this.data.houseValue != null) {
      this.setData({
        flag: true
      })
    } else {
      this.setData({
        flag: false
      })
    }
  },

  info4: function(e) {
    // console.log(e);
    // console.log(e.currentTarget.dataset.value);
    // console.log(e.detail.value);
    this.setData({
      // housetitle: e.currentTarget.dataset.value,
      houseValue: e.detail.value
    })
    if(this.data.inputValue != null && this.data.nameValue != null && this.data.phoneValue != null && this.data.sectionValue != null && this.data.houseValue != null) {
      this.setData({
        flag: true
      })
    } else {
      this.setData({
        flag: false
      })
    }
  },

  onSubmit: function() {
    
    let that = this
    // 解决用户暴力点击重复提交
    if(!this.data.lock) {
      that.setData({
        // 上锁
        lock: true
      })
      db.collection('complainSug').add({
        data: {
          text: this.data.inputValue,
          // nametitle: this.data.nametitle,
          nameValue: this.data.nameValue,
          // phonetitle: this.data.phonetitle,
          phoneValue: this.data.phoneValue,
          // sectiontitle: this.data.sectiontitle,
          sectionValue: this.data.sectionValue,
          // housetitle: this.data.housetitle,
          houseValue: this.data.houseValue,
          time: Date.now()
        },
        success(res) {
          // console.log(res);
          wx.navigateBack({
            success(result) {
              wx.showToast({
                title: '提交成功',
                icon: 'success',
                duration: 2000
              })
            }
          })
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