const TOKEN_KEY = 'consultation_manager_token';
const USER_KEY = 'consultation_manager_user';

export const storage = {
    getToken: () => window.localStorage.getItem(TOKEN_KEY),
    setToken: (value) => window.localStorage.setItem(TOKEN_KEY, value),
    removeToken: () => window.localStorage.removeItem(TOKEN_KEY),

    getUser: () => {
        const raw = window.localStorage.getItem(USER_KEY);
        if (!raw) return null;
        try {
            return JSON.parse(raw);
        } catch(error) {
            console.error('Unable to parse stored user payload', error)
            return null;
        }
    },
    setUser: (value) => window.localStorage.setItem(USER_KEY, JSON.stringify(value)),
    removeUser: () => window.localStorage.removeItem(USER_KEY)
};