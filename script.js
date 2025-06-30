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

function setVersion(version) {
  const driver = document.getElementById('optimized-driver-section');
  const labels = document.getElementById('label-characteristics-section');
  const info = document.getElementById('version-info');
  document.querySelectorAll('.version-tab').forEach(tab => {
    if (tab.dataset.version === version) {
      tab.classList.add('border-blue-600', 'font-bold');
    } else {
      tab.classList.remove('border-blue-600', 'font-bold');
    }
  });
  if (version === 'v11.4') {
    driver.classList.add('hidden');
    labels.classList.add('hidden');
    info.classList.add('hidden');
  } else if (version === 'v11.5') {
    driver.classList.remove('hidden');
    labels.classList.remove('hidden');
    info.classList.add('hidden');
  } else if (version === 'v11.6') {
    driver.classList.remove('hidden');
    labels.classList.remove('hidden');
    info.textContent = '⚠️ Version 11.6 is still in progress and will be available in August';
    info.classList.remove('hidden');
  }
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
  const tabs = document.querySelectorAll('.version-tab');
  tabs.forEach(t => t.addEventListener('click', () => setVersion(t.dataset.version)));
  setVersion('v11.5');
  const btn = document.getElementById('assumptions-btn');
  if (btn) {
    btn.addEventListener('click', () => {
      document.getElementById('faq').scrollIntoView({ behavior: 'smooth' });
    });
  }
});
