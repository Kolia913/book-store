<template>
  <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" :fill="color ? color : '#A1A1AA'">
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
    <g id="SVGRepo_iconCarrier">
      <title>ionicons-v5-h</title>
      <rect
        x="32"
        y="64"
        width="448"
        height="320"
        rx="32"
        ry="32"
        :stroke="color ? color : '#A1A1AA'"
        style="fill: none; stroke-linejoin: round; stroke-width: 32px"
      ></rect>
      <polygon
        points="304 448 296 384 216 384 208 448 304 448"
        :stroke="color ? color : '#A1A1AA'"
        style="stroke-linecap: round; stroke-linejoin: round; stroke-width: 32px"
      ></polygon>
      <line
        x1="368"
        y1="448"
        x2="144"
        y2="448"
        :stroke="color ? color : '#A1A1AA'"
        class="line"
      ></line>
      <path
        d="M32,304v48a32.09,32.09,0,0,0,32,32H448a32.09,32.09,0,0,0,32-32V304Zm224,64a16,16,0,1,1,16-16A16,16,0,0,1,256,368Z"
      ></path>
    </g>
  </svg>
</template>
<script>
export default {
  name: 'DesktopIcon',
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
</style>
