WidgetRegistry.registerWidget('stats', (data, containerId) => {
  const wrapper = document.createElement('div');
  wrapper.className = 'grid grid-cols-1 sm:grid-cols-3 gap-4';

  data.forEach(stat => {
    const box = document.createElement('div');
    box.className = 'bg-blue-50 border border-blue-100 p-4 rounded-lg flex flex-col justify-center items-center';
    
    const label = document.createElement('span');
    label.className = 'text-blue-500 font-bold text-sm uppercase tracking-wider mb-1';
    label.textContent = stat.label;
    
    const value = document.createElement('span');
    value.className = 'text-3xl font-black text-gray-800';
    if(stat.id) value.id = stat.id;
    value.textContent = stat.value;

    box.appendChild(label);
    box.appendChild(value);
    wrapper.appendChild(box);
  });

  // Abonnement à l'événement du chutier pour mettre à jour la data en direct (Bonus)
  EventBus.on('chutier_update', (count) => {
    const dynEl = wrapper.querySelector('#dynamic-chutier-count');
    if (dynEl) dynEl.textContent = count;
  });

  return wrapper;
});
