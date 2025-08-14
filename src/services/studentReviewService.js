import axios from 'src/lib/axios';

export const studentReviewService = {
  async submitReview(bookingId, payload) {
    const { data } = await axios.post(`/api/student-review/${bookingId}`, payload);
    return data;
  },
  async getReview(bookingId) {
    const { data } = await axios.get(`/api/student-review/${bookingId}`);
    return data;
  },
};


