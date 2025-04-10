  import { defineStore } from 'pinia';

    export const useNoteAdder = defineStore('noteAdder', {
    state: () => ({
        note: undefined,
        allNotes: undefined
    }),
    actions: {
        addNote(note) {
            this.note = note;
        },
        fetchNote() {
            return this.note
        },
        addAllNotes(notes){
            this.allNotes = notes
        },
        pushNote(note){
            console.log(this.allNotes)
        },
        fetchCategoryList() {
            let categories = new Set()
            this.allNotes.forEach(category => {
                categories.add(category.category)
            });
            categories.delete(null, undefined)
            return categories
        }
    },
    });
