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

interface TextAreaDefaultProps {
  label: string;
  inputValue: string;
  isErrorShowing?: boolean;
  errorMessage?: string;
  isRequired?: boolean;
  extraClasses?: string;
  onBlur?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  maxLength?: number;
}

export default function TextAreaDefault({
  label,
  inputValue,
  isErrorShowing = false,
  errorMessage = '',
  isRequired = false,
  extraClasses = '',
  onBlur = () => {},
  onChange,
  maxLength = 100
}: TextAreaDefaultProps) {
  // Id
  const inputId = useId();

  return (
    <div className={`relative ${extraClasses}`}>
      <LabelDefault id={inputId} name={label} isRequired={isRequired} />

      <textarea
        id={inputId}
        name={label.toLowerCase()}
        value={inputValue}
        className={`block border rounded-md text-sm px-3 py-2 focus:outline-none focus:border-black transition-colors w-full min-h-24 ${getInputErrorClasses(isErrorShowing)}`}
        onBlur={onBlur}
        onChange={onChange}
        maxLength={maxLength}
      />

      {
        isErrorShowing &&
        <InputError message={errorMessage} />
      }

      <div className="absolute text-xs top-1 right-0 text-black/70">{inputValue.length}/100</div>
    </div>
  )
}