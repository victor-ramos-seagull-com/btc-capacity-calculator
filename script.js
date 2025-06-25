function updateDisplay(inputId, valueId) {
  const input = document.getElementById(inputId);
  const value = document.getElementById(valueId);
  if (value) value.textContent = input.value;
}

function formatTime(seconds) {
  seconds = Math.max(0, Math.round(seconds));
  if (seconds < 60) {
    return `${seconds}s`;
  }
  if (seconds < 3600) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s}s`;
  }
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${h}h ${m}m ${s}s`;
}

function animateResults() {
  const box = document.getElementById('results');
  if (!box) return;
  box.classList.add('flash');
  setTimeout(() => box.classList.remove('flash'), 300);
}

function calculate() {
  const labelsPerPage = parseInt(document.getElementById('labels-per-page').value, 10);
  const totalLabels = parseInt(document.getElementById('total-labels').value, 10);
  const copies = parseInt(document.getElementById('copies').value, 10);

  const totalPrintedLabels = totalLabels * copies;
  const totalPages = Math.ceil(totalPrintedLabels / labelsPerPage);
  const seconds = 0.0580952380952 * totalPrintedLabels - 54.8;

  document.getElementById('total-pages').textContent = totalPages;
  document.getElementById('total-time').textContent = formatTime(seconds);
  animateResults();
}

function bindInput(id, valueId) {
  const input = document.getElementById(id);
  input.addEventListener('input', () => {
    if (valueId) updateDisplay(id, valueId);
    calculate();
  });
  if (valueId) updateDisplay(id, valueId);
}

document.addEventListener('DOMContentLoaded', () => {
  bindInput('labels-per-page', 'labels-per-page-value');
  bindInput('total-labels', 'total-labels-value');
  bindInput('copies', 'copies-value');
  bindInput('printers', 'printers-value');
  bindInput('gateways', 'gateways-value');
  bindInput('optimized-driver');
  bindInput('contains-text');
  bindInput('contains-images');
  bindInput('contains-barcodes');
  bindInput('external-data');
  calculate();
  const btn = document.getElementById('assumptions-btn');
  if (btn) {
    btn.addEventListener('click', () => {
      document.getElementById('faq').scrollIntoView({ behavior: 'smooth' });
    });
  }
});
