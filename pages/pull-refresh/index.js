// pages/pull-refresh/index.js
Page({
    // 自定义方法
    getColors() {
        this.setData({
            isloading: true
        })
        wx.showLoading({
          title: '数据加载中',
        })
        wx.request({
          url: 'https://www.escook.cn/api/color',
          success: ({data: res}) => {
            this.setData({
                colorList: [...res.data,...this.data.colorList]
            })
          },
          complete: () => {
            this.setData({
                isloading: false
            })
            wx.hideLoading()
          }
        })
    },
    /**
     * 页面的初始数据
     */
    data: {
        isloading: false,
        colorList: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
       this.getColors()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        if (this.data.isloading) return
        this.getColors()
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})