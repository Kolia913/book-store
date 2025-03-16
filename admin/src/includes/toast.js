import Toast, { POSITION } from 'vue-toastification';
// Import the CSS or use your own!
import 'vue-toastification/dist/index.css';

export default {
  install(app) {
    app.use(Toast, {
      position: POSITION.BOTTOM_RIGHT,
    });
  },
};
