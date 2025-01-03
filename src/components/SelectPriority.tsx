/**
 * Imports
 */
// Components
import LabelDefault from '@/components/LabelDefault';

// React
import { useId } from 'react';

// Types
import type { OptionType } from '@/types/OptionType';

interface SelectDefaultProps {
  label: string;
  name: string;
  options: OptionType[];
  selectValue: number;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  isRequired?: boolean;
  extraClasses?: string;
}

export default function SelectDefault({ label, name, options, selectValue, onChange, isRequired = false, extraClasses = "" }: SelectDefaultProps) {
  const selectId = useId();

  return (
    <div className={extraClasses}>
      <LabelDefault id={selectId} name={label} isRequired={isRequired} />

      <select
        name={name}
        id={selectId}
        value={selectValue}
        onChange={onChange}
        className="border border-slate-300 rounded-md text-sm px-3 py-2 focus:outline-none focus:border-black w-full transition-colors"
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