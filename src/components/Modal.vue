<template>
  <div class="format">
    <form action="" @submit="addOrEditAgenda">
      <label>Name</label>
      <input type="text" placeholder="Name" v-model="name" required />

      <label>description</label>
      <input
        type="text"
        placeholder="description"
        v-model="description"
        required
      />

      <label>date</label>
      <input type="date" v-model="date" required />
      <label>status</label>
      <select v-model="status" required>
        <option value="option1">option1</option>
        <option value="option2">option2</option>
        <option value="option3">option3</option>
        <option value="option4">option4</option>
      </select>
      <button
        type="submit"
        v-text="agendaId ? 'Edit agenda' : 'Add agenda'"
      ></button>
      <button @click="$emit('close')">Close</button>
    </form>
  </div>
</template>

<script>
import firestore from "../service/firebase";
export default {
  data() {
    return {
      name: "",
      description: "",
      date: "",
      status: "",
    };
  },

  created() {
    if (this.agendaId) {
      firestore
        .collection("agenda")
        .doc(this.agendaId)
        .get()
        .then((querySnapshot) => {
          const data = querySnapshot.data();
          this.name = data.name;
          this.description = data.description;
          this.date = dayjs(data.date.toDate()).format("YYYY-MM-DD");
          this.status = data.status;
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    }
  },
  props: {
    agendaId: String,
  },
  methods: {
    addOrEditAgenda(e) {
      e.preventDefault();

      // edit agenda
      if (this.agendaId) {
        firestore
          .collection("agenda")
          .doc(this.agendaId)
          .update({
            name: this.name,
            description: this.description,
            date: new Date(this.date),
            status: this.status,
            updated_at: new Date(),
          })
          .then(() => {
            this.$emit("close");
            window.location.reload();
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
          });
        return;
      }

      // add agenda
      firestore
        .collection("agenda")
        .add({
          name: this.name,
          description: this.description,
          date: new Date(this.date),
          status: this.status,
          created_at: new Date(),
          updated_at: new Date(),
        })
        .then((docRef) => {
          this.$emit("close");
          window.location.reload();
        })
        .catch((err) => alert(err));
    },
  },
};
</script>

<style>
.format {
  width: 200px;
  height: auto;
  padding: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgb(255, 255, 255);
  border: 1px solid rgba(0, 0, 0, 0.342);
  border-radius: 10px;
}
form {
  display: flex;
  flex-direction: column;
}
label {
  padding: 10px;
  font-size: 16px;
  font-family: "Nunito", sans-serif;
  font-weight: 900;
}
input,
select,
option {
  outline: none;
  border-radius: 5px;
  border: 1px solid rgba(88, 88, 88, 0.151);
  padding: 10px;
  margin-bottom: 10px;
}
</style>
