/**
 * Imports
 */
// Components
import LabelDefault from '@/components/LabelDefault';
import InputError from '@/components/InputError';

// React
import { useId, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

// Utils
import getInputErrorClasses from '@/utils/getInputErrorClasses';

interface TextAreaDefaultProps<T extends string> {
  label: string;
  isErrorShowing?: boolean;
  errorMessage?: string;
  isRequired?: boolean;
  extraClasses?: string;
  maxLength?: number;
  register?: UseFormRegisterReturn<T>;
}

export default function TextAreaDefault<T extends string>({
  label,
  isErrorShowing = false,
  errorMessage = '',
  isRequired = false,
  extraClasses = '',
  maxLength = 100,
  register,
}: TextAreaDefaultProps<T>) {
  // Id
  const inputId = useId();

  const [inputLength, setInputLength] = useState(0);

  function onTextAreaInputChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setInputLength(event.target.value.length);
  }

  return (
    <div className={`relative ${extraClasses}`}>
      <LabelDefault id={inputId} name={label} isRequired={isRequired} />

      <textarea
        id={inputId}
        name={label.toLowerCase()}
        className={`block border rounded-md text-sm px-3 py-2 focus:outline-none focus:border-black transition-colors w-full min-h-24 ${getInputErrorClasses(isErrorShowing)}`}
        maxLength={maxLength}
        {...register}
        onChange={onTextAreaInputChange}
      />

      {
        isErrorShowing &&
        <InputError message={errorMessage} />
      }

      <div className="absolute text-xs top-1 right-0 text-black/70">{inputLength}/100</div>
    </div>
  )
}