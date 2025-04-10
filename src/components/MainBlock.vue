<script setup>
  import { ref, onMounted, watch } from 'vue';
  import axios from 'axios';
  import { useNoteAdder } from '../store/noteAdder';
  import { usePageChanger } from '../store/pageChanger';


  const notes = ref('')
  const noteAdder = useNoteAdder();

  const fetchNotes = async () => {
    try{
      const response = await axios.get('http://localhost:3000/notes')
      notes.value = response.data
    } catch (error){
      console.log('Błąd pobierania danych: ', error)
    }
  }

  onMounted(() => {
    fetchNotes()
  });

  watch(
    () => noteAdder.$state.note,
    () => {
      notes.value.push(noteAdder.fetchNote())
    }
  );

  const pageChange = usePageChanger()
  

</script>

<template>
  <main style="margin-left: 15vw;">
    <component :is="pageChange.activePage"/>
  </main>
</template>