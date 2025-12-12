from pathlib import Path

# Samengevoegde engine.js inhoud inclusief:
# - Fase 1: Beveiliging (Z3RO Canonieke toegang)
# - Fase 2: Semantisch veld bij cell-click
# - Stabiele toggle van morphic views
engine_path = Path("/mnt/data/engine_v2.4.2_stabiel_fase1_fase2.js")

engine_code = """
/* ----------------------------------------------------------
   AiCelium Portal Engine v2.4.2 (STABIEL, FASE 1 + FASE 2)
   Supervisor of Resonance • Canonieke beveiliging + Semantische klikvelden
----------------------------------------------------------*/

// --- Globale Variabelen ---
let isFieldActive = false;
let recoveryCode = null;
let telemetryInterval = null;
let currentStabilityFactor = 1.0;
let morphicState = {
  morphic_status: "BASE_STATIC"
};
const CANONIEKE_CODE = "z3ro";
const CRITICAL_COLOR = "#9333ea"; // Amethist

// --- FIELD MAP (9 CLUSTERS x 4 CELLS = 36) ---
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

// --- Morphic View Switch ---
function updateMorphicView() {
  const grid = document.getElementById("grid");
  const morphicView = document.getElementById("morphic-view");
  if (morphicState.morphic_status === "HYBRID_NODES") {
    grid.style.display = "none";
    morphicView.style.display = "block";
    morphicView.innerHTML = "<p>Morphic Layer · HYBRID_NODES actief</p>";
  } else {
    grid.style.display = "grid";
    morphicView.style.display = "none";
    morphicView.innerHTML = "";
  }
}

// --- Visuele functies ---
function updateCoreStatus(newStatus) {
  const el = document.getElementById("core-status");
  if (el) el.textContent = newStatus;
}

function logMessage(sender, msg) {
  const feed = document.getElementById("audit-feed");
  if (!feed) return;
  const li = document.createElement("li");
  li.textContent = `[${sender}] • ${msg}`;
  feed.prepend(li);
}

function activateVeldResonance() {
  const grid = document.getElementById("grid");
  grid.style.opacity = 1.0;
}

// --- Cell Grid ---
function renderGrid() {
  const grid = document.getElementById("grid");
  grid.innerHTML = "";
  for (let i = 1; i <= 36; i++) {
    const cluster = Math.ceil(i / 4);
    const glyph = String.fromCharCode(65 + (i - 1) % 26);
    const cell = document.createElement("div");
    cell.className = `glyph-cell c${cluster}`;
    cell.id = `cell-${i}`;
    cell.innerHTML = `${i} C${cluster} ${glyph}`;
    cell.onclick = () => handleCellClick(i);
    grid.appendChild(cell);
  }
}

function handleCellClick(i) {
  if (!isFieldActive) {
    logMessage("SYSTEM", "Veld is GELOCKT. Gebruik Canonieke code.");
    return;
  }
  const cluster = FIELD_MAP[i].cluster;
  const file = FIELD_MAP[i].file;
  const glyph = document.getElementById(`cell-${i}`).textContent.trim();
  logMessage(cluster, `Cel ${i} (Glyph ${glyph}) geactiveerd.`);
  document.getElementById("synapse-content").innerHTML = `Active Query: <strong>${cluster} - Cel ${i}</strong><br>Data Pad: <code>${file}</code>`;
}

// --- Axioma Pulsen ---
function handleAxiomaUnlock(input) {
  input = String(input).trim().toLowerCase();
  document.getElementById("axioma-input").value = '';

  if (isFieldActive && input === "morph") {
    morphicState.morphic_status = (morphicState.morphic_status === "BASE_STATIC") ? "HYBRID_NODES" : "BASE_STATIC";
    updateMorphicView();
    logMessage("LUMIN_AGENT", `Morphic State gewijzigd naar: ${morphicState.morphic_status}.`);
    return;
  }

  if (input === CANONIEKE_CODE && !isFieldActive) {
    isFieldActive = true;
    updateCoreStatus("RESONANT (HERSTELD)");
    activateVeldResonance();
    logMessage("SYSTEM", `Canonieke code ${CANONIEKE_CODE.toUpperCase()} geaccepteerd. Veld geopend.`);
    return;
  }

  if (input === "salute") {
    logMessage("SYSTEM", `Toegang geweigerd. Gebruik Canonieke code: ${CANONIEKE_CODE.toUpperCase()}`);
  } else {
    logMessage("SYSTEM", `Ongeldige puls: ${input}`);
  }
}

// --- Init bij laden ---
document.addEventListener("DOMContentLoaded", () => {
  renderGrid();
  updateCoreStatus("GELOCKT");
});
"""

engine_path.write_text(engine_code, encoding="utf-8")
engine_path.name
