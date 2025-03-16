import { onBeforeMount, ref } from 'vue';
import { MenuParser } from '../utils/MenuParser';

// Find icons here: https://oh-vue-icons.js.org/
export default function useMenu() {
  const manuParser = new MenuParser();

  const menu = ref([]);

  onBeforeMount(() => {
    menu.value = [...manuParser.parseAndBuild()];
  });

  function editMenuItem(key, { title, link, icon }, groupKey) {
    if (groupKey) {
      const groupIndex = menu.value.findIndex((item) => item.key === groupKey);
      updateMenuGroupItemData(groupIndex, key, { title, link, icon });
    } else {
      const itemIndex = menu.value.findIndex((item) => item.key === key);
      updateMenuItemData(itemIndex, { title, link, icon });
    }
  }

  function updateMenuItemData(itemIndex, { title, link, icon }) {
    if (itemIndex >= 0) {
      menu.value[itemIndex] = {
        title: title ? title : menu.value.at(itemIndex).title,
        link: link ? link : menu.value.at(itemIndex).link,
        icon: icon ? icon : menu.value.at(itemIndex).icon,
      };
    }
  }

  function updateMenuGroupItemData(groupIndex, key, { title, link, icon }) {
    if (groupIndex >= 0) {
      const itemIndex = menu.value[groupIndex].subItems.findIndex((si) => si.key === key);
      if (itemIndex >= 0) {
        menu.value[groupIndex].subItems[itemIndex] = {
          title: title ? title : menu.value.at(groupIndex).subItems.at(itemIndex).title,
          link: link ? link : menu.value.at(groupIndex).subItems.at(itemIndex).link,
          icon: icon ? icon : menu.value.at(groupIndex).subItems.at(itemIndex).icon,
        };
      }
    }
  }

  function addGroupItem(groupKey, { key, title, link, icon }) {
    const groupIdx = menu.value.findIndex((item) => item.key === groupKey && item.isGroup);
    menu.value[groupIdx].subItems.push({
      key: key ? key : null,
      title: title ? title : 'Menu Item',
      link: link ? link : '/',
      icon: icon,
    });
  }

  return {
    menu,
    editMenuItem,
    addGroupItem,
  };
}
