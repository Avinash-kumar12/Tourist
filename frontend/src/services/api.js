// import axios from 'axios';

// const API = axios.create({ baseURL: '/api' });

// // Attach token to every request
// API.interceptors.request.use((config) => {
//   const user = JSON.parse(localStorage.getItem('user'));
//   if (user?.token) {
//     config.headers.Authorization = `Bearer ${user.token}`;
//   }
//   return config;
// });

import axios from 'axios';

// Looks for the Vite environment variable on Render, or falls back to your local server
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const API = axios.create({ baseURL: API_BASE_URL });

// Attach token to every request
API.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

// Auth
export const registerUser = (data) => API.post('/auth/register', data);
export const loginUser = (data) => API.post('/auth/login', data);
export const getMe = () => API.get('/auth/me');

// Trips
export const generateTrip = (data) => API.post('/trips/generate', data);
export const getMyTrips = () => API.get('/trips');
export const getTripById = (id) => API.get(`/trips/${id}`);
export const deleteTrip = (id) => API.delete(`/trips/${id}`);

// Chat
export const chatWithAI = (messages) => API.post('/chat', { messages });

// Buddies
export const getBuddies = (params) => API.get('/buddies', { params });
export const getBuddyById = (id) => API.get(`/buddies/profile/${id}`);
export const getMyBuddyProfile = () => API.get('/buddies/profile/me');
export const upsertBuddyProfile = (data) => API.post('/buddies/profile', data);
export const toggleAvailability = () => API.patch('/buddies/availability');
export const sendBuddyRequest = (data) => API.post('/buddies/request', data);
export const getMyRequests = () => API.get('/buddies/requests');
export const updateRequestStatus = (id, status) => API.patch(`/buddies/requests/${id}`, { status });
export const getMyBookings = () => API.get('/buddies/my-bookings');

// Places
export const getCities = () => API.get('/places');
export const getPlacesByCity = (city) => API.get(`/places/${city}`);

export default API;
