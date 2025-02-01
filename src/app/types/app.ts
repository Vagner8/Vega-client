export const AppEvents = {
  Hold: 'Hold',
  Touch: 'Touch',
} as const;

export const AppEntities = {
  Root: 'Root',
  Rows: 'Rows',
  Taps: 'Taps',
  Pages: 'Pages',
  Manager: 'Manager',
  Modifiers: 'Modifiers',
};

export const Modifiers = {
  New: 'New',
  Edit: 'Edit',
  Save: 'Save',
  Delete: 'Delete',
} as const;

export const Pages = {
  App: 'App',
  Home: 'Home',
  Users: 'Users',
  Products: 'Products',
} as const;
