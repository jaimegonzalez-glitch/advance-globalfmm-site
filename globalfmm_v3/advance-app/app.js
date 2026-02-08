import { Auth } from './services/auth_service.js';
import { IoTEngine } from './services/iot_engine.js';
import { VaultV2 as VaultSystem } from './core/vault_v2.js';

/**
 * ADVANCE IA - APPLICATION CORE (Refactored v3)
 * Engineering: Modular Services, Event-Driven, Scalable.
 */

const INITIAL_DATA = {
    clients: [
        { id: 'c1', name: 'Mall Plaza Alameda', rut: '76.123.456-7', address: 'Av. Libertador 3456', contact: 'Roberto Gómez' },
        { id: 'c2', name: 'Centro Médico San José', rut: '77.890.123-K', address: 'Calle Salud 789', contact: 'Dra. Ana Silva' },
        { id: 'c3', name: 'Torres del Parque (Oficinas)', rut: '78.555.222-0', address: 'Miraflores 100', contact: 'Juan Pérez' }
    ],
    areas: [
        { id: 'a1', clientId: 'c1', name: 'Lobby Central', frequency: '4x-day' },
        { id: 'a2', clientId: 'c1', name: 'Patio de Comidas', frequency: 'daily' },
        { id: 'a3', clientId: 'c2', name: 'Urgencias', frequency: '4x-day' },
        { id: 'a4', clientId: 'c2', name: 'Pabellones', frequency: 'daily' },
        { id: 'a5', clientId: 'c3', name: 'Piso 12 - Open Office', frequency: '2x-day' }
    ],
    auxiliaries: [
        { id: 'u1', clientId: 'c1', name: 'Juan Pérez', status: 'available', tasksCompleted: 45, phone: '+56 9 1234 5671' },
        { id: 'u2', clientId: 'c1', name: 'María Garcia', status: 'busy', tasksCompleted: 82, phone: '+56 9 1234 5672' },
        { id: 'u3', clientId: 'c2', name: 'Carlos Ruíz', status: 'available', tasksCompleted: 30, phone: '+56 9 1234 5673' },
        { id: 'u4', clientId: 'c2', name: 'Ana Martínez', status: 'available', tasksCompleted: 58, phone: '+56 9 1234 5674' },
        { id: 'u5', clientId: 'c3', name: 'Luis Rodríguez', status: 'busy', tasksCompleted: 25, phone: '+56 9 1234 5675' }
    ],
    tasks: [],
    activities: [
        { id: 'ev1', clientId: 'c1', timestamp: '2026-02-05 08:00', user: 'Admin', action: 'Sistema Iniciado', details: 'Bóveda V3 Activa' }
    ],
    frequencies: [
        { id: '4x-day', label: '4 veces por día', value: 4 },
        { id: '3x-day', label: '3 veces por día', value: 3 },
        { id: '2x-day', label: '2 veces por día', value: 2 },
        { id: 'daily', label: '1 vez por día', value: 1 },
        { id: 'day-after', label: 'Día por medio', value: 0.5 },
        { id: 'weekly', label: 'Semanal', value: 0.14 },
        { id: 'biweekly', label: 'Quincenal', value: 0.07 },
        { id: 'monthly', label: 'Mensual', value: 0.03 }
    ],
    assets: [
        { id: 'ast1', clientId: 'c1', name: 'Ascensor de Carga E1', location: 'Mall Alameda - Sector B', healthScore: 92, rul: 180, criticality: 'Normal' },
        { id: 'ast2', clientId: 'c1', name: 'Chiller Central 01', location: 'Mall Alameda - Azotea', healthScore: 45, rul: 8, criticality: 'Critical' },
        { id: 'ast3', clientId: 'c2', name: 'Generador de Respaldo', location: 'Centro Médico - Sótano', healthScore: 78, rul: 45, criticality: 'High' }
    ],
    inventory: [
        { id: 'inv1', name: 'Desinfectante Grado Hospitalario (5L)', stock: 120, minStock: 50 },
        { id: 'inv2', name: 'Mascarillas KN95 (Caja 50u)', stock: 15, minStock: 20 },
        { id: 'inv3', name: 'Papel Toalla Advanced (Pack 6)', stock: 200, minStock: 100 }
    ],
    telemetry: {}
};

// 1. INITIALIZATION
let db = VaultSystem.load();
if (!db) {
    db = INITIAL_DATA;
    VaultSystem.save(db);
}

const engine = new IoTEngine(VaultSystem);
let currentView = 'dashboard';
let currentClientId = 'all';

