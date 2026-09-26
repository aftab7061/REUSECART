// services/userService.js
import api from './api';

// formData must be a FormData instance if avatar file is included
export const updateProfile = (formData) =>
  api
    .put('/users/profile', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    .then((res) => res.data);

export const changePassword = (data) =>
  api.put('/users/change-password', data).then((res) => res.data);
