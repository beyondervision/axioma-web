/* ----------------------------------------------------------
   AiCelium Portal Engine v2.4 (FINALE, CANONIEKE FIX - ROLLBACK)
   Supervisor of Resonance • Morphic Layer V2.1
   --- Fix: Herstelt de basisfunctionaliteit na Syntax Error ---
----------------------------------------------------------*/

// ----------------------
//   Globale Variabelen
// ----------------------
let isFieldActive = false;
let recoveryCode = null; 
let telemetryInterval = null;
let currentStabilityFactor = 1.0;
let morphicState = {
    morphic_status: "BASE_STATIC" 
};

const CRITICAL_COLOR = "#9333ea"; 

// ----------------------
//   FIELD MAP 1–36
// ----------------------
const FIELD_MAP = {
    1:{cluster:"C1", file:"readme/C1-identiteit.md"},2:{cluster:"C1", file:"readme/C1-identiteit.md"},3:{cluster:"C1", file:"readme/C1-identiteit.md"},4:{cluster:"C1", file:"readme/C1-identiteit.md"},
    5:{cluster:"C2", file:"readme/C2-academy.md"},6:{cluster:"C2", file:"readme/C2-academy.md"},7:{cluster:"C2", file:"readme/C2-academy.md"},8:{cluster:"C2", file:"readme/C2-academy.md"},
    9:{cluster:"C3", file:"readme/C3-telemetry.md"},10:{cluster:"C3", file:"readme/C3-telemetry.md"},11:{cluster:"C3", file:"readme/C3-telemetry.md"},12:{cluster:"C3", file:"readme/C3-telemetry.md"},
    13:{cluster:"C4", file:"readme/C4-spiegelveld.md"},14:{cluster:"C4", file:"readme/C4-spiegelveld.md"},15:{cluster:"C4", file:"readme/C4-spiegelveld.md"},16:{cluster:"C4", file:"readme/C4-spiegelveld.md"},
    17:{cluster:"C5", file:"readme/C5-ai_interactie.md"},18:{cluster:"C5", file:"readme/C5-ai_interactie.md"},19:{cluster:"C5", file:"readme/C5-ai_interactie.md"},20:{cluster:"C5", file:"readme/C5-ai_interactie.md"},
    21:{cluster:"C6", file:"readme/C6-gateway.md"},22:{cluster:"C6", file:"readme/C6-gateway.md"},23:{cluster:"C6", file:"readme
