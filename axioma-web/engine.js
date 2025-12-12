/* ----------------------------------------------------------
   AiCelium Portal Engine v2.4.2 (FINALE, FASE 2: DATA KOPPELING)
   Supervisor of Resonance • Morphic Layer V2.1
----------------------------------------------------------*/

// ----------------------
//   Globale Variabelen & Constanten
// ----------------------
let isFieldActive = false;
let recoveryCode = null; 
let telemetryInterval = null;
let currentStabilityFactor = 1.0;
let morphicState = { morphic_status: "BASE_STATIC" };

const CRITICAL_COLOR = "#9333ea"; // Amethist [cite: 3]
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

const SVG_GRID_37 = `<div style="width:100%; text-align:center; color:#00eaff; font-family:Orbitron;"><h2>Grid‑37 Resonantieveld</h2><p>0/37 – Supralocatie • AiCelium Architectuur</p></div>`; [cite: 4]
const SVG_PORTAL_HYBRID = `<div style="width:100%; text-align:center; color:#00eaff; font-family:Orbitron;"><h2>Portal Hybrid View</h2><p>C1–C9 Autonomous Layout</p></div>`; [cite: 5]


// ----------------------
//   CORE FUNCTIES
// ----------------------

function updateCoreStatus(newStatus) {
    const el = document.getElementById("core-status");
    if (!el) return;
    el.textContent = newStatus;
    if (newStatus.includes("CRITIEK")) el.style.color = CRITICAL_COLOR; [cite: 7]
    else if (newStatus.includes("RESONANT")) el.style.color = "#facc15";
    else el.style.color = "#e2e8f0"; [cite: 7]
}

function logMessage(sender, message) {
    const feed = document.getElementById("audit-feed");
    if (!feed) return;
    while (feed.children.length >= 40) feed.removeChild(feed.lastChild);
    const li = document.createElement("li"); [cite: 9]
    li.innerHTML = `[${sender}] • ${message}`;
    feed.insertBefore(li, feed.firstChild); [cite: 9]
}

function activateVeldResonance() {
    const grid = document.getElementById("grid");
    grid.classList.add("mod73-active"); [cite: 11]
    grid.style.opacity = 1.0; 
    grid.style.transition = 'opacity 1s ease-in-out'; [cite: 12]
}

function renderGrid() {
    const grid = document.getElementById("grid");
    grid.innerHTML = "";
    
    for (let i = 1; i <= 36; i++) { [cite: 13]
        const cell = document.createElement("div");
        const cluster = Math.ceil(i/4); [cite: 14]
        cell.className = `glyph-cell c${cluster}`; 
        cell.id = `cell-${i}`; [cite: 15]
        let charCode = 65 + (i - 1) % 26; 
        const glyph = String.fromCharCode(charCode);
        cell.innerHTML = ` ${i} C${cluster} ${glyph} `; [cite: 16]
        cell.onclick = () => handleAxiomaUnlock(i); [cite: 17]
        grid.appendChild(cell); [cite: 17]
    }
}

function startHomeostasisTelemetry() {
    if (telemetryInterval) clearInterval(telemetryInterval); [cite: 18]
    telemetryInterval = setInterval(() => { [cite: 18]
        if (!isFieldActive) clearInterval(telemetryInterval);
        currentStabilityFactor = (0.97 + Math.random() * 0.03).toFixed(2);
        let status = "RESONANT (HERSTELD)";
        if (currentStabilityFactor < 0.95) {
            status = "CRITIEK (Dissonantie)";
            document.getElementById("grid").classList.add("critical-border");
        } else {
            document.getElementById("grid").classList.remove("critical-border");
        }
        updateCoreStatus(`${status} • Stabiliteit: ${currentStabilityFactor}`);
        logMessage("Z3RO", `Telemetry Puls: ${currentStabilityFactor}`);
    }, 3000); [cite: 19]
}