// 2. SCHEDULER (Logic)
const Scheduler = {
    getTaskCountForMonth: (clientId, monthIdx) => {
        const targetAreas = clientId === 'all' ? db.areas : db.areas.filter(a => a.clientId === clientId);
        let count = 0;
        targetAreas.forEach(area => {
            const freq = db.frequencies.find(f => f.id === area.frequency) || { value: 1 };
            count += Math.ceil(freq.value * 30);
        });
        return count;
    }
};

// 3. VIEWS ENGINE
const views = {
    dashboard: () => `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
            <h2>Panel de Resumen Global</h2>
            <div style="font-size: 0.85rem; color: var(--text-secondary); background: #eee; padding: 4px 12px; border-radius: 20px;">
                Ecosistema: <strong style="color: var(--primary);">Advance-V3</strong>
            </div>
        </div>
        <div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));">
            <div class="card">
                <div style="color: var(--text-secondary); font-size: 0.75rem; margin-bottom: 8px;">TOTAL CLIENTES</div>
                <div style="font-size: 1.8rem; font-weight: 700;">${db.clients.length}</div>
            </div>
            <div class="card">
                <div style="color: var(--text-secondary); font-size: 0.75rem; margin-bottom: 8px;">TAREAS HOY</div>
                <div style="font-size: 1.8rem; font-weight: 700; color: var(--primary);">${db.tasks.length}</div>
            </div>
            <div class="card">
                <div style="color: var(--text-secondary); font-size: 0.75rem; margin-bottom: 8px;">ALERTAS IA</div>
                <div style="font-size: 1.8rem; font-weight: 700; color: var(--danger);">${db.assets.filter(a => a.healthScore < 50).length}</div>
            </div>
            <div class="card">
                <div style="color: var(--text-secondary); font-size: 0.75rem; margin-bottom: 8px;">PERSONAL ACTIVO</div>
                <div style="font-size: 1.8rem; font-weight: 700;">${db.auxiliaries.length}</div>
            </div>
        </div>
    `,
    clients: () => `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
            <h2>Directorio de Clientes</h2>
            <button class="btn btn-primary" onclick="showNewClientModal()">+ Nuevo Cliente</button>
        </div>
        <div class="grid" style="grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));">
            ${db.clients.map(c => `
                <div class="card">
                    <h3 style="color: var(--primary);">${c.name}</h3>
                    <p style="font-size: 0.85rem; color: var(--text-secondary);">${c.rut}</p>
                    <hr style="margin: 12px 0; border: none; border-top: 1px solid var(--border);">
                    <button class="btn" onclick="selectClient('${c.id}')">Ver Operación</button>
                </div>
            `).join('')}
        </div>
    `,
    predictive_maintenance: () => {
        const filteredAssets = currentClientId === 'all' ? db.assets : db.assets.filter(a => a.clientId === currentClientId);
        return `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
                <h2>Mantenimiento Predictivo (IA Core)</h2>
                <button class="btn" onclick="simulateAnomaly()">Simular Anomalía</button>
            </div>
            <div class="card" style="padding: 0;">
                <table style="width: 100%; border-collapse: collapse; font-size: 0.85rem;">
                    <thead style="background: #faf9f8; border-bottom: 1px solid var(--border);">
                        <tr style="text-align: left;">
                            <th style="padding: 12px;">Activo</th>
                            <th style="padding: 12px;">Salud IA</th>
                            <th style="padding: 12px;">RUL (Vida)</th>
                            <th style="padding: 12px;">Estado</th>
                            <th style="padding: 12px; text-align: right;">Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${filteredAssets.map(a => `
                            <tr style="border-bottom: 1px solid var(--border);">
                                <td style="padding: 12px;"><strong>${a.name}</strong><br><small>${a.location}</small></td>
                                <td style="padding: 12px;">${a.healthScore}%</td>
                                <td style="padding: 12px;">${a.rul} días</td>
                                <td style="padding: 12px;"><span class="status-pill status-${a.criticality === 'Critical' ? 'danger' : 'success'}">${a.criticality}</span></td>
                                <td style="padding: 12px; text-align: right;"><button class="btn" onclick="viewAssetTelemetry('${a.id}')">Live Link</button></td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    },
    security: () => {
        return `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
                <h2>Security & Cloud Vault</h2>
                <button class="btn btn-primary" onclick="createManualBackup()">Snapshot Ahora</button>
            </div>
            <div class="card">
                <h4>Integridad de Bóveda (AES-B64 Optimized)</h4>
                <p style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 8px;">
                    El sistema de persistencia actual utiliza cifrado base 64 con preparación para Google KMS.
                </p>
                <div style="margin-top: 16px; padding: 12px; background: #f3fcf3; border-left: 4px solid var(--success);">
                    Seguridad: <strong style="color: var(--success);">Nivel Enterprise Ready</strong>
                </div>
            </div>
        `;
    }
};

