<template>
  <svg
    version="1.1"
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 102.55 122.88"
    style="enable-background: new 0 0 102.55 122.88"
    xml:space="preserve"
    :fill="color ? color : '#A1A1AA'"
  >
    <g>
      <path
        class="st0"
        d="M102.55,122.88H0V0h77.66l24.89,26.44L102.55,122.88L102.55,122.88z M96.13,115.98V30.44H73.44V5.91H6.51 v110.07H96.13L96.13,115.98z"
      />
    </g>
  </svg>
</template>
<script>
export default {
  name: 'DirectIcon',
  props: ['color'],
};
</script>
<style lang="scss" scoped>
.line {
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 32px;
}
.st0 {
  fill-rule: evenodd;
  clip-rule: evenodd;
}
</style>
