# 一、小程序配置 app.json

**JSON配置文件的作用**

SON 是一种数据格式，在实际开发中，JSON 总是以配置文件的形式出现。小程序项目中也不例外：通过不同 的 .json 配置文件，可以对小程序项目进行不同级别的配置。

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
          "pagePath": "pages/event/index",
          "text": "攻略",
          "iconPath": "static/icons/game_recommend.png",
          "selectedIconPath": "static/icons/game_recommend_active.png"
        },
        {
          "pagePath": "pages/base/index",
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

## 1.4 项目结构

+ ① pages 用来存放所有小程序的页面 
+ ② utils 用来存放工具性质的模块（例如：格式化时间的自定义模块）
+ ③ app.js 小程序项目的入口文件 
+ ④ app.json 小程序项目的全局配置文件 
+ ⑤ app.wxss 小程序项目的全局样式文件 
+ ⑥ project.config.json 项目的配置文件 
+ ⑦ sitemap.json 用来配置小程序及其页面是否允许被微信索

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

+ 如果要一次性控制多个组件的展示与隐藏，可以使用一个  标签将多个组件包装起来，并在 标签上使用 wx:if 控制属性

  因为 `wx:if` 是一个控制属性，需要将它添加到一个标签上。如果要一次性判断多个组件标签，可以使用一个 `<block/>` 标签将多个组件包装起来，并在上边使用 `wx:if` 控制属性。

  **注意：** `<block/>` 并不是一个组件，它仅仅是一个包装元素，不会在页面中做任何渲染，	只接受控制属性

**在小程序中，直接使用 hidden="{{ condition }}" 也能控制元素的显示与隐藏**

```html
<block wx:if="{{true}}">
  <view> view1 </view>
  <view> view2 </view>
</block>
```

### 3.3.1 wx:if与hidden的对比

+ ① 运行方式不同 

  wx:if 以动态创建和移除元素的方式，控制元素的展示与隐藏 

  hidden 以切换样式的方式（display: none/block;），控制元素的显示与隐藏 

+ ② 使用建议 

  频繁切换时，建议使用 hidden

  控制条件复杂时，建议使用 wx:if 搭配 wx:elif、wx:else 进行展示与隐藏的切换

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

## 3.6 和HTML的区别

+ 标签名称不同 

    HTML （div, span, img, a） 

    WXML（view, text, image, navigator） ②

+ 属性节点不同 

   ```html
   <a href="#">超链接</a>
   <navigator url="/pages/home/home"></navigator>
   ```

+ 提供了类似于 Vue 中的模板语法 

  数据绑定  

  列表渲染 

  条件渲

# 四、事件

- 事件是视图层到逻辑层的通讯方式。
- 事件可以将用户的行为反馈到逻辑层进行处理。
- 事件可以绑定在组件上，当达到触发事件，就会执行逻辑层中对应的事件处理函数。
- 事件对象可以携带额外信息，如 id, dataset, touches。

## 4.1**事件的使用**

+ `bindtap`:当用户点击该组件的时候会在该页面对应的 Page 中找到相应的事件处理函数。手指触摸后马上立刻，类似于HTML中的click事件
+ `bindinput` 文本框的输入事件
+ bindchange  状态改变时触发
+ catchtap: 和bindtap类似，但是该事件会阻止事件向上冒泡。

## 4.2**事件分类**

1. 冒泡事件：当一个组件上的事件被触发后，该事件会向父节点传递。
2. 非冒泡事件：当一个组件上的事件被触发后，该事件不会向父节点传递。

## 4.3**事件属性**

+ type 事件类型
+ timeStamp 页面打开到触发事件所经过的毫秒
+ target 触发事件的组件的一些属性值集合
+ currentTarget  当前组件的一些属性值集合
+  detail  额外的信息
+  touches  触摸事件，当前停留在屏幕中的触摸点信息的数组
+  changedTouches    触摸事件，当前变化的触摸点信息的数

## 4.4 事件传参

通过调用 this.setData(dataObject) 方法，可以给页面 data 中的数据重新赋值，示例如下

+ 小程序中的事件传参比较特殊，不能在绑定事件的同时为事件处理函数传递参数，小程序中的事件传参比较特殊，不能在绑定事件的同时为事件处理函数传递参数

+ 小程序中的事件传参比较特殊，不能在绑定事件的同时为事件处理函数传递参数

  - 小程序中的事件传参比较特殊，不能在绑定事件的同时为事件处理函数传递参数
  - 数值 2 会被解析为参数的值

+ 在事件处理函数中，通过 event.target.dataset.参数名 即可获取到具体参数的值

  ```html
  <view>
      <view bindtap="handletap" data-info="{{2}}">
          测试触摸事件
      </view>
  </view>
  
  Page({
  	handletap(e) {
          console.log('获取触摸事件的参数',e.target.dataset)
      },
  })
  ```

## 4.5 双向绑定

如果使用 `this.setData({ value: 'leaf' })` 来更新 `value` ，`this.data.value` 和输入框的中显示的值都会被更新为 `leaf` ；但如果用户修改了输入框里的值，却不会同时改变 `this.data.value` 。

如果需要在用户输入的同时改变 `this.data.value` ，需要借助简易双向绑定机制。此时，可以在对应项目之前加入 `model:` 前缀：

```html
<input model:value="{{value}}" />
```

**自定义组件中传递双向绑定......**

# 五、宿主环境

**定义：** 宿主环境指的是小程序运行所必须依赖的环境，脱离了宿主环境的软件是没有任何意义的

**小程序的宿主环境是手机微信**

## 5.1 通信模型

小程序中通信的主体是渲染层和逻辑层，其中wxml和wxss样式工作在渲染层；js脚本工作在逻辑层

## 5.2 运行机制

- 小程序启动过程

  ① 把小程序的代码包下载到本地 

  ② 解析 app.json 全局配置文件 

  ③ 执行 app.js 小程序入口文件，调用 App() 创建小程序实例 

  ④ 渲染小程序首页 

  ⑤ 小程序启动完成

- 页面渲染过程

  ① 加载解析页面的 .json 配置文件 

  ② 加载页面的 .wxml 模板和 .wxss 样式

  ③ 执行页面的 .js 文件，调用 Page() 创建页面实例 

  ④ 页面渲染完成

## 5.3 组件

+ 视图容器

  - view 类似于HTML中的div，是一个块级元素
  - scroll-view 可滚动的视图区域，常用来实现滚动列表效果
  - swiper 和 swiper-item   轮播图容器组件 和 轮播图 item 组件

+ 基础内容组件

  - rich-text   富文本组件，支持把 HTML 字符串渲染为 WXML 结构，rich-text 组件的 nodes 属性节点，把 HTML 字符串渲染为对应的 UI 结构
  - text  文本组件 ，类似于 HTML 中的 span 标签，是一个行内元素，通过 text 组件的 selectable 属性，实现长按选中文本内容的效果

+ 其他常用组件

  - button  按钮组件，通过 open-type 属性可以调用微信提供的各种功能（客服、转发、获取用户授权、获取用户信息等）

  - image 图片组件，默认宽度约 300px、高度约 240p

    其**mode **属性用来指定图片的裁剪和缩放模式

    - scaleToFill  不保持纵横比缩放图片，使图片的宽高完全拉伸至填满 image 元素
    - aspectFit 保持纵横比缩放图片，使图片的长边能完全显示出来
    - widthFix ，宽度不变，高度自动变化，
    - heightFix ，高度不变，宽度自动变化，

  - navigator  页面导航组件，类似于HTML中的a链接

## 5.4 API

小程序中的 API 是由宿主环境提供的，通过这些丰富的小程序 API，开发者可以方便的调用微信提供的能力， 例如：获取用户信息、本地存储、支付功能等。

+ 事件监听 API
  - 特点：以 on 开头，用来监听某些事件的触发
  - 举例：wx.onWindowResize(function callback) 监听窗口尺寸变化的事件
+ 同步 API
  - 特点：以 Sync 结尾的 API 都是同步 API
  - 举例：wx.setStorageSync('key', 'value') 向本地存储中写入内容
+ 异步 API
  - 特点：类似于 jQuery 中的 $.ajax(options) 函数，需要通过 success、fail、complete 接收调用的结果
  - 举例：wx.request() 发起网络数据请求，通过 success 回调函数接收数据

## 5.5 小程序的发布流程

**一个小程序的发布上线，一般要经过上传代码 -> 提交审核 -> 发布这三个步骤**

+ 开发版本 

  使用开发者工具，可将代码上传到开发版本中。 开发版本只保留每人最新的一份上传的代码。 点击提交审核，可将代码提交审核。开发版本可删除，不影响线上版本和审核中版本的代码。

+ 体验版本

  可以选择某个开发版本作为体验版，并且选取一份体验版。

+ 审核中的版本

  只能有一份代码处于审核中。有审核结果后可以发布到线上，也可直接重新提交审核，覆盖原审核版本。

+ 线上版本

  线上所有用户使用的代码版本，该版本代码在新版本代码发布后被覆盖更新

**一个小程序的发布上线，一般要经过上传代码 -> 提交审核 -> 发布这三个步骤**

登录小程序管理后台 -> 设置 -> 基本设置 -> 基本信息 -> 小程序码及线下物料下载

# 六、网络数据请求

出于安全性方面的考虑，小程序官方对数据接口的请求做出了如下 两个限制：

+ 只能请求 HTTPS 类型的接口
+ 必须将接口的域名添加到信任列表中

## 6.1 配置请求合法域名

+ 需求描述：假设在自己的微信小程序中，希望请求 https://www.escook.cn/ 域名下的接口 
+ 配置步骤：登录微信小程序管理后台 -> 开发 -> 开发设置 -> 服务器域名 -> 修改 request 合法域名

**注意事项**

① 域名只支持 https 协议

 ② 域名不能使用 IP 地址或 localhost 

③ 域名必须经过 ICP 备案

 ④ 服务器域名一个月内最多可申请 5 次修改

## 6.2 发送get请求

调用微信小程序提供的 wx.request() 方法，可以发起 GET 数据请求

```js
wx.request({
    url: 'https://data.ourplay.net/smallprogram/tags',
    data: {},
    method: {},
    success(res) {
        console.log('获取请求成功时的数据',res)
    }
})
```

## 6.3 发送post请求

调用微信小程序提供的 wx.request() 方法，可以发起 POST 数据请求，

```js
wx.request({
    url: 'https://pt-qa.lbian.cn/WxUser/OnlineWxUserList',
    method: 'POST',
    success(res) {
        console.log('获取post请求成功时的数据',res)
    }
})
```

很多情况下，我们需要在**页面刚加载**的时候，自动请求一些初始化的数据。此时需要在页面的 onLoad 事件 中调用获取数据的函数

## 6.4 跨域与ajax

跨域问题只存在于基于浏览器的 Web 开发中。由于小程序的宿主环境不是浏览器，而是微信客户端，所以小 程序中不存在跨域的问题。 Ajax 技术的核心是依赖于浏览器中的 XMLHttpRequest 这个对象，由于小程序的宿主环境是微信客户端，所 以小程序中不能叫做“发起 Ajax 请求”，而是叫做“发起网络数据请求”

# 七、导航

# 7.1 页面导航

**定义：**页面导航指的是页面之间的相互跳转

**实现方式**

+ 声明式导航

  - 在页面上声明一个  导航组件

  - 通过点击  组件实现页面跳转

+  编程式导航

  - 调用小程序的导航 API，实现页面的跳转

## 7.2 tabBar导航

**声明式导航**

tabBar 页面指的是被配置为 tabBar 的页面。 在使用  组件跳转到指定的 tabBar 页面时，需要指定 url 属性和 open-type 属性

+ url 表示要跳转的页面的地址，必须以 / 开头 

+ open-type 表示跳转的方式，必须为 switchTab

**编程式导航**

调用 wx.switchTab(Object object) 方法，可以跳转到 tabBar 页面。其中 Object 参数对象的属性列表如下

+ url   需要跳转的 tabBar 页面的路径，路径后不能带参数
+ success  接口调用成功的回调函数
+ fail  接口调用失败的回调函数
+ complete   接口调用结束的回调函数（调用成功、失败都会执行）



## 7.3 导航到非tabBar页面

**声明式导航**

非 tabBar 页面指的是没有被配置为 tabBar 的页面。 在使用  组件跳转到普通的非 tabBar 页面时，则需要指定 url 属性和 open-type 属性，

+ url 表示要跳转的页面的地址，必须以 / 开头
+ open-type 表示跳转的方式，必须为 navigate

**编程式导航**

调用 wx.navigateTo(Object object) 方法，可以跳转到非 tabBar 的页面。其中 Object 参数对象的属性列表如下

+ url   需要跳转的 tabBar 页面的路径，路径后不能带参数
+ success  接口调用成功的回调函数
+ fail  接口调用失败的回调函数
+ complete   接口调用结束的回调函数（调用成功、失败都会执行）

## 7.4 后退导航

**声明式导航**

如果要后退到上一页面或多级页面，则需要指定 open-type 属性和 delta 属性

+ open-type 的值必须是 navigateBack，表示要进行后退导航
+ delta 的值必须是数字，表示要后退的层级
+ 为了简便，如果只是后退到上一页面，则可以省略 delta 属性，因为其默认值就是 1

**编程式导航**

调用 wx.navigateBack(Object object) 方法，可以返回上一页面或多级页面。其中 Object 参数对象可选的 属性列表如下：

+ url   需要跳转的 tabBar 页面的路径，路径后不能带参数
+ success  接口调用成功的回调函数
+ fail  接口调用失败的回调函数
+ complete   接口调用结束的回调函数（调用成功、失败都会执行

## 7.5 导航传参

navigator 组件的 url 属性用来指定将要跳转到的页面的路径。同时，路径的后面还可以携带参数

+ 参数与路径之间使用 ? 分隔
+ 参数键与参数值用 = 相连
+ 不同参数用 & 分隔

**编程式导航携带参数**

调用 wx.navigateTo(Object object) 方法跳转页面时，也可以携带参数

**接收参数**

在 onLoad 中接收导航参数

**通过声明式导航传参或编程式导航传参所携带的参数，可以直接在 onLoad 事件中直接获取到**

```html
<view>
    <view bindtap="handletap" data-info="{{2}}">
        测试触摸事件
    </view>

    <rich-text nodes="<h1 style='color: red'>导航</h1>"></rich-text>

    <view>
        <text>声明式导航：</text>
        <navigator url="/pages/base/index?id=1" open-type="switchTab">跳转到tabbar页面</navigator>
        <navigator url="/pages/logs/logs">跳转到非tabbar页面</navigator>
        <navigator open-type="navigateBack" delta="1">后退导航</navigator>

        <text>编程式导航</text>
        <view bindtap="handleTabbar" style="color: green;">跳转到tabbar首页</view>
        <view bindtap="handleNotab" style="color: blue;">跳转到非tabbar日志页</view>
        <view bindtap="handleBack" style="color: orange;">后退</view>
    </view>
</view>
 
// js
    handleTabbar(e) {
      wx.switchTab({
        url: '/pages/index/index',
      })
    },
    handleNotab() {
      wx.navigateTo({
        url: '/pages/logs/logs',
      })
    },
    handleBack() {
      wx.navigateBack({
        delta: 1,
      })
    }
```

# 八、 页面事件

## 8.1 下拉刷新

**定义：**下拉刷新是移动端的专有名词，指的是通过手指在屏幕上的下拉滑动操作，从而重新加载页面数据的行为。

**启用下拉刷新**

+ ① 全局开启下拉刷新 

  在 app.json 的 window 节点中，将 enablePullDownRefresh 设置为 true

+ ② 局部开启下拉刷新 

  在页面的 .json 配置文件中，将 enablePullDownRefresh 设置为 true

**监听下拉刷新事件**

在页面的 .js 文件中，通过 onPullDownRefresh() 函数即可监听当前页面的下拉刷新事件。

**停止刷新的效果**

当处理完下拉刷新后，下拉刷新的 loading 效果会一直显示，不会主动消失，所以需要手动隐藏下拉刷新的 loading 效果。此时，调用 wx.stopPullDownRefresh() 可以停止当前页面的下拉刷新。

## 8.2 上拉触底

**定义：**上拉触底是移动端的专有名词，通过手指在屏幕上的上拉滑动操作，从而加载更多数据的行为

**监听页面的上拉触底事件**

通过 onReachBottom() 函数即可监听当前页面的上拉触底事件。

**配置上拉触底距离**

上拉触底距离指的是触发上拉触底事件时，滚动条距离页面底部的距离。 可以在全局或页面的 .json 配置文件中，通过 onReachBottomDistance 属性来配置上拉触底的距离。 小程序默认的触底距离是 50px，在实际开发中，可以根据自己的需求修改这个默认值

```js
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
        this.getColors()
        this.setData({
            isloading: true // 重新开启请求
        })
    }
})
```

```html
<view 
    wx:for="{{colorList}}" 
    wx:key="*this" 
    class="num-item" 
    style="background-color: rgba({{item}});"> 
    {{item}}
</view>
```

**案例实现步骤**

① 定义获取随机颜色的方法

② 在页面加载时获取初始数据 

③ 渲染 UI 结构并美化页面效果

④ 在上拉触底时调用获取随机颜色的方法 

⑤ 添加 loading 提示效果 

⑥ 对上拉触底进行节流处理
