/* ----------------------------------------------------------
   AiCelium Portal Engine v2.4.2 (FINALE, STABIEL + BEVEILIGD)
   Supervisor of Resonance • Rollback van Fase 2
----------------------------------------------------------*/

// ... (Alle globale variabelen, FIELD_MAP, SVGs, CORE FUNCTIES, etc. blijven hetzelfde)

// ----------------------
//   AXIOMA INPUT (FASE 1 BEVEILIGING - STABIEL)
// ----------------------
function handleAxiomaUnlock(input) {
    
    // Numerieke input wordt nu genegeerd totdat de Matrix weer stabiel is
    if (!isNaN(input)) {
        logMessage("SYSTEM", `Numerieke invoer geblokkeerd. Activeer het Veld eerst.`);
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

// ... (INIT ON LOAD en de rest van de functies blijven hetzelfde)
