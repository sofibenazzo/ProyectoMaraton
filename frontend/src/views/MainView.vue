<template>
  <div class="container">
    <Header />
    <SideBar class="sidebar"/>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import Header from '../components/Header.vue'
import SideBar from '../components/SideBar.vue'
</script>

<style>

.container {
  display: flex;
  height: 100vh;
}

.sidebar {
  width: 250px;
  background-color: #1D2B64;
  color: white;
}

.content {
  flex: 1;
  padding: 20px;
  background-color: #f2f2f2;
}

main {
  flex: 1; 
}
body { 
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    margin: 0;
    background: #f2f2f2;
    background: radial-gradient(circle, rgba(242, 242, 242, 1) 0%, rgba(148, 187, 233, 1) 150%);
    color: #ECEFF1;
}

</style>