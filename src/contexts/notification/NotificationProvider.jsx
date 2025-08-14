'use client';

import { createContext, useCallback, useContext, useMemo, useState } from 'react';

import axios, { endpoints } from 'src/lib/axios';

const NotificationCtx = createContext(null);

export function useNotification() {
  return useContext(NotificationCtx);
}

export function NotificationProvider({ children }) {
  const [items, setItems] = useState([]);
  const [unread, setUnread] = useState(0);
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      // Placeholder: replace with real endpoint
      const res = await axios.get(endpoints.mail.list);
      const list = Array.isArray(res?.data) ? res.data : [];
      setItems(list);
      setUnread(list.filter((n) => !n.read).length);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Notification refresh failed', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const markAllRead = useCallback(() => {
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
    setUnread(0);
  }, []);

  const markRead = useCallback((id) => {
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
    setUnread((u) => Math.max(0, u - 1));
  }, []);

  const remove = useCallback((id) => {
    setItems((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const value = useMemo(
    () => ({ items, unread, loading, refresh, markAllRead, markRead, remove }),
    [items, unread, loading, refresh, markAllRead, markRead, remove]
  );

  return <NotificationCtx.Provider value={value}>{children}</NotificationCtx.Provider>;
}


