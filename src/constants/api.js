export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://103.90.224.27:8080';

export const API_ENDPOINTS = {
    login: '/api/account/login',
    consultations: '/api/consultation' 
}

export const DEFAULT_PAGE_SIZE = 10;