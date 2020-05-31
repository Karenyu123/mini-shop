// pages/user/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    totalCollects: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  onShow() {
    const userInfo = wx.getStorageSync('userinfo');
    const collects = wx.getStorageSync('collects');
    if (collects.length) {
      this.setData({
          totalCollects: collects.length
        })
      }
    this.setData({
      userInfo: userInfo.userInfo
    })
  },
  toLogin() {
    wx.navigateTo({
      url: '/pages/login/index'
    });
      
  }
})