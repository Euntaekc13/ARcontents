<template>
    <div class="sidebar">
        <div class = sidebar-button>
            <a @click="$router.push('/user')">유저 조회</a>
        </div>
        <div class="sidebar-button">
            <a @click="$router.push('/profile')">프로필 관리</a>
        </div>
    </div>
</template>

<script>
export default {}
</script>

<style src="../../assets/style/sidebar.css" scoped></style>