# 上传静态资源-前端

## 技术点

- 切换开发环境

- useDebounce 减少不必要接口请求

## 功能

- 允许用户自定义文件夹名称

- 添加下载按钮, 用户可以下载已上传的文件

- 用户上传文件夹

    - 用户将文件夹压缩成 zip,上传到后端
    
    - 后端将 zip 解压缩,将zip 内容放到指定目录中
    
    - 前端点击 zip 时,进入到路由 /fileSystem , 在前端显示上传文件夹的结构
  
- 大文件上传处理
  
- (管理员/个人)页面

  - 添加按钮(暂时), 进入后台管理页面
  
  - 功能
  
    - 所有用户存储空间占比示意图(管理员)
  
      - 用户名
  
      - 数量
  
      - 操作
  
    - 个人用户存储空间数据(个人)
  
      - 名称
  
      - 大小
  
      - 文件信息备注
  
      - 操作
  
- 
  
## todo

- 支持 window 下 zip 压缩

- 限制压缩包上传格式,目前只支持 zip 的压缩格式
    
- 允许用户上传同名称的压缩包,这两个压缩包的内容不会互相影响, 并且支持以下两种压缩结构

```
test-html.zip
└── test-html
    ├── index.html
    ├── test-html-1
    │   ├── image-20200725151755080.png
    │   ├── test-html--1-1
    │   │   ├── image-20200727163203887.png
    │   │   └── test.js
    │   └── test.json
    └── test.json
```

```
test-html.zip
├── index.html
├── test-html-1
│   ├── image-20200725151755080.png
│   ├── test-html--1-1
│   │   ├── image-20200727163203887.png
│   │   └── test.js
│   └── test.json
└── test.json

```

- 文件夹分享功能
  
- 文件夹下载功能
