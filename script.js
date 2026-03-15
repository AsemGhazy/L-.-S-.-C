/**
 * Line of Sight Calculator
 * Formulas (Chapter 3 - Data Communications):
 *   Metres → d (km)    = 3.57 × √h
 *   Feet   → d (miles) = 1.41 × √h
 */

  /* ── THEME TOGGLE ──────────────────────────────────── */
  const html      = document.documentElement;
  const themeBtn  = document.getElementById('themeBtn');
  const saved     = localStorage.getItem('lsc-theme') || 'dark';
  html.setAttribute('data-theme', saved);

  themeBtn.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next    = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('lsc-theme', next);
  });

  /* ── CALC EVENTS ───────────────────────────────────── */
  document.getElementById('calcBtn').addEventListener('click', calculate);
  document.getElementById('clearBtn').addEventListener('click', clearAll);
  document.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });

/* ── CALCULATE ─────────────────────────────────────────── */
function calculate() {
  const h1Input = document.getElementById('h1');
  const h2Input = document.getElementById('h2');
  const h1 = parseFloat(h1Input.value);
  const h2 = parseFloat(h2Input.value);

  let valid = true;
  if (isNaN(h1) || h1 < 0) { h1Input.classList.add('error');    valid = false; }
  else                       { h1Input.classList.remove('error'); }
  if (isNaN(h2) || h2 < 0) { h2Input.classList.add('error');    valid = false; }
  else                       { h2Input.classList.remove('error'); }
  if (!valid) { alert('Please enter valid positive numbers for both antenna heights.'); return; }

  const inputUnit  = document.querySelector('input[name="inputUnit"]:checked').value;
  const outputUnit = document.querySelector('input[name="outputUnit"]:checked').value;

  let d1, d2;
  if (inputUnit === 'metres') {
    d1 = 3.57 * Math.sqrt(h1);
    d2 = 3.57 * Math.sqrt(h2);
    if (outputUnit === 'miles') { d1 *= 0.621371; d2 *= 0.621371; }
  } else {
    d1 = 1.41 * Math.sqrt(h1);
    d2 = 1.41 * Math.sqrt(h2);
    if (outputUnit === 'kilometres') { d1 *= 1.60934; d2 *= 1.60934; }
  }

  const unitLabel = outputUnit === 'kilometres' ? 'Km' : 'Mi';
  setResult('r1',    `${Math.round(d1)} ${unitLabel}`);
  setResult('r2',    `${Math.round(d2)} ${unitLabel}`);
  setResult('total', `${Math.round(d1 + d2)} ${unitLabel}`);
}

function setResult(id, value) {
  const el = document.getElementById(id);
  el.textContent = value;
  el.classList.add('has-value');
}

/* ── CLEAR ─────────────────────────────────────────────── */
function clearAll() {
  document.getElementById('h1').value = '';
  document.getElementById('h2').value = '';
  document.getElementById('h1').classList.remove('error');
  document.getElementById('h2').classList.remove('error');
  document.getElementById('metres').checked     = true;
  document.getElementById('kilometres').checked = true;
  ['r1','r2','total'].forEach(id => {
    const el = document.getElementById(id);
    el.textContent = '—';
    el.classList.remove('has-value');
  });
}