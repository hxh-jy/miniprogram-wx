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

+ ① 在 data 中定义 isloading 节流阀 

  false 表示当前没有进行任何数据请求 

  true 表示当前正在进行数据请求 

+ ② 在 getColors() 方法中修改 isloading 节流阀的值 

  在刚调用 getColors 时将节流阀设置 true 

  在网络请求的 complete 回调函数中，将节流阀重置为 false

+  ③ 在 onReachBottom 中判断节流阀的值，从而对数据请求进行节流控制 

  如果节流阀的值为 true，则阻止当前请求

  如果节流阀的值为 false，则发起数据请求

# 九、应用生命周期

**定义： **生命周期（Life Cycle）是指一个对象从创建 -> 运行 -> 销毁的整个阶段，强调的是一个时间段。

**分类**

+ 应用生命周期  特指小程序从启动 -> 运行 -> 销毁的过程
+ 页面生命周期  特指小程序中，每个页面的加载 -> 渲染 -> 销毁的过程 

**生命周期函数**：是由小程序框架提供的内置函数，会伴随着生命周期，自动按次序执行。

生命周期强调的是时间段，生命周期函数强调的是时间点

## 9.1 小程序的生命周期函数

小程序的应用生命周期函数需要在 app.js 中进行声明，

```js
App({
  // 小程序初始化完成时，执行此函数，全局只触发一次，可以做一些初始化的工作
  onLaunch: function(options){},

  // 小程序启动，或后台进入前台显示时触发
  onShow: function(options) {},

  // 小程序从前台今年入后台时触发
  onHide: function() {}
})
```

## 9.2 页面的生命周期

小程序的页面生命周期函数需要在页面的 .js 文件中进行声明，

```js
Page({
    onLoad: function(options) {}, // 监听页面加载，一个页面只调用一次
    onShow: function() {}, // 监听页面显示
    onHide: function() {}, // 监听页面隐藏
    onReady: function() {}, // 监听页面初次渲染完成，一个页面只调用一次
    onUnload: function() {}, // 监听页面卸载。一个页面只调用一次
})
```

**注意：**页面刚加载的时候，可以在 onLoad 生命周期函数中初始化页面的数据。

# 十、WXS脚本

**定义：**页面刚加载的时候，可以在 onLoad 生命周期函数中初始化页面的数据。

**应用场景：**wxml 中无法调用在页面的 .js 中定义的函数，但是，wxml 中可以调用 wxs 中定义的函数。因此，小程序中 wxs 的典型应用场景就是“过滤器”

## 10.1 与js的关系

+ wxs 有自己的数据类型

  number 数值类型、string 字符串类型、boolean 布尔类型、object 对象类型、function 函数类型、array 数组类型、 date 日期类型、 regexp 正则

+ 不支持es6及以上的语法形式

  不支持：let、const、解构赋值、展开运算符、箭头函数、对象属性简写、etc..

  支持：var 定义变量、普通 function 函数等类似于 ES5 的语法

+  遵循 CommonJS 规范
  - module 对象 
  - require() 函数 
  - module.exports 对象
+ **注意：** 在wxs中定义的函数不能作为组件的事件回调函数
  + wxs不能调用js中定义的函数
  + wxs不能调用小程序提供的API

## 10.2 基本语法

+ 内嵌wxs脚本

  - wxs 代码可以编写在 wxml 文件中的  标签内，就像 Javascript 代码可以编写在 html 文件中的 

  - wxml 文件中的每个  标签，必须提供 module 属性，用来指定当前 wxs 的模块名称，方便在 wxml 中访问模块中的成员

+ 外联wxs脚本
  - wxs 代码还可以编写在以 .wxs 为后缀名的文件内，就像 javascript 代码可以编写在以 .js 为后缀名的文件中 一样
  - **使用：**在 wxml 中引入外联的 wxs 脚本时，必须为  标签添加 module 和 src 属性
    - module 用来指定模块的名称
    - src 用来指定要引入的脚本的路径，且必须是相对路径

# 十一、 自定义组件

## 11.１ 创建组件 

① 在项目的根目录中，鼠标右键，创建 components -> test 文件夹 

② 在新建的 components -> test 文件夹上，鼠标右键，点击“新建 Component” 

③ 键入组件的名称之后回车，会自动生成组件对应的 4 个文件，后缀名分别为 .js，.json， .wxml 和 .wxss

## 11.2 引用组件 

