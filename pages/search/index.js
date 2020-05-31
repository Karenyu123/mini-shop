// pages/search/index.js
import { request } from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isFocus: false,
    value: '',
    searchList: []
  },
  handleSearch(e) {
    const { value } = e.detail
    console.log(value)
    if (value.trim()) {
      this.setData({
        isFocus: true,
        value
      })
      this.getSearchData(value)
    } else {
      this.setData({
        isFocus: false
      })
    }
    this.getSearchData(value)
  },
  getSearchData(value) {
    request({ url: '/goods/qsearch', data: { query: value } })
      .then(res => {
        console.log(res)
    })
  },
  cleaer() {
    this.setData({
      value: '',
      isFocus: false
    })
  }
})