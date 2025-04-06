<script setup>
  import { ref, onMounted, watch } from 'vue';
  import Note from './note.vue';
  import axios from 'axios';
  import { useNoteAdder } from '../store/noteAdder';


  const notes = ref()
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

</script>

<template>
    <main>
      <div class="notesContainer" v-for="(note) in notes">
        <Note :notes="note"/>
      </div>
    </main>
</template>

<style scoped>
  main{
    column-count: 4;
    column-gap: 0rem;
    padding: 1rem 5rem 1rem 5rem;
  }

</style>