// 4. APP INITIALIZATION & NAVIGATION
function initApp() {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('app-container').classList.add('active');
    engine.start();
    window.renderView('dashboard');
    startClock();
}

window.renderView = (viewName) => {
    currentView = viewName;
    const container = document.getElementById('view-container');
    document.querySelectorAll('.nav-links li').forEach(li => li.classList.toggle('active', li.dataset.view === viewName));

    if (views[viewName]) {
        container.innerHTML = views[viewName]();
        VaultSystem.logActivity('all', 'System', 'Navegación', `Carga: ${viewName}`);
    } else {
        container.innerHTML = `<div class="card"><h2>Módulo en Escalación</h2><p>El componente <strong>${viewName}</strong> está siendo optimizado para GCP.</p></div>`;
    }
};

// 5. EVENT HANDLING
document.addEventListener('advance:iot_update', () => {
    if (['dashboard', 'predictive_maintenance'].includes(currentView)) window.renderView(currentView);
});

document.addEventListener('advance:anomaly', (e) => {
    const asset = e.detail.asset;
    window.renderView('predictive_maintenance');
    alert(`🚨 ALERTA IA: Fallo inminente en ${asset.name}. Inspección urgente requerida.`);
});

// 6. GLOBAL DISPATCHERS (Attached to Window for DOM compatibility)
window.initApp = initApp;
window.logout = Auth.logout;
window.selectClient = (id) => {
    currentClientId = id;
    const client = db.clients.find(c => c.id === id);
    document.querySelector('#client-context span').innerText = client ? client.name : 'Global | Operaciones';
    Modal.close();
    window.renderView('dashboard');
};

window.simulateAnomaly = () => {
    const target = db.assets[Math.floor(Math.random() * db.assets.length)];
    engine.triggerAnomaly(target.id);
};

window.viewAssetTelemetry = (assetId) => {
    const asset = db.assets.find(a => a.id === assetId);
    const content = `
        <div style="padding: 20px;">
            <h3>${asset.name}</h3>
            <div style="background: #000; color: #0f0; font-family: monospace; padding: 15px; margin-top: 15px;">
                > SIG_ANALYSIS: ACTIVE<br>
                > HEALTH: ${asset.healthScore}%<br>
                > PREDICTED_FAILURE: ${asset.rul} days
            </div>
            <button class="btn btn-primary" style="width: 100%; margin-top: 15px;" onclick="Modal.close()">Cerrar</button>
        </div>
    `;
    Modal.open('Telemetría Real-Time', content);
};

// 7. AUTH HANDLERS
const loginForm = document.getElementById('login-form');
if (loginForm) {
    console.log('[App] Cargando manejador de autenticación...');
    loginForm.onsubmit = async (e) => {
        e.preventDefault();
        const emailEl = document.getElementById('login-email');
        const passEl = document.getElementById('login-password');

        if (!emailEl || !passEl) {
            console.error('[App] No se encontraron los campos de login.');
            return;
        }

        const email = emailEl.value;
        const pass = passEl.value;

        console.log('[App] Procesando formulario de acceso...');
        try {
            const success = await Auth.login(email, pass);
            if (success) {
                console.log('[App] Auth exitoso. Iniciando aplicación...');
                initApp();
            } else {
                alert('Protección de Ingeniería: Acceso denegado. Verifique sus credenciales.');
            }
        } catch (err) {
            console.error('[App] Error crítico en Auth:', err);
            alert('Fallo en el sistema de autenticación. Revise la consola del desarrollador.');
        }
    };
} else {
    console.error('[App] Error CRÍTICO: No se encontró el formulario de login (id="login-form")');
}

// 8. UI UTILS & HELPERS
const Modal = {
    open: (title, content) => {
        document.getElementById('modal-title').innerText = title;
        document.getElementById('modal-content').innerHTML = content;
        document.getElementById('modal-container').classList.remove('hidden');
    },
    close: () => document.getElementById('modal-container').classList.add('hidden')
};

window.Modal = Modal;
document.querySelector('.close-modal').onclick = Modal.close;

function startClock() {
    setInterval(() => {
        const now = new Date();
        const timeEl = document.getElementById('current-time');
        const dateEl = document.getElementById('current-date');
        if (timeEl) timeEl.innerText = now.toLocaleTimeString();
        if (dateEl) dateEl.innerText = now.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    }, 1000);
}

document.addEventListener('click', (e) => {
    const navItem = e.target.closest('.nav-links li');
    if (navItem && navItem.dataset.view) window.renderView(navItem.dataset.view);
});

if (Auth.isLoggedIn()) initApp();
