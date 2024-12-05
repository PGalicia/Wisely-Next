
'use client'
/**
 * Imports
 */
// Apollo
import { gql, useMutation } from '@apollo/client';

// Componets
import ButtonDefault from '@/components/ButtonDefault';
import LabelDefault from '@/components/LabelDefault';
import ModalDefault from '@/components/ModalDefault';
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ExclamationTriangleIcon } from '@heroicons/react/16/solid'

// Constans
import { ADD_WISHLIST, GET_WISHLIST } from '@/constants/GraphQLQueries';

// React
import { useState } from 'react';

// Redux
import { useDispatch } from 'react-redux';
import { closeAddItemModal } from '@/redux/features/modalSlice';

// Types
import type { AppDispatch } from '@/redux/store';
import { useId } from 'react';

interface InputDefaultProps {
  label: string;
  type?: 'text' | 'url' | 'number',
  isRequired?: boolean;
  extraClasses?: string;
}

function InputDefault({ type = 'text', label, isRequired = false, extraClasses = '' }: InputDefaultProps) {
  // States
  const [value, setValue] = useState('');
  const [isErrorShowing, setIsErrorShowing] = useState(false);

  // Id
  const inputId = useId();

  // Extra input properties
  let extraInputProperties: { [key: string]: any } = {
    onBlur: onInputDefaultBlur,
    onChange: onInputDefaultChange
  };

  switch (type) {
    case 'number':
      extraInputProperties = {
        step: 0.01,
        onKeyDown: onInputNumberKeyDown,
        onChange: onInputNumberChange,
        onBlur: onInputNumberBlur
      }
      break;
    default:
      break;
  }

  // Methods
  function onInputDefaultChange(event: React.ChangeEvent<HTMLInputElement>) {
    setIsErrorShowing(false);
    setValue(event.target.value);
  }

  function onInputDefaultBlur() {
    // When an input is required, determine if the value is empty
    // If so, adjust input UI to show error
    if (isRequired && value.length === 0) {
      setIsErrorShowing(true);
    }
  }

  function onInputNumberBlur() {
    // When an input is required, determine if the value is empty OR if the value is less than 0
    // If so, adjust input UI to show error
    if (isRequired && (value.length === 0 || parseFloat(value) <= 0)) {
      setIsErrorShowing(true);
    }
  }

  function onInputNumberChange(event: React.ChangeEvent<HTMLInputElement>) {
    const inputValue = event.target.value;

    // Match numbers with up to two decimal places
    if (/^\d*\.?\d{0,2}$/.test(inputValue)) {
      setIsErrorShowing(false);
      setValue(inputValue);
    }
  };

  // Prevent certain values from popping on in 'number' type input element
  function onInputNumberKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'e' || event.key === 'E' || event.key === '+' || event.key === '-') {
      event.preventDefault();
    }
  }

  // Classes for input that would show an error
  function getInputErrorClasses() {
    return isErrorShowing
      ? 'border-red-500 u-shake'
      : 'border-slate-300';
  }

  return (
    <div className={`relative ${extraClasses}`}>
      <LabelDefault id={inputId} name={label} isRequired={isRequired} />

      <input
        type={type}
        id={inputId}
        name={label.toLowerCase()}
        value={value}
        className={`block border rounded-md text-sm px-3 py-2 focus:outline-none focus:border-black transition-colors w-full ${getInputErrorClasses()}`}
        {...extraInputProperties}
      />

      {
        isErrorShowing &&
        <div className="absolute text-xs mt-1 right-0 text-red-500"><ExclamationTriangleIcon className="size-3 inline-block mr-1" />This is an error</div>
      }
    </div>
  )
}

interface SelectDefaultProps {
  label: string;
  name: string;
  options: OptionType[];
  defaultValue: string;
  isRequired?: boolean;
  extraClasses?: string;
}

interface OptionType {
  label: string;
  value: string;
}

function SelectDefault({ label, name, options, defaultValue, isRequired = false, extraClasses = "" }: SelectDefaultProps) {
  const selectId = useId();

  return (
    <div className={extraClasses}>
      <LabelDefault id={selectId} name={label} isRequired={isRequired} />

      <select
        name={name}
        id={selectId}
        defaultValue={defaultValue}
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
  )
}

interface TextAreaDefaultProps {
  label: string;
  isRequired?: boolean;
  extraClasses?: string;
}

function TextAreaDefault({ label, isRequired = false, extraClasses = "" }: TextAreaDefaultProps) {
  const textAreaId = useId();

  return(
    <div className={extraClasses}>
      <LabelDefault id={textAreaId} name={label} isRequired={isRequired} />

      <textarea
        name={label}
        id={textAreaId}
        className="border border-slate-300 rounded-md text-sm px-3 py-2 focus:outline-none focus:border-black w-full transition-colors"
      ></textarea>
    </div>
  )
}

export default function ModalAddItem () {
  // State
  const [isFormValid, setIsFormValid] = useState(false);

  // Dispatch
  const dispatch = useDispatch<AppDispatch>();

  // Methods
  function onCloseClick () {
    dispatch(closeAddItemModal());
  }

  const [createWishlistMutation] = useMutation(ADD_WISHLIST, {
    refetchQueries: [{ query: GET_WISHLIST }],
  });

  const priorityOptions: OptionType[] = [
    {
      label: 'Low',
      value: '1'
    },
    {
      label: 'Moderately Low',
      value: '2'
    },
    {
      label: 'Medium',
      value: '3',
    },
    {
      label: 'Moderately High',
      value: '4'
    },
    {
      label: 'High',
      value: '5'
    },
  ]

  function onFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formElement = event.currentTarget;
    const data: FormData = new FormData(formElement);

    // console.log('form submit', data.get("name"));
    console.log('form submit', data.get('target price'), typeof data.get('target price'));
    for (const [key, value] of data.entries()) {
      console.log(`${key}: ${value}`);
    }

    // createWishlistMutation({ variables: {
    //   itemName: data.get('name'),
    //   targetAmount: data.get('target price')
    // } })
    //   .then((x: any) => {
    //     console.log('whats here', x);
    //   })
    //   .catch((err: any) => {
    //     // @TODO: Need a better err response in the backend
    //     console.log('error', err);
    //   });
  }

  return (
    <ModalDefault
      onCloseClick={() => onCloseClick()}
      isFull={true}
    >
      <form
        className="p-6 relative"
        onSubmit={onFormSubmit}
      >
        <div className="text-2xl font-bold">Add an item 💸</div>

        <button
          className="absolute top-6 right-6 w-4 aspect-square border border-black bg-white rounded-md p-2 box-content"
          onClick={() => onCloseClick()}>
          <XMarkIcon />
        </button>

        <InputDefault label="Name" isRequired={true} extraClasses="my-4" />
        <InputDefault type="number" label="Target price" isRequired={true} extraClasses="my-4" />
        {/* <InputDefault type="url" label="Item link" extraClasses="my-4" />
        <SelectDefault label="Priority" name="priority" options={priorityOptions} defaultValue="3" />
        <TextAreaDefault label="Item Description" extraClasses="my-4" /> */}

        <div className="fixed w-full left-0 bottom-0 p-4 border-t border-black">
          <ButtonDefault buttonText="Add Item" onClick={() => {}} extraClasses="w-full" />
        </div>
      </form>
    </ModalDefault>
  )
}
