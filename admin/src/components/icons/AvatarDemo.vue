<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    width="64px"
    height="64px"
    viewBox="0 0 64 64"
    version="1.1"
  >
    <rect fill="#09090b" cx="32" width="64" height="64" cy="32" r="32" />
    <text
      x="50%"
      y="50%"
      class="icon-rect"
      alignment-baseline="middle"
      text-anchor="middle"
      font-size="28"
      font-weight="400"
      dy=".1em"
      dominant-baseline="middle"
      fill="#FFFFFF"
    >
      DU
    </text>
  </svg>
</template>

<script>
export default {
  name: 'AvatarDemo',
};
</script>

<style lang="scss" scoped>
.icon-rect {
  color: #ffffff;
  line-height: 1;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
    'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
}
</style>
