function initSortableTable(table) {
  const headers = table.querySelectorAll('thead th[data-key]');
  const tbody = table.querySelector('tbody');

  headers.forEach((th, index) => {
    th.addEventListener('click', () => {
      const key = th.getAttribute('data-key');
      const isAsc = th.classList.contains('tw-sort-asc');
      const newOrder = isAsc ? 'desc' : 'asc';
      
      updateSortUI(headers, th, newOrder);
      sortTable(tbody, index, newOrder);
    });
  });
}

function updateSortUI(headers, activeTh, order) {
  headers.forEach(th => {
    th.classList.remove('tw-sort-asc', 'tw-sort-desc', 'text-indigo-600', 'bg-indigo-50');
  });
  
  // Style de la colonne active via Tailwind (contrainte : colonne active stylée)
  activeTh.classList.add(`tw-sort-${order}`, 'text-indigo-600', 'bg-indigo-50');
}

function sortTable(tbody, colIndex, order) {
  const rows = Array.from(tbody.querySelectorAll('tr'));
  
  rows.sort((a, b) => {
    const cellA = a.children[colIndex].textContent.trim();
    const cellB = b.children[colIndex].textContent.trim();
    
    // Tentative de conversion en nombre pour le tri numérique
    const numA = parseFloat(cellA);
    const numB = parseFloat(cellB);
    
    let comparison = 0;
    if (!isNaN(numA) && !isNaN(numB)) {
      comparison = numA - numB;
    } else {
      comparison = cellA.localeCompare(cellB);
    }
    
    return order === 'asc' ? comparison : -comparison;
  });
  
  // Réinsère les lignes triées
  rows.forEach(row => tbody.appendChild(row));
}

// Helper pour peupler les tableaux
function populateTable(tbodyId, data, keys) {
  const tbody = document.getElementById(tbodyId);
  data.forEach(item => {
    const tr = document.createElement('tr');
    tr.className = 'hover:bg-gray-50 transition-colors border-b';
    keys.forEach(key => {
      const td = document.createElement('td');
      td.className = 'px-6 py-4 whitespace-nowrap text-sm text-gray-700';
      td.textContent = item[key];
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // Peuplement dynamique (permet de garder un HTML propre)
  populateTable('users-tbody', users, ['name', 'age', 'city']);
  populateTable('products-tbody', products, ['ref', 'price', 'stock']);

  // Initialisation de toutes les tables triables
  document.querySelectorAll('.tw-table-sortable').forEach(initSortableTable);
});
