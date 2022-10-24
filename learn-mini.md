# 一、小程序配置

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