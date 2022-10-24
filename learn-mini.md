# 一、小程序配置 app.json

## 1.1 全局配置

+ ### 小程序配置 app.json  

  当前小程序的全局配置，报考了小程序的所有页面路径、界面表现、网络超时时间、底部tab等

  - pages:用于指定小程序由哪些页面组成，每一项都对应一个页面的 路径（含文件名） 信息。未指定 `entryPagePath` 时，数组的第一项代表小程序的初始页面（首页）。
  - window 定义小程序所有页面的顶部背景颜色
  - tabbar 底部tab栏的表现
  - 具体配置项的内容参考官网  https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/app.html#window，此处省略不介绍

  ```json
  {
    "pages":[
      "pages/index/index",
      "pages/logs/logs"
    ],
    "window":{
      "backgroundTextStyle":"dark",  //顶部显示颜色为深色的三个点
      "navigationBarBackgroundColor": "#0FB8A0",  // 导航栏背景色
      "navigationBarTitleText": "Ourplay",  // 导航栏标题文字内容
      "navigationBarTextStyle":"white" // 导航栏标题颜色
    }, 
    "tabBar":{
      "color": "#fff",  // 文字颜色
      "selectColor": "#0FB8A0",  // tab活跃时的文字颜色
      "backgroundColor": "#333", // tab的背景色
      "position": "bottom", // tab的位置，只有top和bottom这两种
      "list": [ // tab的列表,至少两个，至多五个
        {
          "pagePath": "pages/index/index", // 页面路径
          "text": "首页", // tab上按钮文字
          "iconPath": "static/icons/home.png", // 图片路径
          "selectedIconPath": "static/icons/home_active.png" // 选中时的图片路径
        },
        {
          "pagePath": "pages/strategy/index",
          "text": "攻略",
          "iconPath": "static/icons/game_recommend.png",
          "selectedIconPath": "static/icons/game_recommend_active.png"
        },
        {
          "pagePath": "pages/ask/index",
          "text": "问答",
          "iconPath": "static/icons/game_answer.png",
          "selectedIconPath": "static/icons/game_answer_active.png"
        },
        {
          "pagePath": "pages/qa/index",
          "text": "帮助",
          "iconPath": "static/icons/game_info.png",
          "selectedIconPath": "static/icons/game_info_active.png"
        }
      ]
    },
      ,
    plugins:{  // 声明小程序需要使用的插件
      // materialPlugin:{
      //   version: "1.0.5",
      //   provider: "wx4d2deeab3aed6e5a"
      // },
      contactPlugin: {
        version: "1.4.3",
        provider: "wx104a1a20c3f81ec2"
      }
    }
    "style": "v2",
    "sitemapLocation": "sitemap.json"
  }
  ```

## 1.2 页面配置

每一个小程序页面也可以使用同名 `.json` 文件来对本页面的窗口表现进行配置，页面中配置项会覆盖 `app.json` 的 `window` 中相同的配置项。

页面中配置项在当前页面会覆盖 `app.json` 中相同的配置项（样式相关的配置项属于 `app.json` 中的 `window` 属性，但这里不需要额外指定 `window` 字段），具体的取值和含义可参考[全局配置文档](https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/app.html)中说明。

## 1.3 sitemap配置

小程序根目录下的 `sitemap.json` 文件用于配置小程序及其页面是否允许被微信索引，文件内容为一个 JSON 对象，如果没有 `sitemap.json` ，则默认为所有页面都允许被索引；

# 二、注册小程序 app.js

每个小程序都需要在 `app.js` 中调用 `App` 方法注册小程序实例，绑定生命周期回调函数、错误监听和页面不存在监听函数等。

**App() 必须在 `app.js` 中调用，必须调用且只能调用一次。不然会出现无法预期的后果**

```js
// app.js
App({
  onLaunch() {  // 生命周期回调-监听小程序初始化
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  onShow(options) {}, // 监听小程序启动或切前台
  onHide() {}, // 监听小程序切后台
  onError(msg) {}, //监听错误函数
  onPageNotFound() {}, // 页面不存在监听函数
  globalData: {
    userInfo: null
  }
})
```

# 三、WXML

