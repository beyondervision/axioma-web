/* ----------------------------------------------------------
   AiCelium Portal Engine v2.4.2 (FINALE, FASE 2: DATA KOPPELING)
   Supervisor of Resonance • Morphic Layer V2.1
----------------------------------------------------------*/

// ... (Globale Variabelen, FIELD_MAP, SVGs, etc. blijven hetzelfde)

// ----------------------
//   CORE FUNCTIES (Onveranderd)
// ----------------------

// ... (updateCoreStatus, logMessage, activateVeldResonance, renderGrid, startHomeostasisTelemetry, updateMorphicView blijven hetzelfde)

// ----------------------
//   HANDLE CELL CLICK (FASE 2 IMPLEMENTATIE)
// ----------------------
function handleCellClick(i) {
    if (!isFieldActive) {
        logMessage("SYSTEM", `Veld is GELOCKT. Gebruik Canonieke code.`);
        return;
    }
    
    // FASE 2 FIX: Haal volledige data op uit FIELD_MAP
    const cluster = FIELD_MAP[i].cluster;
    const file = FIELD_MAP[i].file;
    const glyph = document.getElementById(`cell-${i}`).textContent.trim(); // Vereenvoudigde Glyph-ophaling

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
    
    // 🔑 ROBUUSTHEID FIX: Numerieke input (cel klik of getal) validatie
    // Dit verwerkt de kliks (nummer) en de input box (string van nummer)
    if (isFieldActive && !isNaN(input) && String(input).trim() !== "") {
        const cellIndex = parseInt(input);
        
        // Valideer of de index binnen het bereik ligt (1 t/m 36)
        if (cellIndex >= 1 && cellIndex <= 36) {
            handleCellClick(cellIndex); 
            return;
        }
    }
    
    // Niet-numerieke input verwerking
    input = String(input).trim().toLowerCase();
    const status = document.getElementById("core-status");
    document.getElementById("axioma-input").value = ''; // Input box leegmaken

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
    } else if (input !== "morph") { // Voorkom dat 'morph' bij dubbelklik als ongeldig wordt gelogd
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
