// pages/base/index.js
Page({

    /**
     * 页面的初始数据
     */
    tapName(e) {
        console.log('点击事件',e)
    },
    data: {
        test: '测试数据绑定的实现',
        isShow: true,
        ipval: '',
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
    handleInp(e) {
        let {value} = e.detail
        this.setData({ipval: value})
        console.log('键盘输入时触发',this.data.ipval)
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log('监听页面加载:onload')
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        console.log('监听页面初次渲染完成:onready',this)
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        console.log('监听页面显示:onshow')
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
        console.log('监听页面隐藏:onhide')
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
        console.log('监听页面卸载:onUnload')
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        console.log('监听用户下拉的工作:onPullDownRefresh')
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
        console.log('用户点击右上角分享按钮')
    },
    handleSon(e) {
        console.log('接收子组件传递过来的数据',e)
    }
})