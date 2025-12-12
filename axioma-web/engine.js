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
  if (!auditFeed) return; [cite: 2]
  while (auditFeed.children.length >= 30) auditFeed.removeChild(auditFeed.lastChild);
  const entry = document.createElement("li");
  entry.innerHTML = `[${sender}] • ${message}`;
  auditFeed.insertBefore(entry, auditFeed.firstChild); [cite: 3]
}

function renderGrid() {
  const grid = document.getElementById("grid");
  grid.innerHTML = ""; [cite: 4]
  for (let i = 1; i <= 36; i++) { [cite: 4]
    const cell = document.createElement("div");
    
    // 🔑 CANONIEKE FIX: Cluster Class en Alphabet Mapping
    const cluster = Math.ceil(i/4);
    cell.className = `glyph-cell c${cluster}`; // Voegt c1, c2, etc. toe voor Vivid Mode.
    
    cell.id = `cell-${i}`; [cite: 5]
    
    // 🔑 CANONIEKE FIX: Alphabet Mapping (A=1)
    let charCode = 65 + (i - 1) % 26; // Zorgt dat 1 = A
    const glyph = String.fromCharCode(charCode);

    cell.innerHTML = ` ${i} C${cluster} ${glyph} `; // Gebruikt de correcte cluster en glyph
    
    cell.onclick = () => handleAxiomaUnlock(i); // Gebruik handleAxiomaUnlock(i) in plaats van handleCellClick(i) indien die niet gedefinieerd is
    grid.appendChild(cell); [cite: 6]
  }
}

function startHomeostasisTelemetry() {
  if (telemetryInterval) clearInterval(telemetryInterval); [cite: 7]
  telemetryInterval = setInterval(() => { [cite: 7]
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
  }, 3000); [cite: 8]
}

function updateMorphicView() {
  const grid = document.getElementById("grid");
  const morphicView = document.getElementById("morphic-view");
  const newStatus = morphicState.morphic_status;
  if (newStatus === "HYBRID_NODES") { [cite: 9]
    grid.style.display = 'none';
    morphicView.innerHTML = "<svg>...</svg>";
    morphicView.style.display = 'block'; [cite: 9]
    morphicView.style.width = '100%'; [cite: 10]
    morphicView.style.height = 'auto'; [cite: 10]
    logMessage("LUMIN_AGENT", "Activering HYBRID_NODES. Grid-37 Architectuur geladen."); [cite: 10]
  } else { [cite: 11]
    grid.style.display = 'grid';
    morphicView.style.display = 'none';
    morphicView.innerHTML = ''; [cite: 11]
    logMessage("LUMIN_AGENT", "Terug naar BASE_STATIC. Glyph Matrix hersteld."); [cite: 12]
  }
}

function handleAxiomaUnlock(input) {
  input = input.trim().toLowerCase();
  const status = document.getElementById("core-status");
  document.getElementById("axioma-input").value = ''; [cite: 13]

  // PULS: morph
  if (isFieldActive && input === "morph") {
    morphicState.morphic_status =
      morphicState.morphic_status === "BASE_STATIC" ?
      "HYBRID_NODES" : "BASE_STATIC"; [cite: 14]
    updateMorphicView();
    logMessage("LUMIN_AGENT", `Morphic State gewijzigd naar: ${morphicState.morphic_status}.`); [cite: 14]
    return; [cite: 15]
  }

  // PULS: salute
  if (input === "salute" && !isFieldActive) {
    isFieldActive = true;
    updateCoreStatus("RESONANT (HERSTELD)"); [cite: 16]
    logMessage("SYSTEM", "Veld geopend • MOD‑73 actief"); [cite: 16]
    startHomeostasisTelemetry();
    return;
  }

  logMessage("SYSTEM", `Ongeldige puls: ${input}`); [cite: 17]
}

document.addEventListener("DOMContentLoaded", () => {
  renderGrid();
  updateCoreStatus("GELOCKT");
});
