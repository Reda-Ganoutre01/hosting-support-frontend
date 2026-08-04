import apiClient from '@/lib/axios';

export const tokenStorage = {
    login: (credentials) => apiClient.post('/auth/login', credentials).then((res) => res.data),
    register: (payload) => apiClient.post('/auth/register', payload).then((res) => res.data),
    getCurrentUser: () => apiClient.get('/users/me').then((res) => res.data),
};