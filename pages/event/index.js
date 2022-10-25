// pages/event/index.js
Page({
    handletap(e) {
        console.log('获取触摸事件的参数',e.target.dataset)
        wx.request({
          url: 'https://data.ourplay.net/smallprogram/tags',
          data: {},
          method: {},
          success(res) {
              console.log('获取get请求成功时的数据',res)
          }
        })

        wx.request({
          url: 'https://pt-qa.lbian.cn/WxUser/OnlineWxUserList',
          method: 'POST',
          success(res) {
              console.log('获取post请求成功时的数据',res)
          }
        })
    },

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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