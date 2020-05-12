<template>
  <v-navigation-drawer app color="success">
    <v-list>
      <v-list-item-group>
        <v-list-item color="success">
          <v-list-item-icon>
            <v-icon color="white">mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Dashboard</v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "Sidebar"
};
</script>

<style scoped>
.v-list-item__title {
  color: white;
  font-weight: bold;
}
</style>