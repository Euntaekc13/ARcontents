<template>
  <div>
    <h1 style="margin-left: 2%">유저 조회</h1>
    <div class="search-engine">
      <input
        class="form-control"
        type="text"
        name="아이디"
        v-model="Search.userid"
        autofocus
        placeholder="아이디"
      />
      <input
        class="form-control"
        type="text"
        name="이름"
        v-model="Search.name"
        autofocus
        placeholder="이름"
      />
      <button class="btn-success" type="submit">Search</button>
      <!-- <p class="loading" v-if="loading">검색 중입니다...</p> -->
    </div>
    <div class="table">
        <div v-for="user in userList" :key="user.id">
            <span style="border: 1px solid #cdd2d4;"> {{ user.id }}</span>
            <span style="border: 1px solid #cdd2d4;"> {{ user.name }}</span>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fields: [
        { key: "id", label: "id" },
        { key: "name", label: "이름" },
        { key: "userid", label: "아이디" },
        { key: "role", label: "권한" },
        { key: "email", label: "이메일" },
        { key: "createdAt", label: "생성일" }
      ],
      Search: {
        name: null,
        userid: null,
      },
    };
  },
  computed: {
    userList() {
      return this.$store.getters.UserList
    },
  },
  created() {
    this.searchUserList()
  },
  methods: {
    searchUserList() {
      this.$store.dispatch('actUserList', this.search)
    },
  }
};
</script>

<style src="../assets/style/user.css" scoped></style>
