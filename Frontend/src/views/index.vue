<template>
    <div style="height: 100%">
      <div class="separate-body"></div>
      <div style="display:flex">
          <!-- Side bar -->
            <app-sidebar />
          <!-- Body contents -->
            <div class="content-body">
              <router-view />
            </div>
      </div>
    </div>
  </template>
  
  <script>
  import Sidebar from '../components/layout/Sidebar'
  export default {
    components: {
      'app-sidebar': Sidebar
    }
  }
  </script>
  
  <style lang="scss"></style>
  