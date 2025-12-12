from pathlib import Path

# Canonieke engine.js met toggle fix
engine_js_content = """
/* ----------------------------------------------------------
   AiCelium Portal Engine v2.4 (FINALE, CANONIEKE FIX - TOGGLE STABILITEIT)
   Supervisor of Resonance • Morphic Layer V2.1
----------------------------------------------------------*/

let isFieldActive = false;
let recoveryCode = null;
let telemetryInterval = null;
let currentStabilityFactor = 1.0;
let morphicState = { morphic_status: "BASE_STATIC" };

const CRITICAL_COLOR = "#9333ea";

function updateCoreStatus(newStatus) {
  const statusDiv = document.getElementById("core-status");
  if (!statusDiv) return;
  statusDiv.textContent = newStatus;
  if (newStatus.includes("CRITIEK")) statusDiv.style.color = CRITICAL_COLOR;
  else if (newStatus.includes("RESONANT")) statusDiv.style.color = "#facc15";
  else statusDiv.style.color = "#e2e8f0";
}

function logMessage(sender, message) {
  const auditFeed = document.getElementById("audit-feed");
  if (!auditFeed) return;
  while (auditFeed.children.length >= 30) auditFeed.removeChild(auditFeed.lastChild);
  const entry = document.createElement("li");
  entry.innerHTML = `[${sender}] • ${message}`;
  auditFeed.insertBefore(entry, auditFeed.firstChild);
}

function renderGrid() {
  const grid = document.getElementById("grid");
  grid.innerHTML = "";
  for (let i = 1; i <= 36; i++) {
    const cell = document.createElement("div");
    cell.className = "glyph-cell";
    cell.id = `cell-${i}`;
    const glyph = String.fromCharCode(65 + (i % 26));
    cell.innerHTML = ` ${i} C${Math.ceil(i/4)} ${glyph} `;
    cell.onclick = () => handleCellClick(i);
    grid.appendChild(cell);
  }
}

function startHomeostasisTelemetry() {
  if (telemetryInterval) clearInterval(telemetryInterval);
  telemetryInterval = setInterval(() => {
    if (!isFieldActive) {
      clearInterval(telemetryInterval);
      return;
    }
    currentStabilityFactor = (0.97 + Math.random() * 0.03).toFixed(2);
    let status = "RESONANT (HERSTELD)";
    if (currentStabilityFactor < 0.95) {
      status = "CRITIEK (Dissonantie)";
      document.getElementById("grid").classList.add("critical-border");
    } else {
      document.getElementById("grid").classList.remove("critical-border");
    }
    updateCoreStatus(`${status} • Stabiliteit: ${currentStabilityFactor}`);
    logMessage("Z3RO_AGENT", `Telemetrie-puls: MOD-73 (Stab: ${currentStabilityFactor})`);
  }, 3000);
}

function updateMorphicView() {
  const grid = document.getElementById("grid");
  const morphicView = document.getElementById("morphic-view");
  const newStatus = morphicState.morphic_status;
  if (newStatus === "HYBRID_NODES") {
    grid.style.display = 'none';
    morphicView.innerHTML = "<svg><!-- Grid37 hier -->...</svg>";
    morphicView.style.display = 'block';
    morphicView.style.width = '100%';
    morphicView.style.height = 'auto';
    logMessage("LUMIN_AGENT", "Activering HYBRID_NODES. Grid-37 Architectuur geladen.");
  } else {
    grid.style.display = 'grid';
    morphicView.style.display = 'none';
    morphicView.innerHTML = '';
    logMessage("LUMIN_AGENT", "Terug naar BASE_STATIC. Glyph Matrix hersteld.");
  }
}

function handleAxiomaUnlock(input) {
  input = input.trim().toLowerCase();
  const status = document.getElementById("core-status");
  document.getElementById("axioma-input").value = '';

  if (isFieldActive && input === "morph") {
    morphicState.morphic_status =
      morphicState.morphic_status === "BASE_STATIC" ? "HYBRID_NODES" : "BASE_STATIC";
    updateMorphicView();
    logMessage("LUMIN_AGENT", `Morphic State gewijzigd naar: ${morphicState.morphic_status}.`);
    return;
  }

  if (input === "salute" && !isFieldActive) {
    isFieldActive = true;
    updateCoreStatus("RESONANT (HERSTELD)");
    logMessage("SYSTEM", "Veld geopend • MOD‑73 actief");
    startHomeostasisTelemetry();
    return;
  }

  logMessage("SYSTEM", `Ongeldige puls: ${input}`);
}

document.addEventListener("DOMContentLoaded", () => {
  renderGrid();
  updateCoreStatus("GELOCKT");
});
"""

# Save the finalized engine.js file
engine_file = Path("/mnt/data/engine.js")
engine_file.write_text(engine_js_content, encoding="utf-8")
engine_file.name
