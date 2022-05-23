// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    const result = await cloud.openapi.subscribeMessage.send({
      touser: event.openid,
      page: 'pages/mine/mine',
      data: {
        thing1: {
          value: event.name
        },
        thing2: {
          value: '请记得上传体温、健康码、行程码、行动轨迹'
        },
        time3: {
          value: event.time
        }
      },
      templateId: 'Nfj2O2TdlFeLrRd5fL6u8Qo1TRsf2_jM2beOcE8GDwM'
    })
    console.log(result)
    return result.errCode
  } catch(err) {
    console.log(err)
    return err.errCode
  }
}