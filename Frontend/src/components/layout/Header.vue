<template>
  <nav class="header">
    <div class="header-name" >
      <router-link to="/profile">
        <span style="color:black">{{ tokenUserName }}님 어서 오세요!</span>
      </router-link>
    </div>
    <div class="header-logo">
      <router-link to="/">Home</router-link>
    </div>
    <div class="header-auth">
      <router-link to="/auth/logout" v-if="isLoggedin" @click.prevent="onClick()">
        Logout</router-link>
      <router-link v-else to="/auth/login">Login</router-link>
    </div>
  </nav>
</template>

<script>
export default {
  computed: {
    isLoggedin() {
      let login = false;
      if (
        this.$store.getters.TokenUser &&
        this.$store.getters.TokenUser.id > 0
      ) {
        login = true;
      }

      return login;
    },
    tokenUserName() {
      return (
        this.$store.getters.TokenUser && this.$store.getters.TokenUser.name
      );
    },
  },
  methods: {
    onClick() {
      this.$store.dispatch('authLogout')
    },
  },
};
</script>

<style src="../../assets/style/header.css" scoped></style>
