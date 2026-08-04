import apiClient from '@/lib/axios';

export const authApi = {
    login: (credentials) =>
        apiClient.post('/auth/login', credentials),
    register: (payload) =>
        apiClient.post('/auth/register', payload),
    getCurrentUser: () =>
        apiClient.get('/users/me'),
};