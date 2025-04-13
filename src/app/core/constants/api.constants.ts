export const API_ENDPOINTS = {
  AUTH: {
    SIGNUP: '/auth/signup',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout'
  },
  FLIGHTS: {
    SEARCH: '/flights/search',
    DETAILS: (id: string) => `/flights/${id}`
  },
  BOOKINGS: {
    CREATE: '/bookings',
    LIST: '/bookings',
    UPDATE: (id: string) => `/bookings/${id}`
  }
};