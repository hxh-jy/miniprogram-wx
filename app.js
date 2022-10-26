// app.js
import { promisifyAll } from 'miniprogram-api-promise'
const wxp = wx.p = {}
promisifyAll(wx,wxp)
// const wxp = wx.p = {}
// promisifyAll(wx,wxp)
App({
  // 小程序初始化完成时，执行此函数，全局只触发一次，可以做一些初始化的工作
  onLaunch: function(options){},

  // 小程序启动，或后台进入前台显示时触发
  onShow: function(options) {},

  // 小程序从前台今年入后台时触发
  onHide: function() {}
})
