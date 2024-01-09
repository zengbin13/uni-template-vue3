- 全局状态pinia: [地址](https://pinia.web3doc.top/introduction.html)
- UI框架uvui: [地址](https://www.uvui.cn/components/intro.html)
- 下拉列表组件: [地址](https://z-paging.zxlee.cn)
- 图表组件: [地址](https://www.ucharts.cn/v2/#/demo/index)
- 网络请求: [地址](https://www.quanzhan.co/luch-request/handbook/)
- APP升级: [地址](https://ext.dcloud.net.cn/plugin?id=12154)



## 分包

1. 在对应平台的配置下添加`"optimization":{"subPackages":true}`开启分包优化

   ```json
   // manifast.json 
   "optimization" : {
      "subPackages" : true
   },
   ```

2. **创建分包模块**

   ```
   ┌─pages
   │  ├─index
   │  │  └─index.vue
   │  └─login
   │     └─login.vue
   ├─pagesA // 微信小程序每个分包的大小是2M，总体积一共不能超过20M
   │  ├─static
   │  └─list
   │     └─list.vue
   ├─pagesB
   │  ├─static  // 分包下支持独立的 static 目录，用来对静态资源进行分包
   │  └─detail
   │     └─detail.vue
   ├─static
   ├─main.js
   ├─App.vue
   ├─manifest.json
   └─pages.json
   ```

   ```json
   {
   	"pages": [{
   		"path": "pages/index/index",
   		"style": { ...}
   	}, {
   		"path": "pages/login/login",
   		"style": { ...}
   	}],
   	"subPackages": [{
   		"root": "pagesA",
   		"pages": [{
   			"path": "list/list",
   			"style": { ...}
   		}]
   	}, {
   		"root": "pagesB",
   		"pages": [{
   			"path": "detail/detail",
   			"style": { ...}
   		}]
   	}],
   	// 分包预载配置
   	"preloadRule": {
   		// 进入页面预下载subPackA分包
   		"pages/tabbar/profile": {
   			"network": "all",
   			"packages": ["pages-temp"]
   		}
   	},
   }
   
   ```

   

   



