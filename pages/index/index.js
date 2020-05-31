//Page Object
import { request } from '../../request/index'
Page({
  data: {
    swiperList: [],
    catesList: [],
    floorList: []
  },
  //options(Object)
  onLoad: function(options) {
    this.getSwiperData()
    this.getCatesList()
    this.getFloorList()
  },
  getSwiperData() {
    request({ url: '/public/v1/home/swiperdata' })
      .then(res => {
        this.setData({
          swiperList: res.data.message
        })
      })
  },
  getCatesList() {
    request({ url: '/public/v1/home/catitems' })
      .then(res => {
        this.setData({
          catesList: res.data.message
        })
      })
  },
  getFloorList() {
    request({
        url: '/public/v1/home/floordata'
      })
      .then(res => {
        this.setData({
          floorList: res.data.message
        })
      })
  }
});
  