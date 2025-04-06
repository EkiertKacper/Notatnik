  import { defineStore } from 'pinia';

    export const useNoteAdder = defineStore('noteAdder', {
    state: () => ({
        note: undefined
    }),
    actions: {
        addNote(note) {
            this.note = note;
        },
        fetchNote() {
            return this.note
        }
    },
    });
