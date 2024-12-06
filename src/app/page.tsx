'use client'
/**
 * Imports
 */
// Apollo
import { useQuery, gql, useMutation } from '@apollo/client';

// Components
import WishlistItem from '@/components/WishlistItem';
import ModalDeleteConfirmation from '@/components/ModalDeleteConfirmation';
import ModalAddItem from '@/components/ModalAddItem';

// Constants
import { GET_WISHLIST } from '@/constants/GraphQLQueries';

// React
import { useSelector } from 'react-redux';

// Redux
import { AppDispatch, RootState } from '@/redux/store';
import { useDispatch } from 'react-redux';
import { openAddItemModal } from '@/redux/features/modalSlice';

// Types
import type { WislistType } from '@/types/WishlistType';

function formatWishlistQuery(queryObj: any) {
  return queryObj['getAllWishlist'];
}

export default function Home() {
  // Dispatch
  const dispatch = useDispatch<AppDispatch>();
  
  // Redux
  const isDeleteConfirmationModalActive = useSelector((state: RootState) => state.modalReducer.isDeleteConfirmationModalActive);
  const isAddItemModalActive = useSelector((state: RootState) => state.modalReducer.isAddItemModalActive);

  const { loading, error, data = [] } = useQuery(GET_WISHLIST);

  function onAddNewItemClick() {
    dispatch(openAddItemModal());
  }

  return (
    <main className="m-4">
      <h1 className="u-shake">Hello World</h1>

      <button onClick={() => onAddNewItemClick()}>Add new item</button>

      <div className="flex flex-col gap-4">
        {
          !loading && formatWishlistQuery(data).map((wishlist: WislistType) => {
            return <WishlistItem key={wishlist.id} wishlist={wishlist} />
          })
        }
      </div>

      {/* Modals */}
      {isDeleteConfirmationModalActive && <ModalDeleteConfirmation />}
      {isAddItemModalActive && <ModalAddItem />}
    </main>
  );
}