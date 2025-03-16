<template>
  <div
    id="burger"
    :class="{
      active: active,
    }"
    @click="toggleActive"
  >
    <button type="button" class="burger-button" title="Menu">
      <span class="burger-bar burger-bar--1"></span>
      <span class="burger-bar burger-bar--2"></span>
      <span class="burger-bar burger-bar--3"></span>
    </button>
  </div>
</template>

<script setup>
const emit = defineEmits(['toggleMenu']);
defineProps({
  active: {
    type: Boolean,
    required: true,
    default: false,
  },
});
function toggleActive() {
  emit('toggleMenu');
}
</script>
<style scoped lang="scss">
.hidden {
  visibility: hidden;
}

button {
  cursor: pointer;
}

/* remove blue outline */
button:focus {
  outline: 0;
}

.burger-button {
  position: relative;
  height: 10px;
  width: 30px;
  display: block;
  z-index: 99;
  border: 0;
  border-radius: 0;
  background-color: transparent;
  pointer-events: all;
  transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.burger-bar {
  background-color: #a1a1aa;
  position: absolute;
  top: 50%;
  right: 6px;
  left: 6px;
  height: 2px;
  border-radius: 2px;
  width: auto;
  margin-top: -1px;
  transition:
    transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1),
    opacity 0.3s cubic-bezier(0.165, 0.84, 0.44, 1),
    background-color 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.burger-bar--1 {
  -webkit-transform: translateY(-6px);
  transform: translateY(-6px);
  top: 40%;
}

.burger-bar--2 {
  transform-origin: 100% 50%;
  transform: scaleX(1);
}

.burger-button:hover .burger-bar--2 {
  transform: scaleX(1);
}

.no-touchevents .burger-bar--2:hover {
  transform: scaleX(1);
}

.burger-bar--3 {
  transform: translateY(6px);
  top: 60%;
}

#burger.active .burger-button {
  transform: rotate(-180deg);
}

#burger.active .burger-bar {
  background-color: #bcbcc2;
}

#burger.active .burger-bar--1 {
  transform: rotate(45deg);
  top: 50%;
}

#burger.active .burger-bar--2 {
  opacity: 0;
}

#burger.active .burger-bar--3 {
  transform: rotate(-45deg);
  top: 50%;
}

@media screen and (max-width: 1024px) {
  #burger {
    display: block;
  }
}

@media screen and (min-width: 1024px) {
  #burger {
    display: none;
  }
}
</style>
