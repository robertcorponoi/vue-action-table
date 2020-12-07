'use strict'

import { mount } from '@vue/test-utils';
import VueActionTable from '../../src/components/VueActionTable.vue';

const rows = [
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
];

describe('Captions', () => {
  it('should have a caption since a caption was provided in the props', () => {
    const wrapper = mount(VueActionTable, {
      propsData: {
        caption: "Users",
        rows: rows,
      },
    });

    expect(wrapper.find('caption').exists()).toBe(true);
  });

  it('should not have a caption since a caption was not provided in the props', () => {
    const wrapper = mount(VueActionTable, {
      propsData: {
        rows: rows,
      },
    });

    expect(wrapper.find('caption').exists()).toBe(false);
  });
});

describe('Headers', () => {
  it('should create headers from the data rows provided', () => {
    const wrapper = mount(VueActionTable, {
      propsData: {
        rows: rows,
      },
    });

    const tableHeaders = wrapper.findAll('th');
    expect(tableHeaders.at(0).text()).toBe('Name');
    expect(tableHeaders.at(1).text()).toBe('Email');
    expect(tableHeaders.at(2).text()).toBe('Date Created');
    expect(tableHeaders.at(3).text()).toBe('Role');
  });
});

describe('Rows', () => {
  it('should create table rows from the data rows provided', () => {
    const wrapper = mount(VueActionTable, {
      propsData: {
        rows: rows,
      },
    });

    const tableRows = wrapper.findAll('td');

    expect(tableRows.at(0).text()).toBe('Bob');
    expect(tableRows.at(5).text()).toBe('joe@mail.com');
    expect(tableRows.at(10).text()).toBe('04/15/2020');
    expect(tableRows.at(15).text()).toBe('editor');
  });

  it('should add a table-data attribute to the rows to match the header', () => {
    const wrapper = mount(VueActionTable, {
      propsData: {
        rows: rows,
      },
    });

    const tableRows = wrapper.findAll('td');

    expect(tableRows.at(0).attributes()['data-label']).toBe('Name');
    expect(tableRows.at(5).attributes()['data-label']).toBe('Email');
    expect(tableRows.at(10).attributes()['data-label']).toBe('Date Created');
    expect(tableRows.at(15).attributes()['data-label']).toBe('Role');
  });
});

describe('Actions', () => {
  it('should add two action buttons to the last column of the table', () => {
    const wrapper = mount(VueActionTable, {
      propsData: {
        rows: rows,
        actions: ["Edit", "Delete"],
      },
    });

    const tableRows = wrapper.findAll('td');

    const row1Buttons = tableRows.at(4).findAll('button');
    expect(row1Buttons.at(0).text()).toBe('Edit');
    expect(row1Buttons.at(1).text()).toBe('Delete');

    const row2Buttons = tableRows.at(4).findAll('button');
    expect(row2Buttons.at(0).text()).toBe('Edit');
    expect(row2Buttons.at(1).text()).toBe('Delete');

    const row3Buttons = tableRows.at(4).findAll('button');
    expect(row3Buttons.at(0).text()).toBe('Edit');
    expect(row3Buttons.at(1).text()).toBe('Delete');

    const row4Buttons = tableRows.at(4).findAll('button');
    expect(row4Buttons.at(0).text()).toBe('Edit');
    expect(row4Buttons.at(1).text()).toBe('Delete');
  });

  it('should add a custom header to the actions column', () => {
    const wrapper = mount(VueActionTable, {
      propsData: {
        rows: rows,
        actions: ["Edit", "Delete"],
        actionsHeader: 'Actions',
      },
    });

    const tableHeaders = wrapper.findAll('th');
    expect(tableHeaders.at(4).text()).toBe('Actions');
  });

  it('should add a table-data attribute to the rows to match the actions header', () => {
    const wrapper = mount(VueActionTable, {
      propsData: {
        rows: rows,
        actions: ["Edit", "Delete"],
        actionsHeader: 'Actions',
      },
    });

    const tableRows = wrapper.findAll('td');

    expect(tableRows.at(4).attributes()['data-label']).toBe('Actions');
    expect(tableRows.at(9).attributes()['data-label']).toBe('Actions');
    expect(tableRows.at(14).attributes()['data-label']).toBe('Actions');
    expect(tableRows.at(19).attributes()['data-label']).toBe('Actions');
  });
});

describe('Classes', () => {
  it('should add a class to the table', () => {
    const wrapper = mount(VueActionTable, {
      propsData: {
        rows: rows,
        tableClasses: ["my-table"]
      },
    });

    const table = wrapper.find('table');
    expect(table.classes()).toStrictEqual(["my-table"]);
  });

  it('should add multiple classes to the table', () => {
    const wrapper = mount(VueActionTable, {
      propsData: {
        rows: rows,
        tableClasses: ["my-table", "user-table"]
      },
    });

    const table = wrapper.find('table');
    expect(table.classes()).toStrictEqual(["my-table", "user-table"]);
  });
});
