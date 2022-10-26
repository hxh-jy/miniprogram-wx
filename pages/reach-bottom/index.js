Page({
    data: {
        colorList: [],
        isloading: false  // 表示当前没有进行任何数据请求
    },
    getColors() {
        // 添加loading效果
        wx.showLoading({
          title: '数据加载中',
        })
        this.setData({
            isloading: true  // 表示当前正在进行数据请求
        })
        wx.request({
            url:'https://www.escook.cn/api/color',
            method: 'get',
            success: ({data: res}) => {
                this.setData({
                    colorList: [...this.data.colorList,...res.data]
                })
            },
            // 加载完成后隐藏loading效果
            complete: () => {
                wx.hideLoading()  // 隐藏加载中
                this.setData({
                    isloading: false  // 重新回到未请求的状态
                })
            }
        })
    },
    onLoad: function(options) {
        this.getColors()
    },
    // 上拉加载数据
    onReachBottom: function() {
        if (this.data.isloading) return; 
        this.getColors()
    }
})