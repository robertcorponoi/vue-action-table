'use strict'

import VueActionTable from './components/VueActionTable.vue';

/**
 * VueActionTable is an easy to use responsive table with the ability to add 
 * action buttons to each row.
 */
export default {
  /**
   * @param {Vue} Vue The Vue instance to bind this plugin to.
   */
  install(Vue) {

    /**
     * We need to add the VueSuperSlider component to the Vue instance.
     */
    Vue.component(VueActionTable);
  }
};

export { VueActionTable };