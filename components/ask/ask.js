// components/ask/ask.js
Component({
    /**
     * 组件的属性列表,存放父组件中接收的数据
     */ 
    properties: {
        str: {
            type: String,
            value: ''
        },
        sonData: '我是子组件的值'
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {

    },
    // 可以在组件中定义生命周期函数
    lifetimes: {
        created() {}, //组件刚建好时触发，但是不能调用setData
        attached() {}, // 组件实例进入页面节点树执行
        detached() {} // 组件实例从页面节点移除时执行
    }
})
