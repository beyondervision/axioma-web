/* ----------------------------------------------------------
   AiCelium Portal Engine v2.4.2 (FINALE, FASE 2: DATA KOPPELING)
   Supervisor of Resonance • Geavanceerde C8 Query Logica
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
//   CORE FUNCTIES (Onveranderd)
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


// ----------------------
//   HANDLE CELL CLICK (FASE 2 IMPLEMENTATIE - C8 Query)
// ----------------------
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


// ----------------------
//   AXIOMA INPUT (FINALE KERN & FASE 2 CHECK)
// ----------------------
function handleAxiomaUnlock(input) {
    
    // 🔑 FASE 2 FIX: Numerieke input (cel klik of getal) validatie
    // Verwerk numerieke input (van een cel klik) of een getal in de input box
    if (isFieldActive && !isNaN(input) && String(input).trim() !== "") {
        const cellIndex = parseInt(input);
        
        // Valideer of de index binnen het bereik ligt (1 t/m 36)
        if (cellIndex >= 1 && cellIndex <= 36) {
            handleCellClick(cellIndex); 
            document.getElementById("axioma-input").value = ''; // Leeg de input na een succesvolle actie
            return;
        }
    }
    
    // Verwerk pulsen (strings)
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
    } else if (input !== "") { // Log alleen als de input niet leeg is
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
