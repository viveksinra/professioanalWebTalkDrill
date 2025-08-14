'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import io from 'socket.io-client';

import { CONFIG } from 'src/global-config';
import { useAuthContext } from 'src/auth/hooks/use-auth-context';

const SocketCtx = createContext(null);

export function useSocket() {
  return useContext(SocketCtx);
}

export function SocketProvider({ children }) {
  const { user } = useAuthContext();
  const [connected, setConnected] = useState(false);
  const socketRef = useRef(null);

  const connect = useCallback(() => {
    try {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }

      const token = user?.accessToken || null;

      const socket = io(CONFIG.serverUrl, {
        transports: ['websocket'],
        autoConnect: true,
        reconnection: true,
        reconnectionAttempts: Infinity,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        auth: token ? { token: `Bearer ${token}` } : undefined,
        withCredentials: true,
      });

      socket.on('connect', () => setConnected(true));
      socket.on('disconnect', () => setConnected(false));

      socketRef.current = socket;
    } catch (error) {
      console.error('Socket connect error', error);
    }
  }, [user?.accessToken]);

  useEffect(() => {
    connect();
    return () => {
      try {
        socketRef.current?.removeAllListeners();
        socketRef.current?.disconnect();
      } catch {}
    };
  }, [connect]);

  const emit = useCallback((event, payload) => {
    socketRef.current?.emit(event, payload);
  }, []);

  const on = useCallback((event, handler) => {
    socketRef.current?.on(event, handler);
    return () => socketRef.current?.off(event, handler);
  }, []);

  const off = useCallback((event, handler) => {
    socketRef.current?.off(event, handler);
  }, []);

  const value = useMemo(
    () => ({ socket: socketRef.current, connected, emit, on, off, reconnect: connect }),
    [connected, emit, on, off, connect]
  );

  return <SocketCtx.Provider value={value}>{children}</SocketCtx.Provider>;
}


