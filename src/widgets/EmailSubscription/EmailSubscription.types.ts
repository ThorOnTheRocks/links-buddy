export type EmailSubscriptionForm = {
  email: string;
};

export type EmailSubscriptionAlertState = {
  show: boolean;
  type: 'default' | 'destructive';
  title: string;
  message: string;
};
