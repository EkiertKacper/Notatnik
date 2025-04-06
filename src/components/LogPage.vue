<script setup>
    import axios from 'axios';
    import { reactive, ref } from 'vue';

    const { isLogged } = defineProps(['isLogged'])
    const username = ref()
    const password = ref()
    const wrongData = reactive({isWrong: false, message:''})
    const emit = defineEmits();

    const sendData = async () => {
        try{
            const loginData = {
                username: username.value,
                password: password.value
            }
            const res = await axios.post('http://localhost:3000/users', loginData)
            emit('isLogged', !isLogged)
        } catch (error){
            wrongData.isWrong = true
            if (error.response) {
                console.log('Kod błędu:', error.response.status);
                console.log('Treść błędu:', error.response.data.message); 
                wrongData.message = "Zła nazwa użytkownika lub hasło"
            } else if (error.request) {
                console.log('Brak odpowiedzi od serwera');
                wrongData.message = "Błąd serwera. Spróbuj ponownie później"
            } else {
                console.log('Błąd Axios:', error.message);
                wrongData.message = "Coś się spierdoliło na amen"
            }
        }
    }


</script>
<template>
    <div id="logPage">
        <form id="logPage" @submit.prevent="sendData" method="post">
            <label for="username">Nazwa użytkownika</label>
            <input type="text" id="username" name="user" v-model="username">
            <label for="password">Hasło</label>
            <input type="password" id="password" v-model="password">
            <p v-if="wrongData.isWrong">{{ wrongData.message }}</p>
            <button type="submit">Zaloguj</button>
        </form>
    </div>
</template>