<script setup>
  import { usePageChanger } from '../store/pageChanger';

  const pageChange = usePageChanger()
</script>

<template>
  <main style="margin-left: 15vw;">
    <component :is="pageChange.activePage"/>
  </main>
</template>