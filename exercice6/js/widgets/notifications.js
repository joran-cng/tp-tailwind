// Bonus: widget notifications
WidgetRegistry.registerWidget('notifications', (data) => {
  const wrapper = document.createElement('div');
  wrapper.className = 'flex flex-col gap-3';

  const typeStyles = {
    info:    'bg-blue-50 border-blue-300 text-blue-800',
    success: 'bg-green-50 border-green-300 text-green-800',
    warning: 'bg-yellow-50 border-yellow-300 text-yellow-800',
    error:   'bg-red-50 border-red-300 text-red-800',
  };

  const typeIcons = {
    info: 'ℹ️',
    success: '✅',
    warning: '⚠️',
    error: '❌',
  };

  data.forEach(notif => {
    const style = typeStyles[notif.type] || typeStyles.info;
    const icon = typeIcons[notif.type] || 'ℹ️';

    const div = document.createElement('div');
    div.className = `flex items-start gap-3 border rounded-lg px-4 py-3 text-sm ${style}`;
    div.innerHTML = `<span class="text-lg leading-tight">${icon}</span>
      <div>
        <p class="font-semibold">${notif.title}</p>
        <p class="opacity-80">${notif.message}</p>
      </div>`;
    wrapper.appendChild(div);
  });

  return wrapper;
});
