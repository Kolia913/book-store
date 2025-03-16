export default function useExpandAnimation() {
  function enter(el) {
    el.style.height = 'auto';
    const height = getComputedStyle(el).height;
    el.style.height = 0;
    /*
      Force the repaint to make sure the animation is triggered correctly,
      then you can fire the method getComputedStyle again.
      This is not necessary, but sometimes the animation may not start depending on the case.
    */
    getComputedStyle(el);
    /*
      Set the height from the element to the calculated height.
      With setTimeout you make sure the browser has finished the painting
      after setting the height to zero.
    */
    setTimeout(() => {
      el.style.height = height;
    });
  }
  function afterEnter(el) {
    el.style.height = 'auto';
  }
  function leave(el) {
    /*
      Same as with the enter method, but only the other way around.
    */
    el.style.height = getComputedStyle(el).height;

    getComputedStyle(el);

    setTimeout(() => {
      el.style.height = 0;
    });
  }
  return {
    enter,
    afterEnter,
    leave,
  };
}
