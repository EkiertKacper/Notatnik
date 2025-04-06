<script setup>
    const props = defineProps({
        notes: Object
    }); 
</script>

<template>
    <div class="note">
        <h1>{{ props.notes.title }}</h1>
        <p>{{ props.notes.content }}</p>
        <p id="date">{{  }}</p>

    </div> 
</template>

<style scoped>
    .note{
        display: inline-block;
        width: 15vw;
        height: auto;
        min-height: 5rem;
        word-wrap:normal;
        border: 1px solid black;
        break-inside: avoid;
        padding: 1rem;
        margin: 1rem;
    }
    #date{
        color: #00000080;
        text-align: right;
        font-size: 0.8rem;
    }
</style>