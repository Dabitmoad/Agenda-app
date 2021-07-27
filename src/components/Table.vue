<template>
  <div class="agenda-warrper">
    <div class="tab">
      <table>
        <tr>
          <th>Name</th>
          <th>description</th>
          <th>date</th>
          <th>status</th>
          <th>created_at</th>
          <th>updated_at</th>
          <th>Action</th>
        </tr>
        <tr v-for="data in agendas" v-bind:key="data.name">
          <td>{{ data.name }}</td>
          <td>{{ data.description }}</td>
          <td>{{ formateDate(data.date) }}</td>
          <td>{{ data.status }}</td>
          <td>{{ formateDate(data.created_at) }}</td>
          <td>{{ formateDate(data.updated_at) }}</td>

          <td class="tdc">
            <img src="../assets/edit-line.png" alt="edit" srcset="" />
            <img src="../assets/delete-bin-line.png" alt="delete" srcset="" />
          </td>
        </tr>
      </table>
    </div>
    <div class="btns">
      <button>Export CSV</button>
      <button>Import CSV</button>
    </div>
  </div>
</template>

<script>
import firestore from "../service/firebase";
export default {
  name: "table",

  data() {
    return {
      agendas: [],
    };
  },

  beforeCreate() {
    firestore
      .collection("agenda")
      .get()
      .then((snapshot) => {
        this.agendas = snapshot.docs.map((doc) => doc.data());
      });
  },

  methods: {
    formateDate(data) {
      return dayjs(data.toDate()).format("MMMM D, YYYY h:mm A");
    },
  },
};
</script>

<style>
.agenda-warrper {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.tab {
  width: 100%;
}
table {
  font-family: "Nunito", sans-serif;
  border-collapse: collapse;
  min-width: 80vw;
  margin: 80px auto;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 10px;
  font-size: 16px;
  font-family: "Nunito", sans-serif;
  font-weight: 900;
  text-align: center;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
.tdc {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}
.btns {
  width: 500px;
  margin: 50px auto;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}
</style>