WXML（WeiXin Markup Language）是框架设计的一套标签语言，结合[基础组件](https://developers.weixin.qq.com/miniprogram/dev/component/index.html)、[事件系统](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxml/event.html)，可以构建出页面的结构。

## 3.1 数据绑定

WXML 中的动态数据均来自对应 Page 的 data。

+ 简单绑定

  - 使用Mustache语法（双大括号）将变量包起来

    ```html
    <view> {{message}} </view>
    // page.js
    Page({
      data: {
        message: 'Hello MINA!'
      }
    })
    ```

  - 组件属性和控制属性、关键字都需要在双括号之内

    ```html
    <checkbox checked="{{false}}"> </checkbox>
    ```

  - 运算：可以在{{}}内进行简单的三元运算、算数运算、逻辑判断、字符串运算

    ```html
    <view wx:if="{{length > 5}}"> </view>
    ```

## 3.2 列表渲染

**wx:for**

在组件上使用 `wx:for` 控制属性绑定一个数组，即可使用数组中各项的数据重复渲染该组件

默认数组的当前项的下标变量名默认为 `index`，数组当前项的变量名默认为 `item`

+ 使用 `wx:for-item` 可以指定数组当前元素的变量名
+ 使用 `wx:for-index` 可以指定数组当前下标的变量名
+ `wx:for` 也可以嵌套，下边是一个九九乘法表
+ `wx:key` 来指定列表中项目的唯一的标识符。
  - 字符串，代表在 for 循环的 array 中 item 的某个 property保留关键字 
  - `*this` 代表在 for 循环中的 item 本身

```html
<view wx:for="{{array}}"> {{item}} </view>
// page.js
Page({
  data: {
    array: [1, 2, 3, 4, 5]
  }
})
```

## 3.3 条件渲染

```html
<!--wxml-->
<view wx:if="{{view == 'WEBVIEW'}}"> WEBVIEW </view>
<view wx:elif="{{view == 'APP'}}"> APP </view>
<view wx:else="{{view == 'MINA'}}"> MINA </view>
// page.js
Page({
  data: {
    view: 'MINA'
  }
})
```

+ ## block wx:if

  因为 `wx:if` 是一个控制属性，需要将它添加到一个标签上。如果要一次性判断多个组件标签，可以使用一个 `<block/>` 标签将多个组件包装起来，并在上边使用 `wx:if` 控制属性。

  **注意：** `<block/>` 并不是一个组件，它仅仅是一个包装元素，不会在页面中做任何渲染，	只接受控制属性

  ```html
  <block wx:if="{{true}}">
    <view> view1 </view>
    <view> view2 </view>
  </block>
  ```

## 3.4 模版

WXML提供模板（template），可以在模板中定义代码片段，然后在不同的地方调用。

+ 使用 name 属性，作为模板的名字。然后在`<template/>`内定义代码片段，如：

+ 使用 is 属性，声明需要的使用的模板，然后将模板所需要的 data 传入

  可以使用 Mustache 语法，来动态决定具体需要渲染哪个模板

+ 模板拥有自己的作用域，只能使用 data 传入的数据以及模板定义文件中定义的 `<wxs />` 模块。

```html
    <view>模版的的使用</view>
    <template name="odd">
        <view>我是计数模版：odd</view>
    </template>
    <template name="even">
        <view>我是偶数模版:even</view>
    </template>

    <block wx:for="{{[1,2,3,4,5,6]}}" wx:key="*this">
        <template is="{{item % 2 == 0 ? 'even' : 'odd'}}"></template>
    </block>
```

## 3.5 引用

```
import`可以在该文件中使用目标文件定义的`template
```

+ 在 item.wxml 中定义了一个叫`item`的`template`

```html
!-- item.wxml -->
<template name="item">
  <text>{{text}}</text>
</template>
```

+ 在 index.wxml 中引用了 item.wxml，就可以使用`item`模板

  ```html
  <import src="item.wxml"/>
  <template is="item" data="{{text: 'forbar'}}"/>
  ```

+ import 有作用域的概念，即只会 import 目标文件中定义的 template，而不会 import 目标文件 import 的 template

  **如：C import B，B import A，在 C 中可以使用 B 定义的`template`，在 B 中可以使用 A 定义的`template`，但是 C 不能使用 A 定义的`template`**。

# 四、事件

- 事件是视图层到逻辑层的通讯方式。
- 事件可以将用户的行为反馈到逻辑层进行处理。
- 事件可以绑定在组件上，当达到触发事件，就会执行逻辑层中对应的事件处理函数。
- 事件对象可以携带额外信息，如 id, dataset, touches。

**事件的使用**

+ `bindtap`:当用户点击该组件的时候会在该页面对应的 Page 中找到相应的事件处理函数。
+ catchtap: 和bindtap类似，但是该事件会阻止事件向上冒泡。

**事件分类**

1. 冒泡事件：当一个组件上的事件被触发后，该事件会向父节点传递。
2. 非冒泡事件：当一个组件上的事件被触发后，该事件不会向父节点传递。

## 4.1 双向绑定

如果使用 `this.setData({ value: 'leaf' })` 来更新 `value` ，`this.data.value` 和输入框的中显示的值都会被更新为 `leaf` ；但如果用户修改了输入框里的值，却不会同时改变 `this.data.value` 。

如果需要在用户输入的同时改变 `this.data.value` ，需要借助简易双向绑定机制。此时，可以在对应项目之前加入 `model:` 前缀：

```html
<input model:value="{{value}}" />
```

**自定义组件中传递双向绑定......**

