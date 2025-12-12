/* ----------------------------------------------------------
   AiCelium Portal Engine v2.4.2 (VEILIGE KERN - HERSTELD)
   Supervisor of Resonance • Stabiel en Operationeel
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
    // ... (Volledige FIELD_MAP voor rendering) ...
};
const SVG_GRID_37 = `<div style="width:100%; text-align:center; color:#00eaff; font-family:Orbitron;"><h2>Grid‑37 Resonantieveld</h2><p>0/37 – Supralocatie • AiCelium Architectuur</p></div>`;
const SVG_PORTAL_HYBRID = `<div style="width:100%; text-align:center; color:#00eaff; font-family:Orbitron;"><h2>Portal Hybrid View</h2><p>C1–C9 Autonomous Layout</p></div>`;


// ----------------------
//   CORE FUNCTIES
// ----------------------
function updateCoreStatus(newStatus) { /* ... */ }
function logMessage(sender, message) { /* ... */ }
function activateVeldResonance() { /* ... */ }
function startHomeostasisTelemetry() { /* ... */ }
function updateMorphicView() { /* ... */ }

function renderGrid() {
    const grid = document.getElementById("grid");
    if (!grid) return; 
    grid.innerHTML = "";
    
    for (let i = 1; i <= 36; i++) {
        const cell = document.createElement("div");
        const cluster = Math.ceil(i/4);
        cell.className = `glyph-cell c${cluster}`; 
        cell.id = `cell-${i}`;
        let charCode = 65 + (i - 1) % 26; 
        const glyph = String.fromCharCode(charCode);
        cell.innerHTML = ` ${i} C${cluster} ${glyph} `;
        
        // Clicks linken naar Axioma Unlock
        cell.onclick = () => handleAxiomaUnlock(i); 
        
        grid.appendChild(cell);
    }
}

// *** DUMMY FUNCTIE om de code niet te laten crashen ***
function handleCellClick(i) {
    logMessage("SYSTEM", `Cel ${i} geklikt. Query functie is GELOCKT.`);
}


// ----------------------
//   AXIOMA INPUT (VEILIGE KERN)
// ----------------------
function handleAxiomaUnlock(input) {
    
    // Numerieke input (van cel klik) wordt direct naar de DUMMY STUB gestuurd
    if (typeof input === 'number') {
        handleCellClick(input);
        return;
    }
    
    input = String(input).trim().toLowerCase();
    document.getElementById("axioma-input").value = '';

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
//   INIT ON LOAD
// ----------------------
document.addEventListener("DOMContentLoaded", () => {
    renderGrid();
    updateCoreStatus("GELOCKT");
});
