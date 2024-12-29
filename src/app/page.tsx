'use client'
/**
 * Imports
 */
// Apollo
import { useQuery } from '@apollo/client';

// Components
import BalanceDefault from '@/components/BalanceDefault';
import ButtonAdd from '@/components/ButtonAdd';
import ModalDeleteConfirmation from '@/components/ModalDeleteConfirmation';
import ModalAddItem from '@/components/ModalAddItem';
import WishlistItem from '@/components/WishlistItem';

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
    <main className="m-5 pb-28">
      <BalanceDefault />

      <ButtonAdd buttonText="Add" onClick={onAddNewItemClick} />

      <div className="uppercase mb-2 font-mono font-bold">Wishlist</div>

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