/**
 * A class for building menu structures for an application.
 */
class MenuBuilderImpl {
  /**
   * Type definition for a menu item.
   * @typedef {Object} MenuItem
   * @property {string} icon - The icon for the menu item.
   * @property {boolean} isGroup - Indicates whether the item is a group.
   * @property {string} title - The title of the menu item.
   * @property {string} link - The link associated with the menu item.
   * @property {string|null} [key=null] - The unique key for the menu item. Optional.
   */

  /**
   * Type definition for a menu group.
   * @typedef {Object} MenuGroup
   * @property {boolean} isGroup - Always true to indicate it's a group.
   * @property {string} title - The title of the group.
   * @property {string|null} [key=null] - The unique key for the group. Optional.
   * @property {MenuItem[]} subItems - The sub-items belonging to the group.
   */

  /**
   * The internal representation of the menu being built.
   * @type {Array<MenuItem|MenuGroup>}
   * @private
   */
  #menu = [];

  /**
   * Represents the currently pending menu item being processed.
   * @type {MenuItem|MenuGroup|null}
   * @private
   */
  #pendingItem = null;

  /**
   * Indicates whether a menu group is currently being processed.
   * @type {boolean}
   * @private
   */
  #isGroupProcessing = false;

  // Menu item identity. Autoincremented!
  static #id = 0;

  /**
   * Adds a new group to the menu.
   * @param {string} title - The title of the group.
   * @param {string|null} [key=null] - The unique key for the child menu item. If not provided, defaults to null.
   * @returns {MenuBuilderImpl} The MenuBuilderImpl instance for method chaining.
   */
  addGroup(title = '', key = null) {
    this.#isGroupProcessing = true;
    const menuGroup = {
      id: MenuBuilderImpl.#id,
      isGroup: true,
      title: title,
      isOpen: false,
      key,
      subItems: [],
    };
    this.#pendingItem = menuGroup;
    this.#menu.push(this.#pendingItem);
    this.#pendingItem = null;
    MenuBuilderImpl.#id++;
    return this;
  }

  /**
   * Ends the processing of the current group.
   * @returns {MenuBuilderImpl} The MenuBuilderImpl instance for method chaining.
   */
  endGroup() {
    this.#isGroupProcessing = false;
    return this;
  }

  /**
   * Mounts the pending item onto the menu structure.
   * @returns {MenuBuilderImpl} The MenuBuilderImpl instance for method chaining.
   */
  mount(groupKey = null) {
    if (this.#isGroupProcessing) {
      this.#menu.at(this.#menu.length - 1)?.subItems?.push({ ...this.#pendingItem });
    } else {
      if (groupKey) {
        const groupIndex = this.#menu?.findIndex((item) => item.key === groupKey);
        if (groupIndex >= 0 && this.#menu[groupIndex]?.isGroup) {
          this.#menu[groupIndex]?.subItems?.push(this.#pendingItem);
        } else {
          throw new Error('Invalid group key, or item with provided key is not a group!');
        }
      } else {
        this.#menu.push(this.#pendingItem);
      }
    }
    this.#pendingItem = null;
    MenuBuilderImpl.#id++;
    return this;
  }

  /**
   * Adds a child menu item.
   * @param {string|null} [key=null] - The unique key for the child menu item. If not provided, defaults to null.
   * @returns {MenuBuilderImpl} The MenuBuilderImpl instance for method chaining.
   */
  addChild(key = null) {
    const menuItem = {
      id: MenuBuilderImpl.#id,
      icon: '',
      isGroup: false,
      title: 'Title',
      link: '/',
      key,
    };
    this.#pendingItem = menuItem;
    return this;
  }

  /**
   * Sets the link for the current pending item.
   * @param {string} link - The link to be set for the pending item.
   * @returns {MenuBuilderImpl} The MenuBuilderImpl instance for method chaining.
   */
  addLink(link) {
    if (this.#pendingItem && !this.#pendingItem.isGroup) {
      this.#pendingItem.link = link;
    }
    return this;
  }

  /**
   * Sets the icon for the current pending item.
   * @param {string} icon - The icon to be set for the pending item.
   * @returns {MenuBuilderImpl} The MenuBuilderImpl instance for method chaining.
   */
  addIcon(icon) {
    if (this.#pendingItem && !this.#pendingItem.isGroup) {
      this.#pendingItem.icon = icon;
    }
    return this;
  }

  /**
   * Sets the title for the current pending item.
   * @param {string} title - The title to be set for the pending item.
   * @returns {MenuBuilderImpl} The MenuBuilderImpl instance for method chaining.
   */
  addTitle(title) {
    if (this.#pendingItem) {
      this.#pendingItem.title = title;
    }
    return this;
  }

  /**
   * Finalizes the menu building process and returns the constructed menu.
   * @returns {Array<Object>} The constructed menu.
   */
  quit() {
    return this.menu;
  }

  /**
   * Gets the constructed menu.
   * @type {Array<Object>}
   */
  get menu() {
    return this.#menu;
  }

  /**
   * Makes menu array empty
   */
  clearMenu() {
    this.#menu = [];
  }
}

export const MenuBuilderInstance = new MenuBuilderImpl();
/**
 * @type {MenuBuilderImpl}
 */
export const _MenuBuilder = MenuBuilderImpl;
