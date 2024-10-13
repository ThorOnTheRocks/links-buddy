import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { AlertUI, AlertTitle, AlertDescription } from '../index';
import type { AlertState } from './hooks/useAlert.types';

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  alert: AlertState;
}

export const Alert = ({ alert, ...props }: AlertProps) => {
  return (
    <>
      {' '}
      {alert.display === 'show' && (
        <AlertUI variant={alert.type} {...props}>
          <ExclamationTriangleIcon className="h-4 w-4" />
          <AlertTitle>{alert.title}</AlertTitle>
          <AlertDescription>{alert.message}</AlertDescription>
        </AlertUI>
      )}{' '}
    </>
  );
};
