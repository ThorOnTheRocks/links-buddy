export type AlertDisplay = 'hide' | 'show';

export type AlertType = 'default' | 'destructive';

export interface AlertState {
  display: AlertDisplay;
  type: AlertType;
  title: string;
  message: string;
  duration?: number;
}
