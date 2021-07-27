<template>
  <div class="agenda-warrper">
    <h1 class="header">Aganda</h1>

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
        <tr v-for="data in agendas" v-bind:key="data.id">
          <td>{{ data.name }}</td>
          <td>{{ data.description }}</td>
          <td>{{ formatDate(data.date) }}</td>
          <td>{{ data.status }}</td>
          <td>{{ formatDate(data.created_at) }}</td>
          <td>{{ formatDate(data.updated_at) }}</td>

          <td class="tdc">
            <img
              src="../assets/edit-line.png"
              alt="edit"
              style="cursor: pointer"
              @click="openModal(data.id)"
            />
            <img
              src="../assets/delete-bin-line.png"
              style="cursor: pointer"
              alt="delete"
              @click="deleteAgenda(data.id)"
            />
          </td>
        </tr>
      </table>
      <Modal v-if="showModal" @close="showModal = false" :agendaId="editId" />
    </div>
    <div class="btns">
      <button @click="exportJSONToCSV">Export CSV</button>
      <div>
        <label for="file-upload" class="custom-file-upload">
          Import CSV :
        </label>
        <input style="disp" type="file" class="file" @change="handleCsvFile" />
      </div>
    </div>
  </div>
</template>

<script>
import firestore from "../service/firebase";
import Modal from "../components/Modal.vue";
export default {
  name: "table",
  components: {
    Modal,
  },

  data() {
    return {
      agendas: [],
      showModal: false,
      editId: "",
    };
  },

  beforeCreate() {
    firestore
      .collection("agenda")
      .get()
      .then((snapshot) => {
        this.agendas = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
      });
  },

  methods: {
    openModal(id) {
      this.editId = id;
      this.showModal = !this.showModal;
    },
    handleCsvFile(e) {
      const reader = new FileReader();
      reader.onload = () => {
        const json = this.csvTextToJson(reader.result);
        this.addDatatoFirestore(json);
      };

      reader.readAsText(e.target.files[0]);
    },

    addDatatoFirestore(data) {
      for (let i = 0; i < data.length; i++) {
        firestore
          .collection("agenda")
          .add({
            ...data[i],
            date: new Date(data[i].date),
            created_at: new Date(data[i].created_at),
            updated_at: new Date(data[i].updated_at),
          })
          .then((docRef) => {
            if (i === data.length - 1) {
              window.location.reload();
            }
          })
          .catch((err) => alert(err));
      }
    },
    deleteAgenda(id) {
      firestore
        .collection("agenda")
        .doc(id)
        .delete()
        .then(() => {
          window.location.reload();
        })
        .catch((err) => alert(err));
    },
    formatDate(data) {
      return dayjs(data.toDate()).format("MMMM D, YYYY h:mm A");
    },

    csvTextToJson(csv) {
      var lines = csv.split("\n");

      var result = [];

      var headers = lines[0].split(",");

      for (var i = 1; i < lines.length; i++) {
        var obj = {};
        var currentline = lines[i].split(",");

        for (var j = 0; j < headers.length; j++) {
          obj[headers[j].trim()] = currentline[j].replaceAll('"', "");
        }

        result.push(obj);
      }

      return result;
    },

    exportJSONToCSV() {
      const filename = Math.random().toString(36).substr(2, 9) + ".csv";
      const replacer = (key, value) => (value === null ? "" : value);
      const header = Object.keys(this.agendas[0]).filter((e) => e !== "id");
      const sorted_headers = header.sort((a, b) => a - b);

      let csv = this.agendas.map((row) =>
        sorted_headers
          .map((fieldName) => {
            if (
              fieldName === "date" ||
              fieldName === "created_at" ||
              fieldName === "updated_at"
            ) {
              return JSON.stringify(
                this.formatDate(row[fieldName]),
                replacer
              ).replace(/,/g, "");
            }

            return JSON.stringify(row[fieldName], replacer).replace(/,/g, "");
          })
          .join(",")
      );
      csv.unshift(header.join(","));
      csv = csv.join("\r\n");

      var link = document.createElement("a");
      link.setAttribute(
        "href",
        "data:text/csv;charset=utf-8,%EF%BB%BF" + encodeURIComponent(csv)
      );
      link.setAttribute("download", filename);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
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

/* input[type="file"] {
  display: none;
} */
table {
  font-family: "Nunito", sans-serif;
  border-collapse: collapse;
  min-width: 80vw;
  margin: 80px auto;
}
.file {
  background: linear-gradient(45deg, #7367f0, #9e95f5);
  color: white;
  cursor: pointer;
  padding: 10px;
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
  padding: 5px;
}
.btns {
  width: 500px;
  margin: 50px auto;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}
.header {
  width: 100%;
  text-align: center;
  font-size: 40px;
  font-family: "Mogra", cursive, sans-serif;
  font-weight: 900;
  color: #7367f0;
}
</style>
