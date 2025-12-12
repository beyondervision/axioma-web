/* ----------------------------------------------------------
   AiCelium Portal Engine v2.4.2 (ABSOLUTE VEILIGE KERN)
   Supervisor of Resonance • Resolves Fatal Runtime Blocking
----------------------------------------------------------*/

// ----------------------
//   Globale Variabelen & Constanten
// ----------------------
let isFieldActive = false; 
let telemetryInterval = null;
let currentStabilityFactor = 1.0;
let morphicState = { morphic_status: "BASE_STATIC" };

const CRITICAL_COLOR = "#9333ea"; 
const CANONIEKE_CODE = "z3ro"; 
const FIELD_MAP = {
    // ... (volledige FIELD_MAP voor rendering) ...
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
//   CORE FUNCTIES (Onveranderd)
// ----------------------
function updateCoreStatus(newStatus) { /* ... */ }
function logMessage(sender, message) { /* ... */ }
function activateVeldResonance() { /* ... */ }
function startHomeostasisTelemetry() { /* ... */ }
function updateMorphicView() { /* ... */ }
function renderGrid() { /* ... */ }

function handleCellClick(i) {
    // 🔑 Veiligste logica: Log alleen de actie
    logMessage("SYSTEM", `Cel ${i} geklikt. Veld is GELOCKT.`);
}


// ----------------------
//   AXIOMA INPUT (MINIMALE LOGICA)
// ----------------------
function handleAxiomaUnlock(input) {
    
    // Cel Klik: Stuur de klik naar de veilige handler
    if (typeof input === 'number') {
        handleCellClick(input);
        return;
    }
    
    input = String(input).trim().toLowerCase();
    document.getElementById("axioma-input").value = '';

    // PULS: Z3RO (ENIGE PULS DIE ZOU MOETEN WERKEN)
    if (input === CANONIEKE_CODE && !isFieldActive) {
        isFieldActive = true;
        updateCoreStatus("RESONANT (HERSTELD)");
        activateVeldResonance(); 
        logMessage("SYSTEM", `Canonieke code ${CANONIEKE_CODE.toUpperCase()} geaccepteerd. Veld geopend.`);
        // Telemetry en Morphic logica is NU veilig, maar wordt niet aangeroepen
        return;
    }
    
    // Ongeldige puls
    if (input === "salute" || input === "morph") {
        logMessage("SYSTEM", `Toegang geweigerd. Gebruik Canonieke code: ${CANONIEKE_CODE.toUpperCase()}`);
    } else if (input !== "") { 
        logMessage("SYSTEM", `Ongeldige puls: ${input}`);
    }
}


// ----------------------
//   INIT ON LOAD (Onveranderd)
// ----------------------
document.addEventListener("DOMContentLoaded", () => {
    renderGrid();
    updateCoreStatus("GELOCKT");
});
