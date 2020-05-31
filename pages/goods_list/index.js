// pages/goods_list/index.js
import { request } from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
      id: 0,
      text: '综合',
      isActive: true
    },
      {
        id: 1,
        text: '销量',
        isActive: false
      },
      {
        id: 2,
        text: '价格',
        isActive: false
      }
    ],
    goodsList: [],
    totalPage: 0
  },
  params: {
    query: '',
    cid: '',
    pagenum: 1,
    pagesize: 10
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('o',options)
    this.params.cid = options.cid
    this.getGoodslist()
  },
  navSwitch(e) {
    const cIndex = e.detail.index
    const { tabs } = this.data
    tabs.forEach((item, index) => index === cIndex ? item.isActive = true : item.isActive = false)
    this.setData({
      tabs
    })
  },
  getGoodslist() {
    request({ url: '/public/v1/goods/search', ...this.params })
      .then(res => {
        let totalPage = Math.ceil(res.data.message.total / this.params.pagesize)
        this.setData({
          goodsList: [...res.data.message.goods, ...this.data.goodsList],
          totalPage
        })
    })
  },
  onReachBottom() {
    if (this.params.pagenum < this.data.totalPage) {
      this.params.pagenum++
      this.getGoodslist()
    } else {
      wx.showToast({
        title: '啊噢~到底了',
        icon: 'none'
      });
    }
  },
  onPullDownRefresh() {
    this.setData({
      goodsList: []
    })
    this.params.pagenum = 1
    this.getGoodslist()
    wx.stopPullDownRefresh()
  }
})