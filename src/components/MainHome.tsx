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
import ModalAddEditItem from '@/components/ModalAddEditItem';
import WishlistItem from '@/components/WishlistItem';

// Constants
import { GET_WISHLIST_AND_BUDGET, QUERY_NAME_GET_BUDGET, QUERY_NAME_GET_ALL_WISHLIST } from '@/constants/GraphQLQueries';

// React
import { useEffect } from 'react';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { openAddItemModal } from '@/redux/features/modalSlice';
import { setWishlist, setBudget } from '@/redux/features/wishlistSlice';

// Types
import type { WishlistType } from '@/types/WishlistType';

// async function HomePage() {
export default function MainHome() {
  // Dispatch
  const dispatch = useDispatch<AppDispatch>();
  
  // Redux
  const wishlists = useSelector((state: RootState) => state.wishlistReducer.wishlists);
  const budget = useSelector((state: RootState) => state.wishlistReducer.budget);
  const isDeleteConfirmationModalActive = useSelector((state: RootState) => state.modalReducer.isDeleteConfirmationModalActive);
  const isAddItemModalActive = useSelector((state: RootState) => state.modalReducer.isAddItemModalActive);

  // Fetch the wishlists and budget
  const { loading, error, data } = useQuery(GET_WISHLIST_AND_BUDGET);
  
  // Update the state to reflect the wishlist and budget
  useEffect(() => {
    if (data && !loading && !error) {
      dispatch(setWishlist(data[QUERY_NAME_GET_ALL_WISHLIST]));
      dispatch(setBudget(data[QUERY_NAME_GET_BUDGET]));
    }
  }, [data, loading, error, dispatch]);

  // Show proper loading/error text if needed
  // @TODO: I should look into making this better
  if (loading) return <div>Fetching data</div>
  if (error) return <div>Error fetching data</div>
  if (!loading && wishlists.length === 0) return <div>Empty wishlist</div>
  if (!loading && budget < 0) return <div>Budget is missing</div>

  function onAddNewItemClick() {
    dispatch(openAddItemModal());
  }

  return (
    <main className="m-5 pb-28">
      <BalanceDefault balance={budget} />

      <ButtonAdd buttonText="Add" onClick={onAddNewItemClick} />

      <div className="uppercase mb-2 font-mono font-bold">Wishlist</div>

      <div className="flex flex-col gap-4">
        {
          !loading && wishlists.map((wishlist: WishlistType) => {
            return <WishlistItem key={wishlist.id} wishlist={wishlist} />
          })
        }
      </div>

      {/* Modals */}
      {isDeleteConfirmationModalActive && <ModalDeleteConfirmation />}
      {isAddItemModalActive && <ModalAddEditItem />}
    </main>
  );
}