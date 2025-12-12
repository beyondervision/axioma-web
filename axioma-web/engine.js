/* ----------------------------------------------------------
   AiCelium Portal Engine v2.4.3 (FINALE, FASE 4: REAL-TIME TELEMETRIE)
   Supervisor of Resonance • Geavanceerde C9/Audit Integratie
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
    // ... (volledige FIELD_MAP van 1-36, zoals eerder gedefinieerd)
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

// 🔑 FASE 3/4: CONFIGURATIE (Simuleert externe bron)
const ENGINE_CONFIG = {
    initial_status: "STANDBY",
    canonieke_code: "z3ro" 
};


// ----------------------
//   CORE FUNCTIES (UPDATE: C8, FASE 4)
// ----------------------

function updateCoreStatus(newStatus) { /* ... */ }
function logMessage(sender, message) { /* ... */ }
function activateVeldResonance() { /* ... */ }
function startHomeostasisTelemetry() { /* ... */ }
function updateMorphicView() { /* ... */ }
function renderGrid() { /* ... */ }


// FASE 2: HANDLE CELL CLICK (Geactiveerd door klik of numerieke puls)
function handleCellClick(i) {
    if (!isFieldActive) {
        logMessage("SYSTEM", `Veld is GELOCKT. Gebruik Canonieke code.`);
        return;
    }
    
    // FASE 2 FIX: Haal volledige data op uit FIELD_MAP en toon in Synapse
    const cluster = FIELD_MAP[i].cluster;
    const file = FIELD_MAP[i].file;
    const glyph = document.getElementById(`cell-${i}`).textContent.trim(); 

    logMessage(cluster, `Activatie Cel ${i} (Glyph ${glyph}) - Query gestart.`);
    
    // Toon de gedetailleerde query in de Synapse
    document.getElementById("synapse-content").innerHTML = 
        `Active Query: <strong>${cluster} - Cel ${i}</strong><br>` + 
        `Data Pad: <code>${file}</code>`;
}


// FASE 4: REAL-TIME STATUS FETCH
function fetchExternalStatus() {
    fetch('status.json')
        .then(response => response.json())
        .then(data => {
            // Update status met externe data
            updateCoreStatus(`STANDBY • Externe Status: ${data.status} (ZAS: ${data.ZAS_score})`); 
            logMessage("C9_AUTONOMIE", `Externe Telemetrie Geladen: ${data.last_check}`);
        })
        .catch(error => {
            logMessage("C9_AUTONOMIE", `Fout bij laden status.json: ${error.message}`);
            updateCoreStatus("ERROR (FALLBACK)");
        });
}


// ----------------------
//   AXIOMA INPUT (FINALE KERN & FASE 2 CHECK)
// ----------------------
function handleAxiomaUnlock(input) {
    
    const inputElement = document.getElementById("axioma-input");

    // 🔑 FASE 2 FIX: Numerieke input (cel klik of getal) validatie
    if (isFieldActive && !isNaN(input) && String(input).trim() !== "") {
        const cellIndex = parseInt(input);
        
        if (cellIndex >= 1 && cellIndex <= 36) {
            handleCellClick(cellIndex); 
            if (inputElement) inputElement.value = '';
            return;
        }
    }
    
    // Verwerk pulsen (strings)
    input = String(input).trim().toLowerCase();
    if (inputElement) inputElement.value = '';

    // PULS: morph
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

    // PULS: Z3RO (FASE 1 BEVEILIGING)
    if (input === CANONIEKE_CODE && !isFieldActive) {
        isFieldActive = true;
        updateCoreStatus("RESONANT (HERSTELD)");
        activateVeldResonance(); 
        logMessage("SYSTEM", `Canonieke code ${CANONIEKE_CODE.toUpperCase()} geaccepteerd. Veld geopend.`);
        startHomeostasisTelemetry();
        return;
    }

    // Ongeldige puls
    if (input === "salute") {
        logMessage("SYSTEM", `Toegang geweigerd. Gebruik Canonieke code: ${CANONIEKE_CODE.toUpperCase()}`);
    } else if (input !== "") { 
        logMessage("SYSTEM", `Ongeldige puls: ${input}`);
    }
}


// ----------------------
//   INIT ON LOAD (FASE 4)
// ----------------------
document.addEventListener("DOMContentLoaded", () => {
    renderGrid();
    
    // 🔑 FASE 4: Start de asynchrone fetch en geef een initiële status
    fetchExternalStatus();
    updateCoreStatus(ENGINE_CONFIG.initial_status); 
    
    logMessage("SYSTEM", "Opstart voltooid. Gereed voor puls.");
});
