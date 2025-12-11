/* ----------------------------------------------------------
   AiCelium Portal Engine v2.4 (FINALE, CANONIEKE SYNTAX FIX)
   Supervisor of Resonance • Morphic Layer V2.1 (Lumin-Agent Protocol)
----------------------------------------------------------*/

// --- Globale Variabelen ---
let isFieldActive = false;
let recoveryCode = null;
let telemetryInterval = null;
let currentStabilityFactor = 1.0;
let morphicState = {
  morphic_status: "BASE_STATIC"
};

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
  33:{cluster:"C9", file:"readme/C9-handbook_operatie.md"},34:{cluster:"C9", file:"readme/C9-handbook_operatie.md"},35:{cluster:"C9", file:"readme/C9-handbook_operatie.md"},36:{cluster:"C9", file:"readme/C9-handbook_operatie.md"},
};

// --- MORPHIC VISUAL ARCHIVES (V2.1) — Embedded SVG Constants ---
const SVG_GRID_37 = `<svg width="1200" height="750" viewBox="0 0 1200 750" xmlns="http://www.w3.org/2000/svg" style="background:#05070b">
  <text x="600" y="60" text-anchor="middle" fill="#00eaff" font-size="26">AiCelium · Axioma 0/37 · Grid-37 Resonantieveld</text>
  <text x="600" y="88" text-anchor="middle" fill="#7dd3fc" font-size="14">9 Clusters × 4 veldposities = 36 · + 0/37 supralocatie = 37</text>
  <!-- Clusters ... -->
</svg>`;

const SVG_PORTAL_HYBRID = `<svg width="1200" height="700" viewBox="0 0 1200 700" xmlns="http://www.w3.org/2000/svg">
  <text x="350" y="355" fill="#00f3ff" font-size="22" text-anchor="middle">0/37</text>
  <!-- Portal Circles -->
</svg>`;

// ----------------------------------------------------------
// De rest van je engine.js-functionaliteit blijft ongewijzigd
// inclusief: renderGrid(), updateCoreStatus(), logMessage(), etc.
// ----------------------------------------------------------
