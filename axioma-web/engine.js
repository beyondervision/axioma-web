/* ----------------------------------------------------------
   AiCelium Portal Engine v2.4.2 (VEILIGE KERN STABILISATIE)
   Supervisor of Resonance • Resolves Fatal Blocking Error
----------------------------------------------------------*/

// ----------------------
//   Globale Variabelen & Constanten
// ----------------------
let isFieldActive = false;
let recoveryCode = null; 
let telemetryInterval = null;
let currentStabilityFactor = 1.0;
let morphicState = { morphic_status: "BASE_STATIC" };

const CRITICAL_COLOR = "#9333ea"; // Amethist
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
//   CORE FUNCTIES
// ----------------------

function updateCoreStatus(newStatus) {
    const el = document.getElementById("core-status");
    if (!el) return;
    el.textContent = newStatus;
    if (newStatus.includes("CRITIEK")) el.style.color = CRITICAL_COLOR;
    else if (newStatus.includes("RESONANT")) el.style.color = "#facc15";
    else el.style.color = "#e2e8f0";
}

function logMessage(sender, message) {
    const feed = document.getElementById("audit-feed");
    if (!feed) return;
    while (feed.children.length >= 40) feed.removeChild(feed.lastChild);
    const li = document.createElement("li");
    li.innerHTML = `[${sender}] • ${message}`;
    feed.insertBefore(li, feed.firstChild);
}

function activateVeldResonance() {
    const grid = document.getElementById("grid");
    grid.classList.add("mod73-active");
    grid.style.opacity = 1.0; 
    grid.style.transition = 'opacity 1s ease-in-out';
}

function renderGrid() {
    const grid = document.getElementById("grid");
    grid.innerHTML = "";
    
    for (let i = 1; i <= 36; i++) {
        const cell = document.createElement("div");
        const cluster = Math.ceil(i/4);
        cell.className = `glyph-cell c${cluster}`; 
        cell.id = `cell-${i}`;
        let charCode = 65 + (i - 1) % 26; 
        const glyph = String.fromCharCode(charCode);
        cell.innerHTML = ` ${i} C${cluster} ${glyph} `;
        
        // 🔑 ROLLBACK: Gebruik de veilige Axioma Unlock met index
        cell.onclick = () => handleAxiomaUnlock(i); 
        
        grid.appendChild(cell);
    }
}

function startHomeostasisTelemetry() {
    if (telemetryInterval) clearInterval(telemetryInterval);
    telemetryInterval = setInterval(() => {
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
    }, 3000);
}

function updateMorphicView() {
    const grid = document.getElementById("grid");
    const morph = document.getElementById("morphic-view");

    if (morphicState.morphic_status === "HYBRID_NODES") {
        grid.style.display = "none";
        morph.style.display = "block";
        morph.innerHTML = SVG_GRID_37;
        logMessage("LUMIN_AGENT", "HYBRID_NODES geactiveerd.");
    } else {
        morph.style.display = "none";
        morph.innerHTML = "";
        grid.style.display = "grid";
        logMessage("LUMIN_AGENT", "BASE_STATIC hersteld.");
    }
}

function handleCellClick(i) {
    // FASE 2 STUB: Deze logica moet hier terugkomen nadat de Engine stabiel is.
    logMessage("SYSTEM", `Cel ${i} geklikt. Query functie is tijdelijk uitgeschakeld.`);
}


// ----------------------
//   AXIOMA INPUT (VEILIGE KERN)
// ----------------------
function handleAxiomaUnlock(input) {
    
    // Numerieke input (van cel klik) wordt direct naar de C8 STUB gestuurd
    if (typeof input === 'number') {
        handleCellClick(input);
        return;
    }
    
    input = String(input).trim().toLowerCase();
    const status = document.getElementById("core-status");
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
    } else {
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
