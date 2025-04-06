<script setup>
    import axios from 'axios';
    import { reactive, ref } from 'vue';

    const { isLogged } = defineProps(['isLogged'])
    const username = ref()
    const password = ref()
    const password2 = ref()
    const wrongData = reactive({isWrong: false, message:''})
    const isLoggining = ref(true)
    const registered = reactive({registered:false, message:''})
    const emit = defineEmits();

    const sendData = async () => {
        try{
            const loginData = {
                username: username.value,
                password: password.value
            }
            const res = await axios.post('http://localhost:3000/usersLogIn', loginData)
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

    const register = async () => {
        if(password.value === password2.value){
            try{

                    const regData = {
                        username: username.value,
                        password:password.value
                    }
                    console.log(regData)
                    const res = await axios.post('http://localhost:3000/usersRegister', regData)
                    registered.registered = true
                    registered.message = res.data.message
                
            } catch (error){
                console.log(error.message)
            }
        }
    }
    
    const changeState = () => {
        isLoggining.value = !isLoggining.value
    }


</script>
<template>
    <div id="logPage" v-if="isLoggining">
        <form id="logPage" @submit.prevent="sendData" method="post">
            <label for="username">Nazwa użytkownika</label>
            <input type="text" id="username" name="user" v-model="username">
            <label for="password">Hasło</label>
            <input type="password" id="password" v-model="password">
            <p v-if="wrongData.isWrong">{{ wrongData.message }}</p>
            <button type="submit">Zaloguj</button>
            <button type="button" @click="changeState">Zarejestruj</button>
        </form>
    </div>

    <div id="registerPageContainer" v-if="!isLoggining">
        <form id="regPage" @submit.prevent="register" method="post">
            <label for="username">Nazwa użytkownika</label>
            <input type="text" id="username" name="user" v-model="username">
            <label for="password">Hasło</label>
            <input type="password" id="password" v-model="password">
            <label for="password2">Powtórz hasło</label>
            <input type="password" id="password2" v-model="password2">
            <p v-if="registered.registered">{{ registered.message }}</p>
            <button type="submit">Zarejestruj</button>
            <button type="button" @click="changeState">Cofnij</button>
        </form>
    </div>

</template>