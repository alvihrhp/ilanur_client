<template>
  <v-container fluid class="login">
    <v-row justify="center" align="center" class="container-row">
      <v-col cols="10" md="6" sm="8" lg="5">
        <v-card
          :height="cardHeight"
          color="#ee9632"
          v-animate-css="'slideInDown'"
        >
          <div class="login-title">
            <h1>ilanur</h1>
          </div>
          <div class="alert-container" v-show="isError">
            <v-alert type="error">{{ errorMessage }}</v-alert>
          </div>
          <v-form v-on:submit="login">
            <v-container>
              <v-row justify="center">
                <v-col cols="10" sm="10" md="10" lg="9">
                  <v-text-field
                    color="#ffffff"
                    solo
                    label="Username"
                    v-model="formInput.username"
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col cols="10" sm="10" md="10" lg="9">
                  <v-text-field
                    color="#ffffff"
                    solo
                    label="Password"
                    v-model="formInput.password"
                    type="password"
                    outlined
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
          <div class="button-container">
            <v-btn
              large
              width="200px"
              min-height="20px"
              v-on:click="login"
              color="black"
              dark
              :loading="loadingButton"
              >Login</v-btn
            >
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      formInput: {
        username: "",
        password: "",
      },
      isError: false,
      errorMessage: "",
      cardHeight: "400px",
      loadingButton: false,
    };
  },
  methods: {
    login(e) {
      if(e) {
        e.preventDefault();
      }
      this.loadingButton = true;
      this.$store
        .dispatch("login", this.formInput)
        .then((_) => {
          this.loadingButton = false;
          this.$router.push("/dashboard");
          this.$store.dispatch("getMasterType");
          this.$store.dispatch("getMasterLantai");
          this.cardHeight = "400px";
        })
        .catch((error) => {
          this.loadingButton = false;
          this.cardHeight = "500px";
          this.isError = true;
          const errorKey = Object.keys(
            { error }.error.response.data.messages
          )[0];
          this.errorMessage = { error }.error.response.data.messages[errorKey];
        });
    },
  },
};
</script>

<style scoped>
.login {
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("../assets/login.jpg") no-repeat center center;
  background-size: cover;
  overflow: hidden;
}

.container-row {
  height: 100vh;
}

.login-title {
  text-align: center;
  padding: 20px 0;
}

.login-title h1 {
  letter-spacing: 3px;
  color: #ffffff;
}

.alert-container {
  padding: 0 30px;
}

.form-container {
  text-align: center;
}

.button-container {
  text-align: center;
}

.button-login {
  color: #ffffff;
}
/* 
.row {
  margin: 0 !important;
} */
</style>