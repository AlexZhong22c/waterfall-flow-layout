# waterfall-flow-layout
JavaScript，JQuery，CSS3 三种方式实现瀑布流布局

## js原生方法

- 观看 [在线demo](https://alexzhong22c.github.io/waterfall-flow-layout/js实现瀑布流/index1.html)
- 需要计算，列数=窗口宽度/图片宽度
- 图片定位是根据每一列数据库的高度计算接下来图片的位置
- 图片排序是按照图片计算的位置横向排列，位置是计算出来的，比较规范

## JQuery实现

观看 [在线demo](https://alexzhong22c.github.io/waterfall-flow-layout/jQ实现瀑布流/index2.html)

## css3方式

- 观看 [在线demo](https://alexzhong22c.github.io/waterfall-flow-layout/css实现瀑布流/index3.html)
- 不需要计算，浏览器自动计算，只需设置列宽，性能高
- 列宽随着浏览器窗口大小进行改变，用户体验不好
- 图片排序按照垂直顺序排列，打乱图片显示顺序
- 图片加载还是依赖js实现