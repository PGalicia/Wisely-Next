/**
 * Imports
 */
// Components
import InputError from '@/components/InputError';
import LabelDefault from '@/components/LabelDefault';

// React
import { useId } from 'react';

// Utils
import getInputErrorClasses from '@/utils/getInputErrorClasses';

interface InputNumberProps {
  label: string;
  inputValue: string;
  isErrorShowing?: boolean;
  errorMessage?: string;
  isRequired?: boolean;
  extraClasses?: string;
  onBlur: () => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function InputNumber({ label, inputValue, isErrorShowing = false, errorMessage = '', isRequired = false, extraClasses = '', onBlur, onChange, onKeyDown }: InputNumberProps) {
  // Id
  const inputId = useId();

  return (
    <div className={`relative ${extraClasses}`}>
      <LabelDefault id={inputId} name={label} isRequired={isRequired} />

      <input
        type="number"
        id={inputId}
        name={label.toLowerCase()}
        value={inputValue}
        className={`block border rounded-md text-sm px-3 py-2 focus:outline-none focus:border-black transition-colors w-full ${getInputErrorClasses(isErrorShowing)}`}
        step="0.01"
        onKeyDown={onKeyDown}
        onChange={onChange}
        onBlur={() => onBlur()}
      />

      {
        isErrorShowing &&
        <InputError message={errorMessage} />
      }
    </div>
  )
}