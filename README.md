# MouseSnow

## 入门

```js
const snow = new MouseSnow(options);
```

## 参数

| 名称                  | 默认值     | 类型                           | 描述                                                                             |
| --------------------- | ---------- | ------------------------------ | -------------------------------------------------------------------------------- |
| `container`           | `document` | HTMLElement                    | 容器元素, 事件触发元素                                                           |
| `character`           | `"*"`      | string                         | 雪花字符                                                                         |
| `color`               |            | Color \| function():Color      | 雪花颜色, 默认会在 #000000 - #ffffff 中随机获取一种颜色                          |
| `size`                | `"20px"`   | string                         | 初始雪花大小,                                                                    |
| `lifeSpan`            | `120`      | number                         | 生命周期, 生命周期小于 0 时，会销毁当前元素                                      |
| `destoryScalePercent` | `0.2`      | number                         | 销毁时的缩放比例, 因为在值太小时，视觉上已经不可见，提前销毁可以减少一些性能开销 |
| `throttle`            | `60`       | number                         | 雪花移动的节流时间间隔, 单位: ms                                                 |
| `velocity`            |            | function():{x:number,y:number} | 雪花移动速度, x 默认会在 -1 ~ 1 之间随机, y 默认为 1                             |
