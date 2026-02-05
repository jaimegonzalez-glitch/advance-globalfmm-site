// --- MALLCLEAN PRO CORE LOGIC ---

// 1. Data Models & Initial Mock Data
const INITIAL_DATA = {
    areas: [
        { id: 'a1', name: 'Plaza de Comidas', level: 'Piso 2', status: 'clean', lastCleaned: '14:30' },
        { id: 'a2', name: 'Baños Principales', level: 'Piso 1', status: 'dirty', lastCleaned: '10:15' },
        { id: 'a3', name: 'Entrada Principal', level: 'PB', status: 'clean', lastCleaned: '16:00' },
        { id: 'a4', name: 'Cine', level: 'Piso 3', status: 'needs-attention', lastCleaned: '13:00' },
        { id: 'a5', name: 'Zona de Juegos', level: 'Piso 2', status: 'clean', lastCleaned: '11:00' },
        { id: 'a6', name: 'Estacionamiento E1', level: 'Sótano 1', status: 'dirty', lastCleaned: '09:00' },
        { id: 'a7', name: 'Pasillo Norte', level: 'Piso 1', status: 'clean', lastCleaned: '15:20' }
    ],
    auxiliaries: [
        { id: 'u1', name: 'Juan Pérez', status: 'available', tasksCompleted: 15, phone: '+57 301 001', address: 'Medellín', dni: 'D-001', birthDate: '1990-01-01', startDate: '2023-01-01', emergencyName: 'Ana', emergencyPhone: '555-1' },
        { id: 'u2', name: 'María Garcia', status: 'busy', tasksCompleted: 22, phone: '+57 301 002', address: 'Envigado', dni: 'D-002', birthDate: '1992-02-02', startDate: '2023-02-02', emergencyName: 'Luis', emergencyPhone: '555-2' },
        { id: 'u3', name: 'Carlos Ruíz', status: 'available', tasksCompleted: 10, phone: '+57 301 003', address: 'Bello', dni: 'D-003', birthDate: '1988-03-03', startDate: '2023-03-03', emergencyName: 'Rosa', emergencyPhone: '555-3' },
        { id: 'u4', name: 'Ana Martínez', status: 'available', tasksCompleted: 18, phone: '+57 301 004', address: 'Sabaneta', dni: 'D-004', birthDate: '1993-04-04', startDate: '2023-04-04', emergencyName: 'José', emergencyPhone: '555-4' },
        { id: 'u5', name: 'Luis Rodríguez', status: 'busy', tasksCompleted: 5, phone: '+57 301 005', address: 'Itagüí', dni: 'D-005', birthDate: '1991-05-05', startDate: '2023-05-05', emergencyName: 'Marta', emergencyPhone: '555-5' },
        { id: 'u6', name: 'Elena Gómez', status: 'available', tasksCompleted: 30, phone: '+57 301 006', address: 'Caldas', dni: 'D-006', birthDate: '1985-06-06', startDate: '2022-06-06', emergencyName: 'Pedro', emergencyPhone: '555-6' },
        { id: 'u7', name: 'Jorge Castro', status: 'available', tasksCompleted: 12, phone: '+57 301 007', address: 'La Estrella', dni: 'D-007', birthDate: '1994-07-07', startDate: '2023-07-07', emergencyName: 'Sara', emergencyPhone: '555-7' },
        { id: 'u8', name: 'Sofía López', status: 'busy', tasksCompleted: 7, phone: '+57 301 008', address: 'Copacabana', dni: 'D-008', birthDate: '1995-08-08', startDate: '2023-08-08', emergencyName: 'Hugo', emergencyPhone: '555-8' },
        { id: 'u9', name: 'Ricardo Serna', status: 'available', tasksCompleted: 14, phone: '+57 301 009', address: 'Barbosa', dni: 'D-009', birthDate: '1989-09-09', startDate: '2023-09-09', emergencyName: 'Rita', emergencyPhone: '555-9' },
        { id: 'u10', name: 'Patricia Velez', status: 'available', tasksCompleted: 20, phone: '+57 301 010', address: 'Medellín', dni: 'D-010', birthDate: '1990-10-10', startDate: '2023-10-10', emergencyName: 'Oscar', emergencyPhone: '555-10' }
    ],
    tasks: [
        { id: 't1', title: 'Limpiar derrame gaseosa', areaId: 'a1', auxId: 'u2', status: 'in-progress', priority: 'high', time: '16:30', createdAt: '2026-02-05 16:00' },
        { id: 't2', title: 'Reposición jabón', areaId: 'a2', auxId: null, status: 'pending', priority: 'medium', time: '16:45', createdAt: '2026-02-05 16:15' },
        { id: 't3', title: 'Aspirar pasillos', areaId: 'a7', auxId: 'u5', status: 'in-progress', priority: 'low', time: '10:00', createdAt: '2026-02-05 09:30' },
        { id: 't4', title: 'Limpiar vidrios entrada', areaId: 'a3', auxId: 'u1', status: 'completed', priority: 'medium', time: '08:00', createdAt: '2026-02-05 07:45', completedAt: '2026-02-05 08:30' },
        { id: 't5', title: 'Desinfectar juegos', areaId: 'a5', auxId: 'u4', status: 'completed', priority: 'high', time: '11:00', createdAt: '2026-02-05 10:30', completedAt: '2026-02-05 11:45' },
        { id: 't6', title: 'Revisión baños P1', areaId: 'a2', auxId: 'u8', status: 'in-progress', priority: 'high', time: '17:00', createdAt: '2026-02-05 16:50' },
        { id: 't7', title: 'Barrido estacionamiento', areaId: 'a6', auxId: null, status: 'pending', priority: 'low', time: '18:00', createdAt: '2026-02-05 17:30' },
        { id: 't8', title: 'Limpieza profunda Cine', areaId: 'a4', auxId: null, status: 'pending', priority: 'medium', time: '22:00', createdAt: '2026-02-05 21:00' },
        { id: 't9', title: 'Recogida de basura', areaId: 'a1', auxId: 'u6', status: 'completed', priority: 'medium', time: '14:00', createdAt: '2026-02-05 13:30', completedAt: '2026-02-05 14:15' },
        { id: 't10', title: 'Mantenimiento preventivo', areaId: 'a3', auxId: 'u9', status: 'pending', priority: 'low', time: '09:00', createdAt: '2026-02-05 08:30' },
        { id: 't11', title: 'Limpieza de escaleras', areaId: 'a7', auxId: 'u10', status: 'completed', priority: 'medium', time: '15:00', createdAt: '2026-02-05 14:30', completedAt: '2026-02-05 15:45' },
        { id: 't12', title: 'Chequeo inventario P1', areaId: 'a2', auxId: 'u3', status: 'completed', priority: 'low', time: '10:00', createdAt: '2026-02-05 09:45', completedAt: '2026-02-05 10:15' },
        { id: 't13', title: 'Limpiar mesas food court', areaId: 'a1', auxId: 'u7', status: 'completed', priority: 'high', time: '13:00', createdAt: '2026-02-05 12:45', completedAt: '2026-02-05 13:20' },
        { id: 't14', title: 'Pulido de pisos lobby', areaId: 'a3', auxId: null, status: 'pending', priority: 'medium', time: '23:30', createdAt: '2026-02-05 23:00' },
        { id: 't15', title: 'Sanitización de baños P2', areaId: 'a2', auxId: 'u4', status: 'completed', priority: 'high', time: '12:00', createdAt: '2026-02-05 11:30', completedAt: '2026-02-05 12:25' }
    ],
    resources: [
        { id: 'r1', name: 'Detergente Multiusos', stock: 15, unit: 'L' },
        { id: 'r2', name: 'Papel Higiénico', stock: 120, unit: 'Rollos' },
        { id: 'r3', name: 'Desinfectante', stock: 5, unit: 'L' }
    ],
    activities: [
        { id: 'ev1', timestamp: '2026-02-05 08:00', user: 'Admin', action: 'Sistema Iniciado', details: 'Base de datos cargada' },
        { id: 'ev2', timestamp: '2026-02-05 08:30', user: 'Admin', action: 'Asignación Tarea', details: 'Tarea t4 asignada a u1' },
        { id: 'ev3', timestamp: '2026-02-05 09:00', user: 'Juan Pérez', action: 'Comenzó Tarea', details: 'Limpiar vidrios entrada' },
        { id: 'ev4', timestamp: '2026-02-05 10:30', user: 'Ana Martínez', action: 'Finalizó Tarea', details: 'Desinfectar juegos' }
    ]
};

