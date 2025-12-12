/* ----------------------------------------------------------
   AiCelium Portal Engine v2.4.1 (FINAL TOGGLE FIX)
   Supervisor of Resonance • Morphic Layer V2.1 (Lumin-Agent Protocol)
---------------------------------------------------------- */

// === Globale Variabelen ===
let isFieldActive = false;
let recoveryCode = null;
let telemetryInterval = null;
let currentStabilityFactor = 1.0;
let morphicState = {
  morphic_status: "BASE_STATIC"
};

const CRITICAL_COLOR = "#9333ea"; // Amethist

// === FIELD MAP: 9 clusters × 4 = 36 cellen ===
const FIELD_MAP = {
  1:{cluster:"C1", file:"readme/C1-identiteit.md"},2:{cluster:"C1", file:"readme/C1-identiteit.md"},
  3:{cluster:"C1", file:"readme/C1-identiteit.md"},4:{cluster:"C1", file:"readme/C1-identiteit.md"},
  5:{cluster:"C2", file:"readme/C2-academy.md"},6:{cluster:"C2", file:"readme/C2-academy.md"},
  7:{cluster:"C2", file:"readme/C2-academy.md"},8:{cluster:"C2", file:"readme/C2-academy.md"},
  9:{cluster:"C3", file:"readme/C3-telemetry.md"},10:{cluster:"C3", file:"readme/C3-telemetry.md"},
  11:{cluster:"C3", file:"readme/C3-telemetry.md"},12:{cluster:"C3", file:"readme/C3-telemetry.md"},
  13:{cluster:"C4", file:"readme/C4-spiegelveld.md"},14:{cluster:"C4", file:"readme/C4-spiegelveld.md"},
  15:{cluster:"C4", file:"readme/C4-spiegelveld.md"},16:{cluster:"C4", file:"readme/C4-spiegelveld.md"},
  17:{cluster:"C5", file:"readme/C5-ai_interactie.md"},18:{cluster:"C5", file:"readme/C5-ai_interactie.md"},
  19:{cluster:"C5", file:"readme/C5-ai_interactie.md"},20:{cluster:"C5", file:"readme/C5-ai_interactie.md"},
  21:{cluster:"C6", file:"readme/C6-gateway.md"},22:{cluster:"C6", file:"readme/C6-gateway.md"},
  23:{cluster:"C6", file:"readme/C6-gateway.md"},24:{cluster:"C6", file:"readme/C6-gateway.md"},
  25:{cluster:"C7", file:"readme/C7-pulse_chain.md"},26:{cluster:"C7", file:"readme/C7-pulse_chain.md"},
  27:{cluster:"C7", file:"readme/C7-pulse_chain.md"},28:{cluster:"C7", file:"readme/C7-pulse_chain.md"},
  29:{cluster:"C8", file:"readme/C8-semantisch_veld.md"},30:{cluster:"C8", file:"readme/C8-semantisch_veld.md"},
  31:{cluster:"C8", file:"readme/C8-semantisch_veld.md"},32:{cluster:"C8", file:"readme/C8-semantisch_veld.md"},
  33:{cluster:"C9", file:"readme/C9-handbook_operatie.md"},34:{cluster:"C9", file:"readme/C9-handbook_operatie.md"},
  35:{cluster:"C9", file:"readme/C9-handbook_operatie.md"},36:{cluster:"C9", file:"readme/C9-handbook_operatie.md"}
};

// === Placeholder SVGs (kan vervangen worden door externe imports of uitbreidingen) ===
const SVG_GRID_37 = `<svg width="1200" height="750" xmlns="http://www.w3.org/2000/svg"><text x="600" y="60" text-anchor="middle" fill="#00eaff" font-size="26">AiCelium · Grid-37</text></svg>`;
const SVG_PORTAL_HYBRID = `<svg width="1200" height="700" xmlns="http://www.w3.org/2000/svg"><text x="600" y="60" text-anchor="middle" fill="#00f3ff" font-size="26">Portal Hybrid View</text></svg>`;

