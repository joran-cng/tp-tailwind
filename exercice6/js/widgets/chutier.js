WidgetRegistry.registerWidget('chutier', (data) => {
  const wrapper = document.createElement('div');
  wrapper.className = 'flex gap-4 min-h-48';

  // Chutier (gauche)
  const chutier = document.createElement('div');
  chutier.className = 'flex-1 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-3 flex flex-col gap-2';
  chutier.dataset.zone = 'chutier';

  // Label
  const label = document.createElement('span');
  label.className = 'text-xs font-bold text-gray-400 uppercase tracking-wide mb-1';
  label.textContent = '📦 Éléments';
  chutier.appendChild(label);

  // Zones droite
  const zonesContainer = document.createElement('div');
  zonesContainer.className = 'flex-1 flex flex-col gap-2';

  const zoneNames = ['🔵 Zone A', '🟢 Zone B', '🟡 Zone C'];
  const dropzones = zoneNames.map((name, i) => {
    const dz = document.createElement('div');
    dz.className = 'flex-1 bg-blue-50 border-2 border-dashed border-blue-200 rounded-lg p-3 flex flex-col gap-2';
    dz.dataset.zone = `zone-${i + 1}`;

    const lbl = document.createElement('span');
    lbl.className = 'text-xs font-bold text-blue-400 uppercase tracking-wide mb-1';
    lbl.textContent = name;
    dz.appendChild(lbl);
    zonesContainer.appendChild(dz);
    return dz;
  });

  // Créer les items depuis data
  let draggedItem = null;

  const createItem = (item) => {
    const div = document.createElement('div');
    div.className = 'bg-white border border-gray-200 px-3 py-2 rounded-md cursor-grab text-sm text-gray-700 font-medium shadow-sm select-none transition-opacity';
    div.draggable = true;
    div.dataset.id = item.id;
    div.textContent = item.name;

    div.addEventListener('dragstart', (e) => {
      draggedItem = div;
      e.dataTransfer.effectAllowed = 'move';
      setTimeout(() => div.classList.add('opacity-40'), 0);
    });
    div.addEventListener('dragend', () => {
      div.classList.remove('opacity-40');
      draggedItem = null;

      // Bonus : Communication vers Stats via EventBus
      const itemsInZones = dropzones.reduce((sum, dz) =>
        sum + dz.querySelectorAll('[data-id]').length, 0);
      EventBus.emit('chutier_update', itemsInZones);
    });

    return div;
  };

  data.forEach(item => chutier.appendChild(createItem(item)));

  // Gestion du drop sur chaque container
  const allContainers = [chutier, ...dropzones];
  allContainers.forEach(container => {
    container.addEventListener('dragover', e => {
      e.preventDefault();
      container.classList.add('!border-indigo-400', '!bg-indigo-50');
    });
    container.addEventListener('dragleave', () => {
      container.classList.remove('!border-indigo-400', '!bg-indigo-50');
    });
    container.addEventListener('drop', e => {
      e.preventDefault();
      container.classList.remove('!border-indigo-400', '!bg-indigo-50');
      if (draggedItem) container.appendChild(draggedItem);
    });
  });

  wrapper.appendChild(chutier);
  wrapper.appendChild(zonesContainer);
  return wrapper;
});
