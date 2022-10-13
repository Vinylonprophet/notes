<!--
 * @Author: Vinylonprophet 915390118@qq.com
 * @Date: 2022-10-12 16:08:29
 * @LastEditors: Vinylonprophet 915390118@qq.com
 * @LastEditTime: 2022-10-13 14:07:26
 * @FilePath: \vue3 day01\vue-begin01\src\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script>
export default{
  data(){
    return{
      name: 'Vinylon',
      msg: '<h2>标题</h2>',
      id: 'd1',
      objectOfAttrs: {
        id: 'container',
        class: 'wrapper'
      }
    }
  },
  methods:{
    changeName(){
      this.name = "Melody"
    },
    changeId(){
      this.id = "d2"
    },
  }
}
</script>

<template>
  <div>
    <!-- mustache 双向绑定 -->
    <div>
      <span>{{ name }}</span>
      <span style="margin-left: 10px;" v-once>{{ name }}</span>
      <button style="margin-left: 10px;" @click="changeName">ChangeName</button>
    </div>

    <!-- v-html 原始HTML -->
    <div>
      <p style="margin-top: 20px;">{{ msg }}</p>
      <p v-html="msg"></p>
    </div>
    

    <!-- v-bind 动态绑定属性 -->
    <div>
      <p style="margin-top: 20px;" v-bind:id="id">red</p>
      <button @click="changeId">改变颜色</button>
    </div>
    

    <!-- :disabled 布尔型Attribute -->
    <div style="margin-top: 20px;">
      <button :disabled="true">Button</button>
      <button :disabled="false">Button</button>
    </div>

    <!-- 动态绑定多个值 -->
    <div style="margin-top: 20px;" v-bind="objectOfAttrs">动态绑定多个值</div>

  </div>
</template>

<style>
#d1 {
  color: red;
}
#d2 {
  color: blue;
}
</style>