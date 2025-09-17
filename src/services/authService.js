import { API_ENDPOINTS } from '../constants/index.js';
import { apiClient } from './apiClient.js'

const normaliseLoginPayload = (payload = {}, fallbackEmail) => {
    const data = payload.data ?? payload;
    const token = data.token || data.accessToken || data.jwt || data.idToken;
    const refreshToken = data.refreshToken || data.refresh_token;
    const user = 
        data.user ||
            (data.fullName || data.name || data.username
                ? {
                    fullName: data.fullName || data.name || data.username,
                    email: data.email || fallbackEmail
                  }
                : null);
    if (!token){
        throw new Error('Không nhận được token đăng nhập');
    }

    return {
        token,
        refreshToken,
        user
    };
};

export const login = async ({ email, password }) => {
    const payload = await apiClient(API_ENDPOINTS.login, {
        method: 'POST',
        body: {
            email,
            password
        }
    });

    return normaliseLoginPayload(payload, email);
};