`在页面的json中全局的json文件中通过usingComponents属性引用`

组件的引用方式分为“局部引用”和“全局引用”，

 局部引用：组件只能在当前被引用的页面内使用 

 全局引用：组件可以在每个小程序页面中使

## 11.3 组件和页面的区别 

从表面来看，组件和页面都是由 .js、.json、.wxml 和 .wxss 这四个文件组成的。但是，组件和页面的 .js 与 .json 文件有明显的不同：

+ 组件的 .json 文件中需要声明 "component": true 属性
+ 组件的 .js 文件中调用的是 Component() 函数 
+  组件的事件处理函数需要定义到 methods 节点中

## 11.4 样式

默认情况下，自定义组件的样式只对当前组件生效，不会影响到组件之外的 UI 结构

+ 组件样式隔离的注意点

  app.wxss 中的全局样式对组件无效

  只有 class 选择器会有样式隔离效果，id 选择器、属性选择器、标签选择器不受样式隔离的影响

+ 建议：在组件和引用组件的页面中建议使用 class 选择器，不要使用 id、属性、标签选择器

+ **修改组件的样式隔离选项**

  可以通过 styleIsolation 修改组件的样式隔离选项

  ```js
  // js中新增配置
  Components({
      options: {
          styleIsolation: 'isolated'  // isolated,启用样式隔离
      }
  })
  
  // 或者在json文件中新增如下配置
  {
      "styleIsolation": "isolated"
  }
  ```

## 11.5 数据、方法、属性

+ 在小程序组件中，用于组件模板渲染的私有数据，需要定义到 data 节点中

+ 在小程序组件中，事件处理函数和自定义方法需要定义到 methods 节点中
+ 在小程序组件中，properties 是组件的对外属性，用来接收外界传递到组件中的数据
+ **data 和 properties 的区别**
  - properties 属性和 data 数据的用法相同，它们都是可读可写的
  - data 更倾向于存储组件的私有数据
  - properties 更倾向于存储外界传递到组件中的数据
  - 使用 setData 为 properties 中的属性重新赋值

## 11.6 数据监听

数据监听器用于监听和响应任何属性和数据字段的变化，从而执行特定的操作。它的作用类似于 vue 中的 watch 侦听器。

```js
Component({
    observers: {
        '监听字段1,监听字段2': function(字段1的新值，字段2的新值) {
            // do sth
        }
    }
})
```

 **监听对象中所有属性的变化**

如果某个对象中需要被监听的属性太多，为了方便，可以使用通配符 ** 来监听对象中所有属性的变化

## 11.7 纯数据字段

+ 纯数据字段指的是那些不用于界面渲染的 data 字段。

+ 应用场景：例如有些情况下，某些 data 中的字段既不会展示在界面上，也不会传递给其他组件，仅仅在当前 组件内部使用。带有这种特性的 data 字段适合被设置为纯数据字段
+ 好处：纯数据字段有助于提升页面更新的性能
+ 在 Component 构造器的 options 节点中，指定 pureDataPattern 为一个正则表达式，字段名符合这个正则 表达式的字段将成为纯数据字段

## 11.8 组件生命周期

+ created  在组件实例刚刚被创建时执行 
+ attached  在组件实例进入页面节点树时执行 
+ ready  在组件在视图层布局完成后执行
+  moved  在组件实例被移动到节点树另一个位置时执行 
+ detached  在组件实例被从页面节点树移除时执行 
+ error  每当组件方法抛出错误时执行

**小程序组件中，最重要的生命周期函数有 3 个，分别是 created、attached、detached**

+ 组件实例刚被创建好的时候，created 生命周期函数会被触发
  - 此时还不能调用 setData
  - 通常在这个生命周期函数中，只应该用于给组件的 this 添加一些自定义的属性字段
+ 在组件完全初始化完毕、进入页面节点树后， attached 生命周期函数会被触发
  - this.data 已被初始化完毕
  - 这个生命周期很有用，绝大多数初始化的工作可以在这个时机进行（例如发请求获取初始数据）
+ 在组件离开页面节点树后， detached 生命周期函数会被触发

**在小程序组件中，生命周期函数可以直接定义在 Component 构造器的第一级参数中，可以在 lifetimes 字段 内进行声明（这是推荐的方式，其优先级最高）。**

## 11.9 插槽

在自定义组件的 wxml 结构中，可以提供一个  节点（插槽），用于承载组件使用者提供的 wxml 结构

