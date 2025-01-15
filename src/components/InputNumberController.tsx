/**
 * Imports
 */
// Components
import InputError from '@/components/InputError';
import LabelDefault from '@/components/LabelDefault';

// React
import { useId } from 'react';
import { RegisterOptions, UseFormRegisterReturn } from 'react-hook-form';

// Utils
import getInputErrorClasses from '@/utils/getInputErrorClasses';

interface InputNumberProps<T extends string> {
  label: string;
  isErrorShowing?: boolean;
  errorMessage?: string;
  isRequired?: boolean;
  extraClasses?: string;
  register?: UseFormRegisterReturn<T>;
}

export default function InputNumberController<T extends string>({ label, isErrorShowing = false, errorMessage = '', isRequired = false, extraClasses = '', register }: InputNumberProps<T>) {
  // Id
  const inputId = useId();

  return (
    <div className={`relative ${extraClasses}`}>
      <LabelDefault id={inputId} name={label} isRequired={isRequired} />

      <input
        type="number"
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