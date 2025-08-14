import axios from 'axios';

import { CONFIG } from 'src/global-config';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: CONFIG.serverUrl,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Optional: Add token (if using auth)
 *
 axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
*
 */

// ----------------------------------------------------------------------
// Timezone conversion helpers (parity with mobile)
// ----------------------------------------------------------------------

const UTC_TO_LOCAL_FIELDS = [
  'scheduledDate',
  'scheduledTime',
  'scheduledDateTime',
  'scheduledDateTimeUTC',
  'endDateTime',
  'endDateTimeUTC',
  'startTime',
  'endTime',
  'createdAt',
  'updatedAt',
  'dateJoined',
  'lastLoginDate',
  'reminderTime',
  'sessionTime',
  'bookingTime',
  'cancelledAt',
  'completedAt',
  'timestamp',
  'date',
  'time',
  'weekStartDate',
  'weekEndDate',
  'payoutDate',
  'processedAt',
];

const LOCAL_TO_UTC_FIELDS = [
  'scheduledDate',
  'scheduledTime',
  'scheduledDateTime',
  'newDate',
  'newTime',
  'startDate',
  'endDate',
  'date',
  'time',
];

function toIso(input) {
  if (!input) return input;
  try {
    const d = new Date(input);
    if (Number.isNaN(d.getTime())) return input;
    return d.toISOString();
  } catch {
    return input;
  }
}

function convertRequestTimesToUTC(data) {
  if (!data || typeof data !== 'object' || data instanceof FormData) return data;
  const converted = { ...data };
  LOCAL_TO_UTC_FIELDS.forEach((field) => {
    if (converted[field]) {
      if (field === 'scheduledTime' && converted['scheduledDate']) {
        const dateTime = `${converted['scheduledDate']}T${converted[field]}:00`;
        const iso = toIso(dateTime);
        const isoDate = new Date(iso);
        converted['scheduledDate'] = isoDate.toISOString().split('T')[0];
        converted[field] = isoDate.toISOString().split('T')[1].slice(0, 5);
      } else {
        converted[field] = toIso(converted[field]);
      }
    }
  });
  Object.keys(converted).forEach((k) => {
    if (converted[k] && typeof converted[k] === 'object' && !Array.isArray(converted[k])) {
      converted[k] = convertRequestTimesToUTC(converted[k]);
    }
    if (Array.isArray(converted[k])) {
      converted[k] = converted[k].map((it) => (typeof it === 'object' ? convertRequestTimesToUTC(it) : it));
    }
  });
  return converted;
}

function convertResponseTimesToLocal(data) {
  if (!data) return data;
  if (Array.isArray(data)) return data.map((it) => convertResponseTimesToLocal(it));
  if (typeof data !== 'object') return data;
  const converted = { ...data };
  UTC_TO_LOCAL_FIELDS.forEach((field) => {
    if (converted[field]) {
      if (field === 'scheduledTime' && typeof converted[field] === 'string' && /^\d{2}:\d{2}$/.test(converted[field])) {
        return;
      }
      converted[field] = toIso(converted[field]);
    }
  });
  Object.keys(converted).forEach((k) => {
    if (converted[k] && typeof converted[k] === 'object') {
      converted[k] = convertResponseTimesToLocal(converted[k]);
    }
  });
  return converted;
}

// Attach timezone header and bearer token if present
axiosInstance.interceptors.request.use((config) => {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
    config.headers['X-Timezone'] = tz;
  } catch {}

  try {
    const csrf = typeof document !== 'undefined' ? (document.cookie.split('; ').find((c) => c.startsWith('csrfToken='))?.split('=')[1]) : undefined;
    if (csrf && /^(POST|PUT|PATCH|DELETE)$/i.test(config.method || '')) {
      config.headers['X-CSRF-Token'] = csrf;
    }
  } catch {}

  try {
    const token = sessionStorage.getItem('accessToken');
    if (token && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch {}

  try {
    if (config.data && typeof config.data === 'object') {
      config.data = convertRequestTimesToUTC(config.data);
    }
  } catch {}

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    try {
      if (response?.data) {
        response.data = convertResponseTimesToLocal(response.data);
      }
    } catch {}
    return response;
  },
  (error) => {
    try {
      const status = error?.response?.status;
      if (status === 401) {
        // Clear client token and redirect to login
        try {
          sessionStorage.removeItem('accessToken');
        } catch {}
        if (typeof window !== 'undefined') {
          fetch('/api/auth/logout', { method: 'POST' }).finally(() => {
            window.location.href = '/auth/login';
          });
        }
      }
    } catch {}

    const message = error?.response?.data?.message || error?.message || 'Something went wrong!';
    console.error('Axios error:', message);
    return Promise.reject(new Error(message));
  }
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args) => {
  try {
    const [url, config] = Array.isArray(args) ? args : [args, {}];

    const res = await axiosInstance.get(url, config);

    return res.data;
  } catch (error) {
    console.error('Fetcher failed:', error);
    throw error;
  }
};

// ----------------------------------------------------------------------

export const endpoints = {
  chat: '/api/chat',
  kanban: '/api/kanban',
  calendar: '/api/calendar',

  auth: {
    me: '/api/auth/me',
    signIn: '/api/auth/sign-in',
    signUp: '/api/auth/sign-up',
  },

  mail: {
    list: '/api/mail/list',
    details: '/api/mail/details',
    labels: '/api/mail/labels',
  },

  post: {
    list: '/api/post/list',
    details: '/api/post/details',
    latest: '/api/post/latest',
    search: '/api/post/search',
  },

  product: {
    list: '/api/product/list',
    details: '/api/product/details',
    search: '/api/product/search',
  },
};
