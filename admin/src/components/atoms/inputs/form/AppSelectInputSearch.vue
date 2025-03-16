<template>
  <div v-click-outside="() => closeList()">
    <input
        class="select rounded-lg text-base dark:bg-grey-dark-50 bg-grey-bg border border-solid border-gray-200 dark:border-grey-300 w-full min-h-[38px] pl-3"
        :class="isDarkTheme ? 'dark-input' : 'light-input'"
        type="text"
        :placeholder="!selecteted ? placeholder : ''"
        @focus="toggleOpenList = true"
        v-model="searchText"
        @input="(evt) => (searchText = evt.target.value)"
    />
    <p class="select__selected" v-if="!toggleOpenList && selecteted">
      {{ selecteted[title] }}
    </p>
    <span class="select__arrow"></span>
    <ul
        class="select__list rounded-lg text-base dark:bg-grey-dark-50 bg-grey-bg " 
        v-if="toggleOpenList && options.length"
        ref="selectRef"
        @scroll="handleScroll"
    >
      <li
          class="select__item  text-base dark:bg-grey-dark-50 bg-grey-bg"
          v-for="(item, index) in options"
          :key="'option-' + index"
          @click="choiceItem(item)"
      >
        <p v-if="item">
          {{ item[title] }}
        </p>
      </li>
    </ul>
  </div>
</template>
<script setup>
  import { ref, watch } from 'vue';
  import debounce from "lodash.debounce";
  const toggleOpenList = ref(false);
  const searchText = ref("");
  const emits = defineEmits(["selectEvent", "searchEvent", "scrollEndEvent"]);
  const props = defineProps([
    "selecteted",
    "options",
    "placeholder",
    "title",
    "id",
  ]);
  const selectRef = ref(null);

  watch(
      () => searchText.value,
      debounce(() => {
        emits("searchEvent", searchText.value);
      }, 1000),
  );

  const choiceItem = (item) => {
    closeList();
    emits("selectEvent", item);
  };
  const closeList = () => {
    toggleOpenList.value = false;
    searchText.value = "";
  };
  const handleScroll = () => {
    const select = selectRef.value;
    if (select.scrollTop + select.clientHeight >= select.scrollHeight) {
      emits("scrollEndEvent");
    }
  };
</script>
<style lang="scss" scoped>
  .select {
    width:  100%;
    &__selected { 
      display: flex;
      align-items: center;
      height: 50px;
      position: absolute;
      width: 100%;
      max-width: 90%;
      z-index: 1;
      left: 5px;
      top: 18px;
      font-size: 15px;
      padding-left: 6px;
      white-space: nowrap;
      user-select: none;
      pointer-events: none;
      line-height: 1.2;
      overflow: hidden;
    }
    &__list {
      position: absolute;
      left: 0;
      top: 55px;
      background: white;
      z-index: 50;
      max-height: 50vh;
      max-width: 100%;
      width: 100%;
      overflow-y: auto; 
    }
    &__item {
      color: white;
      padding: 10px 14px;
      &:hover {
        cursor: pointer;
        background: gray;
      }
      p {
        color: currentColor;
        font-size: 15px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        line-height: 1;
      }
    }
    &__arrow{
      position: absolute;
      width: 16px;
      height: 10px;
      right: 6px;
      top: 40px;
      &::before,
      &::after{
        content: '';
        position: absolute;
        width: 10px;
        height: 3px;
        background-color: gray;
      }
      &::before{
        left: 0;
        border-radius: 5px 5px 0 0;
        transform: rotate(45deg);
      }
      &::after{
        right: 0;
        border-radius: 0px 5px 5px 0px;
        transform: rotate(-45deg);
      }
    }
  }
</style>
