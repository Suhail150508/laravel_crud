<script setup>

import { RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
import Navnar from './views/Navnar.vue';
// import StudentCreate from './views/StudentCreate.vue';
</script>

<template>
  <div class="">
    <div  style="margin-top:4rem">
      <Navnar />
    </div>

  <div >
    <RouterView />
  </div>
 
    <!-- <RouterLink /> -->
  </div>
</template>

