<template>
  <div class="app">
    <SideBar />
    <Table />
  </div>
</template>

<script>
import SideBar from "./components/SideBar.vue";
import Table from "./components/Table.vue";
import firestore from "./service/firebase";

export default {
  name: "db",
  components: {
    SideBar,
    Table,
  },

  created() {
    firestore
      .collection("agenda")
      .get()
      .then((snapshot) => {
        const agenda = snapshot.docs.map((doc) => doc.data());
        console.log(agenda);
      });
  },
};
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
