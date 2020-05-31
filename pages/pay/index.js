// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: '',
    cart: [],
    totalPrice: 0,
    totalCount: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow() {
    const address = wx.getStorageSync('address');
    const cart = wx.getStorageSync('pay_goods') || []
    this.setData({
      address
    })
    this.setCart(cart)
  },
  setCart(cart) {
    let allChecked = cart.length ? true : false
    let totalPrice = 0
    let totalCount = 0
    cart.forEach((item, index) => {
      if (item.checked) {
        totalPrice += item.num * item.goods_price
        totalCount += item.num
      } 
    })
    cart = cart.filter(item => item.checked)
    this.setData({
      cart,
      totalPrice,
      totalCount
    })
  }
})