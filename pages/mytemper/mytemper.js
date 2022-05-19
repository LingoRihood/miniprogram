// pages/mytemper/mytemper.js
const app = getApp()
const db=wx.cloud.database()

const tmpQ = {
  questions:[
    {
      id: 1,
      title:"姓名",
      question_type: 'input',
      input_type: 'text'
    },
    {
      id: 2,
      title: "性别",
      question_type: 'radio',
      options: [
        {
          option_id: 'A',
          option_value: '男'
        },
        {
          option_id: 'B',
          option_value: '女'
        }
      ]
    },
    {
      id: 3,
      title:"体温（单位默认摄氏度°C）­",
      question_type: 'input',
      input_type: 'digit'
    },
    {
      id: 4,
      title:"所在单元",
      question_type: 'input',
      input_type: 'number'
    },
    {
      id: 5,
      title:"所在房号",
      question_type: 'input',
      input_type: 'number'
    },
    {
      id: 6,
      title:"身体不适情况",
      question_type: 'checkbox',
      options: [
        {
          option_id: 'A',
          option_value: '无'
        },
        {
          option_id: 'B',
          option_value: '发热'
        },
        {
          option_id: 'C',
          option_value: '腹泻'
        },
        {
          option_id: 'D',
          option_value: '呕吐'
        },
        {
          option_id: 'E',
          option_value: '头痛'
        },
        {
          option_id: 'F',
          option_value: '胸闷'
        },
        {
          option_id: 'G',
          option_value: '咳嗽'
        },
        {
          option_id: 'H',
          option_value: '乏力'
        },
        {
          option_id: 'I',
          option_value: '其他'
        }
      ]
    }
  ]
}

let cnt = 1

Page({

  /**
   * 页面的初始数据
   */
  data: {
    questions: tmpQ.questions,
    answers: [],
    gender: false,
    temp: false,
    section: false,
    house: false,
    situation: false,
    sub: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  onInput: function(event) {
    console.log(event);
    // console.log(event.currentTarget.dataset.qid);
    let qid = event.currentTarget.dataset.qid
    let title = event.currentTarget.dataset.value
    let text = event.detail.value
    let newAnswer = {
      "id": qid,
      "qtitle": title,
      "text": text
    }
    this.addAnswer(newAnswer)
    if(event.currentTarget.dataset.qid == 1) {
      this.setData({
        gender: true,
      })
    }
    else if(event.currentTarget.dataset.qid == 2) {
      this.setData({
        temp: true,
      })
    } else if(event.currentTarget.dataset.qid == 3) {
      this.setData({
        section: true,
      })
    } else if(event.currentTarget.dataset.qid == 4) {
      this.setData({
        house: true,
      })
    } else if(event.currentTarget.dataset.qid == 5) {
      this.setData({
        situation: true,
      })
    }
    
  },

  onRadioChange: function(event) {
    // console.log(event);
    let qid = event.currentTarget.dataset.qid
    let title = event.currentTarget.dataset.value
    let text = event.detail.value
    let newAnswer = {
      "id": qid,
      "qtitle": title,
      "text": text
    }
    this.addAnswer(newAnswer)
    if(event.currentTarget.dataset.qid == 1) {
      this.setData({
        gender: true,
      })
    }
    else if(event.currentTarget.dataset.qid == 2) {
      this.setData({
        temp: true,
      })
    } else if(event.currentTarget.dataset.qid == 3) {
      this.setData({
        section: true,
      })
    } else if(event.currentTarget.dataset.qid == 4) {
      this.setData({
        house: true,
      })
    } else if(event.currentTarget.dataset.qid == 5) {
      this.setData({
        situation: true,
      })
    }
  },

  onCheckboxChange: function(event) {
    console.log(event);
    let qid = event.currentTarget.dataset.qid
    let title = event.currentTarget.dataset.value
    let arrSelected = event.detail.value
    let newAnswer = {
      "id": qid,
      "qtitle": title,
      "text": arrSelected
    }
    let flag = true
    if(arrSelected.length == 0) {
      flag = false
    }
    this.addAnswer(newAnswer)
    if(event.currentTarget.dataset.qid == 6 && flag == true) {
      this.setData({
        sub: true
      })
    } else {
      this.setData({
        sub: false
      })
    }
  },

  addAnswer: function(newAnswer) {
    let tmpAnswers = this.data.answers;
    const foundIndex = tmpAnswers.findIndex((item) => {
      return item.id == newAnswer.id;
    });

    if (foundIndex !== -1) {
      tmpAnswers.splice(foundIndex, 1, newAnswer);
    } else {
      tmpAnswers = [...tmpAnswers, newAnswer];
    }

    this.setData({
      answers: tmpAnswers,
    })
  },

  onSubmit: function() {
    let id = app.globalData.userInfo.userphone
    // console.log(id);

    let objAnswer = {
      id: id,
      answers: this.data.answers
    }
    db.collection('temperInfo').doc(id).set({
      data: objAnswer,
      success(res) {
        console.log(res);
      }
    })
    wx.showToast({
      title: '提交成功',
      icon: 'success',
      duration: 2000
    })

    wx.navigateBack()
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