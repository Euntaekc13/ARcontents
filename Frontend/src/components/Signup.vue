<template>
  <ValidationObserver
    ref="signupform"
    v-slot="{ handleSubmit, invalid, validate }"
  >
    <Modal>
      <div slot="header">
        <h2>회원가입</h2>
      </div>
      <div slot="body">
        <form id="sign-up" @submit.prevent="handleSubmit(SignUp)">
          <label for="userid">아이디</label>
          <ValidationProvider
            name="아이디"
            rules="required"
            v-slot="{ errors }"
          >
            <input
              class="form-control"
              type="text"
              v-model="userid"
              placeholder="eg. camel"
            />
            <div v-if="errors[0]" style="color: red; font-size: 15px">
              {{ errors[0] }}
            </div>
          </ValidationProvider>
          <label for="password">패스워드</label>
          <ValidationProvider
            name="패스워드"
            rules="required|min:3"
            v-slot="{ errors }"
          >
            <input
              class="form-control"
              type="password"
              v-model="password"
              placeholder="eg. camel"
            />
            <div v-if="errors[0]" style="color: red; font-size: 14px">
              {{ errors[0] }}
            </div>
          </ValidationProvider>
          <label for="name">이름</label>
          <ValidationProvider name="이름" rules="required" v-slot="{ errors }">
            <input
              class="form-control"
              type="text"
              v-model="name"
              placeholder="eg. 낙타씨"
            />
            <div v-if="errors[0]" style="color: red; font-size: 14px">
              {{ errors[0] }}
            </div>
          </ValidationProvider>
          <label for="email">이메일</label>
          <ValidationProvider
            name="이메일"
            rules="required|email"
            v-slot="{ errors }"
          >
            <input
              class="form-control"
              type="email"
              v-model="email"
              placeholder="eg. test@test.com"
            />
            <div v-if="errors[0]" style="color: red; font-size: 14px">
              {{ errors[0] }}
            </div>
          </ValidationProvider>
          <label for="age">나이</label>
          <ValidationProvider
            name="나이"
            rules="required|numeric"
            v-slot="{ errors }"
          >
            <input
              class="form-control"
              type="number"
              v-model="age"
              placeholder="eg. 15, 21, 27"
            />
            <div v-if="errors[0]" style="color: red; font-size: 14px">
              {{ errors[0] }}
            </div>
          </ValidationProvider>
          <label for="role">파</label>
          <ValidationProvider
            name="파"
            rules="required-select"
          >
            <select class="form-control" v-model="role">
              <option value="강아지">Dog</option>
              <option value="고양이">Cat</option>
            </select>
          </ValidationProvider>
        </form>
      </div>
      <div slot="footer">
        <div style="display: flex; justify-content: space-between">
          <button
            class="btn"
            :class="{ 'btn-success': !invalid && validate }"
            type="submit"
            form="sign-up"
            :disabled="invalid || !validate"
          >
            회원가입
          </button>
          <button
            class="btn"
            style="background-color: tomato"
            @click.prevent="$emit('close')"
          >
            close
          </button>
        </div>
      </div>
    </Modal>
  </ValidationObserver>
</template>

<script>
import Modal from "./layout/Modal.vue";
import Validate from "../mixin/Validate.vue";

export default {
  components: { Modal },
  mixins: [Validate],
  data() {
    return {
      userid: "",
      name: "",
      password: "",
      email: "",
      age: null,
      role: "",
      valid: false,
    };
  },
  computed: {
    SignUpResult() {
      return this.$store.getters.SignUpResult;
    },
  },
  mounted() {
    this.setupClickOutside(this.$el);
  },
  methods: {
    SignUp() {
      this.$store.dispatch("actUserSignUp", {
        name: this.name,
        userid: this.userid,
        password: this.password,
        email: this.email,
        age: this.age,
        role: this.role,
      });
    },
    setupClickOutside(el) {
      document.querySelector("body").addEventListener("click", (e) => {
        if (document.querySelector(".modal-container")) {
          if (document.querySelector(".modal-container").contains(e.target))
            return;
          else if (el.contains(e.target)) {
            this.$emit("close");
          }
        }
      });
    },
  },
  watch: {
    userid(v) {
      this.valid = v.trim().length > 0;
    },
    SignUpResult(value) {
      if (value !== null) {
        setTimeout(() => {
          this.$emit("close");
        }, 300);
        if (value > 0) {
          // 메세지 출력
          window.alert("회원가입 되었습니다.");
        } else if (value === -1) {
          // 수정이 실패한 경우
          window.alert("이미 가입된 회원 아이디입니다.");
        }
      }
    },
  },
};
</script>

<style src="../assets/style/Signup.css" scoped></style>
