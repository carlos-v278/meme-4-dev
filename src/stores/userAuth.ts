import { defineStore } from 'pinia';
interface userAuth {
  connected: boolean,
}

export const useUserAuth = defineStore('userAuth', {
  state: (): userAuth => ({
    connected: false,


  }),
  getters: {
    getUserConnected: (state: userAuth):boolean => {
      return state.connected;
    },

  },
  actions: {
    connectUser(): void {
      this.connected = true;
    },
    disconnectUser(): void {
      this.connected = false;
    },
  }
});
