<template>
  <div class="profile">
    <div class="name">프로필 관리</div>
    <div class="input-main">
      <label for="name" class="item">이름</label>
      <input class="form-control" type="text" name="이름" v-model="User.name" placeholder="이름"/>
    </div>
    <div class="input-main">
      <label for="password" class="item">PW</label>
      <input
        class="form-control"
        type="password"
        v-model="User.password"
        placeholder="비밀번호"
      />
    </div>
    <div class="input-main">
      <label for="age" class="item">나이</label>
      <input
        class="form-control"
        type="text"
        name="나이"
        v-model="User.age"
        autofocus
        placeholder="나이"
      />
    </div>
    <div class="input-main">
      <label for="role" class="item">파</label>
      <input
        class="form-control"
        type="text"
        name="파"
        v-model="User.role"
        autofocus
        placeholder="파"
      />
    </div>
    <div class="input-main">
      <label for="email" class="item">이메일</label>
      <input
        class="form-control"
        type="text"
        name="이메일"
        v-model="User.email"
        autofocus
        placeholder="이메일"
      />
    </div>
    <div class="btn-main">
      <form class="main" @submit.prevent="onSubmit">
        <button
          class="btn-"
          :class="{ 'btn-success': !invalidForm }"
          type="submit"
          :disabled="invalidForm"
        >
          Edit Profile
        </button>
      </form>
      <form class="main" @submit.prevent="deleteSubmit">
        <button class="btn-danger" type="submit">Delete Profile</button>
      </form>
    </div>
    <!-- <p class="error" v-if="error">{{ error }}</p> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      User: {
        name: null,
        password: null,
        role: null,
        email: null,
        age: null,
      },
    };
  },
  computed: {
    infoData() {
      return this.$store.getters.ProfileUser;
    },
    updatedResult() {
      return this.$store.getters.ProfileUserUpdatedResult;
    },
    deletedResult() {
      return this.$store.getters.ProfileUserDeletedResult;
    },
    // error() {
    //   return this.$store.getters.TokenError;
    // },
    invalidForm() {
      return (
        !this.User.name ||
        !this.User.password ||
        !this.User.role ||
        !this.User.email ||
        !this.User.age
      );
    },
  },
  created() {
    // 메이지가 최초 열릴 때 감지됨
    this.User = { ...this.infoData };
    this.$store.dispatch("actProfileUserInfo"); // 토큰으로 유저 id 확인하여 정보 호출
  },
  methods: {
    onSubmit() {
      console.log("edit");
      // 입력된 값으로 수정
      this.$store.dispatch("actProfileUserUpdate", this.User);
    },
    deleteSubmit() {
      if (window.confirm("정말로 탈퇴하시겠습니까?")) {
        this.$store.dispatch("actProfileUserDelete");
      }
    },
  },
  watch: {
    // 페이지가 열린 이후에 감지됨
    // error(errValue) {
    //   if (errValue !== null) {
    //     // 메세지 출력
    //     window.alert("수정 오류, 빈 필드가 없게 해주세요");
    //   }
    // },
    updatedResult(value) {
      if (value !== null) {
        setTimeout(() => {
          this.$store.dispatch("actProfileUserInfo");
        }, 300);
        if (value > 0) {
          // 메세지 출력
          window.alert("수정 되었습니다.");
        } else if (value === -1) {
          // 수정이 실패한 경우
          window.alert("수정에 실패하였습니다.");
        }
      }
    },
    deletedResult(value) {
      if (value !== null) {
        setTimeout(() => {
          this.$store.dispatch("authLogout");
          this.$router.push("/");
        }, 300);
        if (value > 0) {
          // 메세지 출력
          window.alert("탈퇴 되었습니다.");
        }
      }
    },
  },
};
</script>

<style src="../assets/style/profile.css" scoped></style>
