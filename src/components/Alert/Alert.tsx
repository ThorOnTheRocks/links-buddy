import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { AlertUI, AlertTitle, AlertDescription } from '../index';
import { AlertState } from './hooks/useAlert.types';

type AlertProps = {
  alert: AlertState;
};

export const Alert = ({ alert }: AlertProps) => {
  return (
    <>
      {' '}
      {alert.display === 'show' && (
        <AlertUI variant={alert.type}>
          <ExclamationTriangleIcon className="h-4 w-4" />
          <AlertTitle>{alert.title}</AlertTitle>
          <AlertDescription>{alert.message}</AlertDescription>
        </AlertUI>
      )}{' '}
    </>
  );
};
