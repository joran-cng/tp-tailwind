const WidgetRegistry = (() => {
  const widgets = {};

  return {
    registerWidget: (type, renderFunction) => {
      widgets[type] = renderFunction;
    },
    getWidget: (type) => {
      if (!widgets[type]) {
        console.warn(`Widget type "${type}" introuvable.`);
        return () => `<div class="text-red-500 font-bold p-4">Error: Widget ${type} non enregistré.</div>`;
      }
      return widgets[type];
    }
  };
})();
