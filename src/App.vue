<template>
  <v-app>
    <Sidebar v-if="isLoggedIn"></Sidebar>
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
    if (!localStorage.getItem("token")) {
      this.$router.replace("/login");
    } else {
      const token = localStorage.getItem("token");
      this.$store
        .dispatch("tokenCheck", token)
        .then(() => {
          this.$router.push("/dashboard");
          this.$store.dispatch("getMasterType");
          this.$store.dispatch("getMasterLantai");
        })
        .catch(error => {
          const errorStatus = { error }.error.response.status;
          console.log({ error }.error);
          this.$router.replace("/login");
        });
    }
  },
  components: {
    Sidebar
  },
  data() {
    return {};
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.isLoggedIn;
    }
  }
};
</script>

<style>
html { 
  overflow: auto !important; 
}

::-webkit-scrollbar {
  width: 0px !important;
}

* {
  font-family: "Poppins", sans-serif !important;
}

.container {
  padding: 0 !important;
}

.row {
   margin: 0 !important;
}
</style>
