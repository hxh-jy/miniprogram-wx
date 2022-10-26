// index.js
import {createStoreBindings} from 'mobx-miniprogram-bindings'
import {store} from '../../store/index'
Page({
  data: {
  },
  handleBtn1(e) {
    console.log('e.target',e.target.dataset.step)
    this.updateNumA(e.target.dataset.step)
  },
  async getInfo() {
    const {data: res} = await wx.p.request({
      url: 'https://www.escook.cn/api/color',
    })
    console.log('获取数据',res.data)
  },
  onLoad() {
    this.storeBindings = createStoreBindings(this,{
      store, // 指定要绑定的store
      fields: ['numA','numB','sum'], //指定要绑定的字段数据
      actions: ['updateNumA'] // 指定要绑定的方法
    })
  },
  onUnload() {
    this.storeBindings.destoryStoreBindings()
  }
})
