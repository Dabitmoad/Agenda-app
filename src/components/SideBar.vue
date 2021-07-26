<template>
  <div class="side-bar">
    <div class="logo">
      <img src="../assets/Logo.png" class="logo-app" alt="logo" />
      <h1>Aganda</h1>
    </div>
    <button>Add new agenda</button>
  </div>
</template>

<script setup></script>

<style>
.side-bar {
  background-color: white;
  width: 200px;
  height: 97vh;
  display: flex;
  flex-direction: column;
  border: solid 0.8px rgba(88, 88, 88, 0.164);
  padding: 10px;
  overflow-x: hidden;
}
.logo {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  height: 40px;
  width: 100%;
  margin-bottom: 50px;
}
.logo-app {
  height: 40px;
  width: 40px;
  object-fit: contain;
  background-clip: padding-box;
}
h1 {
  font-size: 16px;
  font-family: "Nunito", sans-serif;
  font-weight: 900;
}
button {
  border-radius: 5px;
  outline: none;
  border: none;
  padding: 10px;
  font-size: 16px;
  background: linear-gradient(45deg, #7367f0, #9e95f5);
  color: azure;
  cursor: pointer;
}
</style>
