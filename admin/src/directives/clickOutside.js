export default {
  install(app) {
    app.directive('click-outside', {
      mounted(el, binding) {
        el.__ClickOtsideHandler = (event) => {
          if (!(el === event.target || el.contains(event.target))) {
            binding.value(event);
          }
        };
        setTimeout(() => {
          document.body.addEventListener('click', el.__ClickOtsideHandler);
        }, 100);
      },
      unmounted(el) {
        document.body.removeEventListener('click', el.__ClickOtsideHandler);
      },
    });
  },
};
