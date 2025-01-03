/**
 * Imports
 */
// Components
import LabelDefault from '@/components/LabelDefault';
import InputError from '@/components/InputError';

// React
import { useId } from 'react';

// Utils
import getInputErrorClasses from '@/utils/getInputErrorClasses';

interface InputDefaultProps {
  label: string;
  inputType?: 'text' | 'url',
  inputValue: string;
  isErrorShowing?: boolean;
  errorMessage?: string;
  isRequired?: boolean;
  extraClasses?: string;
  onBlur: () => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputDefault({ label, inputType = 'text', inputValue, isErrorShowing = false, errorMessage = '', isRequired = false, extraClasses = '', onBlur, onChange }: InputDefaultProps) {
  // Id
  const inputId = useId();

  return (
    <div className={`relative ${extraClasses}`}>
      <LabelDefault id={inputId} name={label} isRequired={isRequired} />

      <input
        type={inputType}
        id={inputId}
        name={label.toLowerCase()}
        value={inputValue}
        className={`block border rounded-md text-sm px-3 py-2 focus:outline-none focus:border-black transition-colors w-full ${getInputErrorClasses(isErrorShowing)}`}
        onBlur={() => onBlur()}
        onChange={onChange}
      />

      {
        isErrorShowing &&
        <InputError message={errorMessage} />
      }
    </div>
  )
}