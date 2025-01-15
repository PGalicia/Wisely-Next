
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

// Constans
import {
  ADD_WISHLIST,
  MUTATION_NAME_CREATE_WISHLIST,
  UPDATE_WISHLIST,
  MUTATION_NAME_UPDATE_WISHLIST
} from '@/constants/GraphQLQueries';

// React
import { useSelector } from 'react-redux';
import { useForm } from "react-hook-form";

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
import stringToValidURL from '@/utils/stringToValidURL';

// Zod
import { z } from "zod"; 
import { zodResolver } from "@hookform/resolvers/zod";

/**
 * Form type
 */
const schema = z.object({
  name: z.string()
    .min(5, { message: "Name must be at least 5 characters" })
    .nonempty({ message: "Name cannot be empty" })
    .refine(value => !/^\s/.test(value), {  // Check for leading spaces
      message: "Value cannot start with a space.",
    })
    .refine(value => !/\s$/.test(value), {  // Check for trailing spaces
      message: "Value cannot end with a space.",
    }),
  price: z.string()
    .refine(value => /^[0-9]+(\.[0-9]{1,2})?$/.test(value), {
      message: "Enter a valid price.",
    }),
  url: z.string()
    .trim()
    .refine(value => {
      return value === "" || /^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(value) || /^[a-zA-Z0-9-]+\.[a-zA-Z]{2,6}(\/.*)?$/.test(value);
    }, {
      message: "Please enter a valid URL.",
    })
    .optional(),
  priority: z.number()
    .min(1, { message: "Number must be at least 1" })
    .max(5, { message: "Number must be at most 5" }),
  description: z.string()
    .refine(value => !/^\s/.test(value), {  // Check for leading spaces
      message: "Value cannot start with a space.",
    })
    .refine(value => !/\s$/.test(value), {  // Check for trailing spaces
      message: "Value cannot end with a space.",
    })
    .optional(),
});
type AddEditWishlistFormInputs = z.infer<typeof schema>;

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

  // Hooks
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<AddEditWishlistFormInputs>({
    defaultValues: {
      name: targetItemName || '',
      price: targetAmount?.toString(),
      url: targetItemLink,
      priority: targetPriority,
      description: targetItemDescription
    },
    resolver: zodResolver(schema),
  });

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

  async function onFormSubmit(data: AddEditWishlistFormInputs) {
    const {
      name: itemName,
      price: targetAmount,
      url: itemLink = '',
      priority: itemPriority,
      description: itemDescription
    } = data;

    if (isOnDemo) {
      const defaultVars = {
        itemName,
        itemLink: stringToValidURL(itemLink) || '',
        itemDescription,
        priority: itemPriority,
        targetAmount: parseFloat(targetAmount),
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
        targetAmount: parseFloat(targetAmount),
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
      modalTitle={getModalTitle()}
      extraClassesTitle="max-w-3xl mx-auto my-0 p-6"
    >
      <form
        className="px-6 relative max-w-3xl mx-auto my-0"
        onSubmit={handleSubmit(onFormSubmit)}
        noValidate
      >
        <InputDefault
          label="Name"
          register={register('name')}
          isRequired={true}
          extraClasses="mb-4"
          isErrorShowing={!!errors.name}
          errorMessage={errors.name?.message}
        />

        <InputNumber
          label="Target Price"
          register={register('price')}
          isRequired={true}
          isErrorShowing={!!errors.price}
          errorMessage={errors.price?.message}
          extraClasses="mb-4"
        />

        <InputDefault
          label="Item link"
          register={register('url')}
          isErrorShowing={!!errors.url}
          errorMessage={errors.url?.message}
          extraClasses="my-4"
        />

        <SelectPriority
          label="Priority"
          name="priority"
          options={priorityOptions}
          register={register('priority', { valueAsNumber: true })}
          defaultValue={DEFAULT_PRIORITY.toString()}
        />

        <TextAreaDefault
          label="Item Description"
          extraClasses="my-4"
          register={register('description')}
          isErrorShowing={!!errors.description}
          errorMessage={errors.description?.message}
        />

        <div className="fixed md:relative w-full left-0 bottom-0 p-4 md:p-0 border-t md:border-t-0 border-black">
          <ButtonDefault buttonText={getButtonText()} onClick={() => {}} extraClasses="w-full" />
        </div>
      </form>
    </ModalDefault>
  )
}
