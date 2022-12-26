<template>
  <div>
    <h1 style="margin-left: 2%">유저 조회</h1>
    <p class="loading" style="margin-left: 2%" v-if="loading">
      검색 중입니다...
    </p>
    <div v-else>
      <form
        type="submit"
        @submit.prevent="searchUserList"
      >
        <div class="search-engine">
          <input
            class="form-control"
            type="text"
            name="이름"
            v-model="Search.name"
            autofocus
            placeholder="이름"
          />
          <input
            class="form-control"
            type="text"
            name="아이디"
            v-model="Search.userid"
            autofocus
            placeholder="아이디"
          />
          <button class="btn-success" style="margin-left:2%" type="submit">Search</button>
        </div>
      </form>
      <table class="table">
        <tr style="background-color: rgba(0, 200, 0, 0.1);">
          <td class="table-section-name">이름</td>
          <td class="table-section-userid">아이디</td>
          <td class="table-section-role">파</td>
          <td class="table-section-age">나이</td>
          <td class="table-section-email">이메일</td>
          <td class="table-section-date">생성일자</td>
        </tr>
        <tr v-for="user in userList" :key="user.id">
          <td class="table-section-name">{{ user.name }}</td>
          <td class="table-section-userid">{{ user.userid }}</td>
          <td class="table-section-role">{{ user.role }}</td>
          <td class="table-section-age">{{ user.age }}</td>
          <td class="table-section-email">{{ user.email }}</td>
          <td class="table-section-date">{{ user.createdAt }}</td>
        </tr>
      </table>
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
        { key: "age", label: "나이" },
        { key: "role", label: "권한" },
        { key: "email", label: "이메일" },
        { key: "createdAt", label: "생성일" },
      ],
      Search: {
        name: null,
        userid: null,
      },
    };
  },
  computed: {
    userList() {
      return this.$store.getters.UserList;
    },
    loading() {
      return this.$store.getters.SearchLoading;
    },
  },
  created() {
    this.searchUserList();
  },
  methods: {
    searchUserList() {
      this.$store.dispatch("actUserList", this.Search);
    },
  },
};
</script>

<style src="../assets/style/user.css" scoped></style>
