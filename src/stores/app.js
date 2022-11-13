import { defineStore } from 'pinia';
import axios from 'axios';
import { io } from 'socket.io-client';
import { Notify } from 'quasar';
import { i18n } from '@/boot/i18n.js';
const $t = i18n.global.t;

export const useAppStore = defineStore('app', {
  state: () => ({
    jwt: sessionStorage.getItem('jwt'),
    socket: null,
    locations: []
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

      this.jwt = response.data.token;

      sessionStorage.setItem('jwt', this.jwt);
      this.connect();
    },
    logout() {
      this.jwt = null;
      sessionStorage.removeItem('jwt');
    },
    connect() {
      let protocol = 'wss://';
      let url = location.hostname;

      if (import.meta.env.VITE_BASE_URL.startsWith('http://')) {
        protocol = 'ws://';
        url = import.meta.env.VITE_BASE_URL.replace('http://', '');
      }
      const socket = io(`${protocol}${url}`, {
        reconnectionDelayMax: 10000,
        auth: { token: `Bearer ${this.jwt}` }
      });

      socket.on('connect', () => {
        this.socket = socket;
      });

      socket.on('connect_error', () => {
        this.socket = null;
      });

      socket.on('locations', (locations) => {
        this.locations = locations;
      });

      socket.on('error', (data) => {
        Notify.create({
          type: 'negative',
          message: $t(data)
        });
      });
    },
    sendSocket(event, data) {
      if (this.socket) {
        this.socket.emit(event, data);
      }
    }
  }
});
