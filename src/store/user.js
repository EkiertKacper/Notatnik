  import { defineStore } from 'pinia';

    export const useUser = defineStore('userSetter', {
    state: () => ({
        userID: undefined
    }),
    actions: {
        setUser(userID){
            this.userID = userID
        }
    },
    });
