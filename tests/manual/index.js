'use strict'

import VueActionTable from '../../tests/manual/VueActionTable.js'

const app = new Vue({
  el: '#app',
  components: {
    VueActionTable,
  },
  data() {
    return {
      caption: 'Users',
      userRows: [
        {
          name: "Bob",
          email: "bob@mail.com",
          dateCreated: "04/01/2020",
          role: "admin",
        },
        {
          name: "Joe",
          email: "joe@mail.com",
          dateCreated: "04/12/2020",
          role: "editor",
        },
        {
          name: "Amanda",
          email: "amanda@mail.com",
          dateCreated: "04/15/2020",
          role: "admin",
        },
        {
          name: "Jane",
          email: "jane@mail.com",
          dateCreated: "04/20/2020",
          role: "editor",
        },
      ],
      actions: [
        {
          name: 'Edit',
        },
        {
          name: 'Delete',
          showIf: {
            key: "role",
            is: "editor"
          }
        }
      ]
    }
  }
});