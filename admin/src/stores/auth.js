import { defineStore } from 'pinia';
import { useToast } from 'vue-toastification';
import useAuth from '@/core/composables/useAuth';
import useAppConfig from '@/core/composables/useAppConfig';

const toast = useToast();

export default defineStore('auth', () => {
  const config = useAppConfig();
  const auth = useAuth({
    loginUrl: '/admin/auth',
  });

  async function login({ username, password }) {
    try {
      await auth.login(username, password);
      toast.success('Вітання!');
    } catch (e) {
      toast.error(e.message);
      throw new Error(e.message);
    }
  }

  async function logout() {
    try {
      const res = await auth.logout();
      toast.success(res.data.message);
    } catch (e) {
      // toast.error(e.message)
      // throw new Error(e.message);
      console.info(e.message);
    } finally {
      localStorage.removeItem(`${config.tokenName}`);
    }
  }

  return { login, logout };
});
