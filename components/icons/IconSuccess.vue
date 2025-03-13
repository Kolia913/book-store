<template>
  <svg
    width="110"
    height="110"
    viewBox="0 0 110 110"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="icon"
    ref="svg"
  >
    <path
      class="circle"
      d="M100.833 50.7833V55C100.828 64.8836 97.6271 74.5006 91.7093 82.4167C85.7914 90.3328 77.4732 96.1239 67.9952 98.9262C58.5172 101.729 48.3873 101.392 39.1162 97.9669C29.845 94.5417 21.9295 88.2113 16.5501 79.9199C11.1706 71.6285 8.61555 61.8203 9.26586 51.9581C9.91616 42.0959 13.737 32.7082 20.1586 25.1949C26.5802 17.6817 35.2584 12.4455 44.899 10.2673C54.5396 8.08918 64.6261 9.08572 73.654 13.1083"
      stroke="#ABE19D"
      stroke-width="6"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      class="checkmark"
      d="M100.833 18.3333L54.9999 64.2125L41.2499 50.4625"
      stroke="#ABE19D"
      stroke-width="6"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script>
export default {
  mounted() {
    const circle = this.$refs.svg.querySelector(".circle");
    const checkmark = this.$refs.svg.querySelector(".checkmark");
    const circleLength = circle.getTotalLength();
    const checkmarkLength = checkmark.getTotalLength();

    circle.style.strokeDasharray = circleLength;
    circle.style.strokeDashoffset = circleLength;
    checkmark.style.strokeDasharray = checkmarkLength;
    checkmark.style.strokeDashoffset = checkmarkLength;
  },
};
</script>

<style scoped>
.icon {
  opacity: 0;
  animation: appear 0.5s ease forwards 0.2s;
}
.circle {
  animation: draw 0.5s ease forwards 0.4s;
}

.checkmark {
  animation: draw 0.8s ease forwards 0.6s;
}

@keyframes appear {
  to {
    opacity: 1;
  }
}
@keyframes draw {
  to {
    stroke-dashoffset: 0;
  }
}
</style>
