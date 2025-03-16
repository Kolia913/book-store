/**
 * @typedef {Object} Module
 * @property {import('vue').DefineComponent} IndexView - The Vue component for the module's index view.
 * @property {import('vue').DefineComponent} ListView - The Vue component for the module's list view.
 * @property {import('vue').DefineComponent} CreateView - The Vue component for the module's create view.
 * @property {import('vue').DefineComponent} EditView - The Vue component for the module's edit view.
 */

export default class AppRouter {
  #routes = [];
  /**
   * Registers a module with corresponding routes in the application.
   *
   * @param {Module} module - The module object containing views and configurations.
   * @param {string} name - The name of the module, used in route paths.
   * @param {Object} options - Additional options for configuring the module registration.
   * @param {string} [options.dynamicRouteParam='id'] - The parameter used for dynamic route paths.
   * @param {Object} options.guards - Guard functions for route navigation.
   * @param {Function|null} [options.guards.beforeEnter=null] - Function to be executed before entering the route.
   */
  registerModule(module, name, { dynamicRouteParam = 'id', guards: { beforeEnter = null } } = {}) {
    /**
     * Represents the routes configuration for the registered module.
     *
     * @type {Object}
     * @property {string} path - The base path for the module's routes.
     * @property {string} name - The name of the module.
     * @property {Object} component - The main component for the module's index view.
     * @property {Function|null} beforeEnter - Function to be executed before entering any route in the module.
     * @property {Array} children - An array of child routes for the module.
     */
    const moduleRoutes = {
      path: `/${name.toLowerCase()}`,
      name,
      component: module.IndexView,
      beforeEnter: beforeEnter ? beforeEnter : undefined,
      children: [
        module.ListView
          ? {
              path: '',
              name: `${name}List`,
              component: module.ListView,
            }
          : undefined,
        module.CreateView
          ? {
              path: 'create',
              name: `${name}Create`,
              component: module.CreateView,
            }
          : undefined,
        module.EditView
          ? {
              path: `:${dynamicRouteParam}/edit`,
              name: `${name}Edit`,
              component: module.EditView,
            }
          : undefined,
      ].filter((item) => item !== undefined),
    };
    this.#routes.push(moduleRoutes);
  }
  /**
   * Registers a module with corresponding routes in the application.
   *
   * @param {Module} menuModule - The module object containing views and configurations.
   * @param {string} menuName - The name of the module, used in route paths.
   * @param {Object} options - Additional options for configuring the module registration.
   * @param {string} [options.dynamicRouteParam='id'] - The parameter used for dynamic route paths.
   * @param {Object} options.guards - Guard functions for route navigation.
   * @param {Function|null} [options.guards.beforeEnter=null] - Function to be executed before entering the route.
   */
  registerMenuModule(
    menuModule,
    menuName,
    { dynamicRouteParam = 'id', guards: { beforeEnter = null } } = {}
  ) {
    /**
     * Represents the routes configuration for the registered module.
     *
     * @type {Object}
     * @property {string} path - The base path for the module's routes.
     * @property {string} name - The name of the module.
     * @property {Object} component - The main component for the module's index view.
     * @property {Function|null} beforeEnter - Function to be executed before entering any route in the module.
     * @property {Array} children - An array of child routes for the module.
     */
    const menuModuleRoutes = {
      path: `/menu/${menuName.toLowerCase()}`,
      name: `Menu${menuName}`,
      component: menuModule.IndexView,
      beforeEnter: beforeEnter ? beforeEnter : undefined,
      children: [
        menuModule.ListView
          ? {
              path: '',
              name: `Menu${menuName}List`,
              component: menuModule.ListView,
            }
          : undefined,
        menuModule.CreateView
          ? {
              path: 'create',
              name: `Menu${menuName}Create`,
              component: menuModule.CreateView,
            }
          : undefined,
        menuModule.EditView
          ? {
              path: `:${dynamicRouteParam}/edit`,
              name: `Menu${menuName}Edit`,
              component: menuModule.EditView,
            }
          : undefined,
      ].filter((item) => item !== undefined),
    };
    this.#routes.push(menuModuleRoutes);
  }

  get routes() {
    return this.#routes;
  }
}
