<template>
  <div class="app">
    <SideBar />
    <Table />
    <Modal />
  </div>
</template>

<script>
import SideBar from "./components/SideBar.vue";
import Table from "./components/Table.vue";

export default {
  name: "db",
  components: {
    SideBar,
    Table,
  },
};
</script>

<style>
body {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  overflow: hidden;
  font-family: "Nutito", sans-serif;
}
.app {
  display: flex;
  flex-direction: row;
}
</style>
