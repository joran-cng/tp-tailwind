const plugin = require('tailwindcss/plugin');

module.exports = plugin(function({ addComponents }) {
  addComponents({
    '.tw-dashboard': {
      display: 'grid',
      gap: '1.5rem',
      gridTemplateColumns: 'minmax(0, 1fr)',
    },
    '@media (min-width: 1024px)': {
      '.tw-dashboard': {
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
      }
    },
    '.tw-widget': {
      backgroundColor: '#ffffff',
      borderRadius: '0.75rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      flexDirection: 'column',
      border: '1px solid #f3f4f6',
      transition: 'box-shadow 0.2s ease',
    },
    '.tw-widget.ghost': {
      opacity: '0.4',
      border: '2px dashed #6366f1',
    },
    '.tw-widget-header': {
      padding: '1rem 1.5rem',
      backgroundColor: '#f9fafb',
      borderBottom: '1px solid #e5e7eb',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      cursor: 'grab',
      userSelect: 'none',
      borderTopLeftRadius: '0.75rem',
      borderTopRightRadius: '0.75rem',
    },
    '.tw-widget-header:active': {
      cursor: 'grabbing',
    },
    '.tw-widget-body': {
      padding: '1.5rem',
      flex: '1',
      overflowX: 'auto',
    }
  });
});
