// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: '',
    cart: [],
    allChecked: true,
    totalPrice: 0,
    totalCount: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onShow() {
    const address = wx.getStorageSync('address');
    const cart = wx.getStorageSync('cart') || []
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
      } else {
        allChecked = false
      }
    })
    this.setData({
      cart,
      allChecked,
      totalPrice,
      totalCount
    })
    wx.setStorageSync('cart', cart);    
  }, 
  getAddress() {
    let address
    wx.getSetting({
      success: (result) => {
        console.log('result', result)
        const isAuth = result.authSetting['scope.address']
        if (isAuth) {
          wx.chooseAddress({
            success: (result) => {
              address = result
              const {
                provinceName,
                cityName,
                countyName,
                detailInfo,
                nationalCode
              } = address
              address.all = provinceName + cityName + countyName + detailInfo
              wx.setStorageSync('address', address);
              console.log(address)
            }
          });
        } else {
          wx.openSetting({
            success: (result) => {
              wx.chooseAddress({
                success: (result) => {
                  address = result
                  const {
                    provinceName,
                    cityName,
                    countyName,
                    detailInfo,
                    nationalCode
                  } = address
                  address.all = provinceName + cityName + countyName + detailInfo
                  wx.setStorageSync('address', address);
                  console.log(address)
                }
              });
            }
          });           
        }
      }
    })
  },
  // 取消选择 
  checkedChange(e) {
    console.log(e)
    const { goods } = e.currentTarget.dataset
    const { cart } = this.data
    const newCart = cart.map((item) => {
      if (item.goods_id === goods.goods_id) {
        item.checked = !item.checked
      }
      return item
    })
    this.setCart(newCart)
  },
  // 增加商品数量
  handleCartAdd(e) {
    const { goods } = e.currentTarget.dataset
    const { cart } = this.data
    const newCart = cart.map((item) => {
      if (item.goods_id === goods.goods_id) {
        item.num++
      }
      return item
    })
    this.setCart(newCart)
  },
  // 减少商品数量
  handleDecrement(e) {
    const { goods } = e.currentTarget.dataset
    const { cart } = this.data
    const index = cart.findIndex(item => item.goods_id === goods.goods_id)
    if (cart[index].num > 1) {
      cart[index].num--
    } else if (cart[index].num === 1) {
      wx.showModal({
        title: '确定删除该商品吗？',
        content: '',
        showCancel: true,
        cancelText: '取消',
        cancelColor: '#000000',
        confirmText: '确定',
        confirmColor: '#3CC51F',
        success: (result) => {
          if (result.confirm) {
            cart.splice(index, 1)
            this.setCart(cart)
          }
        },
        fail: () => {
          console.log('取消删除')
        }
      });
        
    }
    this.setCart(cart)
  },
  handleAllCheck() {
    const { allChecked, cart } = this.data
    const newCart = cart.map((item) => {
      item.checked = !allChecked
      return item
    })
    this.setData({
      allChecked: !allChecked
    })
    this.setCart(newCart)
  },
  toPurchase() {
    const { totalCount, address } = this.data
    if (!totalCount) {
      wx.showToast({
        title: '请先选择商品',
        icon: 'none',
        image: '',
        duration: 1500,
        mask: false
      });
      return 
    }
    if (!address) {
      wx.showToast({
        title: '请先选择收货地址',
        icon: 'none',
        image: '',
        duration: 1500,
        mask: false
      });
      return
    }
    const { cart } = this.data
    const newCart = cart.filter(item => !item.checked)
    const payGoods = cart.filter(item => item.checked)
    const goods = wx.getStorageSync('pay_goods') || []
    goods.push(...payGoods)
    wx.setStorageSync('pay_goods', goods);
    this.setCart(newCart)
    wx.navigateTo({
      url: '/pages/pay/index'
    })
  }
})