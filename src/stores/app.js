import { defineStore } from 'pinia';
import axios from 'axios';

export const useAppStore = defineStore('counter', {
  state: () => ({
    jwt: sessionStorage.getItem('jwt')
  }),
  getters: {
    loggedIn() {
      return this.jwt !== null;
    }
  },
  actions: {
    async login(username, password) {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL || ''}/api/login`, {
        username,
        password
      });

      this.jwt = response.data.jwt;
      sessionStorage.setItem('jwt', this.jwt);
    }
  }
});
