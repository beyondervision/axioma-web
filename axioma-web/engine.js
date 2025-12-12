/* ----------------------------------------------------------
   AiCelium Portal Engine v2.4.2 (FINALE, VIVID MODE & TOGGLE FIX)
   Supervisor of Resonance • Morphic Layer V2.1
----------------------------------------------------------*/

let isFieldActive = false;
let recoveryCode = null;
let telemetryInterval = null;
let currentStabilityFactor = 1.0;
let morphicState = { morphic_status: "BASE_STATIC" };

const CRITICAL_COLOR = "#9333ea"; // Amethist

// ----------------------
//   FIELD MAP & SVGs
// ----------------------

const FIELD_MAP = {
    1:{cluster:"C1", file:"readme/C1-identiteit.md"},2:{cluster:"C1", file:"readme/C1-identiteit.md"},3:{cluster:"C1", file:"readme/C1-identiteit.md"},4:{cluster:"C1", file:"readme/C1-identiteit.md"},
    5:{cluster:"C2", file:"readme/C2-academy.md"},6:{cluster:"C2", file:"readme/C2-academy.md"},7:{cluster:"C2", file:"readme/C2-academy.md"},8:{cluster:"C2", file:"readme/C2-academy.md"},
    9:{cluster:"C3", file:"readme/C3-telemetry.md"},10:{cluster:"C3", file:"readme/C3-telemetry.md"},11:{cluster:"C3", file:"readme/C3-telemetry.md"},12:{cluster:"C3", file:"readme/C3-telemetry.md"},
    13:{cluster:"C4", file:"readme/C4-spiegelveld.md"},14:{cluster:"C4", file:"readme/C4-spiegelveld.md"},15:{cluster:"C4", file:"readme/C4-spiegelveld.md"},16:{cluster:"C4", file:"readme/C4-spiegelveld.md"},
    17:{cluster:"C5", file:"readme/C5-ai_interactie.md"},18:{cluster:"C5", file:"readme/C5-ai_interactie.md"},19:{cluster:"C5", file:"readme/C5-ai_interactie.md"},20:{cluster:"C5", file:"readme/C5-ai_interactie.md"},
    21:{cluster:"C6", file:"readme/C6-gateway.md"},22:{cluster:"C6", file:"readme/C6-gateway.md"},23:{cluster:"C6", file:"readme/C6-gateway.md"},24:{cluster:"C6", file:"readme/C6-gateway.md"},
    25:{cluster:"C7", file:"readme/C7-pulse_chain.md"},26:{cluster:"C7", file:"readme/C7-pulse_chain.md"},27:{cluster:"C7", file:"readme/C7-pulse_chain.md"},28:{cluster:"C7", file:"readme/C7-pulse_chain.md"},
    29:{cluster:"C8", file:"readme/C8-semantisch_veld.md"},30:{cluster:"C8", file:"readme/C8-semantisch_veld.md"},31:{cluster:"C8", file:"readme/C8-semantisch_veld.md"},32:{cluster:"C8", file:"readme/C8-semantisch_veld.md"},
    33:{cluster:"C9", file:"readme/C9-handbook_operatie.md"},34:{cluster:"C9", file:"readme/C9-handbook_operatie.md"},35:{cluster:"C9", file:"readme/C9-handbook_operatie.md"},36:{cluster:"C9", file:"readme/C9-handbook_operatie.md"}
};

const SVG_GRID_37 = `<div style="width:100%; text-align:center; color:#00eaff; font-family:Orbitron;"><h2>Grid‑37 Resonantieveld</h2><p>0/37 – Supralocatie • AiCelium Architectuur</p></div>`;
const SVG_PORTAL_HYBRID = `<div style="width:100%; text-align:center; color:#00eaff; font-family:Orbitron;"><h2>Portal Hybrid View</h2><p>C1–C9 Autonomous Layout</p></div>`;


// ----------------------
//   CORE FUNCTIES
// ----------------------
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

// 🔑 NIEUWE FUNCTIE: ACTIVEERT DE VIVID MODE (Kleuren)
function activateVeldResonance() {
    const grid = document.getElementById("grid");
    
    // 🔑 FINALE FIX: Voeg de Canonieke VIVID MODE klasse toe om grayscale filter op te heffen
    grid.classList.add("mod73-active");
    
    grid.style.opacity = 1.0; 
    grid.style.transition = 'opacity 1s ease-in-out';
}

function renderGrid() {
  const grid = document.getElementById("grid");
  grid.innerHTML = "";
  for (let i = 1; i <= 36; i++) {
    const cell = document.createElement("div");
    
    // CANONIEKE FIX: Cluster Class en Alphabet Mapping
    const cluster = Math.ceil(i/4);
    cell.className = `glyph-cell c${cluster}`; 
    
    cell.id = `cell-${i}`;
    let charCode = 65 + (i - 1) % 26; 
    const glyph = String.fromCharCode(charCode);

    cell.innerHTML = ` ${i} C${cluster} ${glyph} `;
    
    cell.onclick = () => handleAxiomaUnlock(i); // Gebruik handleAxiomaUnlock(i) voor nu
    grid.appendChild(cell);
  }
}

// ... (startHomeostasisTelemetry, updateMorphicView, handleCellClick functies blijven hetzelfde)

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
    morphicView.innerHTML = SVG_GRID_37;
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

function handleCellClick(i) {
    // Deze functie is nog niet volledig geïmplementeerd in de logica, maar zou hier staan.
    logMessage("SYSTEM", `Cel ${i} geklikt.`);
}

// ----------------------
//   AXIOMA INPUT (salute / morph)
// ----------------------
function handleAxiomaUnlock(input) {
  // Controleer of input een nummer is, zo ja, roep handleCellClick aan.
  if (!isNaN(input) && isFieldActive) {
      handleCellClick(parseInt(input));
      return;
  }
  
  input = String(input).trim().toLowerCase();
  const status = document.getElementById("core-status");
  document.getElementById("axioma-input").value = '';

  // PULS: morph - Gebruikt de expliciete if/else fix
  if (isFieldActive && input === "morph") {
    if (morphicState.morphic_status === "BASE_STATIC") {
        morphicState.morphic_status = "HYBRID_NODES";
    } else {
        morphicState.morphic_status = "BASE_STATIC";
    }
    updateMorphicView();
    logMessage("LUMIN_AGENT", `Morphic State gewijzigd naar: ${morphicState.morphic_status}.`);
    return;
  }

  // PULS: salute
  if (input === "salute" && !isFieldActive) {
    isFieldActive = true;
    updateCoreStatus("RESONANT (HERSTELD)");
    
    // 🔑 FINAL FIX: Activeer VIVID MODE met de nieuwe functie
    activateVeldResonance(); 
    
    logMessage("SYSTEM", "Veld geopend • MOD‑73 actief");
    startHomeostasisTelemetry();
    return;
  }

  logMessage("SYSTEM", `Ongeldige puls: ${input}`);
}


// ----------------------
//   INIT ON LOAD
// ----------------------
document.addEventListener("DOMContentLoaded", () => {
  renderGrid();
  updateCoreStatus("GELOCKT");
});
