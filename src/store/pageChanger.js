import { defineStore } from 'pinia';
import NotePage from '../components/NotePage.vue';
import { defineComponent } from 'vue';

export const usePageChanger = defineStore('pageChanger', {
    state: () => ({
        activePage: defineComponent(NotePage)
    }),
    actions: {
        changePage(page) {
            console.log("gowno")
            this.activePage = page
        }
    },
});