// 2. Storage Helper
const Storage = {
    save: (data) => localStorage.setItem('dynamic_clean_db', JSON.stringify(data)),
    load: () => {
        // Force the robust dataset for testing as requested by user
        Storage.save(INITIAL_DATA);
        return INITIAL_DATA;
    },
    logActivity: (user, action, details) => {
        const now = new Date();
        const timestamp = now.toLocaleDateString() + ' ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        db.activities.unshift({
            id: 'ev' + Date.now(),
            timestamp,
            user,
            action,
            details
        });
        Storage.save(db);
    }
};

let db = Storage.load();

// 3. View Management
const views = {
    dashboard: () => {
        const dirtyCount = db.areas.filter(a => a.status !== 'clean').length;
        const pendingTasks = db.tasks.filter(t => t.status === 'pending').length;

        return `
            <section class="stats-grid">
                <div class="card stat-card" style="border-left: 4px solid var(--primary)">
                    <span class="label">Eficiencia Operativa</span>
                    <span class="value">94.2%</span>
                </div>
                <div class="card stat-card" style="border-left: 4px solid var(--accent)">
                    <span class="label">Áreas en Alerta</span>
                    <span class="value">${dirtyCount}</span>
                </div>
                <div class="card stat-card" style="border-left: 4px solid var(--primary-light)">
                    <span class="label">Tareas hoy</span>
                    <span class="value">${db.tasks.length}</span>
                </div>
            </section>
            
            <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 20px; margin-bottom: 25px;">
                <div class="card" style="min-height: 350px;">
                    <h3 style="margin-bottom: 20px">Tendencia de Limpieza (Semanal)</h3>
                    <canvas id="performanceChart" style="width: 100%; height: 250px;"></canvas>
                </div>
                <div class="card" style="display: flex; flex-direction: column; justify-content: space-between;">
                    <h3>Sostenibilidad</h3>
                    <div style="text-align: center; margin: 20px 0;">
                        <span style="font-size: 3rem; font-weight: 700; color: var(--primary)">85%</span>
                        <p style="color: var(--text-muted)">Uso de productos Eco</p>
                    </div>
                    <div style="background: rgba(16,185,129,0.1); padding: 15px; border-radius: var(--radius-sm);">
                        <p style="font-size: 0.8rem; margin-bottom: 5px;">Ahorro de Agua Mensual</p>
                        <div style="height: 8px; background: rgba(255,255,255,0.1); border-radius: 4px;">
                            <div style="width: 72%; height: 100%; background: var(--primary); border-radius: 4px;"></div>
                        </div>
                    </div>
                </div>
            </div>


            <section class="recent-tasks">
                <h2 style="margin-bottom: 20px">Estado de Zonas Críticas</h2>
                <div class="grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">
                    ${db.areas.slice(0, 4).map(area => `
                        <div class="card" style="display: flex; justify-content: space-between; align-items: center">
                            <div>
                                <h3 style="font-size: 1.1rem">${area.name}</h3>
                                <p style="font-size: 0.8rem; color: var(--text-muted)">${area.level} • Última vez: ${area.lastCleaned}</p>
                            </div>
                            <span class="status-pill status-${area.status}" style="
                                padding: 6px 12px; 
                                border-radius: 20px; 
                                font-size: 0.75rem;
                                text-transform: uppercase;
                                font-weight: 600;
                                background: ${area.status === 'clean' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)'};
                                color: ${area.status === 'clean' ? '#10b981' : '#ef4444'};
                            ">
                                ${area.status === 'clean' ? 'Limpio' : 'Pendiente'}
                            </span>
                        </div>
                    `).join('')}
                </div>
            </section>
        `;
    },
    tasks: () => {
        return `
            <div class="card">
                <table style="width: 100%; border-collapse: collapse; text-align: left;">
                    <thead style="border-bottom: 1px solid var(--border)">
                        <tr>
                            <th style="padding: 15px">Tarea</th>
                            <th style="padding: 15px">Área</th>
                            <th style="padding: 15px">Auxiliar</th>
                            <th style="padding: 15px">Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${db.tasks.map(task => {
            const area = db.areas.find(a => a.id === task.areaId);
            const aux = db.auxiliaries.find(u => u.id === task.auxId);
            return `
                                <tr style="border-bottom: 1px solid var(--border)">
                                    <td style="padding: 15px">
                                        ${task.title}
                                        ${task.photo ? `<button class="btn" style="padding: 2px 8px; font-size: 0.7rem; margin-top: 5px; border: 1px solid var(--primary); color: var(--primary-light)" onclick="openPhotoModal('${task.id}')">Ver Foto Evidencia</button>` : ''}
                                    </td>
                                    <td style="padding: 15px">${area ? area.name : 'N/A'}</td>
                                    <td style="padding: 15px">${aux ? aux.name : '<span style="color: var(--accent)">Sin asignar</span>'}</td>
                                    <td style="padding: 15px">
                                        <span class="status-pill" style="font-size: 0.7rem; padding: 4px 8px; border-radius: 10px; background: ${task.status === 'completed' ? 'rgba(16,185,129,0.1)' : 'rgba(245,158,11,0.1)'}; color: ${task.status === 'completed' ? 'var(--secondary)' : 'var(--accent)'}">
                                            ${task.status}
                                        </span>
                                    </td>
                                </tr>
                            `;
        }).join('')}
                    </tbody>
                </table>
            </div>
        `;
    },
    areas: () => {
        return `
            <div class="card">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                    <h3>Listado de Áreas</h3>
                    <button class="btn btn-primary" onclick="showNewAreaModal()">Añadir Área</button>
                </div>
                <div class="grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 15px;">
                    ${db.areas.map(area => `
                        <div style="padding: 15px; border: 1px solid var(--border); border-radius: var(--radius-md); background: rgba(255,255,255,0.02)">
                            <h4 style="margin-bottom: 5px">${area.name}</h4>
                            <p style="font-size: 0.8rem; color: var(--text-muted)">${area.level} • Estado: <span style="color: ${area.status === 'clean' ? 'var(--secondary)' : 'var(--danger)'}">${area.status}</span></p>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    },
    auxiliaries: () => {
        return `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px;">
                <h3 style="margin: 0">Personal de Limpieza</h3>
                <button class="btn btn-primary" onclick="showNewAuxiliaryModal()">
                    <ion-icon name="person-add-outline"></ion-icon>
                    Nuevo Auxiliar
                </button>
            </div>
            <div class="stats-grid">
                ${db.auxiliaries.map(aux => `
                    <div class="card stat-card">
                        <div style="display: flex; align-items: center; gap: 15px;">
                            <div class="avatar" style="width: 50px; height: 50px; background: var(--glass-bg); display: flex; align-items: center; justify-content: center; border-radius: 50%; border: 1px solid var(--border)">
                                <ion-icon name="person-outline"></ion-icon>
                            </div>
                            <div>
                                <h4 style="margin: 0">${aux.name}</h4>
                                <p style="font-size: 0.75rem; color: var(--text-muted)">${aux.status === 'available' ? '🟢 Disponible' : '🟠 Ocupado'}</p>
                            </div>
                        </div>
                        <div style="margin-top: 15px; display: flex; justify-content: space-between; align-items: center;">
                            <p style="font-size: 0.85rem">Tareas: <strong>${aux.tasksCompleted}</strong></p>
                            <button class="btn" style="padding: 4px 10px; font-size: 0.75rem; border: 1px solid var(--border)" onclick="viewWorkerProfile('${aux.id}')">Ver Ficha</button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    },
    resources: () => {
        return `
            <div class="card">
                <h3>Inventario de Suministros</h3>
                <div style="margin-top: 20px">
                    ${db.resources.map(res => `
                        <div style="display: flex; justify-content: space-between; align-items: center; padding: 15px 0; border-bottom: 1px solid var(--border)">
                            <span>${res.name}</span>
                            <div style="display: flex; align-items: center; gap: 20px">
                                <span style="font-weight: 600; color: ${res.stock < 10 ? 'var(--danger)' : 'var(--text-main)'}">${res.stock} ${res.unit}</span>
                                <button class="btn" style="padding: 5px 10px; font-size: 0.8rem; border: 1px solid var(--border)">Pedir más</button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    },
    auxiliary_portal: () => {
        // Simple simulation: always Juán Pérez for now
        const currentAux = db.auxiliaries[0];
        const myTasks = db.tasks.filter(t => t.auxId === currentAux.id);

        return `
            <div class="mobile-portal">
                <div class="card" style="margin-bottom: 20px; text-align: center;">
                    <div class="avatar" style="width: 60px; height: 60px; margin: 0 auto 10px; background: var(--primary); display: flex; align-items: center; justify-content: center; border-radius: 50%; border: 3px solid var(--border)">
                        ${currentAux.name.substring(0, 2).toUpperCase()}
                    </div>
                    <h2>Hola, ${currentAux.name}</h2>
                    <p style="color: var(--text-muted)">Hoy has completado ${currentAux.tasksCompleted} tareas</p>
                </div>
                
                <h3 style="margin-bottom: 15px">Mis Tareas Asignadas</h3>
                <div style="display: flex; flex-direction: column; gap: 15px;">
                    ${myTasks.length === 0 ? '<p>No tienes tareas asignadas.</p>' : myTasks.map(task => {
            const area = db.areas.find(a => a.id === task.areaId);
            return `
                            <div class="card" style="border-left: 4px solid ${task.status === 'completed' ? 'var(--secondary)' : 'var(--accent)'}">
                                <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                                    <div>
                                        <h4 style="margin-bottom: 5px">${task.title}</h4>
                                        <p style="font-size: 0.8rem; color: var(--text-muted)">${area ? area.name : 'Mall'} • ${task.time}</p>
                                    </div>
                                    <span style="font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase;">${task.status}</span>
                                </div>
                                ${task.status !== 'completed' ? `
                                    <div style="margin-top: 15px; display: flex; gap: 10px;">
                                        <button class="btn btn-primary" style="flex: 1; justify-content: center; font-size: 0.85rem;" onclick="updateTaskStatus('${task.id}', '${task.status === 'pending' ? 'in-progress' : 'completed'}')">
                                            ${task.status === 'pending' ? 'Empezar' : 'Terminar'}
                                        </button>
                                        <button class="btn" style="border: 1px solid var(--border); font-size: 0.85rem;">Reportar Problema</button>
                                    </div>
                                ` : ''}
                            </div>
                        `;
        }).join('')}
                </div>
            </div>
        `;
    },
    worker_master: () => {
        return `
            <div class="card" style="overflow-x: auto;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                    <h3>Base de Datos Maestra de Personal</h3>
                    <button class="btn" style="border: 1px solid var(--secondary); color: var(--secondary)" onclick="exportWorkersToCSV()">
                        <ion-icon name="download-outline"></ion-icon>
                        Exportar a Excel (CSV)
                    </button>
                </div>
                <table style="width: 100%; border-collapse: collapse; min-width: 1300px; font-size: 0.85rem;">
                    <thead style="background: rgba(255,255,255,0.05); border-bottom: 1px solid var(--border)">
                        <tr>
                            <th style="padding: 12px; text-align: left;">Nombre</th>
                            <th style="padding: 12px; text-align: left;">Cédula</th>
                            <th style="padding: 12px; text-align: left;">Teléfono</th>
                            <th style="padding: 12px; text-align: left;">Dirección</th>
                            <th style="padding: 12px; text-align: left;">F. Nacimiento</th>
                            <th style="padding: 12px; text-align: left;">F. Ingreso</th>
                            <th style="padding: 12px; text-align: left;">Emergencia (Nombre)</th>
                            <th style="padding: 12px; text-align: left;">Emergencia (Tel)</th>
                            <th style="padding: 12px; text-align: center;">Tareas</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${db.auxiliaries.map(aux => `
                            <tr style="border-bottom: 1px solid var(--border); transition: background 0.2s;">
                                <td style="padding: 12px; font-weight: 600;">${aux.name}</td>
                                <td style="padding: 12px;">${aux.dni || 'N/A'}</td>
                                <td style="padding: 12px;">${aux.phone || 'N/A'}</td>
                                <td style="padding: 12px;">${aux.address || 'N/A'}</td>
                                <td style="padding: 12px;">${aux.birthDate || 'N/A'}</td>
                                <td style="padding: 12px;">${aux.startDate || 'N/A'}</td>
                                <td style="padding: 12px;">${aux.emergencyName || 'N/A'}</td>
                                <td style="padding: 12px;">${aux.emergencyPhone || 'N/A'}</td>
                                <td style="padding: 12px; text-align: center;">${aux.tasksCompleted}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    },
    audit_log: () => {
        return `
            <div class="card" style="overflow-x: auto;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                    <h3>Bitácora de Movimientos y Auditoría</h3>
                    <button class="btn" style="border: 1px solid var(--primary); color: var(--primary)" onclick="exportAuditToCSV()">
                        <ion-icon name="download-outline"></ion-icon>
                        Descargar Historial Excel
                    </button>
                </div>
                <table style="width: 100%; border-collapse: collapse; min-width: 900px; font-size: 0.85rem;">
                    <thead style="background: rgba(255,255,255,0.05); border-bottom: 1px solid var(--border)">
                        <tr>
                            <th style="padding: 12px; text-align: left;">Fecha y Hora</th>
                            <th style="padding: 12px; text-align: left;">Usuario</th>
                            <th style="padding: 12px; text-align: left;">Acción</th>
                            <th style="padding: 12px; text-align: left;">Detalles</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${(db.activities || []).map(act => `
                            <tr style="border-bottom: 1px solid var(--border)">
                                <td style="padding: 12px; color: var(--primary-light); font-family: monospace;">${act.timestamp}</td>
                                <td style="padding: 12px; font-weight: 600;">${act.user}</td>
                                <td style="padding: 12px;"><span style="background: rgba(255,255,255,0.05); padding: 2px 6px; border-radius: 4px;">${act.action}</span></td>
                                <td style="padding: 12px; font-size: 0.8rem; color: var(--text-muted);">${act.details}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }
};

