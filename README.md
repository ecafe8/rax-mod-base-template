# 项目名称 - 

### 项目介绍


### 项目依赖


### 项目启动

#### 依赖安装
```
yarn
```

#### 启动
```
sinx start
```

#### 打包
```
sinx build
```


#### 店铺模块开发经验

1. 顶部的 tab区域
fixed 定位可以遮上去，但是点击 tab 的区域会穿透，而且盖在 tab 上的 fixed 元素本身的点击事件也不会响应
Android 的 tab 栏高度是 98rem, iOS 是 90rem


2. 视频自动播放，安卓有兼容问题，大小写都加上。
autoplay={true}  autoPlay={true}


3. 生意参谋判断
if (isWeb && window.top !== window.self) {
  try {
    if (document.referrer.indexOf('sycm.taobao.com') > -1) {
    return;
  }
  } catch (e) {
  }
}


4. 视频在页面跳转后任然继续播放的问题
视频属性：
http://weex.apache.org/cn/references/components/video.html

componentDidMount() {
  let emitter = this.pageUtils && this.pageUtils.pageEmitter;

  if (emitter) {
    emitter.on('pageDisappear', this.pauseVideo);
  }
}

componentWillUnmount() {
  let emitter = this.pageUtils && this.pageUtils.pageEmitter;

  if (emitter) {
    emitter.off('pageDisappear', this.pauseVideo);
  }
}
  
  

5. 设计师后台的一些表单配置

// checkbox
    {
      "dataName": "hideBottom",
      "id": "_yhGxSSTx",
      "type": "Checkbox",
      "dataType": "Number",
      "extension": {
        "defaultValue": true,
        "title": "隐藏该模块下方的白色间隙"
      }
    }

// 颜色选择器
{
  "ataName": "shopnav_bg_color",
  "extension": {
    "label": "新版导航颜色"
  },
  "label": "",
  "relateData": "shopsign_logo_url",
  "id": "id28",
  "type": "ColorMatch"
}


// 模块名后面的小提示

{
  "moduleName": "逐帧动画",
  "moduleTitle": "逐帧动画",
  "moduleDesc": "无高度限制的逐帧动画",
  "features": {},
  "editable": true,
  "maxHeight": "",
  "layout": [],
  "tips": [{
    "content": "支持对上传的整张图片中不同内容添加不同链接。适合对装修有极高美观要求、样式需自行设计和创意的情况下使用。",
    "icon": "icon-tip"
  }],
...
}


// json array 循环嵌套 

{
    "list": [
        {
            "list1": {
                "type": "1",
                "text_content": "aa"
            },
            "list2": {
                "text_content": "bbcc"
            }
        }
    ]
}

// NUKE 文档

http://nuke.taobao.org/nukedocs/packages/mask.html?v=20170828
