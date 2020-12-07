<template>
  <table :class="tableClasses">
    <caption v-if="caption">
      {{ caption }}
    </caption>
    <thead>
      <tr>
        <th
          v-for="header in headers"
          :key="header"
          scope="col"
        >
          {{ header }}
        </th>
        <th
          v-if="actions && actionsHeader"
          scope="col"
        >
          {{ actionsHeader }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="row in rows"
        :key="rows.indexOf(row)"
      >
        <td
          v-for="header in camelCaseHeaders"
          :key="camelCaseHeaders.indexOf(header)"
          :data-label="headers[camelCaseHeaders.indexOf(header)]"
        >
          {{ row[header] }}
        </td>
        <td
          v-if="actions"
          :data-label="actionsHeader"
        >
          <button
            v-for="action in getRowActions(row)"
            :key="actions.indexOf(action)"
            @click="$emit(action.name.toLowerCase(), row)"
          >
            <font-awesome
              v-if="action.faIcon"
              :icon="action.faIcon"
            />
            {{ action.name ? action.name : action }}
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    /**
     * The caption to include in the table, if desired.
     */
    caption: {
      type: String,
      default: "",
    },

    /**
     * The data rows of the data.
     */
    rows: {
      type: Array,
      required: true,
    },

    /**
     * The content of the action buttons. This can be just an array of text for the
     * button names or an array of objects with text, an icon, and functions to run
     * when the action is clicked.
     */
    actions: {
      type: Array,
      default: () => [],
    },

    /**
     * If adding actions, this will be the header for the action column.
     */
    actionsHeader: {
      type: String,
      default: "",
    },

    /**
     * The classes to add to the table element.
     */
    tableClasses: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    /**
     * Returns the headers for the table gathered from the rows.
     */
    headers() {
      const headers = [];

      Object.keys(this.rows[0]).forEach((key) => {
        headers.push(
          key
            .replace(/([A-Z])/g, (match) => ` ${match}`)
            .replace(/^./, (match) => match.toUpperCase())
        );
      });

      return headers;
    },

    /**
     * Converts the headers from words to camelCase so that they can be
     * used for getting row values.
     *
     * @returns {Array<string>} Returns the headers in camelCase form.
     */
    camelCaseHeaders() {
      const newHeaders = [];

      this.headers.forEach((header) => {
        newHeaders.push(
          header
            .toLowerCase()
            .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase())
        );
      });

      return newHeaders;
    },
  },
  methods: {
    /**
     * Returns only the actions that should belong with the provided
     * row.
     *
     * NOTE: This is not efficient and should be refactored when time permits.
     *
     * @param {Object} row The row to check the actions for.
     *
     * @returns {Array<Object>} Returns the actions that belong on the row.
     */
    getRowActions(row) {
      return this.actions.filter((action) => {
        if (!action.showIf) return action;
        return row[action.showIf.key] === action.showIf.is;
      });
    },
  },
};
</script>

<style lang="scss">
table {
  border-collapse: collapse;
  margin: 0;
  padding: 0;
  width: 100%;
  table-layout: fixed;

  @media screen and (max-width: 600px) {
    border: 0;
  }

  caption {
    margin: 1rem 0 2rem 0;
  }

  tr {
    padding: 1rem;

    @media screen and (max-width: 600px) {
      display: block;
    }
  }

  td,
  th {
    text-align: center;
  }

  thead {
    @media screen and (max-width: 600px) {
      clip: rect(0 0 0 0);
      height: 1px;
      width: 1px;
      margin: -1px;
      border: none;
      overflow: hidden;
      padding: 0;
      position: absolute;
    }
  }

  td {
    @media screen and (max-width: 600px) {
      display: block;
    }

    &:before {
      @media screen and (max-width: 600px) {
        content: attr(data-label);
        @apply float-left;
      }
    }

    &:last-child {
      @media screen and (max-width: 600px) {
        border-bottom: 0;
      }
    }
  }
}
</style>