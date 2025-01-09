
/**
 * Imports
 */
// Apollo
import { FetchResult, useMutation } from '@apollo/client';

// Componets
import ButtonDefault from '@/components/ButtonDefault';
import InputNumber from '@/components/InputNumber';
import InputDefault from '@/components/InputDefault';
import ModalDefault from '@/components/ModalDefault';
import SelectPriority from '@/components/SelectPriority';
import TextAreaDefault from '@/components/TextAreaDefault';
import { XMarkIcon } from '@heroicons/react/24/outline';

// Constans
import {
  ADD_WISHLIST,
  MUTATION_NAME_CREATE_WISHLIST,
  UPDATE_WISHLIST,
  MUTATION_NAME_UPDATE_WISHLIST
} from '@/constants/GraphQLQueries';

// React
import { useState } from 'react';
import { useSelector } from 'react-redux';

// Redux
import { RootState } from '@/redux/store';
import { useDispatch } from 'react-redux';
import { closeAddItemModal } from '@/redux/features/modalSlice';
import { addWishlist } from '@/redux/features/wishlistSlice';
import { updateWishlist } from '@/redux/features/wishlistSlice';

// Types
import type { AppDispatch } from '@/redux/store';
import type { updateWishlistMutationType, createWishlistMutationType } from '@/types/WishlistMutationType';
import type { OptionType } from '@/types/OptionType';

// Utils
import isAValidURL from '@/utils/isAValidURL';
import stringToValidURL from '@/utils/stringToValidURL';

