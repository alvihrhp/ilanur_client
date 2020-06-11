<template>
  <v-toolbar color="#FFFFFF" dense>
    <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
    <v-toolbar-title class="toolbar-title">ilanur</v-toolbar-title>
  </v-toolbar>
</template>

<script>
export default {
  name: "Toolbar"
};
</script>

<style scoped>
.toolbar-title {
  color: #ee9632 !important;
  font-size: 25px;
  letter-spacing: 3px;
}
</style>