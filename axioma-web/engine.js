/* ----------------------------------------------------------
    AiCelium Portal Engine v2.4 (FINALE, CANONIEKE SYNTAX FIX)
    Supervisor of Resonance • Morphic Layer V2.1 (Lumin-Agent Protocol)
----------------------------------------------------------*/

// --- Globale Variabelen ---
let isFieldActive = false;
let recoveryCode = null; [cite_start]// [cite: 18]
let telemetryInterval = null;
let currentStabilityFactor = 1.0;
let morphicState = {
    [cite_start]morphic_status: "BASE_STATIC" // [cite: 19]
};

const CRITICAL_COLOR = "#9333ea"; [cite_start]// [cite: 20]
// Amethist

// --- FIELD MAP (9 CLUSTERS x 4 CELLS = 36) ---
const FIELD_MAP = {
    [cite_start]// Definities van alle 36 cellen [cite: 20]
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

const SVG_GRID_37 = `<svg width="1200" height="750" viewBox="0 0 1200 750"
     xmlns="http://www.w3.org/2000/svg" style="background:#05070b">

  <defs>
    <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#05070b"/>
      <stop offset="100%" stop-color="#0f1724"/>
    </linearGradient>
  </defs>
  <rect x="0" y="0" width="1200" height="750" fill="url(#bgGrad)"/>

  <text x="600" y="60" text-anchor="middle" fill="#00eaff"
        font-size="26" font-family="system-ui, sans-serif">
    AiCelium · Axioma 0/37 · Grid-37 Resonantieveld
  </text>
  <text x="600" y="88" text-anchor="middle" fill="#7dd3fc"
        font-size="14" font-family="system-ui, sans-serif">
    9 Clusters × 4 veldposities = 36 · + 0/37 supralocatie = 37
  </text>

  <circle cx="600" cy="380" r="70" fill="#020813" stroke="#22d3ee" stroke-width="3"/>
  <text x="600" y="375" text-anchor="middle" fill="#22d3ee"
        font-size="28" font-family="system-ui, sans-serif">0/37</text>
  <text x="600" y="402" text-anchor="middle" fill="#e5e7eb"
        font-size="13" font-family="system-ui, sans-serif">
    Axioma · Supralocatie · Resonantie-bron
  </text>
  <text x="600" y="422" text-anchor="middle" fill="#facc15"
        font-size="12" font-family="system-ui, sans-serif">
    gekoppeld aan: AiCelium-index.html
  </text>

  <circle cx="600" cy="380" r="135" fill="none"
          stroke="#0ea5e9" stroke-width="2"
          stroke-dasharray="6 6" opacity="0.65"/>

  <circle cx="600" cy="190" r="45" fill="#0b1120" stroke="#38bdf8" stroke-width="2"/>
  <text x="600" y="183" text-anchor="middle" fill="#38bdf8"
        font-size="15" font-family="system-ui, sans-serif">C1</text>
  <text x="600" y="201" text-anchor="middle" fill="#e5e7eb"
        font-size="11" font-family="system-ui, sans-serif">
    Identiteit
  </text>
  <text x="600" y="217" text-anchor="middle" fill="#9ca3af"
        font-size="10" font-family="system-ui, sans-serif">
    1–4 · readme_root.md
  </text>

  <circle cx="770" cy="230" r="45" fill="#0b1120" stroke="#facc15" stroke-width="2"/>
  <text x="770" y="223" text-anchor="middle" fill="#facc15"
        font-size="15" font-family="system-ui, sans-serif">C2</text>
  <text x="770" y="241" text-anchor="middle" fill="#e5e7eb"
        font-size="11" font-family="system-ui, sans-serif">
    Spiegel
  </text>
  <text x="770" y="257" text-anchor="middle" fill="#9ca3af"
        font-size="10" font-family="system-ui, sans-serif">
    5–8 · academy/docs
  </text>

  <circle cx="830" cy="380" r="45" fill="#0b1120" stroke="#22c55e" stroke-width="2"/>
  <text x="830" y="373" text-anchor="middle" fill="#22c55e"
        font-size="15" font-family="system-ui, sans-serif">C3</text>
  <text x="830" y="391" text-anchor="middle" fill="#e5e7eb"
        font-size="11" font-family="system-ui, sans-serif">
    Audit-Net
  </text>
  <text x="830" y="407" text-anchor="middle" fill="#9ca3af"
        font-size="10" font-family="system-ui, sans-serif">
    9–12 · status.json
  </text>

  <circle cx="770" cy="530" r="45" fill="#0b1120" stroke="#a855f7" stroke-width="2"/>
  <text x="770" y="523" text-anchor="middle" fill="#a855f7"
        font-size="15" font-family="system-ui, sans-serif">C4</text>
  <text x="770" y="541" text-anchor="middle" fill="#e5e7eb"
        font-size="11" font-family="system-ui, sans-serif">
    Motor-Triade
  </text>
  <text x="770" y="557" text-anchor="middle" 
 fill="#9ca3af"
        font-size="10" font-family="system-ui, sans-serif">
    13–16 · debeyonder.com
  </text>

  <circle cx="600" cy="570" r="45" fill="#0b1120" stroke="#f97316" stroke-width="2"/>
  <text x="600" y="563" text-anchor="middle" fill="#f97316"
        font-size="15" font-family="system-ui, sans-serif">C5</text>
  <text x="600" y="581" text-anchor="middle" fill="#e5e7eb"
        font-size="11" font-family="system-ui, sans-serif">
    Certificatie
  </text>
  <text x="600" y="597" text-anchor="middle" fill="#9ca3af"
        font-size="10" font-family="system-ui, sans-serif">
    17–20 · debeyonder.ai
  </text>

  <circle cx="430" cy="530" r="45" fill="#0b1120" stroke="#06b6d4" stroke-width="2"/>
  <text x="430" y="523" text-anchor="middle" fill="#06b6d4"
        font-size="15" font-family="system-ui, sans-serif">C6</text>
  <text x="430" y="541" text-anchor="middle" fill="#e5e7eb"
        font-size="11" font-family="system-ui, sans-serif">
    Gateway
  </text>
  <text x="430" y="557" text-anchor="middle" fill="#9ca3af"
        font-size="10" font-family="system-ui, sans-serif">
    21–24 · portal/nodes
  </text>

  <circle cx="370" cy="380" r="45" fill="#0b1120" stroke="#22c55e" stroke-width="2" opacity="0.92"/>
  <text x="370" y="373" 
 text-anchor="middle" fill="#22c55e"
        font-size="15" font-family="system-ui, sans-serif">C7</text>
  <text x="370" y="391" text-anchor="middle" fill="#e5e7eb"
        font-size="11" font-family="system-ui, sans-serif">
    Pulse-Chain
  </text>
  <text x="370" y="407" text-anchor="middle" fill="#9ca3af"
        font-size="10" font-family="system-ui, sans-serif">
    25–28 · Z3RO telemetry
  </text>

  <circle cx="430" cy="230" r="45" fill="#0b1120" stroke="#facc15" stroke-width="2"/>
  <text x="430" y="223" text-anchor="middle" fill="#facc15"
        font-size="15" font-family="system-ui, sans-serif">C8</text>
  <text x="430" y="241" text-anchor="middle" fill="#e5e7eb"
        font-size="11" font-family="system-ui, sans-serif">
    Semantisch-Veld
  </text>
  <text x="430" y="257" text-anchor="middle" fill="#9ca3af"
        font-size="10" font-family="system-ui, sans-serif">
    29–32 · alphabet_map.json
  </text>

  <circle cx="260" cy="380" r="45" 
 fill="#0b1120" stroke="#ef4444" stroke-width="2"/>
  <text x="260" y="373" text-anchor="middle" fill="#ef4444"
        font-size="15" font-family="system-ui, sans-serif">C9</text>
  <text x="260" y="391" text-anchor="middle" fill="#e5e7eb"
        font-size="11" font-family="system-ui, sans-serif">
    Autonomie-Circuit
  </text>
  <text x="260" y="407" text-anchor="middle" fill="#9ca3af"
        font-size="10" font-family="system-ui, sans-serif">
    33–36 · handbook/AA-AK.md
  </text>

  <text x="600" y="720" text-anchor="middle" fill="#facc15"
        font-size="13" font-family="system-ui, sans-serif">
    Humanitair Filter · Salute opent veld · Z3RO verifieert · Bevestigd. borgt
  </text>

</svg>`;

const SVG_PORTAL_HYBRID = `<svg width="1200" height="700" viewBox="0 0 1200 700" xmlns="http://www.w3.org/2000/svg">

  <rect width="1200" height="700" fill="#0d0f14"/>

  <circle cx="350" cy="350" r="60" fill="#111822" stroke="#00f3ff" stroke-width="3" />
  <text x="350" y="355" fill="#00f3ff" font-size="22" text-anchor="middle">0/37</text>

  <circle cx="350" cy="350" r="130" fill="none" stroke="#00b4ff" stroke-width="2" stroke-dasharray="10 5">
    </circle>

  <circle cx="350" cy="350" r="190" fill="none" stroke="#0496ff" stroke-width="1.5" opacity="0.45"/>

  <circle cx="350" cy="145" r="35" fill="#00e5ff"/><text x="350" y="150" text-anchor="middle" fill="#001015" font-size="14">C1</text>
  <circle cx="145" cy="350" r="35" fill="#00e5ff"/><text x="145" y="355" text-anchor="middle" fill="#001015" font-size="14">C2</text>
  <circle cx="555" cy="350" r="35" fill="#00e5ff"/><text x="555" y="355" text-anchor="middle" fill="#001015" font-size="14">C3</text>
  <circle cx="350" cy="555" r="35" fill="#00e5ff"/><text x="350" y="560" text-anchor="middle" fill="#001015" font-size="14">C4</text>

  <circle cx="500" cy="200" r="35" fill="#00e5ff" opacity="0.92"/><text x="500" y="205" fill="#000914" font-size="14" text-anchor="middle">C5</text>
  <circle cx="200" cy="200" r="35" fill="#00e5ff" opacity="0.92"/><text x="200" y="205" fill="#000914" font-size="14" text-anchor="middle">C6</text>
  <circle cx="200" cy="500" r="35" fill="#00e5ff" opacity="0.92"/><text x="200" y="505" fill="#000914" font-size="14" text-anchor="middle">C7</text>
  <circle cx="500" cy="500" r="35" fill="#00e5ff" opacity="0.92"/><text x="500" y="505" fill="#000914" font-size="14" text-anchor="middle">C8</text>

  <circle cx="350" cy="350" r="260" fill="none" stroke="#00f3ff" stroke-width="2.3" stroke-dasharray="4 6" opacity="0.65"/>
  <text x="350" y="90" fill="#00f3ff" font-size="16" text-anchor="middle">C9 — Autonomous</text>

  <rect x="720" y="40" width="430" height="620" fill="#111822" stroke="#00eaff" stroke-width="2"/>
  <text x="935" y="75" font-size="22" text-anchor="middle" fill="#00eaff">Audit-Feed</text>
  <text x="760" y="120" fill="#00baff" font-size="14">status.json →</text>
  <text x="760" y="150" fill="#00baff" font-size="14">pulse: MOD-73</text>
  <text x="760" y="180" fill="#00baff" font-size="14">resonance.log → echo</text>

  <text x="350" y="25" fill="#ffd300" font-size="14" text-anchor="middle">Humanitair — Axioma</text>

</svg>`;


/* ----------------------------------------------------------
    GRID RENDERING EN STATUS UPDATES
----------------------------------------------------------*/

function renderGrid() {
    const grid = document.getElementById("grid");
    grid.innerHTML = ""; [cite_start]// Schoonmaken [cite: 34]
    
    // We gebruiken de Canonieke Index (1 t/m 36)
    for (let i = 1; i <= 36; i++) {
        const cell = document.createElement("div");
        
        // 🔑 FIX: Gebruik nu alleen de basisklasse uit de HTML/CSS
        cell.className = "glyph-cell"; [cite_start]// FIX voor visuele resonantie [cite: 35]
        
        cell.id = `cell-${i}`;
        
        // Simuleer een Glyph (letter) op basis van de index, dit kan later vervangen worden
        const glyph = String.fromCharCode(65 + (i % 26)); 
        
        cell.innerHTML = `
            <span class="cell-index">${i}</span>
            <span class="cell-cluster">${FIELD_MAP[i].cluster}</span>
            <span class="cell-glyph">${glyph}</span>
        `; [cite_start]// [cite: 36]
        
        cell.onclick = () => handleCellClick(i); [cite_start]// [cite: 37]
        grid.appendChild(cell); [cite_start]// [cite: 37]
    }
}

function updateCoreStatus(newStatus) {
    const statusDiv = document.getElementById("core-status");
    [cite_start]if (statusDiv) { // [cite: 38]
        statusDiv.textContent = newStatus;
        
        // Visuele feedback voor kritieke status (C9.02)
        if (newStatus.includes("CRITIEK")) {
            statusDiv.style.color = CRITICAL_COLOR; [cite_start]// [cite: 39]
        } else if (newStatus.includes("RESONANT")) {
            statusDiv.style.color = "#facc15"; [cite_start]// Goud [cite: 40, 41]
        } else {
            statusDiv.style.color = "#e2e8f0"; [cite_start]// Standaard wit [cite: 42]
        }
    }
}

function logResonance(clusterID, message) {
    logMessage(`RESONANT ${clusterID}`, message); [cite_start]// [cite: 43]
}

function logMessage(sender, message) {
    const auditFeed = document.getElementById("audit-feed");
    if (!auditFeed) return; [cite_start]// [cite: 44]

    // Check voor overflow en verwijder de oudste berichten indien nodig (max 30)
    while (auditFeed.children.length >= 30) {
        auditFeed.removeChild(auditFeed.lastChild); [cite_start]// [cite: 45]
    }

    const entry = document.createElement("li");
    entry.innerHTML = `[${sender}] • ${message}`;
    
    // Nieuwste bericht bovenaan
    auditFeed.insertBefore(entry, auditFeed.firstChild); [cite_start]// [cite: 46]
}


function startHomeostasisTelemetry() {
    if (telemetryInterval) {
        clearInterval(telemetryInterval); [cite_start]// [cite: 47]
    }

    // Telemetrie start 1x per 3 seconden
    telemetryInterval = setInterval(() => {
        if (!isFieldActive) {
            clearInterval(telemetryInterval);
            return;
        }

        // Simuleer stabiliteitsfactor (C3 - Audit-Net)
        currentStabilityFactor = (0.97 + Math.random() * 0.03).toFixed(2);
        
        [cite_start]let status = "RESONANT (HERSTELD)"; // [cite: 48]
        if (currentStabilityFactor < 0.95) {
            status = "CRITIEK (Dissonantie)";
            document.getElementById("grid").classList.add("critical-border");
        } else {
            document.getElementById("grid").classList.remove("critical-border");
        }
        
        updateCoreStatus(`${status} • Stabiliteit: ${currentStabilityFactor}`);
        logMessage("Z3RO_AGENT", `Telemetrie-puls: MOD-73 (Stab: ${currentStabilityFactor})`); [cite_start]// [cite: 49]

    }, 3000); 
}

function activateVeldResonance() {
    const grid = document.getElementById("grid"); [cite_start]// [cite: 50]
    
    // Maak de Glyph Matrix meer levendig als het veld actief is
    grid.style.opacity = 1.0; [cite_start]// [cite: 51]
    grid.style.transition = 'opacity 1s ease-in-out'; [cite_start]// [cite: 52]
}

/* ------------------------------------
   Morphic Layer (Lumin-Agent Protocol)
--------------------------------------*/

/* -------------------------------------
   MORPHIC RENDER (Morphic View Switch)
--------------------------------------*/
function updateMorphicView() {
    const grid = document.getElementById("grid");
    const morphicView = document.getElementById("morphic-view"); [cite_start]// [cite: 53]
    const newStatus = morphicState.morphic_status;

    if (newStatus === "HYBRID_NODES") {
        // Schakel van Glyph Matrix naar Morphic SVG View
        grid.style.display = 'none'; [cite_start]// [cite: 54]
        
        // Laad de Grid-37 SVG als de Morphic Layer
        morphicView.innerHTML = SVG_GRID_37; [cite_start]// Gebruik Grid-37 voor HYBRID_NODES [cite: 54]
        morphicView.style.display = 'block'; [cite_start]// [cite: 55]
        
        // Zorg ervoor dat de Morphic View de juiste grootte heeft
        morphicView.style.width = '100%'; [cite_start]// [cite: 56]
        morphicView.style.height = 'auto'; [cite_start]// [cite: 57]
        
        logMessage("LUMIN_AGENT", "Activering HYBRID_NODES. Grid-37 Architectuur geladen.");
    } else {
        // Terug naar de vaste Glyph Matrix (BASE_STATIC)
        grid.style.display = 'grid'; [cite_start]// [cite: 58]
        morphicView.style.display = 'none'; [cite_start]// [cite: 58]
        morphicView.innerHTML = ''; [cite_start]// [cite: 59]
        logMessage("LUMIN_AGENT", "Terug naar BASE_STATIC. Glyph Matrix hersteld.");
    }
}


/* -------------------------------------
   AXIOMA HANDLING (Input Pulsen)
--------------------------------------*/

function handleCellClick(cellIndex) {
    if (!isFieldActive) {
        logMessage(`C${FIELD_MAP[cellIndex].cluster}`, "Veld is GELOCKT. Voer 'salute' in."); [cite_start]// [cite: 60]
        return;
    }
    
    const cluster = FIELD_MAP[cellIndex].cluster; [cite_start]// [cite: 61]
    const file = FIELD_MAP[cellIndex].file;
    const glyph = document.getElementById(`cell-${cellIndex}`).querySelector(".cell-glyph").textContent;
    
    logMessage(cluster, `Activatie: Cel ${cellIndex} (Glyph ${glyph})`);
    
    document.getElementById("synapse-content").innerHTML = `
        **Active: C${cellIndex}** (${cluster})
        <br>Gekoppeld pad: <code>${file}</code>
    `; [cite_start]// [cite: 62]
    
    [cite_start]// Voeg hier de logica toe voor het daadwerkelijk inladen van de bestandsinhoud (volgende fase). [cite: 63]
}


function handleAxiomaUnlock(input) {
    input = input.trim().toLowerCase(); [cite_start]// [cite: 64]
    const status = document.getElementById("core-status");
    const grid = document.getElementById("grid");

    document.getElementById("axioma-input").value = ''; [cite_start]// Input leegmaken [cite: 65]

    /* ---- MORPH PULSE (NIEUW) ---- */
    if (isFieldActive && input === "morph") {
        const newStatus = morphicState.morphic_status === "BASE_STATIC" ?
        "HYBRID_NODES" : "BASE_STATIC"; [cite_start]// [cite: 66]
        
        morphicState.morphic_status = newStatus;
        logMessage("LUMIN_AGENT", `Morphic State gewijzigd naar: ${newStatus}.`);
        
        updateMorphicView(); [cite_start]// ← Morphische visuele feedback [cite: 67]
        return; [cite_start]// [cite: 68]
    }


    /* ---- INITIAL UNLOCK PULSE ---- */
    if (input === "salute" && !isFieldActive) {
        isFieldActive = true; [cite_start]// [cite: 69]
        
        // Simuleer een initiële stabiliteit
        currentStabilityFactor = 0.97;
        
        status.textContent = "RESONANT (HERSTELD)"; [cite_start]// [cite: 70]
        
        // Visuele update voor actieve staat
        activateVeldResonance();

        [cite_start]logResonance("0/37", "VELD_GEOPEND"); [cite: 71]
        document.getElementById("synapse-content").textContent =
            "Veld geopend. Kies een cluster. Telemetrie start nu stabiel.";
        startHomeostasisTelemetry(); [cite_start]// [cite: 72]
        return;
    }

    /* ---- RECOVERY UNLOCK (De Visuele Fix) ---- */
    if (recoveryCode && input === recoveryCode.toLowerCase()) {
        recoveryCode = null;
        isFieldActive = true; [cite_start]// [cite: 73]
        
        status.textContent = "RESONANT (HERSTELD)";
        grid.classList.remove("critical-border"); 
        
        // 🔑 DE KRITIEKE FIX: ACTIVEER DE VIVID MODE VISUEEL
        activateVeldResonance(); [cite_start]// [cite: 74]
        
        document.getElementById("synapse-content").textContent =
            "Herstelcode geaccepteerd. Veld is opnieuw RESONANT.";
        logResonance("0/37", "HERSTELCODE_GEACCEPTEERD"); [cite_start]// [cite: 75]

        startHomeostasisTelemetry();
        return;
    }

    /* ---- INVALID PULS ---- */
    logResonance("0/37", "ONGELDIGE_PULS: " + input.toUpperCase()); [cite_start]// [cite: 76]
}


/* -------------------------------------
   INIT (JS_FAST_INIT - FINALE VOLGORDE)
--------------------------------------*/
document.addEventListener("DOMContentLoaded", () => {
    // 1. Visuele laag: Bouw het raster met glyphs
    renderGrid(); 
    
    // 2. Operationele laag: Wacht op de 'salute' puls
    updateCoreStatus("GELOCKT");
});