export default function ModalAddEditItem () {
  // consts
  const {
    id: targetId,
    itemName: targetItemName,
    itemLink: targetItemLink,
    itemDescription: targetItemDescription,
    priority: targetPriority,
    targetAmount,
  } = useSelector((state: RootState) => state.modalReducer.targetWishlist);
  const isOnEditMode = !!targetId;
  const DEFAULT_PRIORITY = 3;

  // State
  const [itemName, setItemName] = useState(targetItemName || '');
  const [isErrorShowingItemName, setIsErrorShowingItemName] = useState(false);
  const [targetPrice, setTargetPrice] = useState(targetAmount?.toString() || '');
  const [isErrorShowingTargetPrice, setIsErrorShowingTargetPrice] = useState(false);
  const [itemPriority, setItemPriority] = useState(targetPriority || DEFAULT_PRIORITY);
  const [itemLink, setItemLink] = useState(targetItemLink || '');
  const [isErrorShowingItemLink, setIsErrorShowingItemLink] = useState(false);
  const [itemDescription, setItemDescription] = useState(targetItemDescription || '');

  // Dispatch
  const dispatch = useDispatch<AppDispatch>();

  // Redux
  const isOnDemo = useSelector((state: RootState) => state.wishlistReducer.isOnDemo);

  // Methods
  function onCloseClick () {
    dispatch(closeAddItemModal());
  }

  // Mutation
  const [createWishlistMutation] = useMutation<createWishlistMutationType>(ADD_WISHLIST);
  const [updateWishlistMutation] = useMutation<updateWishlistMutationType>(UPDATE_WISHLIST);

  const priorityOptions: OptionType[] = [
    {
      label: 'Low',
      value: 1
    },
    {
      label: 'Moderately Low',
      value: 2
    },
    {
      label: 'Medium',
      value: 3,
    },
    {
      label: 'Moderately High',
      value: 4
    },
    {
      label: 'High',
      value: 5
    },
  ]

  async function onFormSubmit(event: React.FormEvent<HTMLFormElement>) {
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

    if (itemLink.length !== 0 && !isAValidURL(itemLink)) {
      setIsErrorShowingItemLink(true);
      isAnyErrorShowing = true;
    }

    if (isAnyErrorShowing) {
      return;
    }

    if (isOnDemo) {
      const defaultVars = {
        itemName,
        itemLink: stringToValidURL(itemLink) || '',
        itemDescription,
        priority: itemPriority,
        targetAmount: parseFloat(targetPrice),
      }

      if (isOnEditMode) {
        dispatch(updateWishlist({
          id: targetId,
          ...defaultVars
        }));
      } else {
        dispatch(addWishlist({
          id: Date.now().toString(),
          ...defaultVars,
          currentAmount: 0
        }));
      }

      onCloseClick();
      return;
    }

    // Perfom the proper mutation based on if we are in edit mode or not
    const mutationAction = () => {
      const defaultVars = {
        itemName,
        itemLink: stringToValidURL(itemLink) || '',
        itemDescription,
        priority: itemPriority,
        targetAmount: parseFloat(targetPrice),
      }

      if (isOnEditMode) {
        return updateWishlistMutation({
          variables: {
            id: targetId,
            isComplete: false,
            ...defaultVars
          }
        })
        .then((result: FetchResult<updateWishlistMutationType>) => {
          const { data } = result;
          if (data) {
            dispatch(updateWishlist(data[MUTATION_NAME_UPDATE_WISHLIST]));
          }
        })
      } else {
        return createWishlistMutation({ variables: {
          ...defaultVars
        } })
          .then((result: FetchResult<createWishlistMutationType>) => {
            const { data } = result;
  
            if (data) {
              dispatch(addWishlist({
                ...data[MUTATION_NAME_CREATE_WISHLIST],
                currentAmount: 0
              }));
            }
          });
      }
    }

    mutationAction()
      .catch((err: unknown) => {
        // @TODO: Need a better err response in the backend
        console.log('error', err);
      })
      .finally(() => {
        // Close modal
        onCloseClick()
      });
  }

  // When updating itemName input
  function onInputItemNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setIsErrorShowingItemName(false);
    setItemName(event.target.value);
  }

  // When unfocusing itemName input
  function onInputItemNameBlur(event: React.ChangeEvent<HTMLInputElement>) {
    // Make sure that there no extra space at the edges of the string
    setItemName(event.target.value.trim());

    // If itemName is empty, mark that the input should show the error
    if (itemName.length === 0) {
      setIsErrorShowingItemName(true);
    }
  }

  // When updating itemLink input
  function onInputItemLinkChange(event: React.ChangeEvent<HTMLInputElement>) {
    setIsErrorShowingItemLink(false);
    setItemLink(event.target.value.trim());
  }

  // When unfocusing itemLink input
  function onInputItemLinkBlur() {
    // If itemLink is an invalid URL, mark that the input should show the error
    if (isAValidURL(itemName)) {
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
    return isErrorShowingItemName || isErrorShowingTargetPrice || isErrorShowingItemLink;
  }

  // When updating priority
  function onSelectPriorityChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const selectValue = event.target.value;

    setItemPriority(parseInt(selectValue));
  }

  // When updating itemDescription input
  function onTextAreaItemDescriptionChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setItemDescription(event.target.value);
  }

  // When unfocusing itemDescription input
  function onTextAreaItemDescriptionBlur(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setItemDescription(event.target.value.trim());
  }

  // Update modal title based on if you are in edit mode or not
  function getModalTitle(): string {
    return isOnEditMode
      ? 'Edit a wishlist 💸'
      : 'Add an item 💸'
  }

  // Update submit button text based on if you are in edit mode or not
  function getButtonText(): string {
    return isOnEditMode
      ? 'Edit Item'
      : 'Add Item'
  }

  return (
    <ModalDefault
      onCloseClick={() => onCloseClick()}
      isFull={true}
    >
      <form
        className="p-6 relative max-w-3xl mx-auto my-0"
        onSubmit={onFormSubmit}
      >
        <div className="text-2xl font-bold">{getModalTitle()}</div>

        <button
          className="absolute top-6 right-6 w-4 aspect-square border border-black bg-white rounded-md p-2 box-content"
          onClick={() => onCloseClick()}>
          <XMarkIcon />
        </button>

        <InputDefault
          label="Name"
          isRequired={true}
          extraClasses="my-4"
          inputValue={itemName}
          errorMessage="This cannot be empty"
          onChange={onInputItemNameChange}
          onBlur={onInputItemNameBlur}
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

        <InputDefault
          label="Item link"
          extraClasses="my-4"
          inputValue={itemLink}
          errorMessage="Enter a valid url"
          onChange={onInputItemLinkChange}
          onBlur={onInputItemLinkBlur}
          isErrorShowing={isErrorShowingItemLink}
        />

        <SelectPriority
          label="Priority"
          name="priority"
          options={priorityOptions}
          selectValue={itemPriority}
          onChange={onSelectPriorityChange}
        />

        <TextAreaDefault
          label="Item Description"
          extraClasses="my-4"
          inputValue={itemDescription}
          onChange={onTextAreaItemDescriptionChange}
          onBlur={onTextAreaItemDescriptionBlur}
        />

        <div className="fixed md:relative w-full left-0 bottom-0 p-4 md:p-0 border-t md:border-t-0 border-black">
          <ButtonDefault buttonText={getButtonText()} onClick={() => {}} extraClasses="w-full" isDisabled={isSubmitButtonDisabled()} />
        </div>
      </form>
    </ModalDefault>
  )
}
