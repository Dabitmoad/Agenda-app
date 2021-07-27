<template>
  <div class="agenda-warrper">
    <div class="tab">
      <table>
        <tr>
          <th>Full-name</th>
          <th>description</th>
          <th>date</th>
          <th>status</th>
          <th>created_at</th>
          <th>updated_at</th>
          <th>Action</th>
        </tr>
        <tr>
          <td>Jill</td>
          <td>Smith</td>
          <td>50</td>
          <td>Jill</td>
          <td>Smith</td>
          <td>50</td>
          <td class="tdc">
            <img src="../assets/edit-line.png" alt="edit" srcset="" />
            <img src="../assets/delete-bin-line.png" alt="delete" srcset="" />
          </td>
        </tr>
        <tr>
          <td>Eve</td>
          <td>Jackson</td>
          <td>94</td>
          <td>Jill</td>
          <td>Smith</td>
          <td>50</td>
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

<script setup></script>

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
