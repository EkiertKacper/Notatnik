import { defineStore } from 'pinia';
import NotePage from '../components/NotePage.vue';
import { defineComponent, markRaw } from 'vue';

export const usePageChanger = defineStore('pageChanger', {
    state: () => ({
        activePage: markRaw(defineComponent(NotePage))
    }),
    actions: {
        changePage(page) {
            this.activePage = markRaw(page)
        }
    },
});