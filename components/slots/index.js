// components/slots/index.js
Component({
    /**
     * 组件的属性列表
     */
    methods:　{
        Transfer() {
            this.triggerEvent('Transfer',{str: this.data.str})
        },
        test() {
            console.log('通过父组件调用子组件的方法')
        }
    },
    options:{
        multipleSlots: true // 在组件定义时的选项中启用多个slot支持
    },
    data:{
        str: '子组件传给父组件的值',
        count: 0
    },
    properties: {
        name: ''
    },
})
