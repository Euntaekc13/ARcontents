import api from "../apiUtil";

const stateInit = {
  ProfileUser: {
    id: null,
    name: null,
    userid: null,
    password: null,
    role: null,
    email: null,
    age: null,
    createdAt: null,
    updatedAt: null,
  },
};

export default {
  state: {
    ProfileUser: { ...stateInit.ProfileUser },
    UpdatedResult: null,
    DeletedResult: null,
  },
  getters: {
    ProfileUser: state => state.ProfileUser,
    ProfileUserUpdatedResult: state => state.UpdatedResult,
    ProfileUserDeletedResult: state => state.DeletedResult,
  },
  mutations: {
    setProfileUser(state, data) {
      state.ProfileUser = data;
    },
    setUpdatedResult(state, data) {
      state.UpdatedResult = data;
    },
    setDeletedResult(state, data) {
      state.DeletedResult = data
    },
  },
  actions: {
    // 프로필 정보 조회
    async actProfileUserInfo(context, payload) {
      // 상태값 초기화
      context.commit("setProfileUser", { ...stateInit.ProfileUser });

      /* RestAPI 호출 */
      await api
        .get(`/serverApi/users`)
        .then((response) => {
          const profileuser = response && response.data;
          console.log(profileuser);
          context.commit("setProfileUser", profileuser);
        })
        .catch((error) => {
          // 에러인 경우 처리
          console.error("ProfileUserInfo.error", error);
          context.commit("setProfileUser", -1);
        });
    },
    // 프로필 정보 수정
    actProfileUserUpdate(context, payload) {
      // 상태값 초기화
      context.commit("setUpdatedResult", null);

      /* RestAPI 호출 */
      api
        .put(`/serverApi/users`, payload)
        .then((response) => {
          const updatedResult =
            response && response.data && response.data.updatedCount;
          context.commit("setUpdatedResult", updatedResult);
        })
        .catch((error) => {
          context.commit("setUpdatedResult", error.response.data);
        });
    },
    // 삭제
    actProfileUserDelete(context, payload) {
      // 상태값 초기화
      context.commit('setDeletedResult', null)
      /* RestAPI 호출 */
      api
        .delete(`/serverApi/users`)
        .then(response => {
          const deletedResult = response && response.data && response.data.deletedCount
          context.commit('setDeletedResult', deletedResult)
        })
    }
  },
};
