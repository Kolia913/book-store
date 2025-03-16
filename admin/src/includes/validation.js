import { configure } from 'vee-validate';

export default {
  install() {
    configure({
      validateOnBlur: true,
      validateOnChange: true,
      validateOnInput: false,
      validateOnModelUpdate: true,
    });
  },
};
