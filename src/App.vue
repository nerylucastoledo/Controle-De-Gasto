<template>
  <div id="app">

    <Header/>

    <transition mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>

import Header from '@/components/Header.vue'

export default {
  components: {
    Header,
  },

  created() {
    const loginUser = localStorage.getItem('login')

    this.$store.state.user.displayName = localStorage.getItem('displayName')
    
    if(!loginUser) {
      this.$router.replace({ name: "Login" });
    }
  }
}
</script>

<style>

@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');

/* ALL */
body, a, ul, li, h1, h2, h3, p, img {
  margin: 0;
  padding: 0;
  list-style: none;
  font-family: 'Montserrat';
  box-sizing: border-box;
}

.container {
  max-width: 100%;
  margin: 0 auto;
  padding: 0px 15px;
}

.titulo, .titulo-card {
  font-size: 2rem;
  text-align: center;
}

.titulo {
  color: #B9DD2A;
  margin-bottom: 40px;
  margin-top: 60px;
  font-weight: bold;
}

.botao {
  width: 200px;
  color: #fff;
  background-color: #B9DD2A;
  font-size: 18px;
  border: none;
  border-radius: 10px;
  padding: 10px 0;
  display: block;
  margin: 40px auto 40px;
}

.v-enter,
.v-leave-to {
  opacity: 0;
}
.v-enter {
  transform: translate3d(0, -20px, 0);
}
.v-leave-to {
  transform: translate3d(0, 20px, 0);
}
.v-enter-active,
.v-leave-active {
  transition: all 0.3s;
}

</style>
