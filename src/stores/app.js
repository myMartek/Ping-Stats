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
    locations: [],
    duration: 30
  }),
  getters: {
    loggedIn() {
      return this.jwt !== null;
    },
    maxDuration() {
      return this.locations.reduce((max, location) => {
        if (location.history.length === 0) {
          return max;
        }

        let lastValue = location.history[location.history.length - 1];

        if (typeof lastValue !== 'number') {
          lastValue = lastValue[0];
        }

        return Math.max(max, lastValue);
      }, 0);
    },
    maxMS() {
      let ret = this.locations.reduce((max, location) => {
        if (location.history.length === 0) {
          return max;
        }

        let maxValue = Math.max(...location.history.filter(e => typeof e !== 'number').map(e => e[1]));

        return Math.max(max, maxValue);
      }, 0);

      return ret + (ret * 0.1);
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

      socket.on('ping', (data) => {
        const location = this.locations.find((l) => l.address === data.address);

        if (location) {
          location.history.push(data.value);
        }
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
