let times = 0
export const request = (params) => {
  times++
  wx.showLoading({
    title: '加载中',
    mask: true
  });
    
  return new Promise((resolve, reject) => {
    const baseURL = 'https://api-hmugo-web.itheima.net/api'
    wx.request({
      ...params,
      url: baseURL + params.url,
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      },
      complete: () => {
        times--
        if (!times) {
          wx.hideLoading();
        }
      }
    })
  })
}