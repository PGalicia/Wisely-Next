
'use client'
/**
 * Imports
 */
// Apollo
import { FetchResult, useMutation } from '@apollo/client';

// Componets
import ButtonDefault from '@/components/ButtonDefault';
import InputNumber from '@/components/InputNumber';
import InputText from '@/components/InputText';
import LabelDefault from '@/components/LabelDefault';
import ModalDefault from '@/components/ModalDefault';
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ExclamationTriangleIcon } from '@heroicons/react/16/solid';

// Constans
import { ADD_WISHLIST, MUTATION_NAME_CREATE_WISHLIST } from '@/constants/GraphQLQueries';

// React
import { useState } from 'react';

// Redux
import { useDispatch } from 'react-redux';
import { closeAddItemModal } from '@/redux/features/modalSlice';
import { addWishlist } from '@/redux/features/wishlistSlice';

// Types
import type { AppDispatch } from '@/redux/store';
import { useId } from 'react';
import type { WishlistType } from '@/types/WishlistType';

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
  const [itemName, setItemName] = useState('');
  const [isErrorShowingItemName, setIsErrorShowingItemName] = useState(false);
  const [targetPrice, setTargetPrice] = useState('');
  const [isErrorShowingTargetPrice, setIsErrorShowingTargetPrice] = useState(false);

  // Dispatch
  const dispatch = useDispatch<AppDispatch>();

  // Methods
  function onCloseClick () {
    dispatch(closeAddItemModal());
  }

  // Mutation
  type createWishlistMutationType = { [MUTATION_NAME_CREATE_WISHLIST]: WishlistType };
  const [createWishlistMutation] = useMutation<createWishlistMutationType>(ADD_WISHLIST);

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

    let isAnyErrorShowing = false;

    if (itemName.length === 0) {
      setIsErrorShowingItemName(true);
      isAnyErrorShowing = true;
    }

    if (targetPrice.length === 0 || parseFloat(targetPrice) <= 0) {
      setIsErrorShowingTargetPrice(true);
      isAnyErrorShowing = true;
    }

    if (isAnyErrorShowing) {
      return;
    }

    createWishlistMutation({ variables: {
      itemName,
      targetAmount: parseFloat(targetPrice)
    } })
      .then((result: FetchResult<createWishlistMutationType>) => {
        const { data } = result;

        if (data) {
          dispatch(addWishlist({
            ...data[MUTATION_NAME_CREATE_WISHLIST],
            currentAmount: 0
          }));
        }
      })
      .catch((err: any) => {
        // @TODO: Need a better err response in the backend
        console.log('error', err);
      })
      .finally(() => {
        // Close modal
        onCloseClick()
      });
  }

  // When updating itemName input
  function onInputDefaultChange(event: React.ChangeEvent<HTMLInputElement>) {
    setIsErrorShowingItemName(false);
    setItemName(event.target.value);
  }

  // When unfocusing itemName input
  function onInputDefaultBlur() {
    // If itemName is empty, mark that the input should show the error
    if (itemName.length === 0) {
      setIsErrorShowingItemName(true);
    }
  }

  // When unfocusing target price input
  function onInputNumberBlur() {
    // If the value is empty OR if the value is less than 0, mark that the input should show the error
    if (targetPrice.length === 0 || parseFloat(targetPrice) <= 0) {
      setIsErrorShowingTargetPrice(true);
    }
  }

  // When updating target price input
  function onInputNumberChange(event: React.ChangeEvent<HTMLInputElement>) {
    const inputValue = event.target.value;

    // Match numbers with up to two decimal places
    if (/^\d*\.?\d{0,2}$/.test(inputValue)) {
      setIsErrorShowingTargetPrice(false);
      setTargetPrice(inputValue);
    }
  };

  // Prevent certain values from popping on in 'number' type input element
  function onInputNumberKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'e' || event.key === 'E' || event.key === '+' || event.key === '-') {
      event.preventDefault();
    }
  }

  // Disable submit button if there are any input errors
  function isSubmitButtonDisabled(): boolean {
    return isErrorShowingItemName || isErrorShowingTargetPrice;
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

        <InputText
          label="Name"
          isRequired={true}
          extraClasses="my-4"
          inputValue={itemName}
          errorMessage="This cannot be empty"
          onChange={onInputDefaultChange}
          onBlur={onInputDefaultBlur}
          isErrorShowing={isErrorShowingItemName}
        />

        <InputNumber
          label="Target Price"
          isRequired={true}
          extraClasses="my-4"
          inputValue={targetPrice}
          errorMessage="This cannot be empty or zero"
          onChange={onInputNumberChange}
          onBlur={onInputNumberBlur}
          onKeyDown={onInputNumberKeyDown}
          isErrorShowing={isErrorShowingTargetPrice}
        />

        {/* <InputDefault type="url" label="Item link" extraClasses="my-4" />
        <SelectDefault label="Priority" name="priority" options={priorityOptions} defaultValue="3" />
        <TextAreaDefault label="Item Description" extraClasses="my-4" /> */}

        <div className="fixed w-full left-0 bottom-0 p-4 border-t border-black">
          <ButtonDefault buttonText="Add Item" onClick={() => {}} extraClasses="w-full" isDisabled={isSubmitButtonDisabled()} />
        </div>
      </form>
    </ModalDefault>
  )
}
