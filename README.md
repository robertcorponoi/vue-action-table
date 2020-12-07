<p align="center">
  <img width="250" height="250" src="https://github.com/robertcorponoi/graphics/blob/master/vue-action-table/logo/logo.png?raw=true">
</p>

<h1 align="center">Vue Action Table</h1>

<p align="center">An easy to use responsive table with the ability to add action buttons to each row.<p>

<div align="center">

[![NPM version](https://img.shields.io/npm/v/vue-action-table.svg?style=flat)](https://www.npmjs.com/package/vue-action-table)
[![Known Vulnerabilities](https://snyk.io/test/github/robertcorponoi/vue-action-table/badge.svg)](https://snyk.io/test/github/robertcorponoi/vue-action-table)
![npm](https://img.shields.io/npm/dt/vue-action-table)
[![NPM downloads](https://img.shields.io/npm/dm/vue-action-table.svg?style=flat)](https://www.npmjs.com/package/vue-action-table)
<a href="https://badge.fury.io/js/vue-action-table"><img src="https://img.shields.io/github/issues/robertcorponoi/vue-action-table.svg" alt="issues" height="18"></a>
<a href="https://badge.fury.io/js/vue-action-table"><img src="https://img.shields.io/github/license/robertcorponoi/vue-action-table.svg" alt="license" height="18"></a>
[![Gitter](https://badges.gitter.im/gitterHQ/gitter.svg)](https://gitter.im/robertcorponoi)

</div>

**Table of Contents**

- [Overview](#overview)
- [Installation](#installation)
- [Usage](#Usage)
- [Props](#props)
  - [caption](#caption)
  - [rows](#rows)
  - [actions](#actions)
  - [actionsHeader](#actionsHeader)
  - [tableClasses](#tableClasses)
- [Tests](#tests)

## **Overview**

Vue Action Table focuses on two things: responsiveness and actions. This is all covered below but I wanted to cover that Veu Action Table is not a complete out of the box solution. What Vue Action Table doesn't provide is a styled table. Outside of the responsive bits it is a very basic table and you will need to provide your custom styling for it. I chose to not add styling because it varies from person to person and it would add unnecessary styles that would need to be overwritten.

## **Installation**

To install Vue Action Table use:

```bash
$ npm install vue-action-table
```

## **Usage**

To use Vue Action Table, simply import it into the page or component you want to use it in.

Below is a complete example of Vue Action Table usage and everything is briefly explained in comments but make sure to look further down at the props breakdown for a more detailed explanation.

```html
<template>
  <vue-action-table
    :rows="users"
    :actions="actions"
    actions-header="Actions"
    @promote="verifyUser"
    @delete="deleteUser"
  />
</template>

<script>
import VueActionTable from 'vue-action-table';

export default {
  components: {
    VueActionTable,
  },
  data() {
    return {
      /**
       * The users used to populate the table with.
       */
      users: [
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

      /**
       * The actions to add to the table. Here we have two actions: promote and delete.
       * Both of these actions have a font-awesome icon passed to them and the promote
       * action is set to only show on that row if the the user's `role` is an editor.
       */
      actions: [
        {
          name: "Promote",
          faIcon: ["fas", "check"],
          showIf: {
            key: "role",
            is: "editor",
          }
        },
        {
          name: "Delete",
          faIcon: ["fas", "trash"],
        }
      ]
    }
  }
};
</script>
```

## **Props**

### **caption**

Optional. Adds a caption to the table in a `<caption>` tag.

**example:**

```html
<vue-action-table caption="Users" />
```

### **rows**

Required. An array of objects that represents the rows of data to add to the table.

The headers are automatically created from the rows by taking the keys of each object and turning them from camelCase to separate words. For example, if there's a key named `dateCreated`, the header will be `Date Created`.

**example:**

```html
<template>
  <vue-action-table :rows="users" />
</template>

<script>
export default {
  data() {
    return {
      /**
       * The users used to populate the table with.
       */
      users: [
        {
          name: "Bob",
          email: "bob@mail.com",
          dateCreated: "04/01/2020",
          role: "admin",
        },
        {
          name: "Jane",
          email: "jane@mail.com",
          dateCreated: "04/20/2020",
          role: "editor",
        },
      ],
    }
  }
}
```

### **actions**

Optional. Actions are buttons that appear in the last column of every row. Actions at the minimum are just an array of text values for the buttons and at most are more complicated conditionals as seen below. Whenever an action button is clicked by the user, an event will be emitted with the action's name in lowercase. For example, if an action with the name of `Edit` is clicked, an event named `edit` will be emitted.

A simple actions array can be:

```js
data() {
  return {
    ["Edit", "Delete"],
  }
}
```

While a more complex example is shown below:

**example:**

```html
<template>
  <vue-action-table :rows="users" :actions="actions" />
</template>

<script>
export default {
  data() {
    return {
      /**
       * The users used to populate the table with.
       */
      users: [
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
      ],
      /**
       * The actions for each row. Notice that the Delete button will only show
       * up on rows where the "role" is "editor".
       */
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
}
</script>
```

Notice that the `Delete` action has a special conditional. What it says is that the `Delete` button will only show if the value for the `role` of that row is `editor`. If it is `editor`, then the `Delete` button will show, otherwise it won't show for that row.

### **actionsHeader**

Optional. The header label for the column that contains the row's actions.

```html
<template>
  <vue-action-table :rows="users" :actions="userActions" actionsHeader="Actions" />
</template>

<script>
export default {
  data() {
    return {
      /**
       * The users used to populate the table with.
       */
      users: [
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
      ],

      /**
       * The actions to add to the table.
       */
      actions: ["Edit", "Delete"],
    }
  }
}
</script>
```

### **tableClasses**

Adds one or more classes to the root table element.

**example:**

```html
<template>
  <vue-action-table :rows="users" :tableClasses="userTableClasses" />
</template>

<script>
export default {
  data() {
    return {
      /**
       * The classes to add to the table element.
       */
      userTableClasses: ["table", "table--users"],

      /**
       * The users used to populate the table with.
       */
      users: [
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
    }
  }
}
</script>
```

## **Tests**

To run all of the tests available for Vue Action Table, use:

```bash
$ npm run test:unit
```

## **License**

MIT