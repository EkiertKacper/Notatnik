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
    <div id="logPageContainer" v-if="isLoggining">
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
<style scoped>
:root{
    --background-color: #F5F5F5;
    --light-grey: #DDDDDD;
    --text-color: #333333;
}
#logPageContainer, #registerPageContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh; /* Wyśrodkowanie na całą wysokość ekranu */
  background-color: #f5f5f5;
  padding: 20px;
}

#logPage, #regPage {
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 300px; /* Możesz dostosować szerokość formularza */
}

#logPage label, #regPage label {
  display: block;
  margin-bottom: 8px;
  color: #333;
}

#logPage input, #regPage input {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #DDDDDD;
  border-radius: 4px;
}

#logPage button, #regPage button {
  background-color: #B38D0A;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-right: 10px;
}

#logPage button:hover, #regPage button:hover {
  background-color: #967408; /* Ciemniejszy odcień żółtego na hover */
}

#logPage p, #regPage p {
  color: red; /* Kolor komunikatów o błędach */
  margin-bottom: 15px;
}

#logPage button:last-child, #regPage button:last-child {
  background-color: var(--light-grey);
  color: var(--text-color);
}

#logPage button:last-child:hover, #regPage button:last-child:hover {
  background-color: #CCCCCC;
}
</style>