WidgetRegistry.registerWidget('table', (data) => {
  const wrapper = document.createElement('div');
  wrapper.className = 'overflow-x-auto';

  if (!data || data.length === 0) {
    wrapper.innerHTML = '<p class="text-gray-400 italic">Aucune donnée disponible.</p>';
    return wrapper;
  }

  const keys = Object.keys(data[0]);
  let sortKey = null;
  let sortOrder = 'asc';

  const table = document.createElement('table');
  table.className = 'min-w-full text-left border-collapse text-sm';

  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  headerRow.className = 'border-b border-gray-200 bg-gray-50';

  keys.forEach(key => {
    const th = document.createElement('th');
    th.className = 'px-4 py-3 font-semibold text-gray-600 cursor-pointer select-none hover:text-indigo-600 transition-colors';
    th.dataset.key = key;
    th.textContent = key.charAt(0).toUpperCase() + key.slice(1);

    th.addEventListener('click', () => {
      if (sortKey === key) {
        sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
      } else {
        sortKey = key;
        sortOrder = 'asc';
      }
      renderBody();
      updateHeaders();
    });

    headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement('tbody');
  table.appendChild(tbody);
  wrapper.appendChild(table);

  function updateHeaders() {
    headerRow.querySelectorAll('th').forEach(th => {
      th.textContent = th.dataset.key.charAt(0).toUpperCase() + th.dataset.key.slice(1);
      if (th.dataset.key === sortKey) {
        th.textContent += sortOrder === 'asc' ? ' ▲' : ' ▼';
        th.classList.add('text-indigo-600');
      } else {
        th.classList.remove('text-indigo-600');
      }
    });
  }

  function renderBody() {
    tbody.innerHTML = '';
    const sorted = [...data].sort((a, b) => {
      const valA = a[sortKey];
      const valB = b[sortKey];
      const numA = parseFloat(valA);
      const numB = parseFloat(valB);
      let cmp = (!isNaN(numA) && !isNaN(numB))
        ? numA - numB
        : String(valA).localeCompare(String(valB));
      return sortOrder === 'asc' ? cmp : -cmp;
    });

    sorted.forEach((row, i) => {
      const tr = document.createElement('tr');
      tr.className = `border-b border-gray-100 hover:bg-gray-50 transition-colors ${i % 2 === 0 ? '' : 'bg-gray-50/50'}`;
      keys.forEach(key => {
        const td = document.createElement('td');
        td.className = 'px-4 py-3 text-gray-700';
        td.textContent = row[key];
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
  }

  renderBody();
  return wrapper;
});
