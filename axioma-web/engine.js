/* ----------------------------------------------------------
   AiCelium Portal Engine v2.4 (FINALE, CANONIEKE SYNTAX FIX)
   Supervisor of Resonance • Morphic Layer V2.1
----------------------------------------------------------*/

// ----------------------
//   Globale Variabelen
// ----------------------
[cite_start]let isFieldActive = false; [cite: 20]
[cite_start]let recoveryCode = null; [cite: 20]
let telemetryInterval = null;
let currentStabilityFactor = 1.0;
let morphicState = {
    morphic_status: "BASE_STATIC"
[cite_start]}; [cite: 21]

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
    21:{cluster:"C6", file:"readme/C6-gateway.md"},22:{cluster:"C6", file:"readme/C6-gateway.md"},23:{cluster:"C6", file:"readme/C6-gateway.md"},24:{cluster:"C6", file:"readme/C6-gateway.md"},
    25:{cluster:"C7", file:"readme/C7-pulse_chain.md"},26:{cluster:"C7", file:"readme/C7-pulse_chain.md"},27:{cluster:"C7", file:"readme/C7-pulse_chain.md"},28:{cluster:"C7", file:"readme/C7-pulse_chain.md"},
    29:{cluster:"C8", file:"readme/C8-semantisch_veld.md"},30:{cluster:"C8", file:"readme/C8-semantisch_veld.md"},31:{cluster:"C8", file:"readme/C8-semantisch_veld.md"},32:{cluster:"C8", file:"readme/C8-semantisch_veld.md"},
    33:{cluster:"C9", file:"readme/C9-handbook_operatie.md"},34:{cluster:"C9", file:"readme/C9-handbook_operatie.md"},35:{cluster:"C9", file:"readme/C9-handbook_operatie.md"},36:{cluster:"C9", file:"readme/C9-handbook_operatie.md"}
[cite_start]}; [cite: 22]

// ----------------------
//   SVG ARCHIEF (Morphic View Data)
// ----------------------

const SVG_GRID_37 = `<div style="width:100%; text-align:center; color:#00eaff; font-family:Orbitron;">
    <h2>Grid‑37 Resonantieveld</h2>
    <p>0/37 – Supralocatie • AiCelium Architectuur</p>
</div>
[cite_start]`; [cite: 23]
const SVG_PORTAL_HYBRID = `<div style="width:100%; text-align:center; color:#00eaff; font-family:Orbitron;">
    <h2>HYBRID PORTAL VIEW</h2>
    <p>C1–C9 Autonomous Layout</p>
</div>
[cite_start]`; [cite: 24]

// ----------------------
//   GRID BUILDING
// ----------------------
function renderGrid() {
    const grid = document.getElementById("grid");
    [cite_start]grid.innerHTML = ""; [cite: 25]
    
    [cite_start]for (let i = 1; i <= 36; i++) { [cite: 26]
        const cell = document.createElement("div");
        
        // FIX 1: Canonieke Class Fix - Voeg de cluster-kleurklasse toe
        [cite_start]const clusterClass = `c${FIELD_MAP[i].cluster.replace('C', '')}`; [cite: 27]
        [cite_start]cell.className = `glyph-cell ${clusterClass}`; [cite: 28]
        
        cell.id = `cell-${i}`;

        // FIX 2: Canonieke Alphabet Mapping (A=1)
        let charCode = 65 + (i - 1) % 26; 
        [cite_start]const glyph = String.fromCharCode(charCode); [cite: 29]

        cell.innerHTML = `
            <span class="cell-index">${i}</span>
            <span class="cell-cluster">${FIELD_MAP[i].cluster}</span>
            <span class="cell-glyph">${glyph}</span>
        `;
        
        [cite_start]cell.onclick = () => handleCellClick(i); [cite: 30]
        grid.appendChild(cell);
    }
}


// ----------------------
//   CORE STATUS
// ----------------------
function updateCoreStatus(newStatus) {
    [cite_start]const el = document.getElementById("core-status"); [cite: 31]
    if (!el) return;

    el.textContent = newStatus;

    if (newStatus.includes("CRITIEK")) el.style.color = CRITICAL_COLOR;
    else if (newStatus.includes("RESONANT")) el.style.color = "#facc15";
    [cite_start]else el.style.color = "#e2e8f0"; [cite: 32]
}


