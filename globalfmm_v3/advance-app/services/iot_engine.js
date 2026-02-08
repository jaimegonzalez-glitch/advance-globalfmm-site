/**
 * ADVANCE IA - IOT ENGINE (Core V3)
 * Orchestrates asset telemetry, health scoring (RUL) and anomaly detection.
 */

export class IoTEngine {
    constructor(vault) {
        this.vault = vault;
        this.intervalId = null;
        this.status = 'IDLE';
    }

    /**
     * Starts the IoT processing loop
     * @param {number} intervalMs 
     */
    start(intervalMs = 8000) {
        if (this.status === 'RUNNING') return;

        console.log('[IoTEngine] Motor de telemetría iniciado...');
        this.status = 'RUNNING';

        this.intervalId = setInterval(() => {
            this.processCycle();
        }, intervalMs);
    }

    stop() {
        if (this.intervalId) clearInterval(this.intervalId);
        this.status = 'STOPPED';
        console.log('[IoTEngine] Motor detenido.');
    }

    /**
     * Process one telemetry cycle for all managed assets
     */
    processCycle() {
        const db = this.vault.load();
        let changed = false;

        // 1. Asset Health Degradation & RUL Calculation
        db.assets.forEach(asset => {
            if (Math.random() > 0.85) {
                const degradation = Math.floor(Math.random() * 2);
                asset.healthScore = Math.max(0, asset.healthScore - degradation);
                asset.rul = Math.max(0, asset.rul - 1);

                if (asset.healthScore < 50) asset.criticality = 'Critical';
                else if (asset.healthScore < 80) asset.criticality = 'High';

                changed = true;
            }
        });

        // 2. Traffic-Based Clean Trigger (Dynamic Clean)
        db.areas.forEach(area => {
            if (!db.telemetry[area.id]) db.telemetry[area.id] = { occupancy: 0 };

            const newTraffic = Math.floor(Math.random() * 4);
            db.telemetry[area.id].occupancy += newTraffic;

            if (db.telemetry[area.id].occupancy >= 50) {
                this.triggerPrescriptiveAction(db, area);
                changed = true;
            }
        });

        if (changed) {
            this.vault.save(db);
            // El dispatcher de eventos notificará a la UI
            document.dispatchEvent(new CustomEvent('advance:iot_update', { detail: { timestamp: Date.now() } }));
        }
    }

    triggerPrescriptiveAction(db, area) {
        const existing = db.tasks.find(t => t.areaId === area.id && t.status === 'pending');
        if (!existing) {
            const newTask = {
                id: `at_${Date.now()}`,
                title: `IA-Trigger: Limpieza ${area.name}`,
                clientId: area.clientId,
                areaId: area.id,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                status: 'pending',
                date: new Date().toISOString().split('T')[0],
                type: 'prescriptive'
            };
            db.tasks.unshift(newTask);
            this.vault.logActivity(area.clientId, 'AI-Orchestrator', 'Tarea Prescriptiva', `Umbral excedido en ${area.name}.`);
        }
    }

    triggerAnomaly(assetId) {
        const db = this.vault.load();
        const target = db.assets.find(a => a.id === assetId) || db.assets[0];

        target.healthScore = 32;
        target.criticality = 'Critical';
        target.rul = 4;

        this.vault.logActivity(target.clientId, 'AI-Engine', 'Anomalía Crítica', `Firma térmica fuera de rango en ${target.name}.`);
        this.vault.save(db);

        document.dispatchEvent(new CustomEvent('advance:anomaly', { detail: { asset: target } }));
    }
}
