const plugin = require('tailwindcss/plugin');

module.exports = plugin(function ({ addComponents }) {
  addComponents({
    '.tw-dnd-container': {
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem',
    },
    '@media (min-width: 768px)': {
      '.tw-dnd-container': {
        flexDirection: 'row',
      }
    },
    '.tw-chutier': {
      backgroundColor: '#f9fafb',
      border: '2px dashed #d1d5db',
      borderRadius: '0.5rem',
      padding: '1rem',
      minHeight: '300px',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
      transition: 'all 0.2s ease',
    },
    '.tw-dropzones': {
      display: 'grid',
      gridTemplateColumns: 'minmax(0, 1fr)',
      gap: '1rem',
    },
    '.tw-dropzone': {
      backgroundColor: '#f3f4f6',
      border: '2px dashed #9ca3af',
      borderRadius: '0.5rem',
      padding: '1rem',
      minHeight: '120px',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
      transition: 'all 0.2s ease',
    },
    '.tw-chutier.tw-drag-over, .tw-dropzone.tw-drag-over': {
      backgroundColor: '#e0e7ff',
      borderColor: '#6366f1',
    },
    '.tw-draggable-item': {
      backgroundColor: '#ffffff',
      border: '1px solid #e5e7eb',
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      padding: '0.75rem 1rem',
      borderRadius: '0.375rem',
      cursor: 'grab',
      userSelect: 'none',
      transition: 'opacity 0.2s, transform 0.2s',
    },
    '.tw-draggable-item:active': {
      cursor: 'grabbing',
    },
    '.tw-draggable-item.tw-dragging': {
      opacity: '0.4',
    }
  });
});
