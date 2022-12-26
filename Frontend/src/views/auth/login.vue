<template>
  <div class="login">
    <h2>Log In</h2>
    <form @submit.prevent="onSubmit">
      <div>
        <label for="userid">아이디</label>
        <input class="form-control" type="text" name="아이디" 
        v-model="userid" autofocus placeholder="아이디" />
      </div>
      <div>
        <label for="password">패스워드</label>
        <input class="form-control" type="password" 
          v-model="password" placeholder="비밀번호" />
      </div>
      <div class="button-align">
      <button class="btn" :class="{'btn-success': !invalidForm}" type="submit" 
      :disabled="invalidForm">Log In</button>
      <div v-if="signup">
        <Signup @close="signup=false"/>
      </div>
      <div v-else>
        <button class="signup-btn" @click.prevent="signup=true">
          회원가입
        </button>
      </div>
    </div>
    </form>
    <p class="loading" v-if="loading">로그인 중입니다...</p>
  </div>
</template>

<script>
import jwtDecode from "jwt-decode";
import Signup from '@/components/Signup.vue';

export default {
  components: { Signup },
  data() {
    return {
      signup: false,
      userid: null,
      password: null,
    };
  },
  computed: {
    tokenUser() {
      return this.$store.getters.TokenUser;
    },
    loading() {
      return this.$store.getters.TokenLoading
    },
    error() {
      return this.$store.getters.TokenError;
    },
    invalidForm() {
      return !this.userid || !this.password;
    },
  },
  watch: {
    tokenUser(value) {
      if (value && value.id && value.id > 0) {
        // 로그인이 완료된 상황
        this.$router.push("/home"); // 메인 페이지 이동
      }
    },
    error(errValue) {
      if (errValue !== null) {
        // 메세지 출력
        window.alert("아이디/비밀번호를 확인해 주세요.");
      }
    },
  },
  created() {
    // 이미 토큰을 가지고 있는 경우 처리를 위한 로직
    const token = window.localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const today = new Date();
      const expDate = new Date(decodedToken.exp * 1000);

      if (expDate && expDate >= today) {
        // 토큰이 유효한 경우
        this.$router.push("/home"); // 메인 페이지 이동
      } else {
        // 토큰이 만료된 경우
        window.localStorage.removeItem("token"); // 토큰 삭제
      }
    }
  },
  methods: {
    onSubmit() {
      this.$store.dispatch("authLogin", {
        userid: this.userid,
        password: this.password,
      });
    },
  },
};
</script>

<style src="../../assets/style/login.css" scoped></style>
