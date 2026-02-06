// --- ADVANCE SYSTEM CORE ---

// 1. DATA MODELS & MASIVE INITIAL DATA
const INITIAL_DATA = {
    clients: [
        { id: 'c1', name: 'Mall Plaza Alameda', rut: '76.123.456-7', address: 'Av. Libertador 3456', contact: 'Roberto Gómez' },
        { id: 'c2', name: 'Centro Médico San José', rut: '77.890.123-K', address: 'Calle Salud 789', contact: 'Dra. Ana Silva' },
        { id: 'c3', name: 'Torres del Parque (Oficinas)', rut: '78.555.222-0', address: 'Miraflores 100', contact: 'Juan Pérez' }
    ],
    areas: [
        { id: 'a1', clientId: 'c1', name: 'Lobby Central' },
        { id: 'a2', clientId: 'c1', name: 'Patio de Comidas' },
        { id: 'a3', clientId: 'c2', name: 'Urgencias' },
        { id: 'a4', clientId: 'c2', name: 'Pabellones' },
        { id: 'a5', clientId: 'c3', name: 'Piso 12 - Open Office' }
    ],
    auxiliaries: [
        { id: 'u1', clientId: 'c1', name: 'Juan Pérez', status: 'available', tasksCompleted: 45, phone: '+56 9 1234 5671' },
        { id: 'u2', clientId: 'c1', name: 'María Garcia', status: 'busy', tasksCompleted: 82, phone: '+56 9 1234 5672' },
        { id: 'u3', clientId: 'c2', name: 'Carlos Ruíz', status: 'available', tasksCompleted: 30, phone: '+56 9 1234 5673' },
        { id: 'u4', clientId: 'c2', name: 'Ana Martínez', status: 'available', tasksCompleted: 58, phone: '+56 9 1234 5674' },
        { id: 'u5', clientId: 'c3', name: 'Luis Rodríguez', status: 'busy', tasksCompleted: 25, phone: '+56 9 1234 5675' },
        { id: 'u6', clientId: 'c4', name: 'Elena Gómez', status: 'available', tasksCompleted: 120, phone: '+56 9 1234 5676' },
        { id: 'u7', clientId: 'c4', name: 'Jorge Castro', status: 'available', tasksCompleted: 62, phone: '+56 9 1234 5677' },
        { id: 'u8', clientId: 'c5', name: 'Sofía López', status: 'busy', tasksCompleted: 17, phone: '+56 9 1234 5678' },
        { id: 'u9', clientId: 'c5', name: 'Ricardo Serna', status: 'available', tasksCompleted: 44, phone: '+56 9 1234 5679' },
        { id: 'u10', clientId: 'c1', name: 'Patricia Velez', status: 'available', tasksCompleted: 90, phone: '+56 9 1234 5680' }
    ],
    tasks: [],
    activities: [
        { id: 'ev1', clientId: 'c1', timestamp: '2026-02-05 08:00', user: 'Admin', action: 'Sistema Iniciado', details: 'Base de datos multi-cliente cargada' },
        { id: 'ev2', clientId: 'c4', timestamp: '2026-02-05 09:15', user: 'Elena Gómez', action: 'Finalizó Tarea', details: 'Desinfectar Quirófano 1' }
    ],
    // Scheduling Configuration
    frequencies: [
        { id: '4x-day', label: '4 veces por día', value: 4 },
        { id: '3x-day', label: '3 veces por día', value: 3 },
        { id: '2x-day', label: '2 veces por día', value: 2 },
        { id: 'daily', label: '1 vez por día', value: 1 },
        { id: 'day-after', label: 'Día por medio', value: 0.5 },
        { id: 'weekly', label: 'Semanal', value: 0.14 },
        { id: 'biweekly', label: 'Quincenal', value: 0.07 },
        { id: 'monthly', label: 'Mensual', value: 0.03 },
        { id: 'bimonthly', label: 'Bimensual', value: 0.015 },
        { id: 'trimestral', label: 'Trimestral', value: 0.01 },
        { id: 'semiannual', label: 'Semestral', value: 0.005 },
        { id: 'annual', label: 'Anual', value: 0.002 }
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
    telemetry: {
        'a1': { occupancy: 12 },
        'a2': { occupancy: 65 },
        'a3': { occupancy: 4 }
    }
};

// 2. VAULT SYSTEM (Professional Data Integrity)
const VaultSystem = {
    keys: {
        config: 'DC_CONFIG',
        ops: 'DC_OPS_2026',
        audit: 'DC_AUDIT_LOG',
        backups: 'DC_BACKUPS'
    },
    save: (data) => {
        const configData = {
            clients: data.clients,
            areas: data.areas,
            auxiliaries: data.auxiliaries,
            frequencies: data.frequencies,
            assets: data.assets,
            inventory: data.inventory
        };
        const opsData = { tasks: data.tasks, telemetry: data.telemetry };
        const auditData = { activities: data.activities };

        localStorage.setItem(VaultSystem.keys.config, JSON.stringify(configData));
        localStorage.setItem(VaultSystem.keys.ops, JSON.stringify(opsData));
        localStorage.setItem(VaultSystem.keys.audit, JSON.stringify(auditData));

        // Tracking changes for auto-snapshot
        let changeCount = parseInt(localStorage.getItem('dc_change_count') || '0') + 1;
        if (changeCount >= 10) {
            VaultSystem.takeSnapshot(data, 'Auto-Snapshot (System)');
            changeCount = 0;
        }
        localStorage.setItem('dc_change_count', changeCount);
    },
    load: () => {
        const config = JSON.parse(localStorage.getItem(VaultSystem.keys.config));
        const ops = JSON.parse(localStorage.getItem(VaultSystem.keys.ops));
        const audit = JSON.parse(localStorage.getItem(VaultSystem.keys.audit));

        if (!config || !config.assets) {
            // Re-initialize if Phase 4 data is missing
            VaultSystem.save(INITIAL_DATA);
            return INITIAL_DATA;
        }

        return {
            ...config,
            tasks: ops ? ops.tasks : [],
            telemetry: ops ? ops.telemetry || {} : {},
            activities: audit ? audit.activities : []
        };
    },
    takeSnapshot: (data, label = 'Respaldo Manual') => {
        const backups = JSON.parse(localStorage.getItem(VaultSystem.keys.backups) || '[]');
        const snapshot = {
            id: 'bkp' + Date.now(),
            timestamp: new Date().toLocaleString(),
            label: label,
            data: b64EncodeUnicode(JSON.stringify(data)), // Obfuscated backup
            size: (JSON.stringify(data).length / 1024).toFixed(2) + ' KB'
        };
        backups.unshift(snapshot);
        if (backups.length > 5) backups.pop(); // Keep last 5
        localStorage.setItem(VaultSystem.keys.backups, JSON.stringify(backups));
        return snapshot;
    },
    logActivity: (clientId, user, action, details) => {
        const now = new Date();
        const timestamp = now.toLocaleDateString() + ' ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        db.activities.unshift({
            id: 'ev' + Date.now(),
            clientId,
            timestamp,
            user,
            action,
            details
        });
        VaultSystem.save(db);
    }
};

