<template>
  <NavBarVue v-if="$route.name !== 'signIn'"/>
  <router-view/>
</template>

<script>

import NavBarVue from './components/NavBar.vue';
  
export default {
    components: {
      NavBarVue
    }
  }

</script>



<style>
html, body {
  margin: 0px !important;
  padding: 0px !important;
}

</style>
