import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useATMApp } from '../context/ATMAppContext';

// custom hook to hanlde autolog off after inactivity
export function useAutoLogoff(timeoutMs = 60000) { // default: 60 seconds
  const navigate = useNavigate();
  const { dispatch } = useATMApp()!;
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const resetTimer = () => {
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        dispatch({ type: 'RESET' });
        navigate('/', { replace: true });
      }, timeoutMs);
    };

    const events = ['mousemove', 'mousedown', 'keypress', 'touchstart'];
    events.forEach(ev => window.addEventListener(ev, resetTimer));
    resetTimer();

    return () => {
      if (timer.current) clearTimeout(timer.current);
      events.forEach(ev => window.removeEventListener(ev, resetTimer));
    };
  }, [dispatch, navigate, timeoutMs]);
}
