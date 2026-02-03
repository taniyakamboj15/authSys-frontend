import { useState, useEffect, useRef, useCallback } from 'react';

interface CountdownConfig {
  initialSeconds: number;
  onComplete?: () => void;
}

/**
 * Custom hook for countdown timer (used in OTP resend)
 */
export const useCountdown = (config: CountdownConfig) => {
  const [countdown, setCountdown] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (isActive && countdown > 0) {
      timerRef.current = window.setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0 && isActive) {
      setIsActive(false);
      config.onComplete?.();
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [countdown, isActive, config]);

  const start = useCallback(() => {
    setCountdown(config.initialSeconds);
    setIsActive(true);
  }, [config.initialSeconds]);

  const reset = useCallback(() => {
    setCountdown(0);
    setIsActive(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  }, []);

  return { countdown, isActive, start, reset };
};