**单个插槽**

在小程序中，默认每个自定义组件中只允许使用一个  进行占位，这种个数上的限制叫做单个插槽

**多个插槽**

+ 在小程序的自定义组件中，需要使用多  插槽时，可以在组件的 .js 文件中，通过如下方式进行启用。

```js
Component({
    options:{
        multipleSlots: true
    }
})
```

+ 可以在组件的 .wxml 中使用多个  标签，以不同的 name 来区分不同的插槽。
+ 在使用带有多个插槽的自定义组件时，需要用 slot 属性来将节点插入到不同的  中。示例代码如下

## 11.10 父子组件之间的通信

**父子组件之间通信的 3 种方式**

+ 属性绑定

  - 用于父组件向子组件的指定属性设置数据，仅能设置 JSON 兼容的数据,无法将方法传递给子组件。
  - 子组件在 properties 节点中声明对应的属性并使用

+ 事件绑定

  - 用于子组件向父组件传递数据，可以传递任意数据

    ① 在父组件的 js 中，定义一个函数，这个函数即将通过自定义事件的形式，传递给子组件 

    ② 在父组件的 wxml 中，通过自定义事件的形式，将步骤 1 中定义的函数引用，传递给子组件 

    ③ 在子组件的 js 中，通过调用 this.triggerEvent('自定义事件名称', { /* 参数对象 */ }) ，将数据发送到父组件 

    ④ 在父组件的 js 中，通过 e.detail 获取到子组件传递过来的数据

    ```html
        <learn-slot bindTransfer="handleTransfer" name="通过属性绑定的方式给子组件传递值">
            <view slot="before">这里是插入到前置插槽中的内容</view>
            <view slot="after">后置插槽</view>
        </learn-slot>
    
    // js
    handleTransfer(e) {
    	console.log('事件绑定：',e.detail.str)
    }
    ```

+ 获取组件实例

  - 父组件还可以通过 this.selectComponent() 获取子组件实例对象
  - 这样就可以直接访问子组件的任意数据和方法

# 十二、使用npm包

## 12.1 构建npm 

**使用npm包以前必须先构建npm，详细构建参考如下官网**

[npm 支持 | 微信开放文档 (qq.com)](https://developers.weixin.qq.com/miniprogram/dev/devtools/npm.html)

小程序中已经支持使用 npm 安装第三方包，从而来提高小程序的开发效率。但是，在小程序中使用 npm 包有如下 3 个限制：

+ 不支持依赖于 Node.js 内置库的包
+ 不支持依赖于浏览器内置对象的包
+ 不支持依赖于 C++ 插件的包

总结：虽然 npm 上的包有千千万，但是能供小程序使用的包却“为数不多”

## 12.2 vant Weapp

Vant Weapp 是有赞前端团队开源的一套小程序 UI 组件库，助力开发者快速搭建小程序应用。它所使用的是 MIT 开源许可协议，对商业使用比较友好。

官方文档地址 https://youzan.github.io/vant-weapp

在小程序项目中，安装 Vant 组件库主要分为如下 3 步： 

+ ① 通过 npm 安装（建议指定版本为@1.3.3）

+  ② 构建 npm 包

+  ③ 修改 app.json

  ```json
    "usingComponents": {
      "van-button": "@vant/weapp/button/index"
    },
  ```

```js
<view class="test">
  测试
  <view class="inter"></view>
  <van-button type="primary">按钮</van-button>
</view>
```

## 12.3 使用npm包，Api Promise优化

API Promise化，指的是通过额外的配置，将官方提供的、基于回调函数的异步 API，升级改造为基于 Promise 的异步 API，从而提高代码的可读性、维护性，避免回调地狱的问题

**实现 API Promise化**

+ 在小程序中，实现 API Promise 化主要依赖于 miniprogram-api-promise 这个第三方的 npm 包。

  - 安装 : `npm install miniprogram-api-promise  --save`	

  - 引用： 在app.js中引用

    ```js
    import {promisifyAll} from 'miniprogram-api-promise'
    const wxp = wx.p = {}
    promisifyAll(wx,wxp)
    ```

  - 调用 Promise 化之后的异步 API

    ```html
     <van-button type="warning" bindtap="getInfo">按钮</van-button>
    ```

    ```js
    async getInfo() {
        const {data: res} = await wx.p.request({
          url: 'https://www.escook.cn/api/color',
        })
        console.log('获取数据',res.data)
     },
    ```

    
