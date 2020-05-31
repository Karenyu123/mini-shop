// pages/login/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  getUserInfo(e) {
    console.log(e)
    const userInfo = e.detail
    if (!userInfo.rawData) {
      wx.showToast({
        title: '已取消授权',
        icon: 'none'
      });
    } else {
      wx.setStorageSync('userinfo', userInfo);
      wx.showToast({
        title: '授权成功',
        icon: 'none'
      });
    }
    wx.navigateBack({
      delta: 1
    })  
  }
})