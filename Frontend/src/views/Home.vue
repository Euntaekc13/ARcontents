<template>
  <div>
    <h1 style="margin-left: 2%">Home</h1>
    <div style="display:flex;">
      <div class="main">
        <AR/>
      </div>
      <div style="margin-left:5%">togle box</div>
    </div>
  </div>
</template>

<script>
import AR from '../components/Ar.vue'
export default {
  components:{
    AR
  }
}
</script>

<style src="../assets/style/Home.css" scoped></style>