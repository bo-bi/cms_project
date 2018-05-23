# 第一个Vue基础实战项目





# 需要注意的地方：
  - 1.轮播图插件这里有`"vue-awesome-swipe":"^3.1.3"`(其实就是swiper4)
    + ①swiper4的配置分全局和组件，这里配置与之前不同
    + ②loop坑：轮播第二次开始第一张图一闪而过 --> `v-if="data.length"`
    + ③更改轮播图的样式，放在组件style里不管用，因为vue scoped加不上去,这里放到了index.html里

