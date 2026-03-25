const plugin = require('tailwindcss/plugin');

module.exports = plugin(function({ addComponents }) {
  addComponents({
    '.tw-table-sortable th': {
      cursor: 'pointer',
      position: 'relative',
      userSelect: 'none',
    },
    '.tw-table-sortable th::after': {
      content: '""',
      marginLeft: '8px',
      display: 'inline-block',
      width: '0.8em',
      position: 'absolute',
      right: '8px',
    },
    '.tw-table-sortable th.tw-sort-asc::after': {
      content: '"▲"',
    },
    '.tw-table-sortable th.tw-sort-desc::after': {
      content: '"▼"',
    }
  });
});