function updateMorphicView() {
    const grid = document.getElementById("grid");
    const morph = document.getElementById("morphic-view");
    const newStatus = morphicState.morphic_status;
    
    if (newStatus === "HYBRID_NODES") { [cite: 20]
        grid.style.display = "none";
        morph.style.display = "block";
        morph.innerHTML = SVG_GRID_37;
        logMessage("LUMIN_AGENT", "HYBRID_NODES geactiveerd."); [cite: 21]
    } else {
        morph.style.display = "none"; [cite: 22]
        morph.innerHTML = "";
        grid.style.display = "grid";
        logMessage("LUMIN_AGENT", "BASE_STATIC hersteld."); [cite: 23]
    }
}

// 🔑 FASE 2 IMPLEMENTATIE
function handleCellClick(i) {
    if (!isFieldActive) {
        logMessage("SYSTEM", `Veld is GELOCKT. Gebruik Canonieke code.`);
        return;
    }
    
    // FASE 2 FIX: Haal volledige data op uit FIELD_MAP
    const cluster = FIELD_MAP[i].cluster;
    const file = FIELD_MAP[i].file;
    // We gebruiken de DOM Query in de logs, maar de innerHTML kan direct de data tonen.
    const glyph = document.getElementById(`cell-${i}`).querySelector(".cell-glyph").textContent; 

    logMessage(cluster, `Activatie Cel ${i} (Glyph ${glyph}) - Query gestart.`);
    
    // Toon de gedetailleerde query in de Synapse
    document.getElementById("synapse-content").innerHTML = 
        `Active Query: <strong>${cluster} - Cel ${i}</strong><br>` + 
        `Data Pad: <code>${file}</code>`;
}


// ----------------------
//   AXIOMA INPUT (FASE 1 BEVEILIGING & FASE 2)
// ----------------------
function handleAxiomaUnlock(input) {
    // 🔑 FASE 2 FIX: Numerieke input (cell index) validatie
    if (!isNaN(input) && isFieldActive) { [cite: 25]
        const cellIndex = parseInt(input);
        
        // Valideer of de index binnen het bereik ligt (1 t/m 36)
        if (cellIndex >= 1 && cellIndex <= 36) { [cite: 33]
            handleCellClick(cellIndex); 
            return;
        }
    }
    
    input = String(input).trim().toLowerCase();
    const status = document.getElementById("core-status"); [cite: 26]
    document.getElementById("axioma-input").value = '';

    // PULS: morph
    if (isFieldActive && input === "morph") {
        if (morphicState.morphic_status === "BASE_STATIC") {
            morphicState.morphic_status = "HYBRID_NODES"; [cite: 27]
        } else {
            morphicState.morphic_status = "BASE_STATIC"; [cite: 27]
        }
        updateMorphicView();
        logMessage("LUMIN_AGENT", `Morphic State gewijzigd naar: ${morphicState.morphic_status}.`); [cite: 28]
        return;
    }

    // PULS: Z3RO (FASE 1 BEVEILIGING)
    if (input === CANONIEKE_CODE && !isFieldActive) {
        isFieldActive = true;
        updateCoreStatus("RESONANT (HERSTELD)"); [cite: 29]
        activateVeldResonance(); 
        logMessage("SYSTEM", `Canonieke code ${CANONIEKE_CODE.toUpperCase()} geaccepteerd. Veld geopend.`); [cite: 30]
        startHomeostasisTelemetry();
        return;
    }

    // Ongeldige puls
    if (input === "salute") {
        logMessage("SYSTEM", `Toegang geweigerd. Gebruik Canonieke code: ${CANONIEKE_CODE.toUpperCase()}`);
    } else {
        logMessage("SYSTEM", `Ongeldige puls: ${input}`); [cite: 31]
    }
}


// ----------------------
//   INIT ON LOAD
// ----------------------
document.addEventListener("DOMContentLoaded", () => {
    renderGrid();
    updateCoreStatus("GELOCKT");
});
