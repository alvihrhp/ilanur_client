<template>
  <v-app>
    <Sidebar></Sidebar>
    <!-- Sizes your content based upon application components -->
    <v-content>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Sidebar from "./components/Sidebar";
export default {
  name: "App",
  created() {
    this.$store.dispatch("getMasterType");
  },
  components: {
    Sidebar
  },

  data: () => ({
    //
  })
};
</script>

<style scoped>
* {
  font-family: "Poppins", sans-serif !important;
}
.container {
  padding: 0;
}
</style>
