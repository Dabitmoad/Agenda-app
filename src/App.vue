<template>
  <div class="app">
    <SideBar />
    <Table />
  </div>
</template>

<script setup>
import SideBar from "./components/SideBar.vue";
import Table from "./components/Table.vue";
</script>

<style>
body {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: "Nutito", sans-serif;
}
.app {
  display: flex;
  flex-direction: row;
}
</style>
