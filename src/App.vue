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
  max-width: 600px;
  margin: 0 auto;
  padding: 0px 30px;
}

/* TITLE */
.title {
  margin-top: 40px;
  text-align: center;
  font-size: 2rem;
  color: #097a7e;
}

/* BUTTON */
.btn-save {
  display: block;
  margin: 20px auto;
  width: 200px;
  padding: 5px 0;
  font-size: 1.6rem;
  box-sizing: border-box;
  border-radius: 5px;
  border: none;
  background-image: linear-gradient(to right, rgb(226, 219, 219),  #ffffff );
  color: #097a7e;
  cursor: pointer;
}

/* NOT FOUND */
.not-found {
  text-align: center;
  margin-bottom: 20px;
  color: red;
  margin-top: 40px;
  font-size: 1.2rem;
}

.v-enter, .v-leave-to {
  opacity: 0;
}

.v-enter {
  transform: translate3d(0, -20px, 0);
}

.v-leave-to {
  transform: translate3d(0, 20px, 0);
}

.v-enter-active, .v-leave-active {
  transition: all 0.3s;
}

</style>
