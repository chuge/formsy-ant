# CSS3D 天空盒子 - 羽飞 - 2018.03.19

## 展示3D

### demo
17年双十一做的全景：https://activity.tuisnake.com/mainMeet/index?id=340&login=preview&appKey=jlg88lyxz7siqtmr&slotId=-1&deviceId=test

### 天空盒子是什么原理？
![](https://segmentfault.com/img/bVAetN?w=590&h=417)

![](https://segmentfault.com/img/bVAd8L?w=564&h=422)

### 一种是用webgl（three.js），另外就是通过CSS 3D

## CSS 3D概念了解

### 3D坐标系
![](https://image.zhangxinxu.com/image/blog/201209/3d_axes.png)


### 理解3D transform rotate 3d（旋转）

#### 借用张大神demo
https://www.zhangxinxu.com/wordpress/2012/09/css3-3d-transform-perspective-animate-transition/

#### rotate X
![](https://image.zhangxinxu.com/image/blog/201209/dangang.jpg)

#### rotate Y 
![](https://image.zhangxinxu.com/image/blog/201209/gangguan-jolin.jpg)

#### rotate Z
![](https://image.zhangxinxu.com/image/blog/201209/feidao.jpg)
#### 辅助理解rotate 3d
http://yun.tuia.cn/tuia/share/demo.html

### perspective 视点（视角）

#### 学过建筑和素描的，应该见过
![](https://image.zhangxinxu.com/image/blog/201209/toushi2.png)

#### CSS3 3D transform的透视点是在浏览器的前方！
![](https://segmentfault.com/img/bVbgLaA?w=1222&h=656)
perspective:800;代表3D物体距离浏览器是800px。
perspective-origin:50% 50%;眼睛视角的中心点，分别在xy轴的50%的地方。


### translate 3d

#### translate Z 帮助理解视点距离
#### 辅助理解translate 3d
http://yun.tuia.cn/tuia/share/demo.html

## 参考

### 其他参考：
https://segmentfault.com/a/1190000006880856
https://juejin.im/post/5b01b459f265da0b796529ef


### 文中demo代码
http://gitlab2.dui88.com/tuia-frontend/tuia-activity-frontend/tuia-h5/tree/master/src/js/mainMeeting/panoDouble11