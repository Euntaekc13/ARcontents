<template>
    <div>
      <div class="text-center" style="margin-top: 200px;margin-left: 50%; margin-right: 50%;">
        로그아웃 중입니다...
      </div>
    </div>
  </template>
  
  <script>
  export default {
    computed: {
      loading() {
        return this.$store.getters.TokenLoading
      }
    },
    watch: {
      loading(value) {
        if (value === false) {
          // 로그아웃 처리 후 이동
          this.$router.push('/auth/login')
        }
      }
    },
    created() {
      this.$store.dispatch('authLogout')
    }
  }
  </script>
  
  <style lang="scss" scoped></style>
  