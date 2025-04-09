<script setup>
import { ref } from 'vue';
import LogPage from './components/LogPage.vue';
import MainBlock from './components/MainBlock.vue';
import Navbar from './components/Navbar.vue';

const logged = ref(false);

const handleIsLogged = (isLogged) => {
  logged.value = isLogged
}
</script>

<template>
  <div class="container">
    <LogPage v-if="!logged" :isLogged="logged" @isLogged="handleIsLogged"/>
    <Navbar v-if="logged"/>
    <MainBlock v-if="logged"/>
  </div>
</template>

<style lang="scss">
@use './assets/styles/style.scss';  
</style>

<style scoped>
  .container{
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>

