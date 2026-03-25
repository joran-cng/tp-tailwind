function initDndChutier(config) {
  const { chutierSelector, dropzoneSelector, data } = config;

  const chutier = document.querySelector(chutierSelector);
  const dropzones = document.querySelectorAll(dropzoneSelector);
  const instanceId = 'default_app';

  // State Management (Bonus)
  const savedState = localStorage.getItem(`dnd_${instanceId}`);
  let state = {
    chutier: data.map(item => String(item.id)),
    zones: {} 
  };

  if (savedState) {
    state = JSON.parse(savedState);
  } else {
    dropzones.forEach(dz => {
      state.zones[dz.dataset.zone] = [];
    });
  }

  renderChutier(chutier, dropzones, data, state);
  enableDragAndDrop(chutier, dropzones, instanceId);
}

function renderChutier(chutier, dropzones, data, state) {
  chutier.innerHTML = '';
  dropzones.forEach(dz => {
    // Keep internal span if any, but clear draggables
    Array.from(dz.children).forEach(child => {
      if(child.classList.contains('tw-draggable-item')) dz.removeChild(child);
    });
  });

  const createItem = (id) => {
    const itemData = data.find(d => String(d.id) === String(id));
    if (!itemData) return null;
    
    const div = document.createElement('div');
    div.className = 'tw-draggable-item text-gray-700 font-medium font-sans';
    div.draggable = true;
    div.dataset.id = itemData.id;
    div.textContent = itemData.name;
    return div;
  };

  state.chutier.forEach(id => {
    const element = createItem(id);
    if(element) chutier.appendChild(element);
  });

  Object.keys(state.zones).forEach(zoneId => {
    const zoneEl = Array.from(dropzones).find(dz => dz.dataset.zone === zoneId);
    if (zoneEl) {
      state.zones[zoneId].forEach(id => {
        const element = createItem(id);
        if(element) zoneEl.appendChild(element);
      });
    }
  });
}

function enableDragAndDrop(chutier, dropzones, instanceId) {
  let draggedItem = null;

  const attachEventsToItem = (item) => {
    item.addEventListener('dragstart', (e) => {
      draggedItem = item;
      setTimeout(() => item.classList.add('tw-dragging'), 0);
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', item.dataset.id);
    });

    item.addEventListener('dragend', () => {
      setTimeout(() => {
        draggedItem.classList.remove('tw-dragging');
        draggedItem = null;
        saveState(chutier, dropzones, instanceId);
      }, 0);
    });
  };

  // Attach to existing items
  document.querySelectorAll('.tw-draggable-item').forEach(attachEventsToItem);

  const containers = [chutier, ...Array.from(dropzones)];

  containers.forEach(container => {
    container.addEventListener('dragover', (e) => {
      e.preventDefault();
      container.classList.add('tw-drag-over');
    });

    container.addEventListener('dragleave', () => {
      container.classList.remove('tw-drag-over');
    });

    container.addEventListener('drop', (e) => {
      e.preventDefault();
      container.classList.remove('tw-drag-over');
      if (draggedItem) {
        container.appendChild(draggedItem);
      }
    });
  });
}

function saveState(chutier, dropzones, instanceId) {
  const state = {
    chutier: Array.from(chutier.querySelectorAll('.tw-draggable-item')).map(item => item.dataset.id),
    zones: {} 
  };
  
  dropzones.forEach(dz => {
    state.zones[dz.dataset.zone] = Array.from(dz.querySelectorAll('.tw-draggable-item')).map(item => item.dataset.id);
  });

  localStorage.setItem(`dnd_${instanceId}`, JSON.stringify(state));
}

function resetDndState() {
  localStorage.removeItem('dnd_default_app');
  window.location.reload();
}

document.addEventListener('DOMContentLoaded', () => {
  initDndChutier({
    chutierSelector: '#chutier',
    dropzoneSelector: '.tw-dropzone',
    data: products
  });
});
