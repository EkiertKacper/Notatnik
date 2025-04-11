<script setup>
import { ref, onMounted, defineComponent, reactive } from 'vue';
import NoteCreator from './NoteCreator.vue';
import { usePageChanger } from '../store/pageChanger';
import Settings from './Settings.vue';
import Trash from './Trash.vue';
import NotePage from './NotePage.vue';
import { useNoteAdder } from '../store/noteAdder';

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
    pageChange.changePage(notePage)
}

//Stałe i funkcja obsługująca przyciski w navie. Używa pliku pinia pageChanger.js
const settings = defineComponent(Settings)
const trash = defineComponent(Trash)
const notePage = defineComponent(NotePage)
const pageChange = usePageChanger();
const pageChanger = (settings) => {
    pageChange.changePage(settings)
}

const notes = useNoteAdder()
const categories = ref()
const handleCategories = (e) => {
    const catDropdown = document.querySelector('.catDropdown')
    const isOpen = catDropdown.classList.toggle("dropped")
    e.target.classList.toggle("dropped")
    const cat = new Set([...notes.fetchCategoryList()])
    cat.delete(undefined)
    categories.value = [...cat]
    if (isOpen) {
        const height = 3.5 + 3.5 * categories.value.length;
        if(height>28){
            catDropdown.style.overflow = 'auto'
        }
        catDropdown.style.height = `${height}rem`;
    } else {
        catDropdown.style.height = '0';
    }
}


</script>

<template>
    <nav>
        <img id="logo" src="../assets/icon.png" alt="logo" @click="pageChanger(notePage)">
        <button id="hamburgerButton" @click="handleMenu" :style="{display: buttonDisplay}">
            <span class="material-symbols-outlined">menu</span>
        </button>
        <ul class="menu" :style="{display: displayMode}">
            <li><button id="addNoteBut" class="navButton" @click="createNote">Dodaj notatkę</button></li>

            <li id="catDropdownItem">
                <button class="navButton" @click="handleCategories">Kategorie</button>
                <ul class="catDropdown">
                    <button class="catListBut addBut">Dodaj kategorie</button>
                    <button class="catListBut" v-for="category in categories">{{ category }}</button>
                </ul>
            </li>

            <li><button class="navButton">Edytuj kategorie</button></li>
            <li><button class="navButton" @click="pageChanger(trash)">Kosz</button></li>
            <li><button class="navButton" @click="pageChanger(settings)">Ustawienia</button></li>
        </ul>
    </nav>
    <div class="overlay" :style="{display: noteCreatorDisplay}"></div>
    <NoteCreator @close="createNote" :style="{display: noteCreatorDisplay}"/>
</template>

<style lang="scss" scoped>
    ul{
        display: flex;
        width: 100%;
        height: 20%;
        flex-direction: column;
        list-style: none;
        justify-content: space-between;
        align-items: center;
        margin: 10% 0% 10% 0%;
        li{
            display: flex;
            justify-content: center;
            width: 100%;
        }
    }
    #logo{
        margin-top: -5%;
    }

    #hamburgerButton{
        width: 50%;
        margin: 10% 0% 10% 0%;
    }
    .navButton{
        padding: 1rem;
        height: 3.5rem;
        text-wrap: nowrap;
        width: 100%;
        background-color: transparent;
        color: #333333;
        border: none;
        cursor: pointer;
        transition: all 0.2s;
        &:hover{
            background-color: #B38D0A;
            transition: all 0.2s;
            color: #f5f5f5;
        }
        &:active{
            background-color: #BBBBBB;
            transition: 0.1s;
        }
        &.dropped{
            background-color: #B38D0A;
            color: #f5f5f5;
        }
    }
    #catDropdownItem{
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
    }
    .catDropdown{
        display: block;
        color: #333333;
        transform: scaleY(0);
        transform-origin: top;
        margin: 0;
        height: 0;
        transition: transform 0.5s, height 0.5s
    }
    .catDropdown.dropped{
        transform: scaleY(1);
        max-height: 28rem;
    }
    .catListBut{
        background-color: #CCC;
        width: 100%;
        height: 3.5rem;
        border: none;
        padding: 1rem;
        cursor: pointer;
        &.addBut{
            border-bottom: 2px solid #B38D0A;
        }
        &:hover{
            background-color: #AAA;
        }
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

</style>