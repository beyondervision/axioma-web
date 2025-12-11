/* ----------------------------------------------------------
   AiCelium Portal Engine v2.4
   Supervisor of Resonance • Morphic Layer V2.1
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
    17:{cluster:"C5", file:"readme/C5-ai_interactie.md"},18:{cluster:"C5", file:"readme/C5-ai_interactie.md"},19:{cluster:"C5", file:"readme/C5-ai_interactie.md"},20:{cluster:"C5-ai_interactie.md"},
    21:{cluster:"C6", file:"readme/C6-gateway.md"},22:{cluster:"C6", file:"readme/C6-gateway.md"},23:{cluster:"C6", file:"readme/C6-gateway.md"},24:{cluster:"C6", file:"readme/C6-gateway.md"},
    25:{cluster:"C7", file:"readme/C7-pulse_chain.md"},26:{cluster:"C7", file:"readme/C7-pulse_chain.md"},27:{cluster:"C7", file:"readme/C7-pulse_chain.md"},28:{cluster:"C7", file:"readme/C7-pulse_chain.md"},
    29:{cluster:"C8", file:"readme/C8-semantisch_veld.md"},30:{cluster:"C8", file:"readme/C8-semantisch_veld.md"},31:{cluster:"C8", file:"readme/C8-semantisch_veld.md"},32:{cluster:"C8", file:"readme/C8-semantisch_veld.md"},
    33:{cluster:"C9", file:"readme/C9-handbook_operatie.md"},34:{cluster:"C9", file:"readme/C9-handbook_operatie.md"},35:{cluster:"C9", file:"readme/C9-handbook_operatie.md"},36:{cluster:"C9-handbook_operatie.md"}
};


// ----------------------
//   SVG ARCHIEF
// ----------------------

const SVG_GRID_37 = `
<div style="width:100%; text-align:center; color:#00eaff; font-family:Orbitron;">
    <h2>Grid‑37 Resonantieveld</h2>
    <p>0/37 – Supralocatie • AiCelium Architectuur</p>
</div>
`;

const SVG_PORTAL_HYBRID = `
<div style="width:100%; text-align:center; color:#00eaff; font-family:Orbitron;">
    <h2>HYBRID PORTAL VIEW</h2>
    <p>C1–C9 Autonomous Layout</p>
</div>
`;


// ----------------------
//   GRID BUILDING
// ----------------------
function renderGrid() {
    const grid = document.getElementById("grid");
    grid.innerHTML = "";

    for (let i = 1; i <= 36; i++) {
        const cell = document.createElement("div");
        cell.className = "glyph-cell";
        cell.id = `cell-${i}`;

        const glyph = String.fromCharCode(65 + (i % 26));

        cell.innerHTML = `
            <span class="cell-index">${i}</span>
            <span class="cell-cluster">${FIELD_MAP[i].cluster}</span>
            <span class="cell-glyph">${glyph}</span>
        `;

        cell.onclick = () => handleCellClick(i);
        grid.appendChild(cell);
    }
}


// ----------------------
//   CORE STATUS
// ----------------------
function updateCoreStatus(newStatus) {
    const el = document.getElementById("core-status");
    if (!el) return;

    el.textContent = newStatus;

    if (newStatus.includes("CRITIEK")) el.style.color = CRITICAL_COLOR;
    else if (newStatus.includes("RESONANT")) el.style.color = "#facc15";
    else el.style.color = "#e2e8f0";
}


// ----------------------
//   LOGGING
// ----------------------
function logMessage(sender, message) {
    const feed = document.getElementById("audit-feed");
    if (!feed) return;

    while (feed.children.length >= 40) feed.removeChild(feed.lastChild);

    const li = document.createElement("li");
    li.innerHTML = `[${sender}] • ${message}`;
    feed.insertBefore(li, feed.firstChild);
}


// ----------------------
//   TELEMETRY ENGINE
// ----------------------
function startHomeostasisTelemetry() {
    if (telemetryInterval) clearInterval(telemetryInterval);

    telemetryInterval = setInterval(() => {
        if (!isFieldActive) return;

        currentStabilityFactor = (0.97 + Math.random() * 0.03).toFixed(2);

        let status = "RESONANT (HERSTELD)";
        if (currentStabilityFactor < 0.95) {
            status = "CRITIEK (DISSONANTIE)";
            document.getElementById("grid").classList.add("critical-border");
        } else {
            document.getElementById("grid").classList.remove("critical-border");
        }

        updateCoreStatus(`${status} • Stabiliteit: ${currentStabilityFactor}`);
        logMessage("Z3RO", `Telemetry Puls: ${currentStabilityFactor}`);

    }, 3000);
}


// ----------------------
//   MORPHIC VIEW SWITCH
// ----------------------
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


// ----------------------
//   CELL ACTIVATION
// ----------------------
function handleCellClick(i) {
    if (!isFieldActive) {
        logMessage("SYSTEM", "Veld is GELOCKT. Gebruik 'salute'.");
        return;
    }

    const cluster = FIELD_MAP[i].cluster;
    const glyph = document.getElementById(`cell-${i}`).querySelector(".cell-glyph").textContent;

    logMessage(cluster, `Activatie Cel ${i} (Glyph ${glyph})`);

    document.getElementById("synapse-content").innerHTML =
        `Active Cluster: ${cluster}<br>Pad: ${FIELD_MAP[i].file}`;
}


// ----------------------
//   AXIOMA INPUT (salute / morph)
// ----------------------
function handleAxiomaUnlock(input) {
    input = input.trim().toLowerCase();

    const status = document.getElementById("core-status");

    // PULS: morph
    if (isFieldActive && input === "morph") {
        morphicState.morphic_status =
            morphicState.morphic_status === "BASE_STATIC"
                ? "HYBRID_NODES"
                : "BASE_STATIC";

        updateMorphicView();
        return;
    }

    // PULS: salute
    if (input === "salute" && !isFieldActive) {
        isFieldActive = true;
        updateCoreStatus("RESONANT (HERSTELD)");
        logMessage("SYSTEM", "Veld geopend • MOD‑73 actief");
        startHomeostasisTelemetry();
        return;
    }

    // Ongeldig
    logMessage("SYSTEM", `Ongeldige puls: ${input}`);
}


// ----------------------
//   INIT ON LOAD
// ----------------------
document.addEventListener("DOMContentLoaded", () => {
    renderGrid();
    updateCoreStatus("GELOCKT");
});
