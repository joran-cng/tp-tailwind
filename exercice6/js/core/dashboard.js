// Moteur principal du Dashboard
const Dashboard = (() => {

  const STORAGE_KEY = 'dashboard_layout';

  // Sauvegarder l'ordre des widgets (Bonus Persistance)
  function saveLayout(container) {
    const order = Array.from(container.children).map(w => w.dataset.widgetType);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(order));
  }

  // Charger l'ordre sauvegardé
  function loadLayout() {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  }

  // Créer un widget complet (header + body)
  function createWidgetEl(widgetConfig) {
    const { type, title, data, span } = widgetConfig;

    const widgetEl = document.createElement('div');
    widgetEl.className = 'tw-widget' + (span === 2 ? ' lg:col-span-2' : '');
    widgetEl.dataset.widgetType = type;
    widgetEl.draggable = true;

    // Header
    const header = document.createElement('div');
    header.className = 'tw-widget-header';
    header.innerHTML = `
      <div class="flex items-center gap-2">
        <span class="text-gray-400 text-lg">⠿</span>
        <h2 class="font-bold text-gray-700 text-sm uppercase tracking-wide">${title || type}</h2>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-xs text-gray-400 italic">Glisser pour déplacer</span>
      </div>
    `;

    // Body
    const body = document.createElement('div');
    body.className = 'tw-widget-body';
    const renderFn = WidgetRegistry.getWidget(type);
    const content = renderFn(data);
    body.appendChild(content);

    widgetEl.appendChild(header);
    widgetEl.appendChild(body);

    return widgetEl;
  }

  // Activer le drag & drop des widgets dans la grille
  function enableWidgetDragDrop(container) {
    let dragged = null;

    container.addEventListener('dragstart', (e) => {
      const widget = e.target.closest('.tw-widget');
      if (!widget) return;
      dragged = widget;
      setTimeout(() => widget.classList.add('ghost'), 0);
    });

    container.addEventListener('dragend', () => {
      if (dragged) {
        dragged.classList.remove('ghost');
        dragged = null;
        saveLayout(container);
      }
    });

    container.addEventListener('dragover', (e) => {
      e.preventDefault();
      const target = e.target.closest('.tw-widget');
      if (target && target !== dragged) {
        const rect = target.getBoundingClientRect();
        const midY = rect.y + rect.height / 2;
        if (e.clientY < midY) {
          container.insertBefore(dragged, target);
        } else {
          container.insertBefore(dragged, target.nextSibling);
        }
      }
    });
  }

  // Rendu principal — lecture du config
  function render(containerId, config) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.className = 'tw-dashboard';
    container.innerHTML = '';

    const savedOrder = loadLayout();
    let orderedConfig = config;

    // Réordonner selon le layout sauvegardé
    if (savedOrder) {
      const configMap = {};
      config.forEach(c => { configMap[c.type] = c; });
      orderedConfig = savedOrder
        .map(type => configMap[type])
        .filter(Boolean);
      // Ajouter les widgets qui n'étaient pas encore dans le layout
      config.forEach(c => {
        if (!savedOrder.includes(c.type)) orderedConfig.push(c);
      });
    }

    orderedConfig.forEach(widgetConfig => {
      const el = createWidgetEl(widgetConfig);
      container.appendChild(el);
    });

    enableWidgetDragDrop(container);
  }

  // Bonus : Ajouter dynamiquement un widget
  function addWidget(containerId, widgetConfig) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const el = createWidgetEl(widgetConfig);
    container.appendChild(el);
    saveLayout(container);
  }

  return { render, addWidget };
})();
