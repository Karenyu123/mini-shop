// pages/goods_detail/index.js
import { request } from '../../request/index'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    goodsDetail: {},
    isCollect: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const id = options.goods_id
    this.getGoosDetail(id)
  },
  onShow() {
    const pages = getCurrentPages();
    const cPage = pages[pages.length - 1]
    const options = cPage.options
    const id = options.goods_id
    const collectGoods = wx.getStorageSync('collects') || [];
    const flag = collectGoods.some((item) => item.goods_id === id)
    this.setData({
        isCollect: flag
      })
  },
  getGoosDetail(id) {
    request({ url: '/public/v1/goods/detail', data: { goods_id: id } })
      .then(res => {
        const data = res.data.message
        const collectGoods = wx.getStorageSync('collects') || [];
        const flag = collectGoods.some((item) => item.goods_id === id)
        this.setData({
          isCollect: flag
        })
        this.setData({
          goodsDetail: {
            goods_id: id,
            goods_name: data.goods_name,
            pics: data.pics,
            goods_introduce: data.goods_introduce.replace(/\.webp/g, '.jpg'),
            goods_price: data.goods_price,
        }
      })
    })
  },
  handleImgClick(e) {
    const current = e.currentTarget.dataset.url
    const urls = this.data.goodsDetail.pics.map(v => v.pics_mid)
    wx.previewImage({
      current,
      urls
    });
  },
  addCart() {
    wx.showToast({
      title: '加入成功',
      // icon: 'none',
      duration: 1500,
      mask: false,
    });
    const { goodsDetail } = this.data
    const cart = wx.getStorageSync('cart') || [];
    const index = cart.findIndex(v => v.goods_id === goodsDetail.goods_id)
    if (index === -1) {
      goodsDetail.num = 1
      goodsDetail.checked= true
      cart.push(goodsDetail)
      wx.setStorageSync('cart', cart);
    } else {
      cart[index].num++
      wx.setStorageSync('cart', cart);
    }
  },
  handleCollect() {
    const collects = wx.getStorageSync('collects') || [];
    const { goodsDetail } = this.data
    let isCollect
    const index = collects.findIndex(item => item.goods_id === goodsDetail.goods_id)
    if (index === -1) {
      collects.push(goodsDetail)
      isCollect = true
      wx.showToast({
        title: '已收藏',
        icon: 'success'
      });
    } else {
      collects.splice(index, 1)
      isCollect = false
      wx.showToast({
        title: '已取消',
        icon: 'success'
      });
    }
    wx.setStorageSync('collects', collects)
    this.setData({
      isCollect
    })
  }
})