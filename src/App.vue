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

  components: {
    Sidebar
  },

  data: () => ({
    //
  })
};
</script>
