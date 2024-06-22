import { useState, useEffect } from 'react';
import type { Status } from '@/types/common.types';
import type { AlertState } from './useAlert.types';

interface UseAlertProps {
  message: string;
  status: Status;
  timestamp?: number;
  duration?: number;
}

type UseAlertReturn = AlertState;

const initialAlertState: AlertState = {
  display: 'hide',
  type: 'default',
  title: '',
  message: '',
};

export const useAlert = ({
  message,
  timestamp,
  status,
  duration = 3000,
}: UseAlertProps): UseAlertReturn => {
  const [alert, setAlert] = useState<AlertState>(initialAlertState);

  useEffect(() => {
    if (timestamp) {
      setAlert({
        display: 'show',
        type: status === 'error' ? 'destructive' : 'default',
        title: status === 'error' ? 'Error' : 'Success',
        message: message,
      });
    }
  }, [message, status, timestamp]);

  useEffect(() => {
    if (alert.display === 'show') {
      const timeout = setTimeout(() => {
        setAlert(initialAlertState);
      }, duration);

      return () => clearTimeout(timeout);
    }
  }, [alert.display, duration]);

  return alert;
};