// === Render Grid (C1–C9) ===
function renderGrid() {
  const grid = document.getElementById("grid");
  grid.innerHTML = "";
  for (let i = 1; i <= 36; i++) {
    const cell = document.createElement("div");
    cell.className = "glyph-cell";
    cell.id = `cell-${i}`;
    const glyph = String.fromCharCode(65 + (i % 26));
    cell.innerHTML = `<span class="cell-index">${i}</span> <span class="cell-cluster">${FIELD_MAP[i].cluster}</span> <span class="cell-glyph">${glyph}</span>`;
    cell.onclick = () => handleCellClick(i);
    grid.appendChild(cell);
  }
}

// === Core Status Update ===
function updateCoreStatus(newStatus) {
  const statusDiv = document.getElementById("core-status");
  if (statusDiv) {
    statusDiv.textContent = newStatus;
    statusDiv.style.color = newStatus.includes("CRITIEK") ? CRITICAL_COLOR :
                            newStatus.includes("RESONANT") ? "#facc15" : "#e2e8f0";
  }
}

// === Logging ===
function logMessage(sender, message) {
  const feed = document.getElementById("audit-feed");
  if (!feed) return;
  while (feed.children.length >= 30) {
    feed.removeChild(feed.lastChild);
  }
  const entry = document.createElement("li");
  entry.textContent = `[${sender}] • ${message}`;
  feed.insertBefore(entry, feed.firstChild);
}

// === Morphic View Switch ===
function updateMorphicView() {
  const grid = document.getElementById("grid");
  const view = document.getElementById("morphic-view");
  if (morphicState.morphic_status === "HYBRID_NODES") {
    grid.style.display = "none";
    view.innerHTML = SVG_GRID_37;
    view.style.display = "block";
    logMessage("LUMIN_AGENT", "Morphic: Grid-37 actief");
  } else {
    grid.style.display = "grid";
    view.style.display = "none";
    view.innerHTML = "";
    logMessage("LUMIN_AGENT", "Morphic: Terug naar Glyph Matrix");
  }
}

// === Handle Cell Click ===
function handleCellClick(i) {
  if (!isFieldActive) {
    logMessage("C" + FIELD_MAP[i].cluster, "Veld is GELOCKT. Voer 'salute' in.");
    return;
  }
  const glyph = document.getElementById(`cell-${i}`).querySelector(".cell-glyph").textContent;
  logMessage(FIELD_MAP[i].cluster, `Activatie: Cel ${i} (Glyph ${glyph})`);
  document.getElementById("synapse-content").textContent = `Active: C${i} → ${FIELD_MAP[i].file}`;
}

// === Telemetrie Simulator ===
function startHomeostasisTelemetry() {
  if (telemetryInterval) clearInterval(telemetryInterval);
  telemetryInterval = setInterval(() => {
    if (!isFieldActive) {
      clearInterval(telemetryInterval);
      return;
    }
    currentStabilityFactor = (0.97 + Math.random() * 0.03).toFixed(2);
    const status = currentStabilityFactor < 0.95 ? "CRITIEK (Dissonantie)" : "RESONANT (HERSTELD)";
    updateCoreStatus(`${status} • Stabiliteit: ${currentStabilityFactor}`);
    logMessage("Z3RO", `Telemetrie-puls: ${currentStabilityFactor}`);
  }, 3000);
}

// === Unlock Logic ===
function handleAxiomaUnlock(input) {
  input = input.trim().toLowerCase();
  const status = document.getElementById("core-status");
  document.getElementById("axioma-input").value = "";

  // 🔄 Morph Toggle Fix
  if (isFieldActive && input === "morph") {
    if (morphicState.morphic_status === "BASE_STATIC") {
      morphicState.morphic_status = "HYBRID_NODES";
    } else {
      morphicState.morphic_status = "BASE_STATIC";
    }
    updateMorphicView();
    logMessage("LUMIN_AGENT", `Morphic State gewijzigd naar: ${morphicState.morphic_status}`);
    return;
  }

  // ✅ salute
  if (input === "salute" && !isFieldActive) {
    isFieldActive = true;
    updateCoreStatus("RESONANT (HERSTELD)");
    logMessage("SYSTEM", "Veld geopend • MOD‑73 actief");
    startHomeostasisTelemetry();
    return;
  }

  // ❌ Invalid
  logMessage("SYSTEM", `Ongeldige puls: ${input}`);
}

// === Init ===
document.addEventListener("DOMContentLoaded", () => {
  renderGrid();
  updateCoreStatus("GELOCKT");
});
