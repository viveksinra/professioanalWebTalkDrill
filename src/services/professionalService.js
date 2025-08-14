import axios from 'src/lib/axios';

export const professionalService = {
  async getProfile() {
    const { data } = await axios.get('/api/professional/profile');
    return data;
  },
  async updateProfile(payload) {
    const { data } = await axios.put('/api/professional/profile', payload);
    return data;
  },
  async getBookings(params = {}) {
    const { data } = await axios.get('/api/professional/bookings', { params });
    return data;
  },
  async getEarningsSummary() {
    const { data } = await axios.get('/api/professional/earnings/summary');
    return data;
  },
  async getTransactions(params = {}) {
    const { data } = await axios.get('/api/professional/earnings/transactions', { params });
    return data;
  },
  async getNotifications(params = {}) {
    const { data } = await axios.get('/api/notifications', { params });
    return data;
  },
};


