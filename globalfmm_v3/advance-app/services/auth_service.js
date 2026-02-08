/**
 * ADVANCE IA - AUTH SERVICE
 * Scalable authentication layer prepared for Google Identity Platform.
 */

export const Auth = {
    keys: {
        session: 'advance_auth_token',
        user: 'advance_user_profile'
    },

    isLoggedIn: () => {
        return sessionStorage.getItem(Auth.keys.session) !== null;
    },

    /**
     * Professional Login Logic
     * @param {string} email 
     * @param {string} password 
     * @returns {Promise<boolean>}
     */
    login: async (email, password) => {
        const cleanEmail = email.trim().toLowerCase();
        const cleanPass = password.trim();

        console.log(`[AuthService] Intentando login para: ${cleanEmail}`);

        // Master Admin Credentials
        const masters = [
            { user: 'admin@dynamic.com', pass: 'admin123' },
            { user: 'jaime@globalfmm.com', pass: 'Advance2026!' }
        ];

        const match = masters.find(m => m.user === cleanEmail && m.pass === cleanPass);

        if (match) {
            console.log('[AuthService] Credenciales válidas.');
            const uid = cleanEmail === 'jaime@globalfmm.com' ? 'master_jaime' : 'admin_v3';
            const mockToken = btoa(JSON.stringify({ uid: uid, role: 'engineer', exp: Date.now() + 3600000 }));
            sessionStorage.setItem(Auth.keys.session, mockToken);
            sessionStorage.setItem(Auth.keys.user, JSON.stringify({
                name: cleanEmail === 'jaime@globalfmm.com' ? 'Jaime G. (Master Admin)' : 'Engineering Director',
                role: 'Senior Engineer',
                avatar: 'admin'
            }));
            return true;
        }
        console.warn('[AuthService] Credenciales inválidas.');
        return false;
    },

    logout: () => {
        console.log('[AuthService] Cerrando sesión y limpiando vault persistente...');
        sessionStorage.removeItem(Auth.keys.session);
        sessionStorage.removeItem(Auth.keys.user);
        window.location.reload();
    },

    getUser: () => {
        const user = sessionStorage.getItem(Auth.keys.user);
        return user ? JSON.parse(user) : null;
    }
};