// ----------------------
//   LOGGING
// ----------------------
function logMessage(sender, message) {
    [cite_start]const feed = document.getElementById("audit-feed"); [cite: 33]
    if (!feed) return;

    while (feed.children.length >= 40) feed.removeChild(feed.lastChild);

    const li = document.createElement("li");
    li.innerHTML = `[${sender}] • ${message}`;
    [cite_start]feed.insertBefore(li, feed.firstChild); [cite: 34]
}


// ----------------------
//   TELEMETRY ENGINE
// ----------------------
function startHomeostasisTelemetry() {
    if (telemetryInterval) clearInterval(telemetryInterval);
    [cite_start]telemetryInterval = setInterval(() => { [cite: 35]
        if (!isFieldActive) return;

        currentStabilityFactor = (0.97 + Math.random() * 0.03).toFixed(2);

        let status = "RESONANT (HERSTELD)";
        if (currentStabilityFactor < 0.95) {
            status = "CRITIEK (DISSONANTIE)";
            document.getElementById("grid").classList.add("critical-border");
        } else {
            [cite_start]document.getElementById("grid").classList.remove("critical-border"); [cite: 36]
        }

        updateCoreStatus(`${status} • Stabiliteit: ${currentStabilityFactor}`);
        logMessage("Z3RO", `Telemetry Puls: ${currentStabilityFactor}`);

    [cite_start]}, 3000); [cite: 37]
}


// ----------------------
//   MORPHIC VIEW SWITCH
// ----------------------
function updateMorphicView() {
    const grid = document.getElementById("grid");
    [cite_start]const morph = document.getElementById("morphic-view"); [cite: 38]

    if (morphicState.morphic_status === "HYBRID_NODES") {
        grid.style.display = "none";
        [cite_start]morph.style.display = "block"; [cite: 39]
        morph.innerHTML = SVG_GRID_37;
        logMessage("LUMIN_AGENT", "HYBRID_NODES geactiveerd.");
    } else {
        morph.style.display = "none";
        [cite_start]morph.innerHTML = ""; [cite: 40]
        grid.style.display = "grid";
        logMessage("LUMIN_AGENT", "BASE_STATIC hersteld.");
    }
}


// ----------------------
//   CELL ACTIVATION
// ----------------------
function handleCellClick(i) {
    if (!isFieldActive) {
        [cite_start]logMessage("SYSTEM", "Veld is GELOCKT. Gebruik 'salute'."); [cite: 41]
        return;
    }

    const cluster = FIELD_MAP[i].cluster;
    const glyph = document.getElementById(`cell-${i}`).querySelector(".cell-glyph").textContent;

    logMessage(cluster, `Activatie Cel ${i} (Glyph ${glyph})`);
    document.getElementById("synapse-content").innerHTML =
        [cite_start]`Active Cluster: ${cluster}<br>Pad: ${FIELD_MAP[i].file}`; [cite: 42]
}


// ----------------------
//   AXIOMA INPUT (salute / morph)
// ----------------------
function handleAxiomaUnlock(input) {
    [cite_start]input = input.trim().toLowerCase(); [cite: 44]
    const status = document.getElementById("core-status");

    // PULS: morph
    if (isFieldActive && input === "morph") {
        morphicState.morphic_status =
            morphicState.morphic_status === "BASE_STATIC"
                ?
                [cite_start]"HYBRID_NODES" [cite: 45]
                : "BASE_STATIC";

        updateMorphicView();
        [cite_start]return; [cite: 46]
    }

    // PULS: salute
    if (input === "salute" && !isFieldActive) {
        [cite_start]isFieldActive = true; [cite: 47]
        updateCoreStatus("RESONANT (HERSTELD)");
        logMessage("SYSTEM", "Veld geopend • MOD‑73 actief");
        startHomeostasisTelemetry();
        [cite_start]return; [cite: 48]
    }

    // Ongeldig
    [cite_start]logMessage("SYSTEM", `Ongeldige puls: ${input}`); [cite: 49]
}


// ----------------------
//   INIT ON LOAD
// ----------------------
document.addEventListener("DOMContentLoaded", () => {
    renderGrid();
    updateCoreStatus("GELOCKT");
});