window.exportAuditToCSV = () => {
    const headers = ["Fecha y Hora", "Usuario/Responsable", "Accion Realizada", "Detalles Tecnicos"];
    const rows = db.activities.map(act => [act.timestamp, act.user, act.action, act.details]);

    let csvContent = "\uFEFF";
    csvContent += headers.join(",") + "\n";
    rows.forEach(row => { csvContent += row.join(",") + "\n"; });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "bitacora_dinamic_clean_" + new Date().toLocaleDateString() + ".csv";
    link.click();
};

window.exportWorkersToCSV = () => {
    const headers = ["Nombre", "Cedula", "Telefono", "Direccion", "Fecha Nacimiento", "Fecha Ingreso", "Emergencia Nombre", "Emergencia Telefono", "Tareas Completadas"];
    const rows = db.auxiliaries.map(aux => [
        aux.name,
        aux.dni || '',
        aux.phone || '',
        aux.address || '',
        aux.birthDate || '',
        aux.startDate || '',
        aux.emergencyName || '',
        aux.emergencyPhone || '',
        aux.tasksCompleted
    ]);

    let csvContent = "\uFEFF"; // Byte Order Mark for Excel
    csvContent += headers.join(",") + "\n";
    rows.forEach(row => {
        csvContent += row.join(",") + "\n";
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "reporte_personal_dynamic_clean.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

window.updateTaskStatus = (taskId, newStatus, photoData = null) => {
    const task = db.tasks.find(t => t.id === taskId);
    if (task) {
        const aux = db.auxiliaries.find(u => u.id === task.auxId) || { name: 'Auxiliar' };
        const now = new Date();
        const timestamp = now.toLocaleDateString() + ' ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        if (newStatus === 'completed' && !photoData) {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.onchange = (e) => {
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.onload = (event) => {
                    updateTaskStatus(taskId, 'completed', event.target.result);
                };
                reader.readAsDataURL(file);
            };
            input.click();
            return;
        }

        task.status = newStatus;
        if (photoData) task.photo = photoData;

        if (newStatus === 'in-progress') {
            task.startedAt = timestamp;
            Storage.logActivity(aux.name, 'Comenzó Tarea', `Tarea: ${task.title}`);
        }

        if (newStatus === 'completed') {
            task.completedAt = timestamp;
            if (aux.id) aux.tasksCompleted++;

            const area = db.areas.find(a => a.id === task.areaId);
            if (area) {
                area.status = 'clean';
                area.lastCleaned = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            }
            Storage.logActivity(aux.name, 'Finalizó Tarea', `Tarea: ${task.title} (Con Evidencia)`);
        }

        Storage.save(db);
        renderView('auxiliary_portal');
    }
};

window.openPhotoModal = (taskId) => {
    const task = db.tasks.find(t => t.id === taskId);
    if (task && task.photo) {
        Modal.open('Evidencia de Limpieza', `
            <div style="text-align: center;">
                <p style="margin-bottom: 15px; color: var(--text-muted)">Tarea: ${task.title}</p>
                <img src="${task.photo}" style="width: 100%; border-radius: var(--radius-md); box-shadow: var(--shadow-premium);">
            </div>
        `);
    }
};

// --- MODAL LOGIC ---
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

function showNewTaskModal() {
    const areasOptions = db.areas.map(a => `<option value="${a.id}">${a.name}</option>`).join('');
    const auxOptions = db.auxiliaries.map(u => `<option value="${u.id}">${u.name}</option>`).join('');

    const content = `
        <form id="new-task-form" style="display: flex; flex-direction: column; gap: 15px;">
            <div class="form-group">
                <label style="display: block; margin-bottom: 5px; font-size: 0.9rem">Título de Tarea</label>
                <input type="text" id="task-title" required style="width: 100%; background: var(--bg-dark); border: 1px solid var(--border); color: white; padding: 10px; border-radius: var(--radius-sm)">
            </div>
            <div class="form-group">
                <label style="display: block; margin-bottom: 5px; font-size: 0.9rem">Área</label>
                <select id="task-area" style="width: 100%; background: var(--bg-dark); border: 1px solid var(--border); color: white; padding: 10px; border-radius: var(--radius-sm)">
                    ${areasOptions}
                </select>
            </div>
            <div class="form-group">
                <label style="display: block; margin-bottom: 5px; font-size: 0.9rem">Asignar Auxiliar</label>
                <select id="task-aux" style="width: 100%; background: var(--bg-dark); border: 1px solid var(--border); color: white; padding: 10px; border-radius: var(--radius-sm)">
                    <option value="">-- Sin asignar --</option>
                    ${auxOptions}
                </select>
            </div>
            <button type="submit" class="btn btn-primary" style="margin-top: 10px; justify-content: center">Crear Tarea</button>
        </form>
    `;

    Modal.open('Nueva Tarea de Limpieza', content);

    document.getElementById('new-task-form').onsubmit = (e) => {
        e.preventDefault();
        const newTask = {
            id: 't' + Date.now(),
            title: document.getElementById('task-title').value,
            areaId: document.getElementById('task-area').value,
            auxId: document.getElementById('task-aux').value || null,
            status: 'pending',
            priority: 'medium',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        db.tasks.push(newTask);
        Storage.save(db);
        Storage.logActivity('Admin', 'Asignación de Tarea', `Tarea: ${newTask.title}`);
        Modal.close();
        renderView('tasks');
    };
}

window.showNewAreaModal = () => {
    const content = `
        <form id="new-area-form" style="display: flex; flex-direction: column; gap: 15px;">
            <div class="form-group">
                <label style="display: block; font-size: 0.9rem; margin-bottom: 5px">Nombre de la Zona/Área</label>
                <input type="text" id="area-name" required placeholder="Ej: Pasillo Norte" style="width: 100%; background: var(--bg-dark); border: 1px solid var(--border); color: white; padding: 10px; border-radius: var(--radius-sm)">
            </div>
            <div class="form-group">
                <label style="display: block; font-size: 0.9rem; margin-bottom: 5px">Nivel/Ubicación</label>
                <input type="text" id="area-level" required placeholder="Ej: Piso 1" style="width: 100%; background: var(--bg-dark); border: 1px solid var(--border); color: white; padding: 10px; border-radius: var(--radius-sm)">
            </div>
            <button type="submit" class="btn btn-primary" style="margin-top: 10px; justify-content: center">Crear Área</button>
        </form>
    `;

    Modal.open('Registrar Nueva Zona de Limpieza', content);

    document.getElementById('new-area-form').onsubmit = (e) => {
        e.preventDefault();
        const newArea = {
            id: 'a' + Date.now(),
            name: document.getElementById('area-name').value,
            level: document.getElementById('area-level').value,
            status: 'clean',
            lastCleaned: '--:--'
        };

        db.areas.push(newArea);
        Storage.save(db);
        Storage.logActivity('Admin', 'Creación de Área', `Nueva zona: ${newArea.name} (${newArea.level})`);
        Modal.close();
        renderView('areas');
    };
};

window.showNewAuxiliaryModal = () => {
    const content = `
        <form id="new-aux-form" style="display: flex; flex-direction: column; gap: 12px;">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                <div class="form-group">
                    <label style="display: block; font-size: 0.8rem; margin-bottom: 4px">Nombre Completo</label>
                    <input type="text" id="aux-name" required style="width: 100%; background: var(--bg-dark); border: 1px solid var(--border); color: white; padding: 8px; border-radius: var(--radius-sm)">
                </div>
                <div class="form-group">
                    <label style="display: block; font-size: 0.8rem; margin-bottom: 4px">Cédula/ID</label>
                    <input type="text" id="aux-dni" required style="width: 100%; background: var(--bg-dark); border: 1px solid var(--border); color: white; padding: 8px; border-radius: var(--radius-sm)">
                </div>
            </div>
            <div class="form-group">
                <label style="display: block; font-size: 0.8rem; margin-bottom: 4px">Dirección de Residencia</label>
                <input type="text" id="aux-address" required style="width: 100%; background: var(--bg-dark); border: 1px solid var(--border); color: white; padding: 8px; border-radius: var(--radius-sm)">
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                <div class="form-group">
                    <label style="display: block; font-size: 0.8rem; margin-bottom: 4px">Teléfono Contacto</label>
                    <input type="tel" id="aux-phone" required style="width: 100%; background: var(--bg-dark); border: 1px solid var(--border); color: white; padding: 8px; border-radius: var(--radius-sm)">
                </div>
                <div class="form-group">
                    <label style="display: block; font-size: 0.8rem; margin-bottom: 4px">Fecha Nacimiento</label>
                    <input type="date" id="aux-birth" required style="width: 100%; background: var(--bg-dark); border: 1px solid var(--border); color: white; padding: 8px; border-radius: var(--radius-sm)">
                </div>
            </div>
            <hr style="border: none; border-top: 1px solid var(--border); margin: 5px 0;">
            <p style="font-size: 0.85rem; font-weight: 600;">Contacto de Emergencia</p>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                <div class="form-group">
                    <label style="display: block; font-size: 0.8rem; margin-bottom: 4px">Nombre Contacto</label>
                    <input type="text" id="aux-ename" required style="width: 100%; background: var(--bg-dark); border: 1px solid var(--border); color: white; padding: 8px; border-radius: var(--radius-sm)">
                </div>
                <div class="form-group">
                    <label style="display: block; font-size: 0.8rem; margin-bottom: 4px">Teléfono Emergencia</label>
                    <input type="tel" id="aux-ephone" required style="width: 100%; background: var(--bg-dark); border: 1px solid var(--border); color: white; padding: 8px; border-radius: var(--radius-sm)">
                </div>
            </div>
            <button type="submit" class="btn btn-primary" style="margin-top: 10px; justify-content: center">Registrar Auxiliar</button>
        </form>
    `;

    Modal.open('Ficha de Contratación Nuevo Auxiliar', content);

    document.getElementById('new-aux-form').onsubmit = (e) => {
        e.preventDefault();
        const newAux = {
            id: 'u' + Date.now(),
            name: document.getElementById('aux-name').value,
            dni: document.getElementById('aux-dni').value,
            address: document.getElementById('aux-address').value,
            phone: document.getElementById('aux-phone').value,
            birthDate: document.getElementById('aux-birth').value,
            emergencyName: document.getElementById('aux-ename').value,
            emergencyPhone: document.getElementById('aux-ephone').value,
            startDate: new Date().toISOString().split('T')[0],
            status: 'available',
            tasksCompleted: 0
        };

        db.auxiliaries.push(newAux);
        Storage.save(db);
        Storage.logActivity('Admin', 'Registro de Personal', `Nuevo auxiliar: ${newAux.name} (DNI: ${newAux.dni})`);
        Modal.close();
        renderView('auxiliaries');
    };
};

window.viewWorkerProfile = (auxId) => {
    const aux = db.auxiliaries.find(u => u.id === auxId);
    if (aux) {
        Modal.open(`Ficha del Trabajador: ${aux.name}`, `
            <div style="display: flex; flex-direction: column; gap: 15px;">
                <div style="display: flex; align-items: center; gap: 20px; margin-bottom: 10px;">
                    <div class="avatar" style="width: 70px; height: 70px; font-size: 1.5rem;">${aux.name.substring(0, 2).toUpperCase()}</div>
                    <div>
                        <h3 style="margin: 0">${aux.name}</h3>
                        <p style="color: var(--secondary)">Ingresó el: ${aux.startDate}</p>
                    </div>
                </div>
                
                <div class="card" style="background: rgba(0,0,0,0.2); padding: 15px;">
                    <h4 style="margin-bottom: 10px; border-bottom: 1px solid var(--border)">Datos Personales</h4>
                    <p><strong>Cédula:</strong> ${aux.dni || 'N/A'}</p>
                    <p><strong>Teléfono:</strong> ${aux.phone}</p>
                    <p><strong>Dirección:</strong> ${aux.address}</p>
                    <p><strong>Fecha Nacimiento:</strong> ${aux.birthDate}</p>
                </div>

                <div class="card" style="background: rgba(0,0,0,0.2); padding: 15px;">
                    <h4 style="margin-bottom: 10px; border-bottom: 1px solid var(--border)">Contacto de Emergencia</h4>
                    <p><strong>Nombre:</strong> ${aux.emergencyName}</p>
                    <p><strong>Teléfono:</strong> ${aux.emergencyPhone}</p>
                </div>

                <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px;">
                    <span>Total Tareas Completadas:</span>
                    <span style="font-size: 1.2rem; font-weight: 700; color: var(--primary-light)">${aux.tasksCompleted}</span>
                </div>
            </div>
        `);
    }
};

// 4. Controller
function renderView(viewName) {
    const container = document.getElementById('view-container');
    const title = document.getElementById('view-title');

    if (views[viewName]) {
        container.innerHTML = views[viewName]();

        const titleMap = {
            'worker_master': 'Base de Datos de Personal',
            'audit_log': 'Bitácora de Movimientos',
            'auxiliary_portal': 'Mi Portal de Trabajo',
            'dashboard': 'Panel de Control'
        };

        title.innerText = titleMap[viewName] || viewName.charAt(0).toUpperCase() + viewName.slice(1);

        // Update active classes
        document.querySelectorAll('.nav-links li, .nav-item').forEach(el => {
            el.classList.toggle('active', el.dataset.view === viewName);
        });

        // Initialize charts if on dashboard
        if (viewName === 'dashboard') {
            initDashboardCharts();
        }
    }
}

function initDashboardCharts() {
    const ctx = document.getElementById('performanceChart');
    if (!ctx) return;

    // Use Chart.js only if it's loaded
    if (typeof Chart !== 'undefined') {
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'],
                datasets: [{
                    label: 'Tareas Completadas',
                    data: [45, 52, 38, 65, 59, 80, 72],
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.2)',
                    tension: 0.4,
                    fill: true,
                    borderWidth: 3,
                    pointBackgroundColor: '#10b981'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94a3b8' } },
                    x: { grid: { display: false }, ticks: { color: '#94a3b8' } }
                }
            }
        });
    }
}

// 5. Initial Events
document.addEventListener('DOMContentLoaded', () => {
    // Navigation
    document.querySelectorAll('[data-view]').forEach(el => {
        el.addEventListener('click', () => {
            console.log('Navegando a:', el.dataset.view);
            renderView(el.dataset.view);
        });
    });

    document.getElementById('add-task-btn').addEventListener('click', showNewTaskModal);
    document.querySelector('.close-modal').addEventListener('click', Modal.close);

    // Clock
    setInterval(updateClock, 1000);
    updateClock();

    // Default view
    renderView('dashboard');
    Storage.logActivity('Sistema', 'Acceso Admin', 'Sesión iniciada correctamente');
});

function updateClock() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString();
    const dateStr = now.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    const timeEl = document.getElementById('current-time');
    const dateEl = document.getElementById('current-date');

    if (timeEl) timeEl.innerText = timeStr;
    if (dateEl) dateEl.innerText = dateStr;
}

