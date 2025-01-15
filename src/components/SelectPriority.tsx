/**
 * Imports
 */
// Components
import LabelDefault from '@/components/LabelDefault';

// React
import { UseFormRegisterReturn } from 'react-hook-form';
import { useId } from 'react';

// Types
import type { OptionType } from '@/types/OptionType';

interface SelectPriorityProps<T extends string> {
  label: string;
  name: string;
  options: OptionType[];
  isRequired?: boolean;
  extraClasses?: string;
  register?: UseFormRegisterReturn<T>;
  defaultValue?: string;
}

export default function SelectPriority<T extends string>({
  label,
  name,
  options,
  register,
  isRequired = false,
  extraClasses = '',
  defaultValue = ''
}: SelectPriorityProps<T>) {
  const selectId = useId();

  return (
    <div className={extraClasses}>
      <LabelDefault id={selectId} name={label} isRequired={isRequired} />

      <select
        name={name}
        id={selectId}
        className="border border-slate-300 rounded-md text-sm px-3 py-2 focus:outline-none focus:border-black w-full transition-colors"
        defaultValue={defaultValue}
        {...register}
      >
        {
          options.map(({ label: optionLabel, value }, index) => (
            <option
              key={index}
              value={value}
            >{optionLabel}</option>
          ))
        }
      </select>
    </div>
  );
}