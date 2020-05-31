// pages/category/index.js
import { request } from '../../request/index'
Page({
  data: {
    cats: [],
    goodslist: [],
    currentIndex: 0,
    scrollTop: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const cats = wx.getStorageSync('cats')
    if (cats.data && cats.data.length > 0 && Date.now() - cats.time > 1000 * 60) {
      this.setData({
        cats: cats.data
      })
      this.getGoodslist()
    } else {
      this.getCatsData()
    }
  },
  getCatsData() {
    request({ url: '/public/v1/categories' })
      .then(res => {
        this.setData({
          cats: res.data.message
        })
        wx.setStorageSync('cats', {time: Date.now(), data: this.data.cats});
        this.getGoodslist()
    })
  },
  getGoodslist() {
    const { cats, currentIndex } = this.data
    const list = cats[currentIndex].children
    this.setData({
      goodslist: list
    })
  },
  handleMenuTap(e) {
    this.setData({
      currentIndex: e.currentTarget.dataset.index,
      scrollTop: 0
    })
    this.getGoodslist()
  }
})