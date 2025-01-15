/**
 * Imports
 */
// Components
import LabelDefault from '@/components/LabelDefault';
import InputError from '@/components/InputError';

// React
import { useId } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

// Utils
import getInputErrorClasses from '@/utils/getInputErrorClasses';

interface InputDefaultProps<T extends string> {
  label: string;
  inputType?: 'text' | 'url',
  isErrorShowing?: boolean;
  errorMessage?: string;
  isRequired?: boolean;
  extraClasses?: string;
  register?: UseFormRegisterReturn<T>;
}

export default function InputDefault<T extends string>({
  label,
  inputType = 'text',
  isErrorShowing = false,
  errorMessage = '',
  isRequired = false,
  extraClasses = '',
  register
}: InputDefaultProps<T>) {
  // Id
  const inputId = useId();

  return (
    <div className={`relative ${extraClasses}`}>
      <LabelDefault id={inputId} name={label} isRequired={isRequired} />

      <input
        type={inputType}
        id={inputId}
        name={label.toLowerCase()}
        className={`block border rounded-md text-sm px-3 py-2 focus:outline-none focus:border-black transition-colors w-full ${getInputErrorClasses(isErrorShowing)}`}
        {...register}
      />

      {
        isErrorShowing &&
        <InputError message={errorMessage} />
      }
    </div>
  )
}