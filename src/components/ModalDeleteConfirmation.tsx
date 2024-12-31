
'use client'
/**
 * Imports
 */
// Apollo
import { FetchResult, useMutation } from '@apollo/client';

// Componets
import ModalDefault from '@/components/ModalDefault';
import ButtonDefault from '@/components/ButtonDefault';

// Constans
import { REMOVE_WISHLIST, MUTATION_NAME_DELETE_WISHLIST } from '@/constants/GraphQLQueries';

// React
import { useSelector } from 'react-redux';

// Redux
import { useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { closeDeleteConfirmationModal } from '@/redux/features/modalSlice';
import { removeWishlist } from '@/redux/features/wishlistSlice';

// Types
import type { AppDispatch } from '@/redux/store';

export default function ModalDeleteConfirmation () {
  // Dispatch
  const dispatch = useDispatch<AppDispatch>();

  // Mutation
  type removeWishlistMutationType = { [MUTATION_NAME_DELETE_WISHLIST]: { id: string } };
  const [removeWishlistMutation] = useMutation<removeWishlistMutationType>(REMOVE_WISHLIST);

  // Redux
  const targetWishlistId = useSelector((state: RootState) => state.modalReducer.targetWishlistId);
  const targetWishlistName = useSelector((state: RootState) => state.modalReducer.targetWishlistName);

  // Methods
  function onCloseClick () {
    dispatch(closeDeleteConfirmationModal());
  }

  function onConfirmClick() {
    removeWishlistMutation({ variables: { id: targetWishlistId } })
      .then((result: FetchResult<removeWishlistMutationType>) => {
        const { data } = result;

        if (data) {
          dispatch(removeWishlist(data[MUTATION_NAME_DELETE_WISHLIST].id));
        }
      })
      .finally(() => {
        onCloseClick();
      })
  }

  return (
    <ModalDefault
      onCloseClick={() => onCloseClick()}
    >
      <div className="flex flex-col h-full justify-between max-w-[500px] p-4">
        <div className="p-8 text-center text-2xl grow flex flex-col justify-center">
          <div>Are you sure you want to delete <span className="font-bold">{targetWishlistName}</span>?</div>
        </div>

        <div className="p-4 w-full flex flex-col gap-2">
          <ButtonDefault buttonText="Cancel" onClick={() => onCloseClick()} isSecondary={true} />
          <ButtonDefault buttonText="Confirm" onClick={() => onConfirmClick()} />
        </div>
      </div>
    </ModalDefault>
  )
}
