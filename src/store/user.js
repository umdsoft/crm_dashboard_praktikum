import { defineStore } from "pinia";
import { api } from "@/api";
export const useUserStore = defineStore("user", {
  state: () => ({
    user: {
      firstName: "",
    },
    tokens: {
      accessToken: null,
      refreshToken: null,
    },
  }),
  actions: {
    setUser(user) {
      this.user = user;
    },
    setToken(tokens) {
      this.tokens = tokens;
    },
    logout() {
      this.user = null;
    },
    async getUser() {
      if (this.tokens.accessToken) {
        const res = await api.get("/user/me");
        this.setUser(res.data?.data);
      }
    },
  },

  persist: true,
});
