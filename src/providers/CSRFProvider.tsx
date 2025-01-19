"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

interface CSRFContextType {
  csrfToken: string | null;
  refreshCSRFToken: () => Promise<void>;
}

const CSRFContext = createContext<CSRFContextType | undefined>(undefined);

export function CSRFProvider({ children }: { children: React.ReactNode }) {
  const [csrfToken, setCsrfToken] = useState<string | null>(null);

  const refreshCSRFToken = useCallback(async () => {
    try {
      const response = await fetch("/api/csrf");
      const data = await response.json();
      setCsrfToken(data.csrfToken);
    } catch (error) {
      console.error("Failed to fetch CSRF token:", error);
    }
  }, []);

  useEffect(() => {
    refreshCSRFToken();

    // Set up periodic refresh (every 1 hour)
    const intervalId = setInterval(refreshCSRFToken, 60 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, [refreshCSRFToken]);

  return (
    <CSRFContext.Provider value={{ csrfToken, refreshCSRFToken }}>
      {children}
    </CSRFContext.Provider>
  );
}

export function useCSRF() {
  const context = useContext(CSRFContext);
  if (context === undefined) {
    throw new Error("useCSRF must be used within a CSRFProvider");
  }
  return context;
}
