<script setup>
import { ref, onMounted } from 'vue';
import NoteCreator from './NoteCreator.vue';

//Style zmieniające menu w hamburgera
const displayMode = ref('flex');    
const buttonDisplay = ref('block'); 

/**
 * Funkcja obsługująca #hamburgerButton. Działa tylko gdy buttonDisplay = 'block' => gdy szerokość ekranu <=1024px
 * TODO: Na ekranie <=1024 nav ma być hamburger button, który po nacisnieciu ma poszerzać navbar i wyświetlić opcje
*/
const handleMenu = () => {
    if(displayMode.value === 'flex'){
        displayMode.value = 'none'
    } else{
        displayMode.value = 'flex'
    }
}

/**
 * Funkcja zmieniająca właściwości @param displayMode i @param buttonDisplay
 */
const screensize = () => {
    displayMode.value = window.innerWidth <=1024 ? 'none' : 'flex'
    buttonDisplay.value = window.innerWidth <=1024 ? 'block' : 'none'
}

/**
 * Dodaje eventListener, żeby zmienić właściwości @param displayMode i @param buttonDisplay
*/
onMounted(() => {
  screensize();
  window.addEventListener('resize', screensize);
})


//Funkcja obsługująca buttona #addNoteBut. Wyświetla okno noteCreator.
const noteCreatorDisplay = ref('none')
const createNote = () => {
    noteCreatorDisplay.value = noteCreatorDisplay.value === 'none' ? "flex" : "none"
}
</script>

<template>
    <nav>
        <img id="logo" src="../assets/icon.png" alt="logo">
        <button id="hamburgerButton" @click="handleMenu" :style="{display: buttonDisplay}">
            <span class="material-symbols-outlined">menu</span>
        </button>
        <ul class="menu" :style="{display: displayMode}">
            <li><button id="addNoteBut" class="navButton" @click="createNote">Dodaj notatkę</button></li>
            <li>
                <button class="navButton">Kategorie</button>
                <ul id="catDropdown">
            
                </ul>
            </li>
            <li><button class="navButton">Edytuj kategorie</button></li>
            <li><button class="navButton">Kosz</button></li>
            <li><button class="navButton">Ustawienia</button></li>
        </ul>
    </nav>
    <div class="overlay" :style="{display: noteCreatorDisplay}"></div>
    <NoteCreator @close="createNote" :style="{display: noteCreatorDisplay}"/>
</template>

<style scoped>
    ul{
        display: flex;
        width: 100%;
        height: 20%;
        flex-direction: column;
        list-style: none;
        justify-content: space-between;
        align-items: center;
        margin: 10% 0% 10% 0%;
    }
    ul li{
        display: flex;
        justify-content: center;
    }
    #logo{
        margin-top: -5%;
    }

    #hamburgerButton{
        width: 50%;
        margin: 10% 0% 10% 0%;
    }
    li{
        width: 100%;
    }
    .navButton{
        padding: 1rem;
        text-wrap: nowrap;
        width: 100%;
        background-color: transparent;
        color: #333333;
        border: none;
        cursor: pointer;
        transition: all 0.2s;
    }
    .navButton:hover{
        background-color: #B38D0A;
        transition: all 0.2s;
        color: #f5f5f5;
    }
    .navButton:active{
        background-color: #BBBBBB;
        transition: 0.1s;
    }


    /**
        * TODO: Zrób dropdown
    */
    #catDropdown{
        display: none;
    }
    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.5);
    }
    @media (max-width: 1024px){
        #logo{
            width: 90%;
        }

    }
    @media (max-width: 767px){

    }
    @media (max-width: 480px) {

    }

</style>