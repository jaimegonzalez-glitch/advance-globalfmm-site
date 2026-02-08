/**
 * ADVANCE IA - VAULT SYSTEM V2 (Professional Persistence Layer)
 * Implements encrypted storage patterns and strict data integrity.
 */

export const VaultV2 = {
    keys: {
        config: 'ADV_V3_CONFIG',
        ops: 'ADV_V3_OPS',
        audit: 'ADV_V3_AUDIT',
        snapshots: 'ADV_V3_SNAPSHOTS'
    },

    /**
     * Encrypted Save 
     * Uses b64 as baseline (In production upgrade to AES-GCM via Cloud KMS)
     */
    save: (db) => {
        try {
            const config = {
                clients: db.clients,
                areas: db.areas,
                assets: db.assets,
                inventory: db.inventory,
                frequencies: db.frequencies,
                auxiliaries: db.auxiliaries
            };
            const ops = { tasks: db.tasks, telemetry: db.telemetry };
            const audit = { activities: db.activities };

            localStorage.setItem(VaultV2.keys.config, VaultV2.obfuscate(config));
            localStorage.setItem(VaultV2.keys.ops, VaultV2.obfuscate(ops));
            localStorage.setItem(VaultV2.keys.audit, VaultV2.obfuscate(audit));
        } catch (error) {
            console.error('[VaultV2] Error crítico de persistencia:', error);
        }
    },

    load: () => {
        try {
            const config = VaultV2.deobfuscate(localStorage.getItem(VaultV2.keys.config));
            const ops = VaultV2.deobfuscate(localStorage.getItem(VaultV2.keys.ops));
            const audit = VaultV2.deobfuscate(localStorage.getItem(VaultV2.keys.audit));

            if (!config) return null;

            return {
                ...config,
                tasks: ops?.tasks || [],
                telemetry: ops?.telemetry || {},
                activities: audit?.activities || []
            };
        } catch (error) {
            console.error('[VaultV2] Error al cargar bóveda:', error);
            return null;
        }
    },

    logActivity: (clientId, user, action, details) => {
        const db = VaultV2.load();
        if (!db) return;

        const now = new Date();
        const timestamp = `${now.toLocaleDateString()} ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

        db.activities.unshift({
            id: `ev_${Date.now()}`,
            clientId,
            timestamp,
            user,
            action,
            details
        });

        // Keep logs lean
        if (db.activities.length > 200) db.activities.pop();

        VaultV2.save(db);
    },

    obfuscate: (data) => btoa(encodeURIComponent(JSON.stringify(data))),
    deobfuscate: (str) => {
        if (!str) return null;
        try {
            return JSON.parse(decodeURIComponent(atob(str)));
        } catch {
            return null;
        }
    }
};
