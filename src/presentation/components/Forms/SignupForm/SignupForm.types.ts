export interface FormField {
  readonly name: string;
  readonly label: string;
  readonly type: string;
  readonly icon?: React.ReactNode;
  readonly placeholder?: string;
}

export interface ISignupFormProps {
  formFields: readonly FormField[];
}
