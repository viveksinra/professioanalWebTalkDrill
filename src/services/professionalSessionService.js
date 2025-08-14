import axios from 'src/lib/axios';

export const professionalSessionService = {
  async lobby(bookingId) {
    const { data } = await axios.get(`/api/professional/session/${bookingId}/lobby`);
    return data;
  },
  async join(bookingId) {
    const { data } = await axios.post(`/api/professional/session/${bookingId}/join`);
    return data; // { streamCallId, streamToken, streamApiKey }
  },
  async end(bookingId) {
    const { data } = await axios.post(`/api/professional/session/${bookingId}/end`);
    return data;
  },
};


