# react-mobx-antd-boilerplate 开箱即用
参考该教程[从零搭建react-family框架教程](https://github.com/brickspert/blog/issues/1)搭建的 react 全家桶初始化架构，
与文章不同的是此处使用 [mobx](https://github.com/mobxjs/mobx)  作为状态管理器，其他部分也作了相应的调整。

UI框架方面，集成了 <https://ant.design/index-cn>

开发笔记 ，<http://qimajiang.com/2017/10/21/React%E5%BC%80%E5%8F%91%E7%AC%94%E8%AE%B0/>

# 基础功能

1 react router4 路由和导航

2 mobx 状态管理机，支持多个 stores 文件

3 跨域代理

4 css 加载

5 图片加载

6 axios 请求和响应拦截器

7 懒加载

8  支持 Service Worker(生产环境)

9 etc

# 开发坏境启动

1 npm install

2 npm run dev

3 浏览器打开http://localhost:3001

# 生产坏境部署

1 npm run build

2 拷贝dist文件夹至服务器即可