// pages/ask/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        test: '测试数据绑定的实现',
        isShow: true,
        arr: [
            {
                book: 'react',
                price: 65
            },
            {
                book: 'mysql',
                price: 73
            },
            {
                book: 'vue',
                price: 70
            },
            {
                book: 'nodeJs',
                price: 60
            }
        ],
        templateData: '通过模版传入的数据'
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