import menuRawData from '/menu.json';
// eslint-disable-next-line no-unused-vars
import { MenuBuilderInstance, _MenuBuilder } from './MenuBuilder';

/**
 * A class for parsing menu raw data and building a menu structure using a MenuBuilder.
 */
export class MenuParser {
  /**
   * The MenuBuilder instance used for building the menu structure.
   * @type {_MenuBuilder}
   * @private
   */
  #builder;

  constructor() {
    this.#builder = MenuBuilderInstance;
  }

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
   * Parses the menu raw data and builds the menu structure.
   * @returns {Array<MenuItem|MenuGroup>} The constructed menu structure.
   */
  parseAndBuild() {
    this.#builder.clearMenu();
    for (let item of menuRawData) {
      if (item.isGroup) {
        this.#createGroup(item);
      } else {
        this.#craeteItem(item);
      }
    }
    return this.#builder.quit();
  }

  /**
   * Creates a group in the menu structure.
   * @param {MenuGroup} group - The group object containing group information.
   * @private
   */
  #createGroup(group) {
    this.#builder.addGroup(group.title, group?.key ? group.key : null);
    if (group?.subItems) {
      for (let groupItem of group.subItems) {
        this.#craeteItem(groupItem);
      }
      this.#builder.endGroup();
    }
  }

  /**
   * Creates an item in the menu structure.
   * @param {MenuItem} item - The item object containing item information.
   * @private
   */
  #craeteItem(item) {
    this.#builder
      .addChild(item?.key ? item.key : null)
      .addLink(item.link)
      .addIcon(item.icon)
      .addTitle(item.title)
      .mount();
  }
}
