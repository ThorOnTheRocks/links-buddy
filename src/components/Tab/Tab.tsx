import { ITabProps } from './Tab.types';

export const Tab = ({ label, ...props }: ITabProps) => {
  return (
    <>
      <button role="tab" {...props}>
        {label}
      </button>
    </>
  );
};
