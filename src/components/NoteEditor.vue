<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';

    const props = defineProps({
      note:Object
    });

    const title = ref()
    const content = ref()
    const emit = defineEmits();

    onMounted(()=>{
        title.value.value = props.note.title
        content.value.value = props.note.content
    })

    const confirm = async () => {
        if(title.value.value === '' || content.value.value === ''){
            alert("Notatka nie może być pusta");
            emit('editedNote')
        }else{
            try {
                const noteData = {
                    title: title.value.value,
                    content: content.value.value
                };
                await axios.put(`http://localhost:3000/noteEdit/${props.note.id}`, noteData);
                emit('editedNote', noteData)
            } catch (error) {
              console.error('Błąd wysyłania notatki:', error);
              alert('Wystąpił błąd podczas wysyłania notatki.');
            }

        }
    }
</script>
<template>
    <div class="container">
        <div class="inputs">
            <input ref="title" type="text" id="title" placeholder="Tytuł">
            <textarea ref="content" name="note" id="noteArea" placeholder="Treść"></textarea>
        </div>
        <button @click="confirm">Zmień notatkę</button>
    </div>
    <div class="overlay"></div>
</template>
<style scoped>
    .container{
        position: fixed; 
        top: 50%;
        left:50%;
        transform: translate(-50%, -50%);
        width: 40vw;
        height: 50vh;
        padding: 20px;
        z-index: 1000; 
        background: #F5F5F5;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: 0.2rem;
    }
    .inputs{
        border: 1px solid #333333;
        border-radius: 0.2rem;
        width: 100%;
        height: 85%;
    }
    input{
        width: 100%;
        height: 15%;
        font-size: 24px;
        text-align: center;
        border: none;
    }
    textarea{
        width: 100%;
        height: 85%;
        font-size: 20px;
        padding: 0.5rem;
        border: none;
        border-top: 1px solid #333333;
        resize: none;
    }
    button{
        text-wrap: nowrap;
        width: 100%;
        height: 15%;
        background-color: transparent;
        color: #333333;
        border: none;
        border-bottom-left-radius: 0.2rem;
        border-bottom-right-radius: 0.2rem;

    }
    button:hover{
        background-color: #B38D0A;
        color: #f5f5f5;
        transition: 0.1s ease;
    }
    button:active{
        background-color: #BBBBBB;
        transition: 0s;
    }
    @media (max-width: 1024px){
        .container{
            width: 70vw;
            height: 40vh;
        }
        textarea, input{
            font-size: 16px;
        }
        textarea{
            height:80%;
        }
        input{
            height: 20%;
        }
        button{
            height: 20%;
        }
        .inputs{
            height: 80%;
        }
    }

    

</style>