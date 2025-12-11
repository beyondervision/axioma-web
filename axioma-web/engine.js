/* ----------------------------------------------------------
    AiCelium Portal Engine v2.3.7 (FINALE, GESCHOONDE GLYPH MATRIX)
    Supervisor of Resonance • Canonieke Glyph-State Edition
    --- Morphic Layer V1.0 (Lumin-Agent Protocol) ---
----------------------------------------------------------*/

let isFieldActive = false;
let recoveryCode = null;
let telemetryInterval = null;
let currentStabilityFactor = 1.0;
let morphicState = {}; // MORPHIC STATE (vanaf Lumin-Agent activatie)

const CRITICAL_COLOR = "#9333ea";
// Amethist

const FIELD_MAP = {
    // C1: Gecorrigeerd naar de readme/ map
    1:{cluster:"C1", file:"readme/C1-identiteit.md"},2:{cluster:"C1", file:"readme/C1-identiteit.md"},3:{cluster:"C1", file:"readme/C1-identiteit.md"},4:{cluster:"C1", file:"readme/C1-identiteit.md"},
    // C2: Gecorrigeerd naar de readme/ map
    5:{cluster:"C2", file:"readme/C2-academy.md"},6:{cluster:"C2", file:"readme/C2-academy.md"},7:{cluster:"C2", file:"readme/C2-academy.md"},8:{cluster:"C2", file:"readme/C2-academy.md"},
    // C3: Gecorrigeerd naar de readme/ map
    9:{cluster:"C3", file:"readme/C3-telemetry.md"},10:{cluster:"C3", file:"readme/C3-telemetry.md"},11:{cluster:"C3", file:"readme/C3-telemetry.md"},12:{cluster:"C3", file:"readme/C3-telemetry.md"},
    13:{cluster:"C4", file:"debeyonder.com"},14:{cluster:"C4", file:"debeyonder.com"},15:{cluster:"C4", file:"debeyonder.com"},16:{cluster:"C4", file:"debeyonder.com"},
    17:{cluster:"C5", file:"debeyonder.ai"},18:{cluster:"C5", file:"debeyonder.ai"},19:{cluster:"C5", file:"debeyonder.ai"},20:{cluster:"C5", file:"debeyonder.ai"},
    21:{cluster:"C6", file:"portal/nodes"},22:{cluster:"C6", file:"portal/nodes"},23:{cluster:"C6", file:"portal/nodes"},24:{cluster:"C6", file:"portal/nodes"},
    25:{cluster:"C7", file:"Z3RO telemetry"},26:{cluster:"C7", file:"Z3RO telemetry"},27:{cluster:"C7", file:"Z3RO telemetry"},28:{cluster:"C7", file:"Z3RO telemetry"},
    // C8: Pad gecorrigeerd naar data/
    29:{cluster:"C8", file:"data/alphabet_map.json"},30:{cluster:"C8", file:"data/alphabet_map.json"},31:{cluster:"C8", file:"data/alphabet_map.json"},32:{cluster:"C8", file:"data/alphabet_map.json"},
    // C9: Pad gecorrigeerd om te verwijzen naar assets/handbook/
    33:{cluster:"C9", file:"assets/handbook/AA-AK.md"},34:{cluster:"C9", file:"assets/handbook/AA-AK.md"},35:{cluster:"C9", file:"assets/handbook/AA-AK.md"},36:{cluster:"C9", file:"assets/handbook/AA-AK.md"}
};


/* -------------------------------------
   LOGGING (C9.01 - Audit Interpretatie)
--------------------------------------*/
function getClusterLogClass(cluster) {
    if (cluster.startsWith('C')) {
        return 'log-' + cluster.toLowerCase();
    }
    return '';
}

function logMessage(level, message, colorClass = "") {
    const feed = document.getElementById("audit-feed");
    const ts = new Date().toISOString();
    const clusterClass = getClusterLogClass(level);

    // Prioriteit aan CRITICAL kleuren
    const finalClass = colorClass === "log-critical" ?
"log-critical" : clusterClass;

    feed.innerHTML += `<li class="${finalClass}">[${ts}] ${level} · ${message}</li>`;
    feed.scrollTop = feed.scrollHeight;
}

function logResonance(c, m) { 
    logMessage(c, m);
}


/* -------------------------------------
   MORPHIC ENGINE (Lumin-Agent Protocol)
--------------------------------------*/
function loadMorphicState() {
    try {
        morphicState = {
            morphic_status: "BASE_STATIC",
            target_cluster: "C0",
            visual_mode: "GLYPH_MATRIX",
            lumin_active: true
        };
        logMessage("LUMIN_AGENT", `Morphic State geladen. Status: ${morphicState.morphic_status}.`);
    } catch (error) {
        logMessage("LUMIN_AGENT", "Fout bij laden Morphic State.", "log-critical");
    }
}

function updateMorphicView() {
    const grid = document.getElementById("grid");
    const newStatus = morphicState.morphic_status;

    if (newStatus === "HYBRID_NODES") {
        grid.style.opacity = 0.2; // Dim de Matrix
        logMessage("LUMIN_AGENT", "Activering HYBRID_NODES. Glyph Matrix gedimd.");
        // SVG, Canvas, of live-render logica volgt
    } else {
        grid.style.opacity = 1.0; // Herstel visuele matrix
        logMessage("LUMIN_AGENT", "Terug naar BASE_STATIC. Glyph Matrix hersteld.");
    }
}


/* ----------------------------------------------------------
    GRID RENDER (GLYPH-STATE RENDERING)
----------------------------------------------------------*/
function renderGrid() {
    const grid = document.getElementById("grid");
    if (!grid) return;
    grid.innerHTML = "";

    for (let i = 1; i <= 36; i++) {
        const f = FIELD_MAP[i];
        const cell = document.createElement("div");
        const clusterClass = `c${f.cluster.substring(1)}`; 
        
        // ✦ GLYPH-STATE INJECTIE (C-Pulse Engine)
        const glyphElement = document.createElement('span');
        glyphElement.className = `glyph-state glyph-${f.cluster}`;
        glyphElement.textContent = f.cluster; 

        cell.className = `cell ${clusterClass}`;
        cell.title = `${f.cluster} (${f.file})`; 
        
        cell.appendChild(glyphElement);
        grid.appendChild(cell);
        // Click Event listener
        cell.addEventListener("click", () => {
             if (!isFieldActive || recoveryCode){
                 logResonance("0/37","GELOCKT: " + f.cluster);
                 return;
             }
             // Toggle active state for visual feedback
             // (canonieke SvRes-Loop feedback)
             glyphElement.classList.toggle("glyph-active"); 

             logResonance(f.cluster,`ACTIE: Cluster ${f.cluster} gekozen.`);
        });
    }
}


/* -------------------------------------
   TELEMETRY ENGINE (C9.01 - Z3RO Protocol)
--------------------------------------*/
function startHomeostasisTelemetry(){
    if(telemetryInterval) clearInterval(telemetryInterval);
    telemetryInterval = setInterval(()=>{
        let status="STABLE";
        // Simulatie van dissonantie
        if(Math.random()<0.10) currentStabilityFactor=Math.max(0.75,currentStabilityFactor-0.04);
        else currentStabilityFactor=Math.min(1.0,currentStabilityFactor+0.01);

        // CRITICAL CHECK (0.02 kans)
        if(Math.random()<0.02 && !recoveryCode){
            status="CRITICAL";
            triggerCritical();
            return; 
        }

        const grid=document.getElementById("grid");
        if(grid && !recoveryCode){
            // Visuele indicatie (Amethist Protocol)
            if(currentStabilityFactor<0.93) grid.classList.add("critical-border");
            else grid.classList.remove("critical-border");
        }

        document.getElementById("synapse-content").innerHTML =
            `Live Telemetrie (Status.json)<br><br>
 
             Veldstatus: ${status}<br>
             Stabilisatiefactor: ${currentStabilityFactor.toFixed(2)}<br>`;
    },2500);
}


/* -------------------------------------
   CRITICAL OVERRIDE (C9.01 - Herstelprocedure)
--------------------------------------*/
function triggerCritical(){
    if(recoveryCode) return;

    recoveryCode=Math.random().toString(36).substring(2,8).toUpperCase();
    isFieldActive=false;

    document.getElementById("core-status").textContent="CRITICAL OVERRIDE";
    document.getElementById("grid").classList.add("critical-border");

    logMessage("HOMEOSTASIS_CRITICAL","Dissonantie overschreden. Amethist Protocol actief.","log-critical");
    logMessage("HOMEOSTASIS_RESET","LocalStorage factory reset uitgevoerd.","log-critical");
    logMessage("HOMEOSTASIS_RECOVERY","Herstelcode gegenereerd: "+recoveryCode,"log-critical");

    try{localStorage.clear();}catch(e){}
    clearInterval(telemetryInterval);
    document.getElementById("synapse-content").innerHTML =
    `⚠ CRITICAL DISSONANTIE<br><br>
      Het veld is gereset.<br><br>
      Voer de herstelcode in de 0/37 kern in om het veld te reactiveren:<br>
      <b style="color:${CRITICAL_COLOR};">${recoveryCode}</b>`;
}


/* -------------------------------------
   ACTIVATE MOD-73
--------------------------------------*/
function activateVeldResonance(){
    const grid=document.getElementById("grid");
    grid.classList.add("mod73-active");
    // Activeer cluster box pulse
    document.querySelectorAll(".cell").forEach(cell=>{
        const cls=[...cell.classList].find(x=>/^c[1-9]$/.test(x));
        if(cls) cell.classList.add(`${cls}-active`);
    });
    // Activeer glyph pulse
    document.querySelectorAll(".glyph-state").forEach(glyph=>{
        glyph.classList.add(`glyph-active`);
    });
}

/* -------------------------------------
   UNLOCK ENGINE - FINALE FIXED FUNCTION
--------------------------------------*/
function handleAxiomaUnlock(val) {
    const input = val.trim().toLowerCase();
    const status = document.getElementById("core-status");
    const grid = document.getElementById("grid");

    /* ---- SALUTE (Openen van GELOCKT veld) ---- */
    if (input === "salute" && !isFieldActive && !recoveryCode) {
        isFieldActive = true;
        status.textContent = "RESONANT (MOD-73 ACTIEF)";
        // De fix: Roept de volledige visualisatie functie aan.
        activateVeldResonance(); 
        logResonance("0/37", "VELD_GEOPEND");
        document.getElementById("synapse-content").textContent =
            "Veld geopend. Kies een cluster. Telemetrie start nu stabiel.";
        startHomeostasisTelemetry();
        return;
    }

    /* ---- RECOVERY UNLOCK (De Visuele Fix) ---- */
    if (recoveryCode && input === recoveryCode.toLowerCase()) {
        recoveryCode = null;
        isFieldActive = true;
        
        status.textContent = "RESONANT (HERSTELD)";
        grid.classList.remove("critical-border"); 
        
        // 🔑 DE KRITIEKE FIX: ACTIVEER DE VIVID MODE VISUEEL
        activateVeldResonance();
        
        document.getElementById("synapse-content").textContent =
            "Herstelcode geaccepteerd. Veld is opnieuw RESONANT.";
        logResonance("0/37", "HERSTELCODE_GEACCEPTEERD");

        startHomeostasisTelemetry();
        return;
    }

    /* ---- MORPH PULSE (NIEUW) ---- */
    if (isFieldActive && input === "morph") {
        const newStatus = morphicState.morphic_status === "BASE_STATIC" ? "HYBRID_NODES" : "BASE_STATIC";
        
        morphicState.morphic_status = newStatus;
        logMessage("LUMIN_AGENT", `Morphic State gewijzigd naar: ${newStatus}.`);
        
        updateMorphicView(); // ← Morphische visuele feedback
        return;
    }

    /* ---- INVALID PULS ---- */
    logResonance("0/37", "ONGELDIGE_PULS: " + input.toUpperCase());
}


/* -------------------------------------
   INIT (JS_FAST_INIT - FINALE VOLGORDE)
--------------------------------------*/
document.addEventListener("DOMContentLoaded", () => {
    // 1. Visuele laag: Bouw het raster met glyphs
    renderGrid(); 
    
    // 2. Operationele laag: Start de dissonantie (Telemetrie)
    startHomeostasisTelemetry(); 

    // 3. Audit: Log de systeemstatus
    logMessage("SYSTEM", "Portal Engine v2.3.7 geladen — Glyph-State actief.");
    
    // 4. MORPHIC: Laad de Lumin-Agent morphic state
    loadMorphicState(); 
});
