<script setup>
import { ref, h, computed, render } from 'vue';
import NoteEditor from './NoteEditor.vue';

    const props = defineProps({
        notes: Object
    }); 

    //Funkcja formatująca date i sprawdzająca w jakim formacie ją wyświetlić w zależności od dnia powstania notatki
    const formattedDate = computed(() => {
    const date = new Date(props.notes.created_at);
    const now = new Date();

    const isToday = 
        date.getDate() === now.getDate() &&
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear();

    if (isToday) {
        const hour = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${hour}:${minutes}`;
    } else {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    }
});

    const isEditorVisible = ref(false)
    const editNote = () => {
        isEditorVisible.value = true
    }
    const editedNote = (editedNote) => {
        props.notes.title = editedNote.title
        props.notes.content = editedNote.content
        props.notes.created_at = new Date()
        isEditorVisible.value = false
    }
</script>

<template>
    <div class="note" @click="editNote">
        <h1>{{ props.notes.title }}</h1>
        <p>{{ props.notes.content }}</p>
        <p id="date">{{ formattedDate }}</p>
    </div>
    <NoteEditor v-if="isEditorVisible" :note="props.notes" @editedNote="editedNote"/>
    <div class="overlay" v-if="isEditorVisible"></div>
</template>

<style scoped>
    :root{
        --background-color: #F5F5F5;
        --light-grey: #DDDDDD;
        --text-color: #333333;
    }

    .note{
        display: inline-block;
        width: 15vw;
        height: auto;
        min-height: 5rem;

        word-wrap:normal;
        break-inside: avoid;
        padding: 1rem;
        margin-top: 1rem;

        background-color: #F5F5F5; 
        border: 1px solid var(--light-grey); 
        font-family: sans-serif; 
        color: var(--text-color); 
        cursor: pointer; 
        border-radius: 5px; 
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        transition: all 0.1s;
    }
    .note:hover{
        box-shadow: 0 4px 8px #b38e0ac2;
        transform: translateY(10px);
        transition: all 0.2s;
    }
    .note:active {
        box-shadow: 0 6px 12px #b38e0ac2;
        transition: all 0.1s;
    }
    #date{
        color: #00000080;
        text-align: right;
        font-size: 0.8rem;
    }
    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.5);
    }
</style>