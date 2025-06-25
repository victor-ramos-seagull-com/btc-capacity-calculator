function updateDisplay(inputId, valueId) {
  const input = document.getElementById(inputId);
  const value = document.getElementById(valueId);
  value.textContent = input.value;
}

function secondsToMMSS(seconds) {
  if (seconds < 0) seconds = 0;
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
}

function calculate() {
  const labelsPerPage = parseInt(document.getElementById('labels-per-page').value, 10);
  const totalLabels = parseInt(document.getElementById('total-labels').value, 10);
  const copies = parseInt(document.getElementById('copies').value, 10);

  const totalPrintedLabels = totalLabels * copies;
  const totalPages = totalPrintedLabels / labelsPerPage;
  const seconds = 0.964095 * totalPrintedLabels - 258.632;

  document.getElementById('total-pages').textContent = totalPages.toFixed(2);
  document.getElementById('total-time-sec').textContent = seconds.toFixed(2);
  document.getElementById('total-time-mmss').textContent = secondsToMMSS(seconds);
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
});