// Helper for obscure encoding
function b64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
        return String.fromCharCode('0x' + p1);
    }));
}

function b64DecodeUnicode(str) {
    return decodeURIComponent(atob(str).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}

let db = VaultSystem.load();
let currentView = 'dashboard';
let currentClientId = 'all'; // 'all' or specific ID

// 3. AUTH MANAGER
const Auth = {
    isLoggedIn: () => sessionStorage.getItem('dc_auth') === 'true',
    login: (email, pass) => {
        if (email === 'admin@dynamic.com' && pass === 'admin123') {
            sessionStorage.setItem('dc_auth', 'true');
            return true;
        }
        return false;
    },
    logout: () => {
        sessionStorage.removeItem('dc_auth');
        window.location.reload();
    }
};

document.getElementById('login-form').onsubmit = (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const pass = document.getElementById('login-password').value;
    if (Auth.login(email, pass)) {
        initApp();
    } else {
        alert('Credenciales incorrectas. Prueba con admin@dynamic.com / admin123');
    }
};

// 4. CALENDAR & SCHEDULING LOGIC
const Scheduler = {
    // Frequencies: 1-4 per day, day-after, weekly, biweekly, monthly, bimonthly, quarterly, semiannual, annual
    getTaskCountForMonth: (clientId, monthIdx, year = 2026) => {
        let count = 0;
        const targetAreas = clientId === 'all' ? db.areas : db.areas.filter(a => a.clientId === clientId);

        targetAreas.forEach(area => {
            const freq = db.frequencies.find(f => f.id === area.frequency) || { value: 1 };
            // Simple logic: frequency per day * 30 days
            count += Math.ceil(freq.value * 30);
        });
        return count;
    },
    generateTasksForDate: (dateStr) => {
        const todayTasks = db.tasks.filter(t => t.date === dateStr);
        if (todayTasks.length === 0) {
            db.areas.forEach(area => {
                const freq = db.frequencies.find(f => f.id === area.frequency) || { value: 1 };
                const times = Math.max(1, Math.round(freq.value)); // Simple daily task generation

                for (let i = 0; i < times; i++) {
                    db.tasks.push({
                        id: 't' + Date.now() + Math.random(),
                        clientId: area.clientId,
                        areaId: area.id,
                        title: `Limpieza ${i + 1}: ${area.name}`,
                        status: Math.random() > 0.4 ? 'completed' : 'pending',
                        date: dateStr,
                        time: i === 0 ? '08:00' : (8 + i * 4) + ':00'
                    });
                }
            });
            VaultSystem.save(db);
        }
    }
};

// 5. VIEW DEFINITIONS
const views = {
    dashboard: () => {
        const filteredTasks = currentClientId === 'all' ? db.tasks : db.tasks.filter(t => t.clientId === currentClientId);
        const completed = filteredTasks.filter(t => t.status === 'completed').length;
        const pending = filteredTasks.length - completed;

        return `
            <h2 style="margin-bottom: 24px;">Resumen del Sistema</h2>
            <div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));">
                <div class="card">
                    <div style="color: var(--text-secondary); font-size: 0.8rem; font-weight: 600;">TAREAS COMPLETADAS</div>
                    <div style="font-size: 2rem; font-weight: 600; color: var(--success);">${completed}</div>
                    <div style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 8px;">En todos los contratos</div>
                </div>
                <div class="card">
                    <div style="color: var(--text-secondary); font-size: 0.8rem; font-weight: 600;">TAREAS PENDIENTES</div>
                    <div style="font-size: 2rem; font-weight: 600; color: var(--danger);">${pending}</div>
                    <div style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 8px;">Acción requerida inmediata</div>
                </div>
                <div class="card">
                    <div style="color: var(--text-secondary); font-size: 0.8rem; font-weight: 600;">COBERTURA DE SERVICIOS</div>
                    <div style="font-size: 2rem; font-weight: 600; color: var(--primary);">98.2%</div>
                    <div style="height: 4px; background: #eee; margin-top: 12px;">
                        <div style="width: 98%; height: 100%; background: var(--primary);"></div>
                    </div>
                </div>
            </div>

            <div class="grid" style="grid-template-columns: 2fr 1fr; margin-top: 24px;">
                <div class="card">
                    <h3 style="margin-bottom: 16px;">Operaciones Recientes</h3>
                    <table style="width: 100%; border-collapse: collapse; font-size: 0.9rem;">
                        <thead>
                            <tr style="text-align: left; border-bottom: 1px solid var(--border);">
                                <th style="padding: 12px 8px;">Cliente</th>
                                <th style="padding: 12px 8px;">Área</th>
                                <th style="padding: 12px 8px;">Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${db.areas.slice(0, 5).map(a => {
            const client = db.clients.find(c => c.id === a.clientId);
            return `
                                    <tr style="border-bottom: 1px solid var(--border);">
                                        <td style="padding: 12px 8px;">${client.name}</td>
                                        <td style="padding: 12px 8px;">${a.name}</td>
                                        <td style="padding: 12px 8px;"><span class="status-pill status-${a.status === 'clean' ? 'success' : 'danger'}">${a.status}</span></td>
                                    </tr>
                                `;
        }).join('')}
                        </tbody>
                    </table>
                </div>
                <div class="card">
                    <h3 style="margin-bottom: 16px;">Métricas Globales</h3>
                    <div style="display: flex; flex-direction: column; gap: 12px;">
                        <div style="display: flex; justify-content: space-between;">
                            <span>Clientes Activos</span>
                            <span style="font-weight: 600;">${db.clients.length}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between;">
                            <span>Auxiliares</span>
                            <span style="font-weight: 600;">${db.auxiliaries.length}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between;">
                            <span>Zonas Vigiladas</span>
                            <span style="font-weight: 600;">${db.areas.length}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },
    clients: () => {
        return `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
                <h2>Directorio de Clientes</h2>
                <button class="btn btn-primary" onclick="showNewClientModal()">+ Nuevo Cliente</button>
            </div>
            <div class="grid" style="grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));">
                ${db.clients.map(c => `
                    <div class="card">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
                            <h3 style="color: var(--primary);">${c.name}</h3>
                            <span style="font-size: 0.7rem; color: var(--text-secondary);">${c.rut}</span>
                        </div>
                        <p style="font-size: 0.85rem; margin-bottom: 4px;"><strong>Dirección:</strong> ${c.address}</p>
                        <p style="font-size: 0.85rem; margin-bottom: 16px;"><strong>Interlocutor:</strong> ${c.contact}</p>
                        <div style="display: flex; gap: 8px;">
                            <button class="btn" style="font-size: 0.75rem;" onclick="selectClient('${c.id}')">Gestionar Operación</button>
                            <button class="btn" style="font-size: 0.75rem;">Editar Ficha</button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    },
    calendar: () => {
        const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        const clientName = currentClientId === 'all' ? 'Todos los Clientes' : db.clients.find(c => c.id === currentClientId).name;

        return `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
                <div>
                    <h2>Programación Anual 2026</h2>
                    <p style="font-size: 0.85rem; color: var(--text-secondary);">Carga de trabajo proyectada para: <strong>${clientName}</strong></p>
                </div>
                <div style="display: flex; gap: 12px; align-items: center;">
                    <button class="btn" style="font-size: 0.8rem;">Exportar Calendario PDF</button>
                    <div style="display: flex; align-items: center; gap: 4px;"><div style="width: 12px; height: 12px; background: #eff6fc; border: 1px solid var(--primary);"></div> <span style="font-size: 0.7rem;">Días Programados</span></div>
                </div>
            </div>
            <div class="grid" style="grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));">
                ${months.map((m, idx) => {
            const taskCount = Scheduler.getTaskCountForMonth(currentClientId, idx);
            return `
                        <div class="card" style="padding: 12px;">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; border-bottom: 1px solid var(--border); padding-bottom: 4px;">
                                <h4 style="margin: 0;">${m}</h4>
                                <span style="font-size: 0.7rem; font-weight: 600; color: var(--primary);">${taskCount} tareas</span>
                            </div>
                            <div class="calendar-grid">
                                ${Array.from({ length: 31 }, (_, i) => {
                const isProgrammed = Math.random() > 0.3; // Simulated coverage
                return `<div class="calendar-day ${isProgrammed ? 'has-tasks' : ''}" style="cursor: pointer; position: relative;">
                                        ${i + 1}
                                        ${isProgrammed ? '<div style="position: absolute; bottom: 2px; right: 2px; width: 3px; height: 3px; background: var(--primary); border-radius: 50%;"></div>' : ''}
                                    </div>`;
            }).join('')}
                            </div>
                        </div>
                    `;
        }).join('')}
            </div>
        `;
    },
    audit_log: () => {
        const logs = currentClientId === 'all' ? db.activities : db.activities.filter(a => a.clientId === currentClientId);
        return `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
                <h2>Bitácora de Auditoría</h2>
                <button class="btn" onclick="exportAudit()">Exportar Excel</button>
            </div>
            <div class="card" style="padding: 0;">
                <table style="width: 100%; border-collapse: collapse; font-size: 0.85rem;">
                    <thead style="background: #faf9f8; border-bottom: 1px solid var(--border);">
                        <tr style="text-align: left;">
                            <th style="padding: 12px;">Timestamp</th>
                            <th style="padding: 12px;">Usuario</th>
                            <th style="padding: 12px;">Acción</th>
                            <th style="padding: 12px;">Detalles</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${logs.length ? logs.map(l => `
                            <tr style="border-bottom: 1px solid var(--border);">
                                <td style="padding: 12px; color: var(--text-secondary); font-family: monospace;">${l.timestamp}</td>
                                <td style="padding: 12px; font-weight: 600;">${l.user}</td>
                                <td style="padding: 12px;">${l.action}</td>
                                <td style="padding: 12px; color: var(--text-secondary);">${l.details}</td>
                            </tr>
                        `).join('') : '<tr><td colspan="4" style="padding: 24px; text-align: center; color: var(--text-secondary);">No hay registros para este cliente</td></tr>'}
                    </tbody>
                </table>
            </div>
        `;
    },
    tasks: () => {
        const filteredTasks = currentClientId === 'all' ? db.tasks : db.tasks.filter(t => t.clientId === currentClientId);
        return `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
                <h2>Tareas para Hoy</h2>
                <button class="btn btn-primary" onclick="showNewTaskModal()">+ Nueva Tarea</button>
            </div>
            <div class="card" style="padding: 0;">
                <table style="width: 100%; border-collapse: collapse; font-size: 0.9rem;">
                    <thead style="background: #faf9f8; border-bottom: 1px solid var(--border);">
                        <tr style="text-align: left;">
                            <th style="padding: 12px;">Tarea</th>
                            <th style="padding: 12px;">Horario</th>
                            <th style="padding: 12px;">Cliente</th>
                            <th style="padding: 12px;">Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${filteredTasks.length ? filteredTasks.map(t => {
            const client = db.clients.find(c => c.id === t.clientId);
            return `
                                <tr style="border-bottom: 1px solid var(--border);">
                                    <td style="padding: 12px; font-weight: 600;">${t.title}</td>
                                    <td style="padding: 12px; font-family: monospace;">${t.time || '08:00'}</td>
                                    <td style="padding: 12px; font-size: 0.85rem;">${client ? client.name : 'N/A'}</td>
                                    <td style="padding: 12px;">
                                        <span class="status-pill status-${t.status === 'completed' ? 'success' : 'danger'}" 
                                              onclick="toggleTaskStatus('${t.id}')" 
                                              style="cursor: pointer;">
                                            ${t.status === 'completed' ? 'Completada' : 'Pendiente'}
                                        </span>
                                    </td>
                                </tr>
                            `;
        }).join('') : '<tr><td colspan="4" style="padding: 24px; text-align: center; color: var(--text-secondary);">No hay tareas para este periodo</td></tr>'}
                    </tbody>
                </table>
            </div>
        `;
    },
    worker_master: () => {
        return `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
                <h2>Base Maestra de Personal (Advance)</h2>
                <button class="btn btn-primary" onclick="showNewWorkerModal()">+ Registrar Auxiliar</button>
            </div>
            <div class="card" style="padding: 0;">
                <table style="width: 100%; border-collapse: collapse;">
                    <thead style="background: #faf9f8; border-bottom: 1px solid var(--border);">
                        <tr style="text-align: left;">
                            <th style="padding: 12px; font-size: 0.85rem;">Nombre</th>
                            <th style="padding: 12px; font-size: 0.85rem;">Cliente/Contrato</th>
                            <th style="padding: 12px; font-size: 0.85rem;">Teléfono</th>
                            <th style="padding: 12px; font-size: 0.85rem;">Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${db.auxiliaries.map(aux => {
            const client = db.clients.find(c => c.id === aux.clientId);
            return `
                                <tr style="border-bottom: 1px solid var(--border);">
                                    <td style="padding: 12px; font-weight: 600;">${aux.name}</td>
                                    <td style="padding: 12px; font-size: 0.85rem;">${client ? client.name : 'Varios'}</td>
                                    <td style="padding: 12px; font-size: 0.85rem;">${aux.phone}</td>
                                    <td style="padding: 12px;"><span class="status-pill status-${aux.status === 'available' ? 'success' : 'warning'}">${aux.status}</span></td>
                                </tr>
                            `;
        }).join('')}
                    </tbody>
                </table>
            </div>
        `;
    },
    dynamic_clean_v2: () => {
        const filteredAreas = currentClientId === 'all' ? db.areas : db.areas.filter(a => a.clientId === currentClientId);
        return `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
                <div>
                    <h2>Higiene Dinámica Advance</h2>
                    <p style="font-size: 0.85rem; color: var(--text-secondary);">Recursos de limpieza orquestados por demanda real y sensores de tráfico</p>
                </div>
                <div style="background: var(--bg-white); padding: 8px 16px; border-radius: var(--radius); border: 1px solid var(--border); font-size: 0.85rem;">
                    <strong>IA Status:</strong> <span style="color: var(--success);">Optimización Activa</span>
                </div>
            </div>

            <div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
                ${filteredAreas.map(a => {
            const occupancy = db.telemetry[a.id]?.occupancy || 0;
            const threshold = 50;
            const percentage = Math.min(100, (occupancy / threshold) * 100);
            return `
                        <div class="card" style="position: relative; overflow: hidden;">
                            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
                                <div>
                                    <h4 style="margin: 0;">${a.name}</h4>
                                    <span style="font-size: 0.75rem; color: var(--text-secondary);">Umbral: ${threshold} visitas</span>
                                </div>
                                <ion-icon name="people-outline" style="font-size: 1.5rem; color: ${percentage > 80 ? 'var(--danger)' : 'var(--primary)'};"></ion-icon>
                            </div>
                            <div style="font-size: 2rem; font-weight: 700; margin-bottom: 8px;">${occupancy}</div>
                            <div style="font-size: 0.75rem; color: var(--text-secondary); margin-bottom: 4px;">CARGA DE USO ACTUAL</div>
                            <div style="height: 6px; background: #eee; border-radius: 3px; overflow: hidden;">
                                <div style="width: ${percentage}%; height: 100%; background: ${percentage > 80 ? 'var(--danger)' : 'var(--primary)'}; transition: width 0.5s;"></div>
                            </div>
                            ${percentage >= 100 ? `
                                <div style="margin-top: 12px; padding: 8px; background: #fff1f0; border: 1px solid var(--danger); border-radius: 2px; color: var(--danger); font-size: 0.75rem; font-weight: 600;">
                                    <ion-icon name="alert-circle"></ion-icon> LIMPIEZA REQUERIDA (AUTO-TRIGGER)
                                </div>
                            ` : ''}
                        </div>
                    `;
        }).join('')}
            </div>
        `;
    },
    energy_management: () => {
        return `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
                <div>
                    <h2>Gestión Energética Adaptativa</h2>
                    <p style="font-size: 0.85rem; color: var(--text-secondary);">Optimización multivariable de HVAC e iluminación basada en ocupación y clima</p>
                </div>
                <div class="btn-group">
                    <button class="btn btn-primary" onclick="simulateCloudSync()">Sincronizar Pronóstico</button>
                </div>
            </div>

            <div class="grid" style="grid-template-columns: 2fr 1fr; gap: 24px;">
                <div class="card">
                    <h4>Consumo de Energía en Tiempo Real (kWh)</h4>
                    <div style="height: 200px; display: flex; align-items: flex-end; gap: 10px; padding-top: 20px;">
                        ${Array.from({ length: 12 }, (_, i) => `<div style="flex: 1; background: var(--primary); height: ${30 + Math.random() * 70}%; opacity: ${0.3 + (i / 12)}; border-radius: 2px 2px 0 0;"></div>`).join('')}
                    </div>
                    <div style="display: flex; justify-content: space-between; font-size: 0.7rem; color: var(--text-secondary); margin-top: 8px;">
                        <span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>23:59</span>
                    </div>
                </div>

                <div class="card">
                    <h4>Variables de IA</h4>
                    <div style="display: flex; flex-direction: column; gap: 16px; margin-top: 16px;">
                        <div>
                            <div style="font-size: 0.7rem; color: var(--text-secondary);">TEMP. EXTERNA PREVISTA</div>
                            <div style="font-size: 1.2rem; font-weight: 600;">32°C (Ola de Calor)</div>
                        </div>
                        <div>
                            <div style="font-size: 0.7rem; color: var(--text-secondary);">ESTADO HVAC</div>
                            <div style="color: var(--warning); font-weight: 600;">Pre-enfriamiento Activo</div>
                        </div>
                        <div style="background: #fdf6ec; padding: 12px; border-radius: 4px; border: 1px solid #faecd8;">
                            <p style="font-size: 0.75rem; color: #b88230;">IA ha desplazado el 15% de la carga de enfriamiento a horas valle (02:00 - 06:00).</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },
    predictive_maintenance: () => {
        const filteredAssets = currentClientId === 'all' ? db.assets : db.assets.filter(a => a.clientId === currentClientId);
        return `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
                <div>
                    <h2>Mantenimiento Predictivo Advance (IA)</h2>
                    <p style="font-size: 0.85rem; color: var(--text-secondary);">Análisis de salud de activos basado en telemetría IoT y modelos RUL</p>
                </div>
                <div style="display: flex; gap: 8px;">
                     <button class="btn" onclick="IOT_Simulator.triggerAnomaly()">Simular Anomalía</button>
                </div>
            </div>

            <div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-bottom: 24px;">
                <div class="card" style="border-left: 4px solid var(--success);">
                    <div style="font-size: 0.75rem; color: var(--text-secondary);">ACTIVOS SALUDABLES</div>
                    <div style="font-size: 1.8rem; font-weight: 700;">${filteredAssets.filter(a => a.healthScore > 80).length}</div>
                </div>
                <div class="card" style="border-left: 4px solid var(--warning);">
                    <div style="font-size: 0.75rem; color: var(--text-secondary);">EN OBSERVACIÓN</div>
                    <div style="font-size: 1.8rem; font-weight: 700;">${filteredAssets.filter(a => a.healthScore > 50 && a.healthScore <= 80).length}</div>
                </div>
                <div class="card" style="border-left: 4px solid var(--danger);">
                    <div style="font-size: 0.75rem; color: var(--text-secondary);">RIESGO CRÍTICO (FAIL PREDICT)</div>
                    <div style="font-size: 1.8rem; font-weight: 700; color: var(--danger);">${filteredAssets.filter(a => a.healthScore <= 50).length}</div>
                </div>
            </div>

            <div class="card" style="padding: 0;">
                <table style="width: 100%; border-collapse: collapse; font-size: 0.85rem;">
                    <thead style="background: #faf9f8; border-bottom: 1px solid var(--border);">
                        <tr style="text-align: left;">
                            <th style="padding: 12px;">Activo / Ubicación</th>
                            <th style="padding: 12px;">Salud (IA Score)</th>
                            <th style="padding: 12px;">RUL (Vida Restante)</th>
                            <th style="padding: 12px;">Criticidad</th>
                            <th style="padding: 12px; text-align: right;">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${filteredAssets.map(a => `
                            <tr style="border-bottom: 1px solid var(--border);">
                                <td style="padding: 12px;">
                                    <div style="font-weight: 600;">${a.name}</div>
                                    <div style="font-size: 0.75rem; color: var(--text-secondary);">${a.location}</div>
                                </td>
                                <td style="padding: 12px;">
                                    <div style="display: flex; align-items: center; gap: 8px;">
                                        <div style="flex: 1; height: 8px; background: #eee; border-radius: 4px; overflow: hidden;">
                                            <div style="width: ${a.healthScore}%; height: 100%; background: ${a.healthScore > 80 ? 'var(--success)' : a.healthScore > 50 ? 'var(--warning)' : 'var(--danger)'};"></div>
                                        </div>
                                        <span style="font-weight: 700;">${a.healthScore}%</span>
                                    </div>
                                </td>
                                <td style="padding: 12px; font-weight: 600;">${a.rul} días por IA</td>
                                <td style="padding: 12px;"><span class="status-pill status-${a.criticality === 'Critical' ? 'danger' : a.criticality === 'High' ? 'warning' : 'success'}">${a.criticality}</span></td>
                                <td style="padding: 12px; text-align: right;">
                                    <button class="btn" style="padding: 4px 8px; font-size: 0.75rem;" onclick="viewAssetTelemetry('${a.id}')">Telemetría</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    },
    safety_surveillance: () => {
        return `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
                <div>
                    <h2>Vigilancia Autónoma y SSO</h2>
                    <p style="font-size: 0.85rem; color: var(--text-secondary);">Análisis de video en tiempo real para detección de EPP y riesgos</p>
                </div>
            </div>
            <div class="grid" style="grid-template-columns: 2fr 1fr; gap: 24px;">
                <div class="card" style="padding: 0; background: #000; height: 350px; position: relative; overflow: hidden; border: 4px solid #333;">
                    <div style="position: absolute; top: 10px; left: 10px; color: #0f0; font-family: monospace; font-size: 0.7rem; background: rgba(0,0,0,0.6); padding: 4px;">LIVE FEED: SECTOR LOGÍSTICO</div>
                    <div style="position: absolute; top: 20%; left: 30%; width: 100px; height: 200px; border: 2px solid #0f0;">
                         <div style="background: #0f0; color: #000; font-size: 0.6rem; padding: 2px; position: absolute; bottom: 100%;">Persona - Casco OK</div>
                    </div>
                </div>
                <div class="card">
                    <h4>Métricas de Seguridad</h4>
                    <div style="margin-top: 20px; display: flex; flex-direction: column; gap: 15px;">
                        <div>
                            <div style="font-size: 0.75rem; color: var(--text-secondary);">Incidentes Hoy</div>
                            <div style="font-size: 1.5rem; font-weight: 700; color: var(--success);">0</div>
                        </div>
                        <div style="padding-top: 15px; border-top: 1px solid var(--border);">
                            <div style="font-size: 0.75rem; color: var(--text-secondary);">Cumplimiento EPP</div>
                            <div style="font-size: 1.5rem; font-weight: 700; color: var(--warning);">94.2%</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },
    space_optimization: () => {
        return `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
                <div>
                    <h2>Optimización de Espacios</h2>
                    <p style="font-size: 0.85rem; color: var(--text-secondary);">Mapas de calor y análisis de densidad en m²</p>
                </div>
            </div>
            <div class="card" style="height: 300px; background: radial-gradient(circle, rgba(231,76,60,0.2) 0%, transparent 60%), radial-gradient(circle at 70% 80%, rgba(52,152,219,0.2) 0%, transparent 60%); display: flex; align-items: center; justify-content: center;">
                 <span style="font-weight: 600; color: var(--text-secondary);">Mapa de Calor: Planta Nivel 1</span>
            </div>
        `;
    },
    workforce_logistics: () => {
        return `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
                <div>
                    <h2>Fuerza de Trabajo y Despacho</h2>
                    <p style="font-size: 0.85rem; color: var(--text-secondary);">Optimización de rutas y asignación por habilidades</p>
                </div>
            </div>
            <div class="card" style="padding: 0;">
                <table style="width: 100%; border-collapse: collapse; font-size: 0.85rem;">
                    <thead style="background: #faf9f8; border-bottom: 1px solid var(--border);">
                        <tr style="text-align: left;"><th style="padding: 12px;">Operario</th><th style="padding: 12px;">Estado</th><th style="padding: 12px;">Efectividad (IA)</th></tr>
                    </thead>
                    <tbody>
                        ${db.auxiliaries.map(u => `<tr style="border-bottom: 1px solid var(--border);"><td style="padding: 12px; font-weight: 600;">${u.name}</td><td style="padding: 12px;">${u.status}</td><td style="padding: 12px;">${(85 + Math.random() * 10).toFixed(1)}%</td></tr>`).join('')}
                    </tbody>
                </table>
            </div>
        `;
    },
    absenteeism_prediction: () => {
        return `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
                <div>
                    <h2>Predicción de Ausentismo</h2>
                    <p style="font-size: 0.85rem; color: var(--text-secondary);">Modelos de resiliencia de personal y fatiga</p>
                </div>
            </div>
            <div class="card" style="border-left: 4px solid var(--warning);">
                <h4 style="color: var(--warning);">Riesgo de Ausentismo Mañana: 12.5%</h4>
                <p style="font-size: 0.85rem; margin-top: 10px;">La IA detecta una alta probabilidad de ausentismo en el turno mañana debido al pronóstico de lluvia intensiva y fatiga acumulada del equipo A.</p>
            </div>
        `;
    },
    smart_inventory: () => {
        return `
             <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
                <div>
                    <h2>Inventario Inteligente</h2>
                    <p style="font-size: 0.85rem; color: var(--text-secondary);">Cadena de suministro predictiva Just-in-Time</p>
                </div>
            </div>
            <div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px;">
                ${db.inventory.map(i => `
                    <div class="card" style="${i.stock < i.minStock ? 'border-top: 4px solid var(--danger);' : ''}">
                        <div style="font-size: 0.8rem; font-weight: 700;">${i.name}</div>
                        <div style="font-size: 1.5rem; font-weight: 700; margin: 10px 0;">${i.stock}</div>
                         ${i.stock < i.minStock ? '<div style="font-size: 0.7rem; color: var(--danger); font-weight: 700;">REPOSICIÓN AUTOMÁTICA ACTIVA</div>' : ''}
                    </div>
                `).join('')}
            </div>
        `;
    },
    digital_twin: () => {
        return `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
                <h2>Gemelo Digital e Integración BIM</h2>
            </div>
            <div class="card" style="height: 400px; background: #222; border: 1px solid #444; display: flex; align-items: center; justify-content: center;">
                 <div style="color: #00ffcc; text-align: center;">
                    <ion-icon name="cube-outline" style="font-size: 3rem;"></ion-icon>
                    <p style="font-family: monospace; margin-top: 10px;">LOADING BIM SPATIAL ENGINE v2.5...</p>
                 </div>
            </div>
        `;
    },
    gen_ai_assistant: () => {
        return `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
                <h2>Asistente Advance (GenAI)</h2>
            </div>
            <div class="card" style="height: 450px; display: flex; flex-direction: column;">
                <div style="flex: 1; overflow-y: auto; padding: 10px; display: flex; flex-direction: column; gap: 15px;">
                    <div style="align-self: flex-start; background: #f3f2f1; padding: 12px; border-radius: 8px; font-size: 0.85rem; max-width: 80%;">
                        Hola, soy el asistente Advance. ¿En qué puedo ayudarte hoy? Consultar manuales, historial de activos o reportes de eficiencia.
                    </div>
                    <div style="align-self: flex-end; background: var(--primary); color: white; padding: 12px; border-radius: 8px; font-size: 0.85rem; max-width: 80%;">
                        ¿Cuál es el RUL actual del Ascensor de Carga E2?
                    </div>
                    <div style="align-self: flex-start; background: #f3f2f1; padding: 12px; border-radius: 8px; font-size: 0.85rem; max-width: 80%;">
                        El Ascensor de Carga E2 tiene un Tiempo de Vida Útil Restante (RUL) de <strong>45 días</strong>. He detectado un patrón de micro-vibraciones en el motor principal, por lo que he programado una inspección preventiva para el próximo martes.
                    </div>
                </div>
                <div style="padding-top: 20px; border-top: 1px solid var(--border); display: flex; gap: 10px;">
                    <input type="text" placeholder="Escribe tu consulta aquí..." style="flex: 1; padding: 12px; border: 1px solid var(--border); outline: none;">
                    <button class="btn btn-primary">Enviar</button>
                </div>
            </div>
        `;
    },
    security: () => {
        const backups = JSON.parse(localStorage.getItem(VaultSystem.keys.backups) || '[]');
        return `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
                <div>
                    <h2>Centro de Seguridad y Respaldo</h2>
                    <p style="font-size: 0.85rem; color: var(--text-secondary);">Gestión profesional de integridad de datos e historial de versiones</p>
                </div>
                <div style="display: flex; gap: 12px;">
                    <button class="btn btn-primary" onclick="createManualBackup()">Crear Respaldo Ahora</button>
                    <button class="btn" onclick="exportVault()">Exportar Bóveda JSON</button>
                </div>
            </div>

            <div class="grid" style="grid-template-columns: 1fr 2fr; gap: 24px;">
                <div class="card">
                    <h4 style="margin-bottom: 16px;">Estado de Integridad</h4>
                    <div style="display: flex; flex-direction: column; gap: 16px;">
                        <div>
                            <div style="font-size: 0.75rem; color: var(--text-secondary); margin-bottom: 4px;">ESTADO DEL SISTEMA</div>
                            <div style="display: flex; align-items: center; gap: 8px; color: var(--success); font-weight: 600;">
                                <ion-icon name="checkmark-circle" style="font-size: 1.2rem;"></ion-icon> Protegido por VaultSystem
                            </div>
                        </div>
                        <div>
                            <div style="font-size: 0.75rem; color: var(--text-secondary); margin-bottom: 4px;">ÚLTIMA SINCRONIZACIÓN</div>
                            <div style="font-weight: 600;">Sincronizado LocalStorage (v3.1)</div>
                        </div>
                        <div style="padding-top: 12px; border-top: 1px solid var(--border);">
                             <p style="font-size: 0.75rem; color: var(--text-secondary);">El sistema separa los datos maestros de la operación diaria para evitar corrupción accidental.</p>
                        </div>
                    </div>
                </div>

                <div class="card" style="padding: 0;">
                    <div style="padding: 16px; border-bottom: 1px solid var(--border);">
                        <h4 style="margin: 0;">Historial de Versiones (Snapshots)</h4>
                    </div>
                    <table style="width: 100%; border-collapse: collapse; font-size: 0.85rem;">
                        <thead style="background: #faf9f8; border-bottom: 1px solid var(--border);">
                            <tr style="text-align: left;">
                                <th style="padding: 12px;">Fecha y Hora</th>
                                <th style="padding: 12px;">Etiqueta</th>
                                <th style="padding: 12px;">Peso</th>
                                <th style="padding: 12px; text-align: right;">Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${backups.length ? backups.map(b => `
                                <tr style="border-bottom: 1px solid var(--border);">
                                    <td style="padding: 12px; color: var(--text-secondary); font-family: monospace;">${b.timestamp}</td>
                                    <td style="padding: 12px; font-weight: 600;">${b.label}</td>
                                    <td style="padding: 12px;">${b.size}</td>
                                    <td style="padding: 12px; text-align: right;">
                                        <button class="btn" style="font-size: 0.7rem;" onclick="restoreSnapshot('${b.id}')">Restaurar</button>
                                    </td>
                                </tr>
                            `).join('') : '<tr><td colspan="4" style="padding: 24px; text-align: center; color: var(--text-secondary);">No hay respaldos disponibles</td></tr>'}
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="card" style="margin-top: 24px; border-left: 4px solid var(--primary);">
                <div style="display: flex; align-items: center; gap: 12px;">
                    <ion-icon name="information-circle-outline" style="font-size: 2rem; color: var(--primary);"></ion-icon>
                    <div>
                        <h4 style="margin: 0;">Recuperación de Desastres Profesional</h4>
                        <p style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 4px;">Al restaurar una versión, los datos actuales serán reemplazados. Se recomienda descargar una exportación JSON antes de realizar cambios estructurales.</p>
                    </div>
                </div>
            </div>
        `;
    }
};

// 6. APP INITIALIZATION & NAVIGATION
function initApp() {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('app-container').classList.add('active');

    // Start IoT Simulator Loop (Phase 4)
    IOT_Simulator.start();

    // Auto-generate some tasks for today if empty
    const today = new Date().toISOString().split('T')[0];
    Scheduler.generateTasksForDate(today);

    renderView('dashboard');
    startClock();
}

function renderView(viewName) {
    currentView = viewName;
    const container = document.getElementById('view-container');

    // Update active state in sidebar
    document.querySelectorAll('.nav-links li').forEach(li => {
        li.classList.toggle('active', li.dataset.view === viewName);
    });

    if (views[viewName]) {
        container.innerHTML = views[viewName]();
        VaultSystem.logActivity('all', 'System', 'Navegación', `Vista cargada: ${viewName}`);
    } else {
        container.innerHTML = `<div class="card"><h2>Módulo en Desarrollo</h2><p>El módulo <strong>${viewName}</strong> está siendo configurado por el departamento de ingeniería de Advance.</p></div>`;
    }
}

// Sidebar Clicks
document.querySelectorAll('.nav-links li').forEach(li => {
    li.addEventListener('click', () => renderView(li.dataset.view));
});

function showClientSelector() {
    let options = '<div onclick="selectClient(\'all\')" style="padding: 10px; cursor: pointer; border-bottom: 1px solid #eee;"><strong>--- Vista Global (Todos) ---</strong></div>';
    db.clients.forEach(c => {
        options += `<div onclick="selectClient('${c.id}')" style="padding: 10px; cursor: pointer; border-bottom: 1px solid #eee;">${c.name}</div>`;
    });
    Modal.open('Seleccionar Cliente', `<div style="display: flex; flex-direction: column;">${options}</div>`);
}

window.selectClient = (id) => {
    currentClientId = id;
    const client = db.clients.find(c => c.id === id);
    document.querySelector('#client-context span').innerText = client ? client.name : 'Global | Todas las operaciones';
    Modal.close();
    renderView('dashboard');
};

window.showNewTaskModal = () => {
    const clientOptions = db.clients.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
    const areaOptions = db.areas.map(a => `<option value="${a.id}">${a.name}</option>`).join('');

    const content = `
        <form id="new-task-form" onsubmit="saveNewTask(event)">
            <div class="field">
                <label>Título de la Tarea</label>
                <input type="text" id="task-title" required placeholder="Ej: Limpieza profunda Lobby">
            </div>
            <div class="field">
                <label>Cliente</label>
                <select id="task-client">${clientOptions}</select>
            </div>
            <div class="field">
                <label>Área</label>
                <select id="task-area">${areaOptions}</select>
            </div>
            <div class="field">
                <label>Horario</label>
                <input type="time" id="task-time" value="08:00">
            </div>
            <div style="margin-top: 20px; display: flex; gap: 10px;">
                <button type="submit" class="btn btn-primary">Guardar Tarea</button>
                <button type="button" class="btn" onclick="Modal.close()">Cancelar</button>
            </div>
        </form>
    `;
    Modal.open('Nueva Tarea Programada', content);
};

window.saveNewTask = (e) => {
    e.preventDefault();
    const newTask = {
        id: 't' + Date.now(),
        title: document.getElementById('task-title').value,
        clientId: document.getElementById('task-client').value,
        areaId: document.getElementById('task-area').value,
        time: document.getElementById('task-time').value,
        status: 'pending',
        date: new Date().toISOString().split('T')[0]
    };
    db.tasks.unshift(newTask);
    VaultSystem.logActivity(newTask.clientId, 'Admin', 'Nueva Tarea', `Creada: ${newTask.title}`);
    VaultSystem.save(db);
    Modal.close();
    renderView(currentView);
};

window.toggleTaskStatus = (taskId) => {
    const task = db.tasks.find(t => t.id === taskId);
    if (task) {
        task.status = task.status === 'completed' ? 'pending' : 'completed';
        VaultSystem.logActivity(task.clientId, 'Admin', 'Cambio Estado', `Tarea ${task.title} -> ${task.status}`);
        VaultSystem.save(db);
        renderView(currentView);
    }
};

window.showNewWorkerModal = () => {
    const clientOptions = db.clients.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
    const content = `
        <form onsubmit="saveNewWorker(event)">
            <div class="field">
                <label>Nombre Completo</label>
                <input type="text" id="worker-name" required>
            </div>
            <div class="field">
                <label>Asignar Cliente</label>
                <select id="worker-client">${clientOptions}</select>
            </div>
            <div class="field">
                <label>Teléfono</label>
                <input type="text" id="worker-phone" placeholder="+56 9 ...">
            </div>
            <div style="margin-top: 20px; display: flex; gap: 10px;">
                <button type="submit" class="btn btn-primary">Registrar</button>
                <button type="button" class="btn" onclick="Modal.close()">Cancelar</button>
            </div>
        </form>
    `;
    Modal.open('Registrar Nuevo Auxiliar', content);
};

window.saveNewWorker = (e) => {
    e.preventDefault();
    const newWorker = {
        id: 'u' + Date.now(),
        name: document.getElementById('worker-name').value,
        clientId: document.getElementById('worker-client').value,
        phone: document.getElementById('worker-phone').value,
        status: 'available',
        tasksCompleted: 0
    };
    db.auxiliaries.push(newWorker);
    VaultSystem.logActivity(newWorker.clientId, 'Admin', 'Nuevo Personal', `Registrado: ${newWorker.name}`);
    VaultSystem.save(db);
    Modal.close();
    renderView('worker_master');
};

window.showNewClientModal = () => {
    const content = `
        <form onsubmit="saveNewClient(event)">
            <div class="field">
                <label>Nombre Empresa</label>
                <input type="text" id="client-name" required>
            </div>
            <div class="field">
                <label>RUT</label>
                <input type="text" id="client-rut" placeholder="71.000.000-K">
            </div>
            <div class="field">
                <label>Dirección</label>
                <input type="text" id="client-address">
            </div>
            <div class="field">
                <label>Contacto Interlocutor</label>
                <input type="text" id="client-contact">
            </div>
            <div style="margin-top: 20px; display: flex; gap: 10px;">
                <button type="submit" class="btn btn-primary">Crear Cliente</button>
                <button type="button" class="btn" onclick="Modal.close()">Cancelar</button>
            </div>
        </form>
    `;
    Modal.open('Nuevo Cliente / Contrato', content);
};

window.saveNewClient = (e) => {
    e.preventDefault();
    const newClient = {
        id: 'c' + Date.now(),
        name: document.getElementById('client-name').value,
        rut: document.getElementById('client-rut').value,
        address: document.getElementById('client-address').value,
        contact: document.getElementById('client-contact').value
    };
    db.clients.push(newClient);
    VaultSystem.logActivity('all', 'Admin', 'Nuevo Cliente', `Creado: ${newClient.name}`);
    VaultSystem.save(db);
    Modal.close();
    renderView('clients');
};

// 8. SECURITY & BACKUP LOGIC
window.createManualBackup = () => {
    VaultSystem.takeSnapshot(db, 'Respaldo Manual (Usuario)');
    renderView('security');
    alert('Respaldo realizado con éxito.');
};

window.restoreSnapshot = (id) => {
    if (confirm('¿ESTÁS SEGURO? Esta acción reemplazará todos los datos actuales por la versión seleccionada.')) {
        const backups = JSON.parse(localStorage.getItem(VaultSystem.keys.backups) || '[]');
        const b = backups.find(item => item.id === id);
        if (b) {
            const restoredData = JSON.parse(b64DecodeUnicode(b.data));
            db = restoredData;
            VaultSystem.save(db);
            alert('Sistema restaurado correctamente. El portal Advance se reiniciará.');
            window.location.reload();
        }
    }
};

window.exportVault = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(db));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `advance_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
};

// 9. PHASE 4: INTELLIGENT CORE ENGINES
const IOT_Simulator = {
    start: () => {
        // Initialize occupancy telemetry
        db.areas.forEach(a => {
            if (!db.telemetry[a.id]) db.telemetry[a.id] = { occupancy: Math.floor(Math.random() * 20) };
        });

        setInterval(() => {
            // 1. Asset Health Degradation
            db.assets.forEach(a => {
                if (Math.random() > 0.9) {
                    a.healthScore = Math.max(0, a.healthScore - Math.floor(Math.random() * 2));
                    a.rul = Math.max(0, a.rul - 1);
                    if (a.healthScore < 50) a.criticality = 'Critical';
                }
            });

            // 2. Occupancy Traffic (Dynamic Clean Trigger)
            db.areas.forEach(a => {
                db.telemetry[a.id].occupancy += Math.floor(Math.random() * 5);

                // Trigger auto-cleaning if threshold exceeded
                if (db.telemetry[a.id].occupancy >= 50) {
                    const existingTask = db.tasks.find(t => t.areaId === a.id && t.status === 'pending');
                    if (!existingTask) {
                        const newTask = {
                            id: 'at' + Date.now(),
                            title: `Limpieza On-Demand: ${a.name}`,
                            clientId: a.clientId,
                            areaId: a.id,
                            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                            status: 'pending',
                            date: new Date().toISOString().split('T')[0],
                            type: 'prescriptive'
                        };
                        db.tasks.unshift(newTask);
                        VaultSystem.logActivity(a.clientId, 'AI-Orchestrator', 'Tarea Prescriptiva', `Umbral excedido en ${a.name}. Generando limpieza.`);
                    }
                }
            });

            // Save and refresh current view if needed
            VaultSystem.save(db);
            if (['predictive_maintenance', 'dynamic_clean_v2'].includes(currentView)) renderView(currentView);
        }, 8000);
    },
    triggerAnomaly: () => {
        const target = db.assets[Math.floor(Math.random() * db.assets.length)];
        target.healthScore = 35;
        target.criticality = 'Critical';
        target.rul = 5;
        VaultSystem.logActivity(target.clientId, 'AI-Engine', 'Anomalía Detectada', `Firma de vibración anómala en ${target.name}. RUL: 5 días.`);
        renderView('predictive_maintenance');
        alert(`¡ALERTA IA! Se ha detectado una anomalía crítica en ${target.name}. El sistema ha prescrito mantenimiento inmediato.`);
    },
    triggerIntrusionAlert: () => {
        VaultSystem.logActivity('all', 'Safety-Vision', 'Intrusión', 'Detección de persona en zona restringida - Sector Logístico.');
        renderView('safety_surveillance');
        alert('🚨 ALERTA DE SEGURIDAD: Persona detectada en zona restringida. Protocolo de bloqueo activado.');
    },
    simulateCloudSync: () => {
        VaultSystem.logActivity('all', 'Energy-AI', 'Sincronización', 'Datos meteorológicos actualizados. Ajustando consignas HVAC.');
        alert('Sincronización con central meteorológica exitosa. Optimizando HVAC para ola de calor entrante.');
        renderView('energy_management');
    }
};

window.viewAssetTelemetry = (assetId) => {
    const asset = db.assets.find(a => a.id === assetId);
    const mockTelemetry = Array.from({ length: 10 }, () => (Math.random() * 10 + 40).toFixed(1));
    const content = `
        <div style="margin-bottom: 20px;">
            <h4 style="color: var(--primary);">${asset.name}</h4>
            <p style="font-size: 0.85rem; color: var(--text-secondary);">${asset.location}</p>
        </div>
        <div class="card" style="background: #000; color: #00ff00; font-family: monospace; padding: 15px; font-size: 0.8rem; border-radius: 0;">
            <div>> ANALYZING VIBRATION SIGNATURE...</div>
            <div>> FFT TRANSFORMATION COMPLETE.</div>
            <div>> FREQUENCY PEAK DETECTED AT 42.5Hz.</div>
            <div style="margin-top: 10px;">HISTORIAL RECIENTE (Temp °C):</div>
            <div>[${mockTelemetry.join(' | ')}]</div>
            <div style="margin-top: 10px; color: #ffcc00;">[IA_DIAGNOSIS]: Desgaste incipiente en rodamiento B-7.</div>
            <div style="color: #ffcc00;">[RUL_PREDICTION]: ${asset.rul} días hábiles.</div>
        </div>
        <div style="margin-top: 20px; display: flex; gap: 10px;">
            <button class="btn btn-primary" style="width: 100%;" onclick="Modal.close()">Cerrar Monitor</button>
        </div>
    `;
    Modal.open('Telemetría en Tiempo Real (Live Link)', content);
};

// 7. UTILS
const Modal = {
    open: (title, content) => {
        document.getElementById('modal-title').innerText = title;
        document.getElementById('modal-content').innerHTML = content;
        document.getElementById('modal-container').classList.remove('hidden');
    },
    close: () => {
        document.getElementById('modal-container').classList.add('hidden');
    }
};

document.querySelector('.close-modal').onclick = Modal.close;

function startClock() {
    setInterval(() => {
        const now = new Date();
        document.getElementById('current-time').innerText = now.toLocaleTimeString();
        document.getElementById('current-date').innerText = now.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    }, 1000);
}

window.logout = Auth.logout;

// 10. GLOBAL NAVIGATION LISTENER (Phase 4 Delegation)
document.addEventListener('click', (e) => {
    const navItem = e.target.closest('.nav-links li');
    if (navItem && navItem.dataset.view) {
        renderView(navItem.dataset.view);
    }
});

// Auto-init for testing (can be bypassed by Auth)
if (Auth.isLoggedIn()) {
    initApp();